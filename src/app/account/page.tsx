"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Package, User, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const user = { name: "Anita Desai", email: "anita.desai@email.com" };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-2">Namaste, {user.name.split(' ')[0]}</h1>
            <p className="text-neutral-500 font-light italic">Welcome to your Malnad kitchen pantry.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1 space-y-2">
              <nav className="bg-white/50 backdrop-blur-md rounded-3xl p-4 border border-white/20">
                <AccountNavItem icon={<Package size={20}/>} label="Orders" active />
                <AccountNavItem icon={<Heart size={20}/>} label="Favorites" />
                <AccountNavItem icon={<MapPin size={20}/>} label="Addresses" />
                <AccountNavItem icon={<User size={20}/>} label="Profile" />
                <div className="my-4 border-t border-neutral-100"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all">
                  <LogOut size={20} /> Sign Out
                </button>
              </nav>
            </aside>

            {/* Main Content: Orders Preview */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-neutral-900 px-2">Recent Orders</h3>
              
              <div className="space-y-4">
                {/* Mock Order Item */}
                <div className="bg-white rounded-3xl p-6 border border-neutral-100 flex flex-wrap items-center justify-between gap-6 hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center">
                      <Package className="text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">Order #KH-8829</h4>
                      <p className="text-sm text-neutral-500">Placed on Oct 12, 2023 • 3 Items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">₹1,240.00</p>
                      <span className="text-[10px] font-bold uppercase text-[#1a4332] bg-[#1a4332]/10 px-2 py-0.5 rounded">Delivered</span>
                    </div>
                    <ChevronRight className="text-neutral-300 group-hover:text-[#1a4332] transition-colors" />
                  </div>
                </div>
                
                {/* Second Mock Order */}
                <div className="bg-white rounded-3xl p-6 border border-neutral-100 flex flex-wrap items-center justify-between gap-6 opacity-80">
                   <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
                      <Package />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">Order #KH-8710</h4>
                      <p className="text-sm text-neutral-500">Placed on Sep 28, 2023 • 1 Item</p>
                    </div>
                  </div>
                  <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">₹450.00</p>
                      <span className="text-[10px] font-bold uppercase text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">Delivered</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper component for nav items
function AccountNavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all ${
      active ? 'bg-[#1a4332] text-white shadow-lg' : 'text-neutral-500 hover:bg-white hover:text-[#1a4332]'
    }`}>
      {icon}
      {label}
    </button>
  );
}