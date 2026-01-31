"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronLeft, Ticket, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, subtotal, discount, total, cartCount, appliedCoupon, applyCoupon, removeCoupon } = useCart();
    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
    const router = useRouter();

    const shipping = cartCount > 0 ? 5.00 : 0;

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <section className="bg-gray-50 py-8 md:py-12 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <Link href="/" className="hover:text-brand-blue">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-brand-dark">Your Basket</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-dark">
                        Shopping <span className="text-brand-blue">Basket</span>
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-20 px-4 md:px-12">
                <div className="container mx-auto">
                    {cart.length === 0 ? (
                        <div className="bg-gray-50 rounded-[50px] p-20 text-center flex flex-col items-center">
                            <div className="bg-white p-8 rounded-full shadow-inner mb-8 text-6xl">🛒</div>
                            <h2 className="text-3xl font-black text-brand-dark mb-4">Your basket is empty</h2>
                            <p className="text-gray-400 mb-10 max-w-sm text-lg">Looks like you haven't added any premium pet treats yet. Let's find something special!</p>
                            <Link href="/categories" className="bg-brand-blue text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-dark transition-all transform active:scale-95 shadow-xl shadow-brand-blue/20">
                                Explore Categories <ArrowRight size={20} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            {/* Cart Items List */}
                            <div className="lg:col-span-8 space-y-6">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.weight}`} className="bg-white border border-gray-100 rounded-[30px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-shadow duration-500">
                                        {/* Product Image */}
                                        <div className="relative w-32 h-32 bg-gray-50 rounded-2xl p-4 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain" />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 text-center md:text-left">
                                            <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">{item.category}</span>
                                            <h3 className="text-xl font-bold text-brand-dark mb-2 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm font-bold text-gray-400">Weight: <span className="text-brand-dark">{item.weight}</span></p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                                                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-dark hover:bg-brand-yellow transition-colors shadow-sm"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-8 text-center font-black text-brand-dark">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                                                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-dark hover:bg-brand-yellow transition-colors shadow-sm"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        {/* Price and Remove */}
                                        <div className="flex flex-col items-end gap-3 min-w-[120px]">
                                            <span className="text-2xl font-black text-brand-blue">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.weight)}
                                                className="text-gray-300 hover:text-brand-orange transition-colors p-2"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Coupon Section */}
                                <div className="bg-gray-50 rounded-[30px] p-8 mt-10">
                                    <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Ticket size={18} className="text-brand-blue" /> Have a Coupon?
                                    </h4>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            placeholder="Enter code (e.g. FOCONEW)"
                                            className="flex-1 bg-white border border-gray-200 rounded-2xl px-6 py-4 font-bold text-brand-dark outline-none focus:border-brand-blue transition-all"
                                        />
                                        <button
                                            onClick={() => {
                                                if (!couponInput) return;
                                                const result = applyCoupon(couponInput);
                                                setCouponMessage({ text: result.message, type: result.success ? "success" : "error" });
                                                if (result.success) setCouponInput("");
                                                setTimeout(() => setCouponMessage({ text: "", type: "" }), 3000);
                                            }}
                                            className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-blue transition-all"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponMessage.text && (
                                        <p className={`text-xs font-bold mt-4 uppercase tracking-widest ${couponMessage.type === "success" ? "text-green-500" : "text-brand-orange"}`}>
                                            {couponMessage.text}
                                        </p>
                                    )}
                                    {appliedCoupon && (
                                        <div className="flex items-center gap-3 mt-6 bg-brand-blue/10 w-fit px-4 py-2 rounded-xl border border-brand-blue/20">
                                            <span className="text-xs font-black text-brand-blue uppercase tracking-widest">
                                                Active: {appliedCoupon.code} ({appliedCoupon.discountType === "percentage" ? `${appliedCoupon.value}%` : `$${appliedCoupon.value}`} OFF)
                                            </span>
                                            <button onClick={removeCoupon} className="text-brand-blue hover:text-brand-dark transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:underline mt-8">
                                    <ChevronLeft size={18} /> Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-4 sticky top-32">
                                <div className="bg-neutral-900 rounded-[40px] p-10 text-white shadow-2xl shadow-neutral-900/20 relative overflow-hidden">
                                    <h3 className="text-2xl font-black mb-8 relative z-10 italic">Summary</h3>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex justify-between items-center text-neutral-400 font-bold">
                                            <span>Subtotal</span>
                                            <span className="text-white">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-neutral-400 font-bold">
                                            <span>Shipping</span>
                                            <span className="text-white">${shipping.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between items-center text-green-400 font-bold">
                                                <span className="flex items-center gap-2 italic underline decoration-dotted">Coupon Discount</span>
                                                <span>-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-white/10 my-6"></div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest mb-1">Total Payable</p>
                                                <span className="text-4xl font-black">${total.toFixed(2)}</span>
                                            </div>
                                            <div className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                                Final Price
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => router.push("/checkout")}
                                            className="w-full bg-brand-blue text-white py-5 rounded-[25px] font-black text-lg mt-10 flex items-center justify-center gap-3 hover:bg-white hover:text-brand-dark transition-all group"
                                        >
                                            Proceed to Checkout <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                        </button>

                                        <p className="text-[10px] text-neutral-500 text-center mt-6 font-bold uppercase tracking-widest">
                                            Secure Payments Powered by FocoPet
                                        </p>
                                    </div>

                                    {/* Decorative circle */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-yellow rounded-full opacity-5"></div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
