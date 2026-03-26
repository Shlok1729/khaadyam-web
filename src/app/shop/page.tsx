import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { ShopSidebar } from "@/components/ShopSidebar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { X, LayoutGrid } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ShopPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = props.searchParams ? await props.searchParams : undefined;
    const categoryParam = searchParams?.category;
    const qParam = searchParams?.q;
    const sortParam = searchParams?.sort;

    const category = typeof categoryParam === 'string' ? categoryParam : undefined;
    const q = typeof qParam === 'string' ? qParam : undefined;
    const sort = typeof sortParam === 'string' ? sortParam : 'newest';

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_low') orderBy = { price: 'asc' };
    if (sort === 'price_high') orderBy = { price: 'desc' };

    const products = await prisma.product.findMany({
        where: {
            ...(category ? { category } : {}),
            ...(q ? { name: { contains: q, mode: 'insensitive' } } : {})
        },
        orderBy
    });

    const categoriesRaw = await prisma.product.findMany({
        select: { category: true },
        distinct: ['category']
    });
    const categories = categoriesRaw.map(c => c.category).filter(Boolean) as string[];

    return (
        <main className="min-h-screen bg-[#FAF9F6] selection:bg-[#1a4332] selection:text-white pb-24">
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#1a4332]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                <div className="pt-32 pb-12 px-4 md:px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight">
                            Heritage Collection
                        </h1>
                        <p className="text-neutral-500 max-w-xl mx-auto font-light text-lg italic leading-relaxed mb-10">
                            Explore our complete collection of curated recipes, <br className="hidden md:block" /> handcrafted with authenticity and tradition.
                        </p>

                        <div className="mb-10 max-w-2xl mx-auto">
                            <SearchBar />
                        </div>

                        {(category || q) && (
                            <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Filters:</span>
                                {category && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a4332] text-white text-xs rounded-full font-bold shadow-lg shadow-[#1a4332]/20">
                                        {category}
                                    </span>
                                )}
                                {q && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a4332] text-white text-xs rounded-full font-bold shadow-lg shadow-[#1a4332]/20">
                                        "{q}"
                                    </span>
                                )}
                                <Link href="/shop" className="text-xs font-bold text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1.5 ml-2 uppercase tracking-widest">
                                    <X size={14} /> Reset
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <ShopSidebar categories={categories} />

                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-10 pb-6 border-b border-neutral-100">
                                <div className="flex items-center gap-3 font-serif">
                                    <LayoutGrid size={20} className="text-[#1a4332]" />
                                    <span className="text-xl font-bold text-neutral-900">{products.length} {products.length === 1 ? 'Selection' : 'Selections'} Found</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                {products.map((product) => (
                                    <div key={product.id} className="h-full">
                                        <ProductCard {...product} badge={product.badge || undefined} />
                                    </div>
                                ))}
                            </div>

                            {products.length === 0 && (
                                <div className="text-center py-32 bg-white rounded-[4rem] border border-neutral-100 shadow-sm transition-all hover:shadow-xl">
                                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <X size={32} className="text-neutral-300" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">No flavors found</h3>
                                    <p className="text-neutral-400 font-light italic mb-8">Try adjusting your filters or search terms.</p>
                                    <Link href="/shop" className="inline-block px-10 py-4 bg-[#1a4332] text-white font-bold rounded-2xl shadow-xl shadow-[#1a4332]/20 hover:scale-105 transition-all">
                                        View All Masterpieces
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}
