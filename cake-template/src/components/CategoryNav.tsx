"use client";

import Link from "next/link";
import React from "react";
import { ChevronDown } from "lucide-react";

const categoryItems = [
    {
        name: "Cakes",
        hasDropdown: true,
        subCategories: [
            {
                group: "By Type",
                items: [
                    "Same Day Delivery Cakes", "Regular Cakes", "Gourmet Cakes",
                    "Birthday Cakes", "Designer Cakes", "Photo Cakes",
                    "Floral Cakes", "Macaron Cakes", "Number Cakes",
                    "Heart Shape Cakes", "Cheesecakes"
                ]
            },
            {
                group: "By Flavor",
                items: [
                    "Chocolate Cakes", "Black Forest Cakes", "Butterscotch Cakes",
                    "Pineapple Cakes", "Red Velvet Cakes", "Fruit Cakes",
                    "Vanilla Cakes", "Strawberry Cakes", "Coffee Cakes"
                ]
            }
        ]
    },
    {
        name: "Wedding Season",
        hasDropdown: true,
        simpleItems: [
            "Bachelorette Party Cakes",
            "Bride to be Cakes",
            "Wedding Cakes"
        ]
    },
    {
        name: "Designer Cakes",
        hasDropdown: true,
        subCategories: [
            {
                group: "For Kids",
                items: [
                    "Jungle Cake", "Unicorn Cake", "6 Months Cake", "Car Theme Cake",
                    "Cocomelon Cake", "Butterfly Cakes", "Avengers Cakes", "1st Birthday Cakes",
                    "Frozen Cakes", "Solar System Cakes", "Spiderman Cakes", "Princess Cakes",
                    "Boss Baby Cakes", "Dinosaur Cakes"
                ]
            },
            {
                group: "By Profession",
                items: ["Doctor Cakes", "Engineer Cakes", "Lawyer Cakes", "Teacher Cakes"]
            },
            {
                group: "Hobbies",
                items: ["Gym Cakes", "Cricket Cakes", "Music Cakes", "Football Cakes"]
            },
            {
                group: "General Themes",
                items: ["Makeup Theme", "Shopping Theme", "Travel Theme"]
            },
            {
                group: "Gen Z Cakes",
                items: ["Anime Cakes", "BTS Cakes", "PubG Cakes", "Netflix Cakes"]
            },
            {
                group: "Custom Cake Query",
                items: ["Upload Design", "Contact Designer"]
            },
            {
                group: "Corporate Cakes",
                items: ["Company Anniversary", "Employee Appreciation", "Logo Cakes"]
            }
        ]
    },
    {
        name: "Birthday Cakes",
        hasDropdown: true,
        subCategories: [
            {
                group: "By Type",
                items: [
                    "All Birthday Cakes", "1st Birthday Cakes", "Half Birthday Cakes", "Cakes for Twins"
                ]
            },
            {
                group: "For Him",
                items: ["Cakes for Husband", "Cakes for Boyfriend", "Cakes for Father", "Cakes for Brother", "Cakes for Son"]
            },
            {
                group: "For Her",
                items: ["Cakes for Wife", "Cakes for Girlfriend", "Cakes for Mother", "Cakes for Sister", "Cakes for Daughter"]
            },
            {
                group: "Kids",
                items: ["Boy's Birthday Cakes", "Girl's Birthday Cakes", "Cartoon Cakes", "Superhero Cakes"]
            }
        ]
    },
    {
        name: "Anniversary Cakes",
        hasDropdown: true,
        simpleItems: [
            "All Anniversary Cakes",
            "Heart Shape Cakes",
            "Small Anniversary Cakes",
            "Private Affair",
            "1st Anniversary",
            "25th Anniversary",
            "50th Anniversary",
            "Love Anniversary"
        ]
    },
    {
        name: "Cakes by Occasions",
        hasDropdown: true,
        subCategories: [
            {
                group: "Public Occasions",
                items: [
                    "Mothers Day", "Fathers Day", "Friendships Day", "Rakhi",
                    "Janmashtmi", "Teachers Day", "Boss's Day", "Halloween",
                    "Diwali", "Christmas", "New Year", "Lohri",
                    "Valentines Day", "Womens Day"
                ]
            },
            {
                group: "Private Occasions",
                items: ["Baby Shower", "House Warming", "Retirement", "Promotion", "Graduation", "Engagement"]
            }
        ]
    },
    {
        name: "Desserts",
        hasDropdown: true,
        simpleItems: [
            "Cupcakes",
            "Jar Cakes",
            "Brownies",
            "Dry Cakes",
            "Pastries",
            "Donuts",
            "Macarons",
            "Chocolates"
        ]
    },
    { name: "Pre-Orders", hasDropdown: false },
];

export default function CategoryNav() {
    const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null);
    const [activeGroup, setActiveGroup] = React.useState("By Type");

    return (
        <div className="w-full bg-slate-50 border-b border-pink-100 hidden lg:block relative z-40">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-center gap-8 py-3" onMouseLeave={() => setHoveredCategory(null)}>
                    {categoryItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => setHoveredCategory(item.name)}
                        >
                            <Link
                                href={item.name === "Pre-Orders" ? "/pre-orders" : `/categories?type=${encodeURIComponent(item.name)}`}
                                className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary transition-colors whitespace-nowrap py-2"
                            >
                                {item.name}
                                {item.hasDropdown && (
                                    <ChevronDown size={14} className="opacity-50 group-hover:translate-y-0.5 transition-transform" />
                                )}
                            </Link>

                            {/* Simple Dropdown */}
                            {item.simpleItems && hoveredCategory === item.name && (
                                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-xl border border-pink-50 flex flex-col py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    {item.simpleItems.map((subItem) => (
                                        <Link
                                            key={subItem}
                                            href={`/categories?type=${encodeURIComponent(item.name)}&sub=${encodeURIComponent(subItem)}`}
                                            className="px-6 py-3 text-sm font-medium text-slate-600 hover:bg-pink-50 hover:text-primary hover:pl-8 transition-all"
                                        >
                                            {subItem}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Mega Menu Dropdown */}
                            {item.subCategories && hoveredCategory === item.name && (
                                <div className="absolute top-full left-0 w-[600px] bg-white shadow-2xl rounded-b-xl border border-pink-50 flex overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    {/* Left Sidebar (Groups) */}
                                    <div className="w-48 bg-slate-50 border-r border-pink-50 flex flex-col pt-4">
                                        {item.subCategories.map((sub) => (
                                            <button
                                                key={sub.group}
                                                onMouseEnter={() => setActiveGroup(sub.group)}
                                                className={`text-left px-6 py-3 text-sm font-bold flex items-center justify-between group/btn transition-colors ${activeGroup === sub.group
                                                    ? "bg-primary text-white"
                                                    : "text-slate-600 hover:bg-white hover:text-primary"
                                                    }`}
                                            >
                                                {sub.group}
                                                {activeGroup === sub.group && <span className="text-white">›</span>}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Right Content (Items) */}
                                    <div className="flex-1 p-6 bg-white min-h-[300px]">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                            {item.subCategories.find(g => g.group === activeGroup)?.items.map((subItem) => (
                                                <Link
                                                    key={subItem}
                                                    href={`/categories?type=${encodeURIComponent(item.name)}&sub=${encodeURIComponent(subItem)}`}
                                                    className="text-sm font-medium text-slate-600 hover:text-primary hover:translate-x-1 transition-all"
                                                >
                                                    {subItem}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
