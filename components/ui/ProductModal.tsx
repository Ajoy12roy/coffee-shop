"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const SIZE_OPTIONS = ["Small", "Medium", "Large"];
const EXTRAS = [{ label: "Extra Shot", emoji: "☕" }, { label: "Oat Milk", emoji: "🥛" }, { label: "Vanilla", emoji: "✨" }];

export default function ProductModal({ product, onClose }: Props) {
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Medium");
  const [extras, setExtras] = useState<string[]>([]);

  if (!product) return null;

  const toggleExtra = (e: string) =>
    setExtras((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    onClose();
    setTimeout(() => openCart(), 300);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(180deg,#2D1600 0%,#1A0A00 100%)", border: "1px solid rgba(255,107,44,0.2)", maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Top image */}
            <div
              className="relative h-52 flex items-center justify-center"
              style={{ background: product.bgColor }}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-10"
              >
                <X size={16} />
              </motion.button>

              {product.isPopular && (
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  🔥 Popular
                </div>
              )}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {product.category === "donuts" ? (
                  <span className="text-8xl">🍩</span>
                ) : (
                  <CoffeeCupSVG size={110} color="rgba(255,255,255,0.9)" />
                )}
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-white font-bold text-2xl">{product.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}
                        />
                      ))}
                      <span className="text-white/60 text-xs ml-1">{product.rating}</span>
                    </div>
                    {product.prepTime && (
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <Clock size={10} /> {product.prepTime}
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-bold text-2xl" style={{ color: product.color }}>
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-5">{product.description}</p>

              {/* Size selector */}
              {product.category !== "donuts" && (
                <div className="mb-5">
                  <p className="text-white/70 text-sm font-medium mb-2">Size</p>
                  <div className="flex gap-2">
                    {SIZE_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                        style={
                          size === s
                            ? { background: `linear-gradient(135deg,${product.color},${product.color}99)`, color: "white" }
                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras */}
              {product.category !== "donuts" && (
                <div className="mb-6">
                  <p className="text-white/70 text-sm font-medium mb-2">Extras</p>
                  <div className="flex flex-wrap gap-2">
                    {EXTRAS.map(({ label, emoji }) => (
                      <button
                        key={label}
                        onClick={() => toggleExtra(label)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        style={
                          extras.includes(label)
                            ? { background: `linear-gradient(135deg,${product.color},${product.color}99)`, color: "white" }
                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                        }
                      >
                        {emoji} {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <Minus size={14} className="text-white/70" />
                  </motion.button>
                  <span className="text-white font-bold w-5 text-center">{qty}</span>
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => q + 1)}>
                    <Plus size={14} style={{ color: product.color }} />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${product.color}55` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="flex-1 py-4 rounded-2xl text-white font-bold text-base"
                  style={{ background: `linear-gradient(135deg,${product.color},${product.color}99)` }}
                >
                  Add {qty > 1 ? `×${qty}` : ""} — {formatPrice(product.price * qty)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
