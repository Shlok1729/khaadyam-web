import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2">Product Management</h1>
          <p className="text-neutral-500 font-light italic">Edit your malnad catalog and update inventory.</p>
        </div>
        <Link 
            href="/admin/products/new" 
            className="bg-[#1a4332] text-white font-bold px-8 py-4 rounded-3xl shadow-xl shadow-[#1a4332]/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Stock Status</th>
                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {products.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-neutral-400 italic">No products in catalog yet.</td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="object-cover w-full h-full text-[8px]" />
                      </div>
                      <span className="font-bold text-neutral-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-neutral-500 text-sm font-medium">{product.category || 'Uncategorized'}</td>
                  <td className="px-8 py-6 font-bold text-neutral-900">₹{product.price}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      product.isSoldOut 
                        ? 'bg-red-50 text-red-500 border border-red-100' 
                        : 'bg-[#1a4332]/5 text-[#1a4332] border border-[#1a4332]/10'
                    }`}>
                      {product.isSoldOut ? 'Sold Out' : 'Available'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${product.id}`} className="w-10 h-10 flex items-center justify-center bg-neutral-50 text-neutral-400 rounded-xl hover:bg-[#1a4332] hover:text-white transition-all shadow-sm">
                        <Edit2 size={16} />
                      </Link>
                      <button className="w-10 h-10 flex items-center justify-center bg-neutral-50 text-neutral-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <Trash2 size={16} />
                      </button>
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
