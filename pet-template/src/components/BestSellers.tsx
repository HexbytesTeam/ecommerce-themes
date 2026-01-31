"use client";

import ProductCard from "./ProductCard";
import { ALL_PRODUCTS } from "@/data/products";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

export default function BestSellers() {
    const foodProducts = ALL_PRODUCTS.filter(p => p.category !== "Accessories").slice(0, 3);

    return (
        <section className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
            <div className="container mx-auto">

                {/* Promotional Grid - Inspired by Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-24">

                    {/* Main Best Selling Vertical Banner */}
                    <BannerWrapper className="lg:col-span-5 h-[600px] bg-brand-blue rounded-[50px] overflow-hidden group">
                        <Link href="/shop" className="absolute inset-0 z-20">
                            <span className="sr-only">Shop Salmon & Chickens Food</span>
                        </Link>
                        <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                            <div>
                                <p className="text-white/80 font-bold italic mb-2">Try Our</p>
                                <h3 className="text-5xl font-black text-white leading-tight">BEST SELLING</h3>
                                <p className="text-brand-yellow font-black mt-2 tracking-widest italic">Salmon & Chickens Food</p>
                            </div>
                            <div className="w-full h-1/2 relative">
                                <Image
                                    src="/prod_bag.png"
                                    alt="Best Sellers"
                                    fill
                                    className="object-contain transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        {/* Wooden platform effect at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-amber-900/20 backdrop-blur-sm transform skew-y-3 translate-y-16"></div>
                    </BannerWrapper>

                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Upper Horizontal Banner */}
                        <BannerWrapper className="h-[285px] bg-brand-yellow rounded-[50px] overflow-hidden group flex items-center px-12 relative">
                            <div className="flex-1 z-10">
                                <div className="bg-white/90 text-brand-blue px-6 py-2 rounded-full inline-block font-black text-xl mb-4 shadow-xl">
                                    FOCO PET 60% OFF
                                </div>
                                <p className="text-brand-dark font-bold text-sm mb-6 flex items-center gap-2">
                                    <span className="opacity-60">Promo Code</span>
                                    <span className="text-brand-orange bg-white px-3 py-1 rounded-lg">GETITNOW</span>
                                </p>
                                <Link href="/shop" className="bg-brand-dark text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-blue transition-all">
                                    Shop Now
                                </Link>
                            </div>
                            <div className="w-1/2 h-full relative">
                                <Image src="/focopet_hero_pets.png" alt="Promo Dog" fill className="object-contain object-right transform group-hover:-translate-y-4 transition-transform duration-500" />
                            </div>
                        </BannerWrapper>

                        {/* Lower Horizontal Banner */}
                        <BannerWrapper className="h-[285px] bg-[#0A4D68] rounded-[50px] overflow-hidden group flex items-center px-12 relative border-4 border-white/10">
                            <div className="flex-1 z-10 text-white">
                                <h3 className="text-4xl font-black mb-4">FREE DELIVERY</h3>
                                <p className="text-xl font-bold opacity-80 mb-8 italic">In your first order</p>
                                <Link href="/shop" className="bg-brand-orange text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                                    <ArrowRight />
                                </Link>
                            </div>
                            <div className="w-1/3 h-1/2 relative bg-brand-orange/20 rounded-3xl p-8 transform rotate-12 group-hover:rotate-0 transition-transform">
                                <div className="bg-brand-yellow w-full h-full rounded-2xl animate-pulse"></div>
                                <div className="absolute top-1/2 left-0 w-full h-2 bg-brand-blue translate-y-[-50%]"></div>
                                <div className="absolute top-0 left-1/2 h-full w-2 bg-brand-blue translate-x-[-50%]"></div>
                            </div>
                        </BannerWrapper>
                    </div>
                </div>

                {/* Latest Items Showcase */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 italic">Premium Pet Food</h2>
                        <p className="text-gray-400 font-bold max-w-xl">
                            Welcome To FocoPet, Your Ultimate Online Pet Store In India! At FocoPet, We're More Than Just A Pet Shop Online – We're Your Partners In Pet Parenting.
                        </p>
                    </div>
                    <Link href="/shop" className="bg-brand-orange text-white px-10 py-4 rounded-[20px] font-black inline-flex items-center gap-3 hover:bg-brand-blue transition-all shadow-xl shadow-brand-orange/20 group">
                        See All Products <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {foodProducts.map(product => (
                        <div key={product.id} className="group">
                            <ProductCard {...product} rating={product.rating || 4.5} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BannerWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({});

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotX = (y - centerY) / 25;
        const rotY = (centerX - x) / 25;

        setTilt({
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: "transform 0.1s ease-out"
        });
    };

    const handleLeave = () => {
        setTilt({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: "transform 0.5s ease-out"
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={tilt}
            className={`relative transition-transform duration-500 cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
}
