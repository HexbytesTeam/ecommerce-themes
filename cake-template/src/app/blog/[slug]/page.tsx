"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";

import ShareButton from "@/components/ShareButton";
import { getPostBySlug } from "@/lib/blog-data";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PostPageProps) {
    const { slug } = use(params);
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">


            {/* Blog Post Hero */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fff9fa]">
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={18} /> Back to Magazine
                    </Link>

                    <div className="max-w-4xl">
                        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                            {post.category}
                        </span>
                        <h1 className="text-4xl lg:text-7xl font-serif font-bold leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-muted-foreground font-medium">
                            <div className="flex items-center gap-2 text-sm lg:text-base">
                                <Calendar size={20} className="text-primary" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm lg:text-base">
                                <User size={20} className="text-primary" />
                                By {post.author}
                            </div>
                            <div className="flex items-center gap-2 text-sm lg:text-base">
                                <Clock size={20} className="text-primary" />
                                5 min read
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            </section>

            {/* Featured Image */}
            <section className="container mx-auto px-4 -mt-16 lg:-mt-32 relative z-20">
                <div className="relative aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Article Content */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Content Rendered as HTML */}
                        <div
                            className="prose prose-lg prose-pink max-w-none text-muted-foreground leading-relaxed
                prose-headings:font-serif prose-headings:text-black prose-headings:font-bold
                prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
                prose-p:mb-8
              "
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="mt-16 pt-8 border-t border-pink-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-primary font-bold">
                                    {post.author[0]}
                                </div>
                                <div>
                                    <p className="font-bold">{post.author}</p>
                                    <p className="text-xs text-muted-foreground font-medium">HexBytes Master Baker</p>
                                </div>
                            </div>

                            <ShareButton
                                title={post.title}
                                url={typeof window !== 'undefined' ? window.location.href : ''}
                            />
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
