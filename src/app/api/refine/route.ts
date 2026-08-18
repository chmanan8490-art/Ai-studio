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
    const { currentCode, prompt } = await request.json();

    if (!currentCode || !prompt) {
      return NextResponse.json(
        { success: false, error: 'currentCode and prompt are required' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { success: false, error: 'Empty response received from refinement' },
        { status: 500 }
      );
    }

    // Clean and parse JSON response
    let parsed;
    try {
      const cleanedJson = cleanJsonResponse(responseText);
      parsed = JSON.parse(cleanedJson);
    } catch (parseErr: any) {
      console.error('Failed to parse refinement response:', responseText.substring(0, 500));
      return NextResponse.json(
        { success: false, error: `Invalid JSON response from refinement: ${parseErr.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('Error in /api/refine:', err);

    const errorMessage = err.message || err.toString() || 'Failed to refine code';
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
