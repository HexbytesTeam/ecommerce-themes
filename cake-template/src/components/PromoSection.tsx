"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromoSection() {
    return (
        <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 relative">
                        <div className="relative aspect-square max-w-md mx-auto rounded-[3rem] overflow-hidden group">
                            <Image src="/assets/hero.png" fill alt="Pro Baker" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">↗</div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-5xl font-serif font-bold mb-8">Welcome to HexBytes</h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Welcome to HexBytes, where we're committed to delivering high-quality desserts. Our goal is to ensure everyone has access to fresh, healthy, and affordable food regardless of their location, join us in creating a brighter future for all.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
