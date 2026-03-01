import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function StoryPage() {
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
                <div className="pt-32 pb-16 px-4 md:px-6">
                    <div className="container mx-auto text-center">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#1a4332] uppercase mb-4 block">
                            Heritage & History
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6">
                            Our Story
                        </h1>
                        <p className="text-neutral-500 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
                            Rooted in the lush, green landscapes of Malnad, Khaadyam is more than just a brand. It is a tribute to our ancestors and the timeless recipes they perfected over generations.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm border-y border-neutral-200/30">
                    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1000"
                                    alt="Traditional Indian Snacks Preparation"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col gap-6">
                                <h2 className="font-serif text-3xl md:text-4xl font-medium text-neutral-900">
                                    The Essence of Tradition
                                </h2>
                                <div className="text-neutral-600 font-light leading-relaxed space-y-4">
                                    <p>
                                        Every snack we craft carries the aroma of nostalgia. Using ingredients sourced closely from local farmers and prepared with unyielding devotion to authentic methods, our kitchen brings the true taste of heritage straight to your table.
                                    </p>
                                    <p>
                                        From the perfectly spiced Special Malnad Nippattu to the melt-in-your-mouth Besan Laddus, we ensure that every bite resonates with the purity of traditional Indian homes. No artificial preservatives, just honest food made with love.
                                    </p>
                                    <p>
                                        Khaadyam stands as a bridge between the glorious culinary past and the present, preserving recipes that might otherwise be forgotten. Thank you for being a part of our journey.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                
            </div>
            <Footer />
        </main>
    );
}
