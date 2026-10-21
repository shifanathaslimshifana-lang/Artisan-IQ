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
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:px-4 bg-orange-50/70 border border-orange-200/80 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
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
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-black hover:text-black'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-black via-neutral-900 to-black text-white rounded-2xl p-4 sm:p-6 shadow-sm border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] sm:text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold px-2.5 py-0.5 rounded-full">
              {t('Madurai Terracotta Cluster')}
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-300">{t('GI Tag Certified Artisan')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            {t('Welcome')}, {currentUser.name}
          </h1>
          <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
            {t('AI Market Intelligence is monitoring 14 metro markets for handcrafted pottery demand.')}{' '}
            {t('Your living wage index is currently operating at 94% fair value.')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setActiveScreen('artisan-recognition')}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Scan className="w-4 h-4" /> {t('AI Product Scan')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-voice')}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Mic className="w-4 h-4 text-orange-400" /> {t('Voice Assistant')}
          </button>
        </div>
      </div>

      {/* KPI Cards Strip: 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Monthly Gross')}</span>
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">₹18,450</div>
          <div className="text-[10px] sm:text-[11px] text-orange-600 mt-1 font-semibold flex items-center gap-1">
            <span>+14.2%</span> <span className="text-neutral-400 hidden xs:inline">{t('vs last mo')}</span>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Net Livelihood')}</span>
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">₹5,840</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-1 truncate">
            {t('Wages + Net margin')}
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Fair Value Index')}</span>
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-black tabular-nums truncate">94/100</div>
          <div className="text-[10px] sm:text-[11px] text-orange-600 mt-1 font-semibold truncate">
            {t('Living wage met')}
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium truncate">{t('Active Orders')}</span>
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 shrink-0" />
          </div>
          <div className="text-base sm:text-2xl font-bold text-neutral-900 tabular-nums truncate">{activeOrdersCount}</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-1 truncate">
            {orders.length} {t('total orders')}
          </div>
        </div>
      </div>

      {/* Flagship Feature Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveScreen('artisan-what-next')}
          className="p-5 bg-white border border-neutral-200 hover:border-orange-500 rounded-xl hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors flex items-center justify-between">
            <span>{t('What Should I Make Next?')}</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {t('AI recommends high-demand, low-risk craft creations matching your clay-turning skills and local raw materials.')}
          </p>
        </div>

        <div
          onClick={() => setActiveScreen('artisan-pricing')}
          className="p-5 bg-white border border-neutral-200 hover:border-black rounded-xl hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center mb-3">
            <Calculator className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 group-hover:text-black transition-colors flex items-center justify-between">
            <span>{t('AI Fair Pricing Calculator')}</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {t('Ensure every hour of your craft labor is remunerated above minimum wage with transparent material & margin math.')}
          </p>
        </div>

        <div
          onClick={() => setActiveScreen('artisan-materials')}
          className="p-5 bg-white border border-neutral-200 hover:border-orange-500 rounded-xl hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <Compass className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors flex items-center justify-between">
            <span>{t('Smart Supplier Discovery')}</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {t('Discover verified Cauvery riverbed clay and natural raw materials with direct distance and bulk price comparisons.')}
          </p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Profit Chart */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">{t('Revenue & Living Income Trend')}</h3>
              <p className="text-xs text-neutral-500">{t('6-Month financial performance of your workshop')}</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-black font-semibold">
                <span className="w-3 h-3 rounded-sm bg-black" /> {t('Gross Revenue')}
              </span>
              <span className="flex items-center gap-1.5 text-orange-600 font-semibold">
                <span className="w-3 h-3 rounded-sm bg-orange-500" /> {t('Net Profit')}
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#000000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#ea580c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Demand Hotspots */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1">{t('Regional Demand Intensity')}</h3>
            <p className="text-xs text-neutral-500 mb-4">{t('Cities with highest purchase interest for terracotta cookware')}</p>

            <div className="space-y-3">
              {REGIONAL_DEMAND.map((item) => (
                <div key={item.region} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-800">{item.region}</span>
                    <span className="font-mono text-neutral-600 tabular-nums">{item.demand}/100</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-black to-orange-500 rounded-full"
                      style={{ width: `${item.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveScreen('artisan-market-gap')}
            className="w-full mt-4 py-2 border border-neutral-300 hover:border-black rounded-lg text-xs font-semibold text-neutral-800 hover:text-orange-600 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t('Explore Market Gaps')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Products & Orders Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-900">{t('Your Catalog Status')}</h3>
            <button
              onClick={() => setActiveScreen('artisan-products')}
              className="text-xs text-orange-600 hover:text-orange-700 hover:underline font-semibold"
            >
              {t('Manage Catalog →')}
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {products.slice(0, 3).map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-11 h-11 rounded-lg object-cover border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-neutral-900 truncate">{prod.title}</div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      {t('Stock')}: {prod.stock} · {t('Sold')}: {prod.salesCount}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-neutral-900 tabular-nums">₹{prod.price}</div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {prod.costBreakdown.profitMarginPercent}% margin
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-900">{t('Recent Customer Direct Orders')}</h3>
            <button
              onClick={() => setActiveScreen('artisan-orders')}
              className="text-xs text-orange-600 hover:text-orange-700 hover:underline font-semibold"
            >
              {t('View All Orders →')}
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {orders.slice(0, 3).map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{ord.orderNumber}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                        ord.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'production'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {t('Buyer')}: {ord.buyerName} · {ord.items.length} {t('items')}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-neutral-900 tabular-nums">₹{ord.totalAmount}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Est: {ord.estimatedDelivery}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
