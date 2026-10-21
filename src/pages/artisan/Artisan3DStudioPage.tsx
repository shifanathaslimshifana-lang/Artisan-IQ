import React from 'react';
import { useApp } from '../../context/AppContext';
import { Craft3DStudio } from '../../components/craft3d/Craft3DStudio';
import {
  Sparkles,
  Layers,
  Award,
  Info,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const Artisan3DStudioPage: React.FC = () => {
  const { products, selected3DProduct, setSelected3DProduct } = useApp();

  const craftModels = products.filter((p) => p.model3DType);
  const activeProduct = selected3DProduct || craftModels[0];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C76B45] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C76B45]" /> Three.js Procedural 3D Craft Studio
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            Interactive 3D Craft Inspection & Material Studio
          </h1>
          <p className="text-xs text-neutral-500">
            Real-time Studio PBR rendering with RoomEnvironment reflections, smooth exponential damping, and multi-part exploded craft construction.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          {craftModels.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected3DProduct(item)}
              className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeProduct.id === item.id
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {item.category === 'pottery'
                ? 'Terracotta Pot'
                : item.category === 'metalware'
                ? 'Dokra Brass Diya'
                : 'Turned Wood Vase'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <Craft3DStudio product={activeProduct} allowFullscreen={true} />

      {/* Craft Construction & Materials Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-2">
            <Layers className="w-4 h-4 text-indigo-900" />
            <span>Procedural Construction</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Composed of 7 to 9 coordinated procedural meshes (pedestal foot, thrown belly, ornamental stamped waist ring, neck collar, and flared lip rim).
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-2">
            <Award className="w-4 h-4 text-[#C76B45]" />
            <span>Authentic Materials</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {activeProduct.materials.join(' · ')}. Finished with zero chemical glazes using sustainable pit smoke and cold-pressed botanical oils.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>GI Heritage Authenticity</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Heritage Score: <strong className="text-neutral-900 tabular-nums">{activeProduct.heritageScore}/100</strong>. Verified geographic indication techniques recorded by the National Craft Council.
          </p>
        </div>
      </div>
    </div>
  );
};
