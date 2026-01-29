"use client";

import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fff9fa]">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                    The Story Behind <br />
                    <span className="text-primary italic">HexBytes Bakery</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                    From a small kitchen to your favorite dessert destination, we've always been about the perfect blend of tradition and innovation.
                </p>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </section>
    );
}
