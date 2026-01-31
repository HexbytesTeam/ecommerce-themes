"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Lock,
    MapPin,
    User,
    Mail,
    Phone,
    Building,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Truck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS } from "@/lib/products";

export default function CheckoutPage() {
    // Mock cart items - in production, this would come from context/state management
    const cartItems = [
        { product: ALL_PRODUCTS[0], quantity: 1 },
        { product: ALL_PRODUCTS[1], quantity: 2 },
    ];

    const [formData, setFormData] = useState({
        // Contact Information
        email: "",
        phone: "",

        // Shipping Address
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",

        // Payment
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",

        // Options
        saveInfo: false,
        sameAsBilling: true,
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            'email', 'phone', 'firstName', 'lastName',
            'address', 'city', 'state', 'zipCode',
            'cardNumber', 'cardName', 'expiryDate', 'cvv'
        ];

        for (const field of requiredFields) {
            if (!formData[field as keyof typeof formData]) {
                alert(`Please fill in all required fields. Missing: ${field}`);
                return false;
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setOrderPlaced(true);

            // Show success message
            alert('🎉 Order placed successfully! Thank you for your purchase.');

            // In production, redirect to order confirmation page
            // router.push('/order-confirmation');
        }, 2000);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 1000 ? 0 : 50;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-6 uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Back to Cart
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-1 bg-primary rounded-full"></div>
                        <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">Secure Payment</p>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-display font-black text-secondary tracking-tighter uppercase">
                        Check<span className="text-primary italic">out</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Mail size={20} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">
                                    Contact Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Shipping Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <MapPin size={20} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">
                                    Shipping Address
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Doe"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main Street"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Apartment, Suite, etc.
                                    </label>
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleInputChange}
                                        placeholder="Apt 4B"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="NY"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        ZIP Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="10001"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Country *
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                        required
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                        <option>Australia</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <CreditCard size={20} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">
                                    Payment Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Card Number *
                                    </label>
                                    <div className="relative">
                                        <CreditCard size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                        Cardholder Name *
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                            Expiry Date *
                                        </label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                            CVV *
                                        </label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                maxLength={4}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-secondary outline-none focus:border-primary transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    <Shield size={16} className="text-green-500" />
                                    <span>Your payment information is secure and encrypted</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 sticky top-32 space-y-8"
                        >
                            <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-black text-secondary">{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-primary font-black tracking-[0.2em] uppercase mb-1">
                                                {item.product.category}
                                            </p>
                                            <h4 className="text-sm font-black text-secondary line-clamp-2 mb-2">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-lg font-display font-black text-secondary">
                                                ${(item.product.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    <span>Subtotal</span>
                                    <span className="text-secondary">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    <span>Shipping</span>
                                    <span className="text-secondary">
                                        {shipping === 0 ? "FREE" : `$${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    <span>Tax (8%)</span>
                                    <span className="text-secondary">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-display font-black text-secondary pt-4 border-t border-gray-100">
                                    <span className="uppercase">Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <motion.button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing || orderPlaced}
                                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                                className={`w-full px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 ${isProcessing || orderPlaced
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-primary text-secondary hover:bg-secondary hover:text-white'
                                    }`}
                            >
                                <CheckCircle2 size={18} className={isProcessing ? 'animate-spin' : ''} />
                                {isProcessing ? 'Processing...' : orderPlaced ? 'Order Placed!' : 'Place Order'}
                            </motion.button>

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
            </div>
        </main>
    );
}
