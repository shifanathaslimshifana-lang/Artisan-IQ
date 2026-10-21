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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-neutral-200 w-full min-w-0">
      <div className="flex items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-6 py-2 sm:py-3.5 max-w-full">
        {/* Left: Mobile Menu Toggle + Brand */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-black" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-800" />
            )}
          </button>

          <div
            onClick={() => setActiveScreen('artisan-overview')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-black flex items-center justify-center text-orange-500 shadow-xs shrink-0 border border-neutral-800">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-black whitespace-nowrap">
                {t('ArtisanAI')}
              </span>
              <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200/80 px-1.5 py-0.5 rounded whitespace-nowrap">
                {t('Market Intelligence')}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-neutral-600">
          <button
            onClick={() => setActiveScreen('artisan-overview')}
            className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
              currentRole === 'artisan' ? 'text-black font-bold border-b-2 border-orange-600 pb-0.5' : ''
            }`}
          >
            {t('Artisan Intelligence')}
          </button>
          <button
            onClick={() => setActiveScreen('buyer-marketplace')}
            className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
              currentRole === 'buyer' ? 'text-black font-bold border-b-2 border-orange-600 pb-0.5' : ''
            }`}
          >
            {t('Marketplace')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-pricing')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            {t('Fair Pricing')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-materials')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            {t('Raw Materials')}
          </button>
          <button
            onClick={() => setActiveScreen('artisan-3d-studio')}
            className="hover:text-orange-600 transition-colors whitespace-nowrap flex items-center gap-1 text-orange-600 font-semibold"
          >
            <Layers className="w-3.5 h-3.5" /> {t('3D Craft Studio')}
          </button>
        </nav>

        {/* Right: Actions, Language & Demo Login */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Custom Language Dropdown Menu (Immune to iframe select bugs) */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg text-neutral-800 cursor-pointer shadow-2xs transition-colors"
              title={t('Select Language')}
              aria-expanded={isLangMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span className="font-bold">{languages.find((l) => l.code === language)?.label || 'Language'}</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 sm:w-48 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 mb-1">
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
                          ? 'bg-orange-50 font-bold text-orange-700'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-[10px] font-mono text-neutral-400 font-semibold">{l.shortLabel}</span>
                        <span>{l.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-orange-600" />}
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
              className="relative p-1.5 sm:p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors shrink-0"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Role Switcher Pill - Black with Orange Accent */}
          <button
            onClick={() => setIsDemoLoginOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-black hover:bg-neutral-900 text-white rounded-lg shadow-xs text-[11px] sm:text-xs font-semibold transition-all shrink-0 border border-neutral-800 cursor-pointer"
            title="Open Demo Login to Switch Role"
          >
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
            <span className="capitalize">{currentRole}</span>
            <span className="hidden sm:inline text-orange-400 font-normal">| Switch</span>
          </button>

          {/* User Avatar - visible from sm+ screens */}
          <div
            onClick={() => setIsDemoLoginOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 pl-0.5 sm:pl-1 pr-1 sm:pr-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors shrink-0"
            title={`Logged in as ${currentUser.name}`}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-neutral-300 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="hidden xl:inline text-xs font-medium text-neutral-700 truncate max-w-[100px]">
              {currentUser.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
