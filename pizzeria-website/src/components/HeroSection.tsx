import React from 'react';
import { Flame, Star, Award, ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
  onScrollToBuilder: () => void;
}

export default function HeroSection({ onScrollToMenu, onScrollToBuilder }: HeroProps) {
  return (
    <div className="relative bg-[#0D0D0D] py-20 md:py-28 border-b border-white/10 overflow-hidden" id="hero">
      {/* Massive Background Typography representing the Design spec */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <span className="text-[300px] md:text-[450px] font-black leading-none tracking-tighter text-white">PIZZA</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Editorial Text Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Elite Award Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#FF3D00] border border-white/10">
            <Award className="size-4 animate-bounce shrink-0" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]">No. 1 Classic Style Pizza Experience</span>
          </div>

          <div className="space-y-4">
            <span className="block text-xs uppercase tracking-[0.4em] text-white/45 font-mono">EST. 1958 // THE CLASSIC HUT STYLE</span>
            <h1 className="text-[64px] md:text-[96px] lg:text-[112px] leading-[0.82] font-black uppercase tracking-tighter text-white">
              THE <br /> <span className="text-[#FF3D00]">WORLD'S</span> <br /> BEST.
            </h1>
          </div>

          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed font-light max-w-lg border-l-2 border-[#FF3D00] pl-6">
            Where delicious baking traditions meet modern comfort foods. Our classic dough is signature hand-tossed, stuffed with mozzarella cheese, or baked thin and crispy for the ultimate bite.
          </p>

          {/* Interactive Statistics Grid */}
          <div className="grid grid-cols-3 gap-6 py-5 border-y border-white/10 max-w-xl">
            <div>
              <div className="flex items-center gap-1 mb-1 text-[10px] font-bold tracking-widest text-[#FF3D00] uppercase">
                <Flame className="size-3 text-[#FF3D00]" />
                OVEN TEMP
              </div>
              <div className="font-sans font-black italic text-2xl md:text-3xl text-white">450°F</div>
              <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">Perfect Bake</p>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1">
                STUFFED CRUST
              </div>
              <div className="font-sans font-black italic text-2xl md:text-3xl text-white">Original</div>
              <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">Filled with cheese</p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                <Star className="size-3 fill-current text-[#FF3D00]" />
                DELIVERY RANK
              </div>
              <div className="font-sans font-black italic text-2xl md:text-3xl text-white">Top Tier</div>
              <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">Fast & Hot</p>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onScrollToBuilder}
              className="px-8 py-4 rounded-full bg-[#FF3D00] text-white hover:bg-white hover:text-black font-bold uppercase text-xs tracking-widest transition-all duration-200 shadow-lg shadow-[#FF3D00]/10 active:scale-[0.98]"
            >
              Build Custom Pizza
            </button>
            <button
              onClick={onScrollToMenu}
              className="px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white hover:text-black font-bold uppercase text-xs tracking-widest transition-all duration-200 active:scale-[0.98] border border-white/10"
            >
              Explore Menu
            </button>
          </div>
        </div>

        {/* Column 2: Image & Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square max-w-md mx-auto rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/10 transform hover:rotate-1 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800"
              alt="Delicious golden crust pizza"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Artistic border vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating authentic label */}
          <div className="absolute -bottom-4 -left-4 bg-white text-black p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/15">
            <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-black font-mono text-sm">
              100%
            </div>
            <div>
              <span className="block font-black text-xs uppercase tracking-wider">Original Crust</span>
              <span className="block text-[10px] text-stone-500 uppercase tracking-widest">Since 1958 Heritage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 md:mt-16">
        <button 
          onClick={onScrollToMenu}
          className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white text-xs font-bold tracking-[0.3em] uppercase transition-colors"
        >
          <span>DISCOVER MENU</span>
          <ChevronDown className="size-4 text-[#FF3D00] animate-bounce" />
        </button>
      </div>
    </div>
  );
}
