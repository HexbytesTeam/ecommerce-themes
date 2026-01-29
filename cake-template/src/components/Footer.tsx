"use client";

import { CreditCard, Truck, RefreshCw, Send, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white pt-20">
            <div className="container mx-auto px-4">
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12 md:pb-20 border-b border-pink-50">
                    <div className="flex items-center gap-5 p-8 bg-[#fff9fa] rounded-3xl">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <CreditCard size={28} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg uppercase tracking-tight">Payment in 3x</h4>
                            <p className="text-sm text-muted-foreground">Easy payments for everyone</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-8 bg-[#fff9fa] rounded-3xl">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <Truck size={28} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg uppercase tracking-tight">Express Delivery</h4>
                            <p className="text-sm text-muted-foreground">Fast shipping from our bakery</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-8 bg-[#fff9fa] rounded-3xl">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <RefreshCw size={28} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg uppercase tracking-tight">Free Returns</h4>
                            <p className="text-sm text-muted-foreground">30 days return guarantee</p>
                        </div>
                    </div>
                </div>

                {/* Promo Banner */}
                <div className="mt-20 bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-white mb-8 relative z-10">Request More Information</h2>
                    <Link href="/contact#contact-form" className="inline-block px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:scale-105 transition-all relative z-10">
                        Contact Us
                    </Link>
                </div>

                {/* Bottom Footer */}
                <div className="py-20 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">H</span>
                        </div>
                        <span className="text-2xl font-serif font-bold">HexBytes</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-serif font-bold text-xl mb-2">Company</h4>
                        <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                        <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Our Blog</Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                        <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 border border-pink-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></button>
                        <button className="w-10 h-10 border border-pink-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></button>
                        <button className="w-10 h-10 border border-pink-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></button>
                    </div>
                </div>

                <div className="pb-10 text-center text-muted-foreground text-sm">
                    Copyright 2025 All Rights Reserved by <a href="https://www.hexbytes.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-bold">HexBytes</a>
                </div>
            </div>
        </footer>
    );
}
