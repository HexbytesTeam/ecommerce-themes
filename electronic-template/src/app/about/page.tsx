"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Globe, Rocket } from "lucide-react";

// Stats Component with counting effect
const StatCounter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
    const [count, setCount] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
                let start = 0;
                const end = value;
                const duration = 2000;
                const increment = end / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }}
            className="text-center"
        >
            <div className="text-5xl lg:text-7xl font-display font-black text-primary mb-2 italic">
                {count}{suffix}
            </div>
            <div className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">{label}</div>
        </motion.div>
    );
};

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
    const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section - Immersive Parallax */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    style={{ y: springY1 }}
                    className="absolute inset-0 z-0 opacity-40"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop"
                        alt="Technology Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/80 to-secondary z-0" />

                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                            <p className="text-primary font-black text-xs tracking-[0.5em] uppercase">ESTABLISHED 2024</p>
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter uppercase leading-[0.8] mb-12">
                            WE ARE <br />
                            <span className="text-primary italic">HexBytes</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-400 font-medium leading-relaxed mb-12">
                            Redefining the digital lifestyle through premium electronics and
                            unparalleled design philosophy.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/shop" className="inline-flex items-center gap-4 px-12 py-5 bg-primary text-secondary rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">
                                Explore Legacy
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </motion.div>
            </section>

            {/* Our Story Section */}
            <section className="py-32 bg-white relative">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                                <Image
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                                    alt="Our Vision"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <motion.div
                                style={{ y: springY2 }}
                                className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary rounded-[3rem] p-10 flex flex-col justify-end shadow-2xl z-10"
                            >
                                <Rocket className="text-secondary mb-4" size={40} />
                                <p className="text-secondary font-black text-xl leading-tight uppercase tracking-tight">
                                    Driving Innovation <br />
                                    <span className="text-white/60">Forward</span>
                                </p>
                            </motion.div>
                        </motion.div>

                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 bg-primary rounded-full"></div>
                                <p className="text-primary font-black text-xs tracking-[0.4em] uppercase">THE JOURNEY</p>
                            </div>
                            <h2 className="text-6xl font-display font-black text-secondary tracking-tight uppercase leading-[0.9]">
                                CRAFTING THE <br />
                                <span className="text-primary italic">FUTURE</span> OF TECH
                            </h2>
                            <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                                <p>
                                    HexBytes was born from a simple realization: electronics shouldn't just be functional; they should be a masterpiece of engineering and art.
                                </p>
                                <p>
                                    We strip away the noise and focus on the soul of technology. Our mission is to provide global citizens with gear that empowers their creativity and enhances every moment of their digital existence.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div className="space-y-2">
                                    <div className="text-3xl font-display font-black text-secondary italic">Visionary</div>
                                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">DESIGN LANGUAGE</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-display font-black text-secondary italic">Flawless</div>
                                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">USER EXPERIENCE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy / Values Grid */}
            <section className="py-32 bg-secondary relative overflow-hidden">
                {/* Animated Background Shapes */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />

                <div className="container relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                            <p className="text-primary font-black text-xs tracking-[0.4em] uppercase">OUR CORE</p>
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                        </div>
                        <h2 className="text-6xl font-display font-black text-white tracking-tight uppercase">
                            THE <span className="text-primary italic">PHILOSOPHY</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Cpu, title: "Precision", desc: "Every component selected for peak performance and longevity." },
                            { icon: ShieldCheck, title: "Integrity", desc: "Built on a foundation of trust and uncompromising quality." },
                            { icon: Zap, title: "Agility", desc: "Leading the market with lightning-fast innovation cycles." },
                            { icon: Globe, title: "Impact", desc: "Creating a positive footprint on the local and global scale." }
                        ].map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] group hover:border-primary/50 transition-all duration-500"
                            >
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                    <value.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4">{value.title}</h3>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section with Cinematic Effect */}
            <section className="py-40 bg-white">
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
                        <StatCounter value={10} label="YEARS OF EXCELLENCE" suffix="+" />
                        <StatCounter value={250} label="PREMIUM PRODUCTS" suffix="k" />
                        <StatCounter value={98} label="CUSTOMER SATISFACTION" suffix="%" />
                        <StatCounter value={12} label="GLOBAL FLAGSHIPS" suffix="" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-primary rounded-[4rem] p-16 lg:p-24 text-center relative overflow-hidden"
                    >
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--secondary)_1px,_transparent_1px)] bg-[length:24px_24px]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-secondary tracking-tight uppercase leading-none mb-10">
                                BE PART OF THE <br />
                                <span className="text-white italic">LEGACY</span>
                            </h2>
                            <p className="max-w-xl mx-auto text-secondary/70 font-bold mb-12">
                                Join thousands of creators and tech enthusiasts who have chosen HexBytes as their digital companion.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/shop" className="px-12 py-5 bg-secondary text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-secondary transition-all shadow-xl">
                                    Shop Now
                                </Link>
                                <Link href="/contact" className="px-12 py-5 border-2 border-secondary/20 text-secondary rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
