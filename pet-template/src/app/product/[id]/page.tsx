"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, Calendar, Target, Weight, List, ShieldCheck, ChevronLeft, Minus, Plus } from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = Array.isArray(id) ? id[0] : id;
            if (!productId) {
                setLoading(false);
                return;
            }

            try {
                // Priority 1: Check shared ALL_PRODUCTS data for absolute consistency
                const foundProduct = ALL_PRODUCTS.find(p => p.id === productId || p._id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                    if (foundProduct.availableWeights?.length) {
                        setSelectedWeight(foundProduct.availableWeights[0]);
                    } else if (foundProduct.weight) {
                        setSelectedWeight(foundProduct.weight);
                    }
                    setLoading(false);
                    return;
                }

                // Priority 2: Try Backend if not in shared mock
                const res = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                    if (data.availableWeights?.length) {
                        setSelectedWeight(data.availableWeights[0]);
                    } else if (data.weight) {
                        setSelectedWeight(data.weight);
                    }
                }
            } catch (err) {
                console.error("Fetch failed, checked shared data already:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToBasket = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            weight: selectedWeight,
            quantity: quantity
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <h1 className="text-2xl font-black text-brand-dark mb-4">Product Not Found</h1>
                <Link href="/" className="text-brand-blue font-bold hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-6 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors">
                        <ChevronLeft size={16} /> Back to Shop
                    </Link>
                </div>
            </div>

            <main className="py-12 md:py-20 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                        {/* Image Gallery */}
                        <div className="relative aspect-square md:h-[600px] bg-gray-50 rounded-[50px] p-12 flex items-center justify-center overflow-hidden border border-gray-100 group">
                            {product.badge && (
                                <span className="absolute top-8 left-8 bg-brand-orange text-white text-sm font-black px-4 py-2 rounded-full z-10 shadow-lg">
                                    {product.badge}
                                </span>
                            )}
                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Product Info & Specs */}
                        <div className="flex flex-col">
                            <span className="text-brand-blue font-black uppercase tracking-[0.2em] text-sm mb-4">{product.category}</span>
                            <h1 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight mb-6">
                                {product.name}
                            </h1>

                            {/* Rating & Short Review */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 bg-brand-yellow/20 px-3 py-1 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#FFCB05" : "none"} stroke={i < Math.floor(product.rating) ? "#FFCB05" : "#D1D5DB"} />
                                    ))}
                                    <span className="text-sm font-black text-brand-dark ml-1">{product.rating.toFixed(1)}</span>
                                </div>
                                <span className="text-gray-400 text-sm font-bold">128+ Reviews</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-4xl md:text-5xl font-black text-brand-blue">${product.price.toFixed(2)}</span>
                                {product.oldPrice && (
                                    <span className="text-xl text-gray-400 font-bold line-through">${product.oldPrice.toFixed(2)}</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 leading-relaxed mb-12 text-lg">
                                {product.description || "FocoPet ensures the highest standards of nutrition for your pets. Our balanced formula is crafted with premium natural ingredients to maintain peak health and vitality."}
                            </p>

                            {/* Choice of weight */}
                            {product.availableWeights && product.availableWeights.length > 0 && (
                                <div className="mb-10">
                                    <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4">Choose Weight</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {product.availableWeights.map((w) => (
                                            <button
                                                key={w}
                                                onClick={() => setSelectedWeight(w)}
                                                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${selectedWeight === w
                                                    ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20"
                                                    : "bg-white border-gray-100 text-gray-500 hover:border-brand-blue/30"
                                                    }`}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Key Animal Specifications Grid */}
                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                    <div className="p-2 bg-brand-yellow rounded-xl text-brand-dark"><Calendar size={20} /></div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Best Before</h4>
                                        <p className="text-sm font-black text-brand-dark">{product.expiryDate || "See packaging"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                    <div className="p-2 bg-brand-blue rounded-xl text-white"><Target size={20} /></div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recommended Age</h4>
                                        <p className="text-sm font-black text-brand-dark">{product.recommendedAge || "All Ages"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                    <div className="p-2 bg-brand-orange rounded-xl text-white"><Weight size={20} /></div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pack Weight</h4>
                                        <p className="text-sm font-black text-brand-dark">{selectedWeight || "Standard"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                    <div className="p-2 bg-brand-dark rounded-xl text-white"><ShieldCheck size={20} /></div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Quality Check</h4>
                                        <p className="text-sm font-black text-brand-dark">Certified Safe</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity and Add Card */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-dark hover:bg-brand-yellow transition-colors shadow-sm">
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-8 text-center font-black text-brand-dark">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-dark hover:bg-brand-yellow transition-colors shadow-sm">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToBasket}
                                    disabled={addedToCart}
                                    className={`flex-1 w-full py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${addedToCart
                                        ? "bg-green-500 text-white shadow-green-500/20"
                                        : "bg-brand-dark text-white hover:bg-brand-blue shadow-brand-dark/10"
                                        }`}
                                >
                                    {addedToCart ? (
                                        <div className="flex items-center gap-2 animate-bounce">
                                            <ShieldCheck size={22} />
                                            Added Successfully!
                                        </div>
                                    ) : (
                                        <>
                                            <ShoppingCart size={22} />
                                            Add To Basket
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Detailed Tabs/Sections */}
                    <div className="mt-24">
                        <div className="flex gap-12 border-b border-gray-100 mb-12">
                            <button className="border-b-4 border-brand-blue pb-4 text-xl font-black text-brand-dark">Animal Specifications</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-2xl font-black text-brand-dark mb-8 flex items-center gap-3">
                                    <List className="text-brand-orange" /> Ingredients
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {(product.ingredients || ["Fish Meal", "Vegetable Oil", "Proteins", "Minerals"]).map((ing, i) => (
                                        <span key={i} className="bg-gray-100 px-6 py-2 rounded-full text-sm font-bold text-gray-600 border border-gray-200">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-brand-dark rounded-[40px] p-10 md:p-12 text-white relative overflow-hidden">
                                <h3 className="text-2xl font-black mb-6 relative z-10 italic">Special Animal Notes</h3>
                                <p className="text-gray-400 leading-relaxed mb-0 relative z-10 text-lg">
                                    {product.animalSpecs || "This product is specially formulated to meet the nutritional levels established by the AAFCO dog food nutrient profiles for maintenance. Ideal for sensitive stomachs and shiny coats."}
                                </p>
                                <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-brand-yellow rounded-full opacity-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
