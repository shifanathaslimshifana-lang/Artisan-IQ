import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RECOMMENDATIONS } from '../../data/demoData';
import { ProductRecommendation } from '../../types';
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Layers,
  Clock,
  ShieldCheck,
  Filter,
} from 'lucide-react';

export const WhatToMakeNext: React.FC = () => {
  const { setActiveScreen, showToast } = useApp();
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>(RECOMMENDATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxDays, setMaxDays] = useState<number>(5);

  const handleStartProduction = (rec: ProductRecommendation) => {
    showToast(
      'success',
      'Production Plan Initialized',
      `Allocated batch capacity for "${rec.productName}". Transferred to Production Planner.`
    );
    setActiveScreen('artisan-production');
  };

  const filtered = recommendations.filter((r) => {
    if (selectedCategory !== 'all' && !r.craftCategory.toLowerCase().includes(selectedCategory)) {
      return false;
    }
    if (r.productionDaysEstimate > maxDays) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-orange-400" /> Flagship Artisan Opportunity Engine
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          What Should I Make Next?
        </h1>
        <p className="text-xs text-slate-300">
          Combines your generational craft techniques with verified metro buyer search demand and nearby raw-material availability to recommend high-margin, low-inventory-risk products.
        </p>
      </div>

      {/* Constraints & Filters */}
      <div className="p-4 glass-liquid-panel rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-white">Filter Preferences:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['all', 'pottery', 'garden', 'cookware'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-lg border capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white border-white/30 font-bold shadow-[0_0_15px_rgba(234,88,12,0.35)]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Max Production Days:</span>
          <select
            value={maxDays}
            onChange={(e) => setMaxDays(Number(e.target.value))}
            className="p-1.5 border border-white/15 rounded-lg bg-[#070C24]/90 text-white text-xs font-semibold focus:outline-none focus:border-cyan-400"
          >
            <option value={2}>2 Days (Fast Cycle)</option>
            <option value={3}>3 Days</option>
            <option value={5}>5 Days (Full Kiln Batch)</option>
            <option value={10}>10 Days</option>
          </select>
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="p-6 glass-liquid-card rounded-2xl space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-orange-300 bg-orange-500/20 px-2.5 py-0.5 rounded border border-orange-500/35 backdrop-blur-xs">
                    {rec.craftCategory}
                  </span>
                  <span className="text-xs text-slate-400">
                    Target: <span className="text-slate-200">{rec.targetMarket}</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {rec.productName}
                </h3>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">AI Confidence</div>
                  <div className="text-sm font-bold text-cyan-300 tabular-nums">
                    {rec.confidenceScore}% Score
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Skill Match</div>
                  <div className="text-sm font-bold text-emerald-400 tabular-nums">
                    {rec.skillMatchPercent}% Match
                  </div>
                </div>
              </div>
            </div>

            {/* Why Recommended Rationale */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 leading-relaxed flex items-start gap-2.5 backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Why this is recommended: </strong>
                {rec.whyRecommended}
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Est. Production Cost</span>
                <span className="font-bold text-white tabular-nums">₹{rec.estimatedProductionCost}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Suggested Retail Price</span>
                <span className="font-bold text-orange-400 tabular-nums">₹{rec.suggestedSellingPrice}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Expected Margin</span>
                <span className="font-bold text-emerald-400 tabular-nums">{rec.expectedMarginPercent}% Net</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Cycle Time</span>
                <span className="font-bold text-white tabular-nums">{rec.productionDaysEstimate} Days</span>
              </div>
            </div>

            {/* Demand Evidence & Potential Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Demand Evidence</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {rec.demandEvidence}
                </p>
              </div>

              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Execution Risk & Calibration</span>
                </div>
                <ul className="text-slate-300 space-y-0.5 text-[11px]">
                  {rec.potentialRisks.map((risk, idx) => (
                    <li key={idx}>• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                <span className="font-semibold text-white">Required Materials:</span>
                <span className="text-slate-300">{rec.requiredMaterials.join(', ')}</span>
              </div>

              <button
                onClick={() => handleStartProduction(rec)}
                className="w-full sm:w-auto justify-center px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all shrink-0 cursor-pointer border border-white/15"
              >
                <span>Start Production Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
