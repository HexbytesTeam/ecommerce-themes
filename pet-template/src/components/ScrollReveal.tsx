"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
}

export default function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getDirectionClass = () => {
        switch (direction) {
            case "up": return "translate-y-20";
            case "down": return "-translate-y-20";
            case "left": return "translate-x-20";
            case "right": return "-translate-x-20";
            default: return "translate-y-20";
        }
    };

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-1000 ease-out ${className} ${isVisible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${getDirectionClass()}`
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
