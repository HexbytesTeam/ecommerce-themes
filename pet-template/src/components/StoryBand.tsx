"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StoryBand() {
    return (
        <section className="py-20 px-4 md:px-12 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="bg-brand-orange rounded-[50px] p-10 md:p-20 text-center relative overflow-hidden group border-8 border-white shadow-2xl">
                    {/* Background Paw Watermarks */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none z-0 flex flex-wrap justify-around items-center">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <PawSVG key={i} size={150} className="text-white transform rotate-12" />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 italic">Our Story</h2>
                        <p className="text-white/80 text-lg md:text-xl font-bold max-w-3xl mx-auto mb-10 leading-relaxed">
                            Welcome To Focopet, Your Ultimate Online Pet Store! At Super Tails, We're More Than Just An Online Pet Food Shop – We're Your Partners In Pet Parenting.
                        </p>
                        <Link href="/about" className="bg-brand-dark text-white px-12 py-5 rounded-[25px] font-black text-lg inline-flex items-center gap-3 hover:bg-white hover:text-brand-blue transition-all transform active:scale-95 shadow-xl shadow-brand-dark/20">
                            Learn More <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PawSVG({ size, className }: { size: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" className={className}>
            <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z M30 40 C 35 40 35 45 30 45 C 25 45 25 40 30 40 Z M70 40 C 75 40 75 45 70 45 C 65 45 65 40 70 40 Z M50 25 C 55 25 55 30 50 30 C 45 30 45 25 50 25 Z" />
        </svg>
    );
}
