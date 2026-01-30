"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    ShoppingBag,
    MapPin,
    Lock,
    LogOut,
    Camera,
    ShieldCheck,
    ChevronRight
} from "lucide-react";

const SIDEBAR_ITEMS = [
    { id: "settings", label: "Account Settings", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "address", label: "Address", icon: MapPin },
    { id: "password", label: "Change Password", icon: Lock },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("settings");

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">

                    {/* Sidebar */}
                    <aside className="lg:w-80 flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden relative min-h-[600px] flex flex-col"
                        >
                            {/* Profile Header */}
                            <div className="mb-10">
                                <h4 className="text-xl font-display font-black text-secondary tracking-tight">Hello, Paul!</h4>
                                <p className="text-xs text-gray-400 font-bold tracking-wider uppercase mt-1">paul@example.com</p>
                            </div>

                            {/* Sidebar Nav */}
                            <nav className="space-y-4 flex-1">
                                {SIDEBAR_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between group px-6 py-4 rounded-2xl transition-all duration-300 ${isActive
                                                    ? "text-primary bg-gray-50/50"
                                                    : "text-gray-400 hover:bg-gray-50 hover:text-secondary"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Icon size={18} className={isActive ? "text-primary" : "text-gray-300 group-hover:text-primary transition-colors"} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            {isActive && <motion.div layoutId="activeArrow" className="w-1.5 h-1.5 bg-primary rounded-full" />}
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Logout Button - Matching Screenshot */}
                            <div className="pt-8 mt-8 border-t border-gray-50">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-between bg-primary text-secondary px-8 py-5 rounded-full shadow-lg shadow-primary/20 group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                                    </div>
                                    <div className="w-2 h-2 bg-secondary rounded-full relative z-10" />
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </motion.button>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                        </motion.div>
                    </aside>

                    {/* Main Content Area */}
                    <section className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === "settings" && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-sm border border-gray-100 relative overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="mb-16">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-8 h-1 bg-primary rounded-full"></div>
                                            <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">Private Protocol</p>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tighter uppercase">Personal <span className="text-primary italic">Information</span></h2>
                                    </div>

                                    {/* Personal Info Grid */}
                                    <div className="space-y-16">

                                        {/* Avatar Section */}
                                        <div className="flex items-center gap-8">
                                            <div className="relative group">
                                                <div className="w-28 h-28 rounded-full bg-gray-50 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-display font-black text-primary overflow-hidden relative">
                                                    PN
                                                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-colors flex items-center justify-center">
                                                        <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                                    </div>
                                                </div>
                                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-secondary rounded-full border-4 border-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                                    <Camera size={16} />
                                                </button>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-display font-black text-secondary tracking-tight">Paul N</h3>
                                                <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-1">Update your photo and personal details.</p>
                                            </div>
                                        </div>

                                        {/* Main Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="group">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">First Name *</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Paul"
                                                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Last Name *</label>
                                                <input
                                                    type="text"
                                                    defaultValue="N"
                                                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                                />
                                            </div>
                                            <div className="md:col-span-2 group">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Phone/Mobile *</label>
                                                <input
                                                    type="text"
                                                    defaultValue="721*****00"
                                                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                                />
                                            </div>
                                        </div>

                                        {/* Account Info */}
                                        <div className="pt-8">
                                            <h2 className="text-3xl font-display font-black text-secondary tracking-tighter uppercase mb-10">Account <span className="text-primary italic">Information</span></h2>

                                            <div className="group">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Email *</label>
                                                <input
                                                    type="email"
                                                    defaultValue="paul@example.com"
                                                    disabled
                                                    className="w-full bg-gray-100 border border-transparent rounded-2xl px-8 py-5 text-sm font-bold text-gray-400 outline-none cursor-not-allowed opacity-70"
                                                />
                                            </div>
                                        </div>

                                        {/* Save CTA */}
                                        <div className="pt-8">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-secondary text-white px-12 py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-secondary transition-all shadow-2xl shadow-secondary/20"
                                            >
                                                Save Changes
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-sm border border-gray-100 min-h-[600px]"
                                >
                                    <div className="mb-12">
                                        <h2 className="text-4xl font-display font-black text-secondary tracking-tighter uppercase">My <span className="text-primary italic">Orders</span></h2>
                                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-4">Review your recent digital acquisitions</p>
                                    </div>

                                    <div className="space-y-6">
                                        {[1, 2, 3].map((order) => (
                                            <div key={order} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
                                                        <ShoppingBag size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Order #HB-912{order}</p>
                                                        <h4 className="text-lg font-black text-secondary uppercase tracking-tight">Quantum Processor X1</h4>
                                                        <p className="text-xs text-gray-400 font-bold mt-1">Acquired on Oct 24, 2023</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-display font-black text-secondary mb-2">$1,299.00</p>
                                                    <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-[8px] font-black uppercase tracking-[0.2em]">Delivered</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "address" && (
                                <motion.div
                                    key="address"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-sm border border-gray-100"
                                >
                                    <div className="mb-12">
                                        <h2 className="text-4xl font-display font-black text-secondary tracking-tighter uppercase">Shipping <span className="text-primary italic">Addresses</span></h2>
                                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-4">Manage your delivery protocols</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-primary text-secondary p-8 rounded-3xl shadow-xl shadow-primary/10 relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-8">
                                                    <MapPin size={24} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest bg-secondary text-white px-3 py-1 rounded-full">Primary</span>
                                                </div>
                                                <h4 className="text-lg font-black uppercase tracking-tight mb-2">Technical Hub</h4>
                                                <p className="text-xs font-bold opacity-70 leading-relaxed">721 Silicon Valley Drive,<br />Cyber District, CA 90210</p>
                                                <div className="mt-8 flex gap-4">
                                                    <button className="text-[9px] font-black uppercase tracking-widest underline decoration-2">Edit</button>
                                                    <button className="text-[9px] font-black uppercase tracking-widest opacity-30">Delete</button>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="border-2 border-dashed border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-gray-300 hover:border-primary/30 hover:text-primary transition-all duration-500 hover:bg-primary/5 group">
                                            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <span className="text-2xl font-bold">+</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add New Address</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "password" && (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-sm border border-gray-100"
                                >
                                    <div className="mb-12">
                                        <h2 className="text-4xl font-display font-black text-secondary tracking-tighter uppercase">Security <span className="text-primary italic">Protocols</span></h2>
                                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-4">Update your encryption keys</p>
                                    </div>

                                    <div className="max-w-xl space-y-10">
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••••••"
                                                className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••••••"
                                                className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••••••"
                                                className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-2xl px-8 py-5 text-sm font-bold text-secondary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5"
                                            />
                                        </div>

                                        <div className="pt-8">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-secondary text-white px-12 py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-secondary transition-all shadow-2xl shadow-secondary/20 flex items-center gap-3"
                                            >
                                                <ShieldCheck size={16} />
                                                Update Security
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                </div>
            </div>
        </main>
    );
}
