import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ListOrdered,
  TrendingUp,
  FileSpreadsheet,
  Package,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const SUPPLIER_DISPATCH_DATA = [
  { material: 'Cauvery Red Silt', dispatchedKg: 1450, enquiries: 24 },
  { material: 'Rice Husk Temper', dispatchedKg: 620, enquiries: 12 },
  { material: 'Natural Mineral Ochre', dispatchedKg: 180, enquiries: 9 },
  { material: 'Pit Clay Standard', dispatchedKg: 2100, enquiries: 18 },
];

export const SupplierDashboard: React.FC = () => {
  const { currentUser, suppliers, setActiveScreen } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white rounded-2xl p-6 shadow-sm border border-amber-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold px-2.5 py-0.5 rounded-full">
              Cauvery Basin Certified Source
            </span>
            <span className="text-xs text-amber-200">Lead-Free Mineral Testing Verified</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Supplier Portal: {currentUser.name}
          </h1>
          <p className="text-xs text-amber-200 max-w-xl leading-relaxed">
            Supplying natural refined clays, organic fibers, and sustainable metallurgical raw materials to 240 artisan cooperatives in South India.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('supplier-listings')}
          className="w-full sm:w-auto justify-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <ListOrdered className="w-4 h-4" /> Manage Material Catalog
        </button>
      </div>

      {/* KPI stats - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Material Listings
          </span>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">4 Minerals</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">100% verified GI</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Monthly Dispatch
          </span>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">4,350 kg</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">+18% bulk pickup</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Enquiries Queue
          </span>
          <div className="text-base sm:text-2xl font-bold text-amber-700 tabular-nums truncate">3 Pending</div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate">Avg 45 mins</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Quality Rating
          </span>
          <div className="text-base sm:text-2xl font-bold text-indigo-900 tabular-nums truncate">4.8 / 5.0</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">Zero heavy metals</span>
        </div>
      </div>

      {/* Dispatch Volume Chart */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Monthly Material Dispatch to Artisan Clusters
            </h3>
            <p className="text-xs text-neutral-500">
              Bulk volume shipped across Madurai, Kumbakonam, and Thanjavur potteries
            </p>
          </div>
          <button
            onClick={() => setActiveScreen('supplier-price-intel')}
            className="text-xs text-indigo-900 hover:underline font-semibold"
          >
            Price Volatility Analytics →
          </button>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SUPPLIER_DISPATCH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="material" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip
                formatter={(val: any) => [`${val} kg`, 'Dispatched Volume']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Bar dataKey="dispatchedKg" fill="#C76B45" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Action Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => setActiveScreen('supplier-enquiries')}
          className="p-5 bg-white border border-neutral-200 rounded-xl hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Review Artisan Enquiries</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Respond to custom clay grade requests and confirm delivery dates.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-700" />
        </div>

        <div
          onClick={() => setActiveScreen('supplier-price-intel')}
          className="p-5 bg-white border border-neutral-200 rounded-xl hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Price Intelligence & Fuel Trends</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Analyze riverbed silt extraction cycles and diesel freight costs.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-700" />
        </div>
      </div>
    </div>
  );
};
