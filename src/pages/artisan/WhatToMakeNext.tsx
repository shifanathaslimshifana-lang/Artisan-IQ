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
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-600" /> Flagship Artisan Opportunity Engine
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          What Should I Make Next?
        </h1>
        <p className="text-xs text-neutral-500">
          Combines your generational craft techniques with verified metro buyer search demand and nearby raw-material availability to recommend high-margin, low-inventory-risk products.
        </p>
      </div>

      {/* Constraints & Filters */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-neutral-500" />
          <span className="text-xs font-bold text-neutral-800">Filter Preferences:</span>
          <div className="flex items-center gap-1.5">
            {['all', 'pottery', 'garden', 'cookware'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-600 font-medium">Max Production Days:</span>
          <select
            value={maxDays}
            onChange={(e) => setMaxDays(Number(e.target.value))}
            className="p-1.5 border border-neutral-300 rounded-lg bg-neutral-50 text-xs font-semibold"
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
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-amber-300 shadow-xs transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {rec.craftCategory}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Target: {rec.targetMarket}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 mt-1">
                  {rec.productName}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-neutral-500">AI Confidence</div>
                  <div className="text-sm font-bold text-black tabular-nums">
                    {rec.confidenceScore}% Score
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500">Skill Match</div>
                  <div className="text-sm font-bold text-emerald-700 tabular-nums">
                    {rec.skillMatchPercent}% Match
                  </div>
                </div>
              </div>
            </div>

            {/* Why Recommended Rationale */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900">Why this is recommended: </strong>
                {rec.whyRecommended}
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-neutral-100 text-xs">
              <div>
                <span className="text-neutral-500 block text-[11px]">Est. Production Cost</span>
                <span className="font-bold text-neutral-900 tabular-nums">₹{rec.estimatedProductionCost}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Suggested Retail Price</span>
                <span className="font-bold text-orange-600 tabular-nums">₹{rec.suggestedSellingPrice}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Expected Margin</span>
                <span className="font-bold text-emerald-700 tabular-nums">{rec.expectedMarginPercent}% Net</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Cycle Time</span>
                <span className="font-bold text-neutral-900 tabular-nums">{rec.productionDaysEstimate} Days</span>
              </div>
            </div>

            {/* Demand Evidence & Potential Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Demand Evidence</span>
                </div>
                <p className="text-neutral-600 leading-relaxed text-[11px]">
                  {rec.demandEvidence}
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Execution Risk & Calibration</span>
                </div>
                <ul className="text-neutral-600 space-y-0.5 text-[11px]">
                  {rec.potentialRisks.map((risk, idx) => (
                    <li key={idx}>• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-700">Required Materials:</span>
                <span>{rec.requiredMaterials.join(', ')}</span>
              </div>

              <button
                onClick={() => handleStartProduction(rec)}
                className="w-full sm:w-auto justify-center px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
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
