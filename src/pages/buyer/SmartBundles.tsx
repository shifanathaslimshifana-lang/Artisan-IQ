import React from 'react';
import { useApp } from '../../context/AppContext';
import { SMART_BUNDLES } from '../../data/demoData';
import {
  Package,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Percent,
} from 'lucide-react';

export const SmartBundles: React.FC = () => {
  const { addToCart, showToast, setActiveScreen } = useApp();

  const handleAddBundle = (bundle: any) => {
    bundle.products.forEach((prod: any) => {
      addToCart(prod, 1);
    });
    showToast('success', 'Bundle Added', `Added all items from "${bundle.bundleName}" with bundle discount.`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-orange-500" /> AI-Curated Product Pairings
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Smart Craft Bundles & Gift Ensembles
        </h1>
        <p className="text-xs text-neutral-500">
          Save on shipping and support multiple mastercraft traditions simultaneously with harmonious handmade pairings.
        </p>
      </div>

      {/* Bundles Grid */}
      <div className="space-y-6">
        {SMART_BUNDLES.map((bundle) => (
          <div
            key={bundle.id}
            className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4 transition-all hover:border-orange-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs text-orange-800 font-semibold bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  {bundle.discountPercent}% Savings Bundle
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">
                  {bundle.bundleName}
                </h3>
                <p className="text-xs text-neutral-500">{bundle.tagline}</p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs line-through text-neutral-400 tabular-nums">
                    ₹{bundle.individualTotal}
                  </span>
                  <span className="text-xl font-extrabold text-black tabular-nums">
                    ₹{bundle.bundlePrice}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  You save ₹{bundle.individualTotal - bundle.bundlePrice}
                </span>
              </div>
            </div>

            {/* Products inside bundle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bundle.products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-3"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-14 h-14 rounded-lg object-cover border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">
                      {prod.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {prod.title}
                    </h4>
                    <span className="text-xs font-semibold text-neutral-700 tabular-nums">
                      ₹{prod.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Compatibility Rationale */}
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200 text-xs text-orange-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong>Aesthetic & Functional Harmony: </strong>
                {bundle.compatibilityReason}
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleAddBundle(bundle)}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Complete Bundle to Basket (₹{bundle.bundlePrice})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
