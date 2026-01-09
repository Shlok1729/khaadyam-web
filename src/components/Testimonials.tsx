"use client";
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    quote: "I've tried many store-bought snacks, but nothing comes close to Khaadyam. The Chakli has that perfect crunch and the butter flavor is authentic. It reminds me of my grandmother's kitchen.",
    author: "Anita Desai",
    location: "Bangalore",
    initial: "A"
  },
  {
    id: 2,
    quote: "The Masala Powders are a game changer. My Sambar finally tastes like the ones we used to have back in Malnad. Pure, aromatic, and absolutely fresh!",
    author: "Mohan Nadiger",
    location: "Shivamogga",
    initial: "M"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const current = REVIEWS[currentIndex];

  return (
    <section className="bg-[#1a4332] py-20 md:py-32 overflow-hidden relative">
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          
          <div className="text-white max-w-xl">
            <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/20 rounded-full">
              Testimonials
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-12">
              What our community says about the taste.
            </h2>
            
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#1a4332] transition-all active:scale-90"
              >
                <ArrowLeft size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#1a4332] transition-all active:scale-90"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

         
          <div className="relative">
            <div className="bg-[#24523e] p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5 transition-all duration-500">
              {/* Stars */}
              <div className="flex gap-1 text-[#d4af37] mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-white text-xl md:text-2xl leading-relaxed italic mb-10">
                "{current.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-serif text-[#1a4332] text-xl font-bold shadow-lg">
                  {current.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{current.author}</h4>
                  <p className="text-white/60 text-sm uppercase tracking-wider font-medium">
                    Verified Purchase, {current.location}
                  </p>
                </div>
              </div>
            </div>
            
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};