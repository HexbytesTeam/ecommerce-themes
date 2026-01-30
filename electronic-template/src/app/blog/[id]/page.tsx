"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, MessageCircle, ArrowRight, Check } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default function BlogPostDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const post = BLOG_POSTS.find((p) => p.id === parseInt(resolvedParams.id));

    const [isSaved, setIsSaved] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [commentStatus, setCommentStatus] = useState<"idle" | "success">("idle");

    if (!post) {
        notFound();
    }

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.includes("@")) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 5000);
        }
    };

    const handleAddComment = () => {
        setCommentStatus("success");
        setTimeout(() => setCommentStatus("idle"), 3000);
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Reading Progress Bar */}
            <motion.div
                style={{ scaleX: progressBarWidth }}
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[100]"
            />

            <div className="pt-40 pb-24 container">
                {/* Header Section: Title & Meta */}
                <div className="max-w-4xl mx-auto mb-20 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:gap-5 transition-all group"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Editorial</span>
                        </Link>

                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            <div className="bg-primary text-secondary text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em]">
                                {post.category}
                            </div>
                            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
                                <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-secondary uppercase tracking-tight leading-[0.9] mb-12">
                            {post.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-between border-y border-gray-100 py-10 gap-8">
                            <div className="flex items-center gap-6 text-left">
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-primary overflow-hidden">
                                    <User size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">WRITTEN BY</p>
                                    <p className="text-lg font-black text-secondary uppercase tracking-tighter">{post.author}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 relative">
                                <AnimatePresence>
                                    {showCopied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -top-12 left-0 bg-secondary text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest whitespace-nowrap shadow-xl"
                                        >
                                            Link Copied
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    onClick={handleShare}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all group"
                                >
                                    {showCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                                </motion.button>

                                <motion.button
                                    onClick={() => setIsSaved(!isSaved)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isSaved ? "bg-primary border-primary text-secondary shadow-lg shadow-primary/20" : "bg-white border-gray-100 text-secondary hover:bg-primary hover:text-white hover:border-primary"}`}
                                >
                                    <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Full Image Section with Spacing */}
                <div className="max-w-6xl mx-auto mb-24 overflow-hidden rounded-[4rem] shadow-2xl">
                    <motion.div
                        style={{ scale }}
                        className="relative aspect-video w-full"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Content Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                    {/* Sidebar / Index */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 space-y-12">
                            <div>
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-secondary mb-6 border-b-2 border-primary/20 pb-4">
                                    Journal Index
                                </h4>
                                <nav className="space-y-5">
                                    <button className="block text-xs font-black text-primary tracking-[0.2em] uppercase text-left border-l-2 border-primary pl-6 hover:translate-x-2 transition-all">01. Overview</button>
                                    <button className="block text-xs font-black text-gray-300 tracking-[0.2em] uppercase text-left hover:text-secondary hover:translate-x-2 transition-all pl-6">02. Insights</button>
                                    <button className="block text-xs font-black text-gray-300 tracking-[0.2em] uppercase text-left hover:text-secondary hover:translate-x-2 transition-all pl-6">03. Tech Trends</button>
                                    <button className="block text-xs font-black text-gray-300 tracking-[0.2em] uppercase text-left hover:text-secondary hover:translate-x-2 transition-all pl-6">04. Verdict</button>
                                </nav>
                            </div>

                            <div className="p-10 bg-secondary rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                                <AnimatePresence>
                                    {commentStatus === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="absolute inset-0 bg-primary z-20 flex flex-col items-center justify-center text-center p-6"
                                        >
                                            <Check size={48} className="text-secondary mb-4" />
                                            <p className="text-secondary font-black uppercase tracking-widest text-xs">Login to Comment</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <MessageCircle className="text-primary mb-6" size={32} />
                                <h4 className="text-lg font-display font-black uppercase mb-3">Join The Feed</h4>
                                <p className="text-xs text-white/50 font-medium leading-relaxed mb-8">Share your perspective with the community.</p>
                                <button
                                    onClick={handleAddComment}
                                    className="w-full py-4 bg-primary text-secondary text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-lg active:scale-95"
                                >
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Article Body */}
                    <article className="lg:col-span-8 lg:col-start-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-2xl md:text-3xl font-medium text-secondary/80 leading-relaxed mb-16 italic border-l-8 border-primary pl-12 py-4 bg-gray-50 rounded-r-3xl">
                                {post.excerpt}
                            </div>

                            <div
                                className="prose prose-stone prose-xl md:prose-2xl max-w-none 
                  [&>h3]:text-4xl md:[&>h3]:text-5xl [&>h3]:font-display [&>h3]:font-black [&>h3]:text-secondary [&>h3]:uppercase [&>h3]:tracking-tight [&>h3]:pt-12 [&>h3]:pb-4
                  [&>p]:text-gray-600 [&>p]:leading-[1.8] [&>p]:mb-10
                  [&>ul]:space-y-6 [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-12
                  [&>ul>li]:flex [&>ul>li]:gap-4 [&>ul>li:before]:content-['◆'] [&>ul>li:before]:text-primary [&>ul>li:before]:flex-shrink-0
                "
                                dangerouslySetInnerHTML={{ __html: post.content || "" }}
                            />

                            {/* Newsletter CTA */}
                            <div className="mt-24 p-12 md:p-20 bg-secondary rounded-[4rem] relative overflow-hidden text-center shadow-2xl">
                                <AnimatePresence>
                                    {isSubscribed && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-primary z-20 flex flex-col items-center justify-center p-12"
                                        >
                                            <Check size={64} className="text-secondary mb-6" />
                                            <h3 className="text-3xl md:text-4xl font-display font-black text-secondary uppercase tracking-tight mb-4">Welcome to the inner circle</h3>
                                            <p className="text-secondary/70 text-lg font-medium">Check your inbox for our latest editorial.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="absolute inset-0 opacity-5 pointer-events-none">
                                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
                                </div>
                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mb-10" />
                                    <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">Never Miss a Pulse</h3>
                                    <p className="text-white/50 text-lg font-medium mb-12">Deep-dives into the future of tech and digital lifestyle. Weekly.</p>
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 border border-white/20 rounded-[2.5rem] backdrop-blur-xl">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="YOUR EMAIL"
                                            className="flex-1 bg-transparent rounded-full px-8 text-xs font-black tracking-widest text-white outline-none placeholder:text-white/20"
                                        />
                                        <button
                                            type="submit"
                                            className="px-10 py-5 bg-primary text-secondary rounded-full font-black text-[10px] tracking-widest uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Tag Cloud */}
                            <div className="mt-20 pt-12 border-t border-gray-100 flex flex-wrap items-center gap-6">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">INSIGHT TAGS:</span>
                                <div className="flex flex-wrap gap-3">
                                    {["FUTURE", post.category, "HEXBYTES", "TECH", "DIGITAL"].map(tag => (
                                        <span key={tag} className="text-[10px] font-black text-secondary bg-gray-50 border border-gray-100 px-6 py-2.5 rounded-full hover:bg-primary/10 hover:border-primary/20 transition-all uppercase tracking-widest cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </article>
                </div>
            </div>

            {/* Read Next Section */}
            <section className="py-32 bg-[#fafafa] border-t border-gray-100">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="flex items-center gap-8">
                            <div className="w-3 h-16 bg-primary rounded-full"></div>
                            <div>
                                <p className="text-primary font-black text-xs tracking-[0.5em] uppercase mb-2">EXPLORE FURTHER</p>
                                <h2 className="text-5xl md:text-6xl font-display font-black text-secondary tracking-tighter uppercase">CONTINUE THE <br /><span className="text-primary italic">JOURNEY</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((related, idx) => (
                            <motion.div
                                key={related.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                            >
                                <Link href={`/blog/${related.id}`} className="group flex flex-col sm:flex-row gap-10 bg-white p-10 rounded-[4rem] border border-gray-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 h-full">
                                    <div className="relative w-full sm:w-48 aspect-square rounded-[3rem] overflow-hidden flex-shrink-0 shadow-lg">
                                        <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                                    </div>
                                    <div className="flex flex-col justify-center py-4">
                                        <div className="bg-gray-50 text-primary text-[8px] font-black tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full inline-block self-start">
                                            {related.category}
                                        </div>
                                        <h4 className="text-2xl font-display font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 uppercase leading-none mb-8 tracking-tighter">
                                            {related.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-secondary text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-8 transition-all">
                                            <span>READ MORE</span>
                                            <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-primary transition-colors shadow-lg">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
