"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Brands() {
    const brands = [
        { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
        { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Sony_logo.svg" },
        { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "Bosch", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg" },
        { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container">
                <div className="flex flex-wrap items-center justify-center lg:justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {brands.map((brand) => (
                        <div key={brand.name} className="w-32 h-12 relative flex items-center justify-center">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain filter invert-0"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function BlogSection() {
    const posts = [
        {
            id: 1,
            title: "The Future of Smartwatches: What to Expect in 2026",
            excerpt: "From health monitoring to integration with AI, the smartwatch is evolving rapidly...",
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
            date: "Jan 25, 2026",
            author: "Admin",
            category: "Tech News"
        },
        {
            id: 2,
            title: "Audio Quality vs Convenience: Choosing the Right Headphones",
            excerpt: "We dive deep into the world of audiophile sound and wireless freedom...",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
            date: "Jan 22, 2026",
            author: "Jane Doe",
            category: "Gadgets"
        },
        {
            id: 3,
            title: "Top 5 Drones for Professional Photography under $1000",
            excerpt: "Capturing stunning aerial shots doesn't have to break the bank. Here are our picks...",
            image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=600&auto=format&fit=crop",
            date: "Jan 18, 2026",
            author: "John Smith",
            category: "Guides"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-2 h-12 bg-primary rounded-full"></div>
                        <div>
                            <p className="text-primary font-black text-xs tracking-[0.4em] uppercase mb-1">LATEST BLOGS</p>
                            <h2 className="text-5xl font-display font-black text-secondary tracking-tight">FROM THE JOURNAL</h2>
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/blog" className="px-10 py-4 rounded-full border-2 border-border font-black text-[10px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white hover:border-secondary transition-all flex items-center gap-3 group">
                            View All Posts
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group cursor-pointer"
                        >
                            <Link href="/blog" className="block">
                                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                    />
                                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl text-secondary text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-[0.2em] shadow-xl border border-white/20">
                                        {post.date}
                                    </div>
                                </div>
                                <div className="space-y-4 px-2">
                                    <p className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">{post.category}</p>
                                    <h3 className="text-2xl font-display font-black text-secondary group-hover:text-primary transition-colors leading-tight tracking-tight">
                                        {post.title}
                                    </h3>
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-secondary group-hover:text-primary transition-all"
                                    >
                                        <span>Read More</span>
                                        <div className="w-10 h-[2px] bg-secondary group-hover:bg-primary group-hover:w-16 transition-all duration-500"></div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
