"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, Tag } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, cartTotal, discount, applyCoupon } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const tax = (cartTotal - discount) * 0.1; // 10% tax on discounted price
    const total = cartTotal - discount + tax;

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) return;

        const result = applyCoupon(couponCode);
        if (result.success) {
            setCouponMessage({ type: 'success', text: result.message });
        } else {
            setCouponMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <main className="min-h-screen bg-white">


            <section className="pt-32 pb-20 lg:pt-48 bg-[#fff9fa] min-h-[60vh]">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-10 text-center">Your Shopping Cart</h1>

                    {items.length === 0 ? (
                        <div className="text-center max-w-lg mx-auto py-20 animate-fade-in">
                            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary animate-float">
                                <Trash2 size={40} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-8">Looks like you haven't added any sweet treats yet.</p>
                            <Link
                                href="/#new"
                                className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                                Start Shopping <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                            {/* Cart Items */}
                            <div className="flex-1">
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-pink-50 animate-slide-up">
                                    <div className="space-y-8">
                                        {items.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-6 items-center border-b border-pink-50 pb-8 last:border-0 last:pb-0 animate-slide-up"
                                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                                            >
                                                <div className="relative w-24 h-24 bg-pink-50/50 rounded-2xl flex-shrink-0 p-2 group hover:bg-pink-100 transition-colors">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 p-2 rounded-full"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <p className="text-primary font-bold mb-4">{item.price}</p>

                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 shadow-sm">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm text-muted-foreground transition-all"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm text-primary transition-all"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="w-full lg:w-[380px]">
                                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-pink-50 sticky top-32 animate-fade-in" style={{ animationDelay: '300ms' }}>
                                    <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span className="font-bold text-black">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600 animate-pulse-soft">
                                                <span>Discount</span>
                                                <span className="font-bold">-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax (10%)</span>
                                            <span className="font-bold text-black">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Shipping</span>
                                            <span className="font-bold text-black text-green-600">Free</span>
                                        </div>

                                        {/* Coupon Input */}
                                        <div className="pt-4 pb-2">
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        placeholder="Coupon Code"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value)}
                                                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-pink-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all"
                                                    />
                                                </div>
                                                <button
                                                    onClick={handleApplyCoupon}
                                                    className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                            {couponMessage && (
                                                <p className={`text-xs mt-2 ml-1 animate-slide-up ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {couponMessage.text}
                                                </p>
                                            )}
                                        </div>

                                        <div className="border-t border-dashed border-gray-200 pt-4 mt-4 flex justify-between items-center">
                                            <span className="font-bold text-lg">Total</span>
                                            <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Link href="/checkout" className="w-full py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                                        Proceed to Checkout
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        Secure checkout powered by Razorpay
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>


        </main>
    );
}
