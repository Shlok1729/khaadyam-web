"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
    { icon: <Package size={20} />, label: 'Products', href: '/admin/products' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', href: '/admin/orders' },
    { icon: <Users size={20} />, label: 'Customers', href: '/admin/customers' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-neutral-100 flex flex-col h-screen sticky top-0 px-6 py-8">
      <div className="mb-12 px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a4332] rounded-xl flex items-center justify-center text-white font-serif text-xl font-bold">K</div>
          <span className="font-serif text-2xl font-bold tracking-tight text-neutral-900">Khaadyam<span className="text-[#1a4332]">.</span></span>
        </Link>
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mt-2 ml-1">Admin Control Page</p>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive 
                ? 'bg-[#1a4332] text-white shadow-xl shadow-[#1a4332]/20' 
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-[#1a4332]'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-neutral-100 space-y-2">
        <Link href="/account" className="flex items-center gap-4 px-4 py-3.5 text-neutral-500 font-bold text-sm hover:text-[#1a4332] transition-colors">
          <Settings size={20} />
          Profile Settings
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
