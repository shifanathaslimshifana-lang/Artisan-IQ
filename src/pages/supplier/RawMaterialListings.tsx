import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ListOrdered,
  Plus,
  ShieldCheck,
  Edit2,
  Trash2,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

export const RawMaterialListings: React.FC = () => {
  const { suppliers, showToast } = useApp();
  const [materials, setMaterials] = useState(suppliers);

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unitPrice: Math.max(1, newPrice) } : m))
    );
    showToast('info', 'Price Updated', 'Supplier catalog price saved.');
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, availableStock: Math.max(0, newStock) } : m))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <ListOrdered className="w-4 h-4 text-amber-700" /> Natural Resources & Certified Minerals
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            Supplier Raw Material Catalog & Stock
          </h1>
          <p className="text-xs text-neutral-500">
            Publish certified clay, natural fibers, and metal alloy batches to regional artisan cooperatives with verified lab test certifications.
          </p>
        </div>

        <button
          onClick={() => showToast('info', 'New Material Form', 'Opening new certified material listing form.')}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Material Batch
        </button>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                  {mat.grade}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  Origin: {mat.location}
                </span>
                {mat.verified && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Tested Lead-Free
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-neutral-900">{mat.materialName}</h3>

              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <span>Unit: <strong className="text-neutral-800">{mat.unit}</strong></span>
                <span>Min Order: <strong className="text-neutral-800 tabular-nums">{mat.minOrderQuantity}</strong></span>
                <span>Delivery: <strong className="text-neutral-800 tabular-nums">{mat.deliveryDays} Days</strong></span>
              </div>
            </div>

            {/* Quick Price & Stock Controls */}
            <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100">
              <div className="text-right">
                <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                  Unit Price (₹)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-neutral-700">₹</span>
                  <input
                    type="number"
                    value={mat.unitPrice}
                    onChange={(e) => handleUpdatePrice(mat.id, Number(e.target.value))}
                    className="w-20 p-1 border border-neutral-300 rounded text-xs font-bold tabular-nums text-right"
                  />
                </div>
              </div>

              <div className="text-right">
                <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                  Available Stock
                </label>
                <input
                  type="number"
                  value={mat.availableStock}
                  onChange={(e) => handleUpdateStock(mat.id, Number(e.target.value))}
                  className="w-24 p-1 border border-neutral-300 rounded text-xs font-bold tabular-nums text-right"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
