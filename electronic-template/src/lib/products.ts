export interface Product {
    id: number | string;
    name: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    image: string;
    description?: string;
    points?: number;
    reviews?: number;
    mrp?: number;
}

export const CATEGORIES = ["All", "Laptops", "Headphones", "Drones", "Cameras", "Speakers", "Tablets", "Gadgets", "Watches", "Mobiles"];
export const BRANDS = ["All", "Apple", "Sony", "DJI", "Canon", "Sonos", "Meta", "Samsung", "ASUS", "Bose", "Keychron"];

export const ALL_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "MacBook Pro M2 Air",
        category: "Laptops",
        brand: "Apple",
        price: 999.00,
        mrp: 1099.00,
        rating: 5,
        reviews: 42,
        points: 150,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
        description: "Supercharged by M2, the MacBook Pro M2 Air features a liquid retina display, long-lasting battery life, and a sleek, fanless design for silent performance."
    },
    {
        id: 2,
        name: "Sony WH-1000XM5",
        category: "Headphones",
        brand: "Sony",
        price: 349.00,
        mrp: 399.00,
        rating: 5,
        reviews: 128,
        points: 50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        description: "Industry-leading noise cancellation and world-class sound quality. The WH-1000XM5 sets the standard for premium wireless audio."
    },
    {
        id: 3,
        name: "DJI Mavic Air 2S",
        category: "Drones",
        brand: "DJI",
        price: 899.00,
        mrp: 999.00,
        rating: 4,
        reviews: 35,
        points: 120,
        image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=800&auto=format&fit=crop",
        description: "Equipped with a 1-inch sensor, 5.4K video, and MasterShots. The Air 2S is the ultimate compact drone for creators."
    },
    {
        id: 4,
        name: "Canon EOS R5",
        category: "Cameras",
        brand: "Canon",
        price: 3299.00,
        mrp: 3599.00,
        rating: 5,
        reviews: 21,
        points: 500,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        description: "Precision, power, and performance. The EOS R5 delivers 8K video and 45MP stills, perfect for professional photographers."
    },
    {
        id: 5,
        name: "Sonos Era 300",
        category: "Speakers",
        brand: "Sonos",
        price: 449.00,
        mrp: 499.00,
        rating: 5,
        reviews: 64,
        points: 75,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
        description: "Feel sound all around. With spatial audio for Dolby Atmos, the Era 300 creates an immersive listening experience."
    },
    {
        id: 6,
        name: "iPad Pro 12.9 Inch",
        category: "Tablets",
        brand: "Apple",
        price: 1099.00,
        mrp: 1199.00,
        rating: 5,
        reviews: 88,
        points: 180,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
        description: "The ultimate iPad experience. Powered by M2, featuring a Liquid Retina XDR display and lightning-fast connectivity."
    },
    {
        id: 7,
        name: "Meta Quest 3 VR",
        category: "Gadgets",
        brand: "Meta",
        price: 499.00,
        mrp: 549.00,
        rating: 4,
        reviews: 52,
        points: 80,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop",
        description: "Dive into a new world. The Quest 3 offers breakthrough mixed reality and powerful performance for gaming and more."
    },
    {
        id: 8,
        name: "Apple Watch Ultra",
        category: "Watches",
        brand: "Apple",
        price: 799.00,
        mrp: 849.00,
        rating: 5,
        reviews: 45,
        points: 120,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
        description: "Built for endurance, exploration, and adventure. Apple Watch Ultra features a rugged design and up to 36 hours of battery life."
    },
    {
        id: 9,
        name: "Samsung Galaxy S24 Ultra",
        category: "Mobiles",
        brand: "Samsung",
        price: 1299.00,
        mrp: 1399.00,
        rating: 5,
        reviews: 112,
        points: 200,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
        description: "Epic. Just like that. The S24 Ultra features AI-powered camera features, a stunning display, and unmatched performance."
    },
    {
        id: 10,
        name: "ASUS ROG Zephyrus G14",
        category: "Laptops",
        brand: "ASUS",
        price: 1599.00,
        mrp: 1799.00,
        rating: 4,
        reviews: 38,
        points: 250,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
        description: "Powerful, portable, and personal. The G14 is the ultimate gaming laptop for those on the move."
    },
    {
        id: 11,
        name: "Bose QuietComfort Ultra",
        category: "Headphones",
        brand: "Bose",
        price: 429.00,
        mrp: 479.00,
        rating: 5,
        reviews: 56,
        points: 65,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
        description: "Step into another world with Bose. Featuring spatial audio and unmatched noise cancellation for pure listening pleasure."
    },
    {
        id: 12,
        name: "Keychron K2 V2 Wireless",
        category: "Gadgets",
        brand: "Keychron",
        price: 89.00,
        mrp: 99.00,
        rating: 4,
        reviews: 120,
        points: 15,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
        description: "The perfect tactical keyboard. Features a 75% layout, wireless connectivity, and premium mechanical switches."
    },
    {
        id: "iphone-17-pro",
        name: "Apple iPhone 17 Pro",
        category: "Mobiles",
        brand: "Apple",
        price: 82900,
        mrp: 89900,
        rating: 5,
        reviews: 26,
        points: 622,
        image: "https://m.media-amazon.com/images/I/71v2jvh6nML._AC_SL1500_.jpg",
        description: "The next evolution of mobile technology. Featuring the A19 Bionic chip, an advanced triple-lens camera system, and a breathtaking ProMotion display."
    },
];
