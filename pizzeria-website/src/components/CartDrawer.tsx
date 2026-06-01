import React, { useState } from 'react';
import { ShoppingBag, Trash2, MapPin, Phone, User, Clock, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { TOPPING_OPTIONS } from '../data';

interface CartDrawerProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (name: string, address: string, phone: string) => void;
}

export default function CartDrawer({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [validatedError, setValidatedError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
  const deliveryFee = subtotal > 30 ? 0.00 : 3.99;
  const taxes = subtotal * 0.082; // 8.2% sales tax
  const grandTotal = subtotal + deliveryFee + taxes;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address || !phone) {
      setValidatedError('Please fill out all fields so we can deliver your fresh pizza.');
      return;
    }
    setValidatedError('');
    onCheckout(customerName, address, phone);
  };

  const getToppingsSummary = (toppingIds: string[]) => {
    return toppingIds
      .map(id => TOPPING_OPTIONS.find(t => t.id === id)?.name || id)
      .join(', ');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white/5 rounded-3xl border border-white/10 p-8 text-center" id="cart-drawer">
        <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/30">
          <ShoppingBag className="size-6 text-[#FF3D00]" />
        </div>
        <h4 className="font-sans font-black uppercase text-lg text-white">Your Cart is Empty</h4>
        <p className="text-white/50 text-xs font-light mt-1 max-w-xs mx-auto">
          Explore the menu above or make one from scratch in the builder to complete your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl" id="cart-drawer">
      <div className="border-b border-white/10 pb-4 mb-5 flex items-center justify-between">
        <h4 className="font-sans text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          <ShoppingBag className="text-[#FF3D00] size-6" />
          <span>Selected Order</span>
        </h4>
        <span className="text-[10px] font-mono font-bold text-white bg-[#FF3D00] rounded-full px-3 py-1 uppercase tracking-wider">
          {items.reduce((sum, i) => sum + i.quantity, 0)} Pizzas
        </span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4 max-h-[360px] overflow-y-auto mb-6 pr-2">
        {items.map((item) => {
          const isCustom = !item.presetId;
          const pizzaTitle = item.customName || (isCustom ? 'Custom Artisanal Pizza' : 'Classic Presets');

          return (
            <div 
              key={item.id} 
              className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/10 bg-black/40 hover:border-white/20 transition-all duration-250"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h5 className="font-bold text-sm text-white truncate uppercase font-sans tracking-wide">
                    {pizzaTitle}
                  </h5>
                  <span className="font-mono text-[9px] text-[#FF3D00] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md uppercase font-bold">
                    {item.config.size}
                  </span>
                </div>

                <div className="text-[11px] text-white/50 leading-relaxed font-light">
                  <span className="block font-sans text-white/35">Crust: {item.config.crust}</span>
                  <span className="block font-sans text-white/35">Sauce: {item.config.sauce}</span>
                  {item.config.toppings.length > 0 && (
                    <span className="block truncate">Toppings: {getToppingsSummary(item.config.toppings)}</span>
                  )}
                </div>

                <div className="font-mono text-sm font-extrabold text-[#FF3D00] pt-1">
                  ${(item.pricePerUnit * item.quantity).toFixed(2)}
                  <span className="text-[10px] text-white/30 font-light font-sans ml-1">(${item.pricePerUnit.toFixed(2)} ea)</span>
                </div>
              </div>

              {/* Action controls (quantities & removal) */}
              <div className="flex flex-col items-end gap-3 self-center">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-red-500 hover:bg-white/5 transition-colors"
                  title="Remove pizza"
                >
                  <Trash2 className="size-4" />
                </button>

                <div className="flex items-center gap-2 border border-white/10 bg-black rounded-lg p-1 text-xs">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 text-white/50 hover:text-white_90 active:bg-white/5 rounded"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold px-1.5 min-w-4 text-center text-white">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 text-white/50 hover:text-white_90 active:bg-white/5 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bill calculations block */}
      <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
        <div className="flex justify-between text-xs text-white/50">
          <span>Cart Subtotal</span>
          <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-white/50">
          <span>Standard Delivery Fee</span>
          <span className="font-mono text-white">
            {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE over $30</span> : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-xs text-white/50">
          <span>State Restaurant Tax (8.2%)</span>
          <span className="font-mono text-white">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-dashed border-white/10">
          <span>Order Total (Est.)</span>
          <span className="font-mono text-[#FF3D00] text-lg font-black">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Validation alert */}
      {validatedError && (
        <div className="p-3 bg-red-950/40 text-red-400 rounded-xl text-xs flex items-center gap-2 mb-4 border border-red-900/30 font-light">
          <Trash2 className="size-4 text-red-400 shrink-0" />
          <span>{validatedError}</span>
        </div>
      )}

      {/* Checkout Input Form */}
      <form onSubmit={handleCheckoutSubmit} className="space-y-3 border-t border-white/10 pt-5">
        <h5 className="font-sans font-black text-xs text-[#FF3D00] uppercase tracking-[0.2em] mb-2 flex items-center gap-1">
          <Clock className="size-3 text-[#FF3D00]" />
          <span>Pizza Delivery Details</span>
        </h5>
        
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
            <User className="size-4" />
          </span>
          <input
            type="text"
            placeholder="Full Name (for delivery greeting)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-xs bg-black text-white focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00] outline-none"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
            <MapPin className="size-4" />
          </span>
          <input
            type="text"
            placeholder="Delivery Address (street, house, floor)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-xs bg-black text-white focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00] outline-none"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
            <Phone className="size-4" />
          </span>
          <input
            type="text"
            placeholder="Phone Number (Express updates)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-xs bg-black text-white focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00] outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full bg-[#FF3D00] text-white hover:bg-white hover:text-black font-extrabold uppercase text-xs tracking-widest transition-all duration-200 mt-2 block shadow-lg shadow-[#FF3D00]/10"
        >
          Confirm Pizza Delivery Order
        </button>
      </form>
    </div>
  );
}
