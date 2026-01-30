"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BANNERS = [
    {
        title: "Master the Sound",
        subtitle: "Experience crystal clear audio with our new soundbars.",
        price: "Starting at $199",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
        color: "bg-[#111111]",
        textColor: "text-white",
        span: "col-span-1 lg:col-span-2",
    },
    {
        title: "Play without Limits",
        subtitle: "New PS5 controllers in stock.",
        price: "Buy Now",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=600&auto=format&fit=crop",
        color: "bg-[#2d46b9]",
        textColor: "text-white",
        span: "col-span-1",
    },
    {
        title: "IPhone 15 Pro",
        subtitle: "Forged in titanium. Save 20% today.",
        price: "Shop Now",
        image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop",
        color: "bg-[#333333]",
        textColor: "text-white",
        span: "col-span-1",
    },
    {
        title: "Professional Gear",
        subtitle: "Microphones for studio quality recordings.",
        price: "View Collection",
        image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=800&auto=format&fit=crop",
        color: "bg-primary",
        textColor: "text-secondary",
        span: "col-span-1 lg:col-span-2",
    },
];

export function PromoBanners() {
    return (
        <section className="py-24 bg-white">
            <div className="container overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BANNERS.map((banner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className={`${banner.span} group`}
                        >
                            <Link
                                href="/shop"
                                className={`${banner.color} rounded-[3rem] overflow-hidden relative min-h-[350px] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] block h-full`}
                            >
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
                                </div>

                                <div className={`relative z-10 p-12 h-full flex flex-col justify-center max-w-sm ${banner.textColor}`}>
                                    <h3 className="text-4xl font-display font-black mb-4 leading-tight uppercase italic tracking-tighter shadow-sm">{banner.title}</h3>
                                    <p className="text-sm opacity-80 mb-8 font-medium tracking-wide leading-relaxed">{banner.subtitle}</p>
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] group/btn cursor-pointer"
                                    >
                                        <span className="border-b-2 border-current pb-1 transition-all">{banner.price}</span>
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
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
