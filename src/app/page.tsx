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
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800", 
    badge: "BEST SELLER" 
  },
  { 
    id: 2, 
    name: "Millet Mixture", 
    price: 180, 
    description: "Foxtail millet, Peanuts", 
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800" 
  },
  { 
    id: 3, 
    name: "Besan Laddu", 
    price: 220, 
    description: "Ghee, Gram flour, Sugar", 
    image: "https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=800", 
    badge: "NEW",
    isSpecialTitle: true 
  },
  { 
    id: 4, 
    name: "Shenga Chutney", 
    price: 95, 
    description: "Peanuts, Red chili, Garlic", 
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800", 
    isSoldOut: true 
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Announcement Bar */}
      <TopBar />

      {/* 2. Modern Single-Row Navbar */}
      <Navbar />

      {/* 3. Responsive Hero Section */}
      <Hero />
      
      {/* 4. Horizontal Scrolling Categories */}
      <CategoryGrid />

      {/* 5. Best of the Month Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Section Header: Centered & Minimalist */}
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
          
          {/* Product Grid: Responsive 1 to 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {BEST_OF_MONTH.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 text-center">
            <button className="text-brand-dark font-bold text-sm tracking-widest uppercase border-b-2 border-brand-dark pb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
              Discover All Bestsellers
            </button>
          </div>
        </div>
      </section>
      <Testimonials />
      <Footer />


      {/* Footer will be added here next */}
    </main>
  );
}