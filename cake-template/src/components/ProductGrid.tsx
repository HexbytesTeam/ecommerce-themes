"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { products as allProducts, Product } from "@/lib/product-data";
import { X } from "lucide-react";

interface ProductGridProps {
    title?: string;
    products?: Product[];
    hideFilters?: boolean;
}

export default function ProductGrid({ title, products, hideFilters = false }: ProductGridProps) {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const router = useRouter();

    const filteredProducts = products
        ? products
        : (category
            ? allProducts.filter(p => p.category === category)
            : allProducts);

    return (
        <section id="products" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                            {title || (category ? `${category} Collection` : "All Collection")}
                        </h2>
                        {!hideFilters && category && (
                            <button
                                onClick={() => router.push("/#products")}
                                className="px-4 py-2 bg-pink-50 text-primary rounded-full text-sm font-bold hover:bg-pink-100 transition-colors flex items-center gap-2"
                            >
                                Clear Filter <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p, i) => (
                            <ProductCard key={i} {...p} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-muted-foreground">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
