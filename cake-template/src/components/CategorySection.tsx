"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    { name: "Cakes", items: "24 Menu", image: "/assets/cake.png" },
    { name: "Cupcakes", items: "25 Menu", image: "/assets/cupcake.png" },
    { name: "Donuts", items: "35 Menu", image: "/assets/donut.png" },
];

export default function CategorySection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Explore</p>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 md:mb-16 text-slate-900">Our Delicious Menu</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {categories.map((cat) => (
                        <Link
                            href={`/categories?category=${cat.name}`}
                            key={cat.name}
                            className="group bg-white p-12 rounded-[3rem] border border-transparent shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(235,94,126,0.15)] transition-all duration-300 hover:-translate-y-2 relative block"
                        >
                            <div className="relative w-40 h-40 mx-auto mb-10 transition-transform group-hover:scale-110 duration-500">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-3 text-slate-900">{cat.name}</h3>
                            <p className="text-muted-foreground font-medium text-lg">{cat.items}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
