import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Tablet, Smartphone, Laptop, RefreshCw, Maximize2, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface LivePreviewProps {
  analysis: AnalysisResult;
}

type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export const LivePreview: React.FC<LivePreviewProps> = ({ analysis }) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'laptop':
        return '1024px';
      default:
        return '100%';
    }
  };

  const getViewportHeight = () => {
    switch (viewport) {
      case 'mobile':
        return '667px';
      case 'tablet':
        return '800px';
      default:
        return '100%';
    }
  };

  // Convert the React/HTML code into a fully self-contained HTML page with Tailwind CDN
  const generatePreviewDocument = () => {
    // If we have HTML code, use that; otherwise parse TSX to clean preview markup
    let bodyMarkup = analysis.tailwindHtmlCode;

    if (!bodyMarkup || bodyMarkup.length < 50) {
      // Clean up React TSX into HTML preview
      bodyMarkup = analysis.reactTsxCode
        ?.replace(/'use client';/g, '')
        ?.replace(/export default function[^{]+{/g, '')
        ?.replace(/return \(/g, '')
        ?.replace(/className=/g, 'class=')
        ?.replace(/<[A-Z][a-zA-Z0-9]+ className="([^"]*)" \/>/g, '<span class="$1">✦</span>')
        ?.replace(/}\s*$/g, '') || '<div class="p-8 text-center text-white">Generating preview...</div>';
    }

    return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #020617;
      color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0b0f19; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${bodyMarkup}
</body>
</html>`;
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    const doc = generatePreviewDocument();
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
      {/* Top Controls Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'desktop'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop 100%"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('laptop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'laptop'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Laptop (1024px)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">1024px</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'tablet'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenExternal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open In New Window</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="relative w-full bg-slate-950/90 min-h-[550px] p-4 sm:p-6 flex items-center justify-center overflow-auto">
        <div
          className={`transition-all duration-300 bg-slate-950 rounded-2xl shadow-2xl border border-slate-800/80 overflow-hidden flex flex-col ${
            viewport === 'mobile' || viewport === 'tablet' ? 'my-4 ring-1 ring-slate-700/50' : 'w-full'
          }`}
          style={{
            width: getViewportWidth(),
            height: viewport === 'mobile' ? '680px' : viewport === 'tablet' ? '750px' : '650px',
            maxWidth: '100%',
          }}
        >
          {/* Simulated Browser Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="px-4 py-0.5 rounded-md bg-slate-950 text-[11px] text-slate-400 border border-slate-800/80 font-mono truncate max-w-[240px]">
              localhost:3000/{analysis.componentName?.toLowerCase() || 'preview'}
            </div>
            <div className="text-[10px] text-indigo-400 font-semibold">Live Sandbox</div>
          </div>

          <iframe
            key={iframeKey}
            ref={iframeRef}
            srcDoc={generatePreviewDocument()}
            title="Live Render Preview"
            className="w-full h-full border-0 bg-slate-950 flex-1"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};
