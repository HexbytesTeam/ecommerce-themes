"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FloatingFood from "@/components/FloatingFood";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, Trophy, Heart, Gift, ArrowRight } from "lucide-react";

export default function ToysPage() {
    const toys = ALL_PRODUCTS.filter(p => p.category === "Toys");

    return (
        <main className="min-h-screen pt-24 pb-24 bg-white relative overflow-hidden">
            {/* Playful Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-yellow rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-brand-orange rounded-full blur-[120px] animate-pulse delay-700"></div>
                <FloatingFood />
            </div>

            {/* Hero Section */}
            <section className="relative px-4 md:px-12 mb-20 z-10">
                <div className="container mx-auto">
                    <div className="bg-brand-orange rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl border-4 border-white/10">
                        {/* Decorative Patterns */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                            <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-white rounded-[40px] rotate-45"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <ScrollReveal direction="down">
                                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                                    <Sparkles size={16} />
                                    Playtime Perfection
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black text-white italic mb-8 leading-tight">
                                    Unlock Their <br />
                                    <span className="text-brand-yellow underline decoration-white">Wild Side</span>
                                </h1>
                                <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-10">
                                    From high-energy fetch to cozy plushies, our curated collection of toys keeps your pets active, happy, and entertained for hours.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md text-white font-bold">
                                        <Trophy size={20} className="text-brand-yellow" />
                                        Durable Materials
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md text-white font-bold">
                                        <Heart size={20} className="text-red-400 fill-red-400" />
                                        Pet Safe
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md text-white font-bold">
                                        <Gift size={20} className="text-brand-blue" />
                                        Boredom Busters
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Toys Grid */}
            <section className="px-4 md:px-12 mb-24 z-10">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-4 italic">Joy in Every Squeak</h2>
                            <p className="text-gray-400 font-bold max-w-xl">
                                Browse our collection of toys designed for dogs, cats, and all your furry companions. Quality tested for maximum fun.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-brand-dark">
                            <span>{toys.length} Premium Toys</span>
                            <div className="w-12 h-[2px] bg-brand-yellow"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {toys.map((toy, idx) => (
                            <ScrollReveal key={toy.id} direction="up" delay={idx * 100}>
                                <div className="h-full">
                                    <ProductCard {...toy} rating={toy.rating || 4.5} />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Toy Banner */}
            <section className="px-4 md:px-12 z-10 mb-24">
                <div className="container mx-auto">
                    <ScrollReveal direction="up">
                        <div className="bg-brand-blue rounded-[50px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none scale-150">
                                <Trophy size={200} className="text-white" />
                            </div>

                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 animate-float">
                                <Image
                                    src="/cat_dog.png"
                                    alt="Best Selling Toy"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>

                            <div className="relative z-10 max-w-xl text-center md:text-left">
                                <span className="text-brand-yellow font-black uppercase text-xs tracking-[0.4em] mb-4 block">Limited Edition</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">The Ultimate Adventure Bundle</h2>
                                <p className="text-white/70 text-lg mb-8 font-medium">
                                    Get our three top-rated interactive toys in one exclusive gift box. Perfect for new pet parents or birthday surprises!
                                </p>
                                <Link href="/shop" className="bg-white text-brand-blue px-10 py-5 rounded-[25px] font-black text-lg inline-flex items-center gap-3 hover:bg-brand-yellow hover:text-brand-dark transition-all shadow-xl group">
                                    Claim This Offer <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
}
