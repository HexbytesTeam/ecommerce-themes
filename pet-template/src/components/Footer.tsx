"use client";

import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-yellow pt-24 pb-12 rounded-t-[80px] md:rounded-t-[120px] relative overflow-hidden">
            {/* Background Decorative Paw */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-[0.05] pointer-events-none">
                <PawSVG size={600} className="text-brand-dark" />
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Newsletter & Info */}
                    <div className="lg:col-span-5">
                        <h2 className="text-3xl font-black text-brand-dark mb-6">Stay Posted To Receive Updates</h2>
                        <div className="relative mb-8 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="w-full bg-white rounded-full py-6 pl-8 pr-20 font-bold text-brand-dark outline-none shadow-xl"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-orange text-white p-4 rounded-full hover:bg-brand-blue transition-all shadow-lg">
                                <Send size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4 mb-12">
                            <SocialIcon icon={<Facebook size={20} />} href="#" />
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                            <SocialIcon icon={<Youtube size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xl font-black text-brand-dark mb-8 uppercase tracking-widest">Navigation</h4>
                            <ul className="space-y-4">
                                <FooterLink href="/">Home</FooterLink>
                                <FooterLink href="/about">About Us</FooterLink>
                                <FooterLink href="/shop">Shop</FooterLink>
                                <FooterLink href="/about">Brand Story</FooterLink>
                                <FooterLink href="/testimonials">Testimonials</FooterLink>
                                <FooterLink href="/toys">Animals Toys</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-brand-dark mb-8 uppercase tracking-widest">Help</h4>
                            <ul className="space-y-4">
                                <FooterLink href="/contact">Customer Support</FooterLink>
                                <FooterLink href="/about">How It Works</FooterLink>
                                <FooterLink href="/terms">Terms & Condition</FooterLink>
                                <FooterLink href="/contact">Contact Us</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Large Logo & Brand Mark */}
                <div className="mt-24 pt-12 border-t border-brand-dark/10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-8">
                        <div className="text-brand-dark/10">
                            <PawSVG size={120} />
                        </div>
                        <h1 className="text-7xl md:text-[150px] font-black text-transparent stroke-brand-dark stroke-[2px] opacity-10 leading-none select-none" style={{ WebkitTextStroke: "2px #1A1D23" }}>
                            FocoPet
                        </h1>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-black text-brand-dark uppercase tracking-widest">
                    <p>© Youth Party 123. All Rights Reserved 2024</p>
                    <div className="flex gap-8">
                        <Link href="/terms" className="hover:text-brand-orange transition-colors">Terms & Condition</Link>
                        <Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <li>
            <Link href={href} className="text-brand-dark/70 font-bold hover:text-brand-orange transition-colors flex items-center gap-2 group">
                <div className="w-1 h-1 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-brand-dark text-brand-yellow flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-lg transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function PawSVG({ size, className }: { size: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" className={className}>
            <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z M30 40 C 35 40 35 45 30 45 C 25 45 25 40 30 40 Z M70 40 C 75 40 75 45 70 45 C 65 45 65 40 70 40 Z M50 25 C 55 25 55 30 50 30 C 45 30 45 25 50 25 Z" />
        </svg>
    );
}
