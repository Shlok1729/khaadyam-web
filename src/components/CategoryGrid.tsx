"use client"; // Required for useRef and onClick events
import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Savoury Snacks', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400' },
  { name: 'Dosa Mixes', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=400' },
  { name: 'Masala Powders', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400' },
  { name: 'Pickles', img: 'https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=400', isHighlight: true },
  { name: 'Sweets', img: 'https://images.unsplash.com/photo-1542310503-575344383610?q=80&w=400' },
  { name: 'Hampers', img: 'https://images.unsplash.com/photo-1549462980-6a6200418466?q=80&w=400' },
  { name: 'Instant Mix', img: 'https://images.unsplash.com/photo-1512058560366-cd24270083cd?q=80&w=400' },
];

export const CategoryGrid = () => {
  // 1. Create a reference to the scrollable div
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Logic to handle the scroll
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      
      // We scroll by approximately 2 items width (adjust 300 as needed)
      const scrollTo = direction === 'left' 
        ? scrollLeft - 300 
        : scrollLeft + 300;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* HEADER SECTION */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 tracking-tight">
            Shop by Category
          </h2>
          
          <div className="flex gap-3">
            {/* 3. Attach the click handlers */}
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-neutral-200 hover:border-[#1a4332] hover:text-[#1a4332] transition-all group active:scale-90"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-neutral-200 hover:border-[#1a4332] hover:text-[#1a4332] transition-all group active:scale-90"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* CATEGORIES ROW */}
        {/* 4. Assign the ref to this div */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-6 md:gap-10 pb-4 scroll-smooth"
        >
          {categories.map((cat, index) => (
            <div key={index} className="flex-shrink-0 group cursor-pointer w-[140px] md:w-[180px]">
              <div className="relative aspect-square rounded-full overflow-hidden mb-5 border-4 border-white shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:scale-105">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className={`text-center font-medium text-[15px] md:text-lg transition-colors
                ${cat.isHighlight ? 'text-[#1a4332]' : 'text-neutral-900 group-hover:text-[#1a4332]'}`}>
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};