"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Globe, Mail } from "lucide-react";

export default function PrivacyPolicy() {
    const { scrollYProgress } = useScroll();
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <main className="min-h-screen bg-white">
            {/* Reading Progress Bar */}
            <motion.div
                style={{ scaleX: progressBarWidth }}
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[100]"
            />

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
                </div>

                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:gap-5 transition-all group"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Pulse</span>
                        </Link>

                        <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                            PRIVACY <br /><span className="text-primary italic">PROTOCOL</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-white/50 text-lg font-medium leading-relaxed">
                            At HexBytes, your data is treated with the same precision as our tech insights.
                            Transparent, secure, and always under your control.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 container">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
                        {[
                            { icon: <Lock className="text-primary" size={24} />, title: "SECURE", desc: "Military-grade encryption for all user data." },
                            { icon: <Eye className="text-primary" size={24} />, title: "PRIVATE", desc: "No third-party selling. Ever." },
                            { icon: <Globe className="text-primary" size={24} />, title: "GLOBAL", desc: "GDPR and CCPA compliant standards." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col items-center gap-4"
                            >
                                {item.icon}
                                <h3 className="text-xs font-black tracking-widest text-secondary uppercase">{item.title}</h3>
                                <p className="text-xs text-secondary/60 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="prose prose-stone prose-xl md:prose-2xl max-w-none 
            [&>h2]:text-4xl md:[&>h2]:text-5xl [&>h2]:font-display [&>h2]:font-black [&>h2]:text-secondary [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:pt-12 [&>h2]:pb-4
            [&>p]:text-gray-600 [&>p]:leading-[1.8] [&>p]:mb-10
            [&>ul]:space-y-6 [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-12
            [&>ul>li]:flex [&>ul>li]:gap-4 [&>ul>li:before]:content-['◆'] [&>ul>li:before]:text-primary [&>ul>li:before]:flex-shrink-0
          ">
                        <h2>01. DATA COLLECTION</h2>
                        <p>
                            We collect information that you provide directly to us through our subscription forms,
                            comment sections, and during purchase processes. This may include your name, email
                            address, and any professional data you choose to share with the HexBytes community.
                        </p>
                        <ul>
                            <li>Contact details for editorial subscriptions</li>
                            <li>Transaction history for premium tech reports</li>
                            <li>Usage analytics to improve your reading experience</li>
                        </ul>

                        <h2>02. HOW WE USE IT</h2>
                        <p>
                            Your data is exclusively used to power the HexBytes experience. We refine our content
                            strategies and product recommendations based on aggregated, anonymous data to ensure
                            we're providing the most relevant tech insights for your lifestyle.
                        </p>

                        <h2>03. COOKIES & TRACKING</h2>
                        <p>
                            We use subtle tracking pixels to understand which tech trends resonate most with our
                            audience. These 'cookies' allow us to remember your preferences and keep your
                            experience seamless across different devices.
                        </p>

                        <h2>04. YOUR RIGHTS</h2>
                        <p>
                            As a reader of HexBytes, you have the full right to access, rectify, or purge your
                            personal data from our systems. We believe in complete data sovereignty for the
                            next-gen user.
                        </p>

                        <div className="mt-20 p-12 bg-secondary rounded-[4rem] text-white text-center shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <Mail className="text-primary mb-6 mx-auto" size={48} />
                                <h3 className="text-3xl font-display font-black uppercase tracking-tight mb-4 text-white">Need Clarification?</h3>
                                <p className="text-white/50 text-lg font-medium mb-12">Our legal team is ready to assist with any protocol inquiries.</p>
                                <Link
                                    href="mailto:legal@hexbytes.com"
                                    className="inline-block px-12 py-5 bg-primary text-secondary rounded-full font-black text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl active:scale-95"
                                >
                                    Contact Legal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Footer Spacer */}
            <div className="h-32"></div>
        </main>
    );
}
