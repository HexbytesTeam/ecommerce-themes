"use client";

import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const {
        isDrawerOpen,
        setIsDrawerOpen,
        cart,
        removeFromCart,
        updateQuantity,
        total,
        subtotal,
        discount
    } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isDrawerOpen]);

    if (!mounted) return null;

    return (
        <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isDrawerOpen ? "visible" : "invisible"}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
                onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-blue/10 p-2 rounded-xl text-brand-blue">
                                <ShoppingBag size={20} />
                            </div>
                            <h2 className="text-xl font-black text-brand-dark italic">Your Cart</h2>
                        </div>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingBag size={40} className="text-gray-200" />
                                </div>
                                <h3 className="text-lg font-black text-brand-dark mb-2 italic">Cart is Empty</h3>
                                <p className="text-sm text-gray-400 font-bold mb-8">Looks like your best friend is waiting for some treats!</p>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="bg-brand-blue text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/10"
                                >
                                    Browse Shop
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.weight}`} className="flex gap-4 group animate-in slide-in-from-right-4 fade-in duration-300">
                                        <Link
                                            href={`/product/${item.id}`}
                                            onClick={() => setIsDrawerOpen(false)}
                                            className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden p-2 flex-shrink-0 border border-gray-100"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-sm text-brand-dark truncate pr-2">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.weight)}
                                                    className="text-gray-300 hover:text-brand-orange transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-3">{item.weight}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-brand-dark"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-black min-w-[24px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-brand-dark"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="font-black text-brand-dark text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer / Summary */}
                    {cart.length > 0 && (
                        <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100">
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-xs font-bold text-green-500">
                                        <span>Discount</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span>Shipping</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center text-xl font-black text-brand-dark italic">
                                    <span>Total</span>
                                    <span className="text-brand-blue">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-full flex items-center justify-center gap-3 bg-brand-dark text-white p-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-xl group"
                            >
                                Checkout Now
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-[10px] text-center text-gray-400 font-bold mt-4 uppercase tracking-[0.2em]">Secure Checkout Guaranteed 🔒</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
