"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    ChevronRight, 
    Minus, 
    Plus, 
    ShoppingBag, 
    Check, 
    ArrowLeft,
    Leaf,
    ShieldCheck,
    Truck,
    Clock,
    Heart
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { ProductCard } from '@/components/ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    weight: string;
    image: string;
    category?: string | null;
    badge?: string | null;
    longDescription?: string | null;
    ingredients?: string | null;
    nutritionalInfo?: string | null;
    shelfLife?: string | null;
    images: string[];
}

export default function ProductView({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const { data: session } = useSession();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState('story');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFavoriting, setIsFavoriting] = useState(false);

    useEffect(() => {
        if (session?.user) {
            fetch('/api/favorites')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const found = data.find((f: any) => f.productId === product.id);
                        setIsFavorite(!!found);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [session, product.id]);

    const toggleFavorite = async () => {
        if (!session) {
            alert("Please login to save favorites");
            return;
        }
        setIsFavoriting(true);
        try {
            if (isFavorite) {
                await fetch(`/api/favorites?productId=${product.id}`, { method: 'DELETE' });
                setIsFavorite(false);
            } else {
                await fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product.id })
                });
                setIsFavorite(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsFavoriting(false);
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const breadcrumbs = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: product.category || 'Product', href: `/shop?category=${product.category}` },
        { name: product.name, href: '#' },
    ];

    return (
        <div className="container mx-auto px-4 md:px-10 max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={crumb.name}>
                        {i > 0 && <ChevronRight size={10} />}
                        <Link 
                            href={crumb.href}
                            className={`${i === breadcrumbs.length - 1 ? 'text-[#1a4332] font-bold' : 'hover:text-neutral-600 transition-colors'}`}
                        >
                            {crumb.name}
                        </Link>
                    </React.Fragment>
                ))}
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left: Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                            priority
                        />
                        {product.badge && (
                            <div className="absolute top-6 left-6">
                                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-xl 
                                    ${product.badge === 'NEW' ? 'bg-[#1a4332] text-white' : 'bg-white text-neutral-800'}`}>
                                    {product.badge}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col h-full">
                    <div className="mb-8">
                        <p className="text-[10px] font-bold text-[#1a4332] uppercase tracking-[0.3em] mb-3">
                            {product.category || 'Traditional Recipes'}
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-6 mb-6">
                            <span className="text-3xl font-bold text-neutral-900 font-serif">₹{product.price}</span>
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-500 text-sm rounded-full font-medium">
                                {product.weight}
                            </span>
                        </div>
                        <p className="text-neutral-500 font-light text-lg leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 pt-6 border-t border-neutral-100">
                        <div className="flex items-center bg-white border border-neutral-200 rounded-2xl px-2 py-2 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 text-neutral-500 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-12 text-center text-lg font-bold text-neutral-900">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 text-neutral-500 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex-grow h-[60px] flex items-center justify-center gap-3 rounded-2xl font-bold text-base transition-all shadow-xl active:scale-[0.98]
                                ${isAdded 
                                    ? 'bg-[#1a4332] text-white' 
                                    : 'bg-[#1a4332] text-white hover:bg-[#143528] shadow-[#1a4332]/20'}`}
                        >
                            {isAdded ? (
                                <>
                                    <Check size={20} strokeWidth={3} />
                                    Added to Basket
                                </>
                            ) : (
                                <>
                                    <ShoppingBag size={20} />
                                    Add to Basket — ₹{product.price * quantity}
                                </>
                            )}
                        </button>
                        <button 
                            onClick={toggleFavorite}
                            disabled={isFavoriting}
                            className={`w-[60px] h-[60px] flex items-center justify-center rounded-2xl border-2 transition-all active:scale-[0.95]
                                ${isFavorite 
                                    ? 'bg-red-50 border-red-100 text-red-500' 
                                    : 'border-neutral-100 text-neutral-400 hover:border-red-100 hover:text-red-400'}`}
                        >
                            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} className={isFavoriting ? "animate-pulse" : ""} />
                        </button>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <Feature icon={<Leaf size={18} className="text-[#1a4332]" />} label="Natural & Pure" />
                        <Feature icon={<ShieldCheck size={18} className="text-[#1a4332]" />} label="Quality Assured" />
                        <Feature icon={<Truck size={18} className="text-[#1a4332]" />} label="Fast Delivery" />
                        <Feature icon={<Clock size={18} className="text-[#1a4332]" />} label="Freshly Made" />
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-auto">
                        <div className="flex border-b border-neutral-100 gap-8 mb-6">
                            <TabTrigger 
                                active={activeTab === 'story'} 
                                onClick={() => setActiveTab('story')} 
                                label="Heritage Story" 
                            />
                            <TabTrigger 
                                active={activeTab === 'info'} 
                                onClick={() => setActiveTab('info')} 
                                label="Details" 
                            />
                        </div>
                        
                        <div className="min-h-[150px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {activeTab === 'story' ? (
                                <div className="space-y-4">
                                    <p className="text-neutral-500 font-light leading-relaxed">
                                        {product.longDescription || "This recipe has been passed down through generations, capturing the authentic flavors of Malnad kitchens. Handcrafted in small batches to ensure each bite carries the warmth of tradition."}
                                    </p>
                                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                                        <p className="text-orange-800 text-sm font-medium italic">
                                            "Our aim is to bring back the lost tastes of our ancestors, using only heirloom ingredients sourced from local farms."
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    <InfoItem label="Ingredients" value={product.ingredients || "Heirloom Grains, Hand-pounded Spices, Jaggery, Love."} />
                                    <InfoItem label="Shelf Life" value={product.shelfLife || "90 Days from manufacturing"} />
                                    <InfoItem label="Storage" value="Store in a cool, dry place inside an airtight container." />
                                    <InfoItem label="Category" value={product.category || "Heritage Snacks"} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-32 pt-20 border-t border-neutral-100">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-[10px] font-bold text-[#1a4332] uppercase tracking-[0.3em] mb-3">You might also enjoy</p>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">Related Flavors</h2>
                        </div>
                        <Link href="/shop" className="text-[#1a4332] font-bold text-sm hover:underline hidden sm:block">
                            View All Shop
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p: any) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Feature({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-neutral-50 shadow-sm">
            <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <span className="text-sm font-bold text-neutral-700">{label}</span>
        </div>
    );
}

function TabTrigger({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button 
            onClick={onClick}
            className={`pb-4 text-sm font-bold tracking-wider uppercase transition-all relative
                ${active ? 'text-[#1a4332]' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
            {label}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a4332] rounded-full" />
            )}
        </button>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#1a4332] uppercase tracking-widest">{label}</span>
            <p className="text-neutral-700 font-medium">{value}</p>
        </div>
    );
}
