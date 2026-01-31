"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeftRight, ChevronLeft, ChevronRight, Sparkles, ShoppingBag, Trophy } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

const SLIDES = [
    {
        id: "main",
        bgColor: "bg-brand-blue",
        accentColor: "bg-brand-yellow",
        textColor: "text-brand-dark",
        image: "/focopet_hero_pets.png",
        badge: "Pure Happiness",
        badgeIcon: Sparkles,
        title: "Quality pet food ensures pet well-being",
        desc: "Welcome to FocoPet, your ultimate online pet store! We're more than just a shop – we're your partners in pet parenting.",
        btnText: "Shop Collection",
        href: "/shop"
    },
    {
        id: "food",
        bgColor: "bg-brand-orange",
        accentColor: "bg-white",
        textColor: "text-brand-dark",
        image: "/cat_dog.png",
        badge: "Nutritional Excellence",
        badgeIcon: Trophy,
        title: "Premium Nutrition For Every Breed",
        desc: "Give your furry friends the energy they deserve with our scientifically formulated grain-free diets and treats.",
        btnText: "Explore Food",
        href: "/shop?category=Dogs"
    },
    {
        id: "toys",
        bgColor: "bg-brand-dark",
        accentColor: "bg-brand-yellow",
        textColor: "text-brand-dark",
        image: "/cat_cat.png",
        badge: "New Arrival",
        badgeIcon: ShoppingBag,
        title: "Unlock Their Wild Side Today",
        desc: "Discover our new collection of interactive toys and durable accessories designed for maximum playtime fun.",
        btnText: "Shop Toys",
        href: "/toys"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const nextSlide = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
            setIsExiting(false);
        }, 500);
    }, []);

    const prevSlide = () => {
        setIsExiting(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
            setIsExiting(false);
        }, 500);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const slide = SLIDES[currentSlide];
    const BadgeIcon = slide.badgeIcon;

    return (
        <section className="relative h-auto md:min-h-[800px] flex flex-col md:flex-row overflow-hidden perspective-1000 bg-white">
            {/* Left Side - Dynamic Background and Image */}
            <div className={`${slide.bgColor} flex-1 relative flex items-center justify-center p-8 md:p-12 overflow-hidden transition-colors duration-1000 ease-in-out`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-white rounded-[40px] rotate-45"></div>
                </div>

                <div className={`relative z-10 w-full max-w-lg aspect-square transition-all duration-700 ease-out ${isExiting ? 'scale-90 opacity-0 translate-y-10' : 'scale-105 opacity-100 translate-y-0'}`}>
                    <Image
                        src={slide.image}
                        alt="FocoPet Product"
                        fill
                        className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                        priority
                    />
                </div>

                {/* Counter */}
                <div className="absolute bottom-12 left-12 flex items-center gap-4 z-20">
                    <div className="text-white font-black text-4xl italic opacity-50">0{currentSlide + 1}</div>
                    <div className="w-12 h-[2px] bg-white opacity-20"></div>
                    <div className="text-white font-black text-sm uppercase tracking-widest opacity-50">0{SLIDES.length}</div>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className={`${slide.accentColor} flex-1 flex flex-col justify-center p-8 md:p-20 relative transition-colors duration-1000 ease-in-out`}>
                <div className={`max-w-md transition-all duration-700 delay-100 ${isExiting ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-100'}`}>
                    <div className={`inline-flex items-center gap-2 mb-8 bg-brand-dark/5 px-4 py-2 rounded-full text-brand-dark font-black text-[10px] uppercase tracking-widest`}>
                        <BadgeIcon size={14} className="text-brand-orange" />
                        {slide.badge}
                    </div>

                    <h1 className={`${slide.textColor} text-4xl md:text-7xl font-black leading-[1.05] mb-8 italic uppercase`}>
                        {slide.title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? "text-brand-orange" : ""}>{word} </span>
                        ))}
                    </h1>

                    <p className={`${slide.textColor} opacity-80 text-sm md:text-lg leading-relaxed mb-12 font-medium`}>
                        {slide.desc}
                    </p>

                    <Link href={slide.href} className="group bg-brand-dark text-white rounded-[25px] py-6 px-12 font-black text-lg inline-flex items-center gap-6 hover:bg-brand-blue transition-all transform hover:scale-105 shadow-2xl hover:shadow-brand-blue/30 uppercase tracking-widest">
                        {slide.btnText}
                        <div className="bg-white text-brand-dark rounded-full p-2 group-hover:bg-brand-yellow transition-colors">
                            <ArrowLeftRight size={20} />
                        </div>
                    </Link>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute bottom-12 right-12 flex gap-4 z-20">
                    <button
                        onClick={prevSlide}
                        className="w-14 h-14 rounded-2xl bg-brand-dark/5 hover:bg-brand-dark hover:text-white flex items-center justify-center transition-all active:scale-90 border border-brand-dark/10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-14 h-14 rounded-2xl bg-brand-dark text-white hover:bg-brand-blue flex items-center justify-center transition-all active:scale-90 shadow-xl"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute right-12 top-12 flex flex-col gap-3">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setIsExiting(true);
                                setTimeout(() => {
                                    setCurrentSlide(idx);
                                    setIsExiting(false);
                                }, 500);
                            }}
                            className={`w-2 h-8 rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-brand-orange h-14' : 'bg-brand-dark/10 hover:bg-brand-dark/30'}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .slide-enter {
                    animation: slideIn 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
