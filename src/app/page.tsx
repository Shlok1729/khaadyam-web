import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const BESTSELLERS = [
  { id: 1, name: "Special Malnad Nippattu", price: 160, weight: "250g", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800", isNoGarlic: true },
  { id: 2, name: "Handmade Butter Chakli", price: 145, weight: "200g", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800", isSoldOut: true },
  { id: 3, name: "Classic Kodubale", price: 130, weight: "180g", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800", isNoOnion: true },
  { id: 4, name: "Spicy Banana Chips (Pepper)", price: 120, weight: "200g", image: "https://images.unsplash.com/photo-1613919113166-796c54d58232?q=80&w=800" },
];

const BEST_OF_MONTH = [
  { 
    id: 1, 
    name: "Kai Muruku", 
    price: 145, 
    description: "Rice flour, Urad dal, Butter", 
    image: "/Kai-Murukku.webp", 
    badge: "BEST SELLER" 
  },
  { 
    id: 2, 
    name: "Millet Mixture", 
    price: 180, 
    description: "Foxtail millet, Peanuts", 
    image: "/millet.jpg" 
  },
  { 
    id: 3, 
    name: "Besan Laddu", 
    price: 220, 
    description: "Ghee, Gram flour, Sugar", 
    image: "/laddo.jpg", 
    badge: "NEW",
    isSpecialTitle: true 
  },
  { 
    id: 4, 
    name: "Shenga Chutney", 
    price: 95, 
    description: "Peanuts, Red chili, Garlic", 
    image: "/shenga.webp", 
    isSoldOut: true 
  },
];

export default function Home() {
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
        <section className="py-24 bg-[#F3F6F4] border-t-0
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
              {BEST_OF_MONTH.map((product) => (
                <ProductCard key={product.id} {...product} />
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