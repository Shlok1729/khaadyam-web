import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface ProductProps {
  name: string;
  price: number;
  description: string;
  image: string;
  isSoldOut?: boolean;
  badge?: string; // "BEST SELLER", "NEW", etc.
  isSpecialTitle?: boolean; // For the green title look
}

export const ProductCard = ({ name, price, description, image, isSoldOut, badge, isSpecialTitle }: ProductProps) => {
  return (
    <div className={`group flex flex-col ${isSoldOut ? 'opacity-60' : ''}`}>
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-4">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'grayscale' : ''}`}
        />
        
        {/* Badges (Top Left) */}
        {badge && !isSoldOut && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm 
              ${badge === 'NEW' ? 'bg-[#1a4332] text-white' : 'bg-white text-neutral-800'}`}>
              {badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
            <span className="bg-neutral-900/90 text-white px-5 py-2 rounded-full text-xs font-bold shadow-xl">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add Button (Bottom Right) */}
        {!isSoldOut && (
          <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 hover:scale-110 active:scale-95 transition-all text-neutral-800">
            <Plus size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* TEXT DETAILS */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className={`font-serif text-lg font-bold leading-tight flex-1 
            ${isSpecialTitle ? 'text-[#1a4332]' : 'text-neutral-900'}`}>
            {name}
          </h3>
          <span className="font-bold text-neutral-900 text-lg">₹{price}</span>
        </div>
        
        <p className="text-neutral-500 text-sm font-light line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
};