"use client";

import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  product: Product;
  index?: number;
  onSelect: (product: Product) => void;
}

export default function CoffeeListRow({ product, index = 0, onSelect }: Props) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isDonut = product.category === "donuts";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      onClick={() => onSelect(product)}
      className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: product.bgColor }}
      >
        {isDonut ? (
          <span className="text-2xl">🍩</span>
        ) : (
          <CoffeeCupSVG size={30} color="rgba(255,255,255,0.9)" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-sm truncate">{product.name}</h4>
        <span className="font-bold text-sm" style={{ color: product.color }}>
          {formatPrice(product.price)}
        </span>
      </div>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <Heart size={15} className={isFavorite(product.id) ? "fill-red-400 text-red-400" : "text-white/40"} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={(e) => {
          e.stopPropagation();
          addItem(product);
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ background: `linear-gradient(135deg,${product.color},${product.color}99)` }}
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus size={14} />
      </motion.button>
    </motion.div>
  );
}
