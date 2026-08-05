"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Droplet, Candy, Sparkles } from "lucide-react";
import { Product } from "@/types";
import CurvedLabel from "./CurvedLabel";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  cycleDuration?: number; // full enter -> hold -> exit cycle, ms
}

const CUP_IMAGE = "/images/coffee/carousel-cup.png";

// Orbit info bubbles — angled around the cup, each a short info chip
const ORBIT_SLOTS = [
  { angle: -55, icon: Flame, key: "roastLevel" as const, fallback: "Signature Roast" },
  { angle: 55, icon: Sparkles, key: "flavorNotes" as const, fallback: null },
  { angle: -135, icon: Droplet, key: "milkLevel" as const, fallback: "No Milk" },
  { angle: 135, icon: Candy, key: "sweetness" as const, fallback: "Balanced" },
];

export default function PremiumMenuCarousel3D({ products, onSelect, cycleDuration = 3800 }: Props) {
  const [active, setActive] = useState(0);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const n = products.length;
  const product = products[active];

  const goTo = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Drive the full enter -> hold(+orbit) -> exit cycle, then advance to the next cup.
  useEffect(() => {
    if (n < 2) return;
    setOrbitOpen(false);
    const tOrbitIn = setTimeout(() => setOrbitOpen(true), cycleDuration * 0.24);
    const tOrbitOut = setTimeout(() => setOrbitOpen(false), cycleDuration * 0.74);
    const tAdvance = setTimeout(next, cycleDuration);
    return () => {
      clearTimeout(tOrbitIn);
      clearTimeout(tOrbitOut);
      clearTimeout(tAdvance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n, cycleDuration]);

  if (!product) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 460, perspective: 1300 }}
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

        {/* Ambient glow behind the cup, pulses while settled */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 260,
            height: 260,
            background: `radial-gradient(circle, ${product.color}55 0%, transparent 70%)`,
            filter: "blur(36px)",
          }}
        />

        {/* The single cup — enters from the right rotating, holds center, exits left rotating.
            x + rotateY animate together the whole time, so rotation always happens DURING movement. */}
        <motion.div
          key={active}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: [260, 0, 0, -260],
            rotateY: [48, 0, 0, -48],
            scale: [0.55, 1, 1, 0.55],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: cycleDuration / 1000, times: [0, 0.24, 0.76, 1], ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.button
            onClick={() => onSelect(product)}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative block"
            aria-label={`View ${product.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CUP_IMAGE}
              alt={product.name}
              style={{ width: 260, height: "auto", filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.5))" }}
            />
            {/* Printed name — curved, near the lid where the surface is clean */}
            <div className="absolute top-[19%] left-1/2 -translate-x-1/2">
              <CurvedLabel id={`carousel-${product.id}`} text={product.name} width={130} />
            </div>
          </motion.button>

          {/* Orbit info bubbles — emerge from the cup, hold, retract back in */}
          <AnimatePresence>
            {orbitOpen &&
              ORBIT_SLOTS.map((slot) => {
                const Icon = slot.icon;
                const raw = slot.key === "flavorNotes" ? product.flavorNotes?.[0] : product[slot.key];
                const label = (raw as string) || slot.fallback || "—";
                const rad = (slot.angle * Math.PI) / 180;
                const radius = 128;
                const tx = Math.cos(rad) * radius;
                const ty = Math.sin(rad) * radius * 0.7;

                return (
                  <motion.div
                    key={slot.key}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: tx, y: ty, scale: 1, opacity: 1 }}
                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 16, stiffness: 190, delay: Math.abs(slot.angle) / 900 }}
                    className="absolute top-1/2 left-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: "rgba(20,10,5,0.65)",
                      border: `1px solid ${product.color}55`,
                      backdropFilter: "blur(10px)",
                      marginLeft: -1,
                      marginTop: -1,
                    }}
                  >
                    <Icon size={12} style={{ color: product.color }} />
                    <span className="text-white/85 text-[11px] font-medium">{label}</span>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.name}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 18 : 6,
              background: i === active ? product.color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
