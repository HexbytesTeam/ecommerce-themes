"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ChevronLeft, CreditCard, Wallet, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
    const { total, subtotal, discount, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCompletePurchase = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="bg-brand-yellow/10 p-20 rounded-[60px] text-center max-w-2xl border-2 border-brand-yellow/20 relative overflow-hidden">
                    <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-xl mx-auto mb-10 relative z-10">
                        🎉
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 relative z-10">
                        Order <span className="text-brand-blue">Success!</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-bold mb-12 relative z-10">Your pet treats are being prepared and will be at your door soon. Thank you for choosing FocoPet!</p>
                    <Link href="/" className="bg-brand-dark text-white px-12 py-5 rounded-[25px] font-black text-lg inline-flex items-center gap-3 hover:bg-brand-blue transition-all transform active:scale-95 shadow-xl shadow-brand-dark/20 relative z-10">
                        Back to Home <ArrowRight size={22} />
                    </Link>

                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Breadcrumb */}
            <section className="bg-gray-50 py-12 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <Link href="/cart" className="hover:text-brand-blue">Basket</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-brand-dark">Checkout</span>
                    </nav>
                    <h1 className="text-4xl font-black text-brand-dark">
                        Select <span className="text-brand-blue">Payment</span>
                    </h1>
                </div>
            </section>

            <section className="py-20 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Payment Options */}
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="text-2xl font-black text-brand-dark mb-10 flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-brand-yellow rounded-full"></div>
                                Choose your preferred method
                            </h2>

                            <div className="space-y-4">
                                {/* Credit Card */}
                                <button
                                    onClick={() => setPaymentMethod("card")}
                                    className={`w-full p-8 rounded-[35px] border-2 transition-all flex items-center gap-6 group ${paymentMethod === "card"
                                        ? "border-brand-blue bg-brand-blue/5 shadow-xl shadow-brand-blue/10"
                                        : "border-gray-100 hover:border-brand-blue/30"
                                        }`}
                                >
                                    <div className={`p-4 rounded-2xl transition-colors ${paymentMethod === "card" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-400 group-hover:bg-brand-blue/10"}`}>
                                        <CreditCard size={28} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-black text-brand-dark">Credit / Debit Card</h3>
                                        <p className="text-sm font-bold text-gray-400">Visa, Mastercard, AMEX</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-brand-blue bg-brand-blue" : "border-gray-200"}`}>
                                        {paymentMethod === "card" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </button>

                                {/* PayPal */}
                                <button
                                    onClick={() => setPaymentMethod("paypal")}
                                    className={`w-full p-8 rounded-[35px] border-2 transition-all flex items-center gap-6 group ${paymentMethod === "paypal"
                                        ? "border-brand-blue bg-brand-blue/5 shadow-xl shadow-brand-blue/10"
                                        : "border-gray-100 hover:border-brand-blue/30"
                                        }`}
                                >
                                    <div className={`p-4 rounded-2xl transition-colors ${paymentMethod === "paypal" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-400 group-hover:bg-brand-blue/10"}`}>
                                        <Wallet size={28} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-black text-brand-dark">Paypal</h3>
                                        <p className="text-sm font-bold text-gray-400">Next generation digital wallet</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "paypal" ? "border-brand-blue bg-brand-blue" : "border-gray-200"}`}>
                                        {paymentMethod === "paypal" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </button>

                                {/* Cash on Delivery */}
                                <button
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`w-full p-8 rounded-[35px] border-2 transition-all flex items-center gap-6 group ${paymentMethod === "cod"
                                        ? "border-brand-blue bg-brand-blue/5 shadow-xl shadow-brand-blue/10"
                                        : "border-gray-100 hover:border-brand-blue/30"
                                        }`}
                                >
                                    <div className={`p-4 rounded-2xl transition-colors ${paymentMethod === "cod" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-400 group-hover:bg-brand-blue/10"}`}>
                                        <Truck size={28} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-black text-brand-dark">Cash on Delivery</h3>
                                        <p className="text-sm font-bold text-gray-400">Pay when your treats arrive</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-brand-blue bg-brand-blue" : "border-gray-200"}`}>
                                        {paymentMethod === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Order Confirmation Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-brand-yellow/10 border-2 border-brand-yellow/20 rounded-[40px] p-10">
                                <h3 className="text-xl font-black text-brand-dark mb-8 uppercase tracking-widest flex items-center gap-3">
                                    <ShieldCheck className="text-brand-blue" /> Order Summary
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between font-bold text-gray-500">
                                        <span>Merchandise Subtotal</span>
                                        <span className="text-brand-dark">${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between font-bold text-green-600 italic">
                                            <span>Reward Discount</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-gray-500">
                                        <span>Delivery Fee</span>
                                        <span className="text-brand-dark">$5.00</span>
                                    </div>
                                    <div className="h-px bg-brand-yellow/20 my-6"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black text-brand-dark uppercase tracking-widest">Total to Pay</span>
                                        <span className="text-4xl font-black text-brand-blue">${total.toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={handleCompletePurchase}
                                        disabled={isProcessing}
                                        className={`w-full bg-brand-dark text-white py-6 rounded-3xl font-black text-lg mt-12 flex items-center justify-center gap-3 hover:bg-brand-blue transition-all transform active:scale-95 shadow-2xl shadow-brand-dark/20 ${isProcessing ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            <>Complete Purchase <ArrowRight size={22} /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

