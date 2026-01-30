"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS } from "@/lib/products";

export default function WishlistPage() {
    // Mock wishlist - in production, this would come from context/state management
    const [wishlistItems, setWishlistItems] = useState(
        ALL_PRODUCTS.slice(0, 6) // Demo: first 6 products
    );

    const removeFromWishlist = (id: number | string) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-1 bg-primary rounded-full"></div>
                        <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">Your Collection</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h1 className="text-5xl lg:text-6xl font-display font-black text-secondary tracking-tighter uppercase">
                            Saved <span className="text-primary italic">Protocols</span>
                        </h1>
                        <div className="flex items-center gap-3 text-xs font-black tracking-widest text-gray-400">
                            <Heart size={16} className="text-primary fill-primary" />
                            <span className="text-secondary">{wishlistItems.length} ITEMS</span>
                        </div>
                    </div>
                </motion.div>

                {/* Wishlist Grid or Empty State */}
                <AnimatePresence mode="wait">
                    {wishlistItems.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {wishlistItems.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
                                >
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    {/* Product Image */}
                                    <Link href={`/product/${product.id}`}>
                                        <div className="relative aspect-square bg-[#f8f8f8] rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center">
                                            <div className="relative w-40 h-40 group-hover:scale-110 transition-transform duration-1000 ease-out">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-3 mb-6">
                                            <p className="text-[10px] text-primary font-black tracking-[0.3em] leading-none uppercase">
                                                {product.category}
                                            </p>
                                            <h3 className="font-black text-lg text-secondary group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={10}
                                                        className={i < product.rating ? "fill-primary text-primary" : "text-gray-200"}
                                                    />
                                                ))}
                                                <span className="text-[10px] text-gray-400 font-bold ml-2">
                                                    ({product.rating.toFixed(1)})
                                                </span>
                                            </div>
                                            <div className="pt-2">
                                                <p className="font-display font-black text-2xl text-secondary">
                                                    ${product.price}
                                                </p>
                                                {product.mrp && (
                                                    <p className="text-xs text-gray-300 line-through font-bold">
                                                        ${product.mrp}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Add to Cart Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-secondary text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-secondary transition-all shadow-lg flex items-center justify-center gap-3"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </motion.button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-32 px-4"
                        >
                            <div className="relative mb-12">
                                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center relative">
                                    <Heart size={48} className="text-gray-200" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Sparkles size={16} className="text-secondary" />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-4xl font-display font-black text-secondary tracking-tighter uppercase mb-4 text-center">
                                Your Wishlist is <span className="text-primary italic">Empty</span>
                            </h2>
                            <p className="text-sm text-gray-400 font-bold tracking-wide uppercase mb-12 text-center max-w-md">
                                Start building your dream collection. Save your favorite tech for later.
                            </p>

                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-secondary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-2xl shadow-primary/20 flex items-center gap-4"
                                >
                                    <Sparkles size={18} />
                                    Explore Premium Collection
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick Stats */}
                {wishlistItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-20 pt-12 border-t border-gray-200"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <p className="text-3xl font-display font-black text-secondary mb-2">
                                    {wishlistItems.length}
                                </p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Saved Items
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <p className="text-3xl font-display font-black text-primary mb-2">
                                    ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                                </p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Total Value
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <p className="text-3xl font-display font-black text-secondary mb-2">
                                    ${wishlistItems.reduce((sum, item) => sum + ((item.mrp || item.price + 100) - item.price), 0).toLocaleString()}
                                </p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                    Potential Savings
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </main>
    );
}
