"use client";

import { products } from "@/lib/product-data";
import ProductCard from "@/components/ProductCard";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PreOrdersPage() {
    // Filter products that are marked as pre-order
    const preOrderProducts = products.filter(p => p.isPreOrder);

    return (
        <main className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-pink-100/50 via-white to-pink-50/30 pt-36 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2.5s" }} />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1 bg-primary/10 backdrop-blur-md rounded-full text-primary text-sm font-bold uppercase tracking-widest mb-6 border border-primary/20">
                        Plan Ahead
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-slate-900">
                        Schedule Your <br className="hidden md:block" />Celebration
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Secure your favorite cakes and treats for future dates.
                        Perfect for weddings, birthdays, and special corporate events.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-left">
                        <button
                            onClick={() => document.getElementById('pre-order-products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto bg-white/60 backdrop-blur-md p-4 rounded-xl border border-pink-100 flex items-center gap-4 shadow-sm hover:scale-105 hover:bg-white transition-all cursor-pointer group text-left"
                        >
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">Pick a Date</h3>
                                <p className="text-sm text-slate-500 font-medium">Book up to 1 year in advance</p>
                            </div>
                        </button>
                        <button
                            onClick={() => document.getElementById('pre-order-products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto bg-white/60 backdrop-blur-md p-4 rounded-xl border border-pink-100 flex items-center gap-4 shadow-sm hover:scale-105 hover:bg-white transition-all cursor-pointer group text-left"
                        >
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">Select Time</h3>
                                <p className="text-sm text-slate-500 font-medium">Guaranteed timely delivery</p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20" id="pre-order-products">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900">Available for Pre-Order</h2>
                        <div className="hidden md:flex gap-2">
                            {/* Filters could go here */}
                        </div>
                    </div>

                    {preOrderProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {preOrderProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl">
                            <p className="text-xl text-slate-500 font-medium mb-4">No pre-order items available right now.</p>
                            <Link href="/categories" className="text-primary font-bold hover:underline">Browse all categories</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 bg-pink-50/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">How Scheduling Works</h2>

                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-primary text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Choose Your Item</h3>
                                <p className="text-slate-600 leading-relaxed">Select from our premium range of cakes and desserts marked for pre-order.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-primary text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Pick Date & Time</h3>
                                <p className="text-slate-600 leading-relaxed">Use the calendar on the product page to schedule your delivery slot.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-primary text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">3</div>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Relax & Enjoy</h3>
                                <p className="text-slate-600 leading-relaxed">We'll bake it fresh and deliver it right to your doorstep on time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
