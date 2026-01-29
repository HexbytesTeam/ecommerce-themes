export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    image: string;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "perfect-frosting",
        title: "The Art of the Perfect Frosting",
        excerpt: "Discover the secrets behind our signature buttercream and how to achieve that silky, melt-in-your-mouth texture at home.",
        category: "Technique",
        date: "May 12, 2025",
        author: "Chef Marcel",
        image: "/assets/blog_frosting.png",
        content: `
      <p>Creating the perfect frosting is an art form that requires patience, precision, and the highest quality ingredients. At HexBytes, we believe that the frosting is more than just a topping—it's the soul of the cake.</p>
      
      <h3>The Secret is in the Temperature</h3>
      <p>One of the most common mistakes in buttercream creation is using butter that is too cold or too warm. Your butter should be at a perfect room temperature—pliable enough to hold a thumbprint but still cool to the touch.</p>
      
      <h3>Aeration is Key</h3>
      <p>We whip our butter for no less than 8 minutes before adding any sugar. This creates a pale, fluffy base that carries the flavor of the vanilla beans far more effectively than a dense, under-whipped mix.</p>
      
      <p>In this guide, we'll walk you through our triple-whipped technique that ensures your home bakes look and taste professional every single time.</p>
    `
    },
    {
        slug: "organic-philosophy",
        title: "Sourcing for Flavor: Our Organic Philosophy",
        excerpt: "Why we choose small-scale farmers and the impact of pure vanilla beans on the final Byte of your cake.",
        category: "Ingredients",
        date: "May 10, 2025",
        author: "Elena Rossi",
        image: "/assets/blog_ingredients.png",
        content: `
      <p>At HexBytes, our commitment to flavor begins long before we turn on the ovens. It starts in the soil of our partner farms.</p>
      
      <h3>Why Organic Matters</h3>
      <p>Organic ingredients haven't just been grown without pesticides; they've been allowed to develop their natural flavor profiles fully. When you taste a HexBytes cake, you're tasting berries that were picked at their peak ripeness and flour that hasn't been bleached of its nutritional value.</p>
      
      <h3>The Vanilla Quest</h3>
      <p>We use Grade A Madagascar Bourbon vanilla beans. Each bean is hand-scraped in our kitchen. One might think vanilla is a basic flavor, but when sourced properly, it contains over 250 organic flavor components that create a complex, floral foundation for our desserts.</p>
      
      <p>By supporting small-scale farmers, we ensure a sustainable supply chain that prioritizes quality over quantity.</p>
    `
    },
    {
        slug: "summer-berry-tarts",
        title: "Seasonal Spotlight: Summer Berry Tarts",
        excerpt: "Explaining the science of crust and the vibrancy of local summer berries in our new limited-edition pastries.",
        category: "Seasonal",
        date: "May 08, 2025",
        author: "Chef Marcel",
        image: "/assets/blog_tart.png",
        content: `
      <p>Nothing says summer like the first harvest of local berries. Our latest limited-edition tart is a celebration of this vibrant season.</p>
      
      <h3>The Perfect Shortcrust</h3>
      <p>The base of a great tart is a crust that is both crisp and buttery. We use a 'sablé' technique, which results in a sandy texture that melts away, providing the perfect contrast to the velvet smooth pastry cream found inside.</p>
      
      <h3>Glazed to Perfection</h3>
      <p>We lightly glaze our berries with a reduction made from their own juices, rather than a heavy sugar syrup. This keeps the tartness of the raspberries and the sweetness of the strawberries in perfect balance.</p>
      
      <p>Available only while the berries stay sweet, these tarts are a fleeting taste of July's best offerings.</p>
    `
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
