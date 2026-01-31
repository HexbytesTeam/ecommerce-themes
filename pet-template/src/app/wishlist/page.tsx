"use client";

import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FloatingFood from "@/components/FloatingFood";
import { Heart, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistPage() {
    const { wishlist } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter products that are in the wishlist
    const wishlistItems = ALL_PRODUCTS.filter(product => wishlist.includes(product.id));

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-white overflow-hidden pt-12 md:pt-20">
            <FloatingFood />

            <div className="container mx-auto px-4 md:px-12 pb-24 relative">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-50 p-2 rounded-xl text-red-500">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <span className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">Favorites Collection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-brand-dark italic leading-none">
                            My <span className="text-brand-blue">Wishlist</span>
                        </h1>
                    </div>

                    <div className="bg-brand-yellow/10 backdrop-blur-sm border border-brand-yellow/20 px-8 py-4 rounded-[30px] flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-1">Items Saved</p>
                            <p className="text-2xl font-black text-brand-dark leading-none">{wishlistItems.length}</p>
                        </div>
                        <div className="w-px h-10 bg-brand-yellow/30" />
                        <Sparkles className="text-brand-yellow animate-pulse" size={24} />
                    </div>
                </div>

                {/* Content Section */}
                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product, idx) => (
                            <div
                                key={product.id}
                                className="animate-in fade-in zoom-in duration-500"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-[50px] p-12 md:p-24 text-center border-2 border-dashed border-gray-100 animate-in fade-in zoom-in duration-700">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <Heart size={48} className="text-gray-200" />
                        </div>
                        <h2 className="text-3xl font-black text-brand-dark mb-4 italic">Your wishlist is empty</h2>
                        <p className="text-gray-400 font-bold max-w-md mx-auto mb-12">
                            Looks like you haven't found your favorite pet treats yet! Explore our premium collections and start saving.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-4 bg-brand-dark text-white px-10 py-5 rounded-[30px] font-black uppercase tracking-widest hover:bg-brand-blue transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group"
                        >
                            Start Shopping
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}

                {/* Recommended Section (Optional Polish) */}
                {wishlistItems.length > 0 && (
                    <div className="mt-32 pt-32 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-black text-brand-dark italic">People also <span className="text-brand-orange">Loved</span></h3>
                            <Link href="/shop" className="text-brand-blue font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2">
                                View Shop <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 hover:opacity-100 transition-opacity">
                            {ALL_PRODUCTS.filter(p => !wishlist.includes(p.id)).slice(0, 4).map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
