"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Box, Cpu, Headset, Laptop, Smartphone, Speaker, Watch, Camera, Gamepad2, Plane } from "lucide-react";

const CATEGORIES = [
    {
        name: "Laptops",
        slug: "laptops",
        image: "https://images.unsplash.com/photo-1496171333333-33206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
        count: "124 Products",
        icon: <Laptop size={24} />,
        description: "High-performance machines for work and play."
    },
    {
        name: "Headphones",
        slug: "headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        count: "86 Products",
        icon: <Headset size={24} />,
        description: "Immersive audio experience with noise cancellation."
    },
    {
        name: "Drones",
        slug: "drones",
        image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=800&auto=format&fit=crop",
        count: "42 Products",
        icon: <Plane size={24} />,
        description: "Capture the world from a new perspective."
    },
    {
        name: "Cameras",
        slug: "cameras",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        count: "65 Products",
        icon: <Camera size={24} />,
        description: "Professional gear for every visual storyteller."
    },
    {
        name: "Speakers",
        slug: "speakers",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
        count: "93 Products",
        icon: <Speaker size={24} />,
        description: "Fill your space with crystal clear sound."
    },
    {
        name: "Tablets",
        slug: "tablets",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
        count: "58 Products",
        icon: <Smartphone size={24} />,
        description: "The perfect balance of power and portability."
    },
    {
        name: "Watches",
        slug: "watches",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
        count: "112 Products",
        icon: <Watch size={24} />,
        description: "Sophisticated tech for your wrist."
    },
    {
        name: "Mobiles",
        slug: "mobiles",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
        count: "156 Products",
        icon: <Smartphone size={24} />,
        description: "Stay connected with the latest flagship devices."
    },
    {
        name: "Gaming",
        slug: "gaming",
        image: "https://images.unsplash.com/photo-1605898393051-1bb886047ecd?q=80&w=800&auto=format&fit=crop",
        count: "78 Products",
        icon: <Gamepad2 size={24} />,
        description: "Unleash your potential with high-end gaming gear."
    },
    {
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
        count: "245 Products",
        icon: <Cpu size={24} />,
        description: "Essential additions to enhance your setup."
    }
];

export default function CategoriesPage() {
    return (
        <main className="pt-32 pb-24 min-h-screen bg-[#f8f8f8]">
            <div className="container">
                {/* Header content */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-1.5 bg-primary rounded-full"></div>
                                <p className="text-primary font-black text-xs tracking-[0.4em] uppercase">HexBytes Universe</p>
                            </div>
                            <h1 className="text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight uppercase leading-[0.9]">
                                Browse Our <br />
                                <span className="text-primary italic">Categories</span>
                            </h1>
                            <p className="mt-8 text-lg text-gray-500 font-medium leading-relaxed">
                                Explore our curated selection of premium electronics across different categories.
                                From professional gear to lifestyle tech, find exactly what you need.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-black tracking-widest text-gray-400">
                            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
                            <span>/</span>
                            <span className="text-secondary">CATEGORIES</span>
                        </div>
                    </motion.div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                        >
                            <Link href={`/shop?category=${category.name}`} className="group block h-full">
                                <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-700">
                                    {/* Category Image */}
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                                    {/* Glass Card content */}
                                    <div className="absolute inset-x-8 bottom-8">
                                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg">
                                                    {category.icon}
                                                </div>
                                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">{category.count}</span>
                                            </div>

                                            <div className="space-y-2 mb-6">
                                                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">{category.name}</h3>
                                                <p className="text-sm text-white/70 font-medium line-clamp-2 leading-relaxed">
                                                    {category.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-primary group-hover:gap-5 transition-all">
                                                <span>Shop Catalog</span>
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
