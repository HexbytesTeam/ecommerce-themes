"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // 3D Tilt Logic for Glass Card
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out"
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transition: "transform 0.5s ease-out"
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setTimeout(() => setIsSent(false), 5000);
        }, 2000);
    };

    return (
        <div className="bg-white min-h-screen overflow-x-hidden">
            {/* Header / Banner */}
            <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-brand-yellow rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-blue rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                    <span className="inline-block bg-brand-blue text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
                        Contact Us
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 italic">
                        Let's Talk <span className="text-brand-yellow drop-shadow-lg">Happy Tails</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Have questions about nutrition or orders? Our pet-loving team is here to help you 24/7.
                    </p>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Contact Info Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-gray-50 p-10 rounded-[40px] border-2 border-transparent hover:border-brand-blue/20 transition-all group">
                                <div className="w-14 h-14 bg-brand-blue text-white rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <h3 className="text-xl font-black text-brand-dark mb-2">Call Us</h3>
                                <p className="text-gray-500 font-bold">+1 (800) FOCO-PET</p>
                                <p className="text-xs text-gray-400 mt-2">Mon-Fri: 9am - 6pm</p>
                            </div>

                            <div className="bg-gray-50 p-10 rounded-[40px] border-2 border-transparent hover:border-brand-yellow/30 transition-all group">
                                <div className="w-14 h-14 bg-brand-yellow text-brand-dark rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-xl font-black text-brand-dark mb-2">Email Us</h3>
                                <p className="text-gray-500 font-bold">hello@focopet.com</p>
                                <p className="text-xs text-gray-400 mt-2">We reply within 2 hours</p>
                            </div>

                            <div className="bg-brand-dark p-10 rounded-[40px] text-white group">
                                <div className="w-14 h-14 bg-brand-orange text-white rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <MessageSquare size={24} />
                                </div>
                                <h3 className="text-xl font-black mb-2">Live Chat</h3>
                                <p className="text-gray-400 font-medium italic">Chat with a pet expert now.</p>
                                <button className="mt-6 flex items-center gap-2 text-brand-yellow font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform">
                                    Start Chat <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Interactive 3D Form */}
                        <div className="lg:col-span-8">
                            <div
                                ref={cardRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={tiltStyle}
                                className="bg-white rounded-[60px] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-gray-100 will-change-transform"
                            >
                                {/* Decorative Gradient Blob */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-10 italic">Send a Message</h2>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                                                <input required type="text" placeholder="John Doe" className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue rounded-[25px] py-5 px-8 font-bold text-brand-dark outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                                <input required type="email" placeholder="john@example.com" className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue rounded-[25px] py-5 px-8 font-bold text-brand-dark outline-none transition-all" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                                            <select className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue rounded-[25px] py-5 px-8 font-bold text-brand-dark outline-none transition-all appearance-none cursor-pointer">
                                                <option>Order Inquiry</option>
                                                <option>Product Question</option>
                                                <option>Feedback</option>
                                                <option>Wholesale</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Message</label>
                                            <textarea required rows={5} placeholder="Tell us about your pet's needs..." className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue rounded-[35px] py-6 px-8 font-bold text-brand-dark outline-none transition-all resize-none"></textarea>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            className={`w-full py-6 rounded-[30px] font-black text-lg transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3 ${isSent
                                                    ? "bg-green-500 text-white shadow-green-500/20"
                                                    : "bg-brand-dark text-white hover:bg-brand-blue shadow-brand-dark/20"
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </div>
                                            ) : isSent ? (
                                                <>Sent Successfully! 🎉</>
                                            ) : (
                                                <>Send Message <Send size={20} /></>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="text-brand-orange font-black uppercase text-xs tracking-widest block mb-4">Our Base</span>
                            <h2 className="text-4xl md:text-6xl font-black text-brand-dark italic">Visit Our HQ</h2>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-6 rounded-[30px] shadow-lg border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Opening Hours</p>
                                <p className="font-bold text-brand-dark">08:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[500px] md:h-[600px] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15552.190691503912!2d77.5912389146484!3d12.9687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full grayscale contrast-125"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Overlay Detail Card */}
                        <div className="absolute bottom-10 left-10 right-10 md:right-auto bg-brand-dark text-white p-10 rounded-[40px] shadow-2xl md:max-w-md animate-in slide-in-from-left-10 duration-1000">
                            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <MapPin className="text-brand-yellow" /> FocoPet Studio
                            </h3>
                            <p className="text-gray-400 font-medium mb-8 leading-relaxed">
                                123 Pet Lane, Happy Tail City, PC 560001, <br />
                                The heart of premium pet care.
                            </p>
                            <button className="w-full bg-brand-blue text-white py-5 rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
