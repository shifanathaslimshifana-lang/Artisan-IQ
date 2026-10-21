import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CraftProduct } from '../../types';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ProductModeration: React.FC = () => {
  const { products, showToast } = useApp();
  const [moderatedList, setModeratedList] = useState(
    products.map((p) => ({ ...p, approved: true }))
  );

  const handleToggleApproval = (id: string, current: boolean) => {
    setModeratedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, approved: !current } : item))
    );
    showToast(
      'info',
      'Moderation Status Updated',
      `Product ${!current ? 'Approved for National Catalog' : 'Flagged for Review'}`
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4 text-indigo-900" /> Geographic Indication & Fair Value Audit
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Handicraft Listing Moderation & GI Verification
        </h1>
        <p className="text-xs text-neutral-500">
          Inspect artisan submissions for authentic handmade provenance, zero factory plastic adulteration, and fair living wage pricing standards.
        </p>
      </div>

      <div className="space-y-4">
        {moderatedList.map((prod) => (
          <div
            key={prod.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
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
                  <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                    {prod.categoryLabel}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Artisan: {prod.artisanName} ({prod.location})
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900">{prod.title}</h3>

                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <span>Price: <strong className="text-neutral-900 tabular-nums">₹{prod.price}</strong></span>
                  <span>Fair Value Index: <strong className="text-emerald-700 tabular-nums">{prod.fairnessIndex}/100</strong></span>
                  <span>Heritage Score: <strong className="text-indigo-900 tabular-nums">{prod.heritageScore}/100</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleApproval(prod.id, prod.approved)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  prod.approved
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                {prod.approved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>GI Verified & Approved</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Flagged / Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
