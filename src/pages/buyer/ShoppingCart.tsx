import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, checkoutCart, setActiveScreen, currentUser } = useApp();

  const [buyerName, setBuyerName] = useState(currentUser.name || 'Aarav Sharma');
  const [address, setAddress] = useState('Sustainable Living Studio, 100 Feet Rd, Indiranagar, Bengaluru 560038');
  const [phone, setPhone] = useState('+91 98860 41122');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fragileDelivery = subtotal > 0 ? 120 : 0;
  const total = subtotal + fragileDelivery;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    setTimeout(() => {
      checkoutCart({ buyerName, address, phone });
      setIsCheckingOut(false);
      setActiveScreen('buyer-orders');
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900">Your Craft Basket is Empty</h2>
        <p className="text-xs text-neutral-500">
          Discover traditional Indian pottery, cast brassware, and handwoven textiles direct from master artisans.
        </p>
        <button
          onClick={() => setActiveScreen('buyer-marketplace')}
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
        >
          Explore Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4 text-emerald-700" /> Direct Artisan Order
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mt-1">
          Review Your Craft Order & Secure Checkout
        </h1>
        <p className="text-xs text-neutral-500">
          Zero middleman deductions. Your payment is held in escrow until the fragile craft parcel is delivered break-free.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cart Items (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900">
              Basket Items ({cart.length})
            </h3>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Empty Basket
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {cart.map((item) => (
              <div key={item.productId} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">{item.title}</h4>
                    <span className="text-[11px] text-neutral-500 block">Maker: {item.artisanName}</span>
                    <span className="text-xs font-bold text-indigo-900 tabular-nums">
                      ₹{item.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                  <div className="flex items-center gap-1 border border-neutral-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-neutral-900 tabular-nums w-16 text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Delivery & Escrow Checkout
          </h3>

          <form onSubmit={handleCheckout} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full text-xs p-2 border border-neutral-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Delivery Address & PIN Code
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2 border border-neutral-300 rounded-lg leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2 border border-neutral-300 rounded-lg"
                required
              />
            </div>

            {/* Price breakdown */}
            <div className="p-3 bg-neutral-50 rounded-xl space-y-2 text-xs border border-neutral-100 pt-3">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal:</span>
                <span className="font-bold tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Padded Fragile Courier:</span>
                <span className="font-bold tabular-nums">₹{fragileDelivery}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="tabular-nums text-black font-extrabold text-base">₹{total}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Escrow Protected: Artisan paid upon verified delivery.</span>
            </div>

            <button
              type="submit"
              disabled={isCheckingOut}
              className="w-full py-2.5 bg-black hover:bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>{isCheckingOut ? 'Confirming Order...' : `Place Direct Order (₹${total})`}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
