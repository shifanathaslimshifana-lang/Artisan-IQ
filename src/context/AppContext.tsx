import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translate } from '../utils/translations';
import {
  UserRole,
  UserProfile,
  LanguageCode,
  CraftProduct,
  SupplierMaterial,
  PlatformOrder,
  DeliveryAssignment,
  OrderItem,
  AIFeedbackRecord,
} from '../types';
import {
  DEMO_USERS,
  INITIAL_PRODUCTS,
  INITIAL_SUPPLIERS,
  INITIAL_ORDERS,
  INITIAL_DELIVERIES,
} from '../data/demoData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentRole: UserRole;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  activeScreen: string;
  setActiveScreen: (screenId: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  products: CraftProduct[];
  addProduct: (product: CraftProduct) => void;
  updateProduct: (product: CraftProduct) => void;
  suppliers: SupplierMaterial[];
  orders: PlatformOrder[];
  updateOrderStatus: (orderId: string, newStatus: PlatformOrder['status']) => void;
  deliveries: DeliveryAssignment[];
  updateDeliveryStatus: (deliveryId: string, status: DeliveryAssignment['status'], location?: string) => void;
  cart: OrderItem[];
  addToCart: (product: CraftProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkoutCart: (shippingDetails: { buyerName: string; address: string; phone: string }) => PlatformOrder;
  aiFeedbacks: AIFeedbackRecord[];
  addAIFeedback: (feedback: Omit<AIFeedbackRecord, 'id' | 'timestamp'>) => void;
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  isDemoLoginOpen: boolean;
  setIsDemoLoginOpen: (open: boolean) => void;
  selected3DProduct: CraftProduct | null;
  setSelected3DProduct: (product: CraftProduct | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ROLE_DEFAULT_SCREENS: Record<UserRole, string> = {
  artisan: 'artisan-overview',
  supplier: 'supplier-dashboard',
  buyer: 'buyer-marketplace',
  delivery: 'delivery-dashboard',
  admin: 'admin-overview',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Session storage persistence for current user role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = sessionStorage.getItem('artisan_ai_role');
      if (saved && ['artisan', 'supplier', 'buyer', 'delivery', 'admin'].includes(saved)) {
        return saved as UserRole;
      }
    } catch {
      // ignore
    }
    return 'artisan';
  });

  const [activeScreen, setActiveScreenState] = useState<string>(() => {
    try {
      const savedScreen = sessionStorage.getItem('artisan_ai_screen');
      if (savedScreen) return savedScreen;
    } catch {
      // ignore
    }
    return ROLE_DEFAULT_SCREENS['artisan'];
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const setActiveScreen = (screenId: string) => {
    setActiveScreenState(screenId);
    setIsMobileMenuOpen(false);
  };

  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('artisan_ai_lang') || sessionStorage.getItem('artisan_ai_lang');
      if (saved && ['en', 'ta', 'hi', 'te', 'kn', 'ml'].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  // Sync document lang on change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const [products, setProducts] = useState<CraftProduct[]>(INITIAL_PRODUCTS);
  const [suppliers] = useState<SupplierMaterial[]>(INITIAL_SUPPLIERS);
  const [orders, setOrders] = useState<PlatformOrder[]>(INITIAL_ORDERS);
  const [deliveries, setDeliveries] = useState<DeliveryAssignment[]>(INITIAL_DELIVERIES);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [aiFeedbacks, setAiFeedbacks] = useState<AIFeedbackRecord[]>([
    {
      id: 'fb-01',
      recommendationTitle: 'Unglazed Terracotta Biryani Handi',
      rating: 'helpful',
      accepted: true,
      actualSalesOutcome: 'Produced batch of 20; 16 sold in first week with 32% margin.',
      artisanNotes: 'Steam lock rim was popular with customers.',
      timestamp: '2026-10-12 14:20',
    },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDemoLoginOpen, setIsDemoLoginOpen] = useState(false);
  const [selected3DProduct, setSelected3DProduct] = useState<CraftProduct | null>(INITIAL_PRODUCTS[0]);

  // Sync role to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('artisan_ai_role', currentRole);
    } catch {
      // ignore
    }
  }, [currentRole]);

  // Sync screen to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('artisan_ai_screen', activeScreen);
    } catch {
      // ignore
    }
  }, [activeScreen]);

  const t = useCallback(
    (key: string): string => {
      return translate(key, language);
    },
    [language]
  );

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem('artisan_ai_lang', lang);
      localStorage.setItem('artisan_ai_lang', lang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // ignore
    }
    const langNames: Record<LanguageCode, string> = {
      en: 'English',
      ta: 'தமிழ்',
      hi: 'हिन्दी',
      te: 'తెలుగు',
      kn: 'ಕನ್ನಡ',
      ml: 'മലയാളം',
    };
    showToast('info', 'Language Switched', `Interface language updated to ${langNames[lang] || lang.toUpperCase()}`);
  };

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const targetScreen = ROLE_DEFAULT_SCREENS[role] || 'artisan-overview';
    setActiveScreen(targetScreen);
    setIsDemoLoginOpen(false);
    showToast(
      'success',
      `Switched to ${DEMO_USERS[role]?.name || role}`,
      `Viewing workspace as ${role.toUpperCase()}: ${DEMO_USERS[role]?.title}`
    );
  };

  const addProduct = (product: CraftProduct) => {
    setProducts((prev) => [product, ...prev]);
    showToast('success', 'Product Published', `"${product.title}" has been published with fair price ₹${product.price}`);
  };

  const updateProduct = (updated: CraftProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('info', 'Product Updated', `Changes to "${updated.title}" saved.`);
  };

  const updateOrderStatus = (orderId: string, newStatus: PlatformOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    // If shipping, create/update delivery assignment
    if (newStatus === 'shipped') {
      setDeliveries((prev) =>
        prev.map((d) => (d.orderId === orderId ? { ...d, status: 'in_transit' } : d))
      );
    }
    showToast('info', 'Order Status Updated', `Order #${orderId} marked as ${newStatus.replace('_', ' ')}.`);
  };

  const updateDeliveryStatus = (
    deliveryId: string,
    status: DeliveryAssignment['status'],
    location?: string
  ) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === deliveryId
          ? {
              ...d,
              status,
              ...(location ? { currentLocation: location } : {}),
              proofUploaded: status === 'delivered' ? true : d.proofUploaded,
            }
          : d
      )
    );
    showToast('success', 'Delivery Update Broadcasted', `Delivery assignment updated to ${status}.`);
  };

  const addToCart = (product: CraftProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: qty,
          image: product.image,
          artisanName: product.artisanName,
        },
      ];
    });
    showToast('success', 'Added to Cart', `${product.title} added to your basket.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const checkoutCart = (shippingDetails: { buyerName: string; address: string; phone: string }) => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNumber = `ART-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PlatformOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      buyerName: shippingDetails.buyerName || currentUser.name,
      buyerLocation: shippingDetails.address || 'Bengaluru, Karnataka',
      buyerEmail: currentUser.contactEmail,
      items: [...cart],
      totalAmount,
      status: 'new',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
      shippingAddress: shippingDetails.address,
      paymentStatus: 'paid',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('success', 'Order Confirmed', `Order #${orderNumber} placed directly with artisan!`);
    return newOrder;
  };

  const addAIFeedback = (feedback: Omit<AIFeedbackRecord, 'id' | 'timestamp'>) => {
    const newRecord: AIFeedbackRecord = {
      ...feedback,
      id: `fb-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAiFeedbacks((prev) => [newRecord, ...prev]);
    showToast('success', 'Feedback Stored', 'Your practical experience will refine future cluster recommendations.');
  };

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.artisan;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        activeScreen,
        setActiveScreen,
        language,
        setLanguage,
        t,
        products,
        addProduct,
        updateProduct,
        suppliers,
        orders,
        updateOrderStatus,
        deliveries,
        updateDeliveryStatus,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkoutCart,
        aiFeedbacks,
        addAIFeedback,
        toasts,
        showToast,
        removeToast,
        isDemoLoginOpen,
        setIsDemoLoginOpen,
        selected3DProduct,
        setSelected3DProduct,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
