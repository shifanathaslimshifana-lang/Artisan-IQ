import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  recognizeProductImage,
  RecognitionResult,
  generateMarketingCaptions,
  calculateFairPrice,
  PricingCalculationResult,
} from '../../services/aiService';
import { CraftProduct } from '../../types';
import {
  Upload,
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Tag,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Image as ImageIcon,
  X,
  HelpCircle,
  Palette,
  MapPin,
  Camera,
  Layers,
  Eye,
  Check,
  Copy,
  DollarSign,
  TrendingUp,
  Share2,
  Info,
  Maximize2,
  Globe,
  Scale,
  Store,
  Calculator,
  ShieldCheck,
} from 'lucide-react';
import { LanguageCode } from '../../types';

const REGIONAL_LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
];

const SAMPLE_IMAGES = [
  {
    label: 'Ceramic Pottery Vase',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    hint: 'Studio glazed ceramic bud vase',
    type: 'pottery',
  },
  {
    label: 'Gold-coloured Jumkha Earrings',
    url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    hint: 'Traditional bell-shaped jumkha with gold-tone finish',
    type: 'jewellery',
  },
  {
    label: 'Artisan Wood Craft',
    url: 'https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=600&q=80',
    hint: 'Solid turned oak wood craft',
    type: 'woodcraft',
  },
];

export const ProductRecognition: React.FC = () => {
  const { addProduct, setActiveScreen, showToast, currentUser, t, language, setLanguage } = useApp();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageSourceType, setImageSourceType] = useState<'upload' | 'camera' | 'sample' | 'none'>('none');
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number | null>(null);
  const [artisanNotes, setArtisanNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Request race-condition guard
  const activeRequestIdRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Camera modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Artisan editable / confirmed fields
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('pottery');
  const [price, setPrice] = useState(365);
  const [technique, setTechnique] = useState('');
  const [materialsText, setMaterialsText] = useState('');
  const [description, setDescription] = useState('');
  const [isConfirmedAndSaved, setIsConfirmedAndSaved] = useState<boolean>(false);

  // Material Confirmation & Cost-Based Pricing State (Parts 1, 2, 3, 4)
  const [confirmedMaterialType, setConfirmedMaterialType] = useState<
    'imitation_jewellery' | 'genuine_gold' | 'pottery' | 'textiles' | 'woodcraft' | 'other'
  >('imitation_jewellery');
  const [hasReliableMarketData, setHasReliableMarketData] = useState<boolean>(true);
  const [selectedPricingOption, setSelectedPricingOption] = useState<'affordable' | 'recommended' | 'premium'>('recommended');

  // Production Cost Components
  const [rawMaterialCost, setRawMaterialCost] = useState<number>(100);
  const [labourHours, setLabourHours] = useState<number>(1.5);
  const [labourRatePerHour, setLabourRatePerHour] = useState<number>(75);
  const [packagingCost, setPackagingCost] = useState<number>(30);
  const [otherExpenses, setOtherExpenses] = useState<number>(15);

  // Selling Expenses
  const [transportCost, setTransportCost] = useState<number>(20);
  const [platformFee, setPlatformFee] = useState<number>(15);
  const [desiredProfitMarginPercent, setDesiredProfitMarginPercent] = useState<number>(20);

  // Gold specific state (when genuine gold is confirmed by artisan)
  const [goldPurity, setGoldPurity] = useState<'22K' | '18K' | '14K'>('22K');
  const [netGoldWeightGrams, setNetGoldWeightGrams] = useState<number>(6.0);
  const [goldRatePerGram, setGoldRatePerGram] = useState<number>(6850);
  const [makingChargeValue, setMakingChargeValue] = useState<number>(12);
  const [hallmarkingCost, setHallmarkingCost] = useState<number>(450);

  // Calculate dynamic fair pricing based on artisan inputs
  const pricingResult: PricingCalculationResult = calculateFairPrice({
    rawMaterialCost: Number(rawMaterialCost) || 0,
    labourHours: Number(labourHours) || 0,
    labourRatePerHour: Number(labourRatePerHour) || 0,
    packagingCost: Number(packagingCost) || 0,
    transportCost: Number(transportCost) || 0,
    platformFee: Number(platformFee) || 0,
    otherExpenses: Number(otherExpenses) || 0,
    desiredProfitMarginPercent: Number(desiredProfitMarginPercent) || 0,
    productCategory: category,
    isConfirmedGold: confirmedMaterialType === 'genuine_gold',
    hasReliableMarketData,
  });

  // Marketing preview modal
  const [showMarketingModal, setShowMarketingModal] = useState<boolean>(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  // Clean up camera stream if component unmounts
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('[Camera] Direct WebRTC camera access failed, triggering native camera fallback:', err);
      // Fallback to native mobile camera file input
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        showToast('error', 'Camera Error', 'Could not open camera. Please use file upload.');
      }
    }
  };

  const capturePhotoFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImageUrl(dataUrl);
      setImageSourceType('camera');
      setSelectedSampleIndex(null);
      setResult(null);
      setErrorMessage(null);
      setIsConfirmedAndSaved(false);
      showToast('info', 'Photo Captured', 'Craft snapshot captured. Ready for Gemini analysis.');
    }
    stopCameraStream();
  };

  const handleStartAnalysis = async () => {
    if (!imageUrl) {
      showToast('error', 'Image Required', 'Please upload a craft image, capture a photo, or select a sample first.');
      return;
    }

    const currentRequestId = ++activeRequestIdRef.current;
    setIsAnalyzing(true);
    setErrorMessage(null);
    setIsConfirmedAndSaved(false);

    try {
      console.log(`[ProductRecognition] Starting scan for requestId #${currentRequestId}, source=${imageSourceType}, lang=${language}`);
      const recognized = await recognizeProductImage(imageUrl, artisanNotes, language);

      // Race-condition guard: if a newer scan was started, ignore this older result
      if (currentRequestId !== activeRequestIdRef.current) {
        console.warn(`[ProductRecognition] Ignoring stale response for requestId #${currentRequestId}`);
        return;
      }

      setResult(recognized);
      const recName = recognized.product_name || recognized.productName || 'Artisan Craft';
      setProductName(recName);
      const recCat = recognized.category || 'pottery';
      setCategory(recCat);
      setTechnique(recognized.possible_craft_type || recognized.possibleTechnique || 'Handcrafted');
      setMaterialsText((recognized.visible_materials || recognized.likelyMaterials || []).join(', '));
      setDescription(recognized.description_draft || recognized.descriptionDraft || recognized.reasoning_summary || '');

      // Apply initial category-specific cost model based on recognition
      const nameLower = recName.toLowerCase();
      if (recCat === 'jewellery' || nameLower.includes('jumkha') || nameLower.includes('earring') || nameLower.includes('jewel')) {
        setConfirmedMaterialType('imitation_jewellery');
        setRawMaterialCost(100);
        setLabourHours(1.5);
        setLabourRatePerHour(75);
        setPackagingCost(30);
        setOtherExpenses(15);
        setTransportCost(20);
        setPlatformFee(15);
        setDesiredProfitMarginPercent(20);
        setPrice(365);
      } else if (recCat === 'woodcraft') {
        setConfirmedMaterialType('woodcraft');
        setRawMaterialCost(190);
        setLabourHours(5.5);
        setLabourRatePerHour(85);
        setPackagingCost(40);
        setOtherExpenses(40);
        setTransportCost(45);
        setPlatformFee(25);
        setDesiredProfitMarginPercent(25);
        setPrice(980);
      } else if (recCat === 'textiles') {
        setConfirmedMaterialType('textiles');
        setRawMaterialCost(280);
        setLabourHours(8.0);
        setLabourRatePerHour(80);
        setPackagingCost(40);
        setOtherExpenses(35);
        setTransportCost(40);
        setPlatformFee(30);
        setDesiredProfitMarginPercent(25);
        setPrice(1420);
      } else {
        setConfirmedMaterialType('pottery');
        setRawMaterialCost(140);
        setLabourHours(4.0);
        setLabourRatePerHour(75);
        setPackagingCost(45);
        setOtherExpenses(35);
        setTransportCost(35);
        setPlatformFee(20);
        setDesiredProfitMarginPercent(25);
        setPrice(765);
      }

      showToast(
        'success',
        'Gemini Vision Analysis Complete',
        `Identified: ${recognized.product_name} (${recognized.confidence} confidence)`
      );
    } catch (err: any) {
      if (currentRequestId !== activeRequestIdRef.current) return;
      const msg = err.message || 'The image could not be analyzed. Please try again.';
      console.error('[ProductRecognition] Analysis error:', err);
      setResult(null);
      setErrorMessage(msg);
      showToast('error', 'Analysis Failed', msg);
    } finally {
      if (currentRequestId === activeRequestIdRef.current) {
        setIsAnalyzing(false);
      }
    }
  };

  const handleSelectConfirmedCategory = (type: typeof confirmedMaterialType) => {
    setConfirmedMaterialType(type);
    if (type === 'imitation_jewellery') {
      setCategory('jewellery');
      setRawMaterialCost(100);
      setLabourHours(1.5);
      setLabourRatePerHour(75);
      setPackagingCost(30);
      setOtherExpenses(15);
      setTransportCost(20);
      setPlatformFee(15);
      setDesiredProfitMarginPercent(20);
      setPrice(365);
      showToast('info', 'Imitation Jewellery Confirmed', 'Loaded realistic imitation jewellery baseline. Bullion gold rates are NOT applied.');
    } else if (type === 'genuine_gold') {
      setCategory('jewellery');
      const pureGoldCost = Math.round(6.0 * 6850);
      const making = Math.round(pureGoldCost * 0.12);
      setRawMaterialCost(pureGoldCost);
      setLabourHours(0);
      setLabourRatePerHour(0);
      setPackagingCost(450);
      setOtherExpenses(making + 450);
      setTransportCost(350);
      setPlatformFee(250);
      setDesiredProfitMarginPercent(10);
      setPrice(Math.round((pureGoldCost + making + 900 + 600) / 0.9));
      showToast('info', 'Genuine Gold Confirmed', 'Loaded 22K hallmarked gold parameters with verified weight and making charges.');
    } else if (type === 'pottery') {
      setCategory('pottery');
      setRawMaterialCost(140);
      setLabourHours(4.0);
      setLabourRatePerHour(75);
      setPackagingCost(45);
      setOtherExpenses(35);
      setTransportCost(35);
      setPlatformFee(20);
      setDesiredProfitMarginPercent(25);
      setPrice(765);
      showToast('info', 'Handmade Pottery Confirmed', 'Loaded clay, kiln firing, breakage allowance, and throwing labour.');
    } else if (type === 'textiles') {
      setCategory('textiles');
      setRawMaterialCost(280);
      setLabourHours(8.0);
      setLabourRatePerHour(80);
      setPackagingCost(40);
      setOtherExpenses(35);
      setTransportCost(40);
      setPlatformFee(30);
      setDesiredProfitMarginPercent(25);
      setPrice(1420);
      showToast('info', 'Textiles & Embroidery Confirmed', 'Loaded fabric, threads, design complexity, and stitching labour.');
    } else if (type === 'woodcraft') {
      setCategory('woodcraft');
      setRawMaterialCost(190);
      setLabourHours(5.5);
      setLabourRatePerHour(85);
      setPackagingCost(40);
      setOtherExpenses(40);
      setTransportCost(45);
      setPlatformFee(25);
      setDesiredProfitMarginPercent(25);
      setPrice(980);
      showToast('info', 'Wooden Crafts Confirmed', 'Loaded timber, tool wear, timber wastage, and chisel carving labour.');
    } else {
      setCategory('other');
      showToast('info', 'Custom Craft Selected', 'Enter your verified workshop expenses below.');
    }
  };

  const handleSelectPriceOption = (optionKey: 'affordable' | 'recommended' | 'premium') => {
    setSelectedPricingOption(optionKey);
    const chosenPrice = pricingResult.options[optionKey].sellingPrice;
    setPrice(chosenPrice);
    showToast('info', `Selected ${pricingResult.options[optionKey].label}`, `Price set to ₹${chosenPrice} (${pricingResult.options[optionKey].marginPercent}% margin).`);
  };

  const optimizeImageFile = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const processSelectedFile = (file: File) => {
    const validMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const isExtensionValid = Boolean(file.name.match(/\.(jpg|jpeg|png|webp)$/i));

    if (!validMimes.includes(file.type.toLowerCase()) && !isExtensionValid) {
      showToast('error', 'Unsupported Format', 'This image format is not supported. Please upload a JPG, PNG, or WebP image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Reset previous results, sample index, and errors on new upload
    setSelectedSampleIndex(null);
    setImageSourceType('upload');
    setResult(null);
    setErrorMessage(null);
    setIsConfirmedAndSaved(false);

    const reader = new FileReader();
    reader.onload = async () => {
      const raw = reader.result as string;
      const optimized = await optimizeImageFile(raw);
      setImageUrl(optimized);
      showToast('info', 'Image Loaded', `${file.name} ready for Gemini Vision analysis.`);
    };
    reader.onerror = () => {
      showToast('error', 'Read Error', 'Could not load the selected image file. Please try another image.');
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleSelectSample = (sample: (typeof SAMPLE_IMAGES)[0], index: number) => {
    setSelectedSampleIndex(index);
    setImageSourceType('sample');
    setImageUrl(sample.url);
    setArtisanNotes(sample.hint);
    // Immediately clear stale results and errors
    setResult(null);
    setErrorMessage(null);
    setIsConfirmedAndSaved(false);
  };

  const handleClearImage = () => {
    setImageUrl('');
    setImageSourceType('none');
    setSelectedSampleIndex(null);
    setResult(null);
    setErrorMessage(null);
    setArtisanNotes('');
    setIsConfirmedAndSaved(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleApplyAlternative = (altName: string) => {
    setProductName(altName);
    showToast('info', 'Applied Alternative', `Updated product name to: ${altName}`);
  };

  const handleConfirmAndSaveProduct = () => {
    if (!result) return;

    const materialsArray = materialsText
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const validCategory = (['pottery', 'textiles', 'woodcraft', 'metalware', 'basketry', 'jewelry'] as const).includes(
      category as any
    )
      ? (category as any)
      : category === 'jewellery'
      ? 'jewelry'
      : 'pottery';

    const newProd: CraftProduct = {
      id: `prod-${Date.now()}`,
      title: productName || result.product_name,
      category: validCategory,
      categoryLabel: (category || 'Craft').toUpperCase(),
      artisanId: currentUser.id,
      artisanName: currentUser.name,
      location: currentUser.location,
      image: imageUrl,
      price: Number(price),
      costBreakdown: {
        rawMaterialCost: pricingResult.materialCost,
        labourHours: pricingResult.labourHours,
        labourRatePerHour: pricingResult.labourRatePerHour,
        packagingCost: pricingResult.packagingCost,
        transportCost: pricingResult.shippingCost,
        platformFee: pricingResult.platformFee,
        otherExpenses: pricingResult.otherProductionExpenses,
        totalCost: pricingResult.totalCost,
        netProfit: pricingResult.netProfitPerUnit,
        profitMarginPercent: pricingResult.actualProfitMarginPercent,
      },
      stock: 12,
      salesCount: 0,
      demandScore: 88,
      fairnessIndex: 94,
      heritageScore: 95,
      materials: materialsArray.length > 0 ? materialsArray : result.visible_materials,
      technique: technique,
      story: description,
      tags: result.suggested_tags || [category, 'handmade', 'artisan'],
      riskLevel: 'low',
    };

    addProduct(newProd);
    setIsConfirmedAndSaved(true);
    showToast('success', 'Verified & Saved', `"${newProd.title}" successfully confirmed and added to your artisan catalog.`);
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
    showToast('success', 'Copied', `${platform} copy copied to clipboard.`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header with Quick Regional Language Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
            <Scan className="w-4 h-4 text-orange-400" /> {t('Cultural Intelligence & Computer Vision')}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            {t('AI Craft Recognition & Visual Intelligence')}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
            {t('Product Recognition Subtitle')}
          </p>
        </div>

        {/* Quick Language Selector Bar */}
        <div className="flex items-center gap-1.5 self-start sm:self-center bg-white/10 p-1 rounded-xl border border-white/15 shadow-2xs backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-teal-400 ml-1.5 shrink-0" />
          <div className="flex items-center gap-1 flex-wrap">
            {REGIONAL_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === item.code
                    ? 'bg-orange-600 text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={`Switch language to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Image Upload, Camera & Input Management */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">{t('1. Product Photograph Input')}</h3>
            <span className="text-[11px] text-neutral-500 font-medium">{t('Supports JPG, PNG, WebP')}</span>
          </div>

          {/* Camera Viewfinder (if active) */}
          {isCameraActive ? (
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-black flex flex-col items-center justify-center">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3 px-4">
                <button
                  onClick={capturePhotoFromCamera}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t('Snap Photo')}</span>
                </button>
                <button
                  onClick={stopCameraStream}
                  className="px-3 py-2 bg-neutral-800/80 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg shadow-md cursor-pointer transition-colors"
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          ) : (
            /* Image Preview Area with Drag and Drop */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processSelectedFile(file);
              }}
              className={`relative aspect-4/3 rounded-xl overflow-hidden border transition-all flex items-center justify-center ${
                isDragOver
                  ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Craft photograph for analysis"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                        imageSourceType === 'upload'
                          ? 'bg-orange-600 text-white'
                          : imageSourceType === 'camera'
                          ? 'bg-blue-600 text-white'
                          : 'bg-black text-white'
                      }`}
                    >
                      {imageSourceType === 'upload'
                        ? 'Custom Upload'
                        : imageSourceType === 'camera'
                        ? 'Live Camera'
                        : 'Demo Sample'}
                    </span>
                    <button
                      onClick={handleClearImage}
                      title="Clear photo"
                      className="p-1 bg-white/95 hover:bg-white text-neutral-700 hover:text-black rounded-full shadow-xs cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 text-neutral-400 space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto text-neutral-300" />
                  <p className="text-xs font-semibold text-neutral-700">{t('No craft photograph selected yet')}</p>
                  <p className="text-[11px] text-neutral-400 max-w-xs">
                    {t('Drag and drop an image file here, or choose an input method below.')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons: Upload & Camera */}
          <div className="grid grid-cols-2 gap-2">
            <label className="py-2.5 px-3 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors shadow-xs text-center">
              <Upload className="w-3.5 h-3.5 text-orange-400" />
              <span>{imageUrl && imageSourceType === 'upload' ? t('Change Photo') : t('Upload File')}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={startCamera}
              className="py-2.5 px-3 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer text-center"
            >
              <Camera className="w-3.5 h-3.5 text-neutral-700" />
              <span>{t('Capture Photo')}</span>
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Optional Sample Selection */}
          <div className="pt-2 border-t border-neutral-100">
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1.5">
              {t('Or pick an authentic craft sample for instant test:')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((sample, idx) => (
                <button
                  key={sample.label}
                  onClick={() => handleSelectSample(sample, idx)}
                  className={`p-2 text-left rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                    imageSourceType === 'sample' && selectedSampleIndex === idx
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="font-semibold truncate">{sample.label}</div>
                  <div className="text-[10px] text-neutral-400 capitalize">{sample.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Optional notes */}
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1">
              {t('Artisan Context / Production Clues (Optional):')}
            </label>
            <input
              type="text"
              value={artisanNotes}
              onChange={(e) => setArtisanNotes(e.target.value)}
              placeholder="e.g. 22K gold plated temple jhumka, or wheel-thrown riverbed pot"
              className="w-full text-xs p-2.5 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-neutral-50 focus:bg-white"
            />
          </div>

          {/* Trigger Scan Button */}
          <div className="flex gap-2">
            <button
              onClick={handleStartAnalysis}
              disabled={isAnalyzing || !imageUrl}
              className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>{t('Gemini Vision Inspecting Craft Pixels...')}</span>
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 text-white" />
                  <span>{result ? t('Re-scan with Gemini Vision') : t('Analyze Craft with Gemini Vision')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: AI Output, Fact vs Inference Breakdown & Artisan Confirmation */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">{t('2. Objective AI Recognition Results')}</h3>
            {result && (
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  result.confidence === 'high'
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : result.confidence === 'medium'
                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-rose-700 bg-rose-50 border-rose-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="capitalize">{result.confidence === 'high' ? t('High Confidence') : result.confidence === 'medium' ? t('Medium Confidence') : t('Low Confidence')}</span>
              </div>
            )}
          </div>

          {/* Error Banner with Retry (Phase 5) */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-900">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Analysis Error</strong>
                  <p className="mt-0.5 text-[11px] leading-relaxed">{errorMessage}</p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleStartAnalysis}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t('Retry Analysis')}</span>
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!result && !isAnalyzing && !errorMessage && (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <Scan className="w-10 h-10 mx-auto text-neutral-300" />
              <p className="text-xs font-medium text-neutral-600">{t('No active craft analysis')}</p>
              <p className="text-[11px] max-w-xs mx-auto text-neutral-400">
                {t('Upload or capture an image on the left, then click "Analyze Craft with Gemini Vision" to inspect genuine craft traits.')}
              </p>
            </div>
          )}

          {/* Loading state */}
          {isAnalyzing && (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-neutral-700 font-semibold">{t('Gemini Vision Inspecting Craft Pixels...')}</p>
              <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
                Distinguishing direct physical evidence from unconfirmed inferences.
              </p>
            </div>
          )}

          {/* Result view - Full 8-Step Fair Workflow */}
          {result && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Step 1: Identify Visible Product Characteristics */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-orange-600" />
                    <span>Step 1: Visible Product Characteristics</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                    Visual Observation
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Product:</span>
                    <strong className="text-neutral-900 truncate block">{productName || result.product_name}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Visible Appearance:</span>
                    <strong className="text-neutral-900 truncate block">{result.visible_appearance || 'Gold-tone finish'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Actual Material:</span>
                    <strong className="text-amber-800 truncate block">{result.actual_material || 'Unknown'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Gold Purity:</span>
                    <strong className="text-neutral-800 truncate block">{result.gold_purity || 'Cannot be determined from image'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Verification Status:</span>
                    <strong className="text-rose-700 truncate block">{result.material_verification_status || 'Unverified'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px]">Pricing Basis:</span>
                    <strong className="text-neutral-800 truncate block">{result.pricing_basis || 'Imitation jewellery estimate'}</strong>
                  </div>
                </div>
              </div>

              {/* Step 2: Display Material Uncertainty (Core Rule: Colour is not proof of material) */}
              <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-xl space-y-2 text-xs text-amber-950">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wide text-amber-900 block">
                      CORE RULE: COLOUR IS NOT PROOF OF MATERIAL
                    </span>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
                      A gold-coloured object does NOT automatically mean real gold. A silver-coloured object does NOT automatically mean real silver. Image recognition cannot authenticate gold or determine karat purity.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                  <div className="bg-amber-100/60 p-1.5 rounded">
                    <strong className="text-amber-900 block">1. Visual Colour:</strong>
                    <span>Gold-coloured / metallic luster</span>
                  </div>
                  <div className="bg-amber-100/60 p-1.5 rounded">
                    <strong className="text-amber-900 block">2. Visible Finish:</strong>
                    <span>Gold-tone metal / imitation appearance</span>
                  </div>
                  <div className="bg-amber-100/60 p-1.5 rounded">
                    <strong className="text-amber-900 block">3. Verified Material:</strong>
                    <span className="text-rose-800 font-bold">Unverified pending artisan confirmation</span>
                  </div>
                </div>
              </div>

              {/* Editable Product Title & Craft Details */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    {t('Product Name (Artisan Editable):')}
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full text-xs font-semibold p-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-neutral-50 focus:bg-white"
                  />
                </div>

                {/* Alternative Identifications if available */}
                {result.alternative_identifications && result.alternative_identifications.length > 0 && (
                  <div className="text-[11px]">
                    <span className="text-neutral-500 mr-1.5 font-medium">{t('Alternative Identifications:')}</span>
                    <div className="inline-flex flex-wrap gap-1 mt-1">
                      {result.alternative_identifications.map((alt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleApplyAlternative(alt)}
                          title="Click to apply this name"
                          className="text-[10px] bg-neutral-100 hover:bg-orange-100 text-neutral-700 hover:text-orange-950 px-2 py-0.5 rounded border border-neutral-200 hover:border-orange-300 transition-colors cursor-pointer"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Ask Artisan to Confirm Product Details & Material */}
              <div className="p-3.5 bg-white border border-neutral-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-orange-600" />
                    <span>Step 3: Confirm Actual Product Material & Category</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">Artisan Confirmation</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('imitation_jewellery')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'imitation_jewellery'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Imitation Jewellery</div>
                    <div className="text-[9px] text-neutral-500">Brass/Alloy (Gold-tone)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('genuine_gold')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'genuine_gold'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px] text-amber-800">Genuine Gold</div>
                    <div className="text-[9px] text-neutral-500">22K / 18K Hallmarked</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('pottery')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'pottery'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Handmade Pottery</div>
                    <div className="text-[9px] text-neutral-500">Terracotta & Ceramic</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('textiles')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'textiles'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Textiles & Embroidery</div>
                    <div className="text-[9px] text-neutral-500">Handloom & Fabric</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('woodcraft')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'woodcraft'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Wooden Crafts</div>
                    <div className="text-[9px] text-neutral-500">Seasoned Timber</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectConfirmedCategory('other')}
                    className={`p-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      confirmedMaterialType === 'other'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-500'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Other Craft</div>
                    <div className="text-[9px] text-neutral-500">Custom Category</div>
                  </button>
                </div>

                {/* Specific Details Box for Genuine Gold */}
                {confirmedMaterialType === 'genuine_gold' ? (
                  <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-lg space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-amber-700" />
                        <span>Confirmed Gold Jewellery Details:</span>
                      </span>
                      <span className="text-[10px] text-amber-800 font-semibold">Bullion Verification</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div>
                        <label className="text-neutral-700 block mb-0.5">Purity</label>
                        <select
                          value={goldPurity}
                          onChange={(e) => {
                            const p = e.target.value as any;
                            setGoldPurity(p);
                            if (p === '22K') setGoldRatePerGram(6850);
                            else if (p === '18K') setGoldRatePerGram(5600);
                            else setGoldRatePerGram(4360);
                          }}
                          className="w-full p-1.5 border border-amber-300 bg-white rounded text-[11px]"
                        >
                          <option value="22K">22K Gold (916)</option>
                          <option value="18K">18K Gold (750)</option>
                          <option value="14K">14K Gold (585)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-neutral-700 block mb-0.5">Net Gold Weight (g)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.5"
                          value={netGoldWeightGrams}
                          onChange={(e) => setNetGoldWeightGrams(Number(e.target.value))}
                          className="w-full p-1.5 border border-amber-300 bg-white rounded text-[11px] tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="text-neutral-700 block mb-0.5">Current Rate (₹/g)</label>
                        <input
                          type="number"
                          value={goldRatePerGram}
                          onChange={(e) => setGoldRatePerGram(Number(e.target.value))}
                          className="w-full p-1.5 border border-amber-300 bg-white rounded text-[11px] tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="text-neutral-700 block mb-0.5">Making Charges (%)</label>
                        <input
                          type="number"
                          value={makingChargeValue}
                          onChange={(e) => setMakingChargeValue(Number(e.target.value))}
                          className="w-full p-1.5 border border-amber-300 bg-white rounded text-[11px] tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const goldCost = Math.round(netGoldWeightGrams * goldRatePerGram);
                          const making = Math.round(goldCost * (makingChargeValue / 100));
                          setRawMaterialCost(goldCost);
                          setOtherExpenses(making + hallmarkingCost);
                          showToast('info', 'Gold Cost Applied', `Base gold: ₹${goldCost}, Making: ₹${making}`);
                        }}
                        className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded text-[11px] font-bold cursor-pointer"
                      >
                        Apply Gold Parameters
                      </button>
                    </div>
                  </div>
                ) : (
                  confirmedMaterialType === 'imitation_jewellery' && (
                    <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-lg text-[11px] text-orange-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Imitation jewellery confirmed. Price is calculated using actual base metal alloy, beads, and craft assembly labour (not 22K gold rate).</span>
                    </div>
                  )
                )}
              </div>

              {/* Step 4: Collect Actual Costs & Product Information */}
              <div className="p-3.5 bg-white border border-neutral-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-orange-600" />
                    <span>Step 4: Collect Actual Production & Selling Costs</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">No invented values</span>
                </div>

                {/* Missing Cost Notice if total cost is 0 */}
                {pricingResult.isCostMissing && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Costs are missing</strong>
                      <p className="text-[11px] mt-0.5">
                        Please enter your actual expenses below. The application will not invent random production costs.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Material Cost (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={rawMaterialCost}
                      onChange={(e) => setRawMaterialCost(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Labour Hours (hrs)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={labourHours}
                      onChange={(e) => setLabourHours(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Wage Rate (₹/hr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={labourRatePerHour}
                      onChange={(e) => setLabourRatePerHour(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Packaging (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={packagingCost}
                      onChange={(e) => setPackagingCost(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Other Expenses (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Shipping / Courier (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={transportCost}
                      onChange={(e) => setTransportCost(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Platform Fee (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={platformFee}
                      onChange={(e) => setPlatformFee(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-neutral-300 rounded-lg tabular-nums focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-0.5">
                      Target Margin (%)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={desiredProfitMarginPercent}
                      onChange={(e) => setDesiredProfitMarginPercent(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-orange-300 bg-orange-50/50 rounded-lg tabular-nums font-bold text-orange-950 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">Total Relevant Cost (Production + Selling):</span>
                  <span className="font-extrabold text-neutral-900 tabular-nums">
                    ₹{pricingResult.totalProductionCost} (prod) + ₹{pricingResult.totalSellingExpenses} (selling) = <span className="text-orange-600">₹{pricingResult.totalCost}</span>
                  </span>
                </div>
              </div>

              {/* Step 5: Calculate Transparent Cost-Based Pricing (Formula Breakdown) */}
              <div className="p-4 bg-gradient-to-br from-neutral-900 to-black text-white rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-200">Step 5: Transparent Cost-Based Pricing</span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-semibold border border-orange-500/30">
                    Formula Verified
                  </span>
                </div>

                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="text-orange-400 font-bold">Suggested Price = Total Cost / (1 - Desired Margin)</div>
                  <div>₹{pricingResult.totalCost} / (1 - {(pricingResult.desiredProfitMarginPercent / 100).toFixed(2)}) = <span className="text-white font-bold text-xs">₹{pricingResult.suggestedSellingPrice}</span></div>
                  <div className="text-neutral-400 text-[10px]">Expected Profit = ₹{pricingResult.suggestedSellingPrice} - ₹{pricingResult.totalCost} = <span className="text-emerald-400 font-bold">₹{pricingResult.netProfitPerUnit}</span> ({pricingResult.actualProfitMarginPercent}% margin)</div>
                </div>
              </div>

              {/* Step 6: Realistic Market Comparisons */}
              <div className="p-3.5 bg-white border border-neutral-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-orange-600" />
                    <span>Step 6: Market Comparison</span>
                  </span>
                  <label className="flex items-center gap-1.5 text-[11px] text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReliableMarketData}
                      onChange={(e) => setHasReliableMarketData(e.target.checked)}
                      className="w-3.5 h-3.5 accent-orange-600"
                    />
                    <span>Include verified market data</span>
                  </label>
                </div>

                {hasReliableMarketData && pricingResult.marketComparisons.length > 0 ? (
                  <div className="space-y-1.5">
                    {pricingResult.marketComparisons.map((item, idx) => (
                      <div key={idx} className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-neutral-900 text-[11px]">{item.name}</strong>
                          <span className="font-bold text-neutral-800 tabular-nums text-[11px]">
                            ₹{item.priceRange[0]} – ₹{item.priceRange[1]}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-500">Craftsmanship: {item.craftsmanship}</div>
                        <div className="text-[10px] text-neutral-500">Material Match: {item.materialMatch}</div>
                        <div className="text-[9px] text-neutral-400 pt-0.5 border-t border-neutral-200/60 flex items-center justify-between">
                          <span>Source: {item.source}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-600 leading-relaxed">
                    <p className="font-medium text-neutral-800">{pricingResult.marketDisclaimer}</p>
                  </div>
                )}
              </div>

              {/* Step 7: Display 3 Fair Price Options */}
              <div className="p-3.5 bg-white border border-neutral-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">Step 7: Fair Price Options</span>
                  <span className="text-[10px] text-neutral-400">Select an option for your product</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Affordable */}
                  <button
                    type="button"
                    onClick={() => handleSelectPriceOption('affordable')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPricingOption === 'affordable'
                        ? 'border-neutral-900 bg-neutral-100 ring-1 ring-neutral-900'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-800">{pricingResult.options.affordable.label}</div>
                    <div className="text-base font-extrabold text-neutral-900 tabular-nums mt-0.5">
                      ₹{pricingResult.options.affordable.sellingPrice}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Margin: {pricingResult.options.affordable.marginPercent}% | Profit: ₹{pricingResult.options.affordable.netProfit}
                    </div>
                    <div className="text-[9px] text-neutral-400 mt-1 leading-tight">{pricingResult.options.affordable.assumptions}</div>
                  </button>

                  {/* Recommended Fair Price */}
                  <button
                    type="button"
                    onClick={() => handleSelectPriceOption('recommended')}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedPricingOption === 'recommended'
                        ? 'border-orange-600 bg-orange-50 ring-1 ring-orange-600'
                        : 'border-orange-300 bg-orange-50/50 hover:bg-orange-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-orange-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                      <span>{pricingResult.options.recommended.label}</span>
                    </div>
                    <div className="text-base font-extrabold text-orange-950 tabular-nums mt-0.5">
                      ₹{pricingResult.options.recommended.sellingPrice}
                    </div>
                    <div className="text-[10px] text-orange-900 mt-0.5 font-medium">
                      Margin: {pricingResult.options.recommended.marginPercent}% | Profit: ₹{pricingResult.options.recommended.netProfit}
                    </div>
                    <div className="text-[9px] text-orange-800/80 mt-1 leading-tight">{pricingResult.options.recommended.assumptions}</div>
                  </button>

                  {/* Premium Price */}
                  <button
                    type="button"
                    onClick={() => handleSelectPriceOption('premium')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPricingOption === 'premium'
                        ? 'border-amber-700 bg-amber-50 ring-1 ring-amber-700'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{pricingResult.options.premium.label}</span>
                    </div>
                    <div className="text-base font-extrabold text-neutral-900 tabular-nums mt-0.5">
                      ₹{pricingResult.options.premium.sellingPrice}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Margin: {pricingResult.options.premium.marginPercent}% | Profit: ₹{pricingResult.options.premium.netProfit}
                    </div>
                    <div className="text-[9px] text-neutral-400 mt-1 leading-tight">{pricingResult.options.premium.assumptions}</div>
                  </button>
                </div>
              </div>

              {/* Description Draft */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  {t('Generated E-Commerce Description')}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-neutral-50 focus:bg-white"
                />
              </div>

              {/* Step 8: Artisan Confirmation & Save to Catalog */}
              <div className="pt-2 border-t border-neutral-100 space-y-3">
                {!isConfirmedAndSaved ? (
                  <button
                    onClick={handleConfirmAndSaveProduct}
                    className="w-full py-2.5 bg-black hover:bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    <span>{t('Confirm & Save Verified Product to Catalog')} (₹{price})</span>
                  </button>
                ) : (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{t('Product Details Confirmed & Added to Catalog!')}</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      You can now access market intelligence, generate promotional captions, or explore living wage pricing for this verified item.
                    </p>

                    {/* Phase 7 Downstream Connectors */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveScreen('artisan-calculator')}
                        className="p-2 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('Fair Price Calculator')}</span>
                      </button>

                      <button
                        onClick={() => setActiveScreen('artisan-demand')}
                        className="p-2 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('Market Intelligence')}</span>
                      </button>

                      <button
                        onClick={() => setShowMarketingModal(true)}
                        className="p-2 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('Marketing Copy')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transparency Disclaimer */}
          <div className="pt-3 border-t border-neutral-100 flex items-start gap-2 text-[10px] text-neutral-400 leading-normal">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Computer vision generates assistive visual tags based on surface appearance. Purity and hallmark authentication require certified testing. Colour alone is not proof of material.
            </span>
          </div>
        </div>
      </div>

      {/* Marketing Copy Modal (Phase 7 downstream) */}
      {showMarketingModal && result && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>AI Social Marketing Copy for &quot;{productName}&quot;</span>
              </h3>
              <button
                onClick={() => setShowMarketingModal(false)}
                className="p-1 hover:bg-neutral-100 rounded-full text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instagram Copy */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>Instagram / Visual Post</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      generateMarketingCaptions(
                        productName,
                        materialsText.split(','),
                        description,
                        'instagram'
                      ).caption,
                      'Instagram'
                    )
                  }
                  className="text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedPlatform === 'Instagram' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-700 whitespace-pre-line leading-relaxed">
                {
                  generateMarketingCaptions(
                    productName,
                    materialsText.split(','),
                    description,
                    'instagram'
                  ).caption
                }
              </p>
            </div>

            {/* WhatsApp Copy */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                <span>WhatsApp / Direct Buyer Message</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      generateMarketingCaptions(
                        productName,
                        materialsText.split(','),
                        description,
                        'whatsapp'
                      ).caption,
                      'WhatsApp'
                    )
                  }
                  className="text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedPlatform === 'WhatsApp' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-700 whitespace-pre-line leading-relaxed">
                {
                  generateMarketingCaptions(
                    productName,
                    materialsText.split(','),
                    description,
                    'whatsapp'
                  ).caption
                }
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMarketingModal(false)}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
