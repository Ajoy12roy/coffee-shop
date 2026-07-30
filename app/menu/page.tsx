"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { Product } from "@/types";
import CoffeeHeroCarousel from "@/components/ui/CoffeeHeroCarousel";
import CoffeeListRow from "@/components/ui/CoffeeListRow";
import CoffeeDetailSheet from "@/components/ui/CoffeeDetailSheet";

const DRINKS = PRODUCTS.filter((p) => p.category === "drinks");

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Our Menu</span>
          <h1 className="text-white font-bold text-3xl mt-1">Pick Your Cup</h1>
        </motion.div>

        {/* Rotating cup showcase — one after another, smooth in/out */}
        <CoffeeHeroCarousel products={DRINKS} onSelect={setSelected} />

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-3 my-6 flex-wrap">
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
            </motion.button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.map((product, i) => (
            <CoffeeListRow key={product.id} product={product} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Detail sheet — cup docks small at top, card rises from bottom */}
      <CoffeeDetailSheet product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
