import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  Package,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Compass,
  Calculator,
  Scan,
  Mic,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

const SALES_DATA = [
  { month: 'May', revenue: 9800, profit: 3100 },
  { month: 'Jun', revenue: 11400, profit: 3650 },
  { month: 'Jul', revenue: 13200, profit: 4200 },
  { month: 'Aug', revenue: 14800, profit: 4750 },
  { month: 'Sep', revenue: 16900, profit: 5350 },
  { month: 'Oct', revenue: 18450, profit: 5840 },
];

const REGIONAL_DEMAND = [
  { region: 'Bengaluru', demand: 94 },
  { region: 'Chennai', demand: 88 },
  { region: 'Hyderabad', demand: 82 },
  { region: 'Mumbai', demand: 79 },
  { region: 'Madurai Cluster', demand: 68 },
];

export const ArtisanOverview: React.FC = () => {
  const { currentUser, setActiveScreen, products, orders, t, language, setLanguage } = useApp();

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered').length;

  const quickLanguages: { code: any; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Language Indicator & Switcher Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:px-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]" />
          <span>{t('Language / மொழி / भाषा:')}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {quickLanguages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                language === l.code
                  ? 'bg-orange-600 text-white shadow-xs font-bold border border-orange-500'
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Banner - Cinematic Glassmorphism with Indian Craft Motif Glow */}
      <div className="bg-gradient-to-r from-violet-950/40 via-[#0A1138]/70 to-[#060B24]/80 text-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/15 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
        {/* Soft corner radial glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] sm:text-xs bg-orange-500/20 text-orange-300 border border-orange-500/35 font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              {t('Madurai Terracotta Cluster')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-300">{t('GI Tag Certified Artisan')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-200 bg-clip-text text-transparent">
            {t('Welcome')}, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {t('AI Market Intelligence is monitoring 14 metro markets for handcrafted pottery demand.')}{' '}
            {t('Your living wage index is currently operating at 94% fair value.')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto relative z-10">
          <button
            onClick={() => setActiveScreen('artisan-recognition')}
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.35)] flex items-center gap-2 transition-all cursor-pointer border border-white/20"
          >
            <Scan className="w-4 h-4" /> {t('AI Product Scan')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-voice')}
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Mic className="w-4 h-4 text-orange-400" /> {t('Voice Assistant')}
          </button>
        </div>
      </div>

      {/* KPI Cards Strip: 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3.5 sm:p-4 bg-[#0B1230]/65 hover:bg-[#0E173D]/80 rounded-xl border border-white/10 backdrop-blur-md shadow-xl transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Monthly Gross')}</span>
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-white tabular-nums truncate">₹18,450</div>
          <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <span>+14.2%</span> <span className="text-slate-400 hidden xs:inline">{t('vs last mo')}</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 bg-[#0B1230]/65 hover:bg-[#0E173D]/80 rounded-xl border border-white/10 backdrop-blur-md shadow-xl transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Net Livelihood')}</span>
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-white tabular-nums truncate">₹5,840</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 truncate">
            {t('Wages + Net margin')}
          </div>
        </div>

        <div className="p-3.5 sm:p-4 bg-[#0B1230]/65 hover:bg-[#0E173D]/80 rounded-xl border border-white/10 backdrop-blur-md shadow-xl transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Fair Value Index')}</span>
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-white tabular-nums truncate">94/100</div>
          <div className="text-[10px] sm:text-[11px] text-teal-400 mt-1 font-semibold truncate">
            {t('Living wage met')}
          </div>
        </div>

        <div className="p-3.5 sm:p-4 bg-[#0B1230]/65 hover:bg-[#0E173D]/80 rounded-xl border border-white/10 backdrop-blur-md shadow-xl transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Active Orders')}</span>
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-white tabular-nums truncate">{activeOrdersCount}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 truncate">
            {orders.length} {t('total orders')}
          </div>
        </div>
      </div>

      {/* Flagship Feature Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveScreen('artisan-what-next')}
          className="p-5 bg-[#0B1230]/60 hover:bg-[#0F183C]/80 border border-white/10 hover:border-orange-500/40 rounded-xl hover:shadow-[0_0_20px_rgba(234,88,12,0.2)] transition-all cursor-pointer group backdrop-blur-md"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3 border border-orange-500/30">
            <Sparkles className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center justify-between">
            <span>{t('What Should I Make Next?')}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-orange-400 transition-all" />
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {t('AI recommends high-demand, low-risk craft creations matching your clay-turning skills and local raw materials.')}
          </p>
        </div>

        <div
          onClick={() => setActiveScreen('artisan-pricing')}
          className="p-5 bg-[#0B1230]/60 hover:bg-[#0F183C]/80 border border-white/10 hover:border-teal-500/40 rounded-xl hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all cursor-pointer group backdrop-blur-md"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 border border-teal-500/30">
            <Calculator className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors flex items-center justify-between">
            <span>{t('AI Fair Pricing Calculator')}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-teal-400 transition-all" />
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {t('Ensure every hour of your craft labor is remunerated above minimum wage with transparent material & margin math.')}
          </p>
        </div>

        <div
          onClick={() => setActiveScreen('artisan-materials')}
          className="p-5 bg-[#0B1230]/60 hover:bg-[#0F183C]/80 border border-white/10 hover:border-violet-500/40 rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all cursor-pointer group backdrop-blur-md"
        >
          <div className="w-9 h-9 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3 border border-violet-500/30">
            <Compass className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors flex items-center justify-between">
            <span>{t('Smart Supplier Discovery')}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-violet-400 transition-all" />
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {t('Discover verified Cauvery riverbed clay and natural raw materials with direct distance and bulk price comparisons.')}
          </p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Profit Chart */}
        <div className="lg:col-span-2 p-5 bg-[#0B1230]/65 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t('Revenue & Living Income Trend')}</h3>
              <p className="text-xs text-slate-400">{t('6-Month financial performance of your workshop')}</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <span className="w-3 h-3 rounded-sm bg-cyan-400" /> {t('Gross Revenue')}
              </span>
              <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                <span className="w-3 h-3 rounded-sm bg-orange-500" /> {t('Net Profit')}
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#070C24',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#38BDF8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#FB923C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Demand Hotspots */}
        <div className="p-5 bg-[#0B1230]/65 rounded-xl border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">{t('Regional Demand Intensity')}</h3>
            <p className="text-xs text-slate-400 mb-4">{t('Cities with highest purchase interest for terracotta cookware')}</p>

            <div className="space-y-3.5">
              {REGIONAL_DEMAND.map((item) => (
                <div key={item.region} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{item.region}</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{item.demand}/100</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full"
                      style={{ width: `${item.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveScreen('artisan-market-gap')}
            className="w-full mt-4 py-2.5 border border-white/15 hover:border-orange-500/50 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md shadow-xs"
          >
            <span>{t('Explore Market Gaps')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>
      </div>

      {/* Active Products & Orders Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products */}
        <div className="p-5 bg-[#0B1230]/65 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t('Your Catalog Status')}</h3>
            <button
              onClick={() => setActiveScreen('artisan-products')}
              className="text-xs text-orange-400 hover:text-orange-300 hover:underline font-semibold"
            >
              {t('Manage Catalog →')}
            </button>
          </div>

          <div className="divide-y divide-white/10">
            {products.slice(0, 3).map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-11 h-11 rounded-lg object-cover border border-white/15 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{prod.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {t('Stock')}: {prod.stock} · {t('Sold')}: {prod.salesCount}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-white tabular-nums">₹{prod.price}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {prod.costBreakdown.profitMarginPercent}% margin
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="p-5 bg-[#0B1230]/65 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{t('Recent Customer Direct Orders')}</h3>
            <button
              onClick={() => setActiveScreen('artisan-orders')}
              className="text-xs text-orange-400 hover:text-orange-300 hover:underline font-semibold"
            >
              {t('View All Orders →')}
            </button>
          </div>

          <div className="divide-y divide-white/10">
            {orders.slice(0, 3).map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ord.orderNumber}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                        ord.status === 'shipped'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : ord.status === 'production'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {t('Buyer')}: {ord.buyerName} · {ord.items.length} {t('items')}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-white tabular-nums">₹{ord.totalAmount}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Est: {ord.estimatedDelivery}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
