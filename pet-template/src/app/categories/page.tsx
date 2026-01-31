import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const categories = [
    {
        name: "Dogs",
        image: "/cat_dog.png",
        description: "Premium food, toys, and care for your best friend.",
        count: 124,
        color: "bg-blue-50"
    },
    {
        name: "Cats",
        image: "/cat_cat.png",
        description: "Quality nutrition and playful accessories for felines.",
        count: 85,
        color: "bg-yellow-50"
    },
    {
        name: "Birds",
        image: "/cat_bird.png",
        description: "Nutritious seeds and engaging toys for your birds.",
        count: 42,
        color: "bg-orange-50"
    },
    {
        name: "Fish",
        image: "/cat_bird.png",
        description: "Balanced diets and tank maintenance for aquatic pets.",
        count: 36,
        color: "bg-cyan-50"
    },
    {
        name: "Rabbits",
        image: "/cat_cat.png",
        description: "Foraging snacks and comfort for your little bunnies.",
        count: 24,
        color: "bg-green-50"
    }
];

export default function CategoryPage() {
    return (
        <div className="bg-white">
            {/* Hero Section for Categories */}
            <section className="bg-brand-yellow py-20 px-4 md:px-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-6">
                        Everything for your <span className="text-brand-blue">Fur-mily</span>
                    </h1>
                    <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
                        Browse our wide range of categories to find exactly what your pet needs. From premium nutrition to playful toys, we have it all.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-24 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {categories.map((cat, idx) => (
                            <Link key={idx} href={`/shop/${cat.name.toLowerCase()}`} className="group">
                                <div className={`${cat.color} rounded-[50px] p-10 h-full flex flex-col transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl border-2 border-transparent group-hover:border-brand-yellow/50`}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <h2 className="text-3xl font-black text-brand-dark mb-2">{cat.name}</h2>
                                            <span className="text-brand-blue font-bold uppercase tracking-widest text-xs">
                                                {cat.count} Items
                                            </span>
                                        </div>
                                        <div className="bg-white/50 p-2 rounded-full text-brand-dark group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <MoveRight size={24} />
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-10 flex-grow leading-relaxed">
                                        {cat.description}
                                    </p>

                                    <div className="relative w-full aspect-square max-w-[200px] mx-auto transition-transform duration-500 group-hover:scale-110">
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo section */}
            <section className="pb-24 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="bg-brand-dark rounded-[50px] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
                            Not sure what to pick?
                        </h2>
                        <p className="text-gray-400 max-w-xl mb-12 relative z-10 italic">
                            "Our experts are ready to help you choose the best products for your pet's specific breed and age."
                        </p>
                        <Link href="/contact" className="bg-brand-yellow text-brand-dark px-10 py-4 rounded-full font-black hover:bg-brand-blue hover:text-white transition-all transform hover:scale-105 relative z-10">
                            Talk to an expert
                        </Link>
                        <div className="absolute right-0 bottom-0 text-white/5 rotate-12">
                            <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
