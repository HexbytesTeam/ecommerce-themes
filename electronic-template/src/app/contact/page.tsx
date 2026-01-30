"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    ArrowRight,
    Check,
    MessageSquare,
    Clock,
    ShieldCheck,
    Globe
} from "lucide-react";

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        setTimeout(() => setFormState("success"), 2000);
        setTimeout(() => {
            setFormState("idle");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 6000);
    };

    const contactInfo = [
        {
            icon: <Phone size={32} />,
            title: "HOTLINE",
            value: "+1 (555) 123-4567",
            sub: "Mon-Fri, 9am - 6pm EST",
            color: "bg-blue-500"
        },
        {
            icon: <Mail size={32} />,
            title: "EMAIL",
            value: "support@hexbytes.com",
            sub: "24/7 Response Time",
            color: "bg-primary"
        },
        {
            icon: <MapPin size={32} />,
            title: "BUREAU",
            value: "San Francisco, CA",
            sub: "123 Tech Plaza, Suite 404",
            color: "bg-purple-500"
        }
    ];

    return (
        <main className="min-h-screen bg-white selection:bg-primary selection:text-secondary">
            {/* Immersive Hero */}
            <section className="relative pt-48 pb-32 bg-secondary overflow-hidden">
                {/* Cinematic Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center lg:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary font-black text-xs tracking-[0.6em] uppercase mb-8"
                        >
                            COMMUNICATIONS HUB
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-7xl md:text-9xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-12"
                        >
                            LEVEL UP YOUR <br />
                            <span className="text-primary italic">CONNECTION</span>
                        </motion.h1>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-12 text-white/40">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Encrypted</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={18} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Rapid Response</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe size={18} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Global Reach</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-24 -mt-16 container relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((info, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            className="group p-12 bg-white rounded-[4rem] border border-gray-100 shadow-2xl hover:shadow-primary/10 hover:-translate-y-4 transition-all duration-500 text-center"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary group-hover:text-secondary group-hover:rotate-12 transition-all duration-500">
                                {info.icon}
                            </div>
                            <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] mb-3">{info.title}</p>
                            <h3 className="text-2xl font-display font-black text-secondary mb-3 uppercase tracking-tighter">
                                {info.value}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                                {info.sub}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-32 container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-20 bg-secondary rounded-[5rem] relative overflow-hidden shadow-3xl text-white"
                    >
                        <AnimatePresence>
                            {formState === "success" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-primary z-30 flex flex-col items-center justify-center p-20 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-8"
                                    >
                                        <Check size={48} className="text-primary" />
                                    </motion.div>
                                    <h3 className="text-4xl font-display font-black text-secondary uppercase mb-4">Transmission Success</h3>
                                    <p className="text-secondary/70 text-lg font-medium">Your request has been beamed to our support fleet.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative z-10">
                            <MessageSquare className="text-primary mb-10" size={48} />
                            <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-4">SEND A <br /><span className="text-primary italic">MESSAGE</span></h2>
                            <p className="text-white/40 text-lg font-medium mb-16">Direct access to the HexBytes hardware & software division.</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase pl-4">YOUR NAME</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="HEX OPERATOR"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 text-xs font-black tracking-widest outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase pl-4">YOUR EMAIL</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="USER@NETWORK.COM"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 text-xs font-black tracking-widest outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase pl-4">INQUIRY SUBJECT</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="HARDWARE DEPLOYMENT"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 text-xs font-black tracking-widest outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase pl-4">YOUR MESSAGE</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="DESCRIBE YOUR REQUEST..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-10 py-8 text-xs font-black tracking-widest outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === "submitting"}
                                    className="w-full py-6 bg-primary text-secondary rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                                >
                                    <span>{formState === "submitting" ? "PREPARING BEAM..." : "SEND TRANSMISSION"}</span>
                                    <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Map & Socials */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-[600px] w-full bg-gray-100 rounded-[5rem] overflow-hidden relative shadow-2xl border-4 border-white"
                        >
                            {/* Styled Map (Dark Themed Embed) */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509311!2d-122.41941548468248!3d37.77492957975931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4451%3A0x21181829f0321703!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1654321098765!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(1.2)" }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Map Overlay Badge */}
                            <div className="absolute top-12 left-12 p-8 bg-secondary/80 backdrop-blur-xl rounded-[3rem] border border-white/10 text-white max-w-[280px] shadow-2xl">
                                <MapPin size={32} className="text-primary mb-6" />
                                <h4 className="text-xl font-display font-black uppercase tracking-tight mb-2">NETWORK CORE</h4>
                                <p className="text-xs text-white/50 leading-relaxed font-medium">Headquartered in the heart of San Francisco's tech sector.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-gray-50 border border-gray-100 rounded-[4rem] flex items-center justify-between group cursor-pointer hover:bg-secondary hover:border-secondary transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <ArrowRight size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-display font-black uppercase tracking-tight group-hover:text-white transition-colors">Career Opportunities</h4>
                                    <p className="text-xs text-gray-400 group-hover:text-white/50 transition-colors font-medium">Join the HexBytes editorial force.</p>
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-primary tracking-widest uppercase">VIEW ROLES</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="py-24 bg-[#fafafa]">
                <div className="container">
                    <div className="max-w-5xl mx-auto p-12 md:p-24 bg-white rounded-[5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-4xl md:text-5xl font-display font-black text-secondary uppercase tracking-tighter mb-4">Quick <span className="text-primary italic">Answers?</span></h3>
                            <p className="text-gray-500 font-medium text-lg">Browse our knowledge base for rapid deployment solutions.</p>
                        </div>
                        <Link
                            href="/faq"
                            className="px-14 py-6 bg-secondary text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-primary hover:text-secondary hover:scale-110 transition-all shadow-xl whitespace-nowrap"
                        >
                            Open FAQ HUB
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
