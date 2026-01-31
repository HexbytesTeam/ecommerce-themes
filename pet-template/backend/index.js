const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/focopet';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Models
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    rating: { type: Number, default: 4.5 },
    image: String,
    category: { type: String, required: true },
    badge: String,
    description: String,
    isBestSeller: { type: Boolean, default: false },
    // New Specifications
    expiryDate: String,
    recommendedAge: String,
    weight: String,
    ingredients: [String],
    animalSpecs: String
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const { category, bestSeller } = req.query;
        let query = {};
        if (category) query.category = category;
        if (bestSeller === 'true') query.isBestSeller = true;

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Single product route
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Initial Data (Temporary for development)
app.post('/api/seed', async (req, res) => {
    try {
        await Category.deleteMany({});
        await Product.deleteMany({});

        await Category.insertMany([
            { name: "Dogs", image: "/cat_dog.png" },
            { name: "Cats", image: "/cat_cat.png" },
            { name: "Birds", image: "/cat_bird.png" },
            { name: "Fish", image: "/cat_bird.png" },
            { name: "Rabbits", image: "/cat_cat.png" }
        ]);

        await Product.insertMany([
            {
                name: "Nutrition Adult Dry Dog Food Roasted Chicken",
                price: 26.99,
                rating: 4.8,
                image: "/prod_bag.png",
                category: "Dogs",
                isBestSeller: true,
                expiryDate: "2027-05-15",
                recommendedAge: "Adult (1-7 years)",
                weight: "1.5 KG",
                ingredients: ["Chicken", "Rice", "Barley", "Corn"],
                animalSpecs: "Optimal for breeds over 10kg. Contains Omega-3."
            },
            {
                name: "Keytoe Food From The Wild Natural Snack For Pet Rabbits",
                price: 27.00,
                rating: 4.9,
                image: "/prod_bag.png",
                category: "Rabbits",
                badge: "Hot Deal",
                isBestSeller: true,
                expiryDate: "2026-10-20",
                recommendedAge: "All Ages",
                weight: "500g",
                ingredients: ["Dried Alfalfa", "Carrot bits", "Timothy Hay"],
                animalSpecs: "High fiber for healthy digestion."
            },
            {
                name: "Goldfish Flakes 3.56 Ounces Balanced Diet With Algae",
                price: 25.99,
                oldPrice: 32.99,
                rating: 4.5,
                image: "/prod_can.png",
                category: "Fish",
                isBestSeller: true,
                expiryDate: "2028-01-01",
                recommendedAge: "All Tropical Fish",
                weight: "100g",
                ingredients: ["Fish meal", "Algae", "Vitamin C"],
                animalSpecs: "Will not cloud water when used as directed."
            },
            {
                name: "Foco Premium Puppy Growth Mix",
                price: 18.50,
                rating: 4.7,
                image: "/prod_bag.png",
                category: "Dogs",
                expiryDate: "2027-08-12",
                recommendedAge: "Puppy (0-12 months)",
                weight: "1 KG",
                ingredients: ["Chicken", "Milk protein", "Vitamins"],
                animalSpecs: "Supports brain development with DHA."
            },
            {
                name: "Foco Catnip Infused Salmon Bites",
                price: 12.99,
                rating: 4.9,
                image: "/prod_can.png",
                category: "Cats",
                badge: "New",
                expiryDate: "2026-12-31",
                recommendedAge: "Adult Cats",
                weight: "200g",
                ingredients: ["Salmon", "Catnip", "Brewers Yeast"],
                animalSpecs: "Grain-free reward snack."
            }
        ]);

        res.json({ message: "Seeded successfully with detailed specifications" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
