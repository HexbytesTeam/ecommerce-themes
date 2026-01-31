"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { ALL_BLOGS, BlogPost } from "@/data/blogs";
import FloatingFood from "@/components/FloatingFood";

const CATEGORIES = ["All", "Health", "Nutrition", "Training", "Accessories"] as const;

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredBlogs = useMemo(() => {
        return ALL_BLOGS.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen pt-20">
            {/* Blog Hero Section */}
            <section className="relative bg-brand-dark py-24 px-4 md:px-12 overflow-hidden">
                <FloatingFood />
                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <nav className="flex items-center gap-2 text-brand-yellow/60 text-xs font-black uppercase tracking-widest mb-6">
                            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-brand-yellow">Blog</span>
                        </nav>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 italic leading-tight">
                            Pet Advice & <br /> <span className="text-brand-yellow">Community Stories</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-bold leading-relaxed max-w-xl">
                            Expert tips, heartwarming stories, and the latest news for pet parents. We're here to help you and your furry friends live your best lives.
                        </p>
                    </div>
                </div>
                {/* Decorative Paw */}
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none transform rotate-12">
                    <PawSVG size={400} />
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="bg-white border-b border-gray-100 py-8 sticky top-20 z-30 shadow-sm">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue rounded-full py-3 pl-12 pr-6 font-bold text-brand-dark outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 px-4 md:px-12 bg-white">
                <div className="container mx-auto">
                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredBlogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 font-bold text-xl italic">No articles found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}
                                className="mt-4 text-brand-blue font-black hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <article className="group flex flex-col h-full bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <Link href={`/blog/${blog.id}`} className="block relative h-64 overflow-hidden">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-brand-yellow text-brand-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {blog.category}
                </div>
            </Link>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-orange" /> {blog.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-orange" /> {blog.readTime}</span>
                </div>

                <Link href={`/blog/${blog.id}`}>
                    <h3 className="text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                    {blog.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <User size={14} />
                        </div>
                        <span className="text-[11px] font-black text-brand-dark uppercase tracking-wider">{blog.author}</span>
                    </div>
                    <Link href={`/blog/${blog.id}`} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark group-hover:bg-brand-orange group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function PawSVG({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z M30 40 C 35 40 35 45 30 45 C 25 45 25 40 30 40 Z M70 40 C 75 40 75 45 70 45 C 65 45 65 40 70 40 Z M50 25 C 55 25 55 30 50 30 C 45 30 45 25 50 25 Z" />
        </svg>
    );
}
