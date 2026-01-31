export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: "Health" | "Nutrition" | "Training" | "Accessories";
    date: string;
    author: string;
    readTime: string;
}

export const ALL_BLOGS: BlogPost[] = [
    {
        id: "1",
        title: "Top 10 Must-Have Accessories For New Pet Owners",
        excerpt: "Welcoming A New Pet Into Your Home? Check Out Our List Of Top 10 Must-Have Accessories, Including Cozy Beds...",
        content: "Full content about accessories...",
        image: "/prod_can.png",
        category: "Accessories",
        date: "Oct 24, 2024",
        author: "Sarah Johnson",
        readTime: "5 min read"
    },
    {
        id: "2",
        title: "Building A Strong Foundation For Good Behavior",
        excerpt: "Training Your Puppy Early Sets The Stage For A Well-Behaved Adult Dog. Learn Essential Training Techniques...",
        content: "Full content about training...",
        image: "/cat_dog.png",
        category: "Training",
        date: "Oct 20, 2024",
        author: "Mark Davis",
        readTime: "8 min read"
    },
    {
        id: "3",
        title: "Maintaining Optimal Health For Your Exotic Pets",
        excerpt: "Exotic Pets Require Specialized Care To Thrive. Whether You Have A Reptile, Bird, Or Small Mammal, This Blog Offers...",
        content: "Full content about health...",
        image: "/cat_dog.png",
        category: "Health",
        date: "Oct 15, 2024",
        author: "Dr. Emily Chen",
        readTime: "6 min read"
    },
    {
        id: "4",
        title: "Choosing The Right Pet Food For Every Life Stage",
        excerpt: "Discover the essential factors to consider when selecting the perfect diet for your pets from puppyhood to senior years.",
        content: "Full content about nutrition...",
        image: "/prod_bag.png",
        category: "Nutrition",
        date: "Oct 10, 2024",
        author: "James Wilson",
        readTime: "7 min read"
    },
    {
        id: "5",
        title: "Sustainable Pet Care: Tips for Eco-Friendly Owners",
        excerpt: "Learn how you can reduce your pet's carbon pawprint with sustainable food, toys, and grooming practices.",
        content: "Full content about eco-friendly pet care...",
        image: "/cat_dog.png",
        category: "Accessories",
        date: "Oct 05, 2024",
        author: "Lucy Green",
        readTime: "4 min read"
    },
    {
        id: "6",
        title: "Understanding Pet Body Language",
        excerpt: "Is your dog wagging its tail out of happiness or nervousness? Decode the subtle signals your pets are giving you.",
        content: "Full content about body language...",
        image: "/focopet_hero_pets.png",
        category: "Training",
        date: "Sep 28, 2024",
        author: "Chris Paws",
        readTime: "10 min read"
    }
];
