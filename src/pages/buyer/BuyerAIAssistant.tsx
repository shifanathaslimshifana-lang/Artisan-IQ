import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CraftProduct } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  recommendedProducts?: CraftProduct[];
}

export const BuyerAIAssistant: React.FC = () => {
  const { products, addToCart, setSelected3DProduct, setActiveScreen, showToast } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Namaste! I am your AI Craft Curator. Tell me what you are looking for—such as gifts under ₹1,000, cooling kitchenware, or authentic traditional brass lamps.',
      recommendedProducts: [products[0], products[3]],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate responsive AI recommendation
    setTimeout(() => {
      const lower = q.toLowerCase();
      let matches: CraftProduct[] = [];
      let reply = '';

      if (lower.includes('1000') || lower.includes('under') || lower.includes('budget') || lower.includes('gift')) {
        matches = products.filter((p) => p.price <= 1000);
        reply = `I found ${matches.length} authentic mastercrafted pieces under ₹1,000, direct from the artisans:`;
      } else if (lower.includes('pottery') || lower.includes('clay') || lower.includes('cool')) {
        matches = products.filter((p) => p.category === 'pottery');
        reply = 'Here are our traditional porous terracotta creations crafted using Cauvery riverbed silt:';
      } else if (lower.includes('brass') || lower.includes('metal') || lower.includes('diya')) {
        matches = products.filter((p) => p.category === 'metalware');
        reply = 'Here is our Dokra lost-wax cast brass tribal collection:';
      } else {
        matches = [products[1], products[2]];
        reply = 'Based on your preference for authentic Indian heritage, here are our highest-rated artisanal pieces:';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          recommendedProducts: matches,
        },
      ]);
    }, 600);
  };

  const handleInspect3D = (prod: CraftProduct) => {
    setSelected3DProduct(prod);
    setActiveScreen('artisan-3d-studio');
    showToast('info', '3D Inspection', `Loaded 3D studio for ${prod.title}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5 text-emerald-700" /> Conversational AI Craft Curator
        </div>
        <h1 className="text-xl font-bold text-neutral-900">
          Discover Handcrafted Treasures Through Natural Dialogue
        </h1>
        <p className="text-xs text-neutral-500">
          Ask questions in natural language to find verified artisan goods based on your budget, material preferences, and occasion.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-md flex flex-col h-[580px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-black text-white rounded-br-xs'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>

              {/* Recommended Product Cards inside assistant message */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                  {msg.recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between gap-3 text-xs"
                    >
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-neutral-900 truncate">{prod.title}</h4>
                        <span className="text-black font-bold tabular-nums">₹{prod.price}</span>
                        <div className="text-[10px] text-neutral-500 truncate">By {prod.artisanName}</div>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="p-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                        {prod.model3DType && (
                          <button
                            onClick={() => handleInspect3D(prod)}
                            className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-[10px] flex items-center justify-center"
                            title="Inspect 3D"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#C76B45]" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-neutral-400 font-semibold shrink-0">Try asking:</span>
          {[
            'Find handmade gifts under ₹1000',
            'Show me traditional pottery',
            'Suggest eco-friendly handmade products',
            'Tell me about Dokra brass lamps',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 whitespace-nowrap text-neutral-700"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-neutral-200 flex gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AI curator (e.g. 'Show me unglazed clay pots for cooking biryani')..."
            className="flex-1 text-xs p-2.5 border border-neutral-300 rounded-xl focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black hover:bg-neutral-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </form>
      </div>
    </div>
  );
};
