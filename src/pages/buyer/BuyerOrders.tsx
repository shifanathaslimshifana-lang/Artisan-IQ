import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const BuyerOrders: React.FC = () => {
  const { orders, setActiveScreen } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Clock className="w-4 h-4 text-emerald-700" /> Transparent Craft Provenance
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          My Direct Artisan Purchases & Live Tracking
        </h1>
        <p className="text-xs text-neutral-500">
          Track handcrafted goods being wheel-turned, sun-cured, and transported via specialized fragile logistics corridors.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-neutral-900">{ord.orderNumber}</span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                    ord.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : ord.status === 'production'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-neutral-100 text-neutral-800'
                  }`}
                >
                  {ord.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Ordered on {ord.createdAt.substring(0, 10)}
                </span>
              </div>

              <div className="text-right">
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  ₹{ord.totalAmount}
                </span>
                <span className="text-[10px] text-emerald-700 block font-medium">Escrow Paid</span>
              </div>
            </div>

            {/* Products inside order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ord.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">{item.title}</h4>
                    <span className="text-[11px] text-neutral-500 block">Artisan: {item.artisanName}</span>
                    <span className="text-xs font-semibold text-neutral-800 tabular-nums">
                      Qty: {item.quantity} · ₹{item.price} each
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracking corridor */}
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-600" />
                <span className="text-neutral-700">
                  Partner: <strong>{ord.deliveryPartnerName || 'Karthik Express Rural Logistics'}</strong>
                </span>
                {ord.trackingId && (
                  <span className="text-neutral-500 font-mono font-semibold">({ord.trackingId})</span>
                )}
              </div>
              <div className="text-neutral-600">
                Est. Delivery: <strong className="text-orange-950 font-bold">{ord.estimatedDelivery}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
