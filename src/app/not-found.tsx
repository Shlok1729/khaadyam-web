import React from 'react';
import Link from 'next/link';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col selection:bg-[#1a4332] selection:text-white">
      <Navbar />
      
      {/* 404 CONTENT SECTION */}
      <div className="flex-grow flex items-center justify-center pt-48 pb-32 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-[#1a4332]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')] pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Subtle Label */}
          <span className="text-[12px] md:text-[14px] font-bold tracking-[0.5em] text-[#1a4332] uppercase mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">
            404 — Lost Heritage
          </span>
          
          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-8xl font-medium text-neutral-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            This recipe is still <br className="hidden md:block" /> being perfected.
          </h1>
          
          {/* Descriptive Text */}
          <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The page you are looking for doesn't exist or has been moved to our archives. 
            Let's get you back to the flavors you love.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              href="/" 
              className="px-10 py-4 bg-[#1a4332] text-white rounded-full font-bold hover:bg-[#143528] transition-all shadow-xl shadow-[#1a4332]/20 active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
            
            <Link 
              href="/shop" 
              className="px-10 py-4 bg-white/50 backdrop-blur-md text-neutral-800 border border-neutral-200 rounded-full font-bold hover:bg-white transition-all active:scale-95 whitespace-nowrap"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
