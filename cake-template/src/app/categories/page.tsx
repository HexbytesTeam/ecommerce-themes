import { Suspense } from "react";

import ProductGrid from "@/components/ProductGrid";

export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-white">

            <div className="pt-32 pb-16 container mx-auto px-4 text-center">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Explore</p>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-slate-900">Our Categories</h1>
                <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Explore our wide range of premium sweets, from handcrafted cakes to delightful donuts.
                    Indulge in the finest flavors made with love.
                </p>
            </div>
            <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
                <ProductGrid />
            </Suspense>

        </main>
    );
}
