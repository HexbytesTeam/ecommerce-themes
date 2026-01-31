"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Shield, Sparkles, Users, PawPrint } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AboutPage() {
    // Scroll reveal logic
    const [revealTitle, setRevealTitle] = useState(false);
    const storyRef = useRef<HTMLDivElement>(null);
    const [storyVisible, setStoryVisible] = useState(false);

    useEffect(() => {
        setRevealTitle(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStoryVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (storyRef.current) {
            observer.observe(storyRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 3D Card Hover Effect Component
    const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [tiltStyle, setTiltStyle] = useState({});

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            setTiltStyle({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: "transform 0.1s ease-out"
            });
        };

        const handleMouseLeave = () => {
            setTiltStyle({
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: "transform 0.5s ease-out"
            });
        };

        return (
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={tiltStyle}
                className={`relative rounded-[40px] transition-transform duration-500 will-change-transform ${className}`}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen overflow-x-hidden">
            {/* Immersive Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-yellow rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-brand-blue rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 text-center relative z-10">
                    <div className={`transition-all duration-1000 transform ${revealTitle ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <span className="inline-block bg-brand-yellow text-brand-dark px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            Since 2024
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 italic">
                            Because They <br />
                            <span className="text-brand-blue drop-shadow-2xl">Deserve Premium</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            FocoPet isn't just a store. It's a promise to provide the absolute best for our four-legged family members.
                        </p>
                    </div>
                </div>

                {/* Floating 3D-ish Elements */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-32 flex justify-around items-end overflow-hidden pb-4 opacity-50">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <PawPrint key={i} size={40 + i * 10} className="text-brand-yellow/10 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>
            </section>

            {/* Our Story Section */}
            <section ref={storyRef} className="py-24 md:py-40 bg-white">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className={`transition-all duration-1000 transform ${storyVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-10 leading-tight">
                                A Journey of <span className="text-brand-orange italic">Love & Nutrition</span>
                            </h2>
                            <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
                                <p>
                                    Our story began with a simple observation: the local options for pet treats and nutrition were lacking the "WOW" factor. We wanted more than just kibble; we wanted health-conscious, gourmet experiences.
                                </p>
                                <p>
                                    Founded by a group of passionate pet enthusiasts and nutritionists, FocoPet was born to bridge the gap between "standard pet food" and "premium nutrition."
                                </p>
                                <div className="pt-8 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                            <Heart size={30} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-brand-dark">100% Love</h4>
                                            <p className="text-sm">In every pack</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                            <Shield size={30} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-brand-dark">Certified</h4>
                                            <p className="text-sm">Quality Checked</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`relative h-[500px] md:h-[600px] transition-all duration-1000 delay-300 transform ${storyVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                            {/* Multi-layered Image Composite */}
                            <div className="absolute inset-0 bg-brand-yellow rounded-[60px] transform rotate-3 scale-95 opacity-20"></div>
                            <div className="absolute inset-0 bg-brand-blue rounded-[60px] transform rotate--3 scale-95 opacity-20"></div>
                            <div className="absolute inset-0 rounded-[60px] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-700 hover:scale-105">
                                <Image
                                    src="/cat_dog.png"
                                    alt="Happy Pets"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
                            </div>

                            {/* Floating Stat Card */}
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl animate-float">
                                <div className="text-4xl font-black text-brand-blue mb-1">50k+</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Tails</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values with 3D Interaction */}
            <section className="py-24 md:py-40 bg-gray-50 overflow-hidden relative">
                {/* Background Paw watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 scale-[3] pointer-events-none z-0">
                    <PawPrint size={400} />
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-brand-blue font-black uppercase text-xs tracking-[0.3em] mb-4 block">Our DNA</span>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-dark italic">What We Stand For</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Value 1 */}
                        <TiltCard className="bg-white p-12 shadow-xl border border-gray-100 group">
                            <div className="mb-10 w-20 h-20 rounded-3xl bg-brand-blue text-white flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                                <Sparkles size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark mb-6">Purity First</h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                No fillers, no mysterious additives. Just real, whole ingredients sourced from ethical farmers who care as much as we do.
                            </p>
                            <div className="mt-10 h-1.5 w-12 bg-brand-yellow rounded-full transition-all group-hover:w-full duration-700"></div>
                        </TiltCard>

                        {/* Value 2 */}
                        <TiltCard className="bg-brand-dark p-12 shadow-2xl text-white">
                            <div className="mb-10 w-20 h-20 rounded-3xl bg-brand-yellow text-brand-dark flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-500">
                                <Users size={40} />
                            </div>
                            <h3 className="text-2xl font-black mb-6 italic">Community Built</h3>
                            <p className="text-gray-300 font-medium leading-relaxed opacity-80">
                                We listen to our pet parents. Every product in our shop is there because our community asked for it. We are one pack.
                            </p>
                            <div className="mt-10 h-1.5 w-12 bg-brand-blue rounded-full transition-all group-hover:w-full duration-700"></div>
                        </TiltCard>

                        {/* Value 3 */}
                        <TiltCard className="bg-white p-12 shadow-xl border border-gray-100 group">
                            <div className="mb-10 w-20 h-20 rounded-3xl bg-brand-orange text-white flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                                <PawPrint size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark mb-6">Pet-Centricity</h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                If it's not good enough for our own pets, it's not good enough for yours. We test every flavor profile for peak deliciousness.
                            </p>
                            <div className="mt-10 h-1.5 w-12 bg-brand-orange rounded-full transition-all group-hover:w-full duration-700"></div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* Our Vision / Future */}
            <section className="py-24 md:py-40 bg-white">
                <div className="container mx-auto px-4 md:px-12 text-center">
                    <div className="bg-brand-blue rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden group">
                        {/* Interactive Sparkle Effect Placeholder */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent transition-transform duration-1000 group-hover:scale-150"></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-7xl font-black mb-10 italic">Our global vision is to rethink pet health.</h2>
                            <p className="text-xl md:text-2xl font-bold text-white/80 mb-12">
                                Moving beyond "nutrition" towards "well-being" - mental, physical, and emotional.
                            </p>
                            <Link href="/categories" className="bg-brand-yellow text-brand-dark px-12 py-5 rounded-[25px] font-black text-lg inline-flex items-center gap-3 hover:bg-white hover:text-brand-blue transition-all transform active:scale-95 shadow-xl shadow-brand-yellow/20">
                                Join The Movement <ArrowRight size={22} />
                            </Link>
                        </div>

                        {/* Decorative floating paws */}
                        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10">
                            <PawPrint size={300} />
                        </div>
                        <div className="absolute -left-10 bottom-0 translate-y-1/2 opacity-10">
                            <PawPrint size={300} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Animations in CSS */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
