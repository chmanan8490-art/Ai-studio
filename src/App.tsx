import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Uploader } from './components/Uploader';
import { SourceImageViewer } from './components/SourceImageViewer';
import { CodeViewer } from './components/CodeViewer';
import { UxAuditReport } from './components/UxAuditReport';
import { LivePreview } from './components/LivePreview';
import { DeliverablesModal } from './components/DeliverablesModal';
import { AnalysisResult, PresetSample } from './types';
import { SAMPLE_PRESETS } from './data/presets';
import { LayoutDashboard, Eye, Code2, Sparkles, Award, ArrowLeft, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

type RightTab = 'audit' | 'preview';

export default function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(SAMPLE_PRESETS[0].data);
  const [rightTab, setRightTab] = useState<RightTab>('audit');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDeliverablesModal, setShowDeliverablesModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show celebratory confetti on high scores
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#38bdf8', '#a855f7'],
      });
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImageSelected = async (base64: string, mimeType: string, customPrompt: string) => {
    setIsLoading(true);
    setLoadingStep(1);
    setErrorMessage(null);

    // Progressive step simulation for smooth UX
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1800);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType,
          promptOverride: customPrompt,
        }),
      });

      clearInterval(stepInterval);

      // Safely read response as text first
      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(responseText || `Server error: ${response.statusText}`);
      }

      let json;
      try {
        json = JSON.parse(responseText);
      } catch (parseErr: any) {
        throw new Error(`Invalid response format: ${parseErr.message}. Response: ${responseText.substring(0, 100)}`);
      }

      if (!json.success) {
        throw new Error(json.error || 'Failed to analyze UI screenshot with Gemini Vision.');
      }

      setCurrentAnalysis(json.data);
      setRightTab('audit');
      showToast('UI Analysis & Code Generation Complete!');

      if (json.data?.audit?.overallScore >= 90) {
        setTimeout(triggerConfetti, 400);
      }
    } catch (err: any) {
      console.error('Error analyzing image:', err);
      setErrorMessage(err.message || 'An error occurred while connecting to the Gemini Vision API.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handlePresetSelected = (preset: PresetSample) => {
    setCurrentAnalysis(preset.data);
    setRightTab('audit');
    showToast(`Loaded ${preset.title} Preset`);
    if (preset.data.audit.overallScore >= 90) {
      setTimeout(triggerConfetti, 300);
    }
  };

  const handleRefineCode = async (prompt: string) => {
    if (!currentAnalysis) return;
    setIsRefining(true);

    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCode: currentAnalysis.reactTsxCode,
          prompt,
          currentAudit: currentAnalysis.audit,
        }),
      });

      // Safely read response as text first
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || `Server error: ${response.statusText}`);
      }

      let json;
      try {
        json = JSON.parse(responseText);
      } catch (parseErr: any) {
        throw new Error(`Invalid response format: ${parseErr.message}`);
      }

      if (!json.success) {
        throw new Error(json.error || 'Failed to refine code.');
      }

      const refined = json.data;
      setCurrentAnalysis((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          reactTsxCode: refined.reactTsxCode || prev.reactTsxCode,
          tailwindHtmlCode: refined.tailwindHtmlCode || prev.tailwindHtmlCode,
          appRouterPageCode: refined.appRouterPageCode || prev.appRouterPageCode,
          componentName: refined.componentName || prev.componentName,
        };
      });

      showToast('AI Code Refinement Applied!');
    } catch (err: any) {
      console.error('Error refining code:', err);
      showToast('Refinement error: ' + (err.message || 'Failed'));
    } finally {
      setIsRefining(false);
    }
  };

  const handleExportReport = () => {
    if (!currentAnalysis) return;

    const reportMarkdown = `# VisionCode AI Studio - UX & CRO Audit Report
**Component:** ${currentAnalysis.componentName}
**Generated:** ${new Date(currentAnalysis.timestamp).toLocaleString()}
**Overall UX/CRO Score:** ${currentAnalysis.audit?.overallScore}/100
**Verdict:** ${currentAnalysis.audit?.scoreVerdict}
**Estimated Conversion Lift:** ${currentAnalysis.audit?.estimatedConversionLift}

## Executive Summary
${currentAnalysis.audit?.summary}

## Dimension Breakdown
${Object.entries(currentAnalysis.audit?.dimensionScores || {})
  .map(([k, v]) => {
    const dim = v as { label?: string; score?: number; summary?: string };
    return `- **${dim.label || k}**: ${dim.score || 0}/100 - ${dim.summary || ''}`;
  })
  .join('\n')}

## Key Strengths
${currentAnalysis.audit?.strengths?.map((s) => `- **[${s.category}] ${s.title}**: ${s.description}`).join('\n')}

## Conversion Bottlenecks & Fixes
${currentAnalysis.audit?.bottlenecks
  ?.map((b) => `### ${b.title} (${b.severity.toUpperCase()})\n- **Issue**: ${b.issue}\n- **Impact**: ${b.impact}\n- **Fix**: ${b.recommendation}`)
  .join('\n\n')}

## Actionable CRO Roadmap
${currentAnalysis.audit?.recommendations
  ?.map(
    (r) =>
      `### ${r.title} (${r.priority} | ${r.estimatedLift})\nEffort: ${r.effort}\n${r.stepByStep.map((s) => `- [ ] ${s}`).join('\n')}`
  )
  .join('\n\n')}
`;

    const blob = new Blob([reportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentAnalysis.componentName || 'UI'}-UX-CRO-Audit.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Audit Report downloaded as Markdown');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentAnalysis={currentAnalysis}
        onNewUpload={() => setCurrentAnalysis(null)}
        onOpenDeliverables={() => setShowDeliverablesModal(true)}
        onExportReport={handleExportReport}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-4 sm:p-6 flex flex-col">
        {/* Error Banner if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-white font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View Mode 1: Uploader (When no active analysis or user clicks new upload) */}
        {!currentAnalysis ? (
          <div className="flex-1 flex items-center justify-center">
            <Uploader
              onImageSelected={handleImageSelected}
              onPresetSelected={handlePresetSelected}
              isLoading={isLoading}
              loadingStep={loadingStep}
            />
          </div>
        ) : (
          /* View Mode 2: Split-Screen Studio Dashboard */
          <div className="flex-1 flex flex-col space-y-4">
            {/* Context Sub-Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentAnalysis(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Upload Another UI</span>
                </button>

                <div className="h-4 w-px bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    {currentAnalysis.componentName || 'Analyzed Component'}
                  </h2>
                  <span className="text-xs text-slate-400 hidden md:inline">
                    • {currentAnalysis.description || 'Next.js 14 + Tailwind Code & Audit'}
                  </span>
                </div>
              </div>

              {/* Right Side Tab Toggle for Split Screen */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setRightTab('audit')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rightTab === 'audit'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Tab 1: UX Audit Report ({currentAnalysis.audit?.overallScore || 0}/100)</span>
                </button>

                <button
                  onClick={() => setRightTab('preview')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rightTab === 'preview'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tab 2: Live Code Preview</span>
                </button>
              </div>
            </div>

            {/* Split Screen 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              {/* LEFT SIDE: (5 Cols on large screens) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Source Image Inspector */}
                <SourceImageViewer analysis={currentAnalysis} />

                {/* 2. Generated Next.js & Tailwind Code Viewer */}
                <CodeViewer
                  analysis={currentAnalysis}
                  onRefineCode={handleRefineCode}
                  isRefining={isRefining}
                />
              </div>

              {/* RIGHT SIDE: (7 Cols on large screens) */}
              <div className="lg:col-span-7">
                {rightTab === 'audit' ? (
                  <UxAuditReport audit={currentAnalysis.audit} />
                ) : (
                  <LivePreview analysis={currentAnalysis} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Deliverables Guide Modal */}
      <DeliverablesModal
        isOpen={showDeliverablesModal}
        onClose={() => setShowDeliverablesModal(false)}
      />

      {/* Floating Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs font-semibold text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
