"use client";

import { useState } from "react";
import { X, Star, Loader2, CheckCircle2, Camera } from "lucide-react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (review: { name: string; rating: number; content: string; image?: string }) => Promise<void>;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit({ name, rating, content, image: image || undefined });
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                // Reset form after closing
                setTimeout(() => {
                    setIsSuccess(false);
                    setName("");
                    setContent("");
                    setRating(5);
                    setImage(null);
                    setIsLoading(false);
                }, 300);
            }, 2000);
        } catch (error) {
            console.error("Failed to submit review", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <X size={24} className="text-slate-400" />
                </button>

                {isSuccess ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Thank You!</h3>
                        <p className="text-muted-foreground">Your review has been submitted successfully.</p>
                    </div>
                ) : (
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Write a Review</h2>
                            <p className="text-muted-foreground text-sm">Share your experience with our sweet treats.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Rating */}
                            <div className="flex flex-col items-center gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                fill={star <= rating ? "#FBBF24" : "none"}
                                                className={star <= rating ? "text-[#FBBF24]" : "text-slate-200"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sarah J."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            {/* Review Content */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Your Review</label>
                                <textarea
                                    required
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tell us what you liked..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Add a Photo (Optional)</label>
                                {image ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 group">
                                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="absolute top-2 right-2 p-2 bg-white/90 text-slate-700 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary">
                                        <Camera size={32} className="mb-2" />
                                        <span className="text-sm font-medium">Click to upload photo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
