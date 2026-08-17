import React, { useState } from 'react';
import { UxAuditReportData, BottleneckItem, ActionableRecommendation, ColorItem } from '../types';
import { Award, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Layers, ShieldCheck, Eye, Compass, Palette, Zap, ArrowUpRight, Copy, Check } from 'lucide-react';

interface UxAuditReportProps {
  audit: UxAuditReportData;
}

export const UxAuditReport: React.FC<UxAuditReportProps> = ({ audit }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'high'>('all');

  const getScoreColor = (score: number) => {
    if (score >= 90) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', ring: '#10b981' };
    if (score >= 75) return { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', ring: '#6366f1' };
    if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', ring: '#f59e0b' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', ring: '#f43f5e' };
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">Critical P0</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/40">High P1</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-700/60 text-slate-300 border border-slate-600">Low</span>;
    }
  };

  const scoreTheme = getScoreColor(audit.overallScore || 85);
  const strokeDashoffset = 283 - (283 * (audit.overallScore || 85)) / 100;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const filteredBottlenecks = audit.bottlenecks?.filter((b) => {
    if (activeFilter === 'critical') return b.severity.toLowerCase() === 'critical';
    if (activeFilter === 'high') return b.severity.toLowerCase() === 'critical' || b.severity.toLowerCase() === 'high';
    return true;
  }) || [];

  return (
    <div className="w-full space-y-6">
      {/* Visual Score Card Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-between relative z-10">
          {/* Radial Score Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={scoreTheme.ring}
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-extrabold tracking-tight ${scoreTheme.text}`}>
                  {audit.overallScore}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">/ 100</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5" />
                <span>UX & CRO Audit Score</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {audit.scoreVerdict || 'Strong Baseline with Growth Opportunities'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                {audit.summary}
              </p>
            </div>
          </div>

          {/* Lift Badge */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 flex-shrink-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Conversion Opportunity</span>
            </div>
            <div className="text-xl font-extrabold text-white">
              {audit.estimatedConversionLift || '+16.5% Estimated Lift'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">By resolving identified friction points</p>
          </div>
        </div>

        {/* 5 Dimension Progress Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(audit.dimensionScores || {}).map(([key, rawItem]) => {
            const item = rawItem as { score: number; label: string; summary: string };
            const dimTheme = getScoreColor(item.score || 80);
            return (
              <div key={key} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-slate-300 truncate">{item.label || key}</span>
                  <span className={`text-xs font-extrabold ${dimTheme.text}`}>{item.score || 0}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.score || 0}%`,
                      backgroundColor: dimTheme.ring,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Strengths & Bottlenecks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Key Design Strengths</h3>
              <p className="text-xs text-slate-400">Validated high-performing elements</p>
            </div>
          </div>

          <div className="space-y-3">
            {audit.strengths?.map((str, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {str.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-indigo-300">
                    {str.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
                  {str.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Friction Bottlenecks */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Conversion Bottlenecks</h3>
                <p className="text-xs text-slate-400">Critical UX friction points</p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2 py-0.5 rounded ${activeFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                All ({audit.bottlenecks?.length || 0})
              </button>
              <button
                onClick={() => setActiveFilter('critical')}
                className={`px-2 py-0.5 rounded ${activeFilter === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
              >
                Critical
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredBottlenecks.map((btl, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-100">{btl.title}</h4>
                  {getSeverityBadge(btl.severity)}
                </div>
                <p className="text-xs text-rose-300/90 mb-2 leading-relaxed">
                  <span className="font-semibold text-rose-400">Issue:</span> {btl.issue}
                </p>
                <div className="text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">Impact:</span> {btl.impact}
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                  <span className="font-semibold text-indigo-400">Fix:</span> {btl.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actionable CRO Recommendations Roadmap */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Prioritized Action Plan</h3>
              <p className="text-xs text-slate-400">Ranked by estimated conversion lift</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audit.recommendations?.map((rec, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                    {rec.priority}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    {rec.estimatedLift}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{rec.title}</h4>

                <div className="space-y-1.5 my-3">
                  {rec.stepByStep?.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Effort: <strong className="text-slate-200">{rec.effort}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette & Accessibility Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Palette */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Palette className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Extracted Color Palette</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {audit.colorPalette?.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleCopyHex(color.hex)}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group"
              >
                <div
                  className="w-full h-8 rounded-lg mb-2 shadow-inner border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between text-xs font-mono text-white">
                  <span>{color.hex}</span>
                  {copiedHex === color.hex ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-indigo-400" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{color.name} ({color.role})</div>
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility Checklist */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">WCAG 2.1 Compliance Checklist</h3>
          </div>

          <div className="space-y-2.5">
            {audit.accessibilityChecks?.map((chk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <div className="mt-0.5">
                  {chk.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : chk.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{chk.criterion}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{chk.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
