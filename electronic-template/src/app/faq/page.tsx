"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus, HelpCircle, MessageCircle, ShieldCheck, Zap } from "lucide-react";

const FAQ_DATA = [
    {
        category: "ORDERS",
        questions: [
            {
                q: "How can I track my latest shipment?",
                a: "All HexBytes orders are assigned a unique tracking protocol. You can access your real-time shipment status via the 'Order Tracking' link in the header using your order ID."
            },
            {
                q: "What is your return policy for high-end tech?",
                a: "We offer a 30-day premium return window for all unopened hardware. If your tech doesn't meet the HexBytes standard, we ensure a seamless refund protocol."
            }
        ]
    },
    {
        category: "TECHNICAL",
        questions: [
            {
                q: "Are all products covered by warranty?",
                a: "Every piece of hardware at HexBytes comes with a 1-year global manufacturer warranty, backed by our internal technical support fleet."
            },
            {
                q: "Do you offer technical installation services?",
                a: "For local San Francisco residents, our 'Bureau' team offers white-glove installation services for complex home theater and computing setups."
            }
        ]
    },
    {
        category: "SUBSCRIPTIONS",
        questions: [
            {
                q: "What does the 'Inner Circle' newsletter include?",
                a: "Subscribers get exclusive early access to deep-dive tech reports, hardware drop alerts, and weekly editorial insights before they hit the main feed."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>("0-0");

    const toggleFAQ = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-white">
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
                            href="/contact"
                            className="inline-flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:gap-5 transition-all group"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Communications</span>
                        </Link>

                        <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                            KNOWLEDGE <br /><span className="text-primary italic">PROTOCOL</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-white/50 text-lg font-medium leading-relaxed">
                            Rapid-fire responses to your most critical tech inquiries.
                            The HexBytes guide to a seamless digital lifestyle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="py-24 container">
                <div className="max-w-4xl mx-auto">
                    {FAQ_DATA.map((section, sIdx) => (
                        <div key={section.category} className="mb-20">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-10 border-b border-gray-100 pb-4"
                            >
                                {section.category}
                            </motion.h2>

                            <div className="space-y-4">
                                {section.questions.map((faq, qIdx) => {
                                    const id = `${sIdx}-${qIdx}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <motion.div
                                            key={id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: qIdx * 0.1 }}
                                            className={`group rounded-[2.5rem] border transition-all duration-500 ${isOpen ? "bg-secondary border-secondary shadow-2xl" : "bg-gray-50 border-gray-100 hover:border-primary/30"}`}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(id)}
                                                className="w-full text-left p-8 md:p-10 flex items-center justify-between gap-6"
                                            >
                                                <span className={`text-xl md:text-2xl font-display font-black uppercase tracking-tight transition-colors duration-500 ${isOpen ? "text-white" : "text-secondary group-hover:text-primary"}`}>
                                                    {faq.q}
                                                </span>
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-primary text-secondary rotate-180" : "bg-white text-secondary group-hover:bg-primary/10"}`}>
                                                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5, ease: "circOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-8 md:px-10 pb-10 text-white/50 text-lg font-medium leading-relaxed border-t border-white/5 pt-8">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Quick Support CTA */}
                    <div className="mt-32 p-12 md:p-24 bg-gray-50 rounded-[5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                                <HelpCircle className="text-primary" size={24} />
                                <span className="text-xs font-black tracking-widest text-secondary uppercase">STILL CURIOUS?</span>
                            </div>
                            <h3 className="text-4xl font-display font-black text-secondary uppercase tracking-tighter mb-4">Launch a <span className="text-primary italic">Live Inquiry</span></h3>
                            <p className="text-gray-500 font-medium">Our agents are standing by for direct transmission.</p>
                        </div>
                        <Link
                            href="/contact"
                            className="px-14 py-6 bg-secondary text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-primary hover:text-secondary hover:scale-110 transition-all shadow-xl whitespace-nowrap"
                        >
                            Contact BUREAU
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-secondary text-white overflow-hidden relative">
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <MessageCircle className="text-primary" />, title: "24/7 NETWORK", desc: "Constant editorial and support monitoring." },
                            { icon: <ShieldCheck className="text-primary" />, title: "SECURE DATA", desc: "Protocol-level encryption for all queries." },
                            { icon: <Zap className="text-primary" />, title: "RAPID DEPLOY", desc: "Instant answers for critical device issues." }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-xs font-black tracking-widest uppercase mb-2">{feature.title}</h4>
                                    <p className="text-xs text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
