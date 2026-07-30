"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import NamedCoffeeCupSVG from "./NamedCoffeeCupSVG";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  interval?: number;
}

export default function PremiumMenuCarousel3D({ products, onSelect, interval = 4000 }: Props) {
  const [active, setActive] = useState(0);
  const n = products.length;

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  // Auto-rotate — restarts its window on every manual interaction too, since `active` is a dependency
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [n, interval, active, next]);

  if (n === 0) return null;

  const offsetOf = (i: number) => {
    let diff = i - active;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  const active_product = products[active];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D stage — cups dominate the hero area */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 440, perspective: 1200 }}
      >
        {/* Glass nav arrows */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={prev}
          aria-label="Previous coffee"
          className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={next}
          aria-label="Next coffee"
          className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
        >
          <ChevronRight size={20} />
        </motion.button>

        {products.map((p, i) => {
          const offset = offsetOf(i);
          if (Math.abs(offset) > 2) return null;

          const isCenter = offset === 0;
          const style =
            offset === 0
              ? { x: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 5, filter: "brightness(1)" }
              : Math.abs(offset) === 1
              ? { x: offset * 280, scale: 0.62, opacity: 0.4, rotateY: offset * -34, zIndex: 3, filter: "brightness(0.55) blur(0.5px)" }
              : { x: offset * 420, scale: 0.4, opacity: 0, rotateY: offset * -42, zIndex: 1, filter: "brightness(0.35)" };

          return (
            <motion.button
              key={p.id}
              onClick={() => (isCenter ? onSelect(p) : setActive(i))}
              animate={style}
              initial={false}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
              aria-label={isCenter ? `View ${p.name}` : `Show ${p.name}`}
              tabIndex={isCenter ? 0 : -1}
            >
              {isCenter && (
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.75, 0.4] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${p.color}55 0%, transparent 70%)`,
                    filter: "blur(36px)",
                    transform: "scale(2.2)",
                  }}
                />
              )}
              <motion.div
                animate={isCenter ? { y: [0, -12, 0] } : {}}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <NamedCoffeeCupSVG productId={p.id} name={p.name} color={p.color} size={isCenter ? 280 : 190} />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Active coffee info — glassmorphism card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active_product.id}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-md mx-4 px-6 py-5 rounded-[1.75rem] -mt-2"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            boxShadow: `0 20px 50px ${active_product.color}22`,
          }}
        >
          <h2 className="text-white font-bold text-2xl mb-1">{active_product.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${active_product.color}22`, color: active_product.color }}
            >
              {active_product.roastType || "Signature Coffee"}
            </span>
            {active_product.roastLevel && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white/70" style={{ background: "rgba(255,255,255,0.08)" }}>
                {active_product.roastLevel}
              </span>
            )}
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-4">{active_product.description}</p>

          {active_product.flavorNotes && (
            <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
              {active_product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] font-medium px-3 py-1 rounded-full text-white/80"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {note}
                </span>
              ))}
            </div>
          )}

          <p className="text-white/40 text-xs">
            {active_product.prepTime} · <span style={{ color: active_product.color }} className="font-bold">{formatPrice(active_product.price)}</span>
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots — also clickable for direct navigation */}
      <div className="flex gap-1.5 mt-5">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            aria-label={`Go to ${p.name}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 18 : 6,
              background: i === active ? active_product.color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
