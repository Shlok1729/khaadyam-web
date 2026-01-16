"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    /* Wrapper to handle the floating position */
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-10 pointer-events-none">
      <nav className="pointer-events-auto mx-auto max-w-[1400px] w-full 
                      bg-white/70 backdrop-blur-xl 
                      border border-white/20 
                      shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] 
                      rounded-[20px] md:rounded-[24px] 
                      transition-all duration-300">
        
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a4332] rounded-xl flex items-center justify-center p-2 shadow-sm">
              <img 
                src="/logo.png" 
                alt="K" 
                className="w-full h-full object-contain brightness-0 invert" 
              />
            </div>
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight flex">
              <span className="text-neutral-900">KHAAD</span>
              <span className="text-[#1a4332]">YAM</span>
            </h1>
          </Link>

          {/* CENTER LINKS - Apple-style spacing */}
          <div className="hidden lg:flex items-center gap-10 text-[14px] font-medium text-neutral-600">
            <Link href="/shop" className="hover:text-[#1a4332] transition-colors">Shop All</Link>
            <Link href="/bestsellers" className="hover:text-[#1a4332] transition-colors">Bestsellers</Link>
            <Link href="/gifting" className="hover:text-[#1a4332] transition-colors">Gifting</Link>
            <Link href="/story" className="hover:text-[#1a4332] transition-colors">Our Story</Link>
          </div>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-4 md:gap-7 text-neutral-800">
            <button className="hover:text-[#1a4332] transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:text-[#1a4332] transition-colors hidden sm:block">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="relative group hover:text-[#1a4332] transition-colors">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1a4332] border-2 border-white rounded-full"></span>
            </button>
            {/* Mobile Menu Toggle */}
            <Menu size={24} className="lg:hidden text-[#1a4332] cursor-pointer" />
          </div>

        </div>
      </nav>
    </div>
  );
};