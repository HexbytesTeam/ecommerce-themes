"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    author: string;
    slug: string;
}

export default function BlogCard({ title, excerpt, category, date, image, author, slug }: BlogCardProps) {
    return (
        <article className="group bg-white rounded-[2.5rem] overflow-hidden border border-pink-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Image Wrap */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-primary shadow-sm">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {date}
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        {author}
                    </div>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-2">
                    {excerpt}
                </p>

                <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-2 font-bold text-primary group/link"
                >
                    Read More
                    <ArrowRight size={18} className="translate-x-0 group-hover/link:translate-x-2 transition-transform" />
                </Link>
            </div>
        </article>
    );
}
