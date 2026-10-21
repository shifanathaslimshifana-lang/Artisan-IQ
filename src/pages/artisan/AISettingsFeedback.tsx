import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquareHeart,
  Settings,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const AISettingsFeedback: React.FC = () => {
  const { aiFeedbacks, addAIFeedback, showToast } = useApp();

  const [recommendationTitle, setRecommendationTitle] = useState('Unglazed Curd Setter Handi with Micro-vented Lid');
  const [rating, setRating] = useState<'helpful' | 'not_helpful'>('helpful');
  const [accepted, setAccepted] = useState(true);
  const [actualOutcome, setActualOutcome] = useState('Produced 25 units; all sold within 8 days at ₹850 each with zero breakage.');
  const [notes, setNotes] = useState('Steam vent design attracted lots of Bengaluru kitchen buyers.');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    addAIFeedback({
      recommendationTitle,
      rating,
      accepted,
      actualSalesOutcome: actualOutcome,
      artisanNotes: notes,
    });
    showToast('success', 'Practical Feedback Recorded', 'Your feedback will refine future cluster demand scoring.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 uppercase tracking-wider">
          <MessageSquareHeart className="w-4 h-4 text-indigo-900" /> Continuous Model Calibration
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          AI Recommendation Feedback & Cluster Calibration
        </h1>
        <p className="text-xs text-neutral-500">
          Artisans directly evaluate AI market recommendations. Your real-world kiln yields and sales outcomes train the system to provide more accurate demand forecasts for the entire cluster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submit Form (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Submit Recommendation Outcome
          </h3>

          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                AI Recommended Product
              </label>
              <input
                type="text"
                value={recommendationTitle}
                onChange={(e) => setRecommendationTitle(e.target.value)}
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Was Recommendation Helpful?
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRating('helpful')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                      rating === 'helpful'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                  </button>
                  <button
                    type="button"
                    onClick={() => setRating('not_helpful')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                      rating === 'not_helpful'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> Not Helpful
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Did You Produce It?
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAccepted(true)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      accepted
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    Yes, Produced
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccepted(false)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      !accepted
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Actual Sales & Production Outcome
              </label>
              <textarea
                rows={2}
                value={actualOutcome}
                onChange={(e) => setActualOutcome(e.target.value)}
                placeholder="How many were produced? Did they sell at the recommended price?"
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Artisan Notes / Technical Observations
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Firing shrinkage notes, clay plasticity, customer reactions"
                className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Record Outcome for Cluster Learning</span>
            </button>
          </form>
        </div>

        {/* Stored Feedback Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-neutral-900">Recorded Feedback History</h3>
            <div className="space-y-3">
              {aiFeedbacks.map((fb) => (
                <div key={fb.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 truncate">{fb.recommendationTitle}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded capitalize">
                      {fb.rating}
                    </span>
                  </div>
                  {fb.actualSalesOutcome && (
                    <p className="text-[11px] text-neutral-600 font-medium">
                      Outcome: {fb.actualSalesOutcome}
                    </p>
                  )}
                  <div className="text-[10px] text-neutral-400 font-mono">{fb.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
