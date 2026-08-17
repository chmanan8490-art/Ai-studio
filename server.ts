import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const PORT = 3000;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing. Please configure it in .env.local');
  }
  if (apiKey.length < 10) {
    throw new Error('GEMINI_API_KEY appears to be invalid (too short). Please verify your API key.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper function to clean JSON responses that may be wrapped in markdown code blocks
function cleanJsonResponse(text: string): string {
  // Remove markdown code block wrappers if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

async function startServer() {
  const app = express();

  // Support up to 50MB for high-resolution UI screenshots
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Main UI Screenshot to Next.js 14+ / Tailwind Code + UX/CRO Audit endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      // Validate API key first
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: 'GEMINI_API_KEY environment variable is missing. Please configure it in .env.local',
        });
      }

      const { imageBase64, mimeType = 'image/png', frameworkMode = 'nextjs-app-router', promptOverride = '' } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ success: false, error: 'Image base64 payload is required' });
      }

      // Strip potential data URL prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

      const ai = getGeminiClient();

      const systemInstruction = `You are a Principal Frontend Architect and Chief UX/CRO Conversion Specialist.
Your task is to analyze user interface screenshots, wireframes, or app mockups and return a structured JSON response containing:
1. Pixel-perfect, production-grade Next.js 14+ (App Router, TypeScript, Tailwind CSS) code replicating and modernizing the UI.
2. Clean Tailwind HTML markup version.
3. A complete Next.js 14 App Router entry point ('app/page.tsx').
4. A full-featured Next.js 14 API Route ('app/api/analyze/route.ts').
5. A comprehensive UI/UX and Conversion Rate Optimization (CRO) Audit Report with a numerical score (1-100), visual hierarchy assessment, accessibility checks, friction bottlenecks, actionable recommendations with estimated conversion lift, and color scheme analysis.

Rules for Code Generation:
- Use modern Tailwind CSS classes (e.g. flex, grid, rounded-2xl, backdrop-blur-md, slate/indigo/emerald/violet/sky palettes, shadow-xl, hover transitions).
- Use lucide-react icon names in the React TSX code (e.g. import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, ChevronRight, ... } from 'lucide-react').
- Write self-contained, fully functioning TSX with 'use client' at the top, interactive state hooks where appropriate (tabs, toggles, accordion, quantity counters, modals).
- Ensure high contrast, accessible fonts, generous button padding, and responsive mobile/desktop layout.
- The response MUST strictly adhere to the JSON schema.`;

      const prompt = `Analyze this UI screenshot. 
Replicate the design in clean Next.js 14+ (App Router, TSX, Tailwind CSS) with Lucide-React icons, and produce an exhaustive UX/CRO audit report with numerical score (1-100).
${promptOverride ? `User requested custom focus: ${promptOverride}` : ''}
Provide actionable recommendations for improving user engagement and conversion rate.`;

      // Define structured JSON Schema for Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/png',
                data: cleanBase64,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              componentName: { type: Type.STRING, description: 'PascalCase component name, e.g., AnalyzedHeroPlatform' },
              description: { type: Type.STRING, description: 'Brief description of the UI layout and features' },
              reactTsxCode: { type: Type.STRING, description: 'Complete, production-ready React TSX component code with Tailwind CSS and Lucide icons' },
              tailwindHtmlCode: { type: Type.STRING, description: 'Standalone Tailwind CSS HTML markup' },
              appRouterPageCode: { type: Type.STRING, description: 'Complete Next.js 14 app/page.tsx code' },
              apiRouteCode: { type: Type.STRING, description: 'Complete Next.js 14 app/api/analyze/route.ts code' },
              audit: {
                type: Type.OBJECT,
                properties: {
                  overallScore: { type: Type.INTEGER, description: 'Overall UX/CRO score from 1 to 100' },
                  scoreVerdict: { type: Type.STRING, description: 'High-level verdict label, e.g. "High Performing Layout with Minor Leaks"' },
                  summary: { type: Type.STRING, description: '2-3 sentence executive summary of the UX and CRO evaluation' },
                  estimatedConversionLift: { type: Type.STRING, description: 'Estimated potential conversion lift, e.g., "+18.5% Projected Lift"' },
                  dimensionScores: {
                    type: Type.OBJECT,
                    properties: {
                      visualHierarchy: {
                        type: Type.OBJECT,
                        properties: {
                          score: { type: Type.INTEGER },
                          label: { type: Type.STRING },
                          summary: { type: Type.STRING },
                        },
                        required: ['score', 'label', 'summary'],
                      },
                      conversionPower: {
                        type: Type.OBJECT,
                        properties: {
                          score: { type: Type.INTEGER },
                          label: { type: Type.STRING },
                          summary: { type: Type.STRING },
                        },
                        required: ['score', 'label', 'summary'],
                      },
                      accessibilityContrast: {
                        type: Type.OBJECT,
                        properties: {
                          score: { type: Type.INTEGER },
                          label: { type: Type.STRING },
                          summary: { type: Type.STRING },
                        },
                        required: ['score', 'label', 'summary'],
                      },
                      typographySpacing: {
                        type: Type.OBJECT,
                        properties: {
                          score: { type: Type.INTEGER },
                          label: { type: Type.STRING },
                          summary: { type: Type.STRING },
                        },
                        required: ['score', 'label', 'summary'],
                      },
                      mobileReadiness: {
                        type: Type.OBJECT,
                        properties: {
                          score: { type: Type.INTEGER },
                          label: { type: Type.STRING },
                          summary: { type: Type.STRING },
                        },
                        required: ['score', 'label', 'summary'],
                      },
                    },
                    required: ['visualHierarchy', 'conversionPower', 'accessibilityContrast', 'typographySpacing', 'mobileReadiness'],
                  },
                  strengths: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        category: { type: Type.STRING },
                        description: { type: Type.STRING },
                      },
                      required: ['title', 'category', 'description'],
                    },
                  },
                  bottlenecks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        issue: { type: Type.STRING },
                        severity: { type: Type.STRING, description: 'critical, high, medium, or low' },
                        impact: { type: Type.STRING },
                        recommendation: { type: Type.STRING },
                      },
                      required: ['title', 'issue', 'severity', 'impact', 'recommendation'],
                    },
                  },
                  recommendations: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        priority: { type: Type.STRING },
                        effort: { type: Type.STRING },
                        estimatedLift: { type: Type.STRING },
                        stepByStep: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['title', 'priority', 'effort', 'estimatedLift', 'stepByStep'],
                    },
                  },
                  colorPalette: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        hex: { type: Type.STRING },
                        name: { type: Type.STRING },
                        role: { type: Type.STRING },
                        contrastPass: { type: Type.BOOLEAN },
                        contrastRatio: { type: Type.STRING },
                      },
                      required: ['hex', 'name', 'role', 'contrastPass'],
                    },
                  },
                  accessibilityChecks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        criterion: { type: Type.STRING },
                        status: { type: Type.STRING, description: 'pass, warning, or fail' },
                        detail: { type: Type.STRING },
                      },
                      required: ['criterion', 'status', 'detail'],
                    },
                  },
                },
                required: ['overallScore', 'scoreVerdict', 'summary', 'estimatedConversionLift', 'dimensionScores', 'strengths', 'bottlenecks', 'recommendations', 'colorPalette', 'accessibilityChecks'],
              },
            },
            required: ['componentName', 'description', 'reactTsxCode', 'tailwindHtmlCode', 'appRouterPageCode', 'apiRouteCode', 'audit'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response returned from Gemini API');
      }

      // Clean and parse JSON response (handle markdown wrappers)
      let parsedData;
      try {
        const cleanedJson = cleanJsonResponse(responseText);
        parsedData = JSON.parse(cleanedJson);
      } catch (parseErr: any) {
        console.error('Failed to parse Gemini response:', responseText.substring(0, 500));
        throw new Error(`Invalid JSON response from Gemini: ${parseErr.message}`);
      }

      return res.json({
        success: true,
        data: {
          id: 'analysis-' + Date.now(),
          timestamp: Date.now(),
          ...parsedData,
          sourceImage: imageBase64.startsWith('data:') ? imageBase64 : `data:${mimeType};base64,${cleanBase64}`,
        },
      });
    } catch (err: any) {
      console.error('Error in /api/analyze:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to analyze UI screenshot with Gemini API',
      });
    }
  });

  // Code Refinement & Customization endpoint
  app.post('/api/refine', async (req, res) => {
    try {
      const { currentCode, prompt, currentAudit } = req.body;

      if (!currentCode || !prompt) {
        return res.status(400).json({ error: 'currentCode and prompt are required' });
      }

      const ai = getGeminiClient();

      const systemInstruction = `You are a Senior Full-Stack React & Next.js 14 engineer and CRO designer.
The user wants to refine their generated UI component based on a specific instruction.
Update the React TSX code (with Tailwind CSS and Lucide icons), the HTML code, and the audit score accordingly.
Return a structured JSON with componentName, reactTsxCode, tailwindHtmlCode, and updated audit object.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Current React TSX Code:
\`\`\`tsx
${currentCode}
\`\`\`

User Refinement Request:
"${prompt}"

Please apply the refinement cleanly while maintaining best practices, responsive layout, accessible contrast, and Lucide icons. Return the complete updated JSON.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              componentName: { type: Type.STRING },
              description: { type: Type.STRING },
              reactTsxCode: { type: Type.STRING },
              tailwindHtmlCode: { type: Type.STRING },
              appRouterPageCode: { type: Type.STRING },
              apiRouteCode: { type: Type.STRING },
              auditUpdateNotes: { type: Type.STRING },
            },
            required: ['componentName', 'description', 'reactTsxCode', 'tailwindHtmlCode', 'appRouterPageCode'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response received from refinement');
      }

      // Clean and parse JSON response
      let parsed;
      try {
        const cleanedJson = cleanJsonResponse(responseText);
        parsed = JSON.parse(cleanedJson);
      } catch (parseErr: any) {
        console.error('Failed to parse refinement response:', responseText.substring(0, 500));
        throw new Error(`Invalid JSON response from refinement: ${parseErr.message}`);
      }
      return res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.error('Error in /api/refine:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to refine code',
      });
    }
  });

  // Vite middleware in development vs static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VisionCode AI Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
