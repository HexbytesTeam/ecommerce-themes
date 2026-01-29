"use client";

import React from "react";

export default function CandyBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {/* Soft Gradient Blobs - Deep Background */}
            <div className="absolute top-[5%] left-[10%] w-72 h-72 bg-pink-200/15 rounded-full blur-[90px] animate-pulse-soft" />
            <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-yellow-100/20 rounded-full blur-[110px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[35%] right-[25%] w-64 h-64 bg-blue-100/15 rounded-full blur-[70px] animate-pulse-soft" style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-purple-100/15 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '1s' }} />

            {/* Drifting Bakery Icons */}
            <div className="absolute top-[10%] left-[8%] animate-float-slow opacity-20 hover:opacity-40 transition-opacity duration-1000">
                <div className="animate-rotate-slow text-6xl filter drop-shadow-xl transform hover:scale-110 transition-transform">🍰</div>
            </div>

            <div className="absolute top-[20%] right-[12%] animate-drift opacity-25 hover:opacity-50 transition-opacity duration-1000" style={{ animationDuration: '18s' }}>
                <div className="text-5xl filter drop-shadow-xl rotate-12">🍩</div>
            </div>

            <div className="absolute bottom-[25%] left-[15%] animate-float-slow opacity-20 hover:opacity-40 transition-opacity duration-1000" style={{ animationDelay: '3s' }}>
                <div className="animate-rotate-slow text-7xl filter drop-shadow-2xl" style={{ animationDuration: '30s' }}>🧁</div>
            </div>

            <div className="absolute top-[55%] right-[8%] animate-drift opacity-20 hover:opacity-40 transition-opacity duration-1000" style={{ animationDuration: '22s', animationDelay: '1.5s' }}>
                <div className="text-6xl filter drop-shadow-xl -rotate-12">🍪</div>
            </div>

            <div className="absolute bottom-[8%] left-[45%] animate-float-slow opacity-15 hover:opacity-35 transition-opacity duration-1000" style={{ animationDelay: '5s' }}>
                <div className="text-5xl filter drop-shadow-lg rotate-45">🍬</div>
            </div>

            <div className="absolute top-[40%] left-[3%] animate-drift opacity-15 hover:opacity-30 transition-opacity duration-1000" style={{ animationDuration: '25s' }}>
                <div className="text-4xl filter drop-shadow-md">🍭</div>
            </div>

            <div className="absolute bottom-[40%] right-[3%] animate-float-slow opacity-15" style={{ animationDelay: '2.5s' }}>
                <div className="text-5xl filter drop-shadow-lg rotate-12">🎂</div>
            </div>

            {/* Decorative Glass Elements */}
            <div className="absolute top-[15%] left-[40%] w-10 h-10 rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 animate-drift backdrop-blur-md border border-white/20 shadow-xl" style={{ animationDuration: '14s' }} />
            <div className="absolute bottom-[35%] right-[40%] w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-100/20 to-orange-100/20 animate-float-slow backdrop-blur-sm border border-white/10" style={{ animationDuration: '11s' }} />
            <div className="absolute top-[65%] left-[25%] w-8 h-8 rounded-full bg-gradient-to-bl from-blue-100/20 to-cyan-100/20 animate-drift" style={{ animationDuration: '19s' }} />

            {/* Sprinkles & Small Accents */}
            <div className="absolute top-[25%] left-[55%] w-1 h-6 bg-pink-400/20 rounded-full rotate-45 animate-drift" style={{ animationDuration: '24s' }} />
            <div className="absolute bottom-[45%] right-[15%] w-1 h-5 bg-blue-400/20 rounded-full -rotate-12 animate-float-slow" style={{ animationDuration: '21s' }} />
            <div className="absolute top-[75%] right-[45%] w-6 h-1 bg-yellow-400/15 rounded-full rotate-12 animate-drift" style={{ animationDuration: '28s' }} />
            <div className="absolute bottom-[15%] left-[30%] w-5 h-5 border-2 border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '15s' }} />
        </div>
    );
}
