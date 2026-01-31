export interface Product {
    id: string; // Used in frontend arrays and routes
    _id?: string; // Matching backend MongoDB field just in case
    name: string;
    price: number;
    oldPrice?: number;
    rating: number;
    image: string;
    category: string;
    badge?: string;
    description?: string;
    expiryDate?: string;
    recommendedAge?: string;
    weight?: string;
    ingredients?: string[];
    animalSpecs?: string;
    availableWeights?: string[];
}

export const ALL_PRODUCTS: Product[] = [
    {
        id: "1",
        _id: "1",
        name: "Nutrition Adult Dry Dog Food Roasted Chicken",
        price: 26.99,
        rating: 4.8,
        image: "/prod_bag.png",
        category: "Dogs",
        badge: "Best Seller",
        description: "FocoPet ensures the highest standards of nutrition for your pets. Our balanced formula is crafted with premium natural ingredients to maintain peak health and vitality.",
        expiryDate: "2027-05-15",
        recommendedAge: "Adult (1-7 years)",
        weight: "1.5 KG",
        ingredients: ["Chicken", "Rice", "Barley", "Corn"],
        animalSpecs: "Optimal for breeds over 10kg. Contains Omega-3.",
        availableWeights: ["1.5 KG", "3 KG", "5 KG"]
    },
    {
        id: "2",
        _id: "2",
        name: "Keytoe Food From The Wild Natural Snack For Pet Rabbits",
        price: 27.00,
        rating: 4.9,
        image: "/prod_bag.png",
        category: "Rabbits",
        badge: "Hot Deal",
        description: "High-fiber foraging snack designed specifically for the digestive needs of pet rabbits.",
        expiryDate: "2026-10-20",
        recommendedAge: "All Ages",
        weight: "500g",
        ingredients: ["Dried Alfalfa", "Carrot bits", "Timothy Hay"],
        animalSpecs: "High fiber for healthy digestion.",
        availableWeights: ["500g", "1 KG"]
    },
    {
        id: "3",
        _id: "3",
        name: "Goldfish Flakes 3.56 Ounces Balanced Diet With Algae",
        price: 25.99,
        oldPrice: 32.99,
        rating: 4.5,
        image: "/prod_can.png",
        category: "Fish",
        badge: "Featured",
        description: "Premium flake food for all goldfish and small pond fish.",
        expiryDate: "2028-01-01",
        recommendedAge: "All Tropical Fish",
        weight: "100g",
        ingredients: ["Fish meal", "Algae", "Vitamin C"],
        animalSpecs: "Will not cloud water when used as directed.",
        availableWeights: ["100g", "250g", "500g"]
    },
    {
        id: "4",
        _id: "4",
        name: "Foco Premium Puppy Growth Mix",
        price: 18.50,
        rating: 4.7,
        image: "/prod_bag.png",
        category: "Dogs",
        description: "Specifically formulated to support the rapid growth and development of puppies.",
        expiryDate: "2027-08-12",
        recommendedAge: "Puppy (0-12 months)",
        weight: "1 KG",
        ingredients: ["Chicken", "Milk protein", "Essential Vitamins"],
        animalSpecs: "Supports brain development with DHA.",
        availableWeights: ["1 KG", "2.5 KG"]
    },
    {
        id: "5",
        _id: "5",
        name: "Foco Catnip Infused Salmon Bites",
        price: 12.99,
        rating: 4.9,
        image: "/prod_can.png",
        category: "Cats",
        badge: "New",
        description: "Grain-free treats infused with organic catnip for a playful and healthy reward.",
        expiryDate: "2026-12-31",
        recommendedAge: "Adult Cats",
        weight: "200g",
        ingredients: ["Salmon", "Catnip", "Brewers Yeast"],
        animalSpecs: "Promotes dental health through chewing action.",
        availableWeights: ["200g", "400g"]
    },
    {
        id: "6",
        _id: "6",
        name: "Colorful Parrot Mix with Tropical Fruits",
        price: 15.75,
        rating: 4.6,
        image: "/prod_bag.png",
        category: "Birds",
        description: "A vibrant blend of seeds, nuts, and tropical fruits to keep your parrot engaged and healthy.",
        expiryDate: "2027-04-10",
        recommendedAge: "All Parrots",
        weight: "800g",
        ingredients: ["Sunflower seeds", "Dried Mango", "Papaya", "Nuts"],
        animalSpecs: "Encourages natural foraging behavior.",
        availableWeights: ["800g", "2 KG"]
    },
    {
        id: "7",
        _id: "7",
        name: "Premium Leather Dog Leash - Midnight Blue",
        price: 34.99,
        rating: 4.9,
        image: "/cat_cat.png", // Fallback for accessories
        category: "Accessories",
        badge: "Premium",
        description: "Handcrafted from genuine full-grain leather, this leash offers durability and a comfortable grip for long walks.",
        ingredients: ["Genuine Leather", "Stainless Steel Hardware"],
        animalSpecs: "Suitable for dogs up to 40kg."
    },
    {
        id: "8",
        _id: "8",
        name: "Ergonomic Ceramic Pet Bowl - Anti-Slip",
        price: 19.50,
        rating: 4.7,
        image: "/cat_bird.png",
        category: "Accessories",
        badge: "Eco-Friendly",
        description: "A heavy-duty ceramic bowl with a weighted bottom to prevent spills and tipping during mealtime.",
        ingredients: ["Hand-glazed Ceramic", "BPA-Free Silicone Base"],
        animalSpecs: "Safe for both cats and small to medium dogs."
    },
    {
        id: "9",
        _id: "9",
        name: "Orthopedic Memory Foam Pet Bed",
        price: 89.00,
        oldPrice: 110.00,
        rating: 5.0,
        image: "/cat_dog.png",
        category: "Accessories",
        badge: "On Sale",
        description: "Give your pet the gift of deep sleep with our high-density memory foam bed. Relieves joint pain and provides superior support.",
        ingredients: ["Memory Foam", "Removable Washable Suede Cover"],
        animalSpecs: "Large size, fits pets up to 35kg."
    },
    {
        id: "10",
        _id: "10",
        name: "Retractable LED Night Walker Leash",
        price: 45.99,
        rating: 4.8,
        image: "/cat_dog.png",
        category: "Accessories",
        badge: "Tech",
        description: "Stay safe during night walks with integrated LED lighting and a high-visibility reflective cord.",
        ingredients: ["Impact-resistant ABS Plastic", "Nylon Cord"],
        animalSpecs: "5-meter range, supports pets up to 25kg."
    },
    {
        id: "11",
        _id: "11",
        name: "Interactive Squirrel Plush - Squeaky Fun",
        price: 14.99,
        rating: 4.8,
        image: "/cat_dog.png",
        category: "Toys",
        badge: "Best Seller",
        description: "A durable plush squirrel with multiple squeakers to keep your dog engaged for hours.",
        ingredients: ["Reinforced Nylon", "Non-toxic Polyester Fill"],
        animalSpecs: "Safe for small to large dogs."
    },
    {
        id: "12",
        _id: "12",
        name: "Eco-Friendly Rubber Chew Bone",
        price: 9.50,
        rating: 4.7,
        image: "/cat_dog.png",
        category: "Toys",
        badge: "Durable",
        description: "Made from 100% natural sustainable rubber, perfect for teething puppies and aggressive chewers.",
        ingredients: ["Natural Sustainable Rubber"],
        animalSpecs: "BPA-free and non-toxic."
    },
    {
        id: "13",
        _id: "13",
        name: "Feather Teaser Wand for Cats",
        price: 7.99,
        rating: 4.9,
        image: "/cat_cat.png",
        category: "Toys",
        badge: "Cat Favorite",
        description: "An interactive wand with real feathers and a bell to stimulate your cat's hunting instincts.",
        ingredients: ["Natural Feathers", "Flexible Plastic Wand"],
        animalSpecs: "Ideal for indoor cats of all ages."
    },
    {
        id: "14",
        _id: "14",
        name: "Multi-Level Cat Scratching Tree",
        price: 125.00,
        oldPrice: 150.00,
        rating: 4.9,
        image: "/cat_cat.png",
        category: "Toys",
        badge: "On Sale",
        description: "A tall, sturdy cat tree with sisal-wrapped scratching posts, cozy hammocks, and hanging toys.",
        ingredients: ["E1 Grade Particle Board", "Natural Sisal", "Plush Fabric"],
        animalSpecs: "Supports multiple cats up to 10kg each."
    },
    {
        id: "15",
        _id: "15",
        name: "Floating Water Toy for Dogs",
        price: 18.25,
        rating: 4.6,
        image: "/cat_dog.png",
        category: "Toys",
        badge: "Waterproof",
        description: "Perfect for pool or beach days, this toy is highly visible and floats effortlessly for fetch fun.",
        ingredients: ["Lightweight EVA Foam", "Reflective Fabric"],
        animalSpecs: "Highly visible in water."
    }
];
