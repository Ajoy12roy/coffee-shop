"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function CoffeeHeroCarousel({ products, onSelect }: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % products.length);
    }, 3200);
    return () => clearInterval(t);
  }, [products.length]);

  const product = products[active];
  if (!product) return null;

  const go = (dir: number) => {
    setDirection(dir);
    setActive((p) => (p + dir + products.length) % products.length);
  };

  return (
    <div className="relative h-[340px] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Ambient blob background, colored per product */}
      <motion.div
        key={`bg-${product.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 -z-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 30%, ${product.color}40 0%, transparent 72%)`,
        }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.button
          key={product.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 90, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction * -90, scale: 0.85 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect(product)}
          className="relative z-10 flex flex-col items-center cursor-pointer group"
          aria-label={`View ${product.name}`}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <CoffeeCupSVG size={150} color="rgba(255,255,255,0.95)" />
          </motion.div>
          <h3 className="text-white font-bold text-2xl mt-3">{product.name}</h3>
          <span className="font-bold text-lg mt-1" style={{ color: product.color }}>
            {formatPrice(product.price)}
          </span>
        </motion.button>
      </AnimatePresence>

      {/* Peek of neighbouring cups for the "queue" feel */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-25 blur-[1px] pointer-events-none">
        <CoffeeCupSVG size={70} color="rgba(255,255,255,0.6)" />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-25 blur-[1px] pointer-events-none">
        <CoffeeCupSVG size={70} color="rgba(255,255,255,0.6)" />
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 flex gap-2 z-10">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i > active ? 1 : -1)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              background: i === active ? product.color : "rgba(255,255,255,0.25)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
