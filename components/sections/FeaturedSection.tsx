"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "@/components/ui/CoffeeCupSVG";
import gsap from "gsap";

const FEATURED = PRODUCTS.filter((p) => p.isPopular);

export default function FeaturedSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const { addItem, openCart } = useCart();
  const bgRef = useRef<HTMLDivElement>(null);

  const product = FEATURED[active];

  const go = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + FEATURED.length) % FEATURED.length);
  };

  // GSAP background color transition
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        background: product.bgColor,
        duration: 0.7,
        ease: "power2.inOut",
      });
    }
  }, [active, product.bgColor]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Staff Picks</span>
          <h2 className="text-white font-bold text-4xl sm:text-5xl mt-2">
            Today&apos;s{" "}
            <span style={{ background: "linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Special
            </span>
          </h2>
        </motion.div>

        <div className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col lg:flex-row items-center">
          {/* Animated BG */}
          <div ref={bgRef} className="absolute inset-0 transition-all duration-700" style={{ background: product.bgColor }} />
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
          />

          {/* Left: Info */}
          <div className="relative z-10 flex-1 p-8 lg:p-14 flex flex-col justify-center">
            {/* Dots */}
            <div className="flex gap-2 mb-6">
              {FEATURED.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 24 : 8, background: i === active ? "white" : "rgba(255,255,255,0.4)" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                  <span className="text-white text-xs font-semibold">⭐ {product.rating} · {product.prepTime}</span>
                </div>
                <h3 className="text-white font-bold text-5xl sm:text-6xl mb-3 drop-shadow-lg">{product.name}</h3>
                <p className="text-white/80 text-base leading-relaxed mb-6 max-w-sm">{product.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-3xl">{formatPrice(product.price)}</span>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { addItem(product); openCart(); }}
                    className="bg-white text-[#1A0A00] font-bold px-8 py-3 rounded-full text-base shadow-xl hover:bg-white/90 transition-colors"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div className="flex gap-3 mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => go(-1)}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => go(1)}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Right: Cup visual */}
          <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80, rotate: direction * 10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: direction * -60, rotate: direction * -8 }}
                transition={{ duration: 0.5, type: "spring", damping: 20 }}
              >
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <CoffeeCupSVG size={220} color="rgba(255,255,255,0.95)" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
