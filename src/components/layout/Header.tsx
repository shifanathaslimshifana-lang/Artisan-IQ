import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import {
  Sparkles,
  ShoppingBag,
  Globe,
  Users,
  Layers,
  Menu,
  X,
  ChevronDown,
  Check,
  LogOut,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentUser,
    setIsDemoLoginOpen,
    language,
    setLanguage,
    t,
    cart,
    setActiveScreen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    logout,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const languages: { code: LanguageCode; shortLabel: string; label: string }[] = [
    { code: 'en', shortLabel: 'EN', label: 'English' },
    { code: 'ta', shortLabel: 'TA', label: 'தமிழ்' },
    { code: 'hi', shortLabel: 'HI', label: 'हिन्दी' },
    { code: 'te', shortLabel: 'TE', label: 'తెలుగు' },
    { code: 'kn', shortLabel: 'KN', label: 'ಕನ್ನಡ' },
    { code: 'ml', shortLabel: 'ML', label: 'മലയാളം' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070C24]/80 backdrop-blur-md border-b border-white/10 w-full min-w-0 transition-colors">
      <div className="flex items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-6 py-2.5 sm:py-3.5 max-w-full">
        {/* Left: Mobile Menu Toggle + Brand & Tagline */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-200" />
            )}
          </button>

          <div
            onClick={() => setActiveScreen('artisan-overview')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none shrink-0 group"
          >
            {/* Exact Stylized 'A' Logo Mark from Reference Image */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-[0_0_12px_rgba(236,72,153,0.45)] group-hover:scale-105 transition-transform"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="artisanRefLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="35%" stopColor="#FB7185" />
                  <stop offset="70%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path
                d="M 12 37 L 24 10 L 36 37"
                stroke="url(#artisanRefLogoGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                <span className="text-base sm:text-xl font-bold tracking-tight text-white whitespace-nowrap">
                  Artisan<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-extrabold">IQ</span>
                </span>
                {/* 4-point magenta star atop IQ */}
                <span className="text-pink-400 text-xs sm:text-sm ml-0.5 -mt-2 leading-none select-none drop-shadow-[0_0_8px_#f43f5e]">
                  ✦
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wide whitespace-nowrap hidden sm:block -mt-0.5">
                Crafts • Insights • Opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setActiveScreen('artisan-overview')}
            className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
              currentRole === 'artisan' ? 'text-white font-bold border-b-2 border-orange-500 text-shadow-sm' : ''
            }`}
          >
            {t('Artisan Intelligence')}
          </button>
          <button
            onClick={() => setActiveScreen('buyer-marketplace')}
            className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
              currentRole === 'buyer' ? 'text-white font-bold border-b-2 border-orange-500' : ''
            }`}
          >
            {t('Marketplace')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-pricing')}
            className="hover:text-white transition-colors whitespace-nowrap py-1"
          >
            {t('Fair Pricing')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-materials')}
            className="hover:text-white transition-colors whitespace-nowrap py-1"
          >
            {t('Raw Materials')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-3d-studio')}
            className="hover:text-orange-300 transition-colors whitespace-nowrap flex items-center gap-1.5 text-orange-400 font-semibold py-1 px-2 rounded-lg bg-orange-500/10 border border-orange-500/20"
          >
            <Layers className="w-3.5 h-3.5" /> {t('3D Craft Studio')}
          </button>
        </nav>

        {/* Right: Actions, Language & Demo Login */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Custom Language Dropdown Menu */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-slate-200 hover:text-white cursor-pointer shadow-xs backdrop-blur-md transition-all"
              title={t('Select Language')}
              aria-expanded={isLangMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="font-bold">{languages.find((l) => l.code === language)?.label || 'Language'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-[#090F2C]/95 border border-white/15 rounded-xl shadow-2xl z-50 py-1.5 backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1">
                  {t('Select Language')}
                </div>
                {languages.map((l) => {
                  const isSelected = language === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500/20 font-bold text-orange-400 border-l-2 border-orange-500'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-[10px] font-mono text-slate-400 font-semibold">{l.shortLabel}</span>
                        <span>{l.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart button */}
          {(cartCount > 0 || currentRole === 'buyer') && (
            <button
              onClick={() => setActiveScreen('buyer-cart')}
              className="relative p-2 bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/15 rounded-lg transition-colors shrink-0 backdrop-blur-md cursor-pointer"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Role Switcher Button */}
          <button
            onClick={() => setIsDemoLoginOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-600/80 to-rose-600/80 hover:from-orange-500 hover:to-rose-500 text-white rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.3)] text-[11px] sm:text-xs font-semibold transition-all shrink-0 border border-white/20 backdrop-blur-md cursor-pointer"
            title="Open Demo Login to Switch Role"
          >
            <Users className="w-3.5 h-3.5 text-white" />
            <span className="capitalize">{currentRole}</span>
            <span className="hidden sm:inline text-white/70 font-normal">| Switch</span>
          </button>

          {/* Sign Out / Return to Login Page */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white rounded-lg border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold transition-all shrink-0 cursor-pointer"
            title="Sign out to return to Login Screen"
          >
            <LogOut className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">Sign Out</span>
          </button>

          {/* User Avatar */}
          <div
            onClick={() => setIsDemoLoginOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 border border-transparent hover:border-white/10"
            title={`Logged in as ${currentUser.name}`}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0 ring-1 ring-orange-500/50">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="hidden xl:inline text-xs font-medium text-slate-300 truncate max-w-[100px]">
              {currentUser.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
