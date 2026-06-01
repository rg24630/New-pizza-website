import React, { useState } from 'react';
import { Flame, Info, Plus, Star } from 'lucide-react';
import { PIZZA_PRESETS, TOPPING_OPTIONS } from '../data';
import { PizzaPreset } from '../types';

interface MenuSectionProps {
  onAddPresetToCart: (preset: PizzaPreset) => void;
  onCustomizePreset: (preset: PizzaPreset) => void;
}

export default function MenuSection({ onAddPresetToCart, onCustomizePreset }: MenuSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'veg' | 'spicy'>('all');

  const filteredPizzas = PIZZA_PRESETS.filter(pizza => {
    if (activeFilter === 'veg') return pizza.isVegetarian;
    if (activeFilter === 'spicy') return (pizza.spicyLevel && pizza.spicyLevel > 0);
    return true;
  });

  const getToppingNames = (toppingIds: string[]) => {
    return toppingIds
      .map(id => TOPPING_OPTIONS.find(t => t.id === id)?.name || id)
      .join(', ');
  };

  return (
    <div className="space-y-8" id="menu">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-[#FF3D00] uppercase block mb-1">
            Hut Favorites
          </span>
          <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-white">
            Signature Pizzeria Favorites
          </h3>
          <p className="text-white/60 text-sm font-light mt-1">
            Freshly prepared using our signature baked golden crusts, premium standard toppings, and 100% real cheese.
          </p>
        </div>

        {/* Filter tags segment */}
        <div className="flex gap-1.5 bg-white/5 p-1.5 rounded-full self-start md:self-auto border border-white/10">
          {(['all', 'veg', 'spicy'] as const).map((filter) => {
            const label = filter === 'all' ? 'Full Menu' : filter === 'veg' ? 'Vegetarian' : 'Spicy Fiery';
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-[#FF3D00] text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Pizzas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPizzas.map((pizza) => {
          return (
            <div 
              key={pizza.id}
              className="bg-white/5 rounded-2xl border border-white/10 shadow-lg hover:border-[#FF3D00] transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Badges cover */}
              <div className="relative h-56 w-full overflow-hidden bg-white/5">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                {/* Badges on corner */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {pizza.isVegetarian && (
                    <span className="bg-emerald-600 border border-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-md">
                      Vegetarian
                    </span>
                  )}
                  {pizza.spicyLevel && pizza.spicyLevel > 0 && (
                    <span className="bg-[#FF3D00] border border-[#FF3D00] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-md flex items-center gap-1">
                      <Flame className="size-3 fill-current text-white" />
                      Spicy Lvl {pizza.spicyLevel}
                    </span>
                  )}
                </div>

                {/* Fixed Pricing Label */}
                <div className="absolute bottom-4 right-4 bg-black/90 py-1.5 px-3.5 rounded-full border border-white/15">
                  <span className="font-sans text-sm font-black text-[#FF3D00]">
                    ${pizza.basePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Contents block */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-sans text-xl font-black uppercase tracking-tight text-white group-hover:text-[#FF3D00] transition-colors">
                    {pizza.name}
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed font-light line-clamp-3">
                    {pizza.description}
                  </p>
                </div>

                {/* Key Topped ingredients */}
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-[11px] text-white/75 flex items-start gap-2">
                  <Info className="size-4 shrink-0 text-[#FF3D00] mt-0.5" />
                  <div>
                    <span className="font-bold text-white uppercase tracking-wider text-[9px] block mb-0.5">Signature Toppings:</span>{' '}
                    {getToppingNames(pizza.toppings)}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => onCustomizePreset(pizza)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => onAddPresetToCart(pizza)}
                    className="py-2.5 px-3 rounded-xl bg-[#FF3D00] text-white hover:bg-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
                  >
                    <Plus className="size-3.5 stroke-[3px]" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
