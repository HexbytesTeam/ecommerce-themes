"use client";

import { products } from "@/lib/product-data";
import ProductCard from "@/components/ProductCard";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PreOrdersPage() {
    // Filter products that are marked as pre-order
    const preOrderProducts = products.filter(p => p.isPreOrder);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-purple-900 text-white pt-36 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-white/20">
                        Plan Ahead
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                        Schedule Your <br className="hidden md:block" />Celebration
                    </h1>
                    <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Secure your favorite cakes and treats for future dates.
                        Perfect for weddings, birthdays, and special corporate events.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-left">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white text-purple-900 rounded-full flex items-center justify-center shrink-0">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Pick a Date</h3>
                                <p className="text-sm text-purple-200">Book up to 1 year in advance</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white text-purple-900 rounded-full flex items-center justify-center shrink-0">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Select Time</h3>
                                <p className="text-sm text-purple-200">Guaranteed timely delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
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
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">How Scheduling Works</h2>

                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Choose Your Item</h3>
                                <p className="text-slate-600 leading-relaxed">Select from our premium range of cakes and desserts marked for pre-order.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Pick Date & Time</h3>
                                <p className="text-slate-600 leading-relaxed">Use the calendar on the product page to schedule your delivery slot.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-lg">3</div>
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
