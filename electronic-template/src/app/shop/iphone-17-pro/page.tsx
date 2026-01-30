"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Share2,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    Zap,
    ShieldCheck,
    Truck,
    CreditCard,
    Heart,
    Info,
    CheckCircle2
} from "lucide-react";

// Mock Product Data representing the iPhone 17 from screenshot
const PRODUCT = {
    id: "iphone-17-pro",
    title: "Apple iPhone 17 (256GB Storage, Black)",
    brand: "Apple",
    price: 82900,
    mrp: 89900,
    rating: 5.0,
    reviews: 26,
    points: 622,
    description: "The next evolution of mobile technology. Featuring the A19 Bionic chip, an advanced triple-lens camera system, and a breathtaking ProMotion display.",
    variants: {
        storage: ["256 GB", "512 GB"],
        colors: [
            { name: "Black", hex: "#1c1c1e" },
            { name: "White", hex: "#f5f5f7" },
            { name: "Blue", hex: "#a7bad1" },
            { name: "Purple", hex: "#d1c4e9" },
            { name: "Green", hex: "#b2c5b2" }
        ]
    },
    images: [
        "https://m.media-amazon.com/images/I/71v2jvh6nML._AC_SL1500_.jpg", // Front & Back
        "https://m.media-amazon.com/images/I/61m6-N+pLJL._AC_SL1500_.jpg", // Profile
        "https://m.media-amazon.com/images/I/51r5I9f4oVL._AC_SL1500_.jpg", // Interaction
        "https://m.media-amazon.com/images/I/71H26rB+x8L._AC_SL1500_.jpg"  // Box
    ],
    offers: [
        { title: "5% Instant Discount", desc: "Up to ₹2,000 on ICICI Bank Credit", icon: CreditCard },
        { title: "7.5% Instant Discount", desc: "Up to ₹7,500 on American Express", icon: CreditCard },
        { title: "Flat ₹4,000 Instant Discount", desc: "On HDFC Bank Credit Card EMI", icon: CreditCard }
    ]
};

export default function ProductDetailPage() {
    const [selectedStorage, setSelectedStorage] = useState("256 GB");
    const [selectedColor, setSelectedColor] = useState(PRODUCT.variants.colors[0]);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    return (
        <main className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Breadcrumbs / Category Bar (Simplified) */}
                <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-12 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                    {["Mobiles, Tablets & Accessories", "Laptops & Accessories", "Home Appliances", "Kitchen Appliances", "TV & Entertainment", "Personal Care"].map(cat => (
                        <span key={cat} className="hover:text-primary cursor-pointer transition-colors">{cat}</span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

                    {/* Left: Image Gallery */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square bg-gray-50 rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden group"
                        >
                            <motion.img
                                key={activeImage}
                                src={PRODUCT.images[activeImage]}
                                alt={PRODUCT.title}
                                className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            />

                            {/* Gallery Controls */}
                            <button
                                onClick={() => setActiveImage(prev => (prev === 0 ? PRODUCT.images.length - 1 : prev - 1))}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setActiveImage(prev => (prev === PRODUCT.images.length - 1 ? 0 : prev + 1))}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 justify-center">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary opacity-100 scale-105" : "border-gray-100 opacity-50 hover:opacity-100"}`}
                                >
                                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-secondary text-white text-[9px] font-black uppercase tracking-widest">Best Seller</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 ml-2">5.0 ({PRODUCT.reviews} Ratings)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tighter mb-4 leading-tight">
                                {PRODUCT.title}
                            </h1>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-8">Visit the Apple store</button>

                            <div className="flex items-center justify-between py-6 border-y border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="compare" className="accent-secondary h-4 w-4" />
                                        <label htmlFor="compare" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer">Compare</label>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                                    <Share2 size={16} />
                                    <span className="uppercase tracking-widest">Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Configs */}
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Internal Storage</label>
                                <div className="flex gap-4">
                                    {PRODUCT.variants.storage.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedStorage(size)}
                                            className={`px-8 py-3.5 rounded-xl text-xs font-black transition-all ${selectedStorage === size ? "bg-secondary text-white shadow-xl shadow-secondary/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Color</label>
                                    <span className="text-[10px] font-black text-secondary uppercase">{selectedColor.name}</span>
                                </div>
                                <div className="flex gap-4">
                                    {PRODUCT.variants.colors.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-4 transition-all flex items-center justify-center ${selectedColor.name === color.name ? "border-primary scale-110" : "border-white shadow-sm"}`}
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {selectedColor.name === color.name && <CheckCircle2 size={12} className="text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-gray-50/50 rounded-[2.5rem] p-10 space-y-8 border border-gray-100">
                            <div className="flex items-baseline gap-4">
                                <h2 className="text-4xl font-display font-black text-secondary uppercase">
                                    MRP ₹{PRODUCT.price.toLocaleString()}
                                </h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(Incl. of all taxes)</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 py-2 border-b border-gray-100 text-sm font-bold text-secondary">
                                    <p>Std. EMI starting from <span className="text-primary italic font-black">₹3,901/mo</span> for 24 months.</p>
                                    <button className="text-secondary underline decoration-2 underline-offset-4 text-[10px] font-black uppercase tracking-widest">See EMI options</button>
                                </div>
                                <div className="flex items-center gap-3 text-secondary">
                                    <Zap size={18} className="text-primary" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Earn {PRODUCT.points} Points <Info size={12} className="inline ml-1 opacity-30" /></p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 items-center pt-4">
                                <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-widest">
                                    <CheckCircle2 size={16} />
                                    In Stock
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    <Truck size={16} />
                                    Free delivery by 1st February, 2026
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-secondary font-black px-2">-</button>
                                    <span className="w-12 text-center text-xs font-black text-secondary uppercase">Qty {quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="text-gray-400 hover:text-secondary font-black px-2">+</button>
                                </div>

                                <button className="p-4 bg-white border border-gray-200 rounded-2xl text-secondary hover:text-primary hover:border-primary transition-all shadow-sm">
                                    <Heart size={20} />
                                </button>

                                <button className="flex-1 min-w-[180px] px-8 py-5 border-2 border-secondary rounded-2xl text-secondary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-lg flex items-center justify-center gap-4">
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>

                                <button className="flex-1 min-w-[180px] px-8 py-5 bg-[#006b52] rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#004d3b] transition-all shadow-xl shadow-green-900/10 flex items-center justify-center">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Extra Deals */}
                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-primary" />
                                    <h3 className="text-sm font-black text-secondary uppercase tracking-[0.2em]">Extra Deals Available</h3>
                                </div>
                                <button className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-primary underline">See All</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PRODUCT.offers.map((offer, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group">
                                        <offer.icon size={20} className="text-primary mb-4" />
                                        <h4 className="text-[10px] font-black text-secondary uppercase mb-1">{offer.title}</h4>
                                        <p className="text-[9px] font-bold text-gray-400 leading-tight uppercase">{offer.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Dynamic Features Section (Matching Brand) */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { icon: Truck, title: "EXPRESS LOGISTICS", desc: "Same-Day secure delivery across metros" },
                            { icon: ShieldCheck, title: "PLATINUM CARE", desc: "Extended 2-year warranty included" },
                            { icon: CreditCard, title: "SECURE PAY", desc: "Military-grade encryption for all payments" },
                            { icon: Info, title: "TECH SUPPORT", desc: "Live 24/7 priority concierge access" }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <feature.icon size={32} className="text-secondary mb-6" />
                                <h4 className="text-[10px] font-black tracking-widest uppercase mb-2 text-secondary">{feature.title}</h4>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
