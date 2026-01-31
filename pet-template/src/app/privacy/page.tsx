"use client";

import Link from "next/link";
import { ChevronRight, Shield, Lock, Eye, Database, Bell, ArrowRight, HelpCircle } from "lucide-react";
import FloatingFood from "@/components/FloatingFood";

const SECTIONS = [
    { id: "collection", title: "Information We Collect", icon: <Database className="text-brand-orange" size={20} /> },
    { id: "usage", title: "How We Use Data", icon: <Eye className="text-brand-orange" size={20} /> },
    { id: "protection", title: "How We Protect Data", icon: <Lock className="text-brand-orange" size={20} /> },
    { id: "cookies", title: "Cookies & Tracking", icon: <Bell className="text-brand-orange" size={20} /> },
    { id: "rights", title: "Your Privacy Rights", icon: <Shield className="text-brand-orange" size={20} /> },
];

export default function PrivacyPage() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen pt-20 bg-white">
            {/* Hero Section */}
            <section className="relative bg-brand-blue py-24 px-4 md:px-12 overflow-hidden">
                <FloatingFood />
                <div className="container mx-auto relative z-10 text-center">
                    <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest mb-6">
                        <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-brand-yellow">Privacy Policy</span>
                    </nav>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 italic leading-tight">
                        Privacy & <span className="text-brand-yellow">Data Protection</span>
                    </h1>
                    <p className="text-white/70 text-lg font-bold leading-relaxed max-w-2xl mx-auto">
                        Your trust is our priority. We are committed to protecting your personal information and ensuring your pet's data remains private and secure.
                    </p>
                </div>
                {/* Decorative Paw */}
                <div className="absolute top-0 left-0 p-24 opacity-10 pointer-events-none transform -rotate-12 text-white">
                    <PawSVG size={400} />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Static Navigation Sidebar */}
                        <aside className="lg:w-1/4">
                            <div className="sticky top-40 bg-gray-50 rounded-[40px] p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-black text-brand-dark mb-8 flex items-center gap-3">
                                    <Shield className="text-brand-orange" /> Legal Hub
                                </h3>
                                <div className="space-y-2">
                                    {SECTIONS.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white hover:text-brand-orange hover:shadow-md transition-all font-bold text-gray-500 text-sm flex items-center gap-4 group"
                                        >
                                            <span className="group-hover:scale-110 transition-transform">{section.icon}</span>
                                            {section.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="lg:w-3/4 flex-1">
                            <div className="prose prose-xl prose-slate max-w-none space-y-20">

                                <div id="collection" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                            <Database className="text-brand-orange" size={24} />
                                        </div>
                                        1. Information We Collect
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            We collect information that you provide directly to us, such as when you create an account, make a purchase, or communicate with our pet expert team.
                                        </p>
                                        <ul className="list-disc pl-8 space-y-2">
                                            <li>Contact information (email, phone number, address)</li>
                                            <li>Payment details (processed via secure third-party providers)</li>
                                            <li>Pet profiles (name, breed, age, nutritional needs)</li>
                                            <li>Order history and preferences</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="usage" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                            <Eye className="text-brand-orange" size={24} />
                                        </div>
                                        2. How We Use Data
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            We use your information to provide a personalized shopping experience for you and your pets. This include:
                                        </p>
                                        <ul className="list-disc pl-8 space-y-2">
                                            <li>Processing and delivering your orders efficiently</li>
                                            <li>Sending personalized pet product recommendations</li>
                                            <li>Improving our website and mobile application functionality</li>
                                            <li>Communicating relevant pet care advice and promotional offers</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="protection" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                            <Lock className="text-brand-orange" size={24} />
                                        </div>
                                        3. How We Protect Data
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            We implement robust technical and organizational measures to safeguard your personal data. This includes end-to-end encryption for sensitive data, secure firewalls, and regular security audits.
                                        </p>
                                        <p>
                                            Access to your personal information is restricted to authorized FocoPet employees and partners who need the information to perform their roles.
                                        </p>
                                    </div>
                                </div>

                                <div id="cookies" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                            <Bell className="text-brand-orange" size={24} />
                                        </div>
                                        4. Cookies & Tracking
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            FocoPet uses cookies and similar technologies to enhance your browsing experience. Cookies help us remember your cart items, analyze site traffic, and serve relevant advertisements.
                                        </p>
                                        <p>
                                            You can manage your cookie preferences through your browser settings, though disabling certain cookies may affect your ability to use some features of the platform.
                                        </p>
                                    </div>
                                </div>

                                <div id="rights" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                            <Shield className="text-brand-orange" size={24} />
                                        </div>
                                        5. Your Privacy Rights
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            You have the right to access, correct, or delete your personal information at any time. You can also object to the processing of your data or request a portable copy of your information.
                                        </p>
                                        <p>
                                            To exercise these rights, please contact our data protection officer via the contact methods listed below. We respond to all requests within a timely manner.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-12 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-8">
                            <HelpCircle className="text-brand-orange" size={40} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 italic">Privacy <span className="text-brand-orange">Matters</span></h2>
                        <p className="text-gray-400 font-bold mb-10 leading-relaxed">
                            Have specific concerns about how we handle yours or your pet's data? Our privacy team is here to provide absolute transparency.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-5 rounded-[25px] font-black text-lg hover:bg-brand-blue transition-all transform hover:scale-105 shadow-2xl">
                            Request Data Info <ArrowRight size={24} />
                        </Link>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <FloatingFood />
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
