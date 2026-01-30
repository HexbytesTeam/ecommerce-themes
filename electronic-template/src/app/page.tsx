"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Brands, BlogSection } from "@/components/home/BlogSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Categories />

      {/* New Products Section */}
      <section className="py-20 bg-[#fdfdfd]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-2 h-10 bg-primary rounded-full"></div>
              <h2 className="text-4xl font-display font-black text-secondary tracking-tight">NEW PRODUCTS</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-xs font-black text-primary bg-primary/10 rounded-full tracking-wider hover:bg-primary hover:text-white transition-all">ALL</button>
              <button className="px-6 py-2.5 text-xs font-bold text-muted-foreground hover:text-secondary transition-colors tracking-wider uppercase">Laptops</button>
              <button className="px-6 py-2.5 text-xs font-bold text-muted-foreground hover:text-secondary transition-colors tracking-wider uppercase">Headphones</button>
              <button className="px-6 py-2.5 text-xs font-bold text-muted-foreground hover:text-secondary transition-colors tracking-wider uppercase">Gadgets</button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: "MacBook Pro M2 Air", category: "LAPTOPS", price: "999.00", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop" },
              { id: 2, name: "Sony WH-1000XM5", category: "HEADPHONES", price: "349.00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop" },
              { id: 3, name: "DJI Mavic Air 2S", category: "DRONES", price: "899.00", image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=400&auto=format&fit=crop" },
              { id: 4, name: "Canon EOS R5", category: "CAMERAS", price: "3299.00", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop" },
              { id: 5, name: "Sonos Era 300", category: "SPEAKERS", price: "449.00", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=400&auto=format&fit=crop" },
              { id: 6, name: "iPad Pro 12.9 Inch", category: "TABLETS", price: "1099.00", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop" },
              { id: 7, name: "Meta Quest 3 VR", category: "VR GADGETS", price: "499.00", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400&auto=format&fit=crop" },
              { id: 8, name: "Apple Watch Ultra", category: "WATCHES", price: "799.00", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&auto=format&fit=crop" },
            ].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-border group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 relative"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square bg-[#f8f8f8] rounded-[2rem] overflow-hidden mb-8 flex items-center justify-center">
                    <div className="absolute top-5 left-5 bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg z-10">New</div>
                    <div className="relative w-44 h-44 group-hover:scale-110 transition-transform duration-1000 ease-out">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 pb-16">
                    <p className="text-[10px] text-primary font-black tracking-[0.3em] leading-none uppercase">{product.category}</p>
                    <h3 className="text-lg font-black text-secondary group-hover:text-primary transition-colors line-clamp-1 tracking-tight">{product.name}</h3>
                    <div className="flex items-center justify-between pt-4">
                      <p className="text-2xl font-display font-black text-secondary">${product.price}</p>
                    </div>
                  </div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-7 right-7 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 group/btn"
                >
                  <span className="text-3xl font-light">+</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PromoBanners />
      <Brands />
      <BlogSection />
    </main>
  );
}
