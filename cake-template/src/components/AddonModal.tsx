"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { addonProducts, AddonProduct } from "@/lib/addon-data";
import { useCart } from "@/context/CartContext";

interface AddonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
}

export default function AddonModal({ isOpen, onClose, onContinue }: AddonModalProps) {
    const [activeTab, setActiveTab] = useState("Popular");
    const { addToCart } = useCart();
    const [addedItems, setAddedItems] = useState<string[]>([]);

    if (!isOpen) return null;

    const filteredProducts = activeTab === "Popular"
        ? addonProducts
        : addonProducts.filter(p => p.category === activeTab);

    const handleAdd = (product: AddonProduct) => {
        // Adapt AddonProduct to Product interface for cart
        // Utilizing a cast here to conform to the Product type expected by addToCart 
        // In a real app, types should be unified
        const cartProduct: any = {
            ...product,
            slug: product.id, // Using ID as slug for addons 
            description: "Party Addon",
            rating: 5,
            reviews: 0
        };

        addToCart(cartProduct, 1);
        setAddedItems(prev => [...prev, product.id]);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 relative z-10">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-20">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-center w-full">
                        Add More Fun To Celebration...
                    </h2>
                    <button onClick={onClose} className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 py-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-50">
                    {["Popular", "Candles", "Balloons", "Party Props"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => {
                            const isAdded = addedItems.includes(product.id);
                            return (
                                <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3 group">
                                    <div className="relative aspect-square w-full bg-slate-50 rounded-lg overflow-hidden">
                                        {/* Fallback image if asset missing */}
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-100 font-bold text-xs">
                                            {product.name}
                                        </div>
                                        <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-800 line-clamp-1" title={product.name}>{product.name}</h3>
                                        <p className="text-primary font-bold text-sm">{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdd(product)}
                                        disabled={isAdded}
                                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${isAdded
                                            ? "bg-green-50 text-green-600 border border-green-200"
                                            : "bg-white border border-primary text-primary hover:bg-primary hover:text-white"
                                            }`}
                                    >
                                        {isAdded ? <><Check size={14} /> Added</> : "Add"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-sm font-bold text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-4"
                    >
                        Skip
                    </button>
                    <button
                        onClick={onContinue}
                        className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
