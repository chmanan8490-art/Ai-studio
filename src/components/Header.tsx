import React from 'react';
import { Sparkles, Code2, Layers, BookOpen, Download, RefreshCw, UploadCloud, ShieldCheck, Zap } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HeaderProps {
  currentAnalysis: AnalysisResult | null;
  onNewUpload: () => void;
  onOpenDeliverables: () => void;
  onExportReport: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentAnalysis,
  onNewUpload,
  onOpenDeliverables,
  onExportReport,
  isLoading,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Vision<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Code</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                AI Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Screenshot to Next.js 14+ Tailwind & UX/CRO Audit
            </p>
          </div>
        </div>

        {/* Status / Active Info */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Engine:</span>
            <span className="font-semibold text-indigo-300">Gemini Vision 2.5</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Target:</span>
            <span className="font-medium text-slate-200">Next.js 14 App Router</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenDeliverables}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-sm group"
            title="View Deliverables & Setup Instructions"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Deliverables & Code Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          {currentAnalysis && (
            <button
              onClick={onExportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-sm"
              title="Export Report & Code"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Export Analysis</span>
            </button>
          )}

          <button
            onClick={onNewUpload}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all disabled:opacity-50 group"
          >
            <UploadCloud className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Upload Screenshot</span>
          </button>
        </div>
      </div>
    </header>
  );
};
