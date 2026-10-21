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
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-orange-600" /> Cultural Promotion & E-Commerce Storytelling
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Artisan Marketing Studio & Social Media Generator
        </h1>
        <p className="text-xs text-neutral-500">
          Turn your traditional handmade craft into compelling, authentic promotional posts for Instagram, WhatsApp buyer broadcasts, and Facebook craft groups without marketing agencies.
        </p>
      </div>

      {/* Product Selector */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-neutral-700">Select Craft to Market:</label>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const p = products.find((prod) => prod.id === e.target.value);
              if (p) setSelectedProduct(p);
            }}
            className="text-xs font-medium p-2 border border-neutral-300 rounded-lg bg-neutral-50"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} (₹{p.price})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-neutral-500">
          Craft: <strong className="text-neutral-800">{selectedProduct.categoryLabel}</strong>
        </span>
      </div>

      {/* Grid: Social Media Post Generator & Customer Personas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Social Media Generator (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          {/* Platform tabs */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900">Social Broadcast Generator</h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActivePlatform('instagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activePlatform === 'instagram'
                    ? 'bg-pink-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </button>
              <button
                onClick={() => setActivePlatform('whatsapp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activePlatform === 'whatsapp'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button
                onClick={() => setActivePlatform('facebook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activePlatform === 'facebook'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Facebook className="w-3.5 h-3.5" /> Facebook
              </button>
            </div>
          </div>

          {/* Generated Caption Box */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-800 space-y-3 leading-relaxed whitespace-pre-line font-medium">
            {captions.caption}
          </div>

          {/* Call to action & Hashtags */}
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-semibold text-neutral-700 block mb-1">Call to Action:</span>
              <div className="p-2 bg-orange-50 text-orange-950 rounded-lg text-xs font-medium border border-orange-200">
                {captions.callToAction}
              </div>
            </div>

            <div>
              <span className="font-semibold text-neutral-700 block mb-1">Hashtags:</span>
              <div className="flex flex-wrap gap-1 text-[11px] text-neutral-600">
                {captions.hashtags.map((h, i) => (
                  <span key={i} className="bg-neutral-100 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => handleCopy(`${captions.caption}\n\n${captions.callToAction}\n\n${captions.hashtags.join(' ')}`)}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Caption & Hashtags'}</span>
          </button>
        </div>

        {/* Customer Persona Target (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <UserCheck className="w-4 h-4 text-orange-600" />
              <span>Target Customer Persona</span>
            </div>
            <p className="text-xs text-neutral-500">
              AI-generated buyer profiles most likely to purchase this craft:
            </p>

            <div className="space-y-3">
              {CUSTOMER_PERSONAS.map((pers) => (
                <div key={pers.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs space-y-1.5">
                  <div className="font-bold text-neutral-900">{pers.title}</div>
                  <div className="text-[11px] text-orange-600 font-semibold">{pers.segmentName}</div>
                  <p className="text-[11px] text-neutral-600 leading-normal">{pers.purchaseMotivation}</p>
                  <div className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-1 rounded">
                    Hook: "{pers.marketingHook}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Authentic Story Generator */}
      <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C76B45]" />
            <h3 className="text-sm font-bold text-neutral-900">AI Artisan Heritage Story Builder</h3>
          </div>
          <button
            onClick={handleRegenerateStory}
            className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C76B45]" /> Regenerate Narrative
          </button>
        </div>

        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs text-amber-950 font-serif leading-relaxed italic">
          {generatedStory}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleCopy(generatedStory)}
            className="px-4 py-2 border border-neutral-300 hover:border-indigo-900 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Artisan Story
          </button>
        </div>
      </div>
    </div>
  );
};
