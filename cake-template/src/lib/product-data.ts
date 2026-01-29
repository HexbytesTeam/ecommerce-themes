export interface Product {
    id: string;
    slug: string;
    name: string;
    price: string;
    description: string;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    isPreOrder?: boolean;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        slug: "chocolate-heaven-cupcake",
        name: "Chocolate Heaven",
        price: "$5.00",
        description: "A rich, moist chocolate cupcake topped with our signature silky chocolate buttercream and a drizzle of dark chocolate ganache. A dream for every chocolate lover.",
        image: "/assets/cupcake.png",
        category: "Cupcakes",
        rating: 4.8,
        reviews: 124,
        isBestSeller: true,
        isFeatured: true
    },
    {
        id: "2",
        slug: "strawberry-bliss-donut",
        name: "Strawberry Bliss",
        price: "$3.50",
        description: "Freshly baked donut glazed with real strawberry puree icing and topped with freeze-dried strawberry pieces. Sweet, tangy, and dangerously delicious.",
        image: "/assets/donut.png",
        category: "Donuts",
        rating: 4.9,
        reviews: 86,
        isNew: true
    },
    {
        id: "3",
        slug: "vanilla-dream-cake",
        name: "Vanilla Dream",
        price: "$25.00",
        description: "Three layers of light-as-air vanilla sponge, filled with strawberry conserve and vanilla bean buttercream. The perfect celebration cake.",
        image: "/assets/cake.png",
        category: "Cakes",
        rating: 4.7,
        reviews: 53,
        isPreOrder: true,
        isFeatured: true
    },
    {
        id: "4",
        slug: "red-velvet-luxury",
        name: "Red Velvet Luxury",
        price: "$6.00",
        description: "Classic southern red velvet sponge with a hint of cocoa, topped with a generous swirl of tangy cream cheese frosting.",
        image: "/assets/cupcake.png",
        category: "Cupcakes",
        rating: 4.9,
        reviews: 210,
        isBestSeller: true
    },
    {
        id: "5",
        slug: "salted-caramel-delight",
        name: "Salted Caramel Delight",
        price: "$4.00",
        description: "A fluffy yeast donut filled with salted caramel pastry cream and dipped in a caramel glaze with a pinch of sea salt.",
        image: "/assets/donut.png",
        category: "Donuts",
        rating: 4.6,
        reviews: 94,
        isNew: true
    },
    {
        id: "6",
        slug: "berry-chantilly",
        name: "Berry Chantilly",
        price: "$28.00",
        description: "An elegant white cake filled with fresh berries and mascarpone whipped cream, frosted with a light chantilly cream.",
        image: "/assets/cake.png",
        category: "Cakes",
        rating: 5.0,
        reviews: 42,
        isPreOrder: true,
        isFeatured: true,
        isNew: true
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}
