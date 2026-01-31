"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BRANDS = [
    { name: "Junipet", color: "bg-brand-yellow", icon: "🐾" },
    { name: "Pilotcat", color: "bg-brand-blue", icon: "🐱" },
    { name: "PawFood", color: "bg-brand-orange", icon: "🥘" },
    { name: "NutriPet", color: "bg-brand-dark", icon: "⭐" },
];

export default function BrandsSection() {
    return (
        <section className="py-24 px-4 md:px-12 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">Shop By Brand</h2>
                    <p className="text-gray-400 font-bold max-w-2xl mx-auto">
                        Welcome To FocoPet, Your Ultimate Online Pet Store. We're Your Partners In Pet Parenting.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {BRANDS.map((brand) => (
                        <BrandCard key={brand.name} {...brand} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BrandCard({ name, color, icon }: { name: string, color: string, icon: string }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [tiltStyle, setTiltStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
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
        <Link
            href={`/shop?brand=${name.toLowerCase()}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className={`rounded-[40px] ${color} p-10 h-64 flex flex-col justify-between items-start transition-all cursor-pointer group relative overflow-hidden`}
        >
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-3xl">
                {icon}
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2">{name}</h3>
                <div className="w-8 h-1 bg-white rounded-full transition-all group-hover:w-full duration-500"></div>
            </div>

            {/* Decorative white semi-circle logic inspired by image logo design */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-48 bg-white/10 rounded-l-full translate-x-8 transition-transform group-hover:translate-x-4"></div>
        </Link>
    );
}
