import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupplierMaterial } from '../../types';
import {
  Compass,
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Filter,
} from 'lucide-react';

export const SupplierDiscovery: React.FC = () => {
  const { suppliers, showToast, setActiveScreen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [enquiryModalSupplier, setEnquiryModalSupplier] = useState<SupplierMaterial | null>(null);
  const [enquiryQuantity, setEnquiryQuantity] = useState<number>(50);
  const [enquiryMessage, setEnquiryMessage] = useState<string>('Looking to procure pure Cauvery red silt clay for a 20-piece pottery batch.');

  const filteredSuppliers = suppliers.filter((s) => {
    if (selectedCategory !== 'all' && !s.category.toLowerCase().includes(selectedCategory)) {
      return false;
    }
    return true;
  });

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryModalSupplier) return;
    showToast(
      'success',
      'Enquiry Dispatched to Supplier',
      `Sent request for ${enquiryQuantity} ${enquiryModalSupplier.unit} to ${enquiryModalSupplier.supplierName}.`
    );
    setEnquiryModalSupplier(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-orange-600" /> Transparent Raw Material Supply Lines
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Smart Supplier Discovery & Match Engine
        </h1>
        <p className="text-xs text-neutral-500">
          Connect directly with certified raw material extractors and farmer collectives. AI ranks suppliers by material compatibility, transport distance, and price stability.
        </p>
      </div>

      {/* Filter bar */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-neutral-600">Material Category:</span>
          <div className="flex items-center gap-1">
            {['all', 'clay', 'textiles', 'fibers', 'metals'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg border text-xs capitalize transition-colors cursor-pointer ${
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

        <button
          onClick={() => setActiveScreen('artisan-comparison')}
          className="text-xs text-orange-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          Compare Prices & Quality Grades →
        </button>
      </div>

      {/* Supplier Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSuppliers.map((sup) => (
          <div
            key={sup.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-emerald-300 shadow-xs flex flex-col justify-between transition-all space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-neutral-900">{sup.supplierName}</span>
                    {sup.verified && (
                      <span title="Council Verified Supplier">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>{sup.location} ({sup.distanceKm} km away)</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-neutral-500 font-medium">Match Score</div>
                  <div className="text-sm font-bold text-emerald-700 tabular-nums">
                    {sup.matchScore}% AI Match
                  </div>
                </div>
              </div>

              {/* Material Details */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 my-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900">{sup.materialName}</span>
                  <span className="text-[11px] font-semibold text-orange-800 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                    {sup.grade}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600 mt-2">
                  <span>Unit Rate: <strong className="text-neutral-900 tabular-nums">₹{sup.unitPrice}</strong> / {sup.unit}</span>
                  <span>Min Order: <strong className="text-neutral-900 tabular-nums">{sup.minOrderQuantity}</strong></span>
                </div>
              </div>

              {/* Match reasons */}
              <div className="space-y-1 text-[11px] text-neutral-600">
                <span className="font-semibold text-neutral-700 block text-xs">Why this supplier matches:</span>
                {sup.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Logistics & Action */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Est. Delivery: {sup.deliveryDays} Days (₹{sup.deliveryCostPerUnit}/unit)</span>
              </div>

              <button
                onClick={() => setEnquiryModalSupplier(sup)}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Enquiry</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enquiry Modal */}
      {enquiryModalSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Enquiry to {enquiryModalSupplier.supplierName}
                </h3>
                <p className="text-xs text-neutral-500">
                  Material: {enquiryModalSupplier.materialName} ({enquiryModalSupplier.grade})
                </p>
              </div>
              <button
                onClick={() => setEnquiryModalSupplier(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEnquiry} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Required Quantity ({enquiryModalSupplier.unit})
                </label>
                <input
                  type="number"
                  min={enquiryModalSupplier.minOrderQuantity}
                  value={enquiryQuantity}
                  onChange={(e) => setEnquiryQuantity(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums"
                  required
                />
                <span className="text-[10px] text-neutral-500">
                  Minimum Order Quantity: {enquiryModalSupplier.minOrderQuantity}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Artisan Workshop Notes / Specifications
                </label>
                <textarea
                  rows={3}
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  className="w-full text-xs p-2 border border-neutral-300 rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Material Cost:</span>
                  <span className="font-bold tabular-nums">₹{enquiryQuantity * enquiryModalSupplier.unitPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Shipping ({enquiryModalSupplier.distanceKm} km):</span>
                  <span className="font-bold tabular-nums">₹{Math.round(enquiryQuantity * enquiryModalSupplier.deliveryCostPerUnit)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEnquiryModalSupplier(null)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Dispatch Direct Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
