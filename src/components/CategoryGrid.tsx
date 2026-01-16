"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { color } from 'three/tsl';

const categories = [
  { name: 'Savoury Snacks', img: 'snacks.avif' },
  { name: 'Dosa Mixes', img: 'dosa.jpg' },
  { name: 'Masala Powders', img: 'masake.jpg' },
  { name: 'Pickles', img: 'pickle.webp' },
  { name: 'Sweets', img: 'gulab.webp' },
  { name: 'Hampers', img: 'hamper.jpg' },
  { name: 'Instant Mix', img: 'inst.png' },
];

export const CategoryGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Logic to track scroll progress for the beautiful slider
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 350 : scrollLeft + 350;
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F3F6F4] bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png')] bg-repeat">
      <div className="container mx-auto px-4 lg:px-10">
        
        {/* HEADER: Title & Modern Arrows */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 tracking-tight">
            Shop by Category
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="group w-11 h-11 flex items-center justify-center rounded-full 
                   border border-[#1a4332] transition-colors
                   hover:border-[#1a4332] hover:text-[#1a4332]"
            >
              <ArrowLeft size={20} strokeWidth={1.5}  />
            </button>
            <button
              onClick={() => scroll('right')}
              className="group w-11 h-11 flex items-center justify-center rounded-full 
                   border border-[#1a4332] transition-colors
                   hover:border-[#1a4332] hover:text-[#1a4332]"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* CATEGORIES ROW */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar gap-8 md:gap-12 pb-8 scroll-smooth"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 group cursor-pointer w-[150px] md:w-[200px]"
            >
              {/* Refined Circular Card */}
              <div className="relative aspect-square rounded-full overflow-hidden mb-6 border-[6px] border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-center font-serif text-lg md:text-xl text-neutral-900 group-hover:text-[#1a4332] transition-colors tracking-tight">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

        {/* 2. THE BEAUTIFUL CUSTOM SLIDER INDICATOR */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[240px] h-[3px] bg-neutral-200/60 rounded-full relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#1a4332] transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(26,67,50,0.3)]"
              style={{ 
                width: '35%', // Length of the moving indicator
                transform: `translateX(${scrollProgress * 1.85}%)` // Syncs with scroll width
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};