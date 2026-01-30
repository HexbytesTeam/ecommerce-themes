"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, ShoppingBag, Heart, Star, LayoutGrid, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Extensive Product Data
const ALL_PRODUCTS = [
    { id: 1, name: "MacBook Pro M2 Air", category: "Laptops", brand: "Apple", price: 999.00, rating: 5, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Sony WH-1000XM5", category: "Headphones", brand: "Sony", price: 349.00, rating: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "DJI Mavic Air 2S", category: "Drones", brand: "DJI", price: 899.00, rating: 4, image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=400&auto=format&fit=crop" },
    { id: 4, name: "Canon EOS R5", category: "Cameras", brand: "Canon", price: 3299.00, rating: 5, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop" },
    { id: 5, name: "Sonos Era 300", category: "Speakers", brand: "Sonos", price: 449.00, rating: 5, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=400&auto=format&fit=crop" },
    { id: 6, name: "iPad Pro 12.9 Inch", category: "Tablets", brand: "Apple", price: 1099.00, rating: 5, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop" },
    { id: 7, name: "Meta Quest 3 VR", category: "Gadgets", brand: "Meta", price: 499.00, rating: 4, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400&auto=format&fit=crop" },
    { id: 8, name: "Apple Watch Ultra", category: "Watches", brand: "Apple", price: 799.00, rating: 5, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&auto=format&fit=crop" },
    { id: 9, name: "Samsung Galaxy S24 Ultra", category: "Mobiles", brand: "Samsung", price: 1299.00, rating: 5, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400&auto=format&fit=crop" },
    { id: 10, name: "ASUS ROG Zephyrus G14", category: "Laptops", brand: "ASUS", price: 1599.00, rating: 4, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop" },
    { id: 11, name: "Bose QuietComfort Ultra", category: "Headphones", brand: "Bose", price: 429.00, rating: 5, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop" },
    { id: 12, name: "Keychron K2 V2 Wireless", category: "Gadgets", brand: "Keychron", price: 89.00, rating: 4, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Laptops", "Headphones", "Drones", "Cameras", "Speakers", "Tablets", "Gadgets", "Watches", "Mobiles"];
const BRANDS = ["All", "Apple", "Sony", "DJI", "Canon", "Sonos", "Meta", "Samsung", "ASUS", "Bose", "Keychron"];
function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState(initialCategory ? (initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)) : "All");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [priceRange, setPriceRange] = useState(5000);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS.filter(product => {
            const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
            const brandMatch = selectedBrand === "All" || product.brand === selectedBrand;
            const priceMatch = product.price <= priceRange;
            return categoryMatch && brandMatch && priceMatch;
        }).sort((a, b) => {
            if (sortBy === "Price: Low to High") return a.price - b.price;
            if (sortBy === "Price: High to Low") return b.price - a.price;
            return 0; // Default or "Newest"
        });
    }, [selectedCategory, selectedBrand, sortBy, priceRange]);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#f8f8f8]">
            <div className="container">
                {/* Header Section */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-1 bg-primary rounded-full"></div>
                                <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">HexBytes Shop</p>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-display font-black text-secondary tracking-tight uppercase">
                                Premium <span className="text-primary italic">Collections</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-black tracking-widest text-gray-400">
                            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
                            <span>/</span>
                            <span className="text-secondary">SHOP</span>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-72 space-y-10">
                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
                        >
                            <h3 className="text-sm font-black text-secondary uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                                Categories
                                <ChevronDown size={14} className="text-primary" />
                            </h3>
                            <div className="space-y-3">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex items-center justify-between w-full text-xs font-bold tracking-wider transition-all hover:text-primary ${selectedCategory === cat ? "text-primary" : "text-gray-500"}`}
                                    >
                                        {cat.toUpperCase()}
                                        {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Price Filter */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
                        >
                            <h3 className="text-sm font-black text-secondary uppercase tracking-[0.2em] mb-6">Price Range</h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                            />
                            <div className="flex justify-between text-[10px] font-black tracking-widest text-gray-400 uppercase">
                                <span>$0</span>
                                <span className="text-secondary">UP TO ${priceRange}</span>
                            </div>
                        </motion.div>

                        {/* Brand Filter */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
                        >
                            <h3 className="text-sm font-black text-secondary uppercase tracking-[0.2em] mb-6">Popular Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {BRANDS.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => setSelectedBrand(brand)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${selectedBrand === brand ? "bg-secondary text-white shadow-lg" : "bg-gray-50 text-gray-500 hover:bg-primary/10 hover:text-primary"}`}
                                    >
                                        {brand.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 mb-8 flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                    Showing <span className="text-secondary">{filteredProducts.length}</span> Results
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* View Modes */}
                                <div className="flex items-center bg-gray-50 p-1 rounded-xl">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-secondary"}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-secondary"}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>

                                {/* Sorting */}
                                <div className="relative group">
                                    <button className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black tracking-[0.2em] text-secondary hover:bg-primary/10 hover:text-primary transition-all uppercase">
                                        Sort: {sortBy}
                                        <ChevronDown size={14} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                        {["Newest", "Price: Low to High", "Price: High to Low"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSortBy(option)}
                                                className="w-full text-left px-6 py-4 text-[10px] font-black tracking-widest text-gray-500 hover:bg-primary/5 hover:text-primary transition-all uppercase"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className={`group ${viewMode === "grid" ? "bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative" : "bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex items-center gap-8 group hover:shadow-xl transition-all"}`}
                                    >
                                        {/* Badge */}
                                        <div className="absolute top-8 left-8 z-10">
                                            <div className="bg-primary text-secondary text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium</div>
                                        </div>

                                        <div className={`${viewMode === "grid" ? "block w-full" : "flex items-center flex-1 gap-8"}`}>
                                            <Link href={`/product/${product.id}`} className={viewMode === "grid" ? "block" : "flex items-center gap-8 flex-1"}>
                                                <div className={`${viewMode === "grid" ? "relative aspect-square bg-[#f8f8f8] rounded-[2rem] overflow-hidden mb-8 flex items-center justify-center" : "relative w-48 h-48 bg-[#f8f8f8] rounded-[2rem] overflow-hidden flex-shrink-0 flex items-center justify-center"}`}>
                                                    <div className={`relative ${viewMode === "grid" ? "w-48 h-48" : "w-36 h-36"} group-hover:scale-110 transition-transform duration-1000 ease-out`}>
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 flex-1 min-w-0">
                                                    <p className="text-[10px] text-primary font-black tracking-[0.3em] leading-none uppercase">{product.category}</p>
                                                    <h3 className={`font-black text-secondary group-hover:text-primary transition-colors line-clamp-1 tracking-tight ${viewMode === "grid" ? "text-lg" : "text-2xl"}`}>
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} className={i < product.rating ? "fill-primary text-primary" : "text-gray-200"} />
                                                        ))}
                                                        <span className="text-[10px] text-gray-400 font-bold ml-2">(4.5)</span>
                                                    </div>
                                                    <div className="pt-4">
                                                        <p className={`font-display font-black text-secondary ${viewMode === "grid" ? "text-2xl" : "text-4xl"}`}>${product.price}</p>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Action Buttons */}
                                            <div className={`${viewMode === "grid" ? "absolute bottom-8 right-8 flex flex-col gap-3" : "flex flex-col gap-3 pr-4"}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-sm"
                                                >
                                                    <Heart size={20} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all shadow-xl shadow-secondary/20"
                                                >
                                                    <ShoppingBag size={22} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-32"
                            >
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SlidersHorizontal size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-display font-black text-secondary uppercase mb-2">No items found</h3>
                                <p className="text-gray-400 font-medium">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setSelectedBrand("All"); setPriceRange(5000); }}
                                    className="mt-8 px-10 py-4 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all"
                                >
                                    Reset All Filters
                                </button>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={
            <div className="pt-32 pb-20 min-h-screen bg-[#f8f8f8] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
