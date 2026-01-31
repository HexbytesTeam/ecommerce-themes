"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ALL_BLOGS, BlogPost } from "@/data/blogs";

export default function BlogSection() {
    const displayBlogs: BlogPost[] = ALL_BLOGS.slice(0, 3);
    return (
        <section className="py-24 px-4 md:px-12 bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 italic">Our Latest Pet Blog</h2>
                        <p className="text-gray-400 font-bold max-w-xl mb-10 leading-relaxed">
                            At FocoPet Shop, We Believe That Pets Are Family. Our Mission Is To Provide The Highest Quality Products And Services To Ensure Your Furry, Feathered, And Scaly Friends Live Their Happiest, Healthiest Lives Ever.
                        </p>
                        <Link href="/blog" className="bg-brand-orange text-white px-10 py-4 rounded-[20px] font-black inline-flex items-center gap-3 hover:bg-brand-blue transition-all shadow-xl shadow-brand-orange/20">
                            See All Blog <ArrowRight size={20} />
                        </Link>
                    </div>

                    {/* Featured Blog Card */}
                    <div className="relative group overflow-hidden rounded-[50px] shadow-2xl h-[450px]">
                        <Image
                            src="/focopet_hero_pets.png"
                            alt="Featured Blog"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 p-8"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                            <span className="text-brand-yellow font-black uppercase text-xs tracking-widest mb-4 block">Featured Guide</span>
                            <h3 className="text-3xl font-black mb-4">Guide To Choosing The Right Pet Food</h3>
                            <Link href="/blog/guide" className="text-brand-yellow font-bold text-sm hover:underline flex items-center gap-2">
                                See More <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {displayBlogs.map((blog) => (
                        <div key={blog.id} className="group cursor-pointer">
                            <div className="relative h-64 rounded-[35px] overflow-hidden mb-6 shadow-lg border-4 border-gray-50">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {blog.category}
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-brand-dark mb-3 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                                {blog.title}
                            </h4>
                            <p className="text-gray-400 font-medium text-sm line-clamp-2 leading-relaxed mb-4">
                                {blog.excerpt}
                            </p>
                            <Link href={`/blog/${blog.id}`} className="text-brand-orange font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                See More <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
