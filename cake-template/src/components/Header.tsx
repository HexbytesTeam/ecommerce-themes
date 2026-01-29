"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, User, ShoppingBag, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/product-data";
import { useRouter } from "next/navigation"; // Correct import for App Router
import CategoryNav from "./CategoryNav";

export default function Header() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter products based on search query
    const searchResults = searchQuery
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleLinkClick = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button - Visible on small screens */}
                    <button
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                            <Image src="/assets/cupcake.png" width={24} height={24} alt="Logo" className="object-contain" />
                        </div>
                        <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">Hexbytes</span>
                    </Link>
                </div>

                {/* Navigation (Desktop) */}
                <nav className={`hidden lg:flex items-center gap-10 ${isSearchOpen ? 'opacity-0 pointer-events-none w-0' : 'opacity-100'} transition-all duration-300 absolute left-1/2 -translate-x-1/2`}>
                    {["Home", "About", "Categories", "Testimonials", "Blog", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={
                                item === "About" ? "/about" :
                                    item === "Blog" ? "/blog" :
                                        item === "Contact" ? "/contact" :
                                            item === "Categories" ? "/categories" :
                                                item === "Testimonials" ? "/testimonials" :
                                                    item === "Home" ? "/" :
                                                        `/#${item.toLowerCase()}`
                            }
                            className="text-slate-600 hover:text-primary transition-colors font-bold whitespace-nowrap text-sm uppercase tracking-wide"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Icons & Search */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    {/* Search Toggle */}
                    {!isSearchOpen ? (
                        <button
                            onClick={handleSearchClick}
                            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all"
                        >
                            <Search size={18} />
                        </button>
                    ) : (
                        <div ref={searchRef} className="absolute inset-x-0 top-0 h-24 bg-white z-50 flex items-center justify-center px-4 shadow-lg animate-fade-in">
                            <div className="container mx-auto max-w-3xl relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for cakes, desserts..."
                                    value={searchQuery}
                                    autoFocus
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-lg"
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                >
                                    <X size={20} />
                                </button>

                                {/* Search Results Dropdown */}
                                {searchQuery && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-50 overflow-hidden max-h-[60vh] overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            <div className="p-2">
                                                {searchResults.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/product/${product.slug}`}
                                                        onClick={handleLinkClick}
                                                        className="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-xl transition-colors group"
                                                    >
                                                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white">
                                                            <Image src={product.image} alt={product.name} fill className="object-contain" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</p>
                                                            <p className="text-sm text-slate-500">{product.price}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center text-muted-foreground">
                                                <p>No delicious results found.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <Link href="/wishlist" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all relative">
                        <Heart size={18} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all relative">
                        <ShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/profile" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all">
                        <User size={18} />
                    </Link>
                </div>
                {/* Mobile Navigation Menu Overlay */}
                <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />

                <div className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[70] shadow-2xl transition-transform duration-300 transform lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                                    <Image src="/assets/cupcake.png" width={20} height={20} alt="Logo" className="object-contain" />
                                </div>
                                <span className="text-xl font-serif font-bold text-slate-900">HexBytes</span>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-500 rounded-full hover:bg-slate-100">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            {["Home", "About", "Categories", "Testimonials", "Blog", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={
                                        item === "About" ? "/about" :
                                            item === "Blog" ? "/blog" :
                                                item === "Contact" ? "/contact" :
                                                    item === "Categories" ? "/categories" :
                                                        item === "Testimonials" ? "/testimonials" :
                                                            item === "Home" ? "/" :
                                                                `/#${item.toLowerCase()}`
                                    }
                                    className="text-lg font-bold text-slate-800 py-2 border-b border-gray-100 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl mb-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Guest User</div>
                                    <Link href="/login" className="text-xs text-primary font-bold hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <CategoryNav />
        </header>
    );
}
