"use client";

import { ALL_PRODUCTS } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function AccessoriesSection() {
    const accessories = ALL_PRODUCTS.filter(p => p.category === "Accessories").slice(0, 4);

    return (
        <section className="py-24 px-4 md:px-12 bg-gray-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
                <Sparkles size={400} className="text-brand-blue" />
            </div>

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <ScrollReveal direction="right">
                            <span className="text-brand-orange font-black uppercase text-xs tracking-[0.3em] mb-4 block">Essentials</span>
                            <h2 className="text-4xl md:text-6xl font-black text-brand-dark italic leading-tight">
                                Premium <br />
                                <span className="text-brand-blue underline decoration-brand-yellow">Accessories</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal direction="left">
                        <Link href="/shop?category=Accessories" className="group flex items-center gap-3 text-brand-dark font-black hover:text-brand-orange transition-colors">
                            Explore All Accessories
                            <div className="bg-brand-yellow p-2 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </div>
                        </Link>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {accessories.map((item, idx) => (
                        <ScrollReveal key={item.id} direction="up" delay={idx * 100}>
                            <div className="group bg-white rounded-[40px] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-brand-yellow/30 h-full flex flex-col">
                                <div className="relative aspect-square mb-8 bg-gray-50 rounded-[30px] overflow-hidden p-6 group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                    {item.badge && (
                                        <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            {item.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < Math.floor(item.rating) ? "fill-brand-yellow text-brand-yellow" : "text-gray-200"} />
                                        ))}
                                        <span className="text-[10px] font-bold text-gray-400 ml-1">({item.rating})</span>
                                    </div>
                                    <h3 className="text-lg font-black text-brand-dark mb-4 leading-snug group-hover:text-brand-blue transition-colors">
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex flex-col">
                                        {item.oldPrice && (
                                            <span className="text-xs text-gray-400 line-through font-bold">${item.oldPrice.toFixed(2)}</span>
                                        )}
                                        <span className="text-2xl font-black text-brand-dark">${item.price.toFixed(2)}</span>
                                    </div>
                                    <button className="bg-brand-dark text-white p-4 rounded-2xl hover:bg-brand-blue transition-all shadow-lg hover:-translate-y-1 active:scale-90">
                                        <ShoppingBag size={20} />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
