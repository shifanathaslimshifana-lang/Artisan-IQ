import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  HeartHandshake,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const MONTHLY_IMPACT_DATA = [
  { month: 'Jun', grossRevenue: 11400, artisanNetIncome: 3650, middlemanLossPrevented: 4100 },
  { month: 'Jul', grossRevenue: 13200, artisanNetIncome: 4200, middlemanLossPrevented: 4900 },
  { month: 'Aug', grossRevenue: 14800, artisanNetIncome: 4750, middlemanLossPrevented: 5400 },
  { month: 'Sep', grossRevenue: 16900, artisanNetIncome: 5350, middlemanLossPrevented: 6100 },
  { month: 'Oct', grossRevenue: 18450, artisanNetIncome: 5840, middlemanLossPrevented: 6850 },
];

export const ArtisanImpact: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-700" /> Transparent Livelihood Accounting
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Artisan Economic Impact & Livelihood Dashboard
        </h1>
        <p className="text-xs text-neutral-500">
          Measures tangible economic independence by comparing direct fair trade prices against traditional exploitative middleman commission deductions.
        </p>
      </div>

      {/* High-level impact stats - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Direct Sales
          </span>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">₹74,750</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">5 active months</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Artisan Take-Home
          </span>
          <div className="text-base sm:text-2xl font-bold text-indigo-900 tabular-nums truncate">₹23,790</div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate">100% retained</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Middleman Saved
          </span>
          <div className="text-base sm:text-2xl font-bold text-[#C76B45] tabular-nums truncate">₹27,350</div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate">From trader cuts</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Repeat Buyers
          </span>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">42%</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">Brand loyalty</span>
        </div>
      </div>

      {/* Income & Middleman Prevention Chart */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Artisan Income vs. Middleman Value Capture (₹)
            </h3>
            <p className="text-xs text-neutral-500">
              Shows how direct platform access channels wealth back to the craft maker
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>Fair Trade Direct</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_IMPACT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}`, '']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="artisanNetIncome" name="Artisan Net Income" fill="#312E81" radius={[4, 4, 0, 0]} />
              <Bar dataKey="middlemanLossPrevented" name="Middleman Loss Prevented" fill="#C76B45" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
