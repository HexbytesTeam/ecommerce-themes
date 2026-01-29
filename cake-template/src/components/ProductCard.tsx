"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/product-data";

interface ProductProps {
    name: string;
    price: string;
    image: string;
    slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductProps) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();

    // Reconstruct product object since ProductCard props are flattened
    const product = products.find(p => p.slug === slug);
    const isSaved = product ? isInWishlist(product.id) : false; // Safe check

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        if (product) toggleWishlist(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (product) {
            addToCart(product, 1);
        }
    };

    return (
        <div className="group bg-[#fff9fa] p-6 rounded-3xl border border-pink-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            {/* Badge/Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                <button
                    onClick={handleWishlistClick}
                    className={`w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center transition-colors ${isSaved ? "text-red-500 bg-red-50" : "text-primary hover:bg-primary hover:text-white"
                        }`}
                >
                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={handleAddToCart}
                    className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                    <ShoppingBag size={18} />
                </button>
            </div>

            <Link href={`/product/${slug}`} className="block">
                {/* Image */}
                <div className="relative w-full aspect-square mb-6 bg-white rounded-2xl p-4 overflow-hidden">
                    <div className="absolute inset-0 bg-pink-50/30 scale-0 group-hover:scale-100 rounded-full transition-transform duration-700" />
                    {product?.isPreOrder && (
                        <div className="absolute top-2 left-2 z-20 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Pre-Order
                        </div>
                    )}
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Info */}
                <div className="text-left">
                    <h3 className="text-xl font-serif font-bold mb-1 group-hover:text-primary transition-colors">{name}</h3>
                    <p className="text-primary font-bold text-lg">{price}</p>
                </div>
            </Link>
        </div>
    );
}
