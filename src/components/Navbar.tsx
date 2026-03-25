"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu, LogOut, Settings } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { CartDrawer } from './CartDrawer';

export const Navbar = () => {
  const { data: session } = useSession();
  const { totalItems, setIsCartOpen } = useCart();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-10 pointer-events-none">
        <nav className="pointer-events-auto mx-auto max-w-[1400px] w-full 
                        bg-white/70 backdrop-blur-xl 
                        border border-white/20 
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] 
                        rounded-[20px] md:rounded-[24px] 
                        transition-all duration-300">
          
          <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a4332] rounded-xl flex items-center justify-center p-2 shadow-sm">
                <div className="w-full h-full relative">
                  <Image 
                    src="/logo.png" 
                    alt="Khaadyam" 
                    fill
                    className="object-contain brightness-0 invert" 
                  />
                </div>
              </div>
              <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight flex">
                <span className="text-neutral-900">KHAAD</span>
                <span className="text-[#1a4332]">YAM</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-10 text-[14px] font-medium text-neutral-600">
              <Link href="/shop" className="hover:text-[#1a4332] transition-colors">Shop All</Link>
              <Link href="/bestsellers" className="hover:text-[#1a4332] transition-colors">Bestsellers</Link>
              <Link href="/gifting" className="hover:text-[#1a4332] transition-colors">Gifting</Link>
              <Link href="/story" className="hover:text-[#1a4332] transition-colors">Our Story</Link>
            </div>

            <div className="flex items-center gap-4 md:gap-7 text-neutral-800">
              
              
              <div className="relative group">
                {session ? (
                  <Link 
                    href="/account"
                    className="hover:text-[#1a4332] transition-colors flex items-center gap-2"
                  >
                    <User size={20} strokeWidth={1.5} />
                    <span className="text-xs font-semibold hidden lg:block">{session.user?.name?.split(' ')[0]}</span>
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="hover:text-[#1a4332] transition-colors flex items-center gap-2"
                  >
                    <User size={20} strokeWidth={1.5} />
                  </button>
                )}

                {session && (
                  <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 min-w-[200px]">
                      <div className="px-4 py-3 border-b border-neutral-50 mb-1">
                        <p className="text-xs text-neutral-400">Signed in as</p>
                        <p className="text-sm font-semibold truncate">{session.user?.email}</p>
                      </div>
                      <Link 
                        href="/account"
                        className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 rounded-xl flex items-center gap-3 transition-colors"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link 
                        href="/account"
                        className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 rounded-xl flex items-center gap-3 transition-colors"
                      >
                        <Settings size={16} /> My Orders
                      </Link>
                      {session?.user && (session.user as any).role === "ADMIN" && (
                        <Link 
                          href="/admin"
                          className="w-full text-left px-4 py-2 text-sm text-[#1a4332] font-bold hover:bg-neutral-50 rounded-xl flex items-center gap-3 transition-colors"
                        >
                          <Settings size={16} /> Admin Dashboard
                        </Link>
                      )}
                      <button 
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors mt-1"
                      >
                        <LogOut size={16} /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative group hover:text-[#1a4332] transition-colors"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a4332] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <Menu 
                size={24} 
                className="lg:hidden text-[#1a4332] cursor-pointer" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </nav>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
      />
      <CartDrawer onLoginClick={() => setIsLoginOpen(true)} />
    </>
  );
};