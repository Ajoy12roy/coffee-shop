"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { Product } from "@/types";
import PremiumMenuCarousel3D from "@/components/ui/PremiumMenuCarousel3D";
import SpecialCard from "@/components/ui/SpecialCard";
import CoffeeDetailSheet from "@/components/ui/CoffeeDetailSheet";
import AmbientCoffeeParticles from "@/components/ui/AmbientCoffeeParticles";

const DRINKS = PRODUCTS.filter((p) => p.category === "drinks");

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Full-screen 3D coffee showcase */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-12">
        <AmbientCoffeeParticles />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,107,44,0.12) 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Our Menu</span>
          <h1 className="text-white font-bold text-4xl mt-1">Pick Your Cup</h1>
        </motion.div>

        <PremiumMenuCarousel3D products={DRINKS} onSelect={setSelected} cycleDuration={3800} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-xs">Scroll for full menu</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* Category tabs + grid — revealed as the user scrolls into view */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 pb-24 pt-8"
      >
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
            </motion.button>
          ))}
        </div>

        {/* Grid — fades/slides between categories, 3 columns on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <SpecialCard key={product.id} product={product} index={i} onSelect={setSelected} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Detail sheet — cup docks small at top, card rises from bottom */}
      <CoffeeDetailSheet product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
