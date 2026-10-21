import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DemoLoginModal } from './components/shared/DemoLoginModal';
import { ToastContainer } from './components/shared/ToastContainer';

// Artisan Pages
import { ArtisanOverview } from './pages/artisan/ArtisanOverview';
import { ProductRecognition } from './pages/artisan/ProductRecognition';
import { VoiceAssistant } from './pages/artisan/VoiceAssistant';
import { MyProducts } from './pages/artisan/MyProducts';
import { WhatToMakeNext } from './pages/artisan/WhatToMakeNext';
import { MarketGapExplorer } from './pages/artisan/MarketGapExplorer';
import { FairPricingCalculator } from './pages/artisan/FairPricingCalculator';
import { SupplierDiscovery } from './pages/artisan/SupplierDiscovery';
import { RawMaterialComparison } from './pages/artisan/RawMaterialComparison';
import { MarketingStudio } from './pages/artisan/MarketingStudio';
import { Artisan3DStudioPage } from './pages/artisan/Artisan3DStudioPage';
import { ProductionPlanner } from './pages/artisan/ProductionPlanner';
import { InventoryRisk } from './pages/artisan/InventoryRisk';
import { ArtisanOrders } from './pages/artisan/ArtisanOrders';
import { ArtisanImpact } from './pages/artisan/ArtisanImpact';
import { CulturalPreservation } from './pages/artisan/CulturalPreservation';
import { AISettingsFeedback } from './pages/artisan/AISettingsFeedback';

// Supplier Pages
import { SupplierDashboard } from './pages/supplier/SupplierDashboard';
import { RawMaterialListings } from './pages/supplier/RawMaterialListings';
import { IncomingEnquiries } from './pages/supplier/IncomingEnquiries';

// Buyer Pages
import { BuyerMarketplace } from './pages/buyer/BuyerMarketplace';
import { BuyerAIAssistant } from './pages/buyer/BuyerAIAssistant';
import { SmartBundles } from './pages/buyer/SmartBundles';
import { ShoppingCart } from './pages/buyer/ShoppingCart';
import { BuyerOrders } from './pages/buyer/BuyerOrders';

// Delivery Pages
import { DeliveryDashboard } from './pages/delivery/DeliveryDashboard';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProductModeration } from './pages/admin/ProductModeration';
import { EthicalAI } from './pages/admin/EthicalAI';

const ScreenRenderer: React.FC = () => {
  const { activeScreen } = useApp();

  switch (activeScreen) {
    // Artisan Workspace
    case 'artisan-overview':
    case 'artisan-market-intel':
      return <ArtisanOverview />;
    case 'artisan-recognition':
      return <ProductRecognition />;
    case 'artisan-voice':
      return <VoiceAssistant />;
    case 'artisan-products':
      return <MyProducts />;
    case 'artisan-what-next':
      return <WhatToMakeNext />;
    case 'artisan-market-gap':
      return <MarketGapExplorer />;
    case 'artisan-pricing':
      return <FairPricingCalculator />;
    case 'artisan-materials':
      return <SupplierDiscovery />;
    case 'artisan-comparison':
      return <RawMaterialComparison />;
    case 'artisan-marketing':
      return <MarketingStudio />;
    case 'artisan-heritage':
    case 'artisan-cultural':
      return <CulturalPreservation />;
    case 'artisan-3d-studio':
      return <Artisan3DStudioPage />;
    case 'artisan-production':
      return <ProductionPlanner />;
    case 'artisan-inventory':
      return <InventoryRisk />;
    case 'artisan-orders':
      return <ArtisanOrders />;
    case 'artisan-impact':
      return <ArtisanImpact />;
    case 'artisan-feedback':
      return <AISettingsFeedback />;
    case 'artisan-settings':
      return <EthicalAI />;

    // Supplier Workspace
    case 'supplier-dashboard':
      return <SupplierDashboard />;
    case 'supplier-listings':
      return <RawMaterialListings />;
    case 'supplier-price-intel':
      return <RawMaterialComparison />;
    case 'supplier-enquiries':
      return <IncomingEnquiries />;
    case 'supplier-orders':
      return <ArtisanOrders />;

    // Buyer Workspace
    case 'buyer-marketplace':
    case 'buyer-recommendations':
      return <BuyerMarketplace />;
    case 'buyer-ai-assistant':
      return <BuyerAIAssistant />;
    case 'buyer-bundles':
      return <SmartBundles />;
    case 'buyer-cart':
      return <ShoppingCart />;
    case 'buyer-orders':
      return <BuyerOrders />;

    // Delivery Workspace
    case 'delivery-dashboard':
    case 'delivery-assigned':
    case 'delivery-tracking':
      return <DeliveryDashboard />;

    // Admin Workspace
    case 'admin-overview':
    case 'admin-users':
    case 'admin-reports':
      return <AdminDashboard />;
    case 'admin-moderation':
      return <ProductModeration />;
    case 'admin-suppliers':
      return <SupplierDiscovery />;
    case 'admin-ethics':
      return <EthicalAI />;

    default:
      return <ArtisanOverview />;
  }
};

function MainLayout() {
  const { currentRole, setIsDemoLoginOpen, t, language, setLanguage } = useApp();

  const navLanguages: { code: any; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col antialiased w-full overflow-x-hidden">
      <Header />

      {/* Hackathon Evaluation Mode Banner - High-contrast Black & Orange */}
      <div className="bg-neutral-950 border-b border-black px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2.5 w-full text-white">
        <div className="flex items-center gap-2 font-medium text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
          <span>
            <strong className="text-neutral-200">{t('Hackathon Judging Mode:')}</strong> {t('You are viewing workspace as')}{' '}
            <span className="capitalize font-bold text-orange-400 underline decoration-orange-500">
              {currentRole}
            </span>. {t('State persists in browser session.')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick 1-Click Language Switcher Bar */}
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            {navLanguages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer ${
                  language === l.code
                    ? 'bg-orange-600 text-white font-bold shadow-xs'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
                title={`Switch interface language to ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsDemoLoginOpen(true)}
            className="text-[11px] sm:text-xs bg-orange-600 hover:bg-orange-500 text-white font-semibold px-2.5 sm:px-3 py-1 rounded-md transition-colors shadow-xs w-full sm:w-auto text-center shrink-0 cursor-pointer"
          >
            {t('Switch Role / View Other Workspaces')}
          </button>
        </div>
      </div>

      <div className="flex-1 flex w-full min-w-0 overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full p-3.5 sm:p-5 md:p-8 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <ScreenRenderer />
          </div>
        </main>
      </div>

      <DemoLoginModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
