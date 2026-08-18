import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, Zap, Shield, HelpCircle, FileCode, AlertCircle, Wand2, Compass } from 'lucide-react';
import { PresetSample } from '../types';
import { SAMPLE_PRESETS } from '../data/presets';

interface UploaderProps {
  onImageSelected: (base64: string, mimeType: string, customPrompt: string) => void;
  onPresetSelected: (preset: PresetSample) => void;
  isLoading: boolean;
  loadingStep: number;
}

const ANALYSIS_PRESETS_TAGS = [
  { id: 'default', label: 'Balanced Replicate + CRO Audit', prompt: '' },
  { id: 'cro-max', label: 'Maximum Conversion Boost', prompt: 'Prioritize highest converting CTA placement, trust badges, risk-reversal micro-copy, and friction elimination.' },
  { id: 'mobile-first', label: 'Mobile-First Ergonomics', prompt: 'Focus on responsive mobile UX, thumb-reach action bars, and touch targets >= 48px.' },
  { id: 'dark-glass', label: 'Dark Modern Glassmorphism', prompt: 'Use dark slate-950 aesthetic, subtle ambient glows, and clean glassmorphic borders.' },
];

export const Uploader: React.FC<UploaderProps> = ({
  onImageSelected,
  onPresetSelected,
  isLoading,
  loadingStep,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTag, setSelectedTag] = useState('default');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clipboard Paste Support (Ctrl+V anywhere in window or upload zone)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isLoading) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            processFile(blob);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isLoading, customPrompt]);

  const compressImage = (dataUrl: string, originalType: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Calculate new dimensions to stay under 1MB
        // Target: ~900KB compressed JPEG
        let quality = 0.85;
        let compression = 0.85;

        // Scale down if too large
        if (width > 1920 || height > 1920) {
          const maxDim = 1920;
          if (width > height) {
            height = (height * maxDim) / width;
            width = maxDim;
          } else {
            width = (width * maxDim) / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Use JPEG for better compression, fallback to PNG
        const targetType = originalType === 'image/png' || originalType === 'image/webp' ? 'image/jpeg' : originalType;
        
        // Iteratively compress until under 1MB
        let compressedUrl = canvas.toDataURL(targetType, quality);
        while (compressedUrl.length > 1024 * 1024 && quality > 0.4) {
          quality -= 0.05;
          compressedUrl = canvas.toDataURL(targetType, quality);
        }

        if (compressedUrl.length > 1024 * 1024) {
          reject(new Error('Could not compress image to under 1MB. Try a smaller or lower resolution image.'));
        } else {
          resolve(compressedUrl);
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };
      img.src = dataUrl;
    });
  };

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPEG, WebP, or SVG).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File is too large. Please select an image under 25MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const result = reader.result as string;
        // Compress image before sending
        const compressedBase64 = await compressImage(result, file.type);
        onImageSelected(compressedBase64, file.type, customPrompt);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to process image. Please try again.');
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const selectPromptTag = (tagId: string, promptText: string) => {
    setSelectedTag(tagId);
    setCustomPrompt(promptText);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Title & Subtitle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Gemini Vision 2.5 Code & CRO Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Drop any UI screenshot. <br className="hidden sm:inline" />
          Get <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">Next.js 14 Code + UX Audit</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Instantly reverse-engineer websites, apps, and wireframes into clean TypeScript + Tailwind CSS with conversion rate optimization scoring.
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed transition-all p-8 sm:p-12 text-center backdrop-blur-xl group overflow-hidden ${
          isDragging
            ? 'border-indigo-400 bg-indigo-950/40 shadow-2xl shadow-indigo-500/30 scale-[1.01]'
            : 'border-slate-800 hover:border-indigo-500/50 bg-slate-900/60 hover:bg-slate-900/90 shadow-xl'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isLoading}
        />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none group-hover:bg-indigo-600/20 transition-all" />

        {isLoading ? (
          /* Multi-Step Animated Loading Skeleton */
          <div className="relative z-10 py-6 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 mx-auto flex items-center justify-center text-indigo-400 mb-6 relative">
              <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400 border-t-transparent animate-spin" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Analyzing UI with Gemini Vision...</h3>
            <p className="text-xs text-slate-400 mb-6">
              Synthesizing layout hierarchy, responsive grid, and CRO conversion scoring
            </p>

            {/* Step progress list */}
            <div className="space-y-2.5 text-left bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3 text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${loadingStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {loadingStep >= 1 ? '✓' : '1'}
                </div>
                <span className={loadingStep >= 1 ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                  Decoding visual primitives & layout structure
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${loadingStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {loadingStep >= 2 ? '✓' : '2'}
                </div>
                <span className={loadingStep >= 2 ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                  Generating Next.js 14+ App Router & Tailwind CSS code
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${loadingStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {loadingStep >= 3 ? '✓' : '3'}
                </div>
                <span className={loadingStep >= 3 ? 'text-emerald-300 font-medium' : 'text-slate-500'}>
                  Evaluating UX score (1-100), bottlenecks & CRO recommendations
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 group-hover:border-indigo-500/40 group-hover:scale-105 transition-all mx-auto flex items-center justify-center text-indigo-400 mb-5 shadow-lg shadow-indigo-600/10">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="text-base sm:text-lg font-bold text-white mb-1">
              Drag and drop your screenshot here, or <span className="text-indigo-400 underline decoration-indigo-400/40 group-hover:decoration-indigo-400">browse files</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Supports PNG, JPG, WebP, SVG wireframes • Or simply press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">Ctrl+V</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">⌘+V</kbd> to paste from clipboard
            </p>

            {/* Feature Pills */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Next.js 14 App Router (TSX)</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tailwind CSS + Lucide Icons</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Visual UX Score & CRO Audit</span>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Analysis Tuning Options */}
      <div className="mt-6 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Code & Audit Strategy (Optional)</span>
          </label>
        </div>

        {/* Quick Tag Selector */}
        <div className="flex flex-wrap gap-2 mb-3">
          {ANALYSIS_PRESETS_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => selectPromptTag(tag.id, tag.prompt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTag === tag.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="e.g. Include animated stats counter, add sticky mobile CTA bar, use modern emerald palette..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* 1-Click Interactive Demo Presets */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Or Test Drive with Instant Sample Presets</span>
            </h3>
            <p className="text-xs text-slate-400">Click any UI sample below to inspect code and audit reports immediately</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onPresetSelected(preset)}
              disabled={isLoading}
              className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-left transition-all shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-28 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden mb-3.5 relative">
                  <img
                    src={preset.thumbnail}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/90 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                    {preset.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>Try Instant Demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
