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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <Store className="w-4 h-4 text-emerald-700" /> Direct-from-Maker Fair Trade
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            Artisan Marketplace: Authentic Handmade Indian Crafts
          </h1>
          <p className="text-xs text-neutral-500">
            Zero middleman commissions. 100% of the maker's wage and profit margin goes directly to master artisan households.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('buyer-ai-assistant')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-200" /> Consult AI Buyer Assistant
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pottery, brass, wood, handloom..."
            className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-900"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'pottery', 'metalware', 'woodcraft', 'basketry', 'textiles'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500 font-medium">Max Price:</span>
          <span className="font-bold text-neutral-900 tabular-nums">₹{maxPrice}</span>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-indigo-900 cursor-pointer w-24 h-1.5 bg-neutral-200 rounded"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="text-[10px] font-bold bg-white/90 text-neutral-800 px-2 py-0.5 rounded shadow-xs">
                    {prod.categoryLabel}
                  </span>
                </div>
                {prod.model3DType && (
                  <button
                    onClick={() => handleInspect3D(prod)}
                    className="absolute bottom-2.5 right-2.5 bg-neutral-900/80 hover:bg-neutral-950 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <Layers className="w-3 h-3 text-amber-300" /> Inspect 3D
                  </button>
                )}
              </div>

              {/* Product Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Maker: <strong className="text-neutral-800">{prod.artisanName}</strong></span>
                  <span className="text-emerald-700 font-semibold">{prod.location.split(',')[0]}</span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">
                  {prod.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {prod.story}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 block text-[10px]">Fair Selling Price</span>
                    <span className="text-base font-bold text-neutral-900 tabular-nums">
                      ₹{prod.price}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {prod.fairnessIndex}% Fair Trade
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Button */}
            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(prod, 1)}
                className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
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
