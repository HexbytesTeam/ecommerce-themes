"use client";

import { useState } from "react";
import { User, Package, MapPin, Lock, LogOut, Camera, Mail, Save, ChevronRight, Calendar, Home, Building2, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingFood from "@/components/FloatingFood";
import OrderTrackingModal from "@/components/OrderTrackingModal";
import AddressModal from "@/components/AddressModal";

const MENU_ITEMS = [
    { id: "settings", label: "Account Settings", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "address", label: "Address", icon: MapPin },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "logout", label: "Logout", icon: LogOut, color: "text-gray-400" },
];

const DEMO_ORDERS: any[] = [
    {
        id: "FP-1201",
        date: "October 24, 2024",
        total: 48.50,
        status: "Delivered",
        items: ["Premium Kibble - 1.5kg", "Salmon Treats - 200g"],
        image: "/prod_bag.png"
    },
    {
        id: "FP-1202",
        date: "October 28, 2024",
        total: 125.00,
        status: "Shipped",
        items: ["Multi-Level Cat scratching Tree"],
        image: "/cat_cat.png"
    },
    {
        id: "FP-1203",
        date: "November 02, 2024",
        total: 34.99,
        status: "Processing",
        items: ["Premium Leather Dog Leash"],
        image: "/cat_dog.png"
    }
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("settings");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isTrackingOpen, setIsTrackingOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Password visibility state
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password fields state
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [passwordStatus, setPasswordStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({
        message: "",
        type: null
    });

    const handlePasswordUpdate = () => {
        // Validation
        if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
            setPasswordStatus({ message: "Please fill in all fields.", type: 'error' });
            return;
        }

        if (passwordData.new.length < 8) {
            setPasswordStatus({ message: "New password must be at least 8 characters.", type: 'error' });
            return;
        }

        if (passwordData.new !== passwordData.confirm) {
            setPasswordStatus({ message: "New passwords do not match.", type: 'error' });
            return;
        }

        // Logic (Simulate API call)
        setPasswordStatus({ message: "Processing...", type: null });

        setTimeout(() => {
            setPasswordStatus({ message: "Password updated successfully! 🐾✨", type: 'success' });
            setPasswordData({ current: "", new: "", confirm: "" });

            // Clear message after 3 seconds
            setTimeout(() => setPasswordStatus({ message: "", type: null }), 3000);
        }, 1500);
    };

    const [addresses, setAddresses] = useState<any[]>([
        {
            type: "Home",
            name: "Paul N",
            phone: "+91 721*****00",
            street: "123 Pet Lane, Wagtail Heights",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            landmark: "Near Central Park"
        }
    ]);

    const [formData, setFormData] = useState({
        firstName: "Paul",
        lastName: "N",
        phone: "721*****00",
        email: "paul@example.com"
    });

    const handleTrackOrder = (order: any) => {
        setSelectedOrder(order);
        setIsTrackingOpen(true);
    };

    const handleAddAddress = (newAddress: any) => {
        setAddresses([...addresses, newAddress]);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "settings":
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Profile Info Header */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                            <div className="relative">
                                <div className="w-32 h-32 bg-brand-yellow/5 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                    <span className="text-3xl font-black text-brand-blue">
                                        {formData.firstName[0]}{formData.lastName[0]}
                                    </span>
                                </div>
                                <button className="absolute bottom-1 right-1 bg-brand-orange text-white p-2.5 rounded-full border-4 border-white hover:scale-110 transition-all shadow-md">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-black text-brand-dark italic">
                                    {formData.firstName} {formData.lastName}
                                </h1>
                                <p className="text-gray-400 font-bold text-sm mt-1">Update your photo and personal details.</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">First Name *</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">Last Name *</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">Phone/Mobile *</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-xl font-black text-brand-dark italic mb-8">Account Information</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">Email *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 pl-14 pr-6 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 bg-brand-orange text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-brand-dark hover:shadow-2xl hover:shadow-brand-orange/20 transition-all transform active:scale-95 shadow-xl">
                                <Save size={20} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                );
            case "orders":
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-brand-dark italic">My Orders</h2>
                            <div className="bg-brand-yellow/10 text-brand-orange px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                                {DEMO_ORDERS.length} Orders
                            </div>
                        </div>

                        <div className="space-y-6">
                            {DEMO_ORDERS.map((order) => (
                                <div key={order.id} className="bg-gray-50 rounded-[30px] p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-lg group">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24 bg-white rounded-3xl p-3 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                            <Image
                                                src={order.image}
                                                alt={order.items[0]}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-1">Order #{order.id}</p>
                                            <h4 className="font-bold text-brand-dark text-lg group-hover:text-brand-blue transition-colors">
                                                {order.items[0]} {order.items.length > 1 ? `+ ${order.items.length - 1} more` : ""}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-2">
                                                <Calendar size={12} className="text-gray-400" />
                                                <p className="text-xs text-gray-400 font-bold">{order.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-12">
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-brand-blue">${order.total.toFixed(2)}</p>
                                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-brand-yellow/20 text-brand-orange'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleTrackOrder(order)}
                                            className="bg-brand-dark text-white p-5 rounded-[25px] hover:bg-brand-blue transition-all shadow-xl hover:-translate-y-1 active:scale-90"
                                            title="Track Order"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <OrderTrackingModal
                            isOpen={isTrackingOpen}
                            onClose={() => setIsTrackingOpen(false)}
                            order={selectedOrder}
                        />
                    </div>
                );
            case "address":
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-brand-dark italic">My Addresses</h2>
                            <button
                                onClick={() => setIsAddressModalOpen(true)}
                                className="bg-brand-blue text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg flex items-center gap-2 group"
                            >
                                <span className="group-hover:rotate-90 transition-transform">+</span>
                                Add New
                            </button>
                        </div>

                        {addresses.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin size={40} className="text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-black text-brand-dark mb-4 italic">No Addresses Saved</h3>
                                <p className="text-gray-400 font-bold max-w-sm mx-auto mb-8">
                                    Add a shipping address to speed up your checkout process.
                                </p>
                                <button
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="bg-brand-blue text-white px-10 py-5 rounded-[25px] font-black text-sm uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20"
                                >
                                    Add New Address
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {addresses.map((addr, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 relative group hover:shadow-xl transition-all h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`p-3 rounded-2xl ${addr.type === 'Home' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-orange/10 text-brand-orange'}`}>
                                                {addr.type === 'Home' ? <Home size={20} /> : <Building2 size={20} />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{addr.type}</span>
                                        </div>
                                        <h4 className="font-black text-xl text-brand-dark mb-2 italic">{addr.name}</h4>
                                        <p className="text-gray-400 font-bold text-sm leading-relaxed flex-1">
                                            {addr.street}<br />
                                            {addr.city}, {addr.pincode}<br />
                                            {addr.landmark && <span className="text-brand-orange text-[10px] mt-2 block">Lnd: {addr.landmark}</span>}
                                        </p>
                                        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 flex items-center justify-between">
                                            <p className="text-xs font-black text-brand-blue uppercase tracking-wider">{addr.phone}</p>
                                            <button
                                                onClick={() => setAddresses(addresses.filter((_, i) => i !== idx))}
                                                className="text-brand-dark hover:text-brand-orange transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <AddressModal
                            isOpen={isAddressModalOpen}
                            onClose={() => setIsAddressModalOpen(false)}
                            onSave={handleAddAddress}
                        />
                    </div>
                );
            case "password":
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-black text-brand-dark italic mb-8">Security & Password</h2>
                        <div className="max-w-md space-y-6">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 pl-6 pr-14 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-blue transition-colors"
                                    >
                                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Min 8 characters"
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 pl-6 pr-14 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-blue transition-colors"
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-brand-dark uppercase tracking-widest pl-1">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Repeat new password"
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue/20 rounded-2xl py-4 pl-6 pr-14 font-bold text-brand-dark outline-none transition-all shadow-inner"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-blue transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Status Message */}
                            {passwordStatus.message && (
                                <div className={`p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300 ${passwordStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' :
                                    passwordStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' :
                                        'bg-brand-blue/5 text-brand-blue border border-brand-blue/10'
                                    }`}>
                                    {passwordStatus.message}
                                </div>
                            )}

                            <button
                                onClick={handlePasswordUpdate}
                                disabled={passwordStatus.message === "Processing..."}
                                className="w-full flex items-center justify-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                {passwordStatus.message === "Processing..." ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-gray-50/50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[80px] -ml-40 -mb-40"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="lg:w-80">
                        <div className="bg-white rounded-[40px] shadow-xl shadow-brand-blue/5 p-8 overflow-hidden relative border border-gray-100/50">
                            {/* User Header */}
                            <div className="mb-10">
                                <h2 className="text-xl font-black text-brand-dark">Hello, {formData.firstName}!</h2>
                                <p className="text-xs font-bold text-gray-400 mt-1">{formData.email}</p>
                            </div>

                            {/* Menu */}
                            <nav className="space-y-3">
                                {MENU_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === item.id
                                            ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                                            : "hover:bg-gray-50 text-brand-dark"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon size={20} className={activeTab === item.id ? "text-white" : "text-gray-400 group-hover:text-brand-dark"} />
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </div>
                                        {activeTab === item.id && <ChevronRight size={16} />}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Pet Tip Card */}
                        <div className="mt-8 bg-brand-dark rounded-[40px] p-8 text-white relative overflow-hidden group border border-white/5">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-2">Pet Care Tip</p>
                                <h4 className="text-lg font-bold leading-tight mb-4 italic">Is your pet drinking enough water?</h4>
                                <Link href="/blog" className="text-xs font-black border-b-2 border-brand-yellow pb-1 hover:text-brand-yellow transition-colors">
                                    Read Guide
                                </Link>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-8xl">🐾</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="flex-1 bg-white rounded-[40px] shadow-xl shadow-brand-blue/5 p-8 md:p-12 border border-gray-100/50 min-h-[600px]">
                        {renderContent()}
                    </section>
                </div>
            </div>
        </main>
    );
}
