import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/demoData';
import {
  Users,
  CheckCircle2,
  X,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Building2,
  Palette,
  ArrowRight,
} from 'lucide-react';

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  artisan: <Palette className="w-5 h-5 text-orange-500" />,
  supplier: <Building2 className="w-5 h-5 text-neutral-800" />,
  buyer: <ShoppingBag className="w-5 h-5 text-orange-600" />,
  delivery: <Truck className="w-5 h-5 text-neutral-800" />,
  admin: <ShieldCheck className="w-5 h-5 text-black" />,
};

const ROLE_DESCRIPTIONS: Record<UserRole, { highlights: string[]; workspaceGoal: string }> = {
  artisan: {
    workspaceGoal: 'Calculate fair prices, recognize products via AI, discover raw materials, and optimize craft income.',
    highlights: ['AI Product Recognition & Voice', 'Cost & Living Wage Pricing Calculator', 'Smart Supplier Match & 3D Studio', 'What Should I Make Next? Engine'],
  },
  supplier: {
    workspaceGoal: 'List certified natural raw materials, track Cauvery & regional market prices, and fulfil artisan orders.',
    highlights: ['Natural Clay & Cotton Material Catalog', 'Price Volatility Intelligence', 'Artisan Bulk Enquiries', 'Procurement Dispatch'],
  },
  buyer: {
    workspaceGoal: 'Explore verified Indian artisanal craftworks, consult AI Buyer Assistant, and order zero-middleman batches.',
    highlights: ['Curated Craft Marketplace', 'Conversational AI Buyer Assistant', 'Smart Bundles & Cultural Stories', 'Interactive 3D Craft Inspection'],
  },
  delivery: {
    workspaceGoal: 'Manage padded rural craft consignments, avoid fragile ceramics breakage, and update live transit milestones.',
    highlights: ['Fragile Craft Logistics Queue', 'Padded Suspension Care Verification', 'Digital Proof of Delivery', 'Live Corridor Tracking'],
  },
  admin: {
    workspaceGoal: 'Moderate artisan listings, verify raw material suppliers, inspect GI craft authenticity, and audit ethical AI metrics.',
    highlights: ['Craft Heritage & GI Moderation', 'Artisan Livelihood Fair-Value Audits', 'Supplier Credential Verification', 'Platform Economic Analytics'],
  },
};

export const DemoLoginModal: React.FC = () => {
  const { currentRole, switchRole, isDemoLoginOpen, setIsDemoLoginOpen } = useApp();

  if (!isDemoLoginOpen) return null;

  const roles: UserRole[] = ['artisan', 'supplier', 'buyer', 'delivery', 'admin'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0 border border-neutral-800">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-sm sm:text-lg font-bold text-neutral-900 truncate">Demo Login & Role Switcher</h2>
                <span className="text-[10px] sm:text-xs bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded-full border border-orange-200 shrink-0">
                  Hackathon
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-500 truncate">
                Switch instantly between the five platform stakeholders.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoLoginOpen(false)}
            className="p-1.5 sm:p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 bg-white">
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-2.5 sm:gap-3">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs text-orange-950 leading-relaxed">
              <span className="font-semibold">Session Persistence:</span> Your selected role and mock actions are stored safely in browser session storage. You can freely switch roles without entering passwords.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const user = DEMO_USERS[role];
              const details = ROLE_DESCRIPTIONS[role];
              const isCurrent = currentRole === role;

              return (
                <div
                  key={role}
                  className={`p-4 rounded-xl border transition-all text-left relative flex flex-col justify-between ${
                    isCurrent
                      ? 'border-black bg-neutral-50 ring-2 ring-black/10 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-xs'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-white bg-black px-2 py-0.5 rounded-md border border-neutral-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Active Persona
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 pr-16">
                        <div className="flex items-center gap-1.5">
                          {ROLE_ICONS[role]}
                          <h3 className="text-sm font-bold text-neutral-900 truncate">{user.name}</h3>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium truncate">{user.title}</p>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                      {details.workspaceGoal}
                    </p>

                    <div className="space-y-1 mb-4">
                      {details.highlights.map((h, i) => (
                        <div key={i} className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-orange-500" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => switchRole(role)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-black text-white cursor-default'
                        : 'bg-neutral-100 hover:bg-orange-600 hover:text-white text-neutral-900'
                    }`}
                  >
                    <span>{isCurrent ? 'Current Workspace' : `Enter as ${role.toUpperCase()}`}</span>
                    {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-white flex items-center justify-between text-xs text-neutral-500">
          <span>Active Role: <strong className="text-black">{currentRole.toUpperCase()}</strong></span>
          <button
            onClick={() => setIsDemoLoginOpen(false)}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-black text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close Utility
          </button>
        </div>
      </div>
    </div>
  );
};
