"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartDrawerProps {
  onLoginClick?: () => void;
}

export const CartDrawer = ({ onLoginClick }: CartDrawerProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalAmount, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a4332] rounded-xl flex items-center justify-center text-white">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-900">Your Basket</h2>
              <p className="text-[10px] font-bold text-[#1a4332] uppercase tracking-[0.2em]">{totalItems} Items</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-300 mb-6">
                <ShoppingBag size={40} />
              </div>
              <h3 className="font-serif text-2xl font-medium text-neutral-900 mb-2">Your basket is empty</h3>
              <p className="text-neutral-500 font-light mb-8">Sounds like its time to explore some heritage flavors.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 bg-[#1a4332] text-white rounded-full font-bold hover:bg-[#143528] transition-all shadow-lg active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-neutral-900 leading-tight">{item.name}</h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-neutral-900 mt-1">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white border border-neutral-100 rounded-full px-1 py-1 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-50 text-neutral-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-neutral-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-50 text-neutral-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[#1a4332]">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-neutral-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 font-light">Subtotal</span>
              <span className="text-2xl font-bold text-neutral-900">₹{totalAmount}</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-light text-center">Taxes and shipping calculated at checkout</p>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                router.push('/checkout');
              }}
              className="w-full bg-[#1a4332] text-white font-bold py-4 rounded-2xl hover:bg-[#143528] transition-all shadow-xl shadow-[#1a4332]/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
