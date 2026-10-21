import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CraftProduct } from '../../types';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export const MyProducts: React.FC = () => {
  const { products, updateProduct, setActiveScreen, setSelected3DProduct, showToast } = useApp();
  const [editingProduct, setEditingProduct] = useState<CraftProduct | null>(null);

  const handleStockChange = (prod: CraftProduct, newStock: number) => {
    updateProduct({ ...prod, stock: Math.max(0, newStock) });
  };

  const handlePriceChange = (prod: CraftProduct, newPrice: number) => {
    updateProduct({ ...prod, price: Math.max(10, newPrice) });
  };

  const handleInspect3D = (prod: CraftProduct) => {
    setSelected3DProduct(prod);
    setActiveScreen('artisan-3d-studio');
    showToast('info', 'Loaded 3D Model', `Inspecting 3D procedural construction of ${prod.title}`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C76B45] uppercase tracking-wider">
            <Package className="w-4 h-4 text-[#C76B45]" /> Artisan Workshop Inventory
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            My Craft Catalog & Stock Management
          </h1>
          <p className="text-xs text-neutral-500">
            Monitor real-time inventory, update selling prices, track unsold risk levels, and inspect 3D procedural craft geometry.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('artisan-recognition')}
          className="px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Craft (AI Scan)
        </button>
      </div>

      {/* Product List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 shadow-xs flex flex-col justify-between transition-all space-y-4"
          >
            <div>
              <div className="flex gap-4 items-start">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {prod.model3DType && (
                    <span className="absolute bottom-1 right-1 bg-neutral-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Layers className="w-2.5 h-2.5 text-amber-300" /> 3D
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">
                      {prod.categoryLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        prod.riskLevel === 'low'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prod.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {prod.riskLevel} Risk
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 mt-0.5 truncate">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    {prod.technique}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold text-indigo-900 tabular-nums">
                      ₹{prod.price}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      (₹{prod.costBreakdown.netProfit} profit / {prod.costBreakdown.profitMarginPercent}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Quick Controls */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-100 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Available Stock (Units)
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStockChange(prod, prod.stock - 1)}
                      className="w-7 h-7 bg-neutral-100 hover:bg-neutral-200 rounded font-bold text-neutral-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-neutral-900 tabular-nums">
                      {prod.stock}
                    </span>
                    <button
                      onClick={() => handleStockChange(prod, prod.stock + 1)}
                      className="w-7 h-7 bg-neutral-100 hover:bg-neutral-200 rounded font-bold text-neutral-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={prod.price}
                    onChange={(e) => handlePriceChange(prod, Number(e.target.value))}
                    className="w-full p-1 border border-neutral-300 rounded text-xs font-bold tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-neutral-400">
                Lifetime Sold: <strong className="text-neutral-700 tabular-nums">{prod.salesCount}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                {prod.model3DType && (
                  <button
                    onClick={() => handleInspect3D(prod)}
                    className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#C76B45]" /> 3D View
                  </button>
                )}
                <button
                  onClick={() => setActiveScreen('artisan-marketing')}
                  className="px-2.5 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Market
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
