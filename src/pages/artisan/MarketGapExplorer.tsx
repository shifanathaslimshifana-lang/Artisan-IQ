import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MARKET_GAPS } from '../../data/demoData';
import {
  SearchCheck,
  TrendingUp,
  MapPin,
  AlertCircle,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const MarketGapExplorer: React.FC = () => {
  const { setActiveScreen, showToast } = useApp();
  const [selectedSupplyFilter, setSelectedSupplyFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredGaps = MARKET_GAPS.filter((gap) => {
    if (selectedSupplyFilter !== 'all' && gap.supplyLevel !== selectedSupplyFilter) {
      return false;
    }
    if (
      searchTerm &&
      !gap.productConcept.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !gap.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <SearchCheck className="w-4 h-4 text-orange-600" /> Untapped Market Opportunity Radar
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Handicraft Market Gap & Underserved Demand Detection
        </h1>
        <p className="text-xs text-neutral-500">
          Identifies high-margin craft categories where urban e-commerce buyer searches far outstrip current artisan supply clusters.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="w-full sm:w-auto flex-1 sm:max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search craft gap or category..."
            className="text-xs p-2 border border-neutral-300 rounded-lg w-full focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-neutral-600">Supply Deficit:</span>
          <div className="flex items-center gap-1">
            {['all', 'Critically Low', 'Moderate'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedSupplyFilter(lvl)}
                className={`px-3 py-1 rounded-lg border text-xs capitalize transition-colors cursor-pointer ${
                  selectedSupplyFilter === lvl
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Gaps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGaps.map((gap) => (
          <div
            key={gap.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-orange-500 shadow-xs flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  {gap.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    gap.supplyLevel === 'Critically Low'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-orange-100 text-orange-800 border border-orange-200'
                  }`}
                >
                  Supply: {gap.supplyLevel}
                </span>
              </div>

              <h3 className="text-sm font-bold text-neutral-900 mb-2">
                {gap.productConcept}
              </h3>

              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                {gap.opportunityRationale}
              </p>

              {/* Metrics */}
              <div className="space-y-2 py-3 border-y border-neutral-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Demand Intensity:</span>
                  <span className="font-bold text-orange-600 tabular-nums">{gap.demandIndex}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Recommended Price:</span>
                  <span className="font-bold text-neutral-900 tabular-nums">
                    ₹{gap.recommendedPriceRange[0]} – ₹{gap.recommendedPriceRange[1]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Potential Net Margin:</span>
                  <span className="font-bold text-emerald-700 tabular-nums">
                    {gap.potentialMarginPercent}%
                  </span>
                </div>
              </div>

              {/* Underserved Regions */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-neutral-600 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" /> Underserved Buyer Hubs:
                </span>
                <div className="flex flex-wrap gap-1">
                  {gap.underservedRegions.map((reg, i) => (
                    <span key={i} className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('info', 'Opportunity Loaded', `Opening Production Planner for "${gap.productConcept}"`);
                setActiveScreen('artisan-production');
              }}
              className="mt-5 w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Target This Gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
