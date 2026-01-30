"use client";

import Link from "next/link";
import { Menu, ChevronDown, Flame } from "lucide-react";

const NAV_LINKS = [
    { label: "HOME", href: "/", hasCaret: false },
    { label: "SHOP", href: "/shop", hasCaret: true },
    { label: "CATEGORIES", href: "/categories", hasCaret: true },
    { label: "ABOUT", href: "/about", hasCaret: false },
    { label: "BLOG", href: "/blog", hasCaret: true },
    { label: "CONTACT", href: "/contact", hasCaret: false },
];

export function Navbar() {
    return (
        <nav className="bg-[#1a1a1a] text-white hidden md:block">
            <div className="container flex items-center justify-between h-14">
                <div className="flex items-center gap-8 h-full">
                    {/* Categories Dropdown Trigger */}
                    <button className="flex items-center gap-3 bg-[#333333] h-full px-8 text-xs font-bold tracking-widest transition-all hover:bg-[#444444]">
                        <Menu size={18} />
                        <span>BROWSE CATEGORIES</span>
                        <ChevronDown size={14} className="opacity-50" />
                    </button>

                    {/* Links */}
                    <ul className="flex items-center h-full">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label} className="h-full">
                                <Link
                                    href={link.href}
                                    className="px-5 h-full flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#cccccc] hover:text-white transition-all"
                                >
                                    {link.label}
                                    {link.hasCaret && <ChevronDown size={12} className="opacity-30" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Deal Zone */}
                <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-widest">
                    <Flame size={14} fill="currentColor" />
                    <span>DEAL ZONE</span>
                </div>
            </div>
        </nav>
    );
}
