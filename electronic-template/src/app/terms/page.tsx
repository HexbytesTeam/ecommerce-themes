"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Gavel, Scale, ShieldAlert, FileWarning, Globe, Mail, CheckCircle2 } from "lucide-react";

export default function TermsAndConditions() {
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
                            TERMS OF <br /><span className="text-primary italic">ENGAGEMENT</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-white/50 text-lg font-medium leading-relaxed">
                            The rules of the HexBytes ecosystem. By interacting with our platform,
                            you agree to adhere to these premium standards of digital conduct.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 container">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
                        {[
                            { icon: <Scale className="text-primary" size={24} />, title: "FAIR USE", desc: "Respect common-sense usage and discovery." },
                            { icon: <CheckCircle2 className="text-primary" size={24} />, title: "OWNERSHIP", desc: "HexBytes retain all IP on editorial content." },
                            { icon: <ShieldAlert className="text-primary" size={24} />, title: "LIABILITY", desc: "Terms strictly limit service responsibility." }
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
                        <h2>01. SERVICE ACCESS</h2>
                        <p>
                            HexBytes provides deep-dive tech editorial and e-commerce services. Access to these
                            services is granted on a temporary basis, and we reserve the right to withdraw or
                            amend the service without notice. We are not liable if for any reason our site is
                            unavailable at any time.
                        </p>
                        <ul>
                            <li>Unauthorized data scraping is strictly prohibited</li>
                            <li>User comments must adhere to community guidelines</li>
                            <li>Intentional service disruption will result in a permanent ban</li>
                        </ul>

                        <h2>02. INTELLECTUAL PROPERTY</h2>
                        <p>
                            All articles, images, code snippets, and brand assets on this platform are the
                            exclusive property of HexBytes. Any reproduction, distribution, or commercial
                            use without explicit written consent is a violation of our editorial protocol.
                        </p>

                        <h2>03. USER CONTRIBUTIONS</h2>
                        <p>
                            By posting comments or joining "The Feed", you grant HexBytes a non-exclusive,
                            royalty-free license to use, reproduce, and distribution your contributions.
                            You represent that any content you post does not violate third-party rights.
                        </p>

                        <h2>04. LIMITATION OF LIABILITY</h2>
                        <p>
                            HexBytes provides information 'as is'. While we strive for absolute technical
                            accuracy, we make no guarantees regarding the completeness or timeliness of
                            our insights. We are not responsible for any decisions made based on our
                            editorial content.
                        </p>

                        <div className="mt-20 p-12 bg-secondary rounded-[4rem] text-white text-center shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <Gavel className="text-primary mb-6 mx-auto" size={48} />
                                <h3 className="text-3xl font-display font-black uppercase tracking-tight mb-4 text-white">Legal Inquiry?</h3>
                                <p className="text-white/50 text-lg font-medium mb-12">For formal clarification on our engagement terms, contact our bureau.</p>
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
