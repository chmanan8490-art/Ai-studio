import React, { useState } from 'react';
import { Copy, Check, Download, Search, Sparkles, Wand2, Terminal, Code2, FileText, Server, RefreshCw } from 'lucide-react';
import { AnalysisResult } from '../types';

interface CodeViewerProps {
  analysis: AnalysisResult;
  onRefineCode: (prompt: string) => Promise<void>;
  isRefining: boolean;
}

type CodeTab = 'tsx' | 'page' | 'html' | 'api';

export const CodeViewer: React.FC<CodeViewerProps> = ({
  analysis,
  onRefineCode,
  isRefining,
}) => {
  const [activeTab, setActiveTab] = useState<CodeTab>('tsx');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');

  const getActiveCode = (): string => {
    switch (activeTab) {
      case 'tsx':
        return analysis.reactTsxCode || '// No TSX generated';
      case 'page':
        return analysis.appRouterPageCode || `// app/page.tsx\nimport ${analysis.componentName || 'AnalyzedComponent'} from '@/components/${analysis.componentName || 'AnalyzedComponent'}';\n\nexport default function Page() {\n  return (\n    <main className="min-h-screen bg-slate-950 text-white">\n      <${analysis.componentName || 'AnalyzedComponent'} />\n    </main>\n  );\n}`;
      case 'html':
        return analysis.tailwindHtmlCode || '<!-- No HTML generated -->';
      case 'api':
        return analysis.apiRouteCode || `// app/api/analyze/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\nimport { GoogleGenAI } from '@google/genai';\n\nexport async function POST(req: NextRequest) {\n  const { imageBase64, mimeType = 'image/png' } = await req.json();\n  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });\n  const response = await ai.models.generateContent({\n    model: 'gemini-3.6-flash',\n    contents: {\n      parts: [\n        { inlineData: { mimeType, data: imageBase64 } },\n        { text: 'Analyze UI and generate Next.js 14 + Tailwind TSX and UX/CRO audit.' }\n      ]\n    }\n  });\n  return NextResponse.json({ result: response.text });\n}`;
      default:
        return analysis.reactTsxCode;
    }
  };

  const activeCode = getActiveCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    let filename = `${analysis.componentName || 'Component'}.tsx`;
    let mime = 'text/typescript';

    if (activeTab === 'page') filename = 'page.tsx';
    else if (activeTab === 'html') {
      filename = `${analysis.componentName || 'component'}.html`;
      mime = 'text/html';
    } else if (activeTab === 'api') filename = 'route.ts';

    const blob = new Blob([activeCode], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleQuickRefine = (promptText: string) => {
    setRefinePrompt(promptText);
    onRefineCode(promptText);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinePrompt.trim() || isRefining) return;
    onRefineCode(refinePrompt.trim());
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col shadow-xl">
      {/* Code Header & Tab Bar */}
      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('tsx')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tsx'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Next.js 14 TSX</span>
          </button>

          <button
            onClick={() => setActiveTab('page')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'page'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>app/page.tsx</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'html'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Tailwind HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'api'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>API Route</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              showSearch
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Search code"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
            title="Download Code"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {showSearch && (
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Find in code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Code Editor Body */}
      <div className="relative flex-1 bg-slate-950/90 p-4 font-mono text-xs overflow-auto max-h-[520px] min-h-[350px] leading-relaxed text-slate-200 selection:bg-indigo-500/40">
        <pre className="whitespace-pre overflow-x-auto">
          <code>{activeCode}</code>
        </pre>
      </div>

      {/* Quick AI Refine Bar */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> Quick AI Refine:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleQuickRefine('Make buttons high-contrast emerald with pulse glow')}
              disabled={isRefining}
              className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40 transition-colors disabled:opacity-50"
            >
              Emerald CTA
            </button>
            <button
              onClick={() => handleQuickRefine('Add dark mode glassmorphic borders and ambient backlights')}
              disabled={isRefining}
              className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40 transition-colors disabled:opacity-50"
            >
              Glassmorphism
            </button>
            <button
              onClick={() => handleQuickRefine('Add animated stats counter with ROI savings simulator')}
              disabled={isRefining}
              className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40 transition-colors disabled:opacity-50"
            >
              Interactive Metric
            </button>
          </div>
        </div>

        <form onSubmit={handleRefineSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Prompt AI to refine code (e.g., 'Make it 2-column on tablet and add sticky header')..."
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              disabled={isRefining}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!refinePrompt.trim() || isRefining}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 disabled:opacity-50 transition-all"
          >
            {isRefining ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Refining...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Refine</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
