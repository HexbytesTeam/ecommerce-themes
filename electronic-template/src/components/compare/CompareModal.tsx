"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

export function CompareModal() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        setShowModal(compareList.length > 0);
    }, [compareList]);

    if (!showModal || compareList.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowModal(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-[3rem] p-10 max-w-6xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-display font-black text-secondary uppercase tracking-tight">
                                Product <span className="text-primary italic">Comparison</span>
                            </h2>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mt-2">
                                Compare up to 4 products side-by-side
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={clearCompare}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-4 text-xs font-black text-gray-400 uppercase tracking-widest sticky left-0 bg-white">
                                        Feature
                                    </th>
                                    {compareList.map((product) => (
                                        <th key={product.id} className="p-4 min-w-[250px]">
                                            <div className="relative">
                                                <button
                                                    onClick={() => removeFromCompare(product.id)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all z-10"
                                                >
                                                    <X size={14} />
                                                </button>
                                                <Link href={`/product/${product.id}`}>
                                                    <div className="bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition-all">
                                                        <div className="relative w-full h-32 mb-4">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-black text-secondary text-center mb-2">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 font-bold uppercase text-center">
                                                            {product.brand}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Price */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Price
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            <p className="text-2xl font-display font-black text-secondary">
                                                ${product.price.toLocaleString()}
                                            </p>
                                            {product.mrp && (
                                                <p className="text-xs text-gray-300 line-through">
                                                    ${product.mrp.toLocaleString()}
                                                </p>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Rating
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex text-primary">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                                            className={i < Math.floor(product.rating) ? "" : "text-gray-200"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs font-bold text-gray-400">
                                                    {product.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Category
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase">
                                                {product.category}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Brand */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Brand
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm font-bold text-gray-600">
                                            {product.brand}
                                        </td>
                                    ))}
                                </tr>

                                {/* Reviews */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Reviews
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm font-bold text-gray-600">
                                            {product.reviews || 0} Reviews
                                        </td>
                                    ))}
                                </tr>

                                {/* Loyalty Points */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Loyalty Points
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm font-bold text-primary">
                                            {product.points || 0} Points
                                        </td>
                                    ))}
                                </tr>

                                {/* Description */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 text-xs font-black text-secondary uppercase tracking-widest sticky left-0 bg-white">
                                        Description
                                    </td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4">
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                {product.description || "No description available"}
                                            </p>
                                        </td>
                                    ))}
                                </tr>

                                {/* Action */}
                                <tr className="border-t border-gray-100">
                                    <td className="p-4 sticky left-0 bg-white"></td>
                                    {compareList.map((product) => (
                                        <td key={product.id} className="p-4">
                                            <Link href={`/product/${product.id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full bg-secondary text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all flex items-center justify-center gap-2"
                                                >
                                                    View Details
                                                    <ArrowRight size={14} />
                                                </motion.button>
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
