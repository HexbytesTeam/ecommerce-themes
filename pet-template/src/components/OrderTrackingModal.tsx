"use client";

import { X, Package, Truck, Home, CheckCircle2, MapPin, Calendar, CreditCard, Headphones, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface OrderTrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: {
        id: string;
        date: string;
        total: number;
        status: "Delivered" | "Shipped" | "Processing" | "Out for Delivery";
        items: string[];
        image?: string;
    } | null;
}

const STEPS = [
    { label: "Order Placed", icon: Calendar, status: "Processing" },
    { label: "Shipped", icon: Package, status: "Shipped" },
    { label: "Out for Delivery", icon: Truck, status: "Out for Delivery" },
    { label: "Delivered", icon: Home, status: "Delivered" },
];

export default function OrderTrackingModal({ isOpen, onClose, order }: OrderTrackingModalProps) {
    const [animate, setAnimate] = useState(false);
    const [supportStatus, setSupportStatus] = useState<{ type: 'idle' | 'processing' | 'success'; ticketId?: string }>({
        type: 'idle'
    });

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
            setSupportStatus({ type: 'idle' }); // Reset when opening
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const handleContactSupport = () => {
        setSupportStatus({ type: 'processing' });

        // Simulate ticket generation
        setTimeout(() => {
            const ticketId = `SUP-${Math.floor(100000 + Math.random() * 900000)}`;
            setSupportStatus({ type: 'success', ticketId });
        }, 1500);
    };

    if (!isOpen || !order) return null;

    const currentStepIndex = STEPS.findIndex(s => s.status === order.status);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-2xl bg-white rounded-[50px] shadow-2xl transition-all duration-500 overflow-hidden ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {/* Header */}
                <div className="p-8 md:p-12 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                    <div>
                        <p className="text-brand-orange font-black uppercase text-[10px] tracking-[0.3em] mb-2">Live Tracking</p>
                        <h2 className="text-3xl font-black text-brand-dark italic">Order <span className="text-brand-blue uppercase">{order.id}</span></h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-4 bg-white rounded-2xl hover:bg-brand-orange hover:text-white transition-all shadow-lg active:scale-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Stepper */}
                    <div className="relative flex justify-between mb-16 px-4">
                        {/* Connecting Line background */}
                        <div className="absolute top-8 left-12 right-12 h-1 bg-gray-100 -z-10 rounded-full" />
                        {/* Active Line */}
                        <div
                            className="absolute top-8 left-12 h-1 bg-brand-blue -z-10 transition-all duration-1000 delay-500 rounded-full"
                            style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 85}%` }}
                        />

                        {STEPS.map((step, idx) => {
                            const isCompleted = idx <= currentStepIndex;
                            const isActive = idx === currentStepIndex;
                            const StepIcon = step.icon;

                            return (
                                <div key={idx} className="flex flex-col items-center gap-4 relative">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${isCompleted
                                        ? 'bg-brand-blue text-white'
                                        : 'bg-white text-gray-300'
                                        } ${isActive ? 'animate-bounce' : ''}`}>
                                        <StepIcon size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-brand-blue' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                        {isCompleted && !isActive && (
                                            <div className="flex justify-center mt-1">
                                                <CheckCircle2 size={12} className="text-green-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gray-50 rounded-[30px] p-8 border border-gray-100">
                            <h4 className="flex items-center gap-2 text-brand-dark font-black italic mb-6">
                                <MapPin size={18} className="text-brand-orange" />
                                Delivery Address
                            </h4>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed">
                                Paul N<br />
                                123 Pet Lane, Wagtail Heights<br />
                                Mumbai, Maharashtra 400001<br />
                                <span className="text-brand-blue">+91 721*****00</span>
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-[30px] p-8 border border-gray-100">
                            <h4 className="flex items-center gap-2 text-brand-dark font-black italic mb-6">
                                <CreditCard size={18} className="text-brand-blue" />
                                Payment Summary
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${(order.total - 5).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-gray-400">
                                    <span>Shipping</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-brand-dark border-t border-dashed border-gray-200 pt-3">
                                    <span>Total</span>
                                    <span className="text-brand-blue">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div>
                        <h4 className="text-xl font-black text-brand-dark italic mb-6">Items Packaged</h4>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl border-2 border-dashed border-gray-100 hover:border-brand-yellow/50 transition-colors group">
                                    <div className="relative w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden flex items-center justify-center">
                                        {order.image ? (
                                            <Image
                                                src={order.image}
                                                alt={item}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-black text-brand-orange italic bg-gray-50">
                                                {item[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{item}</p>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Qty: 1 • Standard Size</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-brand-dark text-center relative overflow-hidden">
                    {supportStatus.type === 'success' ? (
                        <div className="animate-in fade-in zoom-in duration-500 py-2">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                                    <MessageSquare size={24} />
                                </div>
                            </div>
                            <p className="text-white font-black italic text-lg mb-1">Support Ticket Created!</p>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Ref: <span className="text-brand-yellow">{supportStatus.ticketId}</span></p>
                        </div>
                    ) : (
                        <>
                            <p className="text-white/60 text-xs font-bold mb-4">Need help with this order?</p>
                            <button
                                onClick={handleContactSupport}
                                disabled={supportStatus.type === 'processing'}
                                className="bg-brand-yellow text-brand-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-orange hover:text-white transition-all shadow-xl shadow-brand-yellow/10 active:scale-95 disabled:opacity-50 disabled:scale-100 group flex items-center gap-3 mx-auto"
                            >
                                <Headphones size={20} className={supportStatus.type === 'processing' ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
                                {supportStatus.type === 'processing' ? 'Connecting...' : 'Contact Support'}
                            </button>
                        </>
                    )}
                </div>
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
