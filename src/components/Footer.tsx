import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-neutral-100">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* COLUMN 1: BRAND INFO */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-[#1a4332] rounded flex items-center justify-center p-1.5">
                  <img src="/logo.png" alt="K" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  <span className="text-neutral-900">KHAAD</span>
                  <span className="text-[#1a4332]">YAM</span>
                </h2>
            </Link>
            <p className="text-neutral-500 text-base leading-relaxed mb-10 max-w-[280px] font-light">
              Bringing the authentic flavors of Malnad to the world. Pure ingredients, traditional recipes, and a whole lot of love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-[#1a4332] hover:bg-neutral-100 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-[#1a4332] hover:bg-neutral-100 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-[#1a4332] hover:bg-neutral-100 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: SHOP */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-8 tracking-tight">Shop</h4>
            <ul className="space-y-4 text-neutral-500 font-light">
              <li><Link href="/shop" className="hover:text-[#1a4332] transition-colors">All Snacks</Link></li>
              <li><Link href="/shop" className="hover:text-[#1a4332] transition-colors">Instant Mixes</Link></li>
              <li><Link href="/shop" className="hover:text-[#1a4332] transition-colors">Masala Powders</Link></li>
              <li><Link href="/shop" className="hover:text-[#1a4332] transition-colors">Sweets</Link></li>
              <li><Link href="/shop" className="hover:text-[#1a4332] transition-colors">Corporate Gifting</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-8 tracking-tight">Company</h4>
            <ul className="space-y-4 text-neutral-500 font-light">
              <li><Link href="/story" className="hover:text-[#1a4332] transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-[#1a4332] transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#1a4332] transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-[#1a4332] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#1a4332] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-8 tracking-tight">Newsletter</h4>
            <p className="text-neutral-500 text-sm mb-6 leading-relaxed font-light">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-5 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1a4332] transition-all text-sm"
              />
              <button className="w-full bg-[#1a4332] text-white font-bold py-3.5 rounded-xl hover:bg-[#143528] transition-all shadow-lg shadow-[#1a4332]/10 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-10 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-400 text-xs md:text-sm font-light">
            © 2026 Khaadyam Heritage Foods. All rights reserved.
          </p>
          
          {/* Payment Icons Placeholder */}
          <div className="flex items-center gap-4 opacity-40 grayscale">
            <span className="text-[10px] font-bold tracking-widest uppercase mr-2">Secure Payments</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
          </div>
        </div>
      </div>
    </footer>
  );
};