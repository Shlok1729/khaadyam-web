"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Heart, Star } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-8 pt-32 animate-in fade-in zoom-in duration-1000 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1a4332]/5 rounded-full -ml-40 -mt-40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1a4332]/3 rounded-full -mr-60 -mb-60 blur-3xl opacity-50" />

      <div className="w-28 h-28 bg-[#1a4332] rounded-[3rem] flex items-center justify-center text-white mb-10 shadow-2xl shadow-[#1a4332]/30 relative group hover:rotate-6 transition-transform duration-500">
        <CheckCircle2 size={56} />
        <div className="absolute -top-2 -right-2 bg-orange-400 p-2 rounded-2xl shadow-lg animate-bounce">
            <Star size={16} fill="white" className="text-white" />
        </div>
      </div>

      <div className="text-center max-w-2xl relative z-10 px-4">
        <h1 className="font-serif text-6xl font-bold text-neutral-900 mb-6 tracking-tight">Heritage Secured!</h1>
        <p className="text-neutral-500 font-light italic text-xl mb-12 leading-relaxed">
          Your selection of Malnad&apos;s finest has been reserved. <br/>
          Order <span className="text-[#1a4332] font-bold">#KH-{orderId?.toString().padStart(4, '0')}</span> is being prepared with high-respect and quality care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-xl mx-auto mb-16">
            <Link href="/account" className="w-full sm:w-auto bg-[#1a4332] text-white font-bold px-10 py-5 rounded-[2.5rem] shadow-2xl shadow-[#1a4332]/30 flex items-center justify-center gap-3 hover:scale-[1.05] transition-all active:scale-[0.98]">
            <ShoppingBag size={22} />
            Track Order
            </Link>
            <Link href="/shop" className="w-full sm:w-auto bg-white text-neutral-900 border border-neutral-100 font-bold px-10 py-5 rounded-[2.5rem] shadow-sm flex items-center justify-center gap-3 hover:bg-neutral-50 hover:shadow-md transition-all active:scale-[0.98]">
            Explore More
            <ArrowRight size={22} />
            </Link>
        </div>

        <div className="pt-12 border-t border-neutral-100 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-neutral-400 font-medium italic text-sm">
                <span>Hand-packed in Malnad</span>
                <div className="w-1.5 h-1.5 bg-neutral-200 rounded-full" />
                <div className="flex items-center gap-1.5">
                    Made with <Heart size={14} className="text-[#1a4332]" fill="currentColor" /> by Khaadyam
                </div>
            </div>
            <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-[0.3em]">Authenticity Guaranteed</p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400 italic">Finalizing the legacy...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
