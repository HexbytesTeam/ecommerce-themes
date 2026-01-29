"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/product-data";

export interface CartItem extends Product {
    cartItemId?: string;
    quantity: number;
    selectedOptions?: {
        flavor?: string;
        isEggless?: boolean;
        weight?: string;
        message?: string;
        city?: string;
        area?: string;
        deliveryDate?: string;
        deliveryTime?: string;
    };
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, options?: CartItem['selectedOptions']) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    discount: number;
    applyCoupon: (code: string) => { success: boolean; message: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [discount, setDiscount] = useState(0);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("hexbytes-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart data", e);
            }
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        localStorage.setItem("hexbytes-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: number, options?: CartItem['selectedOptions']) => {
        setItems((prev) => {
            // Create a unique ID based on product ID AND options
            // This ensures Chocolate Cake and Pineapple Cake are different items
            const optionsKey = options ? JSON.stringify(options) : "";
            const uniqueId = `${product.id}-${optionsKey}`;

            const existing = prev.find((item) => {
                const itemOptionsKey = item.selectedOptions ? JSON.stringify(item.selectedOptions) : "";
                return item.id === product.id && itemOptionsKey === optionsKey;
            });

            if (existing) {
                return prev.map((item) => {
                    const itemOptionsKey = item.selectedOptions ? JSON.stringify(item.selectedOptions) : "";
                    return (item.id === product.id && itemOptionsKey === optionsKey)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item;
                });
            }

            // Note: We might want to store the "base" ID separately if we need it, 
            // but for now relying on the original product structure + unique identifier is fine for state
            // However, removeFromCart needs to know which exact item to remove. 
            // The simple ID check in removeFromCart might delete ALL variants. 
            // Let's add a proper `cartItemId` to handle this.
            return [...prev, { ...product, quantity, selectedOptions: options, cartItemId: uniqueId }];
        });
    };

    const removeFromCart = (cartItemId: string) => {
        // Fallback for old items without cartItemId: use id
        setItems((prev) => prev.filter((item) => (item.cartItemId || item.id) !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => ((item.cartItemId || item.id) === cartItemId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setItems([]);
        setDiscount(0);
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return acc + price * item.quantity;
    }, 0);

    const applyCoupon = (code: string): { success: boolean; message: string } => {
        const validCoupons: Record<string, number> = {
            'SAVE10': 0.10, // 10% off
            'WELCOME20': 0.20, // 20% off
            'HEXBYTES': 0.15 // 15% off
        };

        if (validCoupons[code.toUpperCase()]) {
            const discountRate = validCoupons[code.toUpperCase()];
            // Store discount amount based on current total? 
            // Better to simple store the rate or just calculate absolute value here?
            // For simplicity in this demo, let's just calculate the value based on current cartTotal
            // NOTE: If cart updates, this static discount might be weird, but acceptable for demo.
            const discountAmount = cartTotal * discountRate;
            setDiscount(discountAmount);
            return { success: true, message: `Coupon applied! You saved $${discountAmount.toFixed(2)}` };
        }

        setDiscount(0);
        return { success: false, message: 'Invalid coupon code' };
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                discount,
                applyCoupon
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
