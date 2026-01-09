import { Instagram, Facebook, Phone } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-[#1a4332] text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
        <div className="hidden md:flex gap-4">
          <Instagram size={14} className="hover:text-[#d4af37] cursor-pointer transition-colors" />
          <Facebook size={14} className="hover:text-[#d4af37] cursor-pointer transition-colors" />
        </div>
        <div className="flex-1 text-center">
          Traditional Taste • Free Shipping on orders above ₹999 • 100% Natural
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Phone size={14} />
          <span>Support</span>
        </div>
      </div>
    </div>
  );
};