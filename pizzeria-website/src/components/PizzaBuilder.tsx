import React, { useState } from 'react';
import { Plus, Minus, Flame, Sparkles, Check } from 'lucide-react';
import { TOPPING_OPTIONS } from '../data';
import { CustomPizzaConfig, ToppingOption, PizzaSize, CrustOption } from '../types';

interface PizzaBuilderProps {
  onAddToCart: (customPizza: CustomPizzaConfig, sizePrice: number, basePrice: number) => void;
}

export default function PizzaBuilder({ onAddToCart }: PizzaBuilderProps) {
  const [size, setSize] = useState<PizzaSize>('Medium');
  const [crust, setCrust] = useState<CrustOption>('Classic Hand-Tossed');
  const [sauce, setSauce] = useState<'Classic Marinara' | 'Creamy Garlic Parmesan' | 'Delectable Basil Pesto'>('Classic Marinara');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['mozzarella', 'classic_pepperoni']);
  const [isSuccessFeedback, setIsSuccessFeedback] = useState(false);

  // Dynamic price calculation
  const getBasePrice = () => {
    switch (size) {
      case 'Personal': return 9.50;
      case 'Medium': return 12.50;
      case 'Large': return 15.50;
    }
  };

  const getCrustPrice = () => {
    switch (crust) {
      case 'Original Stuffed Crust': return 3.00;
      default: return 0.00;
    }
  };

  const activeToppingObjects = TOPPING_OPTIONS.filter(t => selectedToppings.includes(t.id));
  const toppingsPrice = activeToppingObjects.reduce((acc, t) => acc + t.price, 0);
  const totalPrice = getBasePrice() + getCrustPrice() + toppingsPrice;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToOven = () => {
    const config: CustomPizzaConfig = {
      size,
      crust,
      sauce,
      toppings: selectedToppings
    };
    onAddToCart(config, getBasePrice() + getCrustPrice(), toppingsPrice);
    
    // Success feedback trigger
    setIsSuccessFeedback(true);
    setTimeout(() => setIsSuccessFeedback(false), 2000);
  };

  // Get sauce visual representations
  const getSauceColor = () => {
    switch (sauce) {
      case 'Classic Marinara': return 'bg-brand-tomato';
      case 'Creamy Garlic Parmesan': return 'bg-stone-100 border-2 border-stone-200/40';
      case 'Delectable Basil Pesto': return 'bg-emerald-700';
    }
  };

  // Groups of toppings to categorize
  const categories = [
    { title: 'Cheeses', key: 'cheeses' },
    { title: 'Meats & Proteins', key: 'proteins' },
    { title: 'Veggies & Herbs', key: 'greens' },
    { title: 'Premium Finishes', key: 'finishes' }
  ];

  return (
    <div className="bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl" id="pizza-builder">
      <div className="border-b border-white/10 pb-5 mb-6">
        <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-[#FF3D00] uppercase block mb-1">
          Pizza Workshop
        </span>
        <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-white">
          Custom Pizza Builder
        </h3>
        <p className="text-white/60 text-sm font-light mt-1">
          Craft your own custom pizza. Select your crust type, premier sauces, and freshly prepared toppings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Half: Live Interactive Canvas Area */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-black/40 p-6 rounded-2xl border border-white/10 sticky top-24">
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-4">
            Live Oven-fresh Preview
          </span>

          {/* Sourdough disc container */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-orange-100 border-[12px] border-[#dfbe8d] shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01]">
            
            {/* Golden crust highlights */}
            <div className="absolute top-[10%] left-[25%] size-4 rounded-full bg-stone-900/40 blur-[1px]"></div>
            <div className="absolute top-[45%] right-[10%] size-3 rounded-full bg-stone-900/30 blur-[1px]"></div>
            <div className="absolute bottom-[15%] left-[40%] size-4 rounded-full bg-stone-900/40 blur-[1px]"></div>
            <div className="absolute top-[75%] left-[12%] size-3 rounded-full bg-stone-900/35 blur-[1px]"></div>
            <div className="absolute bottom-[40%] left-[80%] size-2.5 rounded-full bg-stone-900/30"></div>

            {/* Sauce Base Outer layer */}
            <div className={`w-[85%] h-[85%] rounded-full transition-all duration-300 flex items-center justify-center shadow-inner ${getSauceColor()}`}>
              
              {/* Toppings Container overlay */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {/* Simulated pizza cheese sprinkles */}
                <div className="absolute inset-4 rounded-full border border-yellow-250/20 opacity-40"></div>

                {/* Render toppings with specific placement coordinates depending on indexes */}
                {activeToppingObjects.map((topping, idx) => {
                  // Standard ring placements for scatter
                  const rawPlacements = [
                    { t: '15%', l: '35%' }, { t: '30%', l: '60%' }, { t: '60%', l: '20%' },
                    { t: '50%', l: '70%' }, { t: '25%', l: '20%' }, { t: '70%', l: '50%' },
                    { t: '40%', l: '40%' }, { t: '15%', l: '55%' }, { t: '55%', l: '35%' },
                    { t: '80%', l: '30%' }, { t: '30%', l: '80%' }
                  ];
                  const placement = rawPlacements[idx % rawPlacements.length];

                  return (
                    <div 
                      key={topping.id}
                      style={{ top: placement.t, left: placement.l }}
                      className="absolute p-1 bg-white/95 rounded-full shadow-md flex items-center justify-center text-xs w-7 h-7 transform -translate-x-1/2 -translate-y-1/2 cursor-default select-none group"
                    >
                      <span className="text-sm">{topping.emoji}</span>
                      {/* Floating mini tool tip on visual item */}
                      <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-stone-900 text-stone-100 text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap mb-1 z-30">
                        {topping.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pizza Configuration info indicator */}
          <div className="mt-6 w-full text-center space-y-1">
            <div className="flex justify-center items-center gap-1.5 font-sans font-black text-lg text-white uppercase tracking-wider">
              <span>{size}</span>
              <span className="text-white/20">|</span>
              <span>{crust.split(' ')[0]}</span>
            </div>
            <p className="text-white/40 text-xs font-mono">
              Sauce: {sauce}
            </p>
          </div>
        </div>

        {/* Right Half: Control Panels */}
        <div className="lg:col-span-7 space-y-6">
          {/* Size Choice */}
          <div>
            <h4 className="text-[11px] font-bold font-mono tracking-[0.2em] text-[#FF3D00] uppercase mb-2.5">
              1. Base Size Preference
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {(['Personal', 'Medium', 'Large'] as PizzaSize[]).map((sz) => {
                const price = sz === 'Personal' ? '$9.55' : sz === 'Medium' ? '$12.55' : '$15.55';
                const isSelected = size === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`p-3.5 rounded-xl border text-center transition-all duration-150 outline-none ${
                      isSelected 
                        ? 'border-[#FF3D00] bg-[#FF3D00]/10 text-white font-black' 
                        : 'border-white/10 text-white/60 hover:border-white/25 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-wider font-bold">{sz}</span>
                    <span className="text-[10px] text-white/40 font-mono block mt-1">{price} base</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crust Selection */}
          <div>
            <h4 className="text-[11px] font-bold font-mono tracking-[0.2em] text-white/50 uppercase mb-2.5">
              2. Pizza Crust Style
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Classic Hand-Tossed', 'Thin \'N Crispy', 'Original Stuffed Crust'] as CrustOption[]).map((cr) => {
                const label = cr === 'Original Stuffed Crust' ? '+$3.00' : 'Included';
                const isSelected = crust === cr;
                return (
                  <button
                    key={cr}
                    onClick={() => setCrust(cr)}
                    className={`p-3.5 rounded-xl border text-center transition-all duration-150 outline-none ${
                      isSelected 
                        ? 'border-[#FF3D00] bg-[#FF3D00]/10 text-white font-black' 
                        : 'border-white/10 text-white/60 hover:border-white/25 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide">{cr}</span>
                    <span className="text-[10px] text-white/40 font-mono block mt-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Base Sauce selection */}
          <div>
            <h4 className="text-[11px] font-bold font-mono tracking-[0.2em] text-white/50 uppercase mb-2.5">
              3. Pizzeria Base Sauce
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Classic Marinara', 'Creamy Garlic Parmesan', 'Delectable Basil Pesto'] as const).map((sc) => {
                const isSelected = sauce === sc;
                return (
                  <button
                    key={sc}
                    onClick={() => setSauce(sc)}
                    className={`p-3.5 rounded-xl border text-center transition-all duration-150 outline-none ${
                      isSelected 
                        ? 'border-[#FF3D00] bg-[#FF3D00]/10 text-white font-black' 
                        : 'border-white/10 text-white/60 hover:border-white/25 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide">{sc}</span>
                    <span className="text-[10px] text-white/40 font-mono block mt-1">Classic Sauce</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gourmet Ingredients Multi-Select */}
          <div>
            <h4 className="text-[11px] font-bold font-mono tracking-[0.2em] text-[#FF3D00] uppercase mb-3">
              4. Premium Toppings
            </h4>

            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.key} className="space-y-2">
                  <span className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-[0.20em] block">
                    {cat.title}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOPPING_OPTIONS.filter(t => t.category === cat.key).map((topping) => {
                      const isSelected = selectedToppings.includes(topping.id);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => toggleTopping(topping.id)}
                          className={`flex items-center justify-between p-3 rounded-xl text-left border text-xs transition-all duration-150 outline-none ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-500/10 text-white font-semibold' 
                              : 'border-white/10 text-white/60 hover:border-white/25 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{topping.emoji}</span>
                            <span>{topping.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] text-[#FF3D00] bg-white/5 px-2 py-0.5 rounded-md font-bold">
                              +${topping.price.toFixed(2)}
                            </span>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 bg-black'
                            }`}>
                              {isSelected && <Check className="size-2.5 stroke-[3px]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout pricing box */}
          <div className="bg-black border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Flame className="size-3.5 text-[#FF3D00] animate-pulse" />
                <span>Customized pizza total</span>
              </div>
              <div className="font-sans font-black text-3xl text-white mt-0.5">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleAddToOven}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-150 outline-none ${
                isSuccessFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF3D00] text-white hover:bg-white hover:text-black shadow-lg shadow-[#FF3D00]/10 active:scale-95'
              }`}
            >
              {isSuccessFeedback ? (
                <>
                  <Check className="size-4 stroke-[3px]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-orange-200 fill-current" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
