"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';

export const OrderFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status');
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get('q') || '');

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('q', searchTerm || null);
  };

  const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10 items-end">
      {/* Search Bar */}
      <div className="flex-grow w-full">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 block">Search Orders</label>
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#1a4332] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, Name or Email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-neutral-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-[#1a4332]/5 focus:border-[#1a4332] transition-all font-medium text-neutral-600 shadow-sm"
          />
        </form>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button 
          onClick={() => updateFilters('status', null)}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${!activeStatus ? 'bg-[#1a4332] text-white shadow-lg shadow-[#1a4332]/20' : 'bg-white text-neutral-400 border border-neutral-100 hover:bg-neutral-50'}`}
        >
          ALL
        </button>
        {statuses.map(status => (
          <button 
            key={status}
            onClick={() => updateFilters('status', status.toLowerCase())}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${activeStatus === status.toLowerCase() ? 'bg-[#1a4332] text-white shadow-lg shadow-[#1a4332]/20' : 'bg-white text-neutral-400 border border-neutral-100 hover:bg-neutral-50'}`}
          >
            {status}
          </button>
        ))}

        {(activeStatus || searchTerm) && (
            <button 
                onClick={() => {
                    setSearchTerm('');
                    router.push('/admin/orders');
                }}
                className="p-3 text-neutral-400 hover:text-red-500 transition-colors"
                title="Clear All Filters"
            >
                <X size={20} />
            </button>
        )}
      </div>
    </div>
  );
};
