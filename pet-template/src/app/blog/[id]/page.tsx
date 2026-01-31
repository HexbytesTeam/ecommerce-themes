"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_BLOGS } from "@/data/blogs";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, ChevronRight, Share2, Printer } from "lucide-react";
import FloatingFood from "@/components/FloatingFood";
import { notFound } from "next/navigation";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const blog = ALL_BLOGS.find(b => b.id === id);

    if (!blog) return notFound();

    const handleShare = () => {
        if (typeof window !== "undefined" && navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.excerpt,
                url: window.location.href,
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard! 🐾");
        }
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") window.print();
    };

    return (
        <main className="min-h-screen pt-20 bg-white">
            {/* Immersive Header */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-white"></div>

                <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                    <nav className="flex items-center justify-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest mb-8">
                        <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/blog" className="hover:text-brand-yellow transition-colors">Blog</Link>
                        <ChevronRight size={12} />
                        <span className="text-brand-yellow">{blog.category}</span>
                    </nav>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 italic leading-tight max-w-5xl mx-auto drop-shadow-2xl">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-[10px] md:text-xs font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-brand-orange px-4 py-2 rounded-full"><User size={14} /> {blog.author}</span>
                        <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"><Calendar size={14} /> {blog.date}</span>
                        <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"><Clock size={14} /> {blog.readTime}</span>
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <article className="container mx-auto px-4 md:px-12 py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Sidebar/Actions */}
                        <aside className="lg:w-24 flex lg:flex-col gap-4 sticky top-40 h-fit z-20">
                            <button
                                onClick={handleShare}
                                className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-all shadow-sm group"
                                title="Share Article"
                            >
                                <Share2 size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                                onClick={handlePrint}
                                className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-orange hover:text-white transition-all shadow-sm group"
                                title="Print Article"
                            >
                                <Printer size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <Link
                                href="/blog"
                                className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center text-white hover:bg-brand-blue transition-all shadow-lg group"
                                title="Back to Blog"
                            >
                                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </aside>

                        {/* Text Content */}
                        <div className="flex-1">
                            <div className="prose prose-xl prose-slate max-w-none">
                                <p className="text-2xl font-bold text-brand-dark italic mb-12 leading-relaxed border-l-8 border-brand-yellow pl-10">
                                    {blog.excerpt}
                                </p>

                                <div className="space-y-8 text-gray-500 font-medium leading-loose text-lg">
                                    <p>
                                        Welcome To FocoPet, Your Ultimate Online Pet Store! At Super Tails, We're More Than Just An Online Pet Food Shop – We're Your Partners In Pet Parenting. Ensuring Your Furry, Feathered, And Scaly Friends Live Their Happiest, Healthiest Lives Ever Is Our Priority.
                                    </p>

                                    <h3 className="text-3xl font-black text-brand-dark pt-8">The Core Essentials</h3>
                                    <p>
                                        Whether You're A First-Time Pet Owner Or A Seasoned Pro, Understanding The Nuances Of Pet Care Is Crucial. From Nutrient-Rich Feeds To The Latest Interactive Toys, Selecting The Right Products Can Significantly Impact Your Pet's Quality Of Life.
                                    </p>

                                    <div className="bg-brand-yellow/10 p-12 rounded-[50px] border-4 border-brand-yellow/20 relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <h4 className="text-2xl font-black text-brand-dark mb-4 italic">Quick Pro-Tip</h4>
                                            <p className="text-brand-dark font-bold italic">"Consistency Is Key In Pet Training And Nutrition. Establish A Routine That Works For Both You And Your Pet To Ensure Long-Term Success."</p>
                                        </div>
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 scale-[2] pointer-events-none text-brand-dark">
                                            <PawSVG size={100} />
                                        </div>
                                    </div>

                                    <p>
                                        At FocoPet, We Curate Our Inventory To Include Only The Best For Your Companions. Our Range Includes Organic Options, Specialized Clinical Diets, And Accessories Designed For Both Comfort And Durability.
                                    </p>
                                </div>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-24 p-12 bg-gray-50 rounded-[50px] flex flex-col md:flex-row items-center gap-10 border border-gray-100 relative overflow-hidden">
                                <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-white shadow-xl flex-shrink-0">
                                    <User className="w-full h-full p-6 text-brand-blue" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-2 block">Written By</span>
                                    <h4 className="text-3xl font-black text-brand-dark mb-4">{blog.author}</h4>
                                    <p className="text-gray-400 font-bold leading-relaxed">
                                        Dedicated pet health expert with over 10 years of experience in veterinary nutrition and behavioral therapy. Passionate about helping pets and their owners bond through science-backed care.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts CTA */}
            <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
                <FloatingFood />
                <div className="container mx-auto px-4 md:px-12 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 italic">More To <span className="text-brand-yellow">Explore</span></h2>
                    <Link href="/blog" className="inline-flex items-center gap-4 bg-brand-yellow text-brand-dark px-12 py-5 rounded-[25px] font-black text-lg hover:bg-white hover:text-brand-blue transition-all transform hover:scale-105 shadow-2xl">
                        Back To Blog Hub <ArrowRight size={24} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function PawSVG({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z M30 40 C 35 40 35 45 30 45 C 25 45 25 40 30 40 Z M70 40 C 75 40 75 45 70 45 C 65 45 65 40 70 40 Z M50 25 C 55 25 55 30 50 30 C 45 30 45 25 50 25 Z" />
        </svg>
    );
}
