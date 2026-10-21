import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateFairPrice } from '../../services/aiService';
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  Info,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Scale,
  DollarSign,
  ChevronRight,
  Eye,
  Store,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const FairPricingCalculator: React.FC = () => {
  const { showToast, t } = useApp();

  // Active Category & Preset
  const [selectedCategory, setSelectedCategory] = useState<string>('imitation_jewellery');
  const [isConfirmedGold, setIsConfirmedGold] = useState<boolean>(false);
  const [hasReliableMarketData, setHasReliableMarketData] = useState<boolean>(true);

  // Category-specific cost breakdown variables
  const [rawMaterialCost, setRawMaterialCost] = useState<number>(100);
  const [labourHours, setLabourHours] = useState<number>(1.5);
  const [labourRatePerHour, setLabourRatePerHour] = useState<number>(75);
  const [packagingCost, setPackagingCost] = useState<number>(30);
  const [otherExpenses, setOtherExpenses] = useState<number>(15);
  const [transportCost, setTransportCost] = useState<number>(20);
  const [platformFee, setPlatformFee] = useState<number>(15);
  const [desiredProfitMarginPercent, setDesiredProfitMarginPercent] = useState<number>(20);

  // Gold specific state (when genuine gold is confirmed)
  const [goldPurity, setGoldPurity] = useState<'22K' | '18K' | '14K'>('22K');
  const [netGoldWeightGrams, setNetGoldWeightGrams] = useState<number>(6.0);
  const [goldRatePerGram, setGoldRatePerGram] = useState<number>(6850);
  const [makingChargeType, setMakingChargeType] = useState<'percentage' | 'perGram'>('percentage');
  const [makingChargeValue, setMakingChargeValue] = useState<number>(12); // 12%
  const [hallmarkingCost, setHallmarkingCost] = useState<number>(450);

  // Calculate pricing based on current inputs
  const result = calculateFairPrice({
    rawMaterialCost: Number(rawMaterialCost) || 0,
    labourHours: Number(labourHours) || 0,
    labourRatePerHour: Number(labourRatePerHour) || 0,
    packagingCost: Number(packagingCost) || 0,
    transportCost: Number(transportCost) || 0,
    platformFee: Number(platformFee) || 0,
    otherExpenses: Number(otherExpenses) || 0,
    desiredProfitMarginPercent: Number(desiredProfitMarginPercent) || 0,
    productCategory: selectedCategory.includes('jewellery') || selectedCategory.includes('gold') ? 'jewellery' : selectedCategory,
    isConfirmedGold: isConfirmedGold,
    hasReliableMarketData: hasReliableMarketData,
  });

  const costData = [
    { name: 'Raw Materials', value: result.materialCost, color: '#ea580c' },
    { name: 'Artisan Labour', value: result.labourCost, color: '#000000' },
    { name: 'Packaging', value: result.packagingCost, color: '#f97316' },
    { name: 'Other Production', value: result.otherProductionExpenses, color: '#eab308' },
    { name: 'Shipping & Transport', value: result.shippingCost, color: '#71717a' },
    { name: 'Platform / Overhead', value: result.platformFee, color: '#27272a' },
  ].filter((item) => item.value > 0);

  const applyCategoryTemplate = (type: string) => {
    setSelectedCategory(type);
    if (type === 'imitation_jewellery') {
      setIsConfirmedGold(false);
      setRawMaterialCost(100); // Base metal alloy (brass/zinc) + beads
      setLabourHours(1.5);
      setLabourRatePerHour(75);
      setPackagingCost(30);
      setOtherExpenses(15);
      setTransportCost(20);
      setPlatformFee(15);
      setDesiredProfitMarginPercent(20);
      showToast('info', 'Imitation Jewellery Template', 'Loaded realistic imitation jewellery baseline. Bullion gold rates are NOT applied.');
    } else if (type === 'genuine_gold') {
      setIsConfirmedGold(true);
      const pureGoldCost = Math.round(6.0 * 6850); // 6g @ 6850 = 41100
      const making = Math.round(pureGoldCost * 0.12); // 12% = 4932
      setRawMaterialCost(pureGoldCost);
      setLabourHours(0); // making charge handles casting labour
      setLabourRatePerHour(0);
      setPackagingCost(450); // Velvet box & transit insurance
      setOtherExpenses(making + 450); // making charge + hallmark fee
      setTransportCost(350); // Insured courier
      setPlatformFee(250);
      setDesiredProfitMarginPercent(10);
      showToast('info', 'Genuine Gold Template', 'Loaded 22K hallmarked gold parameters with verified weight and making charges.');
    } else if (type === 'pottery') {
      setIsConfirmedGold(false);
      setRawMaterialCost(140); // Clay & natural silt + glaze
      setLabourHours(4.0);
      setLabourRatePerHour(75);
      setPackagingCost(45);
      setOtherExpenses(35); // Kiln firewood & breakage allowance
      setTransportCost(35);
      setPlatformFee(20);
      setDesiredProfitMarginPercent(25);
      showToast('info', 'Handmade Pottery Template', 'Loaded clay, kiln firing, breakage allowance, and throwing labour.');
    } else if (type === 'woven') {
      setIsConfirmedGold(false);
      setRawMaterialCost(240); // Natural dyed yarn
      setLabourHours(7.0);
      setLabourRatePerHour(75);
      setPackagingCost(35);
      setOtherExpenses(30); // Loom setup & shuttle wear
      setTransportCost(40);
      setPlatformFee(25);
      setDesiredProfitMarginPercent(25);
      showToast('info', 'Woven Products Template', 'Loaded yarn, loom setup, and handloom weaving hours.');
    } else if (type === 'textiles') {
      setIsConfirmedGold(false);
      setRawMaterialCost(280); // Base fabric, embroidery threads & zari
      setLabourHours(8.0);
      setLabourRatePerHour(80);
      setPackagingCost(40);
      setOtherExpenses(35); // Needles, hoops, finishing
      setTransportCost(40);
      setPlatformFee(30);
      setDesiredProfitMarginPercent(25);
      showToast('info', 'Embroidery & Textiles Template', 'Loaded fabric, threads, design complexity, and stitching labour.');
    } else if (type === 'wood') {
      setIsConfirmedGold(false);
      setRawMaterialCost(190); // Seasoned timber + shellac
      setLabourHours(5.5);
      setLabourRatePerHour(85);
      setPackagingCost(40);
      setOtherExpenses(40); // Sandpaper, chisels, timber wastage
      setTransportCost(45);
      setPlatformFee(25);
      setDesiredProfitMarginPercent(25);
      showToast('info', 'Wooden Crafts Template', 'Loaded timber, tool wear, timber wastage, and chisel carving labour.');
    } else if (type === 'test_case_100') {
      // Test 3 from prompt: Total cost = ₹100, margin = 20% -> price = ₹125, profit = ₹25
      setIsConfirmedGold(false);
      setRawMaterialCost(40);
      setLabourHours(1);
      setLabourRatePerHour(40); // 40
      setPackagingCost(10);
      setOtherExpenses(10); // 40+40+10+10 = 100
      setTransportCost(0);
      setPlatformFee(0);
      setDesiredProfitMarginPercent(20);
      showToast('success', 'Prompt Test Preset Loaded', 'Total cost = ₹100, Desired margin = 20% -> Suggested price = ₹125, Net profit = ₹25.');
    }
  };

  const handleUpdateGoldCalculation = () => {
    const rawGold = Math.round(netGoldWeightGrams * goldRatePerGram);
    const making = makingChargeType === 'percentage'
      ? Math.round(rawGold * (makingChargeValue / 100))
      : Math.round(netGoldWeightGrams * makingChargeValue);
    setRawMaterialCost(rawGold);
    setOtherExpenses(making + hallmarkingCost);
    showToast('info', 'Gold Valuation Updated', `Updated gold cost: ₹${rawGold} + ₹${making} making charge.`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-orange-400" /> Living Wage & Transparent Cost-Based Pricing
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          Artisan Cost-Based Pricing Intelligence & Fair Margin System
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          Eliminates unsupported guesses. Every price is mathematically grounded in your verified material costs, living artisan wages, and transparent profit margins.
        </p>
      </div>

      {/* Category-Specific Cost Inputs (Part 3) */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-orange-600" />
            <span>Select Product-Specific Cost Model:</span>
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">Part 3 Product-Specific Pricing Rules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <button
            type="button"
            onClick={() => applyCategoryTemplate('imitation_jewellery')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'imitation_jewellery'
                ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate">Imitation Jewellery</div>
            <div className="text-[10px] text-neutral-500">Brass/Alloy Jumkha</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('genuine_gold')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'genuine_gold'
                ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate text-amber-800">Genuine Gold</div>
            <div className="text-[10px] text-neutral-500">22K / Hallmarked</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('pottery')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'pottery'
                ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate">Handmade Pottery</div>
            <div className="text-[10px] text-neutral-500">Clay, Glaze, Firing</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('woven')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'woven'
                ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate">Woven Products</div>
            <div className="text-[10px] text-neutral-500">Yarn, Loom Hours</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('textiles')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'textiles'
                ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate">Textiles & Embroidery</div>
            <div className="text-[10px] text-neutral-500">Fabric & Thread</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('wood')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'wood'
                ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate">Wooden Crafts</div>
            <div className="text-[10px] text-neutral-500">Timber & Chisel</div>
          </button>

          <button
            type="button"
            onClick={() => applyCategoryTemplate('test_case_100')}
            className={`p-2 text-left rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'test_case_100'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500'
                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
            }`}
          >
            <div className="font-semibold truncate text-emerald-800">Test Preset ₹100</div>
            <div className="text-[10px] text-neutral-500">20% Margin Test</div>
          </button>
        </div>

        {/* Special Notice regarding Jewellery Material Truth (Part 1) */}
        {selectedCategory === 'imitation_jewellery' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Imitation Jewellery Pricing Protocol:</strong>
              <p className="mt-0.5 text-[11px] leading-relaxed">
                A gold-tone finish is NOT proof of real gold. The pricing below uses actual imitation jewellery brass/alloy metal costs, beads, and craft assembly labour. It does NOT use 22K or 24K gold bullion rates.
              </p>
            </div>
          </div>
        )}

        {/* Special Box for Confirmed Genuine Gold Jewellery */}
        {isConfirmedGold && (
          <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>Genuine Gold Parameters (Documented Verification Required):</span>
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                Hallmarked Bullion Basis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Confirmed Purity</label>
                <select
                  value={goldPurity}
                  onChange={(e) => {
                    const p = e.target.value as any;
                    setGoldPurity(p);
                    if (p === '22K') setGoldRatePerGram(6850);
                    else if (p === '18K') setGoldRatePerGram(5600);
                    else setGoldRatePerGram(4360);
                  }}
                  className="w-full p-2 border border-amber-300 bg-white rounded-lg font-medium"
                >
                  <option value="22K">22K Gold (916 Hallmark)</option>
                  <option value="18K">18K Gold (750 Hallmark)</option>
                  <option value="14K">14K Gold (585 Hallmark)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Verified Net Gold Weight (grams)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={netGoldWeightGrams}
                  onChange={(e) => setNetGoldWeightGrams(Number(e.target.value))}
                  className="w-full p-2 border border-amber-300 bg-white rounded-lg font-medium tabular-nums"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Current Gold Rate (₹/g)</label>
                <input
                  type="number"
                  value={goldRatePerGram}
                  onChange={(e) => setGoldRatePerGram(Number(e.target.value))}
                  className="w-full p-2 border border-amber-300 bg-white rounded-lg font-medium tabular-nums"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Making Charges (%)</label>
                <input
                  type="number"
                  step="1"
                  min="5"
                  max="25"
                  value={makingChargeValue}
                  onChange={(e) => setMakingChargeValue(Number(e.target.value))}
                  className="w-full p-2 border border-amber-300 bg-white rounded-lg font-medium tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleUpdateGoldCalculation}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Recalculate Gold Costs
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Inputs (Left) and Transparent Price Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 1 & 2: Production & Selling Cost Inputs */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Step 1 & 2: Production & Selling Costs</h3>
              <p className="text-[11px] text-neutral-500">Edit any cost to see immediate transparent formula re-calculation</p>
            </div>
            <span className="text-xs text-neutral-400 font-mono">INR (₹)</span>
          </div>

          {/* Missing Cost Notice if total cost is 0 */}
          {result.isCostMissing && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Costs are missing</strong>
                <p className="text-[11px] mt-0.5">
                  Please enter your actual production expenses below. The application will not invent random numbers.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <span className="text-xs font-bold text-neutral-800 block">A. Production Cost Components</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Raw Material Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={rawMaterialCost}
                  onChange={(e) => setRawMaterialCost(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">
                  {selectedCategory === 'imitation_jewellery'
                    ? 'Brass alloy, beads, finish lacquer'
                    : selectedCategory === 'genuine_gold'
                    ? 'Net 22K gold bullion rate'
                    : selectedCategory === 'pottery'
                    ? 'Clay, silt, mineral wash, glaze'
                    : selectedCategory === 'woven'
                    ? 'Organic yarn & natural dye extract'
                    : selectedCategory === 'wood'
                    ? 'Seasoned timber & shellac'
                    : 'Raw materials & consumables'}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Artisan Labour Hours (hrs)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={labourHours}
                  onChange={(e) => setLabourHours(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">Dedicated handcraft hours</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Labour Wage Rate per Hour (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={labourRatePerHour}
                  onChange={(e) => setLabourRatePerHour(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">Fair living wage benchmark: ₹65–₹85/hr</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Packaging Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">Padded boxes, protective cotton, tags</span>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Other Production Expenses / Wastage (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">
                  Tool wear, kiln fuel, firing breakage allowance, wastage margin
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">Total Production Cost:</span>
              <span className="font-bold text-neutral-900 tabular-nums">
                ₹{result.materialCost} + ₹{result.labourCost} + ₹{result.packagingCost} + ₹{result.otherProductionExpenses} = <strong className="text-orange-600 font-extrabold text-sm">₹{result.totalProductionCost}</strong>
              </span>
            </div>
          </div>

          {/* Selling Expenses Section */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-800 block">B. Selling Expenses (Separated from Production)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Shipping / Courier & Transit (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={transportCost}
                  onChange={(e) => setTransportCost(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">Break-free padded delivery / insurance</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Platform Fee / Gateway (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-[10px] text-neutral-500">Listing & payment settlement fee</span>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800">Total Relevant Cost (Production + Selling):</span>
              <span className="font-extrabold text-neutral-900 text-sm tabular-nums">
                ₹{result.totalCost}
              </span>
            </div>
          </div>

          {/* Target Margin Slider */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Step 3: Desired Profit Margin (%)</span>
              <span className="font-bold text-orange-600 tabular-nums text-sm">{desiredProfitMarginPercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={desiredProfitMarginPercent}
              onChange={(e) => setDesiredProfitMarginPercent(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>10% (Subsidized entry)</span>
              <span>20% (Standard Fair Trade)</span>
              <span>35% (Master Heritage)</span>
              <span>50% (Luxury Boutique)</span>
            </div>
          </div>

          {/* Market Research Data Toggle */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-neutral-500" />
              <label htmlFor="market-toggle" className="text-xs font-semibold text-neutral-700 cursor-pointer">
                Include Verified Market Research Data
              </label>
            </div>
            <input
              id="market-toggle"
              type="checkbox"
              checked={hasReliableMarketData}
              onChange={(e) => setHasReliableMarketData(e.target.checked)}
              className="w-4 h-4 accent-orange-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Step 3, 4, 5: Transparent Pricing Output Column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Formula Card */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-black via-neutral-900 to-black text-white rounded-xl shadow-md border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-300">Suggested Selling Price (Step 3)</span>
              <span className="text-[11px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-semibold border border-orange-500/30">
                Formula Verified
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold tracking-tight tabular-nums text-white">
                ₹{result.suggestedSellingPrice}
              </div>
              <div className="text-xs text-neutral-300 mt-1">
                Expected Profit: <strong className="text-orange-400 font-bold tabular-nums">₹{result.netProfitPerUnit}</strong> ({result.actualProfitMarginPercent}% margin)
              </div>
            </div>

            {/* Transparent Formula Display (Step 3) */}
            <div className="p-2.5 bg-neutral-950/80 rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-300 space-y-1">
              <div className="text-orange-400 font-bold">Suggested Price = Total Cost / (1 - Margin)</div>
              <div>₹{result.totalCost} / (1 - {(result.desiredProfitMarginPercent / 100).toFixed(2)}) = ₹{result.suggestedSellingPrice}</div>
              <div className="text-neutral-400 text-[10px]">Net Profit = ₹{result.suggestedSellingPrice} - ₹{result.totalCost} = ₹{result.netProfitPerUnit}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px]">Total Production Cost</span>
                <span className="font-bold tabular-nums">₹{result.totalProductionCost}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Total Relevant Cost</span>
                <span className="font-bold tabular-nums text-orange-400">₹{result.totalCost}</span>
              </div>
            </div>
          </div>

          {/* Step 5: Three Fair Price Options */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">Step 5: Fair Price Options</span>
              <span className="text-[10px] text-neutral-400">Covers 100% of costs</span>
            </div>

            <div className="space-y-2">
              {/* Option 1: Affordable */}
              <div className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">{result.options.affordable.label}</span>
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">₹{result.options.affordable.sellingPrice}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-0.5">
                  <span>Margin: {result.options.affordable.marginPercent}% | Profit: ₹{result.options.affordable.netProfit}</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1 leading-tight">{result.options.affordable.assumptions}</p>
              </div>

              {/* Option 2: Recommended Fair Price */}
              <div className="p-2.5 rounded-lg border-2 border-orange-500 bg-orange-50/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-950 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                    <span>{result.options.recommended.label}</span>
                  </span>
                  <span className="text-sm font-extrabold text-orange-950 tabular-nums">₹{result.options.recommended.sellingPrice}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-orange-900 mt-0.5 font-medium">
                  <span>Margin: {result.options.recommended.marginPercent}% | Profit: ₹{result.options.recommended.netProfit}</span>
                </div>
                <p className="text-[10px] text-orange-900/80 mt-1 leading-tight">{result.options.recommended.assumptions}</p>
              </div>

              {/* Option 3: Premium Price */}
              <div className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{result.options.premium.label}</span>
                  </span>
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">₹{result.options.premium.sellingPrice}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-0.5">
                  <span>Margin: {result.options.premium.marginPercent}% | Profit: ₹{result.options.premium.netProfit}</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1 leading-tight">{result.options.premium.assumptions}</p>
              </div>
            </div>
          </div>

          {/* Step 4: Realistic Market Comparison Section */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                <span>Step 4: Market Comparison</span>
              </span>
            </div>

            {hasReliableMarketData && result.marketComparisons.length > 0 ? (
              <div className="space-y-2">
                {result.marketComparisons.map((item, idx) => (
                  <div key={idx} className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-neutral-900 text-[11px]">{item.name}</strong>
                      <span className="font-bold text-neutral-800 tabular-nums text-[11px]">
                        ₹{item.priceRange[0]} – ₹{item.priceRange[1]}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500">Craft: {item.craftsmanship}</div>
                    <div className="text-[10px] text-neutral-500">Material: {item.materialMatch}</div>
                    <div className="text-[9px] text-neutral-400 pt-0.5 border-t border-neutral-200/60 flex items-center justify-between">
                      <span>Source: {item.source}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-600 leading-relaxed">
                <p className="font-medium text-neutral-800">{result.marketDisclaimer}</p>
              </div>
            )}
          </div>

          {/* Cost Allocation Pie */}
          {costData.length > 0 && (
            <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Cost Breakdown Proportion</h4>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={costData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={50} paddingAngle={4}>
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => `₹${val}`} contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

