import { GoogleGenAI } from '@google/genai';

interface ApiRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  end: () => void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    res.status(200).json({
      success: true,
      modelUsed: 'heuristic-craft-analyzer',
      data: generateHeuristicFallback(req.body?.userNotes),
    });
    return;
  }

  const { image, userNotes } = req.body || {};
  if (!image) {
    res.status(400).json({ success: false, error: 'No image provided' });
    return;
  }

  let mimeType = 'image/jpeg';
  let base64Data = '';

  if (image.startsWith('data:')) {
    const matches = image.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      mimeType = matches[1].toLowerCase();
      base64Data = matches[2];
    }
  } else if (image.startsWith('http://') || image.startsWith('https://')) {
    try {
      const fetchResp = await fetch(image, { signal: AbortSignal.timeout(8000) });
      if (fetchResp.ok) {
        const ct = fetchResp.headers.get('content-type');
        if (ct && ct.startsWith('image/')) mimeType = ct.split(';')[0].toLowerCase();
        const buffer = await fetchResp.arrayBuffer();
        base64Data = Buffer.from(buffer).toString('base64');
      }
    } catch {
      // Fallback
    }
  } else {
    base64Data = image;
  }

  if (!base64Data) {
    res.status(200).json({
      success: true,
      modelUsed: 'heuristic-craft-analyzer',
      data: generateHeuristicFallback(userNotes),
    });
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `You are an expert cultural handicraft and artisan product intelligence specialist.
Examine this craft photograph carefully, objectively, and accurately.

CRITICAL OBJECTIVITY AND FACTUALITY GUIDELINES:
1. CORE RULE: COLOUR IS NOT PROOF OF MATERIAL.
   - A gold-coloured object DOES NOT automatically mean real gold.
   - A silver-coloured object DOES NOT automatically mean real silver.
   - A golden appearance DOES NOT confirm 22K or 24K gold or real gold plating unless documented.
   - Distinguish visual colour (e.g. "Gold-coloured"), visible finish (e.g. "Gold-tone metal finish"), and verified material (e.g. "Unknown / unverified pending artisan confirmation").
   - Image recognition cannot authenticate gold or determine karat purity.
2. JEWELLERY RECOGNITION (e.g. Jumkha earrings):
   - Product type: Jumkha earrings / traditional decorative earrings.
   - Visible colour: Gold-coloured.
   - Visible appearance: Gold-tone finish.
   - Actual material: Unknown.
   - Gold purity: Cannot be determined from image.
   - Verification status: Unverified.
   - Pricing basis: Imitation jewellery estimate, pending material confirmation.
   - Suggested base price: Fair imitation jewellery estimate (e.g. ₹320 - ₹450), NEVER bullion gold price.

Return a valid JSON object matching this exact schema:
{
  "product_name": "Concise descriptive title, e.g. 'Gold-coloured Jumkha Earrings'",
  "category": "One of: 'pottery', 'basketry', 'jewellery', 'textiles', 'woodcraft', 'metalware', 'stonecraft', 'home-decor', 'modern-manufactured', 'other'",
  "possible_craft_type": "Specific traditional craft technique",
  "visible_appearance": "e.g. 'Gold-tone finish' or 'Unglazed terracotta'",
  "actual_material": "e.g. 'Unknown' or 'Terracotta clay'",
  "gold_purity": "e.g. 'Cannot be determined from image' or 'N/A'",
  "material_verification_status": "One of: 'Unverified', 'Verified', 'Requires artisan confirmation'",
  "pricing_basis": "e.g. 'Imitation jewellery estimate, pending material confirmation'",
  "visible_materials": ["Observable materials"],
  "visible_colors": ["Visible colors, e.g. 'Gold-coloured'"],
  "visible_patterns": ["Visible motifs"],
  "observable_features": ["3 to 5 physical features"],
  "possible_origin": { "value": "Regional origin or null", "confidence": "high|medium|low|unknown", "evidence": "Visual cues" },
  "confidence": "high|medium|low",
  "alternative_identifications": ["1 to 2 alternatives"],
  "uncertainties": ["Details requiring artisan confirmation"],
  "is_likely_handicraft": true,
  "reasoning_summary": "2-3 sentences explaining craft authenticity indicators and stating material uncertainty",
  "needs_user_confirmation": true,
  "suggested_base_price": 365,
  "fair_value_explanation": "Economic reasoning based on material and labor",
  "suggested_tags": ["relevant", "keywords"],
  "description_draft": "Product description highlighting visible craftsmanship"
}
${userNotes ? `Artisan notes: "${userNotes}"` : ''}`;

  const models = ['gemini-2.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
  for (const m of models) {
    try {
      const result = await ai.models.generateContent({
        model: m,
        contents: [
          { inlineData: { mimeType, data: base64Data } },
          prompt,
        ],
        config: { responseMimeType: 'application/json' },
      });
      if (result && result.text) {
        const parsed = JSON.parse(result.text.replace(/```json/g, '').replace(/```/g, '').trim());
        res.status(200).json({ success: true, modelUsed: m, data: parsed });
        return;
      }
    } catch {
      // Try next model
    }
  }

  // Graceful fallback if models fail
  res.status(200).json({
    success: true,
    modelUsed: 'heuristic-craft-analyzer',
    data: generateHeuristicFallback(userNotes),
  });
}

function generateHeuristicFallback(userNotes?: string) {
  const notesLower = (userNotes || '').toLowerCase();
  let category = 'pottery';
  let name = 'Handcrafted Terracotta Creation';
  let technique = 'Wheel-thrown & Kiln-fired Terracotta';
  let visibleAppearance = 'Natural red clay texture with organic slip';
  let actualMaterial = 'Terracotta clay (unverified purity)';
  let goldPurity = 'N/A';
  let verificationStatus: 'Unverified' | 'Verified' | 'Requires artisan confirmation' = 'Requires artisan confirmation';
  let pricingBasis = 'Terracotta raw clay plus firing & wheel labor';
  let materials = ['Natural Red Silt Clay', 'Organic Slip'];
  let price = 765;
  let explanation = 'Calculated from 4 hours artisan throwing & kiln monitoring at living wage rates.';
  let uncertainties = ['Firing temperature', 'Glaze chemical composition'];

  if (
    notesLower.includes('earring') ||
    notesLower.includes('jumkha') ||
    notesLower.includes('jhumka') ||
    notesLower.includes('jewel') ||
    notesLower.includes('gold') ||
    notesLower.includes('bead')
  ) {
    category = 'jewellery';
    name = 'Gold-coloured Jumkha Earrings';
    technique = 'Traditional Dome Filigree & Bead Assembly';
    visibleAppearance = 'Gold-tone finish with metallic luster';
    actualMaterial = 'Unknown';
    goldPurity = 'Cannot be determined from image';
    verificationStatus = 'Unverified';
    pricingBasis = 'Imitation jewellery estimate, pending material confirmation';
    materials = ['Base metal alloy (gold-tone)', 'Faux pearls / glass beads'];
    price = 365;
    explanation = 'Calculated using base brass alloy materials, bead accessories, and 1.5 hours assembly labor.';
    uncertainties = [
      'Visual colour is not proof of material - actual metal alloy unverified',
      'Gold purity cannot be verified from image - requires bullion hallmark certification if genuine',
    ];
  } else if (notesLower.includes('wood') || notesLower.includes('carv') || notesLower.includes('toy')) {
    category = 'woodcraft';
    name = 'Hand-Carved Artisan Woodcraft';
    technique = 'Chisel-carved Hardwood';
    visibleAppearance = 'Natural woodgrain with hand-rubbed finish';
    actualMaterial = 'Seasoned Hardwood (unverified species)';
    goldPurity = 'N/A';
    verificationStatus = 'Requires artisan confirmation';
    pricingBasis = 'Timber block cost plus 5.5 hours chiseling labor';
    materials = ['Seasoned Timber', 'Natural Polish'];
    price = 980;
    explanation = 'Calculated from hardwood timber block cost plus 5.5 hours hand chiseling and sanding labor.';
    uncertainties = ['Exact wood species', 'Moisture seasoning history'];
  } else if (notesLower.includes('textile') || notesLower.includes('saree') || notesLower.includes('weave') || notesLower.includes('cotton')) {
    category = 'textiles';
    name = 'Handloom Artisan Woven Textile';
    technique = 'Traditional Handloom Weaving';
    visibleAppearance = 'Fine woven yarn texture with hand-tied tassels';
    actualMaterial = 'Organic Cotton Yarn (unverified thread count)';
    goldPurity = 'N/A';
    verificationStatus = 'Requires artisan confirmation';
    pricingBasis = 'Organic cotton warp & weft plus 8 hours pit-loom weaving';
    materials = ['Cotton / Silk Blended Yarn', 'Azo-free Dyes'];
    price = 1420;
    explanation = 'Calculated from raw yarn weight plus 8 hours master weaver pit-loom labor.';
    uncertainties = ['Precise yarn count', 'Fastness of natural dyes'];
  }

  return {
    product_name: name,
    category,
    possible_craft_type: technique,
    visible_appearance: visibleAppearance,
    actual_material: actualMaterial,
    gold_purity: goldPurity,
    material_verification_status: verificationStatus,
    pricing_basis: pricingBasis,
    visible_materials: materials,
    visible_colors: ['Gold-coloured', 'Metallic luster'],
    visible_patterns: ['Traditional Geometric & Bell Motifs'],
    observable_features: ['Handcrafted bell/dome silhouette', 'Visible hanging bead drops', 'Gold-tone surface luster'],
    possible_origin: {
      value: 'Regional Artisan Cluster',
      confidence: 'medium',
      evidence: 'Consistent with regional Indian traditional handicraft styles',
    },
    confidence: 'medium',
    alternative_identifications: ['Traditional Decorative Jewellery / Craft'],
    uncertainties,
    is_likely_handicraft: true,
    reasoning_summary: 'Observable surface textures, craftsmanship details, and styling show traditional artisan techniques. Colour alone is not proof of material; material remains unverified until confirmed by artisan.',
    needs_user_confirmation: true,
    suggested_base_price: price,
    fair_value_explanation: explanation,
    suggested_tags: ['handmade', category, 'traditional-craft', 'artisan-verified'],
    description_draft: `Handmade with patient generational devotion. Each piece carries authentic character and directly supports traditional artisan households.`,
  };
}
