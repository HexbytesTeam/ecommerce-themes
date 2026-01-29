import React from "react";

import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import PromoSection from "@/components/PromoSection";
import ProductGrid from "@/components/ProductGrid";
import ProductMarquee from "@/components/ProductMarquee";
import { products } from "@/lib/product-data";


export default function Home() {
    return (
        <main className="min-h-screen bg-transparent relative">
            <Hero />
            <CategorySection />

            {/* Best Sellers */}
            <React.Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <ProductMarquee title="Best Sellers" products={products.filter(p => p.isBestSeller)} />
            </React.Suspense>

            {/* Featured Products */}
            <React.Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <ProductMarquee title="Featured Products" products={products.filter(p => p.isFeatured)} />
            </React.Suspense>

            {/* New Arrivals */}
            <React.Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <ProductMarquee title="New Arrivals" products={products.filter(p => p.isNew)} />
            </React.Suspense>

            {/* Brand Section Shorthand */}
            <section className="py-20 bg-[#fff9fa]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="text-4xl font-serif font-black">Best Foods.</div>
                        <div className="text-4xl font-serif italic font-bold">freego</div>
                        <div className="text-4xl font-serif flex items-center gap-1">GO <span className="text-primary tracking-tighter">||</span> FOOD</div>
                    </div>
                </div>
            </section>


        </main>
    );
}
