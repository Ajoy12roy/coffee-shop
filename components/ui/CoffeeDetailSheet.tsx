"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, Coffee, Droplet, Minus, Plus, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { addOrderRecord } from "@/lib/profileStore";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const sheetContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const riseUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CoffeeDetailSheet({ product, onClose }: Props) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const handleCustomize = () => {
    if (!product) return;
    onClose();
    router.push(`/order/${product.id}`);
  };

  const handleCheckout = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addItem(product);
    addOrderRecord({
      productName: product.name,
      productColor: product.color,
      quantity: qty,
      total: product.price * qty,
    });
    onClose();
    setTimeout(() => openCart(), 300);
  };

  return (
    <AnimatePresence
      onExitComplete={() => setQty(1)}
    >
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Frame */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="relative w-full max-w-md h-full sm:h-[92vh] sm:max-h-[820px] rounded-[2rem] overflow-hidden pointer-events-auto flex flex-col"
              style={{ background: "#0d0500", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Close */}
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                aria-label="Close"
              >
                <X size={16} />
              </motion.button>

              {/* Cup dock — animates in small & settled near the top */}
              <div
                className="relative flex-shrink-0 flex items-end justify-center pt-10 pb-4"
                style={{
                  height: "34%",
                  background: `radial-gradient(ellipse 70% 90% at 50% 100%, ${product.color}55 0%, transparent 70%)`,
                }}
              >
                <motion.div
                  key={product.id}
                  initial={{ scale: 1.5, y: 46, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 16, stiffness: 140, delay: 0.05 }}
                >
                  <CoffeeCupSVG size={128} color="rgba(255,255,255,0.95)" />
                </motion.div>
              </div>

              {/* Sheet */}
              <motion.div
                key={`sheet-${product.id}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 240, delay: 0.1 }}
                className="relative flex-1 rounded-t-[2rem] flex flex-col overflow-hidden"
                style={{ background: product.bgColor, boxShadow: "0 -20px 50px rgba(0,0,0,0.4)" }}
              >
                <motion.div
                  variants={sheetContainer}
                  initial="hidden"
                  animate="show"
                  className="flex-1 overflow-y-auto px-6 pt-6 pb-4"
                >
                  {/* Header row: name/rating + qty stepper */}
                  <motion.div variants={riseUp} className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-white font-bold text-2xl leading-tight mb-1">{product.name}</h2>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.round(product.rating) ? "fill-white text-white" : "text-white/30"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-black/25 backdrop-blur-sm rounded-full px-1.5 py-1.5">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white"
                      >
                        <Minus size={12} />
                      </motion.button>
                      <span className="text-white font-bold text-sm w-4 text-center">{qty}</span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setQty((q) => q + 1)}
                        className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white"
                      >
                        <Plus size={12} />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Meta chips */}
                  <motion.div variants={riseUp} className="flex items-center gap-3 mb-5">
                    {[
                      { icon: Coffee, label: product.name.split(" ")[0] },
                      { icon: Clock, label: product.prepTime || "Fresh" },
                      { icon: Droplet, label: "Plain" },
                    ].map(({ icon: Icon, label }, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <div className="w-11 h-11 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={17} className="text-white/85" />
                        </div>
                        <span className="text-white/70 text-[10px] font-medium">{label}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Description */}
                  <motion.p variants={riseUp} className="text-white/85 text-sm leading-relaxed">
                    {product.description}
                  </motion.p>

                  {product.category === "drinks" && (
                    <motion.button
                      variants={riseUp}
                      whileHover={{ x: 3 }}
                      onClick={handleCustomize}
                      className="flex items-center gap-1.5 text-white/90 text-xs font-semibold mt-4"
                    >
                      <SlidersHorizontal size={13} />
                      Customize size, milk & toppings →
                    </motion.button>
                  )}
                </motion.div>

                {/* Footer — price + checkout, pinned */}
                <motion.div
                  variants={riseUp}
                  initial="hidden"
                  animate="show"
                  className="flex-shrink-0 flex items-center gap-4 px-6 py-5 bg-black/15 backdrop-blur-sm"
                >
                  <span className="text-white font-bold text-2xl">
                    {formatPrice(product.price * qty)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    className="flex-1 py-3.5 rounded-full font-bold text-sm"
                    style={{ background: "#0d0500", color: "white" }}
                  >
                    Check Out
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
