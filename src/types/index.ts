export type UserRole = 'artisan' | 'supplier' | 'buyer' | 'delivery' | 'admin';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  location: string;
  region: string;
  avatar: string;
  experienceYears?: number;
  craftSpecialization?: string;
  contactEmail: string;
  phone: string;
  rating: number;
  bio: string;
  verified: boolean;
}

export interface CraftProduct {
  id: string;
  title: string;
  category: 'pottery' | 'textiles' | 'woodcraft' | 'metalware' | 'basketry' | 'jewelry';
  categoryLabel: string;
  artisanId: string;
  artisanName: string;
  location: string;
  image: string;
  model3DType?: 'terracotta_pot' | 'brass_lamp' | 'wood_vase';
  price: number;
  costBreakdown: {
    rawMaterialCost: number;
    labourHours: number;
    labourRatePerHour: number;
    packagingCost: number;
    transportCost: number;
    platformFee: number;
    otherExpenses: number;
    totalCost: number;
    netProfit: number;
    profitMarginPercent: number;
  };
  stock: number;
  salesCount: number;
  demandScore: number; // 0-100
  fairnessIndex: number; // 0-100
  heritageScore: number; // 0-100
  materials: string[];
  technique: string;
  story: string;
  tags: string[];
  riskLevel: 'low' | 'medium' | 'high';
  featured?: boolean;
}

export interface SupplierMaterial {
  id: string;
  supplierId: string;
  supplierName: string;
  materialName: string;
  category: string;
  grade: 'A+ Master Grade' | 'A Commercial' | 'B Standard';
  unitPrice: number;
  unit: string;
  minOrderQuantity: number;
  availableStock: number;
  location: string;
  distanceKm: number;
  deliveryDays: number;
  deliveryCostPerUnit: number;
  verified: boolean;
  matchScore: number;
  matchReasons: string[];
  historicalPrices: { month: string; price: number }[];
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  artisanName: string;
}

export interface PlatformOrder {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerLocation: string;
  buyerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'accepted' | 'production' | 'ready_dispatch' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  trackingId?: string;
  shippingAddress: string;
  paymentStatus: 'paid' | 'pending' | 'escrow_held';
}

export interface MarketGapItem {
  id: string;
  category: string;
  productConcept: string;
  demandIndex: number;
  supplyLevel: 'Critically Low' | 'Moderate' | 'Saturated';
  underservedRegions: string[];
  recommendedPriceRange: [number, number];
  potentialMarginPercent: number;
  opportunityRationale: string;
  seasonality: string;
}

export interface ProductRecommendation {
  id: string;
  productName: string;
  craftCategory: string;
  targetMarket: string;
  confidenceScore: number;
  estimatedProductionCost: number;
  suggestedSellingPrice: number;
  expectedMarginPercent: number;
  requiredMaterials: string[];
  requiredSkills: string[];
  skillMatchPercent: number;
  demandEvidence: string;
  productionDaysEstimate: number;
  potentialRisks: string[];
  whyRecommended: string;
}

export interface SmartBundle {
  id: string;
  bundleName: string;
  tagline: string;
  productIds: string[];
  products: CraftProduct[];
  individualTotal: number;
  bundlePrice: number;
  discountPercent: number;
  compatibilityReason: string;
}

export interface DeliveryAssignment {
  id: string;
  orderId: string;
  orderNumber: string;
  artisanName: string;
  pickupLocation: string;
  pickupPhone: string;
  buyerName: string;
  deliveryDestination: string;
  buyerPhone: string;
  packageType: string;
  weightKg: number;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';
  currentLocation: string;
  estimatedArrival: string;
  proofUploaded: boolean;
}

export interface CustomerPersona {
  id: string;
  title: string;
  segmentName: string;
  budgetRange: string;
  coreInterests: string[];
  purchaseMotivation: string;
  recommendedChannel: string;
  marketingHook: string;
}

export interface AIFeedbackRecord {
  id: string;
  recommendationTitle: string;
  rating: 'helpful' | 'not_helpful';
  accepted: boolean;
  actualSalesOutcome?: string;
  artisanNotes: string;
  timestamp: string;
}
