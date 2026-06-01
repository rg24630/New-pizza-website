import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Award, 
  MessagesSquare, 
  Star, 
  Heart, 
  GitPullRequest, 
  Clock, 
  Plus, 
  ChevronRight, 
  ChefHat 
} from 'lucide-react';

// Components
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import PizzaBuilder from './components/PizzaBuilder';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';

// Data & Types
import { CartItem, PizzaPreset, CustomPizzaConfig, Order } from './types';
import { PIZZA_PRESETS } from './data';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(undefined);
  
  // Testimonials state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Joseph M.',
      title: 'Pizza Fanatic, Boston',
      comment: 'The golden brown stuffed crust is perfectly baked. The garlic butter dipping sauce was incredible and the pepperoni had the perfect crisp!',
      rating: 5,
      date: '2 hours ago'
    },
    {
      id: 2,
      name: 'Alexander K.',
      title: 'Weekly Regular Customer',
      comment: 'I ordered the customized Meat Lover’s Classic with extra cheese. The stuffed crust and savory flavor profile were outstanding. Best pizza delivery experience ever!',
      rating: 5,
      date: '1 day ago'
    },
    {
      id: 3,
      name: 'Sophia V.',
      title: 'Local Food Critic',
      comment: 'Absolute perfection. The Supreme Feast was packed with fresh mushrooms and green peppers that were cooked beautifully. Incredible online pizza experience.',
      rating: 5,
      date: '3 hours ago'
    }
  ]);

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add standard preset to cart
  const handleAddPresetToCart = (preset: PizzaPreset) => {
    const itemConfig: CustomPizzaConfig = {
      size: 'Medium',
      crust: 'Classic Hand-Tossed',
      sauce: preset.id === 'cheese_lovers' ? 'Creamy Garlic Parmesan' : 'Classic Marinara',
      toppings: preset.toppings
    };

    setCart(prev => {
      // Check if duplicate config already exists
      const duplicateIdx = prev.findIndex(item => 
        item.presetId === preset.id && 
        item.config.size === 'Medium' && 
        item.config.crust === 'Classic Hand-Tossed'
      );

      if (duplicateIdx > -1) {
        const copy = [...prev];
        copy[duplicateIdx].quantity += 1;
        return copy;
      }

      const newItem: CartItem = {
        id: `preset-${preset.id}-${Date.now()}`,
        presetId: preset.id,
        customName: preset.name,
        config: itemConfig,
        quantity: 1,
        pricePerUnit: preset.basePrice
      };
      
      return [...prev, newItem];
    });

    // Auto scroll to checkout basket to highlight
    setTimeout(() => scrollToSection('cart-drawer'), 150);
  };

  // Switch to customizer sheet pre-filled with preset values
  const handleCustomizePreset = (preset: PizzaPreset) => {
    // Focus customizer and scroll
    scrollToSection('pizza-builder');
  };

  // Add customized creation to cart
  const handleAddCustomToCart = (config: CustomPizzaConfig, sizePrice: number, toppingsPrice: number) => {
    const pricePerUnit = sizePrice + toppingsPrice;
    
    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      customName: `Custom ${config.size} Pizza`,
      config,
      quantity: 1,
      pricePerUnit
    };

    setCart(prev => [...prev, newItem]);
    setTimeout(() => scrollToSection('cart-drawer'), 150);
  };

  // Update item quantities in basket
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove individual items from cart
  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  // Trigger simulated order submission
  const handleCheckout = (name: string, address: string, phone: string) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
    const taxes = subtotal * 0.082;
    const delivery = subtotal > 30 ? 0 : 3.99;
    const finalTotal = subtotal + taxes + delivery;

    const newOrder: Order = {
      id: `NPL-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: name,
      address,
      phone,
      items: cart,
      total: finalTotal,
      status: 'received',
      timestamp: new Date().toLocaleTimeString(),
      estimatedRemainingMinutes: 1
    };

    setActiveOrder(newOrder);
    setCart([]); // Clear cart post order submission

    // Scroll to order tracking section
    setTimeout(() => scrollToSection('checkout-hub'), 200);
  };

  // Add customer review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewContent) return;

    const createdReview = {
      id: reviews.length + 1,
      name: newReviewName,
      title: 'Honorable Patron',
      comment: newReviewContent,
      rating: newReviewRating,
      date: 'Just now'
    };

    setReviews(prev => [createdReview, ...prev]);
    setNewReviewName('');
    setNewReviewContent('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-white selection:bg-[#FF3D00]/25">
      
      {/* Editorial Navigation Header */}
      <header className="sticky top-0 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Logo brand and metadata info */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="h-10 w-10 rounded-full bg-[#FF3D00] flex items-center justify-center shadow-lg shadow-[#FF3D00]/20">
              <span className="text-lg">🍕</span>
            </div>
            <div>
              <span className="font-sans font-black text-lg tracking-tighter uppercase text-white leading-none block">
                PIZZA <span className="text-[#FF3D00]">HUT STYLE</span>
              </span>
              <span className="block text-[9px] font-mono tracking-[0.3em] uppercase text-white/55 font-bold mt-0.5">
                CLASSIC COMFORT FOOD
              </span>
            </div>
          </div>

          {/* Nav links block */}
          <nav className="hidden md:flex items-center gap-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#FF3D00] transition-colors">
              Our Story
            </button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#FF3D00] transition-colors">
              Signature Menu
            </button>
            <button onClick={() => scrollToSection('pizza-builder')} className="hover:text-[#FF3D00] transition-colors">
              Pizza Builder
            </button>
            <button onClick={() => scrollToSection('reviews-section')} className="hover:text-[#FF3D00] transition-colors">
              Customer Reviews
            </button>
          </nav>

          {/* Quick Stats Shopping Cart Status Icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection(activeOrder ? 'checkout-hub' : 'cart-drawer')}
              className="relative px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
            >
              <span className="animate-pulse">🔥</span>
              <span>{activeOrder ? 'Tracking Order' : `${cart.reduce((sum, i) => sum + i.quantity, 0)} items in Cart`}</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3D00] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Header Section */}
      <HeroSection 
        onScrollToMenu={() => scrollToSection('menu')}
        onScrollToBuilder={() => scrollToSection('pizza-builder')}
      />

      {/* Middle Brand Block: Craftsmanship Pitch */}
      <section className="bg-black py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden group hover:border-[#FF3D00] transition-colors">
              <span className="block font-mono text-[44px] font-black tracking-tight text-white/15 leading-none mb-2">01 //</span>
              <h4 className="font-sans font-black uppercase text-lg tracking-tight text-white">Golden Hand-Tossed Crust</h4>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Our classic dough is baked to golden brown perfection. Crispy on the outside, light and airy on the inside, cooked exactly how a signature pie should be.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden group hover:border-[#FF3D00] transition-colors">
              <span className="block font-mono text-[44px] font-black tracking-tight text-[#FF3D00] leading-none mb-2">02 //</span>
              <h4 className="font-sans font-black uppercase text-lg tracking-tight text-white">Vine-Ripened Tomatoes</h4>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Our sweet and robust marinara sauce is made from vine-ripened tomatoes blended with a secret mix of culinary herbs and traditional spices.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden group hover:border-[#FF3D00] transition-colors">
              <span className="block font-mono text-[44px] font-black tracking-tight text-white/15 leading-none mb-2">03 //</span>
              <h4 className="font-sans font-black uppercase text-lg tracking-tight text-white">High-Temp Ovens</h4>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Baked in our highly calibrated deck ovens to lock in the absolute freshness of meat toppings and melt cheese to a perfect bubbling consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Columns Segment (Menu, Builder, Checkout or Tracker) */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-20 flex-1">
        
        {/* Row 1: Traditional Presets Menu */}
        <MenuSection 
          onAddPresetToCart={handleAddPresetToCart}
          onCustomizePreset={handleCustomizePreset}
        />

        {/* Row 2: custom Builder workshop */}
        <PizzaBuilder onAddToCart={handleAddCustomToCart} />

        {/* Row 3: Cart / Checkout area vs Interactive Order Tracker */}
        <section className="bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10" id="checkout-hub">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Descriptive side panel */}
            <div className="lg:col-span-4 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF3D00]/10 text-[#FF3D00] text-[11px] font-bold uppercase tracking-wider border border-[#FF3D00]/25">
                <ChefHat className="size-3.5" />
                <span>Oven Delivery Dispatcher</span>
              </div>
              <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-white">
                Pizza Checkout Station
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                As soon as your order is confirmed, we prepare your dough and toppings from scratch! Freshly baked and delivered hot. Track your delivery speed using our live line.
              </p>

              {/* Little visual graphic */}
              <div className="border border-white/10 rounded-2xl p-5 bg-black space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-[#FF3D00] text-[#FF3D00]" />
                  ))}
                </div>
                <blockquote className="text-[12px] italic text-white/70 font-light leading-relaxed">
                  "Fastest delivery in town. Pizza arrived piping hot, stuffed crust was amazing!"
                </blockquote>
                <span className="block text-[10px] uppercase font-bold tracking-[0.1em] text-[#FF3D00]">
                  — Food Critic Ross
                </span>
              </div>
            </div>

            {/* Interactive display node */}
            <div className="lg:col-span-8">
              {activeOrder ? (
                <OrderTracker 
                  order={activeOrder} 
                  onResetOrder={() => setActiveOrder(undefined)} 
                />
              ) : (
                <CartDrawer
                  items={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              )}
            </div>

          </div>
        </section>

        {/* Row 4: Client Feedback testaments */}
        <section className="py-12 border-t border-white/10" id="reviews-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Static side heading */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-[#FF3D00] uppercase block">
                Customer Testimonies
              </span>
              <h3 className="font-sans text-4xl font-black uppercase tracking-tighter text-white">
                The Praise of Pizza Lovers
              </h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                What critics, casual patrons, and pizza software developers say about their fresh-baked orders.
              </p>

              {/* Form to append client review */}
              <form onSubmit={handleAddReview} className="bg-white/5 rounded-2xl border border-white/10 p-5 mt-6 space-y-4">
                <span className="text-[11px] font-bold font-mono text-[#FF3D00] uppercase tracking-[0.2em] block">
                  Write Your Review
                </span>
                
                <input
                  type="text"
                  placeholder="Your Name (e.g. Maria G.)"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-xs bg-black text-white focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00] outline-none"
                />

                <textarea
                  placeholder="Your pizza review..."
                  required
                  rows={2}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 text-xs bg-black text-white focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00] outline-none"
                />

                {/* Star rating picker */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-white/50">Score:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-0.5 focus:outline-none"
                    >
                      <Star className={`size-4.5 ${star <= newReviewRating ? 'fill-[#FF3D00] text-[#FF3D00]' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>

                {reviewSuccess && (
                  <span className="text-[11px] text-emerald-400 block bg-emerald-950/40 p-2.5 rounded-lg text-center border border-emerald-900/30">
                    Thank you! Review added live.
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black hover:bg-[#FF3D00] hover:text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
                >
                  Submit Patron Review
                </button>
              </form>
            </div>

            {/* Reviews display grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-4 hover:border-[#FF3D00] transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-bold text-sm text-white">{rev.name}</h5>
                      <span className="text-[10px] text-white/45 font-mono italic block">{rev.title}</span>
                    </div>
                    <div className="flex bg-[#FF3D00]/10 border border-[#FF3D00]/25 py-0.5 px-2.5 rounded-full items-center gap-1">
                      <Star className="size-3 fill-current text-[#FF3D00]" />
                      <span className="font-mono text-[10px] font-black text-white">{rev.rating}.0</span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-xs leading-relaxed font-light italic">
                    "{rev.comment}"
                  </p>

                  <div className="text-[10px] text-white/45 font-mono text-right flex items-center justify-end gap-1">
                    <Clock className="size-3" />
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="bg-black text-white/50 py-16 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between border-b border-white/10 pb-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-full bg-[#FF3D00] flex items-center justify-center text-xs">
                🍕
              </div>
              <span className="font-sans font-black text-lg text-white uppercase tracking-tighter">
                PIZZA <span className="text-[#FF3D00]">HUT STYLE</span>
              </span>
            </div>
            <p className="text-white/40 text-xs max-w-sm font-light leading-relaxed">
              Award-winning golden crust experience. Perfected with fresh ingredients, built with high-velocity React, and baked with absolute passion.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-xs text-white/35">
            <span className="font-mono text-[11px] text-[#FF3D00] flex items-center gap-1.5 uppercase font-bold tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#FF3D00] animate-pulse"></span>
              <span>Kitchen Oven Status: Firing & Baking</span>
            </span>
            <span className="font-mono text-[10px]">
              High-Temp Pizza Ovens // 450°F
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Pizza Hut Style Classic. Licensed under Apache-2.0.</p>
          <div className="flex gap-4">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
              Our Story
            </button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-white transition-colors">
              Classic Menu
            </button>
            <button onClick={() => scrollToSection('pizza-builder')} className="hover:text-white transition-colors">
              Pizza Builder
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
