"use client";


import AboutHero from "@/components/AboutHero";
import StorySection from "@/components/StorySection";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">

            <AboutHero />
            <StorySection />

            {/* Testimonial Snapshot */}
            <section className="py-20 bg-[#fff9fa]">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">What They Say</p>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8 italic">
                            "The finest cakes I've ever tasted. The attention to detail and flavor profile is truly top-tier."
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-full" />
                            <div className="text-left">
                                <p className="font-bold">Sarah Jenkins</p>
                                <p className="text-sm text-muted-foreground">Food Critic, Gourmet Daily</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
