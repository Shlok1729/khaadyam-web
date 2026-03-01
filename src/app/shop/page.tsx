import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { X } from "lucide-react";

export default async function ShopPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = props.searchParams ? await props.searchParams : undefined;
    const categoryParam = searchParams?.category;
    const qParam = searchParams?.q;

    const category = typeof categoryParam === 'string' ? categoryParam : undefined;
    const q = typeof qParam === 'string' ? qParam : undefined;

    const products = await prisma.product.findMany({
        where: {
            ...(category ? { category } : {}),
            ...(q ? { name: { contains: q, mode: 'insensitive' } } : {})
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return (
        <main className="min-h-screen bg-[#FAF9F6] selection:bg-[#1a4332] selection:text-white pb-24">
            {/* 1. DECORATIVE BACKGROUND BLOBS */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#1a4332]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                {/* Page Header */}
                <div className="pt-32 pb-12 px-4 md:px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6">
                            Shop All
                        </h1>
                        <p className="text-neutral-500 max-w-2xl mx-auto font-light text-base leading-relaxed mb-8">
                            Explore our complete collection of heritage recipes, handcrafted with love and tradition.
                            Find the perfect snack for every occasion.
                        </p>

                        <SearchBar />

                        {(category || q) && (
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <span className="text-sm text-neutral-500">Filters Active:</span>
                                {category && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-800 text-sm rounded-full font-medium shadow-sm">
                                        {category}
                                    </span>
                                )}
                                {q && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-800 text-sm rounded-full font-medium shadow-sm">
                                        "{q}"
                                    </span>
                                )}
                                <Link href="/shop" className="text-sm font-medium text-[#1a4332] hover:underline flex items-center gap-1 ml-2">
                                    <X size={14} /> Clear All
                                </Link>
                            </div>
                        )}

                    </div>
                </div>

                {/* Product Grid */}
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} badge={product.badge || undefined} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-neutral-500 font-medium text-lg">No products found matching your search.</p>
                            <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-[#1a4332] text-white font-medium rounded-xl shadow-md hover:bg-[#143528] transition-colors">
                                View all products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
