"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  product: Product;
  index?: number;
  onSelect?: (product: Product) => void;
}

export default function SpecialCard({ product, index = 0, onSelect }: Props) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover="hover"
      onClick={() => onSelect?.(product)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Lift + glow on hover */}
      <motion.div
        variants={{ hover: { y: -6, boxShadow: `0 16px 40px ${product.color}33` } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />

      <motion.div
        variants={{ hover: { y: -6 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Visual */}
        <div
          className="relative h-32 flex items-center justify-center overflow-hidden"
          style={{ background: product.bgColor }}
        >
          {/* Shine sweep */}
          <motion.div
            variants={{ hover: { x: "160%" } }}
            initial={{ x: "-60%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
          <motion.div
            variants={{ hover: { scale: 1.12, y: -4 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CoffeeCupSVG size={62} color="rgba(255,255,255,0.92)" />
          </motion.div>

          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Star size={9} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h4 className="text-white font-semibold text-sm leading-tight mb-1 truncate">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm" style={{ color: product.color }}>
              {formatPrice(product.price)}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              variants={{ hover: { scale: 1.1 } }}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
              style={{
                background: added
                  ? "linear-gradient(135deg,#4CAF50,#66BB6A)"
                  : `linear-gradient(135deg,${product.color},${product.color}99)`,
              }}
            >
              {added ? "✓" : <Plus size={13} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
