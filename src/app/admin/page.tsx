import React from 'react';
import { prisma } from '@/lib/prisma';
import { Package, ShoppingCart, IndianRupee, Users } from 'lucide-react';

export default async function AdminDashboard() {
  const [productCount, orderCount, totalRevenueResult, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.user.count(),
  ]);

  const stats = [
    { label: 'Total Products', value: productCount, icon: <Package size={24} />, color: 'bg-blue-600' },
    { label: 'Total Orders', value: orderCount, icon: <ShoppingCart size={24} />, color: 'bg-emerald-600' },
    { label: 'Total Revenue', value: `₹${totalRevenueResult._sum.totalAmount || 0}`, icon: <IndianRupee size={24} />, color: 'bg-orange-600' },
    { label: 'Total Users', value: userCount, icon: <Users size={24} />, color: 'bg-indigo-600' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2">Dashboard Overview</h1>
        <p className="text-neutral-500 font-light italic">Insights into your heritage pantry's growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.03] rounded-bl-[4rem] group-hover:scale-110 transition-transform`} />
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-${stat.color.split('-')[1]}-200 mb-6`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100">
            <h3 className="font-serif text-2xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-6">
                <p className="text-neutral-400 text-sm italic">Fulfillment reports and system logs will appear here.</p>
            </div>
         </div>
         <div className="bg-[#1a4332] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <h3 className="font-serif text-2xl font-bold mb-4 relative z-10">Administrative Notice</h3>
            <p className="text-white/70 font-light leading-relaxed mb-8 relative z-10">
                Welcome to the Khaadyam management suite. Here you can curate the product catalog, monitor daily fulfillments, and manage your growing malnad community.
            </p>
            <button className="bg-white text-[#1a4332] font-bold px-8 py-3.5 rounded-2xl relative z-10 hover:bg-neutral-100 transition-colors">Generate Report</button>
         </div>
      </div>
    </div>
  );
}
