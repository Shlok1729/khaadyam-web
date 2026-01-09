"use client";
import React from 'react';
import { ArrowRight, Award, Leaf, Star } from 'lucide-react';

export const Hero = () => {
  return (
  
    <section className="relative bg-[#FAF9F6] py-12 md:py-24 overflow-hidden">
      
     
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1a4332]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
    
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]"></div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
          
          {/* LEFT CONTENT */}
          <div className="max-w-xl order-2 lg:order-1">
            {/* New Collection Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-white rounded-full border border-neutral-200 shadow-sm">
              <span className="w-2 h-2 bg-[#1a4332] rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold text-neutral-600 uppercase tracking-[0.2em]">
                New Monsoon Collection
              </span>
            </div>

           
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[110px] text-neutral-900 leading-[0.85] tracking-tighter mb-8">
              Taste of <br />
              <span className="text-[#1a4332] italic">Tradition.</span>
            </h1>

            {/* Subtext */}
            <p className="text-neutral-500 text-base md:text-xl font-light leading-relaxed mb-10 max-w-[450px]">
              Handcrafted snacks using recipes passed down through four generations in the Malnad region.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <button className="bg-[#1a4332] text-white px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#143528] transition-all shadow-xl shadow-[#1a4332]/20 active:scale-95">
                Shop Snacks
              </button>
              <button className="bg-white/50 backdrop-blur-md text-neutral-800 border border-neutral-200 px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base hover:bg-white transition-all active:scale-95">
                Explore Recipes
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 border-t border-neutral-200/60 pt-8">
              <div className="flex items-center gap-2 text-neutral-800 uppercase font-bold text-[10px] md:text-xs tracking-widest">
                <Award size={18} className="text-[#1a4332]" />
                <span>Auth. 1985</span>
              </div>
              <div className="h-6 w-px bg-neutral-300"></div>
              <div className="flex items-center gap-2 text-neutral-800 uppercase font-bold text-[10px] md:text-xs tracking-widest">
                <Leaf size={18} className="text-[#1a4332]" />
                <span>100% Natural</span>
              </div>
            </div>
          </div>

          
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] bg-[#00477a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:rotate-0 -rotate-3 group overflow-hidden">
              
              <img 
                src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800" 
                alt="Spicy Nippat" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10"></div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl flex items-center justify-between border border-white/40">
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-1">Spicy Nippat</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-bold">(245)</span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};