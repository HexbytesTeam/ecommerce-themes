"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, Shield, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS } from "@/lib/products";

interface CartItem {
    product: typeof ALL_PRODUCTS[0];
    quantity: number;
}

export default function CartPage() {
    // Mock cart items - in production, this would come from context/state management
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { product: ALL_PRODUCTS[0], quantity: 1 },
        { product: ALL_PRODUCTS[1], quantity: 2 },
        { product: ALL_PRODUCTS[8], quantity: 1 },
    ]);

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

    // Mock coupon codes
    const validCoupons = {
        "HEXBYTES10": 10,
        "TECH20": 20,
        "PREMIUM15": 15,
    };

    const updateQuantity = (productId: number | string, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (productId: number | string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const applyCoupon = () => {
        const upperCode = couponCode.toUpperCase();
        if (validCoupons[upperCode as keyof typeof validCoupons]) {
            setAppliedCoupon({
                code: upperCode,
                discount: validCoupons[upperCode as keyof typeof validCoupons],
            });
        } else {
            alert("Invalid coupon code");
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal - discount + shipping;

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-1 bg-primary rounded-full"></div>
                        <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">Secure Checkout</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h1 className="text-5xl lg:text-6xl font-display font-black text-secondary tracking-tighter uppercase">
                            Shopping <span className="text-primary italic">Cart</span>
                        </h1>
                        <div className="flex items-center gap-3 text-xs font-black tracking-widest text-gray-400">
                            <ShoppingBag size={16} className="text-primary" />
                            <span className="text-secondary">{cartItems.length} ITEMS</span>
                        </div>
                    </div>
                </motion.div>

                {/* Cart Content or Empty State */}
                <AnimatePresence mode="wait">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-6">
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.product.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 group hover:shadow-xl transition-all"
                                    >
                                        {/* Product Image */}
                                        <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                                            <div className="relative w-32 h-32 bg-[#f8f8f8] rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/product/${item.product.id}`}>
                                                <p className="text-[10px] text-primary font-black tracking-[0.3em] uppercase mb-2">
                                                    {item.product.category}
                                                </p>
                                                <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors mb-3 tracking-tight">
                                                    {item.product.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wide mb-4">
                                                {item.product.brand}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 gap-4">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, -1)}
                                                        className="text-gray-400 hover:text-secondary transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="text-sm font-black text-secondary w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, 1)}
                                                        className="text-gray-400 hover:text-secondary transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right flex flex-col justify-between">
                                            <p className="text-3xl font-display font-black text-secondary">
                                                ${(item.product.price * item.quantity).toLocaleString()}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-gray-400 font-bold">
                                                    ${item.product.price} each
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 sticky top-32 space-y-8"
                                >
                                    <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">
                                        Order Summary
                                    </h2>

                                    {/* Coupon Code */}
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Promo Code
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="HEXBYTES10"
                                                disabled={!!appliedCoupon}
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all disabled:opacity-50"
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                disabled={!!appliedCoupon}
                                                className="px-6 py-4 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Tag size={16} />
                                            </button>
                                        </div>
                                        {appliedCoupon && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center justify-between text-xs font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl"
                                            >
                                                <span className="uppercase tracking-widest">
                                                    {appliedCoupon.code} Applied
                                                </span>
                                                <button
                                                    onClick={() => setAppliedCoupon(null)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wide">
                                            <span>Subtotal</span>
                                            <span className="text-secondary">${subtotal.toLocaleString()}</span>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex justify-between text-sm font-bold text-green-600 uppercase tracking-wide">
                                                <span>Discount ({appliedCoupon.discount}%)</span>
                                                <span>-${discount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wide">
                                            <span>Shipping</span>
                                            <span className="text-secondary">
                                                {shipping === 0 ? "FREE" : `$${shipping}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xl font-display font-black text-secondary pt-4 border-t border-gray-100">
                                            <span className="uppercase">Total</span>
                                            <span>${total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <Link href="/checkout">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-primary text-secondary px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4"
                                        >
                                            Proceed to Checkout
                                            <ArrowRight size={18} />
                                        </motion.button>
                                    </Link>

                                    {/* Trust Badges */}
                                    <div className="pt-6 border-t border-gray-100 space-y-4">
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            <Shield size={16} className="text-primary" />
                                            <span>Secure Checkout</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            <Truck size={16} className="text-primary" />
                                            <span>Free Shipping Over $1000</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-32 px-4"
                        >
                            <div className="relative mb-12">
                                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center relative">
                                    <ShoppingBag size={48} className="text-gray-200" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Sparkles size={16} className="text-secondary" />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-4xl font-display font-black text-secondary tracking-tighter uppercase mb-4 text-center">
                                Your Cart is <span className="text-primary italic">Empty</span>
                            </h2>
                            <p className="text-sm text-gray-400 font-bold tracking-wide uppercase mb-12 text-center max-w-md">
                                Start adding premium tech to your cart and build your dream setup.
                            </p>

                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-secondary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-2xl shadow-primary/20 flex items-center gap-4"
                                >
                                    <Sparkles size={18} />
                                    Explore Premium Collection
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </main>
    );
}
