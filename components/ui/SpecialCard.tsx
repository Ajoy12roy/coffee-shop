"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import NamedCoffeeCupSVG from "./NamedCoffeeCupSVG";

interface Props {
  product: Product;
  index?: number;
  onSelect?: (product: Product) => void;
}

export default function SpecialCard({ product, index = 0, onSelect }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 300, damping: 24 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 300, damping: 24 });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      onClick={() => onSelect?.(product)}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      className="relative rounded-[1.75rem] overflow-hidden cursor-pointer"
    >
      {/* Glow ring */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-px rounded-[1.75rem] pointer-events-none"
        style={{ boxShadow: `0 0 0 1.5px ${product.color}80, 0 18px 40px ${product.color}40` }}
      />

      <div
        className="relative rounded-[1.75rem] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* Visual */}
        <div
          className="relative h-36 flex items-end justify-center overflow-hidden"
          style={{ background: product.bgColor }}
        >
          {/* Pointer-follow spotlight */}
          <motion.div
            animate={{ opacity: hovered ? 0.5 : 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${spotX} ${spotY}, rgba(255,255,255,0.5) 0%, transparent 55%)`,
            }}
          />
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 z-10">
            <Star size={9} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-[10px] font-bold">{product.rating}</span>
          </div>

          <motion.div
            animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.35))" }}
          >
            {product.category === "drinks" ? (
              <NamedCoffeeCupSVG productId={product.id} name={product.name} color={product.color} size={76} />
            ) : (
              <span className="text-6xl leading-none block">
                {product.category === "donuts" ? "🍩" : "🥐"}
              </span>
            )}
          </motion.div>
        </div>

        {/* Info */}
        <div className="relative p-4">
          <h4 className="text-white font-bold text-[15px] leading-tight mb-1.5 truncate tracking-tight">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-base" style={{ color: product.color }}>
              {formatPrice(product.price)}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0"
              style={{
                background: added
                  ? "linear-gradient(135deg,#4CAF50,#66BB6A)"
                  : `linear-gradient(135deg,${product.color},${product.color}99)`,
              }}
            >
              {added ? "✓" : <Plus size={13} />}
            </motion.button>
          </div>

          {/* CTA bar rises from the bottom on hover */}
          <motion.button
            initial={false}
            animate={{ y: hovered ? 0 : "115%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleAdd}
            className="absolute inset-x-0 bottom-0 py-2.5 flex items-center justify-center gap-1.5 text-xs font-bold text-white"
            style={{ background: `linear-gradient(135deg,${product.color},${product.color}cc)` }}
          >
            <ShoppingBag size={12} /> Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
