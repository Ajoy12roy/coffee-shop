"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Clock, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

interface Props {
  product: Product;
  index?: number;
  onViewDetail?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onViewDetail }: Props) {
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isDonut = product.category === "donuts";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      onClick={() => onViewDetail?.(product)}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${product.color}22` }}
      />

      {/* Image area */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: product.bgColor }}
      >
        {/* Popular badge */}
        {product.isPopular && (
          <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
            🔥 Popular
          </div>
        )}

        {/* Animated background shape */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 rounded-full opacity-30"
          style={{ background: "rgba(255,255,255,0.2)", filter: "blur(20px)" }}
        />

        {/* Product Visual */}
        {isDonut ? (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl relative z-10 drop-shadow-lg"
          >
            🍩
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <CoffeeCupSVG size={90} color="rgba(255,255,255,0.9)" />
          </motion.div>
        )}

        {/* Rating pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            className="w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart
              size={11}
              className={isFavorite(product.id) ? "fill-red-400 text-red-400" : "text-white/80"}
            />
          </motion.button>
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-bold text-base leading-tight">{product.name}</h3>
          {product.prepTime && (
            <div className="flex items-center gap-1 text-white/40 text-[10px] flex-shrink-0 ml-2 mt-0.5">
              <Clock size={9} />
              {product.prepTime}
            </div>
          )}
        </div>
        <p className="text-white/40 text-xs line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color: product.color }}>
            {formatPrice(product.price)}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all"
            style={{
              background: added
                ? "linear-gradient(135deg,#4CAF50,#66BB6A)"
                : `linear-gradient(135deg,${product.color},${product.color}99)`,
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? "✓" : <Plus size={16} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
