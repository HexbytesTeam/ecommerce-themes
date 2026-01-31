"use client";

import { User, ShoppingCart, Menu, Search, X, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import { ALL_PRODUCTS, Product } from "@/data/products";
import Image from "next/image";
import CartDrawer from "./CartDrawer";

export default function Header() {
    const { cartCount, setIsDrawerOpen, wishlistCount } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: "Products", href: "/shop" },
        { name: "Categories", href: "/categories" },
        { name: "Toys", href: "/toys" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
    ];

    // Filter products based on query
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const filtered = ALL_PRODUCTS.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5); // Limit to 5 results for premium feel
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Close search on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Banner */}
            <div className="bg-brand-dark text-white text-[10px] md:text-xs py-2 text-center font-medium">
                On your first order <span className="text-brand-yellow font-bold">30% OFF</span> For all products buy now get the offer
            </div>

            {/* Main Navbar */}
            <div className="bg-brand-yellow px-4 md:px-12 py-3 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                        <span className="text-xl md:text-2xl font-black text-brand-blue flex items-center gap-1">
                            🐾 FocoPet
                        </span>
                    </div>
                </Link>

                {/* Full Screen Menu Overlay */}
                <div className={`fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-[100] transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="absolute top-8 right-8 md:right-12">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="bg-brand-yellow p-4 rounded-full text-brand-dark hover:scale-110 transition-transform shadow-2xl"
                        >
                            <X size={32} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="h-full flex flex-col lg:flex-row justify-center items-center p-8 md:p-12 gap-16 lg:gap-32 container mx-auto">
                        {/* Left Side: Navigation Links */}
                        <nav className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group relative"
                                >
                                    <span className={`text-3xl md:text-5xl lg:text-7xl font-black italic tracking-tighter transition-all duration-500 block ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white group-hover:from-brand-orange group-hover:to-brand-yellow uppercase">
                                            {link.name}
                                        </span>
                                    </span>
                                    <div className="absolute -inset-4 bg-brand-yellow/10 rounded-3xl blur-xl scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side: Accessories Showcase (New) */}
                        <div className={`flex-1 max-w-2xl w-full transition-all duration-1000 delay-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                            <div className="bg-white/5 backdrop-blur-md rounded-[50px] p-8 md:p-12 border border-white/10 relative overflow-hidden group">
                                <span className="text-brand-yellow font-black uppercase text-[10px] tracking-[0.4em] mb-8 block">New Accessories Collection</span>

                                <div className="grid grid-cols-2 gap-6">
                                    {ALL_PRODUCTS.filter(p => p.category === "Accessories").slice(0, 2).map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/product/${item.id}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group/item relative aspect-square bg-white/10 rounded-[30px] p-6 hover:bg-brand-yellow/20 transition-all overflow-hidden"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-4 group-hover/item:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-dark to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                <p className="text-[10px] text-white font-black truncate">{item.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <h4 className="text-white text-xl font-black italic">Essential Gear <br /><span className="text-brand-yellow">For Your Pet</span></h4>
                                    <Link href="/shop?category=Accessories" onClick={() => setIsMenuOpen(false)} className="bg-brand-yellow text-brand-dark p-4 rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-xl">
                                        <ArrowRight size={24} />
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
                                <div className="text-center lg:text-left">
                                    <p className="text-brand-yellow font-black text-[10px] uppercase tracking-[0.2em] mb-4">Follow Our Pack</p>
                                    <div className="flex gap-6">
                                        <span className="text-white/60 hover:text-brand-yellow cursor-pointer font-bold italic text-sm transition-colors">Instagram</span>
                                        <span className="text-white/60 hover:text-brand-yellow cursor-pointer font-bold italic text-sm transition-colors">Facebook</span>
                                        <span className="text-white/60 hover:text-brand-yellow cursor-pointer font-bold italic text-sm transition-colors">X / Twitter</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-Screen Search Modal */}
                <div className={`fixed inset-0 z-[110] transition-all duration-500 ${isSearchOpen ? 'visible' : 'invisible'}`}>
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-brand-dark/80 backdrop-blur-xl transition-opacity duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setIsSearchOpen(false)}
                    />

                    <div className={`relative h-full flex flex-col container mx-auto px-4 md:px-12 transition-all duration-500 ${isSearchOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                        {/* Search Input Area */}
                        <div className="pt-20 md:pt-32 pb-12">
                            <div className="relative group">
                                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-brand-yellow group-focus-within:scale-110 transition-transform" size={32} strokeWidth={2.5} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="What are you looking for today? 🐾"
                                    className="w-full bg-white/5 border-2 border-white/10 focus:border-brand-yellow/50 rounded-[40px] py-8 pl-20 pr-12 text-2xl md:text-4xl font-black text-white outline-none shadow-2xl transition-all placeholder:text-white/20 italic"
                                    autoFocus={isSearchOpen}
                                />
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-brand-dark p-4 rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-xl"
                                >
                                    <X size={24} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Search Results & Suggestions */}
                        <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar pr-4">
                            {searchQuery.trim().length > 0 ? (
                                <div className="space-y-12">
                                    {searchResults.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/product/${product.id}`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="bg-white/5 backdrop-blur-md rounded-[30px] p-6 border border-white/10 hover:bg-white/10 transition-all group flex items-center gap-6"
                                                >
                                                    <div className="w-24 h-24 bg-white rounded-2xl p-3 flex-shrink-0 relative overflow-hidden">
                                                        <Image src={product.image} alt={product.name} fill className="object-contain p-1 group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-widest">{product.category}</span>
                                                        <h4 className="font-bold text-white text-lg truncate group-hover:text-brand-yellow transition-colors">{product.name}</h4>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                                                            <div className="bg-brand-yellow text-brand-dark p-1.5 rounded-lg group-hover:bg-brand-orange group-hover:text-white transition-all">
                                                                <ArrowRight size={14} strokeWidth={3} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20">
                                            <p className="text-white/40 text-xl font-black italic">No matches found for <span className="text-brand-yellow">"{searchQuery}"</span></p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                    {/* Popular Categories */}
                                    <div>
                                        <h3 className="text-brand-yellow font-black uppercase text-xs tracking-[0.4em] mb-8">Popular Categories</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {["Dogs", "Cats", "Birds", "Accessories"].map((cat) => (
                                                <Link
                                                    key={cat}
                                                    href={`/categories`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="bg-white/5 rounded-3xl p-6 border border-white/5 hover:border-brand-yellow/30 transition-all group flex items-center justify-between"
                                                >
                                                    <span className="text-white font-bold text-lg group-hover:text-brand-yellow transition-colors">{cat}</span>
                                                    <ArrowRight size={18} className="text-white/20 group-hover:text-brand-yellow transition-colors" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trending Now */}
                                    <div>
                                        <h3 className="text-brand-yellow font-black uppercase text-xs tracking-[0.4em] mb-8">Trending Products</h3>
                                        <div className="space-y-4">
                                            {ALL_PRODUCTS.slice(0, 3).map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/product/${product.id}`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="flex items-center gap-4 group"
                                                >
                                                    <div className="w-16 h-16 bg-white/5 rounded-2xl p-2 flex-shrink-0">
                                                        <Image src={product.image} alt={product.name} width={64} height={64} className="object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-white/40 group-hover:text-white font-bold transition-colors truncate">{product.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-4 md:gap-8">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center text-brand-dark gap-1 font-semibold hover:text-brand-blue transition-colors"
                    >
                        <Search size={22} strokeWidth={2.5} />
                    </button>
                    <Link href="/wishlist" className="flex items-center text-brand-dark gap-1 font-semibold relative hover:text-brand-blue transition-colors">
                        <Heart size={22} strokeWidth={2.5} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/profile" className="flex items-center text-brand-dark gap-1 font-semibold hover:text-brand-blue transition-colors">
                        <User size={22} strokeWidth={2.5} />
                    </Link>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center text-brand-dark gap-1 font-semibold relative hover:text-brand-blue transition-colors"
                    >
                        <ShoppingCart size={22} strokeWidth={2.5} />
                        <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-brand-dark p-1 hover:text-brand-blue transition-colors"
                    >
                        <Menu size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Cart Drawer Overlay */}
            <CartDrawer />
        </header>
    );
}

