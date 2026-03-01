"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-4">
      <Navbar />
      
      {/* Decorative Background Blob */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1a4332]/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Welcome Back</h1>
            <p className="text-neutral-500 font-light text-sm">Sign in to access your orders and favorites.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-[#1a4332] transition-all"
                />
                <Mail className="absolute left-4 top-4 text-neutral-400" size={20} strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-[#1a4332] transition-all"
                />
                <Lock className="absolute left-4 top-4 text-neutral-400" size={20} strokeWidth={1.5} />
              </div>
            </div>

            <button className="w-full bg-[#1a4332] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#1a4332]/20 hover:bg-[#143528] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-neutral-100 text-center space-y-4">
            <p className="text-sm text-neutral-500">
              New to Khaadyam? <Link href="/register" className="text-[#1a4332] font-bold hover:underline">Create an account</Link>
            </p>
            <button className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}