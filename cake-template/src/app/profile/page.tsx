"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Camera, Mail, Phone, User, Save,
    Package, MapPin, HelpCircle,
    Lock, LogOut, ChevronRight
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function ProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("account");

    // Dummy User Data
    const [formData, setFormData] = useState({
        firstName: "Paul",
        lastName: "N",
        phone: "721*****00",
        email: "paul@example.com",
    });
    const [avatar, setAvatar] = useState<string | null>(null);

    // Dummy Address Data
    const [addressData, setAddressData] = useState({
        street: "123 Sweet Tooth Lane",
        city: "Cake City",
        state: "NY",
        zip: "10001",
        country: "United States"
    });

    // Dummy Orders Data
    const orders = [
        { id: "ORD-7782-XM", date: "Oct 24, 2025", status: "Delivered", total: "$45.90", items: 3 },
        { id: "ORD-9921-PL", date: "Sep 12, 2025", status: "Processing", total: "$120.50", items: 5 },
        { id: "ORD-1102-AB", date: "Aug 05, 2025", status: "Cancelled", total: "$22.00", items: 1 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            // Clear any auth tokens (simulated)
            router.push("/");
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Changes saved successfully!");
    };

    const menuItems = [
        { id: "account", label: "Account Settings", icon: User },
        { id: "orders", label: "Orders", icon: Package },
        { id: "address", label: "Address", icon: MapPin },
        { id: "password", label: "Change Password", icon: Lock },
        { id: "logout", label: "Logout", icon: LogOut, action: handleLogout },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return (
                    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-500">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Personal Information</h2>

                            {/* Avatar Section */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full border-4 border-pink-50 shadow-md bg-white flex items-center justify-center overflow-hidden">
                                        {avatar ? (
                                            <Image src={avatar} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-primary/50">
                                                {formData.firstName?.[0]}{formData.lastName?.[0]}
                                            </span>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-md border-2 border-white">
                                        <Camera size={14} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{formData.firstName} {formData.lastName}</p>
                                    <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-600">Phone/Mobile *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Account Information</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                            <Save size={18} /> Save Changes
                        </button>
                    </form>
                );

            case "orders":
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">My Orders</h2>
                        {orders.map(order => (
                            <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-primary">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{order.date} • {order.items} Items</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                        order.status === "Processing" ? "bg-blue-100 text-blue-700" :
                                            "bg-red-100 text-red-700"
                                        }`}>
                                        {order.status}
                                    </span>
                                    <p className="font-bold text-lg">{order.total}</p>
                                    <button className="text-primary hover:underline text-sm font-bold">View Details</button>
                                </div>
                            </div>
                        ))}

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm">
                            <HelpCircle size={20} className="flex-shrink-0" />
                            <p>Having trouble with an order? <Link href="/contact" className="underline font-bold">Contact Support</Link></p>
                        </div>
                    </div>
                );

            case "address":
                return (
                    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Street Address</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={addressData.street}
                                    onChange={handleAddressChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={addressData.city}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={addressData.state}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={addressData.zip}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={addressData.country}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                            <Save size={18} /> Update Address
                        </button>
                    </form>
                );

            case "password":
                return (
                    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-500 max-w-lg">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Change Password</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Current Password</label>
                                <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">New Password</label>
                                <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Confirm New Password</label>
                                <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                        </div>
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                            <Lock size={18} /> Update Password
                        </button>
                    </form>
                );

            default:
                return <div className="p-10 text-center text-muted-foreground">Content for {activeTab} is coming soon.</div>;
        }
    };

    return (
        <main className="min-h-screen bg-white">


            <section className="pt-32 pb-20 lg:pt-40 bg-[#fff9fa] min-h-[90vh]">
                <div className="container mx-auto px-4">
                    {/* Mobile Tab Select (Visible only on small screens) */}
                    <div className="lg:hidden mb-8">
                        <label className="text-sm font-bold text-slate-600 mb-2 block">My Account Menu</label>
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {menuItems.map(item => (
                                item.id !== 'logout' && <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Sidebar (Desktop) */}
                        <div className="hidden lg:block w-72 flex-shrink-0">
                            <div className="bg-white rounded-[2rem] shadow-lg border border-pink-50 overflow-hidden sticky top-32">
                                <div className="p-6 bg-primary/5 border-b border-pink-50">
                                    <p className="font-bold text-slate-900">Hello, {formData.firstName}!</p>
                                    <p className="text-xs text-muted-foreground">{formData.email}</p>
                                </div>
                                <nav className="p-4 space-y-2">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeTab === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={item.action || (() => setActiveTab(item.id))}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                                    }`}
                                            >
                                                <Icon size={18} />
                                                <span>{item.label}</span>
                                                {isActive && <ChevronRight size={16} className="ml-auto" />}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1">
                            <div className="bg-white rounded-[2rem] shadow-xl border border-pink-50 p-8 md:p-12 min-h-[600px]">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
