"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-white pt-20 pb-10">
            <div className="container">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Branding Column */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-display tracking-tighter uppercase italic">
                                <span className="text-white">Hex</span>
                                <span className="text-primary">Bytes</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Our aim is to provide high quality, easy to use, fastest and affordable shopify themes.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <span className="text-white">Phone :</span>
                                <span className="text-gray-400">(440) 000 000 0000</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <span className="text-white">Email :</span>
                                <span className="text-gray-400">sales@yousite.com</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 pt-2">
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Information Column */}
                    <div>
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-8">INFORMATION</h4>
                        <ul className="space-y-4">
                            <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Career</Link></li>
                            <li><Link href="/profile" className="text-sm text-gray-400 hover:text-white transition-colors">My Account</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">My Cart</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Orders and Returns</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Popular Collections Column */}
                    <div>
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-8">POPULAR COLLECTIONS</h4>
                        <ul className="space-y-4">
                            {["Laptop & Computer", "Audio Accessories", "Smartphones & Tablets", "Video Games", "Sound Bars", "LED TVs", "Weekly Special"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div>
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-8">CUSTOMER SERVICE</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Help & FAQs</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Customer Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Download App Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 border-t border-white/5">
                    {/* Newsletter */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-4">SUBSCRIBE TO OUR NEWSLETTER</h4>
                            <p className="text-gray-400 text-sm">Get notified about product launches, special offers and news.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row max-w-xl">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-white px-6 py-4 text-secondary text-sm focus:outline-none"
                            />
                            <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 font-bold text-xs tracking-widest uppercase transition-all">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>

                    {/* Download App */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-4">DOWNLOAD APP</h4>
                            <p className="text-gray-400 text-sm">HexBytes App is now available on App Store & Google Play. Get it now.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="#" className="hover:scale-105 transition-transform">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={140} height={42} />
                            </Link>
                            <Link href="#" className="hover:scale-105 transition-transform">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={158} height={42} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
                    <p className="text-gray-500 text-xs font-medium">
                        © 2025 HexBytes. All Rights Reserved
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 grayscale brightness-200 opacity-60">
                            <div className="relative w-10 h-6">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" fill className="object-contain" />
                            </div>
                            <div className="relative w-10 h-6">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" fill className="object-contain" />
                            </div>
                            <div className="relative w-10 h-6">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
