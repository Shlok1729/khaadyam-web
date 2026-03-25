import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ShoppingBag, Clock, CheckCircle2, Truck, MoreHorizontal } from 'lucide-react';

import { OrderFilters } from '@/components/admin/OrderFilters';

export default async function AdminOrders(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const statusParam = typeof searchParams?.status === 'string' ? searchParams.status.toUpperCase() : undefined;
  const q = typeof searchParams?.q === 'string' ? searchParams.q : undefined;

  const orders = await prisma.order.findMany({
    where: {
      ...(statusParam ? { status: statusParam as any } : {}),
      ...(q ? {
        OR: [
          { id: isNaN(parseInt(q.replace('#KH-', ''))) ? undefined : parseInt(q.replace('#KH-', '')) },
          { user: { name: { contains: q, mode: 'insensitive' } } },
          { user: { email: { contains: q, mode: 'insensitive' } } },
        ].filter(Boolean) as any
      } : {})
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'PROCESSING': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'SHIPPED': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'DELIVERED': return 'bg-[#1a4332]/5 text-[#1a4332] border-[#1a4332]/10';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-100';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2 tracking-tight">Order Command Center</h1>
            <p className="text-neutral-500 font-light italic">Track and fulfill heritage pantry orders.</p>
        </div>
        <div className="bg-[#1a4332]/5 px-6 py-3 rounded-2xl border border-[#1a4332]/10">
            <span className="text-xs font-bold text-[#1a4332] uppercase tracking-[0.2em]">Total Orders: {orders.length}</span>
        </div>
      </div>

      <OrderFilters />

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Items</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Total</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {orders.length === 0 ? (
                <tr>
                   <td colSpan={7} className="px-8 py-20 text-center text-neutral-400 italic">No orders received yet.</td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-[#1a4332]">#KH-{order.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="font-bold text-neutral-900">{order.user?.name || 'Guest User'}</span>
                        <span className="text-xs text-neutral-400 font-medium">{order.user?.email || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-neutral-500 text-sm font-medium">{order.orderItems.length} Products</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-neutral-900">₹{order.totalAmount}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-neutral-500 text-xs font-medium">
                    {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                        <Link 
                            href={`/admin/orders/${order.id}`}
                            className="p-2 bg-neutral-50 hover:bg-[#1a4332] rounded-xl transition-all text-neutral-400 hover:text-white shadow-sm"
                        >
                            <MoreHorizontal size={20} />
                        </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
