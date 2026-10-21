import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const ProductionPlanner: React.FC = () => {
  const { products, showToast } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [batchQuantity, setBatchQuantity] = useState<number>(25);
  const [kilnFiringDate, setKilnFiringDate] = useState<string>('2026-10-25');

  const unitCost = selectedProduct.costBreakdown.totalCost;
  const unitPrice = selectedProduct.price;
  const totalBatchCost = Math.round(unitCost * batchQuantity);
  const totalBatchRevenue = Math.round(unitPrice * batchQuantity);
  const totalBatchProfit = totalBatchRevenue - totalBatchCost;
  const siltRequiredKg = Math.round(batchQuantity * 2.2);

  const handleConfirmPlan = () => {
    showToast(
      'success',
      'Batch Scheduled',
      `Production batch of ${batchQuantity} units for "${selectedProduct.title}" recorded on workshop calendar.`
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <CalendarCheck className="w-4 h-4 text-orange-600" /> Capacity & Raw Material Alignment
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Artisan Production & Kiln Batch Planner
        </h1>
        <p className="text-xs text-neutral-500">
          Plan upcoming workshop batches based on verified buyer orders, kiln capacity, and raw material procurement lead times.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Batch Setup & Scheduling
          </h3>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1">
              Select Craft Item to Produce:
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) setSelectedProduct(found);
              }}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-orange-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Planned Batch Quantity</span>
              <span className="font-bold text-orange-600 tabular-nums">{batchQuantity} units</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={batchQuantity}
              onChange={(e) => setBatchQuantity(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
              <span>5 units (Custom sample)</span>
              <span>25 units (Optimal wood kiln batch)</span>
              <span>60 units (Festival volume)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Target Kiln Firing Date
              </label>
              <input
                type="date"
                value={kilnFiringDate}
                onChange={(e) => setKilnFiringDate(e.target.value)}
                className="w-full text-xs p-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Estimated Drying Days
              </label>
              <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-800">
                3-4 Sun-Drying Days
              </div>
            </div>
          </div>

          {/* Raw Material Requisition */}
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 space-y-2">
            <span className="text-xs font-bold text-orange-950 block">
              Estimated Raw Material Requisition:
            </span>
            <div className="flex items-center justify-between text-xs text-orange-900">
              <span>Cauvery Refined River Silt:</span>
              <strong className="tabular-nums text-black">{siltRequiredKg} kg</strong>
            </div>
            <div className="flex items-center justify-between text-xs text-orange-900">
              <span>Firewood & Rice Husk Temper:</span>
              <strong className="tabular-nums text-black">{Math.round(batchQuantity * 0.8)} bundles</strong>
            </div>
          </div>

          <button
            onClick={handleConfirmPlan}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Confirm & Lock Production Schedule</span>
          </button>
        </div>

        {/* Financial Projections Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-gradient-to-br from-black via-neutral-900 to-black text-white rounded-2xl shadow-md border border-neutral-800 space-y-4">
            <span className="text-xs text-neutral-300 font-semibold uppercase tracking-wider block">
              Batch Economics Projection
            </span>

            <div className="space-y-1">
              <div className="text-3xl font-extrabold tabular-nums text-white">
                ₹{totalBatchRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-300">
                Projected Gross Revenue ({batchQuantity} units @ ₹{unitPrice})
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Production Cost:</span>
                <span className="font-bold tabular-nums">₹{totalBatchCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-orange-400 font-bold text-sm">
                <span>Net Livelihood Profit:</span>
                <span className="tabular-nums">₹{totalBatchProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Profit Margin:</span>
                <span className="tabular-nums">{selectedProduct.costBreakdown.profitMarginPercent}%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs text-xs space-y-2">
            <span className="font-bold text-neutral-900 block">Artisan Workshop Note</span>
            <p className="text-neutral-600 leading-relaxed text-[11px]">
              Kiln firings in Vilachery are traditionally combined between 3 artisan households to maximize wood thermal efficiency and reduce carbon emissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
