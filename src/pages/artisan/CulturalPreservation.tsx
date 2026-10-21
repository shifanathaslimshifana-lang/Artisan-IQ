import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Landmark,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react';

const DOCUMENTED_TRADITIONS = [
  {
    title: 'Cauvery Alluvium Wheel Throwing (Madurai / Thanjavur)',
    category: 'Pottery & Porous Ceramics',
    ageYears: 'Centuries-old heritage',
    status: 'GI Tag Registered (TN-POT-04)',
    significance:
      'Utilizes naturally occurring iron ochre and river silt to create alkaline cookware that retains 95% of food micro-nutrients during slow simmer cooking.',
  },
  {
    title: 'Dokra Lost-Wax Metal Casting (Bastar / Eastern Belt)',
    category: 'Non-Ferrous Metallurgical Casting',
    ageYears: '4,000+ Years (Indus Valley Provenance)',
    status: 'National Intangible Cultural Heritage',
    significance:
      'Oldest known metallurgy technique utilizing hand-pulled pure beeswax threads around clay cores, ensuring zero mechanical replication.',
  },
  {
    title: 'Chettinad Kottan Palm Leaf Twill Weaving',
    category: 'Natural Fiber & Basketry',
    ageYears: 'UNESCO Heritage Craft',
    status: 'GI Certified (TN-KT-11)',
    significance:
      'Woven exclusively from solar-cured tender palmyra palm leaves dyed with natural madder root, providing durable storage baskets without synthetic binders.',
  },
];

export const CulturalPreservation: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 uppercase tracking-wider">
          <Landmark className="w-4 h-4 text-indigo-900" /> Living Heritage & GI Provenance
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Cultural Craft Documentation & Preservation Hub
        </h1>
        <p className="text-xs text-neutral-500">
          Documenting indigenous metallurgical, ceramic, and botanical dye traditions to protect master artisans against mass-produced factory counterfeits.
        </p>
      </div>

      {/* Grid of craft documentation */}
      <div className="space-y-4">
        {DOCUMENTED_TRADITIONS.map((tradition, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  {tradition.category}
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  {tradition.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {tradition.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {tradition.significance}
            </p>

            <div className="flex items-center justify-between pt-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-neutral-400" /> Historical Lineage: {tradition.ageYears}
              </span>
              <span className="text-indigo-900 font-semibold">
                Council GI Verified Protocol Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
