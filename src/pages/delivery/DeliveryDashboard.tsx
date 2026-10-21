import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const { deliveries, updateDeliveryStatus, showToast } = useApp();

  const handleAdvanceDelivery = (deliveryId: string, currentStatus: string) => {
    let nextStatus: any = 'picked_up';
    let location = 'En Route from Madurai Potter Cluster';

    if (currentStatus === 'assigned') {
      nextStatus = 'picked_up';
      location = 'Departed Madurai Potter Hub (Suspension Crate Loaded)';
    } else if (currentStatus === 'picked_up') {
      nextStatus = 'in_transit';
      location = 'Salem-Hosur Highway Checkpost';
    } else if (currentStatus === 'in_transit') {
      nextStatus = 'out_for_delivery';
      location = 'Whitefield Delivery Van (Final Mile)';
    } else if (currentStatus === 'out_for_delivery') {
      nextStatus = 'delivered';
      location = 'Delivered to Customer (Break-Free Verified)';
    }

    updateDeliveryStatus(deliveryId, nextStatus, location);
    showToast('success', 'Consignment Status Broadcasted', `Parcel advanced to ${nextStatus.replace('_', ' ')}`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-2xl p-6 shadow-sm border border-blue-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold px-2.5 py-0.5 rounded-full">
              Padded Handicraft Fleet
            </span>
            <span className="text-xs text-blue-200">0.4% Industry-Lowest Breakage Rate</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Logistics Command: Karthik Express Rural Fleet
          </h1>
          <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
            Specialized shock-absorbing transport for porous terracotta, delicate Tanjore dolls, and hand-cast bell metal brassware across Tamil Nadu and metro corridors.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-blue-300">Active Transit Parcels</div>
          <div className="text-3xl font-extrabold text-white tabular-nums">
            {deliveries.filter((d) => d.status !== 'delivered').length} Active
          </div>
        </div>
      </div>

      {/* Assigned Deliveries List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-neutral-900">Assigned Craft Shipments</h3>

        {deliveries.map((del) => (
          <div
            key={del.id}
            className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-neutral-900">{del.orderNumber}</span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                    del.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : del.status === 'in_transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {del.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Weight: {del.weightKg} kg
                </span>
              </div>

              <div className="text-xs text-neutral-500 font-medium">
                ETA: <strong className="text-neutral-900">{del.estimatedArrival}</strong>
              </div>
            </div>

            {/* Pickup & Drop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Artisan Pickup Point
                </span>
                <p className="font-bold text-neutral-900">{del.artisanName}</p>
                <p className="text-neutral-600 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C76B45] shrink-0 mt-0.5" />
                  <span>{del.pickupLocation}</span>
                </p>
                <p className="text-neutral-500 flex items-center gap-1 font-mono text-[11px]">
                  <Phone className="w-3 h-3 text-neutral-400" /> {del.pickupPhone}
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Buyer Delivery Destination
                </span>
                <p className="font-bold text-neutral-900">{del.buyerName}</p>
                <p className="text-neutral-600 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{del.deliveryDestination}</span>
                </p>
                <p className="text-neutral-500 flex items-center gap-1 font-mono text-[11px]">
                  <Phone className="w-3 h-3 text-neutral-400" /> {del.buyerPhone}
                </p>
              </div>
            </div>

            {/* Current Transit Milestone */}
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Current Checkpoint: <strong className="text-blue-900">{del.currentLocation}</strong></span>
              </div>
              <span className="text-[11px] text-blue-700 font-semibold">
                Package: {del.packageType}
              </span>
            </div>

            {/* Action Advance */}
            {del.status !== 'delivered' && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleAdvanceDelivery(del.id, del.status)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>
                    Advance Checkpoint to{' '}
                    {del.status === 'assigned'
                      ? 'Confirm Pickup'
                      : del.status === 'picked_up'
                      ? 'Mark In-Transit'
                      : del.status === 'in_transit'
                      ? 'Out for Delivery'
                      : 'Delivered (Break-Free Verified)'}
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
