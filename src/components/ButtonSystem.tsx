import React from 'react';
import { ArrowRight, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export const ButtonSystem = () => {
  return (
    <div className="p-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl mb-4 text-neutral-900">Khaadyam Component Library</h1>
        <p className="text-neutral-500 mb-12">Visual Design Language: Buttons & Interactions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* PRIMARY CTAs */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">01. Primary Call to Actions</h3>
            
            {/* Hero Primary */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-neutral-400 uppercase">Hero Primary (Pill)</span>
              <button className="bg-[#1a4332] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-[#143528] transition-all shadow-xl shadow-[#1a4332]/20 active:scale-95 w-fit">
                Shop Bestsellers
              </button>
            </div>

            {/* Hero Secondary */}
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-[10px] text-neutral-400 uppercase">Hero Secondary (Frosty)</span>
              <button className="bg-white/50 backdrop-blur-md text-neutral-800 border border-neutral-200 px-10 py-4 rounded-full font-bold text-base hover:bg-white transition-all active:scale-95 w-fit">
                Explore Recipes
              </button>
            </div>
          </div>

          {/* ICON & UTILITY BUTTONS */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">02. Utility & Navigation</h3>
            
            <div className="flex gap-8 items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-neutral-400 uppercase">Quick Add</span>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 hover:scale-110 transition-all text-neutral-800">
                  <Plus size={24} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-neutral-400 uppercase">Slider Nav</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 hover:border-[#1a4332] hover:text-[#1a4332] transition-all">
                    <ArrowLeft size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 hover:border-[#1a4332] hover:text-[#1a4332] transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Action */}
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-[10px] text-neutral-400 uppercase">Grid Card CTA</span>
              <button className="flex items-center justify-center gap-2 bg-[#1a4332] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-dark shadow-md active:scale-95 transition-all">
                <ShoppingBag size={16} /> Buy Now
              </button>
            </div>
          </div>

          {/* STATUS BADGES */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">03. Contextual Tags</h3>
            <div className="flex flex-wrap gap-4">
               <span className="px-3 py-1 bg-[#1a4332] text-white rounded-md text-[10px] font-bold uppercase tracking-wider">New Arrival</span>
               <span className="px-3 py-1 bg-white text-neutral-800 border border-neutral-100 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">Best Seller</span>
               <span className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-[10px] font-bold uppercase tracking-wider">Sold Out</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};