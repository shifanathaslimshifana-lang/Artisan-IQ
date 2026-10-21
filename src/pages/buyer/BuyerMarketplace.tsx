import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CraftProduct } from '../../types';
import {
  Store,
  Search,
  Filter,
  ShoppingBag,
  Sparkles,
  Layers,
  Heart,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const BuyerMarketplace: React.FC = () => {
  const { products, addToCart, setSelected3DProduct, setActiveScreen, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);

  const filtered = products.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
    if (prod.price > maxPrice) return false;
    if (
      searchQuery &&
      !prod.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prod.story.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prod.artisanName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleInspect3D = (prod: CraftProduct) => {
    setSelected3DProduct(prod);
    setActiveScreen('artisan-3d-studio');
    showToast('info', '3D Inspection Activated', `Opening 3D studio for ${prod.title}`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Store className="w-4 h-4 text-emerald-400" /> Direct-from-Maker Fair Trade
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Artisan Marketplace: Authentic Handmade Indian Crafts
          </h1>
          <p className="text-xs text-slate-300">
            Zero middleman commissions. 100% of the maker's wage and profit margin goes directly to master artisan households.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('buyer-ai-assistant')}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all shrink-0 cursor-pointer border border-white/20"
        >
          <Sparkles className="w-4 h-4 text-amber-200" /> Consult AI Buyer Assistant
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 glass-liquid-panel rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pottery, brass, wood, handloom..."
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'pottery', 'metalware', 'woodcraft', 'basketry', 'textiles'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white border-white/30 font-bold shadow-[0_0_15px_rgba(244,63,94,0.35)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Max Price:</span>
          <span className="font-bold text-white tabular-nums">₹{maxPrice}</span>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-cyan-400 cursor-pointer w-24 h-1.5 bg-white/20 rounded"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="glass-liquid-card rounded-2xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Product Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#070C24]/80">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="text-[10px] font-bold bg-[#070C24]/90 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded shadow-xs backdrop-blur-md">
                    {prod.categoryLabel}
                  </span>
                </div>
                {prod.model3DType && (
                  <button
                    onClick={() => handleInspect3D(prod)}
                    className="absolute bottom-2.5 right-2.5 bg-[#070C24]/90 hover:bg-[#0E173D] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-xs flex items-center gap-1 transition-colors backdrop-blur-md cursor-pointer"
                  >
                    <Layers className="w-3 h-3 text-amber-300" /> Inspect 3D
                  </button>
                )}
              </div>

              {/* Product Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Maker: <strong className="text-white">{prod.artisanName}</strong></span>
                  <span className="text-emerald-400 font-semibold">{prod.location.split(',')[0]}</span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {prod.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {prod.story}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fair Selling Price</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      ₹{prod.price}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-xs">
                    {prod.fairnessIndex}% Fair Trade
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Button */}
            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(prod, 1)}
                className="w-full py-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] cursor-pointer border border-white/15"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Basket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
