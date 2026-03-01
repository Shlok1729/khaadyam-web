"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize with current query or empty
    const [query, setQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        if (query.trim()) {
            currentParams.set('q', query.trim());
        } else {
            currentParams.delete('q');
        }

        router.push(`/shop?${currentParams.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto mb-10">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search traditional snacks, picks, sweets..."
                    className="w-full text-black pl-5 pr-12 py-3.5 rounded-full bg-white border border-neutral-200 
                     focus:outline-none focus:border-[#1a4332] focus:ring-1 focus:ring-[#1a4332]/20 
                     transition-all shadow-[0_4px_15px_rgba(0,0,0,0.03)]"
                />
                <button
                    type="submit"
                    className="absolute right-2 w-10 h-10 flex items-center justify-center bg-[#1a4332] text-white rounded-full 
                     hover:bg-[#143528] transition-colors shadow-sm"
                >
                    <Search size={18} strokeWidth={2} />
                </button>
            </div>
        </form>
    );
};
