import React from 'react';

const ProductSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] p-4 border border-neutral-100 shadow-sm animate-pulse">
        <div className="w-full aspect-square bg-neutral-100 rounded-[2rem] mb-6" />
        <div className="px-2 space-y-4">
            <div className="h-4 bg-neutral-100 rounded-full w-2/3" />
            <div className="h-6 bg-neutral-100 rounded-full w-full" />
            <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-neutral-100 rounded-full w-1/4" />
                <div className="h-10 bg-neutral-100 rounded-full w-1/3" />
            </div>
        </div>
    </div>
);

export default function ShopLoading() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="h-16 bg-neutral-100 rounded-full w-64 mx-auto animate-pulse" />
                <div className="h-4 bg-neutral-100 rounded-full w-48 mx-auto animate-pulse" />
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar Skeleton */}
                <aside className="w-full lg:w-64 space-y-12">
                    <section>
                        <div className="h-8 bg-neutral-100 rounded-full w-32 mb-8 animate-pulse" />
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-12 bg-white border border-neutral-50 rounded-2xl w-full animate-pulse" />
                            ))}
                        </div>
                    </section>
                </aside>

                {/* Grid Skeleton */}
                <div className="flex-grow">
                    <div className="h-10 bg-neutral-100 rounded-full w-40 mb-10 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
