import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Server, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface DeliverablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliverablesModal: React.FC<DeliverablesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'api' | 'page' | 'env'>('packages');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const npmInstallCommand = `npm install @google/genai lucide-react clsx tailwind-merge motion`;

  const apiRouteCode = `// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = 'image/png', promptOverride = '' } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image base64 payload is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY environment variable is not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const cleanBase64 = imageBase64.replace(/^data:image\\/[a-zA-Z+]+;base64,/, '');

    const systemInstruction = \`You are a Principal Frontend Architect and UX/CRO specialist.
Analyze UI screenshots and return structured JSON with Next.js 14+ (App Router, TSX, Tailwind CSS) code, Tailwind HTML, and a comprehensive UX/CRO audit report with numerical score (1-100).\`;

    const prompt = \`Analyze this UI screenshot. Replicate in clean Next.js 14+ with Lucide-React and produce a UX/CRO score (1-100). \${promptOverride}\`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: cleanBase64 } },
          { text: prompt }
        ]
      },
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
            audit: {
              type: Type.OBJECT,
              properties: {
                overallScore: { type: Type.INTEGER },
                scoreVerdict: { type: Type.STRING },
                summary: { type: Type.STRING },
                estimatedConversionLift: { type: Type.STRING },
                dimensionScores: {
                  type: Type.OBJECT,
                  properties: {
                    visualHierarchy: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, label: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ['score', 'label', 'summary'] },
                    conversionPower: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, label: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ['score', 'label', 'summary'] },
                    accessibilityContrast: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, label: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ['score', 'label', 'summary'] },
                    typographySpacing: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, label: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ['score', 'label', 'summary'] },
                    mobileReadiness: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, label: { type: Type.STRING }, summary: { type: Type.STRING } }, required: ['score', 'label', 'summary'] }
                  },
                  required: ['visualHierarchy', 'conversionPower', 'accessibilityContrast', 'typographySpacing', 'mobileReadiness']
                },
                strengths: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, category: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['title', 'category', 'description'] } },
                bottlenecks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, issue: { type: Type.STRING }, severity: { type: Type.STRING }, impact: { type: Type.STRING }, recommendation: { type: Type.STRING } }, required: ['title', 'issue', 'severity', 'impact', 'recommendation'] } },
                recommendations: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, priority: { type: Type.STRING }, effort: { type: Type.STRING }, estimatedLift: { type: Type.STRING }, stepByStep: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['title', 'priority', 'effort', 'estimatedLift', 'stepByStep'] } },
                colorPalette: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { hex: { type: Type.STRING }, name: { type: Type.STRING }, role: { type: Type.STRING }, contrastPass: { type: Type.BOOLEAN } }, required: ['hex', 'name', 'role', 'contrastPass'] } },
                accessibilityChecks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { criterion: { type: Type.STRING }, status: { type: Type.STRING }, detail: { type: Type.STRING } }, required: ['criterion', 'status', 'detail'] } }
              },
              required: ['overallScore', 'scoreVerdict', 'summary', 'estimatedConversionLift', 'dimensionScores', 'strengths', 'bottlenecks', 'recommendations', 'colorPalette', 'accessibilityChecks']
            }
          },
          required: ['componentName', 'description', 'reactTsxCode', 'tailwindHtmlCode', 'audit']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`;

  const mainPageCode = `// app/page.tsx
'use client';

import React, { useState } from 'react';
import { Sparkles, UploadCloud, Code2, LayoutDashboard, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VisionCodeStudioPage() {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImageFile(base64);
      
      setAnalyzing(true);
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
        });
        const json = await res.json();
        if (json.success) {
          setResult(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">VisionCode AI Studio</h1>
          </div>
        </header>

        {/* Upload Zone */}
        {!result && (
          <div className="my-16 max-w-xl mx-auto text-center p-10 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
            <UploadCloud className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Upload UI Screenshot or Wireframe</h2>
            <p className="text-xs text-slate-400 mb-6">Generates Next.js 14 App Router code + UX Audit</p>
            <label className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm cursor-pointer shadow-lg shadow-indigo-600/30">
              Browse Files
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            {analyzing && <p className="text-xs text-indigo-400 mt-4 animate-pulse">Analyzing UI with Gemini Vision...</p>}
          </div>
        )}

        {/* Result Split Dashboard */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="font-bold text-white mb-4">Generated Next.js 14 Component</h3>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono overflow-auto max-h-[500px] text-slate-200">
                <code>{result.reactTsxCode}</code>
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">UX & CRO Score</h3>
                <span className="text-2xl font-extrabold text-emerald-400">{result.audit?.overallScore}/100</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{result.audit?.summary}</p>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Key Bottlenecks</h4>
              <div className="space-y-2">
                {result.audit?.bottlenecks?.map((b: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950 text-xs border border-slate-800">
                    <p className="font-semibold text-rose-300">{b.title}</p>
                    <p className="text-slate-400 mt-1">{b.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}`;

  const envExampleCode = `# .env.local
GEMINI_API_KEY="your-gemini-api-key-here"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">VisionCode Next.js 14 Deliverables</h2>
              <p className="text-xs text-slate-400">Complete install commands, API routes, and page templates</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverables Tab Bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'packages'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>1. npm Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'api'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>2. app/api/analyze/route.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('page')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'page'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>3. app/page.tsx</span>
          </button>

          <button
            onClick={() => setActiveTab('env')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'env'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>.env.local</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-auto flex-1 bg-slate-950/80">
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Required npm Packages Installation
                </span>
                <button
                  onClick={() => copyToClipboard(npmInstallCommand, 'pkg')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {copiedKey === 'pkg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pkg' ? 'Copied' : 'Copy Command'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                <code>{npmInstallCommand}</code>
              </pre>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <h4 className="font-bold text-white">Included Libraries:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong className="text-slate-200">@google/genai</strong>: Official Google GenAI SDK for Gemini Vision 2.5</li>
                  <li><strong className="text-slate-200">lucide-react</strong>: Modern icons for generated UI elements</li>
                  <li><strong className="text-slate-200">motion</strong>: Smooth micro-interactions and transitions</li>
                  <li><strong className="text-slate-200">clsx / tailwind-merge</strong>: Conditional class handling</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Complete Next.js 14 API Route (app/api/analyze/route.ts)
                </span>
                <button
                  onClick={() => copyToClipboard(apiRouteCode, 'api')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {copiedKey === 'api' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'api' ? 'Copied' : 'Copy Route'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto max-h-[400px]">
                <code>{apiRouteCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'page' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Complete Main UI Page (app/page.tsx)
                </span>
                <button
                  onClick={() => copyToClipboard(mainPageCode, 'page')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {copiedKey === 'page' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'page' ? 'Copied' : 'Copy Page'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto max-h-[400px]">
                <code>{mainPageCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Environment Configuration (.env.local)
                </span>
                <button
                  onClick={() => copyToClipboard(envExampleCode, 'env')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {copiedKey === 'env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'env' ? 'Copied' : 'Copy .env'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
                <code>{envExampleCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
