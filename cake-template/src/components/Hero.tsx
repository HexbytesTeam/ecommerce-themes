"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Check } from "lucide-react";
import { products } from "@/lib/product-data";

export default function Hero() {
    const router = useRouter();
    const [category, setCategory] = useState("");
    const [itemSlug, setItemSlug] = useState("");
    const [priceRange, setPriceRange] = useState("");

    // Derived data
    const categories = Array.from(new Set(products.map(p => p.category)));
    const filteredProducts = products.filter(p => !category || p.category === category);

    // UI State for dropdowns
    const [openDropdown, setOpenDropdown] = useState<"food" | "item" | "price" | null>(null);

    const handleSearch = () => {
        if (itemSlug) {
            router.push(`/product/${itemSlug}`);
        } else if (category) {
            router.push("/#products");
        } else {
            router.push("/#products");
        }
    };

    const toggleDropdown = (name: "food" | "item" | "price") => {
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    // Slider State
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, []);

    const slides = [
        {
            title: "Super Delicious Food Special",
            subtitle: "for You",
            desc: "Order your favorites food from anywhere and get delivery at your door.",
            image: "/assets/hero.png",
            bgGradient: "from-pink-200/40 to-yellow-100/40"
        },
        {
            title: "Fresh Baked Wedding Cakes",
            subtitle: "for Dreams",
            desc: "Make your special day unforgettable with our custom designed wedding cakes.",
            image: "/assets/cake.png",
            bgGradient: "from-purple-200/40 to-pink-100/40"
        },
        {
            title: "Sweet Glazed Daily Donuts",
            subtitle: "for Joy",
            desc: "Start your morning with our freshly glazed, warm and soft donuts.",
            image: "/assets/donut.png",
            bgGradient: "from-yellow-200/40 to-orange-100/40"
        }
    ];

    const slide = slides[currentSlide];

    return (
        <section className="relative pt-24 pb-12 lg:pt-52 lg:pb-32 overflow-hidden bg-[#FFF8F8]">
            {/* 3D Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl animate-float pointer-events-none z-0" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-40 right-10 w-48 h-48 bg-yellow-200/40 rounded-full blur-3xl animate-float pointer-events-none z-0" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-100/50 rounded-full blur-xl animate-float pointer-events-none z-0" style={{ animationDelay: "3s" }} />

            {/* Sprinkles */}
            <div className="absolute top-40 left-[20%] w-4 h-4 bg-pink-400 rounded-full animate-float opacity-60 pointer-events-none z-0" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-20 left-[30%] w-3 h-3 bg-yellow-400 rounded-full animate-float opacity-60 pointer-events-none z-0" style={{ animationDelay: "2.5s" }} />
            <div className="absolute top-1/4 right-[10%] w-5 h-5 bg-green-300 rounded-full animate-float opacity-60 pointer-events-none z-0" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-[40%] right-[35%] w-3 h-3 bg-purple-300 rounded-full animate-float opacity-60 pointer-events-none z-0" style={{ animationDelay: "4s" }} />

            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[20vw] lg:text-[18vw] font-black text-[#FFEAEA] uppercase tracking-tighter leading-none pointer-events-none select-none z-0 text-center whitespace-nowrap transition-opacity duration-1000">
                2025 BEST
            </div>

            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 relative z-10 min-h-[500px]">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left z-10 pl-0 lg:pl-10">
                    <div key={currentSlide} className="animate-in fade-in slide-in-from-left-8 duration-700">
                        <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-serif font-black leading-[1.1] mb-6 lg:mb-8 text-[#2D2D2D] tracking-tight">
                            {slide.title.replace("Special", "")} <br />
                            {slide.title.includes("Special") ? "Special" : ""}
                            <span className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                {slide.subtitle}
                                {/* Avatar Stack - Only show on first slide to reduce clutter or keep consistent */}
                                <div className="flex -space-x-4 mt-2 sm:mt-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-yellow-200 overflow-hidden relative">
                                        <Image src="/assets/cupcake.png" alt="User" fill className="object-cover" />
                                    </div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-green-200 overflow-hidden relative">
                                        <Image src="/assets/donut.png" alt="User" fill className="object-cover" />
                                    </div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-black flex items-center justify-center text-white text-xs font-bold">
                                        2+
                                    </div>
                                </div>
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-base sm:text-lg mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 font-medium px-4 lg:px-0">
                            {slide.desc}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-12 lg:mb-16 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        <Link href="/#products" className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-gradient-primary text-white rounded-full font-bold shadow-xl shadow-pink-400/30 hover:scale-105 transition-all duration-300">
                            Order Now
                        </Link>
                        <Link href="/about" className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-transparent text-slate-900 border-2 border-slate-200 rounded-full font-bold hover:bg-white hover:border-white hover:shadow-lg transition-all">
                            Learn More
                        </Link>
                    </div>

                    {/* Filter Bar - Floating Card Style */}
                    <div className="bg-white/80 backdrop-blur-md p-3 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-white flex flex-col sm:flex-row items-center gap-2 max-w-3xl relative z-20 mx-auto lg:mx-0">
                        {/* Food Dropdown */}
                        <div className="flex-1 w-full relative">
                            <button
                                onClick={() => toggleDropdown("food")}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white rounded-[1.5rem] transition-colors group"
                            >
                                <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
                                    <div className="w-2 h-2 bg-current rounded-full" />
                                </div>
                                <div className="flex flex-col text-left min-w-0">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Food</span>
                                    <span className="text-base font-bold flex items-center gap-2 truncate text-slate-800">
                                        {category || "Select Food"} <ChevronDown size={14} className="opacity-50" />
                                    </span>
                                </div>
                            </button>
                            {openDropdown === "food" && (
                                <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-2xl shadow-2xl border border-pink-50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <button
                                        onClick={() => { setCategory(""); setOpenDropdown(null); }}
                                        className="w-full text-left px-4 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex justify-between text-slate-600"
                                    >
                                        All Foods
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => { setCategory(cat); setItemSlug(""); setOpenDropdown(null); }}
                                            className="w-full text-left px-4 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex justify-between text-slate-600"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-px h-12 bg-slate-100 hidden sm:block" />

                        {/* Item Dropdown */}
                        <div className="flex-1 w-full relative">
                            <button
                                onClick={() => toggleDropdown("item")}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white rounded-[1.5rem] transition-colors group"
                            >
                                <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
                                    <div className="w-2 h-2 bg-current rounded-full" />
                                </div>
                                <div className="flex flex-col text-left min-w-0">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Item</span>
                                    <span className="text-base font-bold flex items-center gap-2 truncate text-slate-800">
                                        {itemSlug ? products.find(p => p.slug === itemSlug)?.name : "Select Item"} <ChevronDown size={14} className="opacity-50" />
                                    </span>
                                </div>
                            </button>
                            {openDropdown === "item" && (
                                <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-2xl shadow-2xl border border-pink-50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto">
                                    <button
                                        onClick={() => { setItemSlug(""); setOpenDropdown(null); }}
                                        className="w-full text-left px-4 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex justify-between text-slate-600"
                                    >
                                        Any Item
                                    </button>
                                    {filteredProducts.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => { setItemSlug(product.slug); setOpenDropdown(null); }}
                                            className="w-full text-left px-4 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex justify-between text-slate-600"
                                        >
                                            <span className="truncate">{product.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-px h-12 bg-slate-100 hidden sm:block" />

                        {/* Price Dropdown */}
                        <div className="flex-1 w-full relative">
                            <button
                                onClick={() => toggleDropdown("price")}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white rounded-[1.5rem] transition-colors group"
                            >
                                <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
                                    <div className="w-2 h-2 bg-current rounded-full" />
                                </div>
                                <div className="flex flex-col text-left min-w-0">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</span>
                                    <span className="text-base font-bold flex items-center gap-2 truncate text-slate-800">
                                        {priceRange || "Range Price"} <ChevronDown size={14} className="opacity-50" />
                                    </span>
                                </div>
                            </button>
                            {openDropdown === "price" && (
                                <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-2xl shadow-2xl border border-pink-50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {["Any Price", "Under $10", "$10 - $30", "$30+"].map(price => (
                                        <button
                                            key={price}
                                            onClick={() => { setPriceRange(price === "Any Price" ? "" : price); setOpenDropdown(null); }}
                                            className="w-full text-left px-4 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex justify-between text-slate-600"
                                        >
                                            {price}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform flex-shrink-0 m-2"
                        >
                            <Search size={24} />
                        </button>
                    </div>
                </div>

                {/* Image Content */}
                <div className="flex-1 relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <div className="relative w-full aspect-square max-w-[650px] mx-auto">
                        <div key={currentSlide} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr ${slide.bgGradient} rounded-full blur-3xl animate-pulse-soft transition-all duration-1000`} />
                        {/* Decorative Elements from reference */}
                        <div className="absolute top-0 right-10 w-4 h-4 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "1s" }} />
                        <div className="absolute bottom-20 left-10 w-6 h-6 rounded-full bg-yellow-400/20 animate-float" style={{ animationDelay: "2s" }} />

                        <div className="relative z-10 animate-float">
                            <Image
                                key={currentSlide}
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-contain drop-shadow-2xl animate-in fade-in zoom-in-50 duration-700"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
