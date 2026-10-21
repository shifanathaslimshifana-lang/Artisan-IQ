import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
} from 'lucide-react';

export const InventoryRisk: React.FC = () => {
  const { products, setActiveScreen, showToast } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-600" /> Working Capital & Stock Optimization
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Unsold Inventory Risk Prediction & Mitigation
        </h1>
        <p className="text-xs text-neutral-500">
          Identifies slow-moving craft inventory using product age, historical sales velocity, and regional festival cycles to protect artisan cashflow.
        </p>
      </div>

      {/* Product Risk Cards */}
      <div className="space-y-4">
        {products.map((prod) => {
          let riskColor = 'border-emerald-200 bg-emerald-50/40 text-emerald-800';
          let mitigation = 'Healthy turnover rate. Continue maintaining regular production batches.';

          if (prod.riskLevel === 'high') {
            riskColor = 'border-red-200 bg-red-50/40 text-red-800';
            mitigation =
              'Action Needed: Current velocity is slow. Bundle with high-demand terracotta items or launch a seasonal gift set.';
          } else if (prod.riskLevel === 'medium') {
            riskColor = 'border-amber-200 bg-amber-50/40 text-amber-800';
            mitigation =
              'Moderately moving. Consider promoting on WhatsApp directly to interior designers in Bengaluru.';
          }

          return (
            <div
              key={prod.id}
              className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-neutral-300"
            >
              <div className="flex items-start gap-4">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${riskColor}`}
                    >
                      {prod.riskLevel} Risk
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      Category: {prod.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900">{prod.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span>Stock: <strong className="text-neutral-800 tabular-nums">{prod.stock} units</strong></span>
                    <span>Sold: <strong className="text-neutral-800 tabular-nums">{prod.salesCount} units</strong></span>
                    <span>Price: <strong className="text-neutral-800 tabular-nums">₹{prod.price}</strong></span>
                  </div>

                  <p className="text-xs text-neutral-600 mt-2 font-medium">
                    {mitigation}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                {prod.riskLevel === 'high' ? (
                  <button
                    onClick={() => {
                      showToast('info', 'Bundle Recommended', 'Opening Smart Bundles to reduce inventory drag.');
                      setActiveScreen('buyer-bundles');
                    }}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Smart Bundle</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      showToast('info', 'Pricing Check', 'Navigating to Fair Pricing calculator.');
                      setActiveScreen('artisan-pricing');
                    }}
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Recalibrate Price</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
