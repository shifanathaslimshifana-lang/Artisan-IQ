import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateMarketingCaptions } from '../../services/aiService';
import { CUSTOMER_PERSONAS } from '../../data/demoData';
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Instagram,
  MessageCircle,
  Facebook,
  UserCheck,
  BookOpen,
} from 'lucide-react';

export const MarketingStudio: React.FC = () => {
  const { products, showToast } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'whatsapp' | 'facebook'>('instagram');
  const [copied, setCopied] = useState(false);

  // Artisan story generator state
  const [storyPersona, setStoryPersona] = useState({
    experienceYears: 28,
    heritageTechnique: 'Riverbed wheel-turned pottery & wood-pit firing',
    familyHeritage: '4th generation master potter family in Vilachery',
    impactGoal: 'Preserving chemical-free porous clay cookware for healthy homes',
  });
  const [generatedStory, setGeneratedStory] = useState(
    `"I was seven years old when my grandfather first taught my hands to feel the pulse of wet Cauvery clay on our stone potter's wheel. For 28 years, every pot I shape in our Vilachery workshop carries no chemical glaze, no factory molds—only pure river silt, fine sand, and wood fire. When you drink water from this cooling jug, you are keeping a living 200-year-old tradition breathing in your home." — Meenakshi Ammal`
  );

  const captions = generateMarketingCaptions(
    selectedProduct.title,
    selectedProduct.materials,
    selectedProduct.story,
    activePlatform
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('success', 'Copied to Clipboard', 'Ready to paste directly into ' + activePlatform);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateStory = () => {
    setGeneratedStory(
      `"Our hands do not merely mold clay; we preserve an unbroken memory. For ${storyPersona.experienceYears} years, our workshop in Vilachery has shaped porous cookware using ${storyPersona.heritageTechnique}. As a ${storyPersona.familyHeritage}, our purpose is ${storyPersona.impactGoal}. Every piece is an invitation to slow down and honor handmade Indian heritage." — Meenakshi Ammal`
    );
    showToast('info', 'Artisan Story Refreshed', 'Authentic storytelling narrative updated.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-orange-400" /> Cultural Promotion & E-Commerce Storytelling
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          Artisan Marketing Studio & Social Media Generator
        </h1>
        <p className="text-xs text-slate-300">
          Turn your traditional handmade craft into compelling, authentic promotional posts for Instagram, WhatsApp buyer broadcasts, and Facebook craft groups without marketing agencies.
        </p>
      </div>

      {/* Product Selector */}
      <div className="p-4 glass-liquid-panel rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-white">Select Craft to Market:</label>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const p = products.find((prod) => prod.id === e.target.value);
              if (p) setSelectedProduct(p);
            }}
            className="text-xs font-medium p-2 border border-white/15 rounded-lg bg-[#070C24]/90 text-white focus:outline-none focus:border-cyan-400"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} (₹{p.price})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Craft: <strong className="text-cyan-300">{selectedProduct.categoryLabel}</strong>
        </span>
      </div>

      {/* Grid: Social Media Post Generator & Customer Personas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Social Media Generator (7 cols) */}
        <div className="lg:col-span-7 p-6 glass-liquid-panel rounded-2xl space-y-4">
          {/* Platform tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
            <h3 className="text-sm font-bold text-white">Social Broadcast Generator</h3>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActivePlatform('instagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePlatform === 'instagram'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </button>
              <button
                onClick={() => setActivePlatform('whatsapp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePlatform === 'whatsapp'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button
                onClick={() => setActivePlatform('facebook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePlatform === 'facebook'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Facebook className="w-3.5 h-3.5" /> Facebook
              </button>
            </div>
          </div>

          {/* Generated Caption Box */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 space-y-3 leading-relaxed whitespace-pre-line font-medium backdrop-blur-xs">
            {captions.caption}
          </div>

          {/* Call to action & Hashtags */}
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-semibold text-slate-300 block mb-1">Call to Action:</span>
              <div className="p-2 bg-orange-500/15 text-orange-200 rounded-lg text-xs font-medium border border-orange-500/30">
                {captions.callToAction}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-300 block mb-1">Hashtags:</span>
              <div className="flex flex-wrap gap-1 text-[11px] text-cyan-300">
                {captions.hashtags.map((h, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => handleCopy(`${captions.caption}\n\n${captions.callToAction}\n\n${captions.hashtags.join(' ')}`)}
            className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] cursor-pointer border border-white/15"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Caption & Hashtags'}</span>
          </button>
        </div>

        {/* Customer Persona Target (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 glass-liquid-panel rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <UserCheck className="w-4 h-4 text-orange-400" />
              <span>Target Customer Persona</span>
            </div>
            <p className="text-xs text-slate-400">
              AI-generated buyer profiles most likely to purchase this craft:
            </p>

            <div className="space-y-3">
              {CUSTOMER_PERSONAS.map((pers) => (
                <div key={pers.id} className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1.5">
                  <div className="font-bold text-white">{pers.title}</div>
                  <div className="text-[11px] text-orange-400 font-semibold">{pers.segmentName}</div>
                  <p className="text-[11px] text-slate-300 leading-normal">{pers.purchaseMotivation}</p>
                  <div className="text-[10px] text-emerald-300 font-medium bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded">
                    Hook: "{pers.marketingHook}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Authentic Story Generator */}
      <div className="p-6 glass-liquid-panel rounded-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">AI Artisan Heritage Story Builder</h3>
          </div>
          <button
            onClick={handleRegenerateStory}
            className="px-3 py-1 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Regenerate Narrative
          </button>
        </div>

        <div className="p-4 bg-orange-950/20 rounded-xl border border-orange-500/30 text-xs text-amber-200 font-serif leading-relaxed italic">
          {generatedStory}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleCopy(generatedStory)}
            className="px-4 py-2 border border-white/20 hover:border-cyan-400 text-white bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Artisan Story
          </button>
        </div>
      </div>
    </div>
  );
};
