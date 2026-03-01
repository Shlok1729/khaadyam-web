import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: {
      isBestOfMonth: true
    }
  });

  return (
    <main className="min-h-screen bg-[#FAF9F6] selection:bg-[#1a4332] selection:text-white">
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
        <Hero />

        {/* Category Grid Section - Give it a slightly different tint to separate it */}
        <div className="bg-white/30 backdrop-blur-sm border-y border-neutral-200/30">
          <CategoryGrid />
        </div>

        {/* Best of the Month - This will now sit on the off-white background */}
        <section className="py-24 md:py-16 bg-[#F3F6F4] border-t-0
  bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png')] bg-repeat">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#1a4332] uppercase mb-4 block">
                Curated Collection
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-medium text-neutral-900 mb-6">
                Best of the Month
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed">
                Authentic recipes that have stood the test of time, now delivered fresh to your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} badge={product.badge || undefined} />
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}