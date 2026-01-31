"use client";

import { X, MapPin, Home, Building2, Save } from "lucide-react";
import { useState, useEffect } from "react";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: any) => void;
}

export default function AddressModal({ isOpen, onClose, onSave }: AddressModalProps) {
    const [animate, setAnimate] = useState(false);
    const [addressType, setAddressType] = useState<"Home" | "Work">("Home");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: ""
    });

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, type: addressType });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-xl bg-white rounded-[50px] shadow-2xl transition-all duration-500 overflow-hidden ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="p-8 md:p-10 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                    <div>
                        <p className="text-brand-orange font-black uppercase text-[10px] tracking-[0.3em] mb-1">New Location</p>
                        <h2 className="text-3xl font-black text-brand-dark italic">Add <span className="text-brand-blue uppercase">Address</span></h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-4 bg-white rounded-2xl hover:bg-brand-orange hover:text-white transition-all shadow-lg active:scale-90 border border-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8 md:p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Address Type Selector */}
                    <div className="flex gap-4 mb-10">
                        <button
                            type="button"
                            onClick={() => setAddressType("Home")}
                            className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-[30px] transition-all border-2 ${addressType === 'Home'
                                    ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-lg shadow-brand-blue/10'
                                    : 'bg-gray-50 border-transparent text-gray-400 grayscale hover:grayscale-0'
                                }`}
                        >
                            <Home size={24} />
                            <span className="font-black text-xs uppercase tracking-widest">Home</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setAddressType("Work")}
                            className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-[30px] transition-all border-2 ${addressType === 'Work'
                                    ? 'bg-brand-orange/5 border-brand-orange text-brand-orange shadow-lg shadow-brand-orange/10'
                                    : 'bg-gray-50 border-transparent text-gray-400 grayscale hover:grayscale-0'
                                }`}
                        >
                            <Building2 size={24} />
                            <span className="font-black text-xs uppercase tracking-widest">Work</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Paul N"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">Phone Number *</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="e.g. 721*****00"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">Street Address / Area *</label>
                            <input
                                required
                                type="text"
                                placeholder="House No, Building, Colony, Street"
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">City *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="City name"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">Pincode *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="6 Digit PIN"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] items-center gap-2 font-black text-brand-dark uppercase tracking-widest pl-1">Landmark (Optional)</label>
                            <input
                                type="text"
                                placeholder="Near park, mall, etc."
                                value={formData.landmark}
                                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-50 focus:border-brand-blue/20 rounded-2xl py-4 px-6 font-bold text-brand-dark outline-none transition-all shadow-inner placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-12 bg-brand-dark text-white p-6 rounded-[30px] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-brand-blue transition-all shadow-2xl hover:shadow-brand-blue/30 group"
                    >
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        Save New Address
                    </button>
                </form>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}</style>
        </div>
    );
}
