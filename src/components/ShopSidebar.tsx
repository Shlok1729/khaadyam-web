"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const ShopSidebar = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const activeSort = searchParams.get('sort') || 'newest';

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-700">
       <div className="sticky top-32 space-y-12">
          
          {/* Section: Categories */}
          <section>
             <div className="flex items-center gap-3 mb-8 text-neutral-900">
                <Filter size={18} className="text-[#1a4332]" />
                <h3 className="font-serif text-2xl font-bold tracking-tight">Handcrafted Categories</h3>
             </div>
             
             <div className="flex flex-wrap lg:flex-col gap-2">
                <button 
                   onClick={() => updateFilters('category', null)}
                   className={`group relative flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 w-full lg:w-auto text-left font-bold text-sm tracking-wide ${
                      !activeCategory 
                         ? 'bg-[#1a4332] text-white shadow-xl shadow-[#1a4332]/20' 
                         : 'bg-white text-neutral-500 hover:bg-neutral-50 border border-neutral-100'
                   }`}
                >
                   All Masterpieces
                   {!activeCategory && <div className="w-1.5 h-1.5 bg-white rounded-full ml-3" />}
                </button>

                {categories.map(cat => (
                   <button 
                      key={cat}
                      onClick={() => updateFilters('category', cat)}
                      className={`group relative flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 w-full lg:w-auto text-left font-bold text-sm tracking-wide ${
                         activeCategory === cat 
                            ? 'bg-[#1a4332] text-white shadow-xl shadow-[#1a4332]/20' 
                            : 'bg-white text-neutral-500 hover:bg-neutral-50 border border-neutral-100'
                      }`}
                   >
                      {cat}
                      {activeCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full ml-3" />}
                   </button>
                ))}
             </div>
          </section>

          {/* Section: Sort Options */}
          <section>
             <div className="flex items-center gap-3 mb-8 text-neutral-900">
                <SlidersHorizontal size={18} className="text-[#1a4332]" />
                <h3 className="font-serif text-2xl font-bold tracking-tight">Refine By</h3>
             </div>
             
             <div className="relative group">
                <select 
                    value={activeSort}
                    onChange={(e) => updateFilters('sort', e.target.value)}
                    className="w-full bg-white border border-neutral-100 rounded-[1.5rem] px-6 py-4 outline-none focus:ring-4 focus:ring-[#1a4332]/5 focus:border-[#1a4332] appearance-none font-bold text-neutral-600 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-[#1a4332] transition-colors">
                    <ChevronDown size={18} />
                </div>
             </div>
          </section>

          {/* Decorative Malnad Element */}
          <div className="p-8 rounded-[2.5rem] bg-[#1a4332]/5 border border-[#1a4332]/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a4332]/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
             <p className="font-serif text-lg font-bold text-[#1a4332] mb-2 relative z-10">Artisan Guarantee</p>
             <p className="text-neutral-500 text-xs font-medium leading-relaxed italic relative z-10">
                Every selection reflects the high standards of Malnad quality and heritage.
             </p>
          </div>
       </div>
    </aside>
  );
};
