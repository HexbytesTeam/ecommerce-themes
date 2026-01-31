"use client";

import { useEffect, useState } from "react";
import { Cookie, Bone, Star, Circle, Soup } from "lucide-react";

interface FoodItem {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
    type: "cookie" | "bone" | "star" | "kibble" | "bowl";
    depth: "near" | "mid" | "far";
}

export default function FloatingFood() {
    const [items, setItems] = useState<FoodItem[]>([]);

    useEffect(() => {
        const newItems: FoodItem[] = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * -30, // Negative delay to start mid-animation
            duration: 15 + Math.random() * 30,
            size: 15 + Math.random() * 40,
            rotation: Math.random() * 360,
            type: ["cookie", "bone", "star", "kibble", "bowl"][Math.floor(Math.random() * 5)] as any,
            depth: ["near", "mid", "far"][Math.floor(Math.random() * 3)] as any
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5] opacity-25">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`absolute top-[-100px] animate-fall flex items-center justify-center transition-opacity duration-1000 ${item.depth === "far" ? "blur-[2px] scale-50 opacity-40" :
                        item.depth === "mid" ? "scale-75 opacity-70" :
                            "scale-110 opacity-100"
                        }`}
                    style={{
                        left: `${item.x}%`,
                        animationDelay: `${item.delay}s`,
                        animationDuration: `${item.duration}s`,
                        transform: `rotate(${item.rotation}deg)`,
                    }}
                >
                    {item.type === "cookie" && <Cookie size={item.size} className="text-brand-orange" />}
                    {item.type === "bone" && <Bone size={item.size} className="text-brand-yellow" />}
                    {item.type === "star" && <Star size={item.size} className="text-brand-blue" fill="currentColor" />}
                    {item.type === "kibble" && <Circle size={item.size / 2} className="text-brand-orange" fill="currentColor" />}
                    {item.type === "bowl" && <Soup size={item.size} className="text-brand-yellow" />}
                </div>
            ))}

            <style jsx global>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-10vh) rotate(0deg);
                    }
                    100% {
                        transform: translateY(110vh) rotate(720deg);
                    }
                }
                .animate-fall {
                    animation: fall linear infinite;
                }
            `}</style>
        </div>
    );
}
