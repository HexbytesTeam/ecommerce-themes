"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import ReviewModal from "@/components/ReviewModal";

export default function TestimonialsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Simulate adding a review
    const handleReviewSubmit = async (review: { name: string; rating: number; content: string }) => {
        // In a real app, this would be an API call
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log("Review submitted:", review);
                resolve();
            }, 1000);
        });
    };

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Food Blogger",
            content: "The cupcakes from HexBytes are simply divine! The texture is perfect and the flavors are incredibly unique. I've featured them on my blog multiple times.",
            rating: 5,
            image: "/assets/customer-review-1.png"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Regular Customer",
            content: "I order from here for every family gathering. The delivery is always on time and the packaging keeps everything fresh and beautiful. Highly recommended!",
            rating: 5,
            image: "/assets/customer-review-2.png"
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Event Planner",
            content: "As an event planner, I need reliable vendors. HexBytes never disappoints. Their custom cakes are works of art and taste even better.",
            rating: 5,
            image: "/assets/profile3.png"
        },
        {
            id: 4,
            name: "David Wilson",
            role: "Chocolate Lover",
            content: "Best chocolate donuts in the city. Period. I don't know what they put in them, but it's addictive in the best way possible.",
            rating: 4,
            image: "/assets/profile4.png"
        },
        {
            id: 5,
            name: "Jessica Taylor",
            role: "Mom of 3",
            content: "My kids absolutely love the colorful macarons. It's our Friday treat tradition now. Thank you for bringing so much joy to our weekends!",
            rating: 5,
            image: "/assets/profile5.png"
        },
        {
            id: 6,
            name: "Robert Anderson",
            role: "Coffee Enthusiast",
            content: "Great pastries to go with my morning coffee. The croissants are flaky and buttery, just how I like them.",
            rating: 4,
            image: "/assets/profile6.png"
        }
    ];

    return (
        <main className="min-h-screen pt-20 bg-[#FFF8F8]">
            {/* Page Header / Hero Section */}
            <section className="relative bg-pink-100 py-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/hero.png')] opacity-10 bg-center bg-cover mix-blend-overlay pointer-events-none" />
                <div className="container mx-auto text-center max-w-4xl relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/50 border border-white text-primary font-bold tracking-widest uppercase text-xs mb-6 animate-slide-up shadow-sm">
                        Community Love
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-6 animate-slide-up leading-tight" style={{ animationDelay: "0.1s" }}>
                        What People Say
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 animate-slide-up font-medium max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
                        Discover why thousands of customers choose HexBytes for their sweetest moments.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-pink-50 hover:shadow-xl transition-all hover:-translate-y-1 relative group flex flex-col h-full"
                            >
                                {/* Review Image (if available) */}
                                {testimonial.image.includes('customer-review') && (
                                    <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <Quote className="text-pink-100 rotate-180 mb-4" size={32} />

                                    <div className="flex gap-1 mb-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "" : "text-gray-200"} />
                                        ))}
                                    </div>

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 relative overflow-hidden flex-shrink-0">
                                        {!testimonial.image.includes('customer-review') ? (
                                            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-yellow-200 flex items-center justify-center text-slate-700 font-bold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-yellow-200 flex items-center justify-center text-slate-700 font-bold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                                        <span className="text-xs text-primary font-bold uppercase tracking-wider">{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-pink-100 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Have you tasted our treats?</h2>
                        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                            We would love to hear your thoughts! Share your experience with us and get a chance to be featured.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-10 py-4 bg-gradient-primary text-white rounded-full font-bold shadow-lg shadow-pink-400/30 hover:scale-105 transition-all"
                        >
                            Write a Review
                        </button>
                    </div>
                </div>
            </section>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReviewSubmit}
            />
        </main>
    );
}
