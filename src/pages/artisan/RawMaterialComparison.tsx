import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeftRight,
  TrendingDown,
  ShieldCheck,
  Truck,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const PRICE_HISTORY_DATA = [
  { month: 'May', muruganClay: 34, guildClay: 26, cottonYarn: 295 },
  { month: 'Jun', muruganClay: 33, guildClay: 25, cottonYarn: 290 },
  { month: 'Jul', muruganClay: 32, guildClay: 24, cottonYarn: 285 },
  { month: 'Aug', muruganClay: 31, guildClay: 24, cottonYarn: 280 },
  { month: 'Sep', muruganClay: 32, guildClay: 23, cottonYarn: 275 },
  { month: 'Oct', muruganClay: 32, guildClay: 24, cottonYarn: 280 },
];

export const RawMaterialComparison: React.FC = () => {
  const { suppliers } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <ArrowLeftRight className="w-4 h-4 text-orange-600" /> Procurement Cost Optimization
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Raw Material Price & Quality Comparison Matrix
        </h1>
        <p className="text-xs text-neutral-500">
          Compare total landed procurement costs across certified suppliers, including transit costs per unit and historical price stability.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900">Active Supplier Offerings</h3>
          <span className="text-xs text-neutral-400">Values calibrated for 50-unit benchmark batch</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                <th className="p-3.5">Material & Supplier</th>
                <th className="p-3.5">Grade</th>
                <th className="p-3.5 text-right">Base Unit Price</th>
                <th className="p-3.5 text-right">Distance</th>
                <th className="p-3.5 text-right">Freight / Unit</th>
                <th className="p-3.5 text-right">Total Landed Cost</th>
                <th className="p-3.5 text-center">GI Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {suppliers.map((s) => {
                const totalLanded = s.unitPrice + s.deliveryCostPerUnit;
                return (
                  <tr key={s.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-neutral-900">{s.materialName}</div>
                      <div className="text-[11px] text-neutral-500">{s.supplierName} ({s.location})</div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-orange-50 text-orange-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-orange-200">
                        {s.grade}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-bold text-neutral-900 tabular-nums">
                      ₹{s.unitPrice} <span className="text-[10px] text-neutral-400 font-normal">/{s.unit.split(' ')[0]}</span>
                    </td>
                    <td className="p-3.5 text-right tabular-nums text-neutral-600">
                      {s.distanceKm} km
                    </td>
                    <td className="p-3.5 text-right tabular-nums text-neutral-600">
                      ₹{s.deliveryCostPerUnit}
                    </td>
                    <td className="p-3.5 text-right font-bold text-emerald-700 tabular-nums">
                      ₹{totalLanded}
                    </td>
                    <td className="p-3.5 text-center">
                      {s.verified ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <span className="text-[10px] text-neutral-400">Standard</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Price Chart */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">6-Month Raw Material Price History (₹/kg)</h3>
            <p className="text-xs text-neutral-500">Track seasonal price dips during post-monsoon riverbed silt extraction</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Clay prices currently 6% below summer peak</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PRICE_HISTORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}`, '']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line type="monotone" dataKey="muruganClay" name="Murugan Cauvery Silt" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="guildClay" name="Guild Pit Clay" stroke="#000000" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
