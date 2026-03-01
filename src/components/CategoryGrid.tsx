"use client";
import React from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Chutney', img: 'pickle.webp' },
  { name: 'Chatnipudi', img: 'masake.jpg' },
  { name: 'Powder', img: 'masake.jpg' },
  { name: 'Rice Mixtures', img: 'inst.png' },
  { name: 'Nutrition Supliments', img: 'gulab.webp' },
  { name: 'Papad', img: 'snacks.avif' },
  { name: 'Pickle', img: 'pickle.webp' },
  { name: 'Snacks', img: 'snacks.avif' },
];

export const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-18 bg-[#F3F6F4] bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png')] bg-repeat">
      <div className="container mx-auto px-4 lg:px-10">

        {/* HEADER: Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 tracking-tight">
            Shop by Category
          </h2>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 pb-3 cursor-default">
          {categories.map((cat, index) => (
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              key={index}
              className="flex flex-col items-center group cursor-pointer w-full"
            >
              {/* Refined Circular Card */}
              <div className="relative aspect-square w-full max-w-[120px] md:max-w-[160px] rounded-full overflow-hidden mb-5 md:mb-6 border-[6px] border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-center font-serif text-base md:text-xl text-neutral-900 group-hover:text-[#1a4332] transition-colors tracking-tight">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};