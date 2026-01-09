"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1a4332] rounded-lg flex items-center justify-center p-1.5">
              <img src="/logo.png" alt="K" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-neutral-900">KHAAD</span>
              <span className="text-[#1a4332]">YAM</span>
            </h1>
          </Link>

          {/* Nav Links - HIDDEN ON MOBILE (md:flex) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-[14px] font-medium text-neutral-600">
            <Link href="/shop" className="hover:text-[#1a4332] transition-colors">Shop All</Link>
            <Link href="/bestsellers" className="hover:text-[#1a4332] transition-colors">Bestsellers</Link>
            <Link href="/gifting" className="hover:text-[#1a4332] transition-colors">Gifting</Link>
            <Link href="/story" className="hover:text-[#1a4332] transition-colors">Our Story</Link>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-3 md:gap-6 text-neutral-800">
            <Search size={20} className="cursor-pointer hover:text-[#1a4332] hidden sm:block" strokeWidth={1.5} />
            <User size={20} className="cursor-pointer hover:text-[#1a4332] hidden sm:block" strokeWidth={1.5} />
            <button className="relative group">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1a4332] border-2 border-white rounded-full"></span>
            </button>
            {/* Mobile Menu Toggle */}
            <Menu size={24} className="lg:hidden cursor-pointer text-[#1a4332]" />
          </div>

        </div>
      </div>
    </nav>
  );
};