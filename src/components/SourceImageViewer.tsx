import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AnalysisResult } from '../types';

interface SourceImageViewerProps {
  analysis: AnalysisResult;
}

export const SourceImageViewer: React.FC<SourceImageViewerProps> = ({ analysis }) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col shadow-xl">
      {/* Top Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200">Source UI Screenshot</span>
            <span className="text-[10px] text-slate-400 ml-2">Original input</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-300 px-1.5 min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Preview Canvas */}
      <div
        className={`relative w-full bg-slate-950 flex items-center justify-center p-4 overflow-auto ${
          isFullscreen ? 'fixed inset-0 z-50 p-8' : 'min-h-[260px] max-h-[420px]'
        }`}
      >
        <div
          className="transition-transform duration-150 ease-out origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={analysis.sourceImage}
            alt="Source UI Screenshot"
            className="max-h-[380px] w-auto max-w-full rounded-lg shadow-2xl object-contain border border-slate-800"
          />
        </div>

        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900/90 text-white border border-slate-700 hover:bg-slate-800 shadow-xl"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[200px]">{analysis.componentName || 'Detected UI'}</span>
        <button
          onClick={() => setIsFullscreen(true)}
          className="hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <Maximize2 className="w-3 h-3" /> Full View
        </button>
      </div>
    </div>
  );
};
