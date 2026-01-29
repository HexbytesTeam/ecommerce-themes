"use client";


import BlogHero from "@/components/BlogHero";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white">

            <BlogHero />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogPosts.map((post) => (
                            <BlogCard key={post.slug} {...post} />
                        ))}
                    </div>

                    {/* Newsletter / Subscription */}
                    <div className="mt-24 p-12 lg:p-20 bg-secondary rounded-[3rem] text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <h2 className="text-4xl font-serif font-bold mb-4 relative z-10 text-primary-foreground">Don't Miss a Byte</h2>
                        <p className="text-muted-foreground mb-10 max-w-md mx-auto relative z-10">
                            Subscribe to our newsletter for exclusive recipes, early access to seasonal drops, and baking tips.
                        </p>
                        <div className="max-w-md mx-auto flex gap-4 relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-8 py-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                            />
                            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                Join Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
