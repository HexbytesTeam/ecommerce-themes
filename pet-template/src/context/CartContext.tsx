"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    weight: string;
    quantity: number;
}

interface Coupon {
    code: string;
    discountType: "percentage" | "flat";
    value: number;
}

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: string, weight: string, quantity: number) => void;
    removeFromCart: (id: string, weight: string) => void;
    clearCart: () => void;
    subtotal: number;
    discount: number;
    total: number;
    appliedCoupon: Coupon | null;
    applyCoupon: (code: string) => { success: boolean, message: string };
    removeCoupon: () => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    wishlist: string[];
    toggleWishlist: (id: string) => void;
    wishlistCount: number;
}

const MOCK_COUPONS: Coupon[] = [
    { code: "FOCONEW", discountType: "percentage", value: 10 },
    { code: "GET20", discountType: "flat", value: 20 },
    { code: "PETLOVER", discountType: "percentage", value: 15 }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);

    // Load cart and wishlist from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("focopet-cart");
        const savedWishlist = localStorage.getItem("focopet-wishlist");

        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }

        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Save cart and wishlist to localStorage on change
    useEffect(() => {
        localStorage.setItem("focopet-cart", JSON.stringify(cart));
        localStorage.setItem("focopet-wishlist", JSON.stringify(wishlist));
    }, [cart, wishlist]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(i => i.id === item.id && i.weight === item.weight);
            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += item.quantity;
                return newCart;
            }
            return [...prev, item];
        });
    };

    const updateQuantity = (id: string, weight: string, quantity: number) => {
        setCart(prev => prev.map(item =>
            (item.id === id && item.weight === weight) ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const removeFromCart = (id: string, weight: string) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.weight === weight)));
    };

    const clearCart = () => setCart([]);

    const toggleWishlist = (id: string) => {
        setWishlist(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            }
            return [...prev, id];
        });
    };

    const applyCoupon = (code: string) => {
        const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
        if (coupon) {
            setAppliedCoupon(coupon);
            return { success: true, message: `Coupon ${coupon.code} applied!` };
        }
        return { success: false, message: "Invalid coupon code." };
    }

    const removeCoupon = () => setAppliedCoupon(null);

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    let discount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.discountType === "percentage") {
            discount = subtotal * (appliedCoupon.value / 100);
        } else {
            discount = Math.min(subtotal, appliedCoupon.value);
        }
    }

    const shipping = cart.length > 0 ? 5.00 : 0;
    const total = subtotal - discount + shipping;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    return (
        <CartContext.Provider value={{
            cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart,
            subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon,
            isDrawerOpen, setIsDrawerOpen, wishlist, toggleWishlist, wishlistCount
        }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
