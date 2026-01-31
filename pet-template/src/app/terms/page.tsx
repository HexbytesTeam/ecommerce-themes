"use client";

import Link from "next/link";
import { ChevronRight, Shield, FileText, Scale, HelpCircle, ArrowRight } from "lucide-react";
import FloatingFood from "@/components/FloatingFood";

const SECTIONS = [
    { id: "acceptance", title: "Acceptance of Terms", icon: <CheckCircle className="text-brand-blue" size={20} /> },
    { id: "registration", title: "User Registration", icon: <User className="text-brand-blue" size={20} /> },
    { id: "orders", title: "Orders & Payments", icon: <ShoppingCart className="text-brand-blue" size={20} /> },
    { id: "shipping", title: "Shipping & Delivery", icon: <Truck className="text-brand-blue" size={20} /> },
    { id: "returns", title: "Returns & Refunds", icon: <RotateCcw className="text-brand-blue" size={20} /> },
    { id: "content", title: "Intellectual Property", icon: <FileText className="text-brand-blue" size={20} /> },
];

import { CheckCircle, User, ShoppingCart, Truck, RotateCcw } from "lucide-react";

export default function TermsPage() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen pt-20 bg-white">
            {/* Hero Section */}
            <section className="relative bg-brand-yellow py-24 px-4 md:px-12 overflow-hidden">
                <FloatingFood />
                <div className="container mx-auto relative z-10 text-center">
                    <nav className="flex items-center justify-center gap-2 text-brand-dark/60 text-xs font-black uppercase tracking-widest mb-6">
                        <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-brand-blue">Terms & Conditions</span>
                    </nav>
                    <h1 className="text-5xl md:text-7xl font-black text-brand-dark mb-8 italic leading-tight">
                        Terms of <span className="text-brand-blue">Service</span>
                    </h1>
                    <p className="text-brand-dark/70 text-lg font-bold leading-relaxed max-w-2xl mx-auto">
                        Please read these terms carefully before using FocoPet. By accessing our platform, you agree to be bound by these legal conditions.
                    </p>
                </div>
                {/* Decorative Paw */}
                <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none transform rotate-12">
                    <PawSVG size={400} />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Static Navigation Sidebar */}
                        <aside className="lg:w-1/4">
                            <div className="sticky top-40 bg-gray-50 rounded-[40px] p-8 border border-gray-100">
                                <h3 className="text-xl font-black text-brand-dark mb-8 flex items-center gap-3">
                                    <Scale className="text-brand-blue" /> Quick Nav
                                </h3>
                                <div className="space-y-2">
                                    {SECTIONS.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white hover:text-brand-blue hover:shadow-md transition-all font-bold text-gray-500 text-sm flex items-center gap-4 group"
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

                                <div id="acceptance" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <Shield className="text-brand-blue" size={24} />
                                        </div>
                                        1. Acceptance of Terms
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            By accessing and using FocoPet ("the Website"), you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please do not use our services.
                                        </p>
                                        <p>
                                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the platform after changes are posted constitutes your acceptance of the new terms.
                                        </p>
                                    </div>
                                </div>

                                <div id="registration" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <User className="text-brand-blue" size={24} />
                                        </div>
                                        2. User Registration
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            In order to access certain features of the platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process.
                                        </p>
                                        <p>
                                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                                        </p>
                                    </div>
                                </div>

                                <div id="orders" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <ShoppingCart className="text-brand-blue" size={24} />
                                        </div>
                                        3. Orders & Payments
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            All orders placed through FocoPet are subject to availability and acceptance by us. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase.
                                        </p>
                                        <p>
                                            Prices for our products are subject to change without notice. Payment must be made through our secure payment gateway at the time of purchase. We accept various payment methods as indicated on the checkout page.
                                        </p>
                                    </div>
                                </div>

                                <div id="shipping" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <Truck className="text-brand-blue" size={24} />
                                        </div>
                                        4. Shipping & Delivery
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            We aim to deliver your pet products as quickly as possible. Delivery times are estimates and not guaranteed. Shipping costs and estimated delivery times will be calculated and displayed at checkout.
                                        </p>
                                        <p>
                                            Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. We are not responsible for any delays caused by the shipping carrier or customs.
                                        </p>
                                    </div>
                                </div>

                                <div id="returns" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <RotateCcw className="text-brand-blue" size={24} />
                                        </div>
                                        5. Returns & Refunds
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            We want you and your pets to be 100% happy. If you are not satisfied with your purchase, you may return eligible items within 30 days of delivery.
                                        </p>
                                        <p>
                                            Items must be in their original packaging and condition to be eligible for a refund. Please note that certain items, such as perishable goods or opened supplements, may not be eligible for return due to health and safety reasons.
                                        </p>
                                    </div>
                                </div>

                                <div id="content" className="scroll-mt-40">
                                    <h2 className="text-4xl font-black text-brand-dark mb-8 italic flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                            <FileText className="text-brand-blue" size={24} />
                                        </div>
                                        6. Intellectual Property
                                    </h2>
                                    <div className="text-gray-500 font-medium leading-loose space-y-6">
                                        <p>
                                            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of FocoPet and is protected by international copyright and trademark laws.
                                        </p>
                                        <p>
                                            You may not reproduce, distribute, or create derivative works from any part of the website without our express written permission.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Help CTA */}
            <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-12 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-20 h-20 rounded-full bg-brand-yellow/10 flex items-center justify-center mx-auto mb-8">
                            <HelpCircle className="text-brand-yellow" size={40} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 italic">Still Have <span className="text-brand-yellow">Questions?</span></h2>
                        <p className="text-gray-400 font-bold mb-10 leading-relaxed">
                            Our customer support team is always ready to help you with any legal or service-related queries you might have.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-4 bg-brand-yellow text-brand-dark px-12 py-5 rounded-[25px] font-black text-lg hover:bg-white hover:text-brand-blue transition-all transform hover:scale-105 shadow-2xl">
                            Contact Support <ArrowRight size={24} />
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
