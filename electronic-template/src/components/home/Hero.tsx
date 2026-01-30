"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth the mouse movement
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Define movements for different elements
    const moveX = useTransform(springX, [0, 1000], [-15, 15]);
    const moveY = useTransform(springY, [0, 1000], [-15, 15]);

    const moveXReverse = useTransform(springX, [0, 1000], [15, -15]);
    const moveYReverse = useTransform(springY, [0, 1000], [15, -15]);

    const floatingX = useTransform(springX, [0, 1000], [-40, 40]);
    const floatingY = useTransform(springY, [0, 1000], [-40, 40]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-32 min-h-[85vh] flex items-center">
            {/* Live Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] animate-pulse-soft delay-1000"></div>

                {/* Floating Abstract Shapes with Mouse Tracking */}
                <motion.div
                    style={{ x: floatingX, y: floatingY, rotate: 15 }}
                    className="absolute top-1/4 right-[20%] w-24 h-24 border-2 border-primary/20 rounded-3xl hidden lg:block opacity-40"
                ></motion.div>
                <motion.div
                    style={{ x: moveXReverse, y: moveYReverse, rotate: -10 }}
                    className="absolute bottom-1/4 left-[15%] w-32 h-32 border border-secondary/10 rounded-full hidden lg:block opacity-20"
                ></motion.div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-10 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase">
                                <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                ></motion.span>
                                NEW COLLECTION 2026
                            </div>
                            <h1 className="text-6xl lg:text-[100px] font-display font-black text-secondary leading-[0.85] tracking-tighter">
                                50% OFF ON <br />
                                <span className="text-primary italic relative">
                                    SMART
                                    <motion.span
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="absolute bottom-2 left-0 h-2 bg-primary/20 -z-10"
                                    ></motion.span>
                                </span> WATCH
                            </h1>
                            <p className="text-xl lg:text-2xl font-medium text-gray-400 tracking-tight max-w-lg">
                                Experience the future of wearable technology with our premium white edition.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/shop" className="block bg-secondary hover:bg-primary hover:text-secondary text-white px-12 py-5 font-bold text-sm tracking-[0.2em] transition-all uppercase shadow-2xl shadow-secondary/20">
                                    SHOP NOW
                                </Link>
                            </motion.div>
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <span className="w-10 h-[1px] bg-gray-300 group-hover:w-16 group-hover:bg-primary transition-all duration-500"></span>
                                <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-secondary uppercase transition-colors">View Details</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Content - Lifestyle Merger with Parallax */}
                    <div className="flex-1 relative w-full lg:w-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ x: moveX, y: moveY }}
                            className="relative aspect-square w-full max-w-[800px] mx-auto group"
                        >
                            <div className="absolute inset-4 border border-secondary/5 rounded-[4rem] group-hover:inset-0 transition-all duration-1000"></div>
                            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1508685096489-7aacd29f27f9d?q=80&w=2000&auto=format&fit=crop"
                                    alt="Premium Lifestyle Smartwatch"
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                                {/* Inner Card Overlay */}
                                <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-white">
                                    <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60">Price</span>
                                    <span className="text-4xl font-display font-black">$299.00</span>
                                </div>
                            </div>

                            {/* Interactive Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                style={{ x: moveXReverse, y: moveYReverse }}
                                className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl hidden lg:block border border-white/20"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center">
                                        <div className="text-primary font-black text-2xl">5.0</div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-secondary uppercase tracking-wider mb-1">Excellent Rating</p>
                                        <p className="text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase">Trusted by 10k+ users</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
