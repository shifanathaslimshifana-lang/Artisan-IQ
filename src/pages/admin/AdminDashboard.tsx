import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Award,
  AlertTriangle,
  Scale,
  TrendingUp,
  FileCheck2,
  Building2,
  ArrowRight,
  Download,
  FileSpreadsheet,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CLUSTER_GROWTH_DATA = [
  { month: 'May', registeredArtisans: 120, totalTradeVolume: 340000, livelihoodUplift: 38 },
  { month: 'Jun', registeredArtisans: 155, totalTradeVolume: 490000, livelihoodUplift: 41 },
  { month: 'Jul', registeredArtisans: 195, totalTradeVolume: 620000, livelihoodUplift: 43 },
  { month: 'Aug', registeredArtisans: 230, totalTradeVolume: 780000, livelihoodUplift: 44 },
  { month: 'Sep', registeredArtisans: 275, totalTradeVolume: 960000, livelihoodUplift: 46 },
  { month: 'Oct', registeredArtisans: 310, totalTradeVolume: 1140000, livelihoodUplift: 48 },
];

export const AdminDashboard: React.FC = () => {
  const { currentUser, setActiveScreen, products, orders, showToast } = useApp();

  const handleDownloadReport = () => {
    // Generate clean CSV content formatted for evaluation & presentation
    const rows = [
      ['# ARTISAN-TO-MARKET INTELLIGENCE PLATFORM - NATIONAL IMPACT REPORT'],
      ['# Tagline: Right Product -> Right Supplier -> Right Price -> Right Market -> Sustainable Income'],
      [`# Exported At: ${new Date().toISOString()}`],
      [`# Governance Authority: ${currentUser.name} (${currentUser.title})`],
      [''],
      ['SECTION 1: KEY PLATFORM METRICS SUMMARY'],
      ['Metric', 'Value', 'Benchmark / Impact Note'],
      ['Registered Master Artisans', '310 Verified', '14 Craft Clusters across South India'],
      ['Cumulative Direct Trade Volume', 'INR 11,40,000', '100% direct artisan payout via Escrow'],
      ['Middleman Loss Prevented', 'INR 3,85,000', 'Trader markups re-routed to artisan wages'],
      ['GI Provenance Integrity Score', '98.6%', 'Zero synthetic/factory counterfeit detected'],
      ['Average Livelihood Uplift', '+44.8%', 'Above traditional local middleman trader baseline'],
      ['Artisan Fair-Value Index', '94/100', 'Full material cost recovery & living wage compliance'],
      [''],
      ['SECTION 2: 6-MONTH CLUSTER GROWTH & VOLUME'],
      ['Month', 'Registered Artisans', 'Gross Trade Volume (INR)', 'Livelihood Uplift (%)'],
      ...CLUSTER_GROWTH_DATA.map((row) => [
        row.month,
        row.registeredArtisans,
        row.totalTradeVolume,
        `${row.livelihoodUplift}%`,
      ]),
      [''],
      ['SECTION 3: ACTIVE PRODUCT CATALOG & FAIR PRICING COMPLIANCE'],
      ['Product ID', 'Product Title', 'Category', 'Artisan Name', 'Location', 'Fair Price (INR)', 'Labor Wage (INR)', 'Net Profit Margin (%)', 'Risk Level'],
      ...products.map((p) => [
        p.id,
        `"${p.title.replace(/"/g, '""')}"`,
        p.categoryLabel,
        `"${p.artisanName}"`,
        `"${p.location}"`,
        p.price,
        p.costBreakdown.labourHours * p.costBreakdown.labourRatePerHour,
        `${p.costBreakdown.profitMarginPercent}%`,
        p.riskLevel,
      ]),
      [''],
      ['SECTION 4: ACTIVE ORDERS & FULFILLMENT STATUS'],
      ['Order ID', 'Order Number', 'Buyer Name', 'Destination', 'Total Value (INR)', 'Status', 'Escrow Payment Status'],
      ...orders.map((o) => [
        o.id,
        o.orderNumber,
        `"${o.buyerName}"`,
        `"${o.buyerLocation}"`,
        o.totalAmount,
        o.status,
        o.paymentStatus,
      ]),
    ];

    const csvString = rows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `artisan_market_intelligence_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      'success',
      'Report Downloaded Successfully',
      'Exported national craft metrics and pricing analytics as CSV for presentation.'
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-900 text-white rounded-2xl p-6 shadow-sm border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold px-2.5 py-0.5 rounded-full">
              National Handicraft Oversight
            </span>
            <span className="text-xs text-indigo-200">Fair Trade & GI Certification Council</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Director's Governance Console: {currentUser.name}
          </h1>
          <p className="text-xs text-indigo-200 max-w-xl leading-relaxed">
            Monitoring 14 southern craft clusters for living wage price compliance, authentic GI documentation, and verified direct-from-artisan economic empowerment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            title="Export platform metrics as CSV file"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            <span>Download Report (CSV)</span>
          </button>

          <button
            onClick={() => setActiveScreen('admin-moderation')}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-neutral-950 text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
          >
            <FileCheck2 className="w-4 h-4" /> Moderate Products & GI
          </button>
        </div>
      </div>

      {/* KPI Stats - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Registered Artisans
          </span>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">310 Verified</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">+15 this week</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Fair Trade Volume
          </span>
          <div className="text-base sm:text-2xl font-bold text-indigo-900 tabular-nums truncate">₹11.4 Lakhs</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium truncate">100% direct payout</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            GI Integrity Score
          </span>
          <div className="text-base sm:text-2xl font-bold text-emerald-700 tabular-nums truncate">98.6%</div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate">0 counterfeit</span>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-1 truncate">
            Livelihood Uplift
          </span>
          <div className="text-base sm:text-2xl font-bold text-[#C76B45] tabular-nums truncate">+44.8%</div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate">Above baseline</span>
        </div>
      </div>

      {/* Cluster Trade Volume Chart */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              National Fair Trade Direct Volume Growth (INR ₹)
            </h3>
            <p className="text-xs text-neutral-500">
              Aggregate artisan earnings through AI market matching and transparent pricing
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg">
            310 Certified Artisans Active
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CLUSTER_GROWTH_DATA}>
              <defs>
                <linearGradient id="colorAdminRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#312E81" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#312E81" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Total Volume']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="totalTradeVolume" stroke="#312E81" strokeWidth={2} fillOpacity={1} fill="url(#colorAdminRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hackathon Reports & Export Card */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
            <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-900">
                Hackathon Presentation Data Export
              </h3>
              <span className="text-[10px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                CSV Format
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl leading-relaxed">
              Download the complete dataset containing 6-month cluster trade volumes, fair wage breakdowns, middleman savings, active catalog items, and order fulfillment states for judging slides.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadReport}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-200" />
          <span>Export Metrics (CSV)</span>
        </button>
      </div>

      {/* Navigation Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveScreen('admin-users')}
          className="p-5 bg-white border border-neutral-200 rounded-xl hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-neutral-900">User & Cluster Roles</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage artisan collectives, supplier credentials, and buyer verifications.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-900 shrink-0" />
        </div>

        <div
          onClick={() => setActiveScreen('admin-moderation')}
          className="p-5 bg-white border border-neutral-200 rounded-xl hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Product & GI Audits</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Inspect new pottery and brass listings for fair price living wage compliance.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-900 shrink-0" />
        </div>

        <div
          onClick={() => setActiveScreen('admin-ethics')}
          className="p-5 bg-white border border-neutral-200 rounded-xl hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Ethical AI & Privacy</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review AI transparency, consent preferences, and model limitation audits.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-900 shrink-0" />
        </div>
      </div>
    </div>
  );
};
