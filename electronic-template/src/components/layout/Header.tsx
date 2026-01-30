"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg py-3" : "bg-white py-6"}`}
        >
            {/* Top Bar - Premium Info */}
            {!isScrolled && (
                <div className="border-b border-gray-100 pb-4 mb-4 hidden lg:block">
                    <div className="container flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                        <div className="flex gap-8">
                            <span className="flex items-center gap-2"><Phone size={12} className="text-primary" /> +1 (555) 123-4567</span>
                            <span className="flex items-center gap-2"><Mail size={12} className="text-primary" /> support@HexBytes.com</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/faq" className="hover:text-primary transition-colors">Order Tracking</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">Store Locator</Link>
                            <Link href="#" className="hover:text-primary transition-colors px-4 border-l border-gray-100">USD $</Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <nav className="flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="group relative z-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                                <ShoppingBag className="text-white group-hover:scale-110 transition-transform" size={24} />
                            </div>
                            <span className="text-3xl font-display font-black text-secondary tracking-tighter uppercase italic">
                                Hex<span className="text-primary">Bytes</span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Navigation - Desktop */}
                    <div className="hidden lg:flex items-center gap-10">
                        {["Home", "Shop", "Categories", "About", "Blog", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="relative text-[11px] font-black tracking-[0.3em] text-secondary uppercase group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-end max-w-xl">
                        <motion.div
                            animate={{ width: searchFocused ? "100%" : "60%" }}
                            className="relative hidden md:block"
                        >
                            <input
                                type="text"
                                placeholder="Search for electronics..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="w-full bg-gray-100/80 border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </motion.div>

                        <div className="flex items-center gap-3 lg:gap-5">
                            <Link
                                href="/profile"
                                className="p-3 text-secondary hover:text-primary transition-all relative group"
                            >
                                <User size={22} strokeWidth={2.5} />
                            </Link>
                            <Link href="/wishlist">
                                <motion.button
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 text-secondary hover:text-primary transition-all relative group"
                                >
                                    <Heart size={22} strokeWidth={2.5} />
                                    <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-secondary text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">2</span>
                                </motion.button>
                            </Link>
                            <Link href="/cart">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative p-3 bg-secondary text-white rounded-2xl hover:bg-primary hover:text-secondary transition-all shadow-xl shadow-secondary/10 flex items-center gap-3 px-5 lg:px-6 cursor-pointer group"
                                >
                                    <div className="relative">
                                        <ShoppingBag size={20} strokeWidth={2.5} />
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-secondary text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white group-hover:bg-secondary group-hover:text-white transition-all"
                                        >
                                            4
                                        </motion.span>
                                    </div>
                                    <span className="text-xs font-black hidden sm:inline group-hover:tracking-wider transition-all">CART</span>
                                </motion.div>
                            </Link>

                            <button
                                className="lg:hidden p-3 text-secondary hover:bg-gray-100 rounded-xl transition-all"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container py-10 flex flex-col gap-6">
                            {["Home", "Shop", "Categories", "About", "Blog", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="text-xl font-display font-black text-secondary uppercase tracking-tight hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
