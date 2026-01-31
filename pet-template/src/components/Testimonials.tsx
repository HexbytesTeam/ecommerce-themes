"use client";

import Image from "next/image";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
            {/* Background Paw watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-50 opacity-[0.03] scale-[3] pointer-events-none z-0">
                <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 50 C 60 50 60 60 50 60 C 40 60 40 50 50 50 Z" />
                </svg>
            </div>

            <div className="container mx-auto">
                <div className="bg-[#1A1D23] rounded-[60px] overflow-hidden relative min-h-[600px] flex flex-col lg:flex-row items-center">

                    {/* User Image Side - Woman with Dog */}
                    <div className="lg:w-[45%] h-[500px] lg:h-[600px] relative w-full p-12">
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-8 border-brand-yellow/10 group bg-brand-dark/20 flex items-center justify-center">
                            <Image
                                src="/cat_dog.png"
                                alt="FocoPet Happy Client"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            {/* Accent Yellow Overlay */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-yellow"></div>
                        </div>
                    </div>

                    {/* Feedback Content Side */}
                    <div className="lg:w-[55%] p-8 lg:p-20 flex flex-col justify-center text-white relative z-10">
                        <div className="relative">
                            <Quote size={64} className="text-brand-yellow absolute -top-10 -left-10 opacity-10" />

                            <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
                                Feedback From <span className="text-brand-yellow italic">Users</span>
                            </h2>

                            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-medium mb-12 border-l-4 border-brand-yellow/30 pl-8">
                                "Focopet Is One Of The Most Popular And Trusted Pet Food Companies, Featuring Whole, Unprocessed Proteins Like Deboned Chicken As Primary Ingredients. More Than Just An Online Pet Food Shop, They're Truly Exceptional."
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-2xl font-black text-white">Emily Rodriguez</h4>
                                    <p className="text-brand-yellow font-bold uppercase tracking-widest mt-2 text-sm">Pet Owner</p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="w-14 h-14 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-yellow transition-all shadow-xl group">
                                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                    </button>
                                    <button className="w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-blue transition-all shadow-xl group">
                                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <div className="text-4xl font-black text-white italic">FocoPet</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
