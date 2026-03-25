"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, ShoppingBag, ArrowRight, Loader2, Plus, CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { calculateShipping } from "@/lib/shipping";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'DIGITAL'>('COD');

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);
  const shipping = calculateShipping(
    totalAmount, 
    selectedAddress?.state || '', 
    cart.map(item => ({ weight: item.weight || '500g', quantity: item.quantity }))
  );

  const finalTotal = totalAmount + (shipping.isFree ? 0 : shipping.totalShipping);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/addresses")
        .then((res) => res.json())
        .then((data) => {
          setAddresses(data);
          if (data.length > 0) {
            const defaultAddr = data.find((a: any) => a.isDefault) || data[0];
            setSelectedAddressId(defaultAddr.id);
          }
        });
    }
  }, [session]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
        alert("Please select or add a shipping address");
        return;
    }
    setLoading(true);

    if (paymentMethod === 'DIGITAL') {
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            addressId: selectedAddressId,
            shippingAmount: shipping.totalShipping,
            totalAmount: finalTotal,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === 'DIGITAL' ? 'PAID' : 'UNPAID'
        }),
      });

      if (res.ok) {
        const order = await res.json();
        clearCart();
        router.push(`/checkout/success?orderId=${order.id}`);
      } else {
        const err = await res.text();
        alert(err || "Failed to place order. Please check your addresses.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FAF9F6]">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={40} className="text-neutral-300" />
        </div>
        <h2 className="font-serif text-3xl font-bold mb-4 text-neutral-900">Your basket is empty</h2>
        <p className="text-neutral-500 font-light italic mb-10 text-center max-w-sm">Explore our curated selection of heritage recipes to begin your culinary journey.</p>
        <Link href="/shop" className="bg-[#1a4332] text-white font-bold px-10 py-4 rounded-3xl shadow-xl shadow-[#1a4332]/20 flex items-center gap-2 hover:scale-105 transition-all">
          Explore Shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Shipping Column */}
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-3">Checkout</h1>
            <p className="text-neutral-500 font-light italic mb-12 text-lg">Confirm your heritage selection and delivery details.</p>

            <div className="space-y-12">
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                            <MapPin size={24} className="text-[#1a4332]" />
                            Shipping Address
                        </h3>
                        <Link href="/account" className="text-xs font-bold text-[#1a4332] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2">
                             Manage Addresses
                        </Link>
                    </div>

                    {addresses.length === 0 ? (
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-neutral-100 text-center group hover:border-[#1a4332]/20 transition-colors">
                            <p className="text-neutral-400 text-sm font-medium mb-6 italic">No addresses saved yet.</p>
                            <Link href="/account" className="bg-neutral-50 text-neutral-600 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#1a4332] hover:text-white transition-all mx-auto w-max shadow-sm">
                                <Plus size={18} /> Add New Address
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {addresses.map((addr) => (
                                <button 
                                    key={addr.id}
                                    onClick={() => setSelectedAddressId(addr.id)}
                                    className={`p-8 rounded-[2.5rem] text-left border-2 transition-all relative overflow-hidden group ${
                                        selectedAddressId === addr.id 
                                            ? 'border-[#1a4332] bg-white shadow-2xl shadow-[#1a4332]/10 ring-4 ring-[#1a4332]/5' 
                                            : 'border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-lg'
                                    }`}
                                >
                                    {selectedAddressId === addr.id && (
                                        <div className="absolute top-6 right-6 text-[#1a4332] animate-in zoom-in duration-300">
                                            <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                                        </div>
                                    )}
                                    <p className="font-bold text-neutral-900 text-lg mb-2">{addr.street}</p>
                                    <p className="text-neutral-400 text-sm font-medium italic">{addr.city}, {addr.state} {addr.zip}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                        <CreditCard size={24} className="text-[#1a4332]" />
                        Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <button 
                            onClick={() => setPaymentMethod('COD')}
                            className={`p-8 rounded-[2.5rem] text-left border-2 transition-all relative overflow-hidden group ${
                                paymentMethod === 'COD' 
                                    ? 'border-[#1a4332] bg-white shadow-2xl shadow-[#1a4332]/10 ring-4 ring-[#1a4332]/5' 
                                    : 'border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <ShoppingBag size={20} className={paymentMethod === 'COD' ? 'text-[#1a4332]' : 'text-neutral-400'} />
                                <span className="font-bold text-neutral-900">Cash on Delivery</span>
                            </div>
                            <p className="text-neutral-400 text-xs font-medium italic">Handcrafted trust: Pay at your doorstep.</p>
                        </button>

                        <button 
                            onClick={() => setPaymentMethod('DIGITAL')}
                            className={`p-8 rounded-[2.5rem] text-left border-2 transition-all relative overflow-hidden group ${
                                paymentMethod === 'DIGITAL' 
                                    ? 'border-[#1a4332] bg-white shadow-2xl shadow-[#1a4332]/10 ring-4 ring-[#1a4332]/5' 
                                    : 'border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <CreditCard size={20} className={paymentMethod === 'DIGITAL' ? 'text-[#1a4332]' : 'text-neutral-400'} />
                                <span className="font-bold text-neutral-900">Digital Gateway</span>
                            </div>
                            <p className="text-neutral-400 text-xs font-medium italic">Secure & Seamless: Modern heritage experience.</p>
                        </button>
                    </div>
                </section>
            </div>
          </div>

          {/* Summary Column */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 lg:sticky lg:top-32">
             <div className="bg-white p-12 rounded-[4rem] border border-neutral-100 shadow-2xl shadow-neutral-200/50">
                <h3 className="font-serif text-3xl font-bold mb-10">Basket Summary</h3>
                <div className="space-y-8 mb-12 overflow-y-auto max-h-[350px] pr-4 custom-scrollbar">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-6 group">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-50 overflow-hidden flex-shrink-0 border border-neutral-100 group-hover:scale-105 transition-transform">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-neutral-900 text-base tracking-tight">{item.name}</h4>
                                <p className="text-neutral-400 text-sm font-medium italic">{item.quantity} x ₹{item.price}</p>
                            </div>
                            <span className="font-bold text-neutral-900 text-lg">₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-5 pt-10 border-t border-neutral-100 mb-12">
                    <div className="flex justify-between text-neutral-400 font-medium italic">
                        <span>Heritage Selection</span>
                        <span className="text-neutral-900">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 font-medium italic">
                        <span>Fulfillment & Weight Care</span>
                        <span className={`${shipping.isFree ? 'text-[#1a4332] font-bold' : 'text-neutral-900'}`}>
                            {shipping.isFree ? 'FREE' : `₹${shipping.totalShipping}`}
                        </span>
                    </div>
                    {shipping.isFree && (
                        <div className="bg-[#1a4332]/5 p-3 rounded-2xl text-[10px] text-[#1a4332] font-bold text-center uppercase tracking-widest animate-in zoom-in">
                            Heritage Loyalty Applied: Free Shipping Secured
                        </div>
                    )}
                    <div className="flex justify-between items-end pt-6">
                        <div>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-2 leading-none">Total Investment</p>
                            <span className="font-bold text-5xl text-[#1a4332] tracking-tighter">₹{finalTotal}</span>
                        </div>
                        <button 
                            onClick={handlePlaceOrder}
                            disabled={loading || !selectedAddressId}
                            className="bg-[#1a4332] text-white font-bold px-12 py-6 rounded-[2.5rem] shadow-2xl shadow-[#1a4332]/30 flex items-center gap-4 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale group"
                        >
                            {loading ? <Loader2 size={26} className="animate-spin" /> : <ShoppingBag size={26} className="group-hover:rotate-12 transition-transform" />}
                            {loading ? 'Processing Heritage...' : 'Place Order'}
                        </button>
                    </div>
                </div>

                <div className="bg-neutral-50 p-6 rounded-3xl text-center">
                    <p className="text-[11px] text-neutral-400 font-medium italic leading-relaxed">
                        By placing your order, you are choosing to preserve Malnad's legacy. 
                        Your heritage selections will be handled with the utmost respect.
                    </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
