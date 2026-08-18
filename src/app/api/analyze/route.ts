import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing. Please configure it in .env or .env.local');
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

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType = 'image/png', promptOverride = '' } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Image base64 payload is required' },
        { status: 400 }
      );
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
                      recommendation: { type: Type.STRING },
                    },
                    required: ['title', 'issue', 'severity', 'recommendation'],
                  },
                },
                recommendations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      estimatedLift: { type: Type.STRING },
                    },
                    required: ['title', 'description', 'estimatedLift'],
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
      return NextResponse.json(
        { success: false, error: 'Empty response returned from Gemini API' },
        { status: 500 }
      );
    }

    // Clean and parse JSON response
    let parsedData;
    try {
      const cleanedJson = cleanJsonResponse(responseText);
      parsedData = JSON.parse(cleanedJson);
    } catch (parseErr: any) {
      console.error('Failed to parse Gemini response:', responseText.substring(0, 500));
      return NextResponse.json(
        { success: false, error: `Invalid JSON response from Gemini API: ${parseErr.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
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

    const errorMessage = err.message || err.toString() || 'Failed to analyze UI screenshot with Gemini API';
    const statusCode = err.status || 500;

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
