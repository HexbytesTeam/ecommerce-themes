"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    { name: "Accessories", link: "/shop?category=accessories" },
    { name: "Nutrition", link: "/shop?category=nutrition" },
    { name: "Animal Food", link: "/shop?category=food" },
    { name: "Animal Toys", link: "/shop?category=toys" },
    { name: "Pet Clothes", link: "/shop?category=clothes" },
];

export default function PetRangeSection() {
    return (
        <section className="py-24 px-4 md:px-12 bg-[#1A1D23] relative overflow-hidden">
            {/* Background Paw Watermarks */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                <div className="absolute top-10 left-10"><PawSVG size={200} /></div>
                <div className="absolute bottom-10 right-10"><PawSVG size={300} /></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><PawSVG size={500} /></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white italic">
                        Discover Our Full <br /> <span className="text-brand-yellow">Range Of Pet Products</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative h-[600px] rounded-[50px] overflow-hidden group shadow-2xl border-4 border-white/5">
                        <Image
                            src="/cat_dog.png"
                            alt="Pet Range"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* List Side */}
                    <div className="flex flex-col gap-2">
                        {CATEGORIES.map((cat, idx) => (
                            <CategoryLink key={cat.name} name={cat.name} link={cat.link} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CategoryLink({ name, link, index }: { name: string, link: string, index: number }) {
    return (
        <Link
            href={link}
            className="group flex items-center justify-between py-8 border-b border-white/10 hover:border-brand-yellow transition-all px-4 hover:bg-white/5 rounded-2xl"
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-brand-yellow transition-colors tracking-tight">
                {name}
            </span>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-transparent transition-all transform group-hover:rotate-45">
                <ArrowUpRight size={24} />
            </div>
        </Link>
    );
}

function PawSVG({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z M30 40 C 35 40 35 45 30 45 C 25 45 25 40 30 40 Z M70 40 C 75 40 75 45 70 45 C 65 45 65 40 70 40 Z M50 25 C 55 25 55 30 50 30 C 45 30 45 25 50 25 Z" />
        </svg>
    );
}
