import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Scan,
  Mic,
  Package,
  TrendingUp,
  Lightbulb,
  SearchCheck,
  Calculator,
  Compass,
  ArrowLeftRight,
  Share2,
  Award,
  Users,
  CalendarCheck,
  AlertTriangle,
  Truck,
  MessageSquareHeart,
  BarChart3,
  Landmark,
  Settings,
  Building2,
  ListOrdered,
  FileSpreadsheet,
  Store,
  Bot,
  Sparkles,
  ShoppingBag,
  Clock,
  ShieldCheck,
  UserCheck,
  Scale,
  FileCheck2,
  SlidersHorizontal,
  X,
  Globe,
  LogOut,
} from 'lucide-react';
import { LanguageCode } from '../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const {
    currentRole,
    activeScreen,
    setActiveScreen,
    setIsDemoLoginOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    t,
    language,
    setLanguage,
    logout,
  } = useApp();

  const languages: { code: LanguageCode; shortLabel: string; label: string }[] = [
    { code: 'en', shortLabel: 'EN', label: 'English' },
    { code: 'ta', shortLabel: 'TA', label: 'தமிழ்' },
    { code: 'hi', shortLabel: 'HI', label: 'हिन्दी' },
    { code: 'te', shortLabel: 'TE', label: 'తెలుగు' },
    { code: 'kn', shortLabel: 'KN', label: 'ಕನ್ನಡ' },
    { code: 'ml', shortLabel: 'ML', label: 'മലയാളം' },
  ];

  // Navigation items grouped by workspace
  const ARTISAN_NAV: NavItem[] = [
    { id: 'artisan-overview', label: 'Artisan Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'artisan-recognition', label: 'AI Product Recognition', icon: <Scan className="w-4 h-4 text-orange-500" />, badge: 'Gemini' },
    { id: 'artisan-voice', label: 'Voice AI Assistant', icon: <Mic className="w-4 h-4" /> },
    { id: 'artisan-products', label: 'My Products & Catalog', icon: <Package className="w-4 h-4" /> },
    { id: 'artisan-market-intel', label: 'Demand Intelligence', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'artisan-what-next', label: 'What Should I Make Next?', icon: <Lightbulb className="w-4 h-4 text-orange-500" />, badge: 'AI Match' },
    { id: 'artisan-market-gap', label: 'Market Gap Detection', icon: <SearchCheck className="w-4 h-4" /> },
    { id: 'artisan-pricing', label: 'AI Fair Pricing Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'artisan-materials', label: 'Smart Supplier Discovery', icon: <Compass className="w-4 h-4" /> },
    { id: 'artisan-comparison', label: 'Raw Material Comparison', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'artisan-marketing', label: 'Marketing Studio & Copy', icon: <Share2 className="w-4 h-4" /> },
    { id: 'artisan-heritage', label: 'Heritage & Authenticity', icon: <Award className="w-4 h-4" /> },
    { id: 'artisan-3d-studio', label: '3D Craft Inspection Studio', icon: <Sparkles className="w-4 h-4 text-orange-500" />, badge: 'Three.js' },
    { id: 'artisan-production', label: 'Production Planner', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'artisan-inventory', label: 'Inventory & Risk Prediction', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'artisan-orders', label: 'Orders & Dispatches', icon: <Truck className="w-4 h-4" /> },
    { id: 'artisan-impact', label: 'Artisan Impact Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'artisan-cultural', label: 'Cultural Preservation Hub', icon: <Landmark className="w-4 h-4" /> },
    { id: 'artisan-feedback', label: 'AI Feedback & Retraining Loop', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'artisan-settings', label: 'AI & Livelihood Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const SUPPLIER_NAV: NavItem[] = [
    { id: 'supplier-dashboard', label: 'Supplier Dashboard', icon: <Building2 className="w-4 h-4" /> },
    { id: 'supplier-listings', label: 'Raw Material Catalog', icon: <ListOrdered className="w-4 h-4" /> },
    { id: 'supplier-price-intel', label: 'Price & Riverbed Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'supplier-enquiries', label: 'Incoming Artisan Enquiries', icon: <FileSpreadsheet className="w-4 h-4" />, badge: '3 New' },
    { id: 'supplier-orders', label: 'Supplier Fulfillment Orders', icon: <Package className="w-4 h-4" /> },
  ];

  const BUYER_NAV: NavItem[] = [
    { id: 'buyer-marketplace', label: 'Craft Marketplace', icon: <Store className="w-4 h-4" /> },
    { id: 'buyer-ai-assistant', label: 'AI Buyer Assistant', icon: <Bot className="w-4 h-4 text-emerald-600" />, badge: 'Chat' },
    { id: 'buyer-recommendations', label: 'Curated Recommendations', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'buyer-bundles', label: 'Smart Bundles & Gifts', icon: <Package className="w-4 h-4" /> },
    { id: 'buyer-cart', label: 'Shopping Cart', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'buyer-orders', label: 'My Direct Artisan Orders', icon: <Clock className="w-4 h-4" /> },
  ];

  const DELIVERY_NAV: NavItem[] = [
    { id: 'delivery-dashboard', label: 'Logistics Command Hub', icon: <Truck className="w-4 h-4" /> },
    { id: 'delivery-assigned', label: 'Fragile Handicraft Parcels', icon: <Package className="w-4 h-4" />, badge: '2 Active' },
    { id: 'delivery-tracking', label: 'Corridor Transit Tracking', icon: <Compass className="w-4 h-4" /> },
  ];

  const ADMIN_NAV: NavItem[] = [
    { id: 'admin-overview', label: 'Council Admin Overview', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'admin-users', label: 'User Governance & Roles', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'admin-moderation', label: 'Product & GI Verification', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'admin-suppliers', label: 'Supplier Material Audits', icon: <Building2 className="w-4 h-4" /> },
    { id: 'admin-reports', label: 'Fair Trade & Impact Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'admin-ethics', label: 'Ethical AI & Data Privacy', icon: <Scale className="w-4 h-4" /> },
  ];

  const getWorkspaceNav = (role: UserRole) => {
    switch (role) {
      case 'artisan':
        return { title: 'Artisan Workspace', items: ARTISAN_NAV };
      case 'supplier':
        return { title: 'Supplier Workspace', items: SUPPLIER_NAV };
      case 'buyer':
        return { title: 'Buyer Workspace', items: BUYER_NAV };
      case 'delivery':
        return { title: 'Delivery Workspace', items: DELIVERY_NAV };
      case 'admin':
        return { title: 'Admin Workspace', items: ADMIN_NAV };
    }
  };

  const currentWorkspace = getWorkspaceNav(currentRole);

  const handleSelectScreen = (screenId: string) => {
    setActiveScreen(screenId);
    setIsMobileMenuOpen(false);
  };

  const navigationContent = (
    <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
      {/* Active Workspace Navigation */}
      <div>
        <div className="flex items-center justify-between px-3 mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t(currentWorkspace.title)}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {currentWorkspace.items.length} views
          </span>
        </div>

        <div className="space-y-1">
          {currentWorkspace.items.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/30 via-violet-600/25 to-teal-500/15 text-white border border-orange-500/40 shadow-[0_0_15px_rgba(234,88,12,0.2)] font-semibold backdrop-blur-md'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-orange-400 drop-shadow-[0_0_6px_#f97316]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{t(item.label)}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ml-1 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-white/10 text-orange-300 border border-orange-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Cross-Workspace Jump Tabs */}
      <div className="pt-3 border-t border-white/10">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
          {t('Explore All Workspaces')}
        </span>
        <div className="grid grid-cols-2 gap-1.5 px-1">
          <button
            onClick={() => handleSelectScreen('artisan-overview')}
            className={`p-2 rounded-lg text-[11px] text-left border transition-all cursor-pointer ${
              currentRole === 'artisan'
                ? 'border-orange-500 bg-orange-500/20 text-white font-bold shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                : 'border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            Artisan (20)
          </button>
          <button
            onClick={() => handleSelectScreen('supplier-dashboard')}
            className={`p-2 rounded-lg text-[11px] text-left border transition-all cursor-pointer ${
              currentRole === 'supplier'
                ? 'border-orange-500 bg-orange-500/20 text-white font-bold shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                : 'border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            Supplier (5)
          </button>
          <button
            onClick={() => handleSelectScreen('buyer-marketplace')}
            className={`p-2 rounded-lg text-[11px] text-left border transition-all cursor-pointer ${
              currentRole === 'buyer'
                ? 'border-orange-500 bg-orange-500/20 text-white font-bold shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                : 'border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            Buyer (6)
          </button>
          <button
            onClick={() => handleSelectScreen('delivery-dashboard')}
            className={`p-2 rounded-lg text-[11px] text-left border transition-all cursor-pointer ${
              currentRole === 'delivery'
                ? 'border-orange-500 bg-orange-500/20 text-white font-bold shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                : 'border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            Delivery (3)
          </button>
          <button
            onClick={() => handleSelectScreen('admin-overview')}
            className={`col-span-2 p-2 rounded-lg text-[11px] text-left border transition-all cursor-pointer ${
              currentRole === 'admin'
                ? 'border-orange-500 bg-orange-500/20 text-white font-bold shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                : 'border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            National Council Admin (6)
          </button>
        </div>
      </div>
    </div>
  );

  const bottomCard = (
    <div className="p-3 border-t border-white/10 bg-[#070C24]/80 backdrop-blur-md space-y-2">
      <button
        onClick={() => {
          setIsDemoLoginOpen(true);
          setIsMobileMenuOpen(false);
        }}
        className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_#ea580c]" />
          <div className="text-left truncate">
            <div className="text-[11px] font-bold text-white capitalize truncate">
              {t('Role')}: {currentRole}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {t('Click to switch persona')}
            </div>
          </div>
        </div>
        <SlidersHorizontal className="w-4 h-4 text-slate-400 group-hover:text-orange-400 shrink-0 transition-colors" />
      </button>

      <button
        onClick={() => {
          logout();
          setIsMobileMenuOpen(false);
        }}
        className="w-full py-1.5 px-2 bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/10 hover:border-rose-500/30 cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5 text-rose-400" />
        <span>{t('Sign Out / Login Screen')}</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-[#070C24]/75 backdrop-blur-md border-r border-white/10 flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px] select-none text-slate-200">
        {navigationContent}
        {bottomCard}
      </aside>

      {/* Mobile Slide-Out Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
            aria-hidden="true"
          />

          <aside
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#070C24]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-250 select-none border-r border-white/15 text-slate-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#070C24]">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M 12 37 L 24 10 L 36 37"
                    stroke="url(#artisanRefLogoGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-bold text-white">ArtisanIQ</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Drawer Language Selector */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('Select Language')}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                      language === l.code
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500 font-bold shadow-xs'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation items */}
            {navigationContent}

            {/* Bottom Card */}
            {bottomCard}
          </aside>
        </div>
      )}
    </>
  );
};
