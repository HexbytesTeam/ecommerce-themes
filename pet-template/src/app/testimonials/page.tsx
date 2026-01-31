"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ChevronRight, MessageSquare, Heart, Sparkles } from "lucide-react";
import FloatingFood from "@/components/FloatingFood";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Emily Rodriguez",
        role: "Pet Owner",
        image: "/cat_dog.png",
        rating: 5,
        type: "Dog Owner",
        content: "Focopet Is One Of The Most Popular And Trusted Pet Food Companies, Featuring Whole, Unprocessed Proteins Like Deboned Chicken As Primary Ingredients. More Than Just An Online Pet Food Shop, They're Truly Exceptional."
    },
    {
        id: 2,
        name: "David Chen",
        role: "Vet Specialist",
        image: "/cat_cat.png",
        rating: 5,
        type: "Cat Expert",
        content: "As a veterinarian, I always recommend FocoPet to my clients. Their commitment to clean ingredients and transparent sourcing is unmatched in the industry. My own cats thrive on their premium salmon recipe!"
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        role: "Animal Trainer",
        image: "/cat_bird.png",
        rating: 5,
        type: "Bird Lover",
        content: "Finding high-quality bird seed that isn't just filler is tough. FocoPet's variety packs have noticeably improved my parrot's feather vibrance and energy levels. Plus, the fast delivery is a lifesaver!"
    },
    {
        id: 4,
        name: "James Wilson",
        role: "Shelter Volunteer",
        image: "/cat_dog.png",
        rating: 4,
        type: "Dog Lover",
        content: "We use FocoPet in bulk for our rescue dogs. The improvement in their coat health and digestion within just a week is amazing. It's the only brand we trust for our most sensitive pups."
    },
    {
        id: 5,
        name: "Lisa Maria",
        role: "Pet Blogger",
        image: "/cat_cat.png",
        rating: 5,
        type: "Cat Owner",
        content: "I've reviewed dozens of pet brands, and FocoPet stands out for its packaging, price, and most importantly, pet approval. My picky eater cleared her bowl in seconds! Highly recommended for all pet parents."
    },
    {
        id: 6,
        name: "Robert Fox",
        role: "Aquarium Enthusiast",
        image: "/cat_bird.png",
        rating: 5,
        type: "Fish Owner",
        content: "Their tropical fish flakes are superior. They don't cloud the water and my bettas have never looked healthier. The specialized formulas they offer for different species are exactly what I was looking for."
    }
];

function MouseParallax({ children }: { children: React.ReactNode }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 50;
        const y = (clientY - window.innerHeight / 2) / 50;
        setPosition({ x, y });
    };

    return (
        <div onMouseMove={handleMouseMove} className="relative w-full h-full overflow-hidden">
            <div
                className="transition-transform duration-300 ease-out"
                style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
            >
                {children}
            </div>
        </div>
    );
}

function TiltCard({ children }: { children: React.ReactNode }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 20, y: -y * 20 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 transition-all duration-300"
            style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`
            }}
        >
            {children}
        </div>
    );
}

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <MouseParallax>
                    <div className="absolute top-20 left-[10%] w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-40 right-[15%] w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <FloatingFood />
                </MouseParallax>
            </div>

            {/* Hero Section */}
            <section className="relative px-4 md:px-12 mb-20 z-10">
                <div className="container mx-auto">
                    <TiltCard>
                        <div className="bg-brand-dark rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden group border-4 border-white/5 shadow-2xl">
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/10 to-transparent pointer-events-none"></div>

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 animate-bounce">
                                    <Sparkles size={16} />
                                    Trusted by 10,000+ Pet Parents
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white italic mb-8 leading-tight">
                                    Real Stories from <span className="text-brand-yellow underline decoration-brand-orange">Happy Tails</span>
                                </h1>
                                <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                                    Join our community of pet lovers who trust FocoPet for the very best in nutrition, care, and happiness. Your pet's health is our greatest reward.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="px-4 md:px-12 mb-24 z-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {TESTIMONIALS.map((testimonial, idx) => (
                            <TiltCard key={testimonial.id}>
                                <div className="bg-gray-50 rounded-[40px] p-10 relative group hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border-2 border-transparent hover:border-brand-yellow/30 h-full flex flex-col">
                                    <Quote className="absolute top-8 right-8 text-brand-blue/10 group-hover:text-brand-yellow/20 transition-colors" size={48} />

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-md border-2 border-gray-100">
                                            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover p-2" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-brand-dark leading-tight">{testimonial.name}</h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < testimonial.rating ? "fill-brand-yellow text-brand-yellow" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 font-bold leading-relaxed mb-8 italic flex-1">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                        <span className="text-[10px] font-black uppercase text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full">
                                            {testimonial.type}
                                        </span>
                                        <button className="text-gray-300 group-hover:text-brand-orange transition-colors">
                                            <Heart size={20} className="group-hover:fill-brand-orange" />
                                        </button>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 md:px-12 z-10">
                <div className="container mx-auto">
                    <TiltCard>
                        <div className="bg-brand-yellow rounded-[50px] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-2xl shadow-brand-yellow/20">
                            <div className="absolute bottom-0 right-0 p-8 transform group-hover:translate-x-4 transition-transform duration-500 opacity-20">
                                <MessageSquare size={200} className="text-brand-dark" />
                            </div>

                            <div className="max-w-xl relative z-10 text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 italic leading-tight">
                                    Want to share your <span className="text-white">FocoPet Story?</span>
                                </h2>
                                <p className="text-brand-dark/70 text-lg font-bold">
                                    We'd love to hear about your experience! Share a photo of your pet and your feedback to get a chance to be featured on our wall of fame.
                                </p>
                            </div>

                            <div className="relative z-10">
                                <button className="bg-brand-dark text-white px-10 py-5 rounded-[25px] font-black text-lg flex items-center gap-3 hover:bg-brand-blue transition-all shadow-xl shadow-brand-dark/20 group">
                                    Share Your Story
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </section>
        </main>
    );
}
