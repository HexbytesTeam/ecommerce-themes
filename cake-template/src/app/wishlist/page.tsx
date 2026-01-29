"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item: any) => {
        addToCart(item, 1);
        removeFromWishlist(item.id);
    };

    return (
        <main className="min-h-screen bg-white">


            <section className="pt-32 pb-20 lg:pt-48 bg-[#fff9fa] min-h-[60vh]">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-16 max-w-6xl mx-auto">
                        <div>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Favorites</p>
                            <h1 className="text-4xl lg:text-5xl font-serif font-bold">My Wishlist</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">{wishlistItems.length} items saved</p>
                    </div>

                    {wishlistItems.length === 0 ? (
                        <div className="text-center max-w-lg mx-auto py-20">
                            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Heart size={40} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                            <p className="text-muted-foreground mb-8">Save items you love so you can find them easily later.</p>
                            <Link
                                href="/#new"
                                className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                                Start Shopping <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {wishlistItems.map((item) => (
                                <div key={item.id} className="group bg-white p-6 rounded-3xl border border-pink-50 hover:shadow-xl transition-all relative">
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10"
                                    >
                                        <X size={18} />
                                    </button>

                                    <Link href={`/product/${item.slug}`}>
                                        <div className="relative w-full aspect-square mb-6 bg-pink-50/10 rounded-2xl p-4 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold mb-2">{item.name}</h3>
                                        <p className="text-primary font-bold text-lg mb-4">{item.price}</p>
                                    </Link>

                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="w-full py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={18} /> Move to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


        </main>
    );
}
