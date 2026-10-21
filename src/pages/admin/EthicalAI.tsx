import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const EthicalAI: React.FC = () => {
  const { showToast } = useApp();
  const [dataConsent, setDataConsent] = useState(true);
  const [voiceLogging, setVoiceLogging] = useState(false);
  const [anonymizedAnalytics, setAnonymizedAnalytics] = useState(true);

  const handleExportData = () => {
    showToast('success', 'Data Archive Generated', 'Downloaded JSON record of artisan profile, products, and feedback.');
  };

  const handleDeleteRequest = () => {
    showToast('warning', 'Deletion Request Submitted', 'Queued data deletion review with National Craft Council compliance officer.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 uppercase tracking-wider">
          <Scale className="w-4 h-4 text-indigo-900" /> Transparent & Responsible AI Charter
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Ethical AI, Algorithmic Transparency & Data Sovereignty
        </h1>
        <p className="text-xs text-neutral-500">
          We protect traditional artisans from algorithmic exploitation. Artisans own their cultural knowledge, pricing formulas, and craft datasets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transparency Charter */}
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">AI Model Transparency Guarantees</h3>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-neutral-700">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
              <strong className="text-neutral-900 block">1. Computer Vision Provenance Limits</strong>
              <p className="text-neutral-600">
                AI image recognition produces assistive draft tags only. The system never claims an image proves legal authenticity without physical GI laboratory inspection.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
              <strong className="text-neutral-900 block">2. Living Wage Floor Enforcement</strong>
              <p className="text-neutral-600">
                The Fair Pricing algorithm refuses to calculate sub-subsistence prices. If an artisan enters labour rates below the rural minimum wage (₹65/hr), prominent alerts are triggered.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
              <strong className="text-neutral-900 block">3. Cultural Knowledge Sovereignty</strong>
              <p className="text-neutral-600">
                Generative models do not ingest proprietary generational potting recipes or metallurgy secrets into public foundational models without express cooperative consent.
              </p>
            </div>
          </div>
        </div>

        {/* Consent & Data Sovereignty Controls */}
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Lock className="w-4 h-4 text-indigo-900" />
            <h3 className="text-sm font-bold text-neutral-900">Artisan Consent & Privacy Settings</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={dataConsent}
                onChange={(e) => setDataConsent(e.target.checked)}
                className="mt-0.5 accent-indigo-900 rounded"
              />
              <div>
                <span className="font-bold text-neutral-900 block">Allow Cluster Demand Calibration</span>
                <span className="text-neutral-500">
                  Pools anonymous batch sales to help regional artisans forecast upcoming festival demand.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={voiceLogging}
                onChange={(e) => setVoiceLogging(e.target.checked)}
                className="mt-0.5 accent-indigo-900 rounded"
              />
              <div>
                <span className="font-bold text-neutral-900 block">Retain Voice Recordings for Audio Tuning</span>
                <span className="text-neutral-500">
                  Stores regional Tamil/Hindi voice queries locally to improve artisan accent recognition.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={anonymizedAnalytics}
                onChange={(e) => setAnonymizedAnalytics(e.target.checked)}
                className="mt-0.5 accent-indigo-900 rounded"
              />
              <div>
                <span className="font-bold text-neutral-900 block">Share Livelihood Impact with National Council</span>
                <span className="text-neutral-500">
                  Provides aggregated statistics to advocate for government craft subsidies and soft loans.
                </span>
              </div>
            </label>
          </div>

          {/* Export & Deletion */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 border border-neutral-300 hover:border-indigo-900 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Data Archive
            </button>
            <button
              onClick={handleDeleteRequest}
              className="px-3.5 py-2 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Request Data Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
