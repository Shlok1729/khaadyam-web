import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function BestsellersPage() {
    const products = await prisma.product.findMany({
        where: {
            badge: "BEST SELLER"
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return (
        <main className="min-h-screen bg-[#FAF9F6] selection:bg-[#1a4332] selection:text-white pb-24">
            {/* 1. DECORATIVE BACKGROUND BLOBS (Place these at the top) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Soft Frosty Green Glow */}
                <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#1a4332]/5 rounded-full blur-[120px]"></div>
                {/* Soft Warm Gold Glow */}
                <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
                {/* Subtle Noise/Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                {/* Page Header */}
                <div className="pt-32 pb-16 px-4 md:px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6">
                            Our Bestsellers
                        </h1>
                        <p className="text-neutral-500 max-w-2xl mx-auto font-light text-base leading-relaxed">
                            Discover the most loved traditional treats by our community. These time-tested favorites are the perfect way to experience the authentic taste of Malnad.
                        </p>
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
                            <p className="text-neutral-500 font-medium">No bestsellers added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
