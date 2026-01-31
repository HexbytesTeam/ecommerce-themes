"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Search, Filter, SlidersHorizontal, LayoutGrid, X } from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FloatingFood from "@/components/FloatingFood";

const CATEGORIES = ["All", "Dogs", "Cats", "Birds", "Fish", "Rabbits", "Accessories", "Toys"];
const SORT_OPTIONS = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
];

export default function AllShopPage() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "All";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState<number>(100);
    const [sortBy, setSortBy] = useState("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync state with URL params if they change
    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
        setSelectedCategory(searchParams.get("category") || "All");
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        let results = ALL_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sorting
        switch (sortBy) {
            case "price-asc":
                results.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                results.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                results.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // "newest" - actually no date field, so we just keep original order or shuffle
                break;
        }

        return results;
    }, [searchQuery, selectedCategory, priceRange, sortBy]);

    return (
        <main className="min-h-screen pt-20 bg-gray-50/50">
            {/* Minimal Hero */}
            <section className="bg-brand-dark py-16 px-4 md:px-12 relative overflow-hidden">
                <FloatingFood />
                <div className="container mx-auto relative z-10">
                    <nav className="flex items-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest mb-4">
                        <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-brand-yellow">Shop All</span>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-black text-white italic">
                        Pet <span className="text-brand-yellow">Supplies</span> Hub
                    </h1>
                </div>
            </section>

            <section className="py-12 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Filters */}
                        <aside className={`lg:w-1/4 space-y-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 h-fit sticky top-32 transition-all duration-300 ${isFilterOpen ? "fixed inset-0 z-50 overflow-y-auto lg:relative lg:z-0 lg:block" : "hidden lg:block"}`}>
                            <div className="flex items-center justify-between lg:hidden mb-8">
                                <h3 className="text-xl font-black text-brand-dark italic">Filters</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Search */}
                            <div>
                                <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4">Search Products</h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type to search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-50 rounded-2xl py-4 pl-12 pr-6 font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all border border-transparent focus:border-brand-blue/20"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4">Pet Type</h4>
                                <div className="space-y-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-5 py-3 rounded-xl font-bold text-sm transition-all ${selectedCategory === cat
                                                ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                                                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4 flex justify-between">
                                    Max Price <span>${priceRange}</span>
                                </h4>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="5"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                                />
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
                                    <span>$10</span>
                                    <span>$100</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setPriceRange(100);
                                    setSortBy("newest");
                                }}
                                className="w-full py-4 text-sm font-black text-brand-orange border-2 border-brand-orange/20 rounded-2xl hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest"
                            >
                                Reset Filters
                            </button>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4 flex-1">
                            {/* Toolbar */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsFilterOpen(true)}
                                        className="lg:hidden flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-xl font-bold text-sm"
                                    >
                                        <Filter size={18} /> Filters
                                    </button>
                                    <p className="text-sm font-bold text-gray-400">
                                        Showing <span className="text-brand-dark">{filteredProducts.length}</span> results
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <SlidersHorizontal size={18} className="text-gray-400" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-transparent font-bold text-sm text-brand-dark outline-none cursor-pointer"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-[40px] p-20 text-center border-4 border-dashed border-gray-100">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search size={40} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-dark mb-4 italic">No Products Found</h3>
                                    <p className="text-gray-400 font-bold max-w-sm mx-auto mb-8">
                                        We couldn't find any products matching your current filters. Try adjusting your search or category selection.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("All");
                                            setPriceRange(100);
                                        }}
                                        className="bg-brand-blue text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
