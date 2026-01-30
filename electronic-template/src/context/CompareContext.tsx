"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/products";

interface CompareContextType {
    compareList: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: number | string) => void;
    clearCompare: () => void;
    isInCompare: (productId: number | string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<Product[]>([]);

    const addToCompare = (product: Product) => {
        if (compareList.length >= 4) {
            alert("You can compare up to 4 products at a time");
            return;
        }
        if (!compareList.find(p => p.id === product.id)) {
            setCompareList([...compareList, product]);
        }
    };

    const removeFromCompare = (productId: number | string) => {
        setCompareList(compareList.filter(p => p.id !== productId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    const isInCompare = (productId: number | string) => {
        return compareList.some(p => p.id === productId);
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within CompareProvider");
    }
    return context;
}
