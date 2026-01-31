"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    rating: number;
    image: string;
    category: string;
    badge?: string;
}

export default function ProductCard({ id, name, price, oldPrice, rating, image, category, badge }: ProductCardProps) {
    const { addToCart, setIsDrawerOpen, wishlist, toggleWishlist } = useCart();
    const isWishlisted = wishlist.includes(id);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart({
            id,
            name,
            price,
            image,
            category,
            weight: "Standard",
            quantity: 1
        });

        // Auto-open drawer after a tiny delay for the "Added!" animation to breathe
        setTimeout(() => {
            setIsAdding(false);
            setIsDrawerOpen(true);
        }, 800);
    };

    return (
        <div className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <Link href={`/product/${id}`} className="flex flex-col h-full">
                {/* Product Image Container */}
                <div className="relative aspect-square mb-4 bg-gray-50 rounded-[2rem] p-6 overflow-hidden flex items-center justify-center group/img">
                    {badge && (
                        <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-black px-3 py-1.5 rounded-full z-10 uppercase tracking-widest shadow-lg shadow-brand-orange/20">
                            {badge}
                        </span>
                    )}

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-brand-blue/10 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-10 flex items-center justify-center gap-3">
                        <button
                            className="bg-white text-brand-dark p-3 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-xl active:scale-90"
                            title="Quick View"
                        >
                            <Eye size={20} />
                        </button>
                        <button
                            className={`bg-white p-3 rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl active:scale-90 ${isWishlisted ? 'text-red-500' : 'text-brand-dark hover:text-red-500'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(id);
                            }}
                            title="Add to Wishlist"
                        >
                            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>

                    <div className="relative w-full h-full transition-transform duration-700 group-hover/img:scale-110">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{category}</span>
                    <h4 className="text-sm font-bold text-brand-dark mb-2 line-clamp-2 min-h-[40px] leading-tight group-hover:text-brand-blue transition-colors">
                        {name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < Math.floor(rating) ? "#FFCB05" : "none"} stroke={i < Math.floor(rating) ? "#FFCB05" : "#D1D5DB"} />
                        ))}
                        <span className="text-[10px] font-bold text-gray-400 ml-1">{rating.toFixed(1)}</span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex flex-col">
                            <span className="text-brand-blue font-black text-lg">${price.toFixed(2)}</span>
                            {oldPrice && <span className="text-gray-400 line-through text-[10px]">${oldPrice.toFixed(2)}</span>}
                        </div>
                        <button
                            className={`p-2.5 rounded-2xl transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 px-4 group/btn ${isAdding
                                ? 'bg-green-500 text-white w-full'
                                : 'bg-brand-dark text-white hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/20'
                                }`}
                            onClick={handleAddToCart}
                        >
                            {isAdding ? (
                                <span className="text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300">Added! 🐾</span>
                            ) : (
                                <>
                                    <ShoppingCart size={18} strokeWidth={2.5} className="group-hover/btn:rotate-12 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
