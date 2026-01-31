import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";

export default async function ShopPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    // Simple filter for demo
    const filteredProducts = ALL_PRODUCTS.filter(p =>
        p.category.toLowerCase().includes(decodedCategory.toLowerCase()) ||
        decodedCategory.toLowerCase() === "all"
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs & Header */}
            <section className="bg-gray-50 py-8 md:py-12 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <Link href="/" className="hover:text-brand-blue">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/categories" className="hover:text-brand-blue">Categories</Link>
                        <ChevronRight size={14} />
                        <span className="text-brand-dark">{decodedCategory}</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-brand-dark capitalize">
                                {decodedCategory} <span className="text-brand-blue">Shop</span>
                            </h1>
                            <p className="text-gray-400 mt-2 font-medium">Showing {filteredProducts.length} Premium Products</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-sm font-bold text-brand-dark bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-brand-yellow transition-colors">
                                <SlidersHorizontal size={18} />
                                Sort By: Best Match
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar Filters */}
                        <aside className="lg:w-1/4 space-y-10">
                            <div className="bg-gray-50 rounded-3xl p-8 sticky top-32">
                                <div className="flex items-center gap-2 mb-8">
                                    <Filter size={20} className="text-brand-blue" />
                                    <h3 className="text-xl font-black text-brand-dark">Filters</h3>
                                </div>

                                <div className="space-y-8">
                                    {/* Price Filter */}
                                    <div>
                                        <h4 className="font-bold text-brand-dark mb-4">Price Range</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-brand-blue" />
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-dark transition-colors">Under $25</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-brand-blue" />
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-dark transition-colors">$25 to $50</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-brand-blue" />
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-brand-dark transition-colors">Over $50</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Rating Filter */}
                                    <div>
                                        <h4 className="font-bold text-brand-dark mb-4">Min Rating</h4>
                                        <div className="flex gap-2">
                                            {[4, 3, 2, 1].map(r => (
                                                <button key={r} className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-brand-dark hover:bg-brand-yellow transition-colors shadow-sm">
                                                    {r}+
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold mt-10 hover:bg-brand-blue transition-colors">
                                    Apply Filters
                                </button>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-[40px] p-20 text-center flex flex-col items-center">
                                    <div className="bg-white p-6 rounded-full shadow-inner mb-6 text-4xl">😿</div>
                                    <h3 className="text-2xl font-black text-brand-dark mb-4">No products found</h3>
                                    <p className="text-gray-400 mb-8 max-w-sm">We don't have items in this category yet, but stay tuned! We're stocking up daily.</p>
                                    <Link href="/categories" className="text-brand-blue font-bold hover:underline">Browse all categories</Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
