"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
    { name: "Laptops & Computers", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop" },
    { name: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=200&auto=format&fit=crop" },
    { name: "Smart TV & Video", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop" },
    { name: "Mobile Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop" },
    { name: "Smartwatch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop" },
    { name: "Home Audio", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=200&auto=format&fit=crop" },
    { name: "Video Games", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=200&auto=format&fit=crop" },
    { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" },
    { name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1526733158272-4403bc660361?q=80&w=200&auto=format&fit=crop" },
];

export function Categories() {
    return (
        <section className="py-20 bg-white">
            <div className="container overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-2 h-12 bg-primary rounded-full"></div>
                        <div>
                            <p className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-1">EXPLORE ITEMS</p>
                            <h2 className="text-5xl font-display font-black text-secondary uppercase tracking-tight">TOP CATEGORIES</h2>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/categories" className="px-10 py-4 rounded-full border-2 border-border font-black text-[10px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white hover:border-secondary transition-all flex items-center gap-3 group">
                            View All
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-16 gap-x-8">
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                        >
                            <Link
                                href={`/shop?category=${category.name.split(' ')[0].toLowerCase()}`}
                                className="flex flex-col items-center gap-6 group"
                            >
                                <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-4 border-white group-hover:border-primary transition-all duration-700 bg-gray-50">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                                <div className="space-y-2 text-center">
                                    <h3 className="text-[10px] font-black text-secondary group-hover:text-primary transition-colors tracking-[0.2em] uppercase px-2">
                                        {category.name}
                                    </h3>
                                    <div className="w-4 h-0.5 bg-border mx-auto group-hover:w-12 group-hover:bg-primary transition-all duration-500"></div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
