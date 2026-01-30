"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Search, Tag, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

const CATEGORIES = ["All", "Innovation", "Lifestyle", "Gaming", "Mobiles", "Smart Home", "Audio"];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const featuredPost = BLOG_POSTS.find(p => p.featured);

    return (
        <main className="pt-32 pb-24 min-h-screen bg-[#f8f8f8]">
            <div className="container">
                {/* Editorial Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12"
                    >
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-1.5 bg-primary rounded-full"></div>
                                <p className="text-primary font-black text-xs tracking-[0.4em] uppercase">HexBytes Insights</p>
                            </div>
                            <h1 className="text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight uppercase leading-[0.9]">
                                The <span className="text-primary italic">Editorial</span> <br />
                                Archive
                            </h1>
                            <p className="mt-8 text-lg text-gray-500 font-medium leading-relaxed">
                                Expert perspectives on technology, design, and the digital lifestyle.
                                Curated by the HexBytes team for the curious mind.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-8 py-5 bg-white rounded-full text-xs font-bold tracking-widest text-secondary shadow-sm border border-gray-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300 placeholder:uppercase"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Categories Bar */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {CATEGORIES.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all ${selectedCategory === cat ? "bg-secondary text-white shadow-xl shadow-secondary/20" : "bg-white text-gray-400 hover:text-primary hover:bg-white"}`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Featured Post (Only show if search/category allows it) */}
                {selectedCategory === "All" && searchQuery === "" && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <Link href={`/blog/${featuredPost.id}`} className="group relative block aspect-[21/9] w-full rounded-[3.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80" />

                            <div className="absolute inset-x-12 bottom-12 flex flex-col items-start gap-6 max-w-3xl">
                                <div className="bg-primary text-secondary text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">
                                    FEATURED STORY
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[0.9]">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-white/70 font-medium line-clamp-2">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-primary group-hover:gap-5 transition-all">
                                    <span>Continue Reading</span>
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.filter(p => selectedCategory !== "All" || searchQuery !== "" || !p.featured).map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${post.id}`} className="group block space-y-8 h-full bg-white p-6 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <div className="bg-white/90 backdrop-blur-md text-secondary text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
                                                <Tag size={10} className="text-primary" />
                                                {post.category}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex flex-col h-full">
                                        <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                                        </div>

                                        <h3 className="text-2xl font-display font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm font-medium line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative">
                                                    <User size={16} className="absolute center text-gray-400" />
                                                </div>
                                                <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{post.author}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] group/read transition-all">
                                                <span>Read More</span>
                                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-secondary group-hover/read:bg-primary group-hover/read:border-primary transition-all">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-display font-black text-secondary uppercase mb-2">No articles found</h3>
                        <p className="text-gray-400 font-medium">Try searching for something else or browse another category.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                            className="mt-8 px-10 py-4 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all"
                        >
                            View All Articles
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
