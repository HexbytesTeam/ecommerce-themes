"use client";

import { Product } from "@/lib/product-data";
import ProductCard from "./ProductCard";

interface ProductMarqueeProps {
    title: string;
    products: Product[];
}

export default function ProductMarquee({ title, products }: ProductMarqueeProps) {
    if (!products || products.length === 0) return null;

    // Duplicate products to create a seamless loop
    const marqueeProducts = [...products, ...products, ...products];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-center lg:text-left">
                    {title}
                </h2>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                <div
                    className="flex gap-8 w-max animate-scroll pause-on-hover hover:cursor-grab active:cursor-grabbing"
                    style={{ animationDuration: `${products.length * 5}s` }} // Adjust speed based on item count
                >
                    {marqueeProducts.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
