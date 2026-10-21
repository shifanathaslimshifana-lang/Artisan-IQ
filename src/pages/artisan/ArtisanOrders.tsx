import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformOrder } from '../../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  ShieldCheck,
  User,
  MapPin,
} from 'lucide-react';

export const ArtisanOrders: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleNextStatus = (order: PlatformOrder) => {
    let nextStatus: PlatformOrder['status'] = 'accepted';
    if (order.status === 'new') nextStatus = 'accepted';
    else if (order.status === 'accepted') nextStatus = 'production';
    else if (order.status === 'production') nextStatus = 'ready_dispatch';
    else if (order.status === 'ready_dispatch') nextStatus = 'shipped';
    else if (order.status === 'shipped') nextStatus = 'delivered';

    updateOrderStatus(order.id, nextStatus);
  };

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter !== 'all' && ord.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <Truck className="w-4 h-4 text-orange-600" /> Direct Customer Orders & Dispatch
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Artisan Order Lifecycle & Fulfillment
        </h1>
        <p className="text-xs text-neutral-500">
          Track incoming buyer orders from creation to handcrafting, quality inspection, and courier dispatch.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl flex-wrap max-w-full">
        {['all', 'new', 'accepted', 'production', 'ready_dispatch', 'shipped', 'delivered'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-black text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          )
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4"
          >
            {/* Top row */}
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
                  {ord.createdAt.substring(0, 10)}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-neutral-500 mr-2">Total Value:</span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  ₹{ord.totalAmount}
                </span>
              </div>
            </div>

            {/* Buyer & Destination Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" /> Buyer Profile:
                </span>
                <p className="text-neutral-600 font-medium">
                  {ord.buyerName} ({ord.buyerEmail})
                </p>
                <p className="text-neutral-500 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{ord.shippingAddress}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" /> Logistics Details:
                </span>
                <p className="text-neutral-600">
                  Partner: {ord.deliveryPartnerName || 'Karthik Express Rural Logistics'}
                </p>
                {ord.trackingId && (
                  <p className="text-neutral-500 font-mono text-[11px]">
                    Tracking ID: <strong className="text-black">{ord.trackingId}</strong>
                  </p>
                )}
                <p className="text-neutral-500">
                  Target Delivery: <strong className="text-neutral-800">{ord.estimatedDelivery}</strong>
                </p>
              </div>
            </div>

            {/* Items in order */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                Ordered Handcrafted Items
              </span>
              <div className="divide-y divide-neutral-200">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-8 h-8 rounded object-cover border border-neutral-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-semibold text-neutral-800 truncate">{item.title}</span>
                    </div>
                    <div className="shrink-0 font-medium text-neutral-600 tabular-nums">
                      Qty: {item.quantity} × ₹{item.price} = <strong className="text-neutral-900">₹{item.quantity * item.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifecycle Action Button */}
            {ord.status !== 'delivered' && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleNextStatus(ord)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>
                    Advance to{' '}
                    {ord.status === 'new'
                      ? 'Accept Order'
                      : ord.status === 'accepted'
                      ? 'Start Production'
                      : ord.status === 'production'
                      ? 'Mark Ready for Dispatch'
                      : ord.status === 'ready_dispatch'
                      ? 'Handover to Courier'
                      : 'Mark Delivered'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
