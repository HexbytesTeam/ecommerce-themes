"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    const tax = cartTotal * 0.1;
    const total = cartTotal + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order on Server
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            // 2. Initialize Razorpay Options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "HexBytes Premium Cakes",
                description: "Delicious Order Payment",
                order_id: data.id,
                handler: function (response: any) {
                    // Payment Success
                    console.log("Payment Successful", response);
                    clearCart();
                    // Ideally you'd verify signature on server here
                    router.push("/success");
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: "9999999999", // You might want to collect phone number too
                },
                theme: {
                    color: "#ec4899", // Primary pink color
                },
            };

            // 3. Open Razorpay Modal
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
            alert("Something went wrong with the payment initialization.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-white">

                <div className="pt-32 pb-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <Link href="/#new" className="text-primary hover:underline font-bold">
                        Continue Shopping
                    </Link>
                </div>

            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />


            <section className="pt-32 pb-20 lg:pt-40 bg-[#fff9fa] min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium mb-8 transition-colors"
                        >
                            <ArrowLeft size={18} /> Back to Cart
                        </Link>

                        <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-10">Checkout</h1>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Form Section */}
                            <div className="flex-1 bg-white p-8 rounded-3xl border border-pink-50 shadow-sm h-fit">
                                <div className="flex items-center gap-3 mb-6 border-b border-pink-50 pb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <Lock size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold">Shipping Details</h2>
                                </div>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Address</label>
                                        <textarea
                                            name="address"
                                            required
                                            placeholder="123 Sweet Street"
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                placeholder="New York"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zip"
                                                required
                                                placeholder="10001"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Processing..." : (
                                                <>
                                                    Pay ${total.toFixed(2)} <CreditCard size={20} />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                                            <CheckCircle2 size={12} className="text-green-500" />
                                            Secure Payment processed by Razorpay
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-[400px]">
                                <div className="bg-white p-8 rounded-3xl border border-pink-50 shadow-lg sticky top-32">
                                    <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>
                                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 items-center">
                                                <div className="relative w-16 h-16 bg-pink-50 rounded-lg flex-shrink-0">
                                                    {/* Ideally use Image component here but for summary small thumbnails are okay */}
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm truncate">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-bold text-sm">{item.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-dashed border-slate-200 pt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-bold">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tax (10%)</span>
                                            <span className="font-bold">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg pt-2 border-t border-slate-100 mt-2">
                                            <span className="font-bold">Total</span>
                                            <span className="font-bold text-primary">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
