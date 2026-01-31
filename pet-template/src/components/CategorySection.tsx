import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const categories = [
    { name: "Dogs", image: "/cat_dog.png", color: "bg-blue-50" },
    { name: "Cats", image: "/cat_cat.png", color: "bg-yellow-50" },
    { name: "Birds", image: "/cat_bird.png", color: "bg-orange-50" },
    { name: "Fish", image: "/cat_bird.png", color: "bg-cyan-50" },
    { name: "Rabbits", image: "/cat_cat.png", color: "bg-green-50" },
];


export default function CategorySection() {
    return (
        <section className="py-20 px-4 md:px-12 bg-white">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">
                            Pet Product Category
                        </h2>
                        <p className="text-brand-dark/60 text-sm leading-relaxed">
                            Welcome To FocoPet, Your Ultimate Online Pet Store In India! At Super Tails, We're More Than Just A Pet Shop Online – We're Your Partners In Pet Parenting.
                        </p>
                    </div>
                    <Link href="/categories" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-brand-blue transition-colors w-fit">
                        See All Category
                        <div className="bg-white/20 rounded-full p-1">
                            <MoveRight size={18} />
                        </div>
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <Link key={idx} href={`/shop/${cat.name.toLowerCase().replace(" ", "-")}`} className="group">
                            <div className={`${cat.color} rounded-[40px] p-8 flex flex-col items-center transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-transparent group-hover:border-brand-yellow/30`}>
                                <h3 className="text-2xl font-black text-brand-dark mb-6 self-start">{cat.name}</h3>
                                <div className="relative w-48 h-48">

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
    );
}
