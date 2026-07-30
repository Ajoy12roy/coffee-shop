"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import CoffeeDetailSheet from "@/components/ui/CoffeeDetailSheet";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Our Menu</span>
          <h2 className="text-white font-bold text-4xl sm:text-5xl mt-2 mb-4">
            Choose Your{" "}
            <span style={{ background: "linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Favourite
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-base">
            From bold espressos to fluffy glazed donuts — crafted fresh every day.
          </p>
        </motion.div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className="relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
              style={
                activeCategory === cat.id
                  ? { background: "linear-gradient(135deg,#FF6B2C,#FF8C55)", color: "white", boxShadow: "0 0 20px rgba(255,107,44,0.4)" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="pill-active"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onViewDetail={setSelectedProduct}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail sheet */}
      <CoffeeDetailSheet product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
