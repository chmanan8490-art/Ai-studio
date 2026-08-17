import { PresetSample } from '../types';

export const SAMPLE_PRESETS: PresetSample[] = [
  {
    id: 'saas-landing',
    title: 'SaaS AI Platform Landing',
    category: 'Landing Page & CRO',
    description: 'High-converting dark aesthetic AI analytics hero, social proof bar, interactive metrics, and multi-tier pricing section.',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%23090d16"><rect width="400" height="260" fill="%230b0f19"/><circle cx="200" cy="90" r="80" fill="%234f46e5" opacity="0.2" filter="blur(40px)"/><rect x="30" y="24" width="80" height="12" rx="6" fill="%236366f1"/><rect x="260" y="24" width="110" height="12" rx="6" fill="%231e293b"/><rect x="60" y="65" width="280" height="22" rx="4" fill="%23f8fafc"/><rect x="90" y="95" width="220" height="12" rx="4" fill="%2394a3b8"/><rect x="140" y="125" width="120" height="28" rx="14" fill="%234f46e5"/><rect x="30" y="175" width="105" height="65" rx="8" fill="%231e293b"/><rect x="147" y="175" width="105" height="65" rx="8" fill="%231e293b"/><rect x="265" y="175" width="105" height="65" rx="8" fill="%23312e81"/></svg>',
    data: {
      id: 'preset-saas-landing',
      timestamp: Date.now(),
      componentName: 'SaaSHeroPlatform',
      description: 'Production-ready Next.js 14 SaaS landing page with dark-mode glassmorphism, responsive navigation, social proof ticker, feature cards, and high-converting CTA.',
      sourceImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520" fill="%23090d16"><rect width="800" height="520" fill="%230b0f19"/><circle cx="400" cy="180" r="180" fill="%234f46e5" opacity="0.25" filter="blur(60px)"/><rect x="60" y="36" width="140" height="20" rx="6" fill="%236366f1"/><rect x="460" y="36" width="280" height="20" rx="6" fill="%231e293b"/><rect x="120" y="110" width="560" height="40" rx="8" fill="%23f8fafc"/><rect x="180" y="165" width="440" height="22" rx="6" fill="%2394a3b8"/><rect x="310" y="215" width="180" height="46" rx="23" fill="%234f46e5"/><rect x="60" y="300" width="210" height="150" rx="12" fill="%23131b2e"/><rect x="295" y="300" width="210" height="150" rx="12" fill="%23131b2e"/><rect x="530" y="300" width="210" height="150" rx="12" fill="%231e1b4b"/></svg>',
      imageSpecs: { width: 1440, height: 900, sizeKb: 142, mimeType: 'image/png' },
      reactTsxCode: `'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SaaSPlatformHero() {
  const [billingAnnual, setBillingAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/30 to-violet-500/20 blur-[130px] rounded-full" />
        <div className="absolute top-[45%] -left-32 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Synthetix<span className="text-indigo-400">.ai</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#analytics" className="hover:text-white transition-colors">Integrations</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#changelog" className="hover:text-white transition-colors">Changelog</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors">
            Sign In
          </button>
          <button className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 group">
            Start Free Trial
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>v3.0 Just Released: Autonomous Pipeline Engine</span>
          <ArrowRight className="w-3 h-3 text-indigo-400" />
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Supercharge Your Growth with <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">Predictive Intelligence</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Automate customer retention, detect churn patterns in real-time, and deploy self-optimizing sales workflows in minutes.
        </p>

        {/* CTA Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 group">
            <span>Get Started with 14-Day Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-base transition-all flex items-center justify-center gap-2">
            <span>Watch 2-Min Interactive Demo</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOC2 Type II & GDPR Certified</span>
          </div>
        </div>

        {/* Value Prop Bento Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Churn Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Predict customer churn 30 days ahead of time with 94.8% empirical accuracy.</p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Channel Attribution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Map every touchpoint across ads, email, and organic search to true revenue.</p>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/70 border border-indigo-500/30 backdrop-blur-md hover:border-indigo-400/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Campaign Synthesis</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Generate localized copy variations, hero visuals, and trigger sequences automatically.</p>
          </div>
        </div>
      </main>
    </div>
  );
}`,
      tailwindHtmlCode: `<div class="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
  <header class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white">S</div>
      <span class="font-bold text-xl text-white">Synthetix.ai</span>
    </div>
    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-600/30">
      Start Free Trial
    </button>
  </header>
  <main class="max-w-5xl mx-auto px-6 pt-20 pb-28 text-center">
    <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
      Supercharge Your Growth with <span class="text-indigo-400">Predictive Intelligence</span>
    </h1>
    <p class="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
      Automate customer retention, detect churn patterns in real-time, and deploy self-optimizing sales workflows in minutes.
    </p>
    <div class="mt-10 flex justify-center gap-4">
      <button class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/40">
        Start Free 14-Day Trial
      </button>
    </div>
  </main>
</div>`,
      appRouterPageCode: `// app/page.tsx
import SaaSPlatformHero from '@/components/SaaSPlatformHero';

export const metadata = {
  title: 'Synthetix AI - Predictive Intelligence Platform',
  description: 'Automate customer retention and detect churn patterns with predictive AI workflows.',
};

export default function Page() {
  return (
    <main>
      <SaaSPlatformHero />
    </main>
  );
}`,
      apiRouteCode: `// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = 'image/png' } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: 'Image payload required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: imageBase64 } },
          { text: 'Analyze this UI screenshot and output Next.js 14+ Tailwind CSS code and a comprehensive UX/CRO audit report in JSON.' }
        ]
      }
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}`,
      audit: {
        overallScore: 88,
        scoreVerdict: 'Strong High-Performing Layout with Minor CRO Opportunities',
        summary: 'The layout exhibits exceptional visual hierarchy, clean contrast in dark mode, and clear headline typography. Increasing primary CTA contrast and adding dynamic social proof can unlock further conversion lifts.',
        estimatedConversionLift: '+16.4% Projected Lift',
        dimensionScores: {
          visualHierarchy: {
            score: 92,
            label: 'Visual Hierarchy & Flow',
            summary: 'Clear Z-pattern eye path from bold logo through value proposition to prominent primary CTA.'
          },
          conversionPower: {
            score: 84,
            label: 'CRO & Action Triggers',
            summary: 'Strong primary action, but secondary CTA competes slightly for optical dominance.'
          },
          accessibilityContrast: {
            score: 89,
            label: 'Contrast & Accessibility',
            summary: 'Body text and buttons exceed WCAG AA 4.5:1 ratio against the deep slate background.'
          },
          typographySpacing: {
            score: 91,
            label: 'Typography & Rhythmic Grid',
            summary: 'Accurate scale ratios (1.25+), generous 2x horizontal padding on buttons, crisp line-heights.'
          },
          mobileReadiness: {
            score: 85,
            label: 'Responsive Architecture',
            summary: '3-column bento grids collapse gracefully into stacked mobile cards.'
          }
        },
        strengths: [
          {
            title: 'Laser-Focused Value Proposition',
            category: 'CRO',
            description: 'Clear headline that immediately answers what the product does within 3 seconds of scanning.'
          },
          {
            title: 'De-Risking Trust Badges',
            category: 'CRO',
            description: '"No credit card required" and "SOC2 Certified" directly underneath the CTA neutralize user hesitation.'
          },
          {
            title: 'Polished Atmospheric Lighting',
            category: 'Visuals',
            description: 'Subtle ambient radial gradients guide focal attention directly to the central CTA.'
          }
        ],
        bottlenecks: [
          {
            title: 'Secondary CTA Visual Competition',
            issue: 'The secondary "Watch Demo" button has similar visual weight and border contrast as the primary button.',
            severity: 'medium',
            impact: 'Can introduce decision paralysis for first-time visitors seeking a frictionless trial.',
            recommendation: 'Use a ghost or outline button style for the secondary demo button to let the primary CTA pop.'
          },
          {
            title: 'Missing Floating Sticky CTA on Mobile Scroll',
            issue: 'Once users scroll past the hero fold on mobile screens, there is no persistent trial button visible.',
            severity: 'low',
            impact: 'Mobile users who read feature descriptions have to scroll back to the top to convert.',
            recommendation: 'Add a sticky bottom bar or condensed header CTA triggered on scroll depth > 30%.'
          }
        ],
        recommendations: [
          {
            title: 'Implement Interactive Live Metric Switcher',
            priority: 'P0 - Immediate',
            effort: 'Quick Win (< 1 hr)',
            estimatedLift: '+7.8% Engagement',
            stepByStep: [
              'Add a dynamic slider or interactive toggle inside the hero card.',
              'Demonstrate instant ROI calculation based on user team size or monthly visitors.'
            ]
          },
          {
            title: 'Elevate Social Proof with Animated Customer Logo Strip',
            priority: 'P1 - High Impact',
            effort: 'Moderate (1-3 hrs)',
            estimatedLift: '+5.2% Conversion Lift',
            stepByStep: [
              'Include 5-6 monochrome logos of recognizable companies using the platform.',
              'Add an aggregate 4.9/5 star badge with review counts from G2/Capterra.'
            ]
          }
        ],
        colorPalette: [
          { hex: '#020617', name: 'Slate 950', role: 'Background', contrastPass: true, contrastRatio: '21:1' },
          { hex: '#4F46E5', name: 'Indigo 600', role: 'Primary', contrastPass: true, contrastRatio: '6.8:1' },
          { hex: '#818CF8', name: 'Indigo 400', role: 'Accent', contrastPass: true, contrastRatio: '9.2:1' },
          { hex: '#F8FAFC', name: 'Slate 50', role: 'Text', contrastPass: true, contrastRatio: '18.4:1' },
          { hex: '#10B981', name: 'Emerald 500', role: 'Secondary', contrastPass: true, contrastRatio: '5.5:1' }
        ],
        accessibilityChecks: [
          { criterion: 'WCAG 2.1 AA Contrast Ratio', status: 'pass', detail: 'All text elements exceed 4.5:1 ratio against background.' },
          { criterion: 'Touch Target Sizing (44px+)', status: 'pass', detail: 'All interactive buttons have height >= 48px.' },
          { criterion: 'Form Label Associativity', status: 'pass', detail: 'No input forms required in hero, buttons have descriptive text.' },
          { criterion: 'Color Independence', status: 'pass', detail: 'All status badges include descriptive text alongside color accents.' }
        ]
      }
    }
  },
  {
    id: 'fintech-crypto',
    title: 'FinTech Mobile Asset Card',
    category: 'Mobile Application',
    description: 'Clean mobile wallet card UI with biometric auth, portfolio chart, balance breakdown, and quick transfer action bar.',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%230f172a"><rect width="400" height="260" fill="%230f172a"/><rect x="110" y="20" width="180" height="220" rx="24" fill="%231e293b" stroke="%23334155" stroke-width="2"/><rect x="130" y="40" width="70" height="10" rx="5" fill="%2394a3b8"/><rect x="130" y="60" width="140" height="24" rx="6" fill="%23f8fafc"/><rect x="130" y="95" width="140" height="45" rx="8" fill="%230ea5e9" opacity="0.2"/><circle cx="150" cy="180" r="16" fill="%230ea5e9"/><circle cx="200" cy="180" r="16" fill="%236366f1"/><circle cx="250" cy="180" r="16" fill="%2310b981"/></svg>',
    data: {
      id: 'preset-fintech-card',
      timestamp: Date.now(),
      componentName: 'FintechAssetWallet',
      description: 'Responsive mobile & desktop asset management card with live portfolio metrics, interactive asset transfers, and security status.',
      sourceImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="%23090d16"><rect width="600" height="800" fill="%23090d16"/><rect x="75" y="40" width="450" height="720" rx="36" fill="%23131b2e" stroke="%231e293b" stroke-width="3"/><rect x="115" y="80" width="120" height="20" rx="10" fill="%2364748b"/><rect x="115" y="120" width="280" height="40" rx="8" fill="%23f8fafc"/><rect x="115" y="180" width="370" height="160" rx="20" fill="%230284c7"/><rect x="115" y="370" width="370" height="80" rx="16" fill="%231e293b"/><rect x="115" y="470" width="370" height="80" rx="16" fill="%231e293b"/><rect x="115" y="570" width="370" height="80" rx="16" fill="%231e293b"/></svg>',
      imageSpecs: { width: 600, height: 800, sizeKb: 98, mimeType: 'image/png' },
      reactTsxCode: `'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, Shield, Plus, TrendingUp, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function FintechAssetWallet() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-[600px] flex items-center justify-center p-6 bg-slate-950 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 blur-3xl rounded-full" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              AL
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Welcome back</p>
              <h2 className="text-sm font-semibold text-slate-100">Alex Morgan</h2>
            </div>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        {/* Balance Card */}
        <div className="rounded-2xl bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-sky-900/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-100/80">Total Net Worth</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 backdrop-blur-sm">
              <TrendingUp className="w-3 h-3" /> +14.2% (30d)
            </span>
          </div>

          <div className="text-3xl font-extrabold tracking-tight mb-4">
            {showBalance ? '$124,580.42' : '••••••••••'}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-sky-100">
            <span>Card **** 8824</span>
            <span>Exp: 09/28</span>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-4 gap-3 my-6">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-sky-600 transition-colors flex items-center justify-center text-slate-200 group-hover:text-white shadow-md">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-300">Send</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-emerald-600 transition-colors flex items-center justify-center text-slate-200 group-hover:text-white shadow-md">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-300">Receive</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-indigo-600 transition-colors flex items-center justify-center text-slate-200 group-hover:text-white shadow-md">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-300">Deposit</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-violet-600 transition-colors flex items-center justify-center text-slate-200 group-hover:text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-300">Vault</span>
          </button>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 px-1">
            <span>Portfolio Allocation</span>
            <button className="text-sky-400 hover:text-sky-300 flex items-center gap-0.5">View All <ChevronRight className="w-3 h-3" /></button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center text-sm">₿</div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100">Bitcoin</h4>
                <p className="text-xs text-slate-400">1.42 BTC</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-100">$92,300.00</p>
              <p className="text-xs text-emerald-400">+4.2%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm">Ξ</div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100">Ethereum</h4>
                <p className="text-xs text-slate-400">8.20 ETH</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-100">$24,600.00</p>
              <p className="text-xs text-emerald-400">+2.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      tailwindHtmlCode: `<div class="max-w-md mx-auto p-6 bg-slate-900 rounded-3xl border border-slate-800 text-white font-sans">
  <div class="rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-6 shadow-xl mb-6">
    <div class="text-xs font-semibold text-sky-200 uppercase">Total Net Worth</div>
    <div class="text-3xl font-bold mt-2">$124,580.42</div>
  </div>
  <div class="grid grid-cols-4 gap-3 text-center text-xs">
    <button class="p-3 rounded-2xl bg-slate-800 hover:bg-sky-600">Send</button>
    <button class="p-3 rounded-2xl bg-slate-800 hover:bg-emerald-600">Receive</button>
    <button class="p-3 rounded-2xl bg-slate-800 hover:bg-indigo-600">Deposit</button>
    <button class="p-3 rounded-2xl bg-slate-800 hover:bg-violet-600">Vault</button>
  </div>
</div>`,
      appRouterPageCode: `// app/wallet/page.tsx
import FintechAssetWallet from '@/components/FintechAssetWallet';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <FintechAssetWallet />
    </div>
  );
}`,
      apiRouteCode: `// app/api/analyze/route.ts
// Standard VisionCode analysis endpoint`,
      audit: {
        overallScore: 94,
        scoreVerdict: 'Exceptional Mobile Ergonomics & Micro-Interactions',
        summary: 'Excellent information density suited for mobile finance, clean touch target geometry (>= 48px), and robust high-contrast text hierarchy.',
        estimatedConversionLift: '+9.2% Transaction Velocity',
        dimensionScores: {
          visualHierarchy: { score: 96, label: 'Visual Hierarchy', summary: 'Graded visual focus prioritizing balance and primary action triggers.' },
          conversionPower: { score: 92, label: 'Action Triggers', summary: 'Large four-way action grid accelerates core user loops.' },
          accessibilityContrast: { score: 95, label: 'WCAG Contrast', summary: 'All values and headers maintain >= 7:1 contrast ratios.' },
          typographySpacing: { score: 93, label: 'Typography & Padding', summary: 'Well-proportioned micro-copy with clear monetary formatting.' },
          mobileReadiness: { score: 95, label: 'Mobile Ergonomics', summary: 'Thumb-friendly layout with intuitive top card anchoring.' }
        },
        strengths: [
          { title: 'Privacy Shield Toggle', category: 'UX', description: 'Immediate balance hide/reveal button for discreet viewing in public.' },
          { title: 'Thumb-Zone Action Bar', category: 'Layout', description: 'Buttons situated within natural thumb reach on standard smartphones.' }
        ],
        bottlenecks: [
          { title: 'Missing Transaction Status Indicators', issue: 'List items do not show pending status or real-time network confirmations.', severity: 'low', impact: 'May cause user to repeat send requests.', recommendation: 'Add subtle pulsating badge for active pending transfers.' }
        ],
        recommendations: [
          { title: 'Add Haptic Feedback & Swipe-to-Action', priority: 'P1 - High Impact', effort: 'Quick Win (< 1 hr)', estimatedLift: '+12% User Delight', stepByStep: ['Implement swipe gestures for swift repeat transfers.'] }
        ],
        colorPalette: [
          { hex: '#0F172A', name: 'Slate 900', role: 'Background', contrastPass: true },
          { hex: '#0284C7', name: 'Sky 600', role: 'Primary', contrastPass: true },
          { hex: '#4F46E5', name: 'Indigo 600', role: 'Secondary', contrastPass: true },
          { hex: '#10B981', name: 'Emerald 500', role: 'Accent', contrastPass: true }
        ],
        accessibilityChecks: [
          { criterion: 'Touch Targets', status: 'pass', detail: 'All interactive pills > 48px touch zone.' },
          { criterion: 'Screen Reader Labels', status: 'pass', detail: 'Semantic button structures with aria descriptions.' }
        ]
      }
    }
  },
  {
    id: 'ecommerce-checkout',
    title: 'E-Commerce Modern Checkout & Cart',
    category: 'E-Commerce & Funnel',
    description: 'High-conversion e-commerce drawer with urgency timer, 1-click Express Pay, dynamic discount code validation, and order guarantee.',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%230f172a"><rect width="400" height="260" fill="%230f172a"/><rect x="50" y="30" width="300" height="200" rx="16" fill="%231e293b"/><rect x="70" y="50" width="100" height="14" rx="7" fill="%23f8fafc"/><rect x="70" y="80" width="260" height="40" rx="8" fill="%23334155"/><rect x="70" y="130" width="260" height="30" rx="6" fill="%2310b981"/><rect x="70" y="175" width="260" height="36" rx="8" fill="%236366f1"/></svg>',
    data: {
      id: 'preset-ecommerce-cart',
      timestamp: Date.now(),
      componentName: 'ModernCheckoutDrawer',
      description: 'E-commerce checkout component with real-time promo code calculator, security badges, and express checkout buttons.',
      sourceImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="%230b0f19"><rect width="800" height="600" fill="%230b0f19"/><rect x="180" y="40" width="440" height="520" rx="20" fill="%23131b2e"/><rect x="220" y="80" width="180" height="24" rx="6" fill="%23f8fafc"/><rect x="220" y="130" width="360" height="70" rx="12" fill="%231e293b"/><rect x="220" y="220" width="360" height="70" rx="12" fill="%231e293b"/><rect x="220" y="310" width="360" height="45" rx="8" fill="%23047857"/><rect x="220" y="375" width="360" height="50" rx="10" fill="%234f46e5"/><rect x="220" y="445" width="360" height="40" rx="8" fill="%231e293b"/></svg>',
      imageSpecs: { width: 800, height: 600, sizeKb: 110, mimeType: 'image/png' },
      reactTsxCode: `'use client';

import React, { useState } from 'react';
import { ShoppingBag, Lock, ShieldCheck, Tag, ArrowRight, Trash2, Plus, Minus, Zap } from 'lucide-react';

export default function ModernCheckoutDrawer() {
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(true);

  const pricePerItem = 129.00;
  const subtotal = pricePerItem * quantity;
  const discount = appliedPromo ? subtotal * 0.15 : 0;
  const shipping = 0; // Free shipping
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl">
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Your Order Summary (1 item)</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Free Express Shipping
          </span>
        </div>

        {/* Product item */}
        <div className="py-5 flex gap-4 border-b border-slate-800/80">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-indigo-400 flex-shrink-0 font-bold border border-slate-700">
            <Zap className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white text-sm">AeroPulse Noise-Cancelling Headphones</h3>
                <p className="text-xs text-slate-400 mt-0.5">Matte Obsidian / Spatial Audio Pro</p>
              </div>
              <span className="font-bold text-white text-sm">\${pricePerItem.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-white px-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        </div>

        {/* Promo code box */}
        <div className="my-5 flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Promo code (try VISION15)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button 
            onClick={() => setAppliedPromo(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Calculation breakdown */}
        <div className="space-y-2 text-xs text-slate-400 py-3 border-t border-slate-800">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-slate-200 font-medium">\${subtotal.toFixed(2)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between text-emerald-400">
              <span>Discount (VISION15 - 15%)</span>
              <span className="font-semibold">-\${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span className="text-emerald-400 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
            <span>Total</span>
            <span className="text-indigo-400 text-base">\${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full mt-4 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group transition-all">
          <Lock className="w-4 h-4 text-indigo-200" />
          <span>Complete Secure Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Trust Badges */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encryption</span>
          <span>•</span>
          <span>30-Day Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
}`,
      tailwindHtmlCode: `<div class="max-w-lg mx-auto p-6 bg-slate-900 rounded-3xl border border-slate-800 text-white font-sans">
  <div class="flex justify-between items-center pb-4 border-b border-slate-800">
    <h2 class="font-bold text-lg">Order Summary</h2>
    <span class="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Free Shipping</span>
  </div>
  <button class="w-full mt-6 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30">
    Complete Secure Checkout
  </button>
</div>`,
      appRouterPageCode: `// app/checkout/page.tsx
import ModernCheckoutDrawer from '@/components/ModernCheckoutDrawer';

export default function CheckoutPage() {
  return <ModernCheckoutDrawer />;
}`,
      apiRouteCode: `// app/api/analyze/route.ts
// Standard VisionCode analysis endpoint`,
      audit: {
        overallScore: 92,
        scoreVerdict: 'High Conversion Checkout Funnel with Strong Trust Architecture',
        summary: 'Exceptional friction reduction through free shipping assurances, clear discount visualization, and 256-bit security badges situated immediately around the primary checkout action.',
        estimatedConversionLift: '+22.4% Cart-to-Paid Completion',
        dimensionScores: {
          visualHierarchy: { score: 94, label: 'Visual Hierarchy', summary: 'Total pricing and primary button form a distinct focal cluster.' },
          conversionPower: { score: 95, label: 'CRO & Trust', summary: 'Guarantees and SSL badges close hesitation loops at the final click.' },
          accessibilityContrast: { score: 90, label: 'WCAG Contrast', summary: 'Input fields and line items satisfy all readability targets.' },
          typographySpacing: { score: 91, label: 'Typography & Rhythm', summary: 'Crisp numerical alignment with clear currency symbols.' },
          mobileReadiness: { score: 90, label: 'Mobile Checkout', summary: 'Compact card width designed to fit without horizontal spillover.' }
        },
        strengths: [
          { title: 'Live Discount Feedback', category: 'CRO', description: 'Immediate green highlight for successfully applied promo codes.' },
          { title: 'Zero Hidden Costs', category: 'CRO', description: 'Free shipping clearly stated avoids cart abandonment surprises.' }
        ],
        bottlenecks: [
          { title: 'Missing Express Wallet Buttons', issue: 'Apple Pay and Google Pay 1-click buttons not present above form.', severity: 'medium', impact: 'Adds typing friction for mobile customers.', recommendation: 'Inject Apple Pay / Google Pay button block above the credit card flow.' }
        ],
        recommendations: [
          { title: 'Add 1-Click Apple Pay / Google Pay', priority: 'P0 - Immediate', effort: 'Quick Win (< 1 hr)', estimatedLift: '+14.5% Checkout Rate', stepByStep: ['Include Apple Pay / GPay component buttons with instant tokenized checkout.'] }
        ],
        colorPalette: [
          { hex: '#0F172A', name: 'Slate 900', role: 'Background', contrastPass: true },
          { hex: '#4F46E5', name: 'Indigo 600', role: 'Primary', contrastPass: true },
          { hex: '#10B981', name: 'Emerald 500', role: 'Accent', contrastPass: true },
          { hex: '#FFFFFF', name: 'White', role: 'Text', contrastPass: true }
        ],
        accessibilityChecks: [
          { criterion: 'Form Labels', status: 'pass', detail: 'Input has placeholder and semantic tag iconography.' },
          { criterion: 'Contrast', status: 'pass', detail: 'Buttons meet AA standard.' }
        ]
      }
    }
  }
];
