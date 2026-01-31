"use client";

import { useEffect, useState } from "react";
import { Dog, Cat, Bird, Twitter as BirdAlt } from "lucide-react";

interface AnimalInstance {
    id: number;
    type: "dog" | "cat" | "bird";
    y: number;
    delay: number;
    duration: number;
    speed: number;
    direction: "ltr" | "rtl";
    scale: number;
    opacity: number;
}

export default function MovingAnimals() {
    const [animals, setAnimals] = useState<AnimalInstance[]>([]);

    useEffect(() => {
        const newAnimals: AnimalInstance[] = Array.from({ length: 8 }).map((_, i) => {
            const type = ["dog", "cat", "bird"][Math.floor(Math.random() * 3)] as any;
            return {
                id: i,
                type,
                y: type === "bird" ? 10 + Math.random() * 30 : 60 + Math.random() * 30, // Birds high, others lower
                delay: Math.random() * -60, // Start mid-animation
                duration: type === "bird" ? 15 + Math.random() * 15 : 25 + Math.random() * 20,
                speed: 1,
                direction: type === "bird" ? "ltr" : "rtl",
                scale: 0.8 + Math.random() * 0.5,
                opacity: 0.1 + Math.random() * 0.2
            };
        });
        setAnimals(newAnimals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[4]">
            {animals.map((animal) => (
                <div
                    key={animal.id}
                    className={`absolute flex items-center justify-center ${animal.direction === "ltr" ? "animate-ltr" : "animate-rtl"
                        }`}
                    style={{
                        top: `${animal.y}%`,
                        animationDelay: `${animal.delay}s`,
                        animationDuration: `${animal.duration}s`,
                        transform: `scale(${animal.scale})`,
                        opacity: animal.opacity,
                    }}
                >
                    <div className={animal.direction === "rtl" ? "scale-x-[-1]" : ""}>
                        {animal.type === "dog" && <Dog size={48} className="text-brand-dark" />}
                        {animal.type === "cat" && <Cat size={40} className="text-brand-orange" />}
                        {animal.type === "bird" && <Bird size={32} className="text-brand-blue" />}
                    </div>
                </div>
            ))}

            <style jsx global>{`
                @keyframes ltr {
                    0% {
                        transform: translateX(-10vw) translateY(0);
                    }
                    25% {
                        transform: translateX(20vw) translateY(-5vh);
                    }
                    50% {
                        transform: translateX(50vw) translateY(0);
                    }
                    75% {
                        transform: translateX(80vw) translateY(5vh);
                    }
                    100% {
                        transform: translateX(110vw) translateY(0);
                    }
                }
                @keyframes rtl {
                    0% {
                        transform: translateX(110vw) translateY(0);
                    }
                    100% {
                        transform: translateX(-10vw) translateY(0);
                    }
                }
                .animate-ltr {
                    animation: ltr linear infinite;
                }
                .animate-rtl {
                    animation: rtl linear infinite;
                }
            `}</style>
        </div>
    );
}
