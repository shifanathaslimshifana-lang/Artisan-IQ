import React from 'react';

interface GlassmorphismBackgroundProps {
  variant?: 'elaborate' | 'focused-dark';
}

export const GlassmorphismBackground: React.FC<GlassmorphismBackgroundProps> = ({
  variant = 'elaborate',
}) => {
  const isElaborate = variant === 'elaborate';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden -z-10 w-full h-full bg-[#050819]"
      style={{
        background: isElaborate
          ? 'radial-gradient(ellipse 95% 75% at 50% 15%, #0B1238 0%, #070C26 50%, #040615 100%)'
          : 'radial-gradient(ellipse 95% 75% at 50% 10%, #080D28 0%, #05081A 60%, #02040D 100%)',
      }}
    >
      {/* 1. Deep Ambient Lighting: Violet, Electric Blue, Vivid Teal & Sunset Coral Glows */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Upper Center Violet Nebula Bloom */}
        <div
          className={`absolute -top-20 left-1/4 w-[650px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
            isElaborate ? 'opacity-45' : 'opacity-25'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)',
          }}
        />

        {/* Electric Blue / Cyan Glow - Illuminating the bottom glass ribbon */}
        <div
          className={`absolute bottom-0 left-1/3 w-[700px] h-[350px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-700 ${
            isElaborate ? 'opacity-55' : 'opacity-25'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(6, 182, 212, 0.25) 55%, transparent 75%)',
          }}
        />

        {/* Coral-Pink / Amber Glow - Bottom Left behind Terracotta Pot & Fabric */}
        <div
          className={`absolute -bottom-24 -left-20 w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-700 ${
            isElaborate ? 'opacity-50' : 'opacity-20'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.45) 0%, rgba(249, 115, 22, 0.25) 50%, transparent 75%)',
          }}
        />

        {/* Warm Golden / Violet Ambient Glow - Bottom Right behind Figurine */}
        <div
          className={`absolute -bottom-28 -right-20 w-[580px] h-[580px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-700 ${
            isElaborate ? 'opacity-45' : 'opacity-20'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(234, 179, 8, 0.2) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* 2. Flowing Translucent 3D Glass Ribbons (Exact Curvature from Reference Image) */}
      <svg
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
          isElaborate ? 'opacity-95' : 'opacity-40'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main Sweeping Ribbon Translucent Fill */}
          <linearGradient id="mainRibbonFill" x1="0%" y1="80%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="25%" stopColor="#818CF8" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#C084FC" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.38" />
          </linearGradient>

          {/* Electric Cyan Specular Top Edge Stroke */}
          <linearGradient id="cyanWhiteEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.9" />
          </linearGradient>

          {/* Warm Coral / Amber Bottom Glow Stroke */}
          <linearGradient id="coralAmberEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#C084FC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
          </linearGradient>

          {/* Upper Right Glass Dome / Ribbon Gradient */}
          <linearGradient id="topRightRibbonGrad" x1="100%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.28" />
            <stop offset="40%" stopColor="#818CF8" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.15" />
          </linearGradient>

          <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Main Sweeping 3D Glass Ribbon across the bottom */}
        <path
          d="M -50 780 C 250 820, 480 940, 780 940 C 1120 940, 1380 780, 1620 620 C 1780 520, 1880 340, 1980 300 L 1980 600 C 1850 680, 1680 850, 1420 960 C 1120 1080, 720 1020, 420 960 C 180 900, -50 940, -50 940 Z"
          fill="url(#mainRibbonFill)"
        />

        {/* Luminous Top Refraction Edge (Electric Cyan to Neon Pink) */}
        <path
          d="M -50 780 C 250 820, 480 940, 780 940 C 1120 940, 1380 780, 1620 620 C 1780 520, 1880 340, 1980 300"
          fill="none"
          stroke="url(#cyanWhiteEdge)"
          strokeWidth="3.5"
          filter="url(#ribbonGlow)"
        />

        {/* Luminous Bottom Edge Highlight (Warm Coral Sunset) */}
        <path
          d="M -50 940 C 180 900, 420 960, 720 1020 C 1120 1080, 1420 960, 1680 850 C 1850 680, 1980 600, 1980 600"
          fill="none"
          stroke="url(#coralAmberEdge)"
          strokeWidth="2.5"
          filter="url(#ribbonGlow)"
        />

        {/* 2. Secondary Translucent Glass Wave (sweeping behind figurine on right) */}
        <path
          d="M 1980 160 C 1780 240, 1640 420, 1720 620 C 1780 780, 1920 920, 1980 980 L 1980 160 Z"
          fill="url(#topRightRibbonGrad)"
        />
        <path
          d="M 1980 160 C 1780 240, 1640 420, 1720 620 C 1780 780, 1920 920, 1980 980"
          fill="none"
          stroke="url(#cyanWhiteEdge)"
          strokeWidth="2.5"
        />

        {/* 3. Floating Translucent Glass Enclosure Wave (Left side behind pot) */}
        <path
          d="M -30 220 C 180 280, 240 500, 140 700 C 60 840, -40 920, -40 920 Z"
          fill="url(#mainRibbonFill)"
          opacity="0.45"
        />
        <path
          d="M -30 220 C 180 280, 240 500, 140 700 C 60 840, -40 920, -40 920"
          fill="none"
          stroke="url(#cyanWhiteEdge)"
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>

      {/* 3. Corner Craft Elements (Reference Image Artwork) */}
      {isElaborate && (
        <div className="absolute inset-0 pointer-events-none">
          {/* ============================================================== */}
          {/* A. BOTTOM-LEFT: Intricately Patterned Terracotta Pot, Woven Brocade Fabric & Dried Botanicals */}
          {/* ============================================================== */}
          <div className="absolute -bottom-8 -left-4 w-72 sm:w-96 md:w-[460px] h-72 sm:h-96 md:h-[460px] transition-transform duration-700">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_15px_40px_rgba(234,88,12,0.4)]">
              <defs>
                {/* Terracotta Clay Gradient with Deep Burnished Relief */}
                <linearGradient id="potClay" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="35%" stopColor="#EA580C" />
                  <stop offset="70%" stopColor="#9A3412" />
                  <stop offset="100%" stopColor="#431407" />
                </linearGradient>

                {/* Handloom Brocade Fabric Gradient */}
                <linearGradient id="brocadeFabric" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C026D3" />
                  <stop offset="30%" stopColor="#7E22CE" />
                  <stop offset="70%" stopColor="#BE185D" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>

                <linearGradient id="goldRelief" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#92400E" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Dried Botanicals / Baby's Breath Sprigs (Behind Pot) */}
              <g stroke="#FED7AA" strokeWidth="1.2" fill="none" opacity="0.65">
                <path d="M120 220 Q 140 140 180 80" />
                <path d="M140 160 Q 180 130 200 100" />
                <path d="M130 180 Q 100 130 90 90" />
                <path d="M150 170 Q 165 110 160 70" />
                {/* Delicate Starry Blossoms */}
                <g fill="#FFFBEB" stroke="none">
                  <circle cx="180" cy="80" r="3.5" />
                  <circle cx="190" cy="74" r="2.5" />
                  <circle cx="170" cy="88" r="2" />
                  <circle cx="200" cy="100" r="3" />
                  <circle cx="208" cy="94" r="2" />
                  <circle cx="90" cy="90" r="3.5" />
                  <circle cx="82" cy="82" r="2.5" />
                  <circle cx="160" cy="70" r="3" />
                  <circle cx="152" cy="65" r="2" />
                  <circle cx="168" cy="66" r="2.5" />
                </g>
              </g>

              {/* Terracotta Pot Body */}
              <ellipse cx="140" cy="245" rx="80" ry="75" fill="url(#potClay)" />
              {/* Neck & Lip */}
              <path d="M105 175 C 112 195, 100 215, 85 230" stroke="#FDBA74" strokeWidth="2" fill="none" opacity="0.7" />
              <path d="M175 175 C 168 195, 180 215, 195 230" stroke="#FDBA74" strokeWidth="2" fill="none" opacity="0.7" />
              <ellipse cx="140" cy="172" rx="38" ry="12" fill="#EA580C" stroke="#FDBA74" strokeWidth="2" />
              <ellipse cx="140" cy="168" rx="30" ry="8" fill="#431407" />

              {/* Embossed Floral & Geometric Medallions (matching reference image) */}
              <g fill="none" stroke="url(#goldRelief)" strokeWidth="2" opacity="0.85">
                {/* Central Carved Lotus Rosette */}
                <circle cx="140" cy="250" r="24" strokeWidth="2.5" />
                <circle cx="140" cy="250" r="8" fill="#F59E0B" />
                <path d="M140 226 C 146 238, 146 242, 140 250 C 134 242, 134 238, 140 226 Z" fill="url(#goldRelief)" />
                <path d="M140 274 C 146 262, 146 258, 140 250 C 134 258, 134 262, 140 274 Z" fill="url(#goldRelief)" />
                <path d="M116 250 C 128 256, 132 256, 140 250 C 132 244, 128 244, 116 250 Z" fill="url(#goldRelief)" />
                <path d="M164 250 C 152 256, 148 256, 140 250 C 148 244, 152 244, 164 250 Z" fill="url(#goldRelief)" />
                {/* Etched Pattern Bands */}
                <path d="M80 220 Q 140 250 200 220" strokeWidth="2.5" />
                <path d="M70 240 Q 140 275 210 240" strokeWidth="2" strokeDasharray="5 4" />
                <path d="M75 270 Q 140 305 205 270" strokeWidth="2" />
              </g>

              {/* Draped Woven Handloom Brocade Fabric (Beneath pot) */}
              <path
                d="M -10 270 C 60 250, 110 300, 160 310 C 210 320, 240 360, 260 400 L -10 400 Z"
                fill="url(#brocadeFabric)"
              />
              {/* Gold Embroidered Weave Ribs & Zari Details */}
              <g stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8">
                <path d="M 10 290 Q 90 280 170 330" fill="none" />
                <path d="M 30 320 Q 120 305 210 360" fill="none" />
                <path d="M 50 350 Q 140 335 240 390" fill="none" />
              </g>
              {/* Paisley / Floral Jacquard Motifs */}
              <g fill="#FDE047" opacity="0.75" transform="translate(60, 310) scale(0.6)">
                <path d="M 30 20 C 10 10, 0 40, 20 60 C 40 80, 70 70, 70 40 C 70 15, 45 30, 30 20 Z" />
              </g>
            </svg>
          </div>

          {/* ============================================================== */}
          {/* B. TOP-RIGHT: Hanging Antique Brass Jhumka with Pearls & Green Leaves */}
          {/* ============================================================== */}
          <div className="absolute top-0 right-4 sm:right-12 w-44 sm:w-56 md:w-64 h-48 sm:h-60 md:h-72 transition-transform duration-700">
            <svg viewBox="0 0 240 260" className="w-full h-full drop-shadow-[0_10px_25px_rgba(234,179,8,0.4)]">
              <defs>
                <linearGradient id="goldBrassBell" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="35%" stopColor="#EAB308" />
                  <stop offset="70%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#713F12" />
                </linearGradient>
                <linearGradient id="emeraldLeaves" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#059669" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#064E3B" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Foliage / Green Leaves Framing Top-Right Corner */}
              <g fill="url(#emeraldLeaves)">
                <ellipse cx="140" cy="20" rx="25" ry="12" transform="rotate(35 140 20)" />
                <ellipse cx="170" cy="35" rx="28" ry="14" transform="rotate(-20 170 35)" />
                <ellipse cx="120" cy="50" rx="22" ry="10" transform="rotate(55 120 50)" />
                <ellipse cx="195" cy="55" rx="26" ry="12" transform="rotate(-45 195 55)" />
                <ellipse cx="160" cy="70" rx="24" ry="11" transform="rotate(15 160 70)" />
              </g>

              {/* Suspension Chain / Loop */}
              <line x1="160" y1="0" x2="160" y2="45" stroke="#FDE047" strokeWidth="2.5" />
              <circle cx="160" cy="45" r="4" fill="#FEF08A" />

              {/* Jhumka Filigree Bell Dome */}
              <path
                d="M 125 105 C 125 60, 195 60, 195 105 C 195 110, 125 110, 125 105 Z"
                fill="url(#goldBrassBell)"
                stroke="#FEF08A"
                strokeWidth="2"
              />

              {/* Intricate Filigree Relief Etchings */}
              <path d="M 132 95 Q 160 82 188 95" stroke="#FEF08A" strokeWidth="2" fill="none" opacity="0.9" />
              <path d="M 138 85 Q 160 75 182 85" stroke="#FEF08A" strokeWidth="1.8" fill="none" opacity="0.8" />
              <path d="M 145 74 Q 160 67 175 74" stroke="#FEF08A" strokeWidth="1.5" fill="none" opacity="0.8" />

              {/* Hanging White Seed Pearl Fringe (Cascading bead drops) */}
              <g fill="#FFFBEB" stroke="#CA8A04" strokeWidth="0.8">
                {/* 1 */}
                <line x1="130" y1="110" x2="130" y2="120" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="130" cy="122" r="3.5" />
                {/* 2 */}
                <line x1="138" y1="110" x2="138" y2="124" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="138" cy="126" r="3.5" />
                {/* 3 */}
                <line x1="146" y1="110" x2="146" y2="126" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="146" cy="128" r="3.8" />
                {/* 4 */}
                <line x1="154" y1="110" x2="154" y2="128" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="154" cy="130" r="4.2" fill="#FEF08A" />
                {/* 5 (Center) */}
                <line x1="160" y1="110" x2="160" y2="132" stroke="#FDE047" strokeWidth="1.5" />
                <circle cx="160" cy="134" r="4.8" fill="#FEF08A" />
                {/* 6 */}
                <line x1="166" y1="110" x2="166" y2="128" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="166" cy="130" r="4.2" fill="#FEF08A" />
                {/* 7 */}
                <line x1="174" y1="110" x2="174" y2="126" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="174" cy="128" r="3.8" />
                {/* 8 */}
                <line x1="182" y1="110" x2="182" y2="124" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="182" cy="126" r="3.5" />
                {/* 9 */}
                <line x1="190" y1="110" x2="190" y2="120" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="190" cy="122" r="3.5" />
              </g>
            </svg>
          </div>

          {/* ============================================================== */}
          {/* C. BOTTOM-RIGHT: Carved Wooden Figurine with Serene Countenance */}
          {/* ============================================================== */}
          <div className="absolute -bottom-6 -right-4 w-64 sm:w-80 md:w-96 h-80 sm:h-96 md:h-[420px] transition-transform duration-700">
            <svg viewBox="0 0 320 380" className="w-full h-full drop-shadow-[0_15px_35px_rgba(161,98,7,0.35)]">
              <defs>
                <linearGradient id="woodSculpture" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="40%" stopColor="#B45309" />
                  <stop offset="75%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
                <linearGradient id="chiseledHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#B45309" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Foliage sprigs surrounding the wooden figurine */}
              <g fill="#059669" opacity="0.6">
                <ellipse cx="140" cy="280" rx="30" ry="12" transform="rotate(-35 140 280)" />
                <ellipse cx="130" cy="310" rx="26" ry="10" transform="rotate(-15 130 310)" />
                <ellipse cx="280" cy="220" rx="28" ry="12" transform="rotate(45 280 220)" />
              </g>

              {/* Hand-Carved Serene Head & Crown Silhouette */}
              {/* Crown / Mukut */}
              <path
                d="M 195 100 L 210 50 L 230 85 L 245 45 L 260 85 L 275 55 L 285 105 Z"
                fill="url(#woodSculpture)"
                stroke="url(#chiseledHighlight)"
                strokeWidth="2"
              />
              {/* Crown Chiseled Bands */}
              <path d="M 200 95 Q 240 85 280 98" stroke="#FDE68A" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M 195 108 Q 240 98 285 110" stroke="#FDE68A" strokeWidth="2" fill="none" opacity="0.8" />

              {/* Peaceful Serene Face (Profile / 3-Quarter View) */}
              <path
                d="M 200 110 C 190 140, 195 180, 215 210 C 235 235, 275 235, 290 205 C 300 180, 305 130, 290 110 Z"
                fill="url(#woodSculpture)"
                stroke="url(#chiseledHighlight)"
                strokeWidth="1.5"
              />

              {/* Serene Carved Eyes & Gentle Smile */}
              <g stroke="#FDE68A" strokeWidth="2" fill="none" opacity="0.85">
                {/* Closed / Meditative Downward-curved Eye */}
                <path d="M 215 155 Q 230 165 245 155" />
                <path d="M 212 145 Q 230 138 248 147" strokeWidth="1.5" />
                {/* Nose Profile */}
                <path d="M 240 148 L 244 175 L 235 180" />
                {/* Gentle Smile */}
                <path d="M 225 195 Q 238 202 250 195" />
                {/* Elongated Ear with Earring */}
                <path d="M 275 150 Q 285 170 280 190 Q 275 200 270 195" />
                <circle cx="275" cy="202" r="4" fill="#FDE68A" stroke="none" />
              </g>

              {/* Carved Torso & Draped Robes */}
              <path
                d="M 210 215 C 180 230, 160 280, 170 360 L 320 360 L 320 220 C 300 215, 270 215, 250 218 Z"
                fill="url(#woodSculpture)"
                stroke="url(#chiseledHighlight)"
                strokeWidth="2"
              />
              {/* Robe Fold Flutes */}
              <g stroke="#FDE68A" strokeWidth="1.5" fill="none" opacity="0.7">
                <path d="M 210 230 Q 235 290 210 360" />
                <path d="M 235 230 Q 260 290 245 360" />
                <path d="M 265 230 Q 290 290 280 360" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* 4. Iridescent Floating Glass Bubbles & Spheres (Matching Reference Locations) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Glass Bubble 1 - Hovering directly above terracotta pot */}
        <div
          className="absolute bottom-60 left-12 sm:left-24 w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48 rounded-full border border-white/50 backdrop-blur-xs transition-transform duration-1000 animate-liquid-float"
          style={{
            background:
              'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.2) 20%, rgba(56, 189, 248, 0.35) 55%, rgba(192, 132, 252, 0.3) 80%, rgba(244, 63, 94, 0.4) 100%)',
            boxShadow:
              'inset -5px -5px 15px rgba(139, 92, 246, 0.4), inset 5px 5px 12px rgba(255, 255, 255, 0.85), 0 10px 30px rgba(56, 189, 248, 0.25)',
          }}
        />

        {/* Small Companion Bubble near Pot */}
        <div
          className="absolute bottom-[360px] left-20 sm:left-36 w-7 sm:w-9 h-7 sm:h-9 rounded-full border border-white/60 backdrop-blur-xs animate-liquid-pulse"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(56, 189, 248, 0.4) 60%, rgba(168, 85, 247, 0.5) 100%)',
            boxShadow: 'inset -2px -2px 6px rgba(139, 92, 246, 0.4), inset 2px 2px 5px rgba(255, 255, 255, 0.9)',
          }}
        />

        {/* Glowing Bubble 2 - Floating near mid-right ribbon curve */}
        <div
          className="absolute bottom-80 right-1/4 w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24 rounded-full border border-white/45 backdrop-blur-xs animate-liquid-float"
          style={{
            animationDelay: '-3s',
            background:
              'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(244, 63, 94, 0.35) 45%, rgba(139, 92, 246, 0.4) 85%, rgba(56, 189, 248, 0.4) 100%)',
            boxShadow:
              'inset -4px -4px 12px rgba(244, 63, 94, 0.4), inset 4px 4px 10px rgba(255, 255, 255, 0.8), 0 8px 25px rgba(244, 63, 94, 0.25)',
          }}
        />

        {/* Floating Bubble 3 - Upper-Right Glass Dome Enclosure */}
        <div
          className="absolute -top-12 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full border border-white/30 backdrop-blur-xs"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(6, 182, 212, 0.25) 85%, transparent 100%)',
          }}
        />

        {/* Subtle Bokeh Light Points */}
        <div className="absolute top-1/3 left-1/2 w-3.5 h-3.5 rounded-full bg-cyan-300/70 blur-[1px] shadow-[0_0_15px_#67e8f9] animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-pink-400/65 blur-[1px] shadow-[0_0_12px_#f472b6] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-purple-400/70 blur-[1px] shadow-[0_0_10px_#c084fc] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 5. Central Clarity Mask (Dark, clean, readable space for dashboard & forms) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isElaborate
            ? 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(5, 8, 25, 0.35) 0%, rgba(5, 8, 25, 0.7) 65%, rgba(4, 6, 20, 0.88) 100%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(3, 5, 17, 0.75) 0%, rgba(3, 5, 17, 0.88) 65%, #02040D 100%)',
        }}
      />
    </div>
  );
};

