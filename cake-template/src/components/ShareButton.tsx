"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";

interface ShareButtonProps {
    title: string;
    url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const shareOptions = [
        {
            name: "Twitter",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:text-[#1DA1F2]"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "hover:text-[#4267B2]"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-[#0077b5]"
        }
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity bg-primary/5 px-6 py-3 rounded-full"
            >
                <Share2 size={20} /> Share Article
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-0 mb-4 bg-white border border-pink-50 shadow-2xl rounded-3xl p-4 min-w-[240px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-4">Share to</p>

                    <div className="grid grid-cols-1 gap-2">
                        {shareOptions.map((option) => (
                            <a
                                key={option.name}
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-pink-50 transition-colors text-muted-foreground font-bold ${option.color}`}
                            >
                                <option.icon size={20} />
                                {option.name}
                            </a>
                        ))}

                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-pink-50 transition-colors text-muted-foreground font-bold hover:text-primary w-full text-left"
                        >
                            {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} />}
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
