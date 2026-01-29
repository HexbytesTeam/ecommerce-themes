"use client";

import Image from "next/image";

export default function StorySection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Story Part 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="flex-1 relative">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/assets/about_story.png"
                                fill
                                alt="Our Bakery Kitchen"
                                className="object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-3xl shadow-xl z-10 hidden md:block">
                            <p className="text-4xl font-serif font-bold italic">15+</p>
                            <p className="text-sm font-bold uppercase tracking-widest">Years of Excellence</p>
                        </div>
                    </div>
                    <div className="flex-1 lg:pl-10">
                        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Humble Beginnings</p>
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">Crafting Happiness, <br />One Slice at a Time.</h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            HexBytes started with a simple belief: that everyone deserves a moment of pure, sweet joy. What began as a family tradition in our small home kitchen has grown into a premium bakery dedicated to the art of the perfect cake.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We source only the finest organic ingredients, from farm-fresh eggs to the richest Belgian chocolate, ensuring every bite is a masterpiece of flavor and texture.
                        </p>
                    </div>
                </div>

                {/* Mission Part 2 */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="flex-1 relative">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/assets/about_mission.png"
                                fill
                                alt="Our Mission"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 lg:pr-10 text-right lg:text-left">
                        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Vision</p>
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">Innovation Meets <br />Tradition.</h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            While we honor the classic recipes passed down through generations, we are never afraid to experiment. At HexBytes, "Hex" represents our digital-age precision, and "Bytes" stands for the perfect mouthful of flavor.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div>
                                <h4 className="text-3xl font-serif font-bold text-primary mb-2">100%</h4>
                                <p className="text-sm font-bold text-muted-foreground uppercase">Natural Ingredients</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-serif font-bold text-primary mb-2">50k+</h4>
                                <p className="text-sm font-bold text-muted-foreground uppercase">Cakes Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
