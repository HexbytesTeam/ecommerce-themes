"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Minus, Plus, ShoppingBag, Heart, ArrowLeft, Truck, ShieldCheck } from "lucide-react";

import { getProductBySlug } from "@/lib/product-data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

import AddonModal from "@/components/AddonModal";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: ProductPageProps) {
    const { slug } = use(params);
    const router = useRouter(); // Use App Router
    const product = getProductBySlug(slug);
    const [quantity, setQuantity] = useState(1);

    // New Options State
    const [flavor, setFlavor] = useState("Chocolate Truffle");
    const [isEggless, setIsEggless] = useState(true);
    const [weight, setWeight] = useState("1 Kg");
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("Delhi");
    const [area, setArea] = useState("Bhajanpura");
    const [deliveryDate, setDeliveryDate] = useState("Today");
    const [deliveryTime, setDeliveryTime] = useState("6PM-8PM");

    // Modal State
    const [showAddonModal, setShowAddonModal] = useState(false);

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) {
        notFound();
    }

    const isSaved = isInWishlist(product.id);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (product) {
            // In a real app, would also pass the options (flavor, weight, etc.)
            addToCart(product, quantity);
            setShowAddonModal(true);
        }
    };

    const handleContinue = () => {
        router.push("/cart");
    };

    return (
        <main className="min-h-screen bg-white">
            <AddonModal
                isOpen={showAddonModal}
                onClose={handleContinue} // Skip also goes to cart/next step for now
                onContinue={handleContinue}
            />

            <section className="pt-32 pb-20 lg:pt-48 bg-[#fff9fa]">
                <div className="container mx-auto px-4">
                    <Link
                        href="/#new"
                        className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={18} /> Back to Collection
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        {/* Image Gallery */}
                        <div className="flex-1 w-full">
                            <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-white rounded-[3rem] p-12 shadow-xl border border-pink-50">
                                <div className="absolute inset-0 bg-pink-50/20 rounded-[3rem] m-4" />
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 w-full">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {product.category}
                                </span>
                                <div className="flex items-center text-yellow-400 gap-1 text-sm font-bold">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-black ml-1">{product.rating}</span>
                                    <span className="text-muted-foreground font-normal">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
                                {product.name}
                            </h1>

                            {/* Options Section */}
                            <div className="space-y-6 mb-8">
                                {/* Read More Link Placeholder */}
                                <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                                    Read More
                                </button>

                                {/* Flavors */}
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-3">Flavors</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["Chocolate Truffle", "Exotic Pineapple", "Caramel Butterscotch", "Black Forest"].map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => setFlavor(f)}
                                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${flavor === f
                                                    ? "border-primary text-primary bg-pink-50"
                                                    : "border-slate-200 text-slate-600 hover:border-primary/50"
                                                    }`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Egg Option */}
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-3">Egg Option</h3>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setIsEggless(false)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-all ${!isEggless
                                                ? "border-[#8B4513] text-[#8B4513] bg-orange-50"
                                                : "border-slate-200 text-slate-600"
                                                }`}
                                        >
                                            Egg
                                            <span className={`w-3 h-3 rounded-full border ${!isEggless ? "bg-[#8B4513] border-[#8B4513]" : "bg-white border-slate-300"}`} />
                                        </button>
                                        <button
                                            onClick={() => setIsEggless(true)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-all ${isEggless
                                                ? "border-green-600 text-green-600 bg-green-50"
                                                : "border-slate-200 text-slate-600"
                                                }`}
                                        >
                                            Eggless
                                            <span className={`w-3 h-3 rounded-full border ${isEggless ? "bg-green-600 border-green-600" : "bg-white border-slate-300"}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Weight */}
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-3">Weight</h3>
                                    <div className="flex gap-3">
                                        {["1 Kg", "1.5 Kg", "2 Kg"].map((w) => (
                                            <button
                                                key={w}
                                                onClick={() => setWeight(w)}
                                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${weight === w
                                                    ? "border-slate-900 text-white bg-slate-900"
                                                    : "border-slate-200 text-slate-600 hover:border-slate-900"
                                                    }`}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-900 mb-1">Location</label>
                                            <select
                                                className="w-full bg-transparent border-b border-slate-300 py-1 text-sm font-medium focus:outline-none focus:border-primary"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            >
                                                <option>Delhi</option>
                                                <option>New York</option>
                                                <option>London</option>
                                                <option>Paris</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-900 mb-1">Area</label>
                                            <select
                                                className="w-full bg-transparent border-b border-slate-300 py-1 text-sm font-medium focus:outline-none focus:border-primary"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                            >
                                                <option>Bhajanpura</option>
                                                <option>Downtown</option>
                                                <option>Uptown</option>
                                                <option>Suburbs</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Date & Time Selection */}
                                    <div>
                                        <label className="block font-bold text-slate-900 mb-3">Select Date & Time *</label>

                                        <div className="flex gap-3 mb-4 flex-wrap">
                                            {["Today", "Tomorrow"].map((d) => (
                                                <button
                                                    key={d}
                                                    onClick={() => setDeliveryDate(d)}
                                                    className={`px-4 py-2 border rounded-none bg-white text-sm font-medium transition-all ${deliveryDate === d
                                                        ? "border-slate-900 text-slate-900 border-2"
                                                        : "border-slate-300 text-slate-600 hover:border-slate-400"
                                                        }`}
                                                >
                                                    {d}
                                                </button>
                                            ))}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setDeliveryDate("Calendar")}
                                                    className={`px-4 py-2 border rounded-none bg-white text-sm font-medium transition-all ${!["Today", "Tomorrow"].includes(deliveryDate)
                                                        ? "border-slate-900 text-slate-900 border-2"
                                                        : "border-slate-300 text-slate-600 hover:border-slate-400"
                                                        }`}
                                                >
                                                    {(!["Today", "Tomorrow", "Calendar"].includes(deliveryDate)) ? deliveryDate : "Calendar"}
                                                </button>
                                                {/* Show date picker if Calendar is active or a custom date is selected */}
                                                {(!["Today", "Tomorrow"].includes(deliveryDate)) && (
                                                    <input
                                                        type="date"
                                                        className="mt-2 p-2 border border-slate-200 shadow-xl rounded-lg bg-white z-20 text-sm block"
                                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {["6PM-8PM", "7PM-9PM", "9PM-11PM"].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setDeliveryTime(t)}
                                                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm ${deliveryTime === t
                                                        ? "bg-[#F06A7D] text-white"
                                                        : "bg-white text-slate-500 border border-slate-200 hover:border-primary/50"
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block font-bold text-slate-900 mb-2">Message on Cake</label>
                                    <input
                                        type="text"
                                        placeholder="Message on cake (Optional)"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full p-3 bg-[#6D4C41] text-white placeholder:text-white/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="flex flex-col gap-4 mb-10">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full py-4 rounded-full font-bold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${product.isPreOrder
                                        ? "bg-purple-600 text-white shadow-purple-500/20"
                                        : "bg-primary text-white hover:bg-primary/90 shadow-pink-500/20"
                                        }`}
                                >
                                    <ShoppingBag size={20} />
                                    {product.isPreOrder ? "Pre-Order Now" : "Add to Cart"}
                                </button>

                                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                    <span className="font-bold">NOTE :</span> Design and icing of cake may vary from the image shown here since each chef has his/her own way of baking and designing a cake.
                                </p>
                            </div>

                            {/* Trust Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#FFF0E5] rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                    <ShieldCheck size={28} className="text-slate-900" strokeWidth={1.5} />
                                    <p className="text-xs font-bold text-slate-900">100% Purchase Protection</p>
                                </div>
                                <div className="bg-[#FFF0E5] rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                    {/* Custom Icon Placeholder - using Heart for now */}
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                        <Heart size={14} className="text-slate-900" fill="currentColor" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-900">Serving Excellence</p>
                                </div>
                                <div className="bg-[#FFF0E5] rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                    {/* Clock Icon */}
                                    <div className="relative w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-900 rotate-45 transform origin-center scale-x-50 translate-x-[2px]" />
                                        <div className="w-1 h-1 bg-slate-900 rounded-full" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-900">Timely Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main >
    );
}
