"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Package, User, MapPin, CreditCard, Clock, CheckCircle2, Truck, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrderDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrder((prev: any) => ({ ...prev, status: updatedOrder.status }));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-neutral-400 italic">Tracking the fulfillment...</div>;
  if (!order) return <div className="p-20 text-center text-red-500 font-bold">Heritage Order Not Found.</div>;

  const statusSteps = [
    { label: 'PENDING', icon: <Clock size={20} />, activeColor: 'text-orange-500' },
    { label: 'PROCESSING', icon: <Package size={20} />, activeColor: 'text-blue-500' },
    { label: 'SHIPPED', icon: <Truck size={20} />, activeColor: 'text-purple-500' },
    { label: 'DELIVERED', icon: <CheckCircle2 size={20} />, activeColor: 'text-[#1a4332]' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
       <Link href="/admin/orders" className="flex items-center gap-2 text-neutral-400 font-bold text-sm mb-8 hover:text-[#1a4332] transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Order Center
       </Link>

       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2">Order #KH-{order.id.toString().padStart(4, '0')}</h1>
                <p className="text-neutral-500 font-light italic">Placed on {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-neutral-100 shadow-sm">
                {statusSteps.map((step) => {
                    const isActive = order.status.toUpperCase() === step.label;
                    return (
                        <button 
                            key={step.label}
                            onClick={() => updateStatus(step.label)}
                            disabled={updating}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold text-xs tracking-widest ${
                                isActive 
                                    ? `bg-neutral-900 text-white shadow-lg` 
                                    : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'
                            } disabled:opacity-50`}
                        >
                            {step.icon}
                            {step.label}
                        </button>
                    );
                })}
            </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Items Table */}
            <div className="bg-white rounded-[3rem] p-10 border border-neutral-100 shadow-sm overflow-hidden">
                <h3 className="font-serif text-2xl font-bold mb-8">Ordered Selection</h3>
                <div className="space-y-8">
                    {order.orderItems.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-100 overflow-hidden border border-neutral-100 flex-shrink-0">
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 text-lg">{item.product.name}</h4>
                                    <p className="text-neutral-400 text-sm font-medium">{item.quantity} x ₹{item.price}</p>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-neutral-900">₹{item.quantity * item.price}</span>
                        </div>
                    ))}
                    <div className="pt-8 border-t border-neutral-100 space-y-4">
                        <div className="flex justify-between items-center text-neutral-400 font-medium italic">
                            <span>Heritage Selection</span>
                            <span className="text-neutral-900 font-bold">₹{order.totalAmount - (order.shippingAmount || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-neutral-400 font-medium italic">
                            <span>Fulfillment & Weight Care</span>
                            <span className="text-neutral-900 font-bold">₹{order.shippingAmount || 0}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-serif text-2xl font-bold">Total Investment</span>
                            <span className="font-bold text-4xl text-[#1a4332]">₹{order.totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Customer & Shipping */}
            <div className="bg-white rounded-[3rem] p-10 border border-neutral-100 shadow-sm">
                <div className="mb-10">
                    <div className="flex items-center gap-3 text-[#1a4332] font-bold text-xs uppercase tracking-widest mb-4">
                        <User size={16} />
                        Customer Information
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-neutral-900">{order.user?.name || 'Guest User'}</span>
                        <span className="text-neutral-400 font-medium italic">{order.user?.email || 'N/A'}</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 text-[#1a4332] font-bold text-xs uppercase tracking-widest mb-4">
                        <MapPin size={16} />
                        Shipping Address
                    </div>
                    <div className="text-neutral-500 font-medium leading-relaxed bg-neutral-50 p-6 rounded-2xl italic">
                        {order.shippingAddress ? (
                            <pre className="whitespace-pre-wrap font-sans">
                                {JSON.stringify(order.shippingAddress, null, 2)}
                            </pre>
                        ) : 'Pick up / Default'}
                    </div>
                </div>
            </div>

            <div className="bg-[#1a4332] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-[0.2em] mb-4 opacity-70">
                    <CreditCard size={16} />
                    Transactional Data
                </div>
                <div className="mb-6">
                    <p className="text-xl font-bold mb-1">{order.paymentMethod || 'COD'}</p>
                    <p className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block ${
                        order.paymentStatus === 'PAID' ? 'bg-white/20 text-white' : 'bg-orange-500/20 text-orange-200'
                    }`}>
                        {order.paymentStatus || 'UNPAID'}
                    </p>
                </div>
                <p className="font-light leading-relaxed mb-6 opacity-80 italic text-sm">
                    Verified heritage fulfillment protocol active.
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <span className="font-bold tracking-widest text-sm uppercase">{order.status}</span>
                </div>
            </div>
          </div>
       </div>
    </div>
  );
}
