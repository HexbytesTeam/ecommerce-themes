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
import { useParams, useRouter } from "next/navigation";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";
import { useCompare } from "@/context/CompareContext";
import { CompareModal } from "@/components/compare/CompareModal";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const idStr = params?.id as string;

    // Find product by numeric ID or slug ID
    const product = ALL_PRODUCTS.find(p => String(p.id) === idStr) || ALL_PRODUCTS[ALL_PRODUCTS.length - 1];

    const storageOptions = ["256 GB", "512 GB"];
    const colorOptions = [
        { name: "Tech Black", hex: "#1c1c1e" },
        { name: "Lunar White", hex: "#f5f5f7" },
        { name: "Cosmic Blue", hex: "#a7bad1" }
    ];

    const [selectedStorage, setSelectedStorage] = useState(storageOptions[0]);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showEmiModal, setShowEmiModal] = useState(false);
    const [isCompareChecked, setIsCompareChecked] = useState(isInCompare(product.id));

    // EMI Plans with different tenures
    const emiPlans = [
        { months: 3, interestRate: 0, label: "3 Months (No Cost EMI)" },
        { months: 6, interestRate: 5, label: "6 Months" },
        { months: 12, interestRate: 8, label: "12 Months" },
        { months: 24, interestRate: 12, label: "24 Months" },
    ];

    const calculateEMI = (principal: number, months: number, annualRate: number) => {
        if (annualRate === 0) return principal / months;
        const monthlyRate = annualRate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        return emi;
    };

    const handleCompareToggle = () => {
        if (isCompareChecked) {
            removeFromCompare(product.id);
            setToastMessage("Removed from comparison");
        } else {
            addToCompare(product);
            setToastMessage("Added to comparison");
        }
        setIsCompareChecked(!isCompareChecked);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleAddToCart = () => {
        setToastMessage(`Added ${quantity}x ${product.name} to cart!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleBuyNow = () => {
        setToastMessage(`Redirecting to checkout...`);
        setShowToast(true);
        setTimeout(() => {
            router.push("/cart");
        }, 1000);
    };

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
        setToastMessage(isInWishlist ? "Removed from wishlist" : "Added to wishlist!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Fallback images if not present
    const images = [product.image, product.image, product.image];

    return (
        <main className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Breadcrumbs / Category Bar */}
                <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-12 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide border-b border-gray-50">
                    {CATEGORIES.filter(c => c !== "All").map(cat => (
                        <span key={cat} className={`hover:text-primary cursor-pointer transition-colors ${cat === product.category ? "text-primary border-b-2 border-primary pb-2" : "pb-2"}`}>{cat.toUpperCase()}</span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

                    {/* Left: Image Gallery */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square bg-[#fcfcfc] rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden group shadow-inner"
                        >
                            <motion.img
                                key={activeImage}
                                src={images[activeImage]}
                                alt={product.name}
                                className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            />

                            {/* Gallery Controls */}
                            <button
                                onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 justify-center">
                            {images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary opacity-100 scale-105" : "border-gray-100 opacity-50 hover:opacity-100"}`}
                                >
                                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-secondary text-white text-[9px] font-black uppercase tracking-widest">Premium Collection</span>
                                <div className="flex items-center gap-1">
                                    <div className="flex text-primary">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 ml-2">{product.rating.toFixed(1)} ({product.reviews || 0} Ratings)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tighter mb-4 leading-tight uppercase">
                                {product.name}
                            </h1>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-8">Visit the {product.brand} store</button>

                            <div className="flex items-center justify-between py-6 border-y border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="compare"
                                            checked={isCompareChecked}
                                            onChange={handleCompareToggle}
                                            className="accent-secondary h-4 w-4 cursor-pointer"
                                        />
                                        <label htmlFor="compare" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer">
                                            Compare
                                        </label>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                                    <Share2 size={16} />
                                    <span className="uppercase tracking-widest">Share</span>
                                </button>
                            </div>
                        </div>

                        <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-tight">
                            {product.description || "The next evolution of mobile technology. Featuring advanced internal components and a breathtaking ProMotion display."}
                        </p>

                        {/* Configs */}
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Storage Configuration</label>
                                <div className="flex gap-4">
                                    {storageOptions.map(size => (
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
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Aesthetic Finnish</label>
                                    <span className="text-[10px] font-black text-secondary uppercase">{selectedColor.name}</span>
                                </div>
                                <div className="flex gap-4">
                                    {colorOptions.map(color => (
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
                        <div className="bg-gray-50/50 rounded-[2.5rem] p-10 space-y-8 border border-gray-100 shadow-sm">
                            <div className="flex items-baseline gap-4">
                                <h2 className="text-4xl font-display font-black text-secondary uppercase">
                                    MRP ${product.price.toLocaleString()}
                                </h2>
                                {product.mrp && <span className="text-sm font-bold text-gray-300 line-through uppercase tracking-widest">${product.mrp.toLocaleString()}</span>}
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Save ${((product.mrp || product.price + 100) - product.price).toLocaleString()}</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 py-2 border-b border-gray-100 text-[10px] font-black tracking-widest text-secondary uppercase">
                                    <p>Flexible EMI starting from <span className="text-primary italic font-black">${(product.price / 12).toFixed(2)}/mo</span></p>
                                    <button
                                        onClick={() => setShowEmiModal(true)}
                                        className="text-secondary underline decoration-2 underline-offset-4 text-[10px] font-black uppercase tracking-widest ml-auto hover:text-primary transition-colors"
                                    >
                                        See Options
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-secondary">
                                    <Zap size={18} className="text-primary" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Earn {product.points || 150} Points <Info size={12} className="inline ml-1 opacity-20" /></p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 items-center pt-4">
                                <div className="flex items-center gap-2 text-green-600 font-black text-[9px] uppercase tracking-[0.2em]">
                                    <CheckCircle2 size={16} />
                                    PROTOCOL READY (In Stock)
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 font-black text-[9px] uppercase tracking-[0.2em]">
                                    <Truck size={16} />
                                    Express Delivery Active
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-secondary font-black px-2 transition-colors">-</button>
                                    <span className="w-12 text-center text-xs font-black text-secondary uppercase tracking-widest">0{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="text-gray-400 hover:text-secondary font-black px-2 transition-colors">+</button>
                                </div>

                                <motion.button
                                    onClick={toggleWishlist}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-4 bg-white border-2 rounded-2xl transition-all shadow-sm ${isInWishlist ? "border-primary text-primary" : "border-gray-200 text-secondary hover:text-primary hover:border-primary"}`}
                                >
                                    <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                                </motion.button>

                                <motion.button
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 min-w-[180px] px-8 py-5 border-2 border-secondary rounded-2xl text-secondary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-lg flex items-center justify-center gap-4"
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </motion.button>

                                <motion.button
                                    onClick={handleBuyNow}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 min-w-[200px] px-8 py-5 bg-primary rounded-2xl text-secondary font-black text-[11px] uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all shadow-xl shadow-primary/10 flex items-center justify-center"
                                >
                                    <Zap size={18} className="mr-3" />
                                    Acquire Now
                                </motion.button>
                            </div>
                        </div>

                        {/* Extra Deals */}
                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-primary" />
                                    <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">Institutional Offers</h3>
                                </div>
                                <button className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-primary underline">See All</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: "Vault Card", desc: "Up to 15% Instant Cashback", icon: CreditCard },
                                    { title: "Future Pay", desc: "No Cost EMI for 24 Months", icon: CreditCard },
                                    { title: "Tech Exchange", desc: "Get up to $500 for your old device", icon: Zap }
                                ].map((offer, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary transition-all group shadow-sm">
                                        <offer.icon size={20} className="text-primary mb-4" />
                                        <h4 className="text-[10px] font-black text-secondary uppercase mb-1">{offer.title}</h4>
                                        <p className="text-[9px] font-bold text-gray-400 leading-tight uppercase">{offer.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Dynamic Features Section */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                        {[
                            { icon: Truck, title: "EXPRESS LOGISTICS", desc: "Same-Day secure delivery across metros" },
                            { icon: ShieldCheck, title: "PLATINUM CARE", desc: "Extended 2-year warranty included" },
                            { icon: CreditCard, title: "SECURE PAY", desc: "Military-grade encryption for all payments" },
                            { icon: Info, title: "TECH SUPPORT", desc: "Live 24/7 priority concierge access" }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                                    <feature.icon size={28} />
                                </div>
                                <h4 className="text-[10px] font-black tracking-widest uppercase mb-2 text-secondary">{feature.title}</h4>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter max-w-[150px]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EMI Options Modal */}
                <AnimatePresence>
                    {showEmiModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowEmiModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-display font-black text-secondary uppercase tracking-tight">
                                        EMI <span className="text-primary italic">Options</span>
                                    </h2>
                                    <button
                                        onClick={() => setShowEmiModal(false)}
                                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-8">
                                    Choose your preferred payment plan for {product.name}
                                </p>

                                <div className="space-y-4">
                                    {emiPlans.map((plan, index) => {
                                        const emi = calculateEMI(product.price, plan.months, plan.interestRate);
                                        const totalAmount = emi * plan.months;
                                        const interest = totalAmount - product.price;

                                        return (
                                            <motion.div
                                                key={plan.months}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-gray-50 rounded-2xl p-6 hover:bg-primary/5 hover:border-primary border-2 border-transparent transition-all cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-black text-secondary uppercase tracking-tight group-hover:text-primary transition-colors">
                                                            {plan.label}
                                                        </h3>
                                                        {plan.interestRate === 0 && (
                                                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-full">
                                                                No Cost EMI
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-display font-black text-secondary">
                                                            ${emi.toFixed(2)}
                                                        </p>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                                            per month
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                                    <div>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                                            Interest Rate
                                                        </p>
                                                        <p className="text-sm font-black text-secondary">
                                                            {plan.interestRate}% p.a.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                                            Interest
                                                        </p>
                                                        <p className="text-sm font-black text-secondary">
                                                            ${interest.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                                            Total Amount
                                                        </p>
                                                        <p className="text-sm font-black text-secondary">
                                                            ${totalAmount.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/20">
                                    <div className="flex items-start gap-3">
                                        <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">
                                                EMI Eligibility
                                            </p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                                EMI options are available on select credit cards and digital payment methods.
                                                Final EMI amount may vary based on your bank's processing fees.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toast Notification */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-8 right-8 bg-secondary text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
                        >
                            <CheckCircle2 size={20} className="text-primary" />
                            <span className="font-black text-sm uppercase tracking-wide">{toastMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Compare Modal */}
                <CompareModal />

            </div>
        </main>
    );
}
