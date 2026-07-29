"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "./CoffeeCupSVG";

export default function CartDrawer() {
  const { state, closeCart, increment, decrement, removeItem, clearCart, totalPrice, vat, subTotal } =
    useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: "linear-gradient(180deg,#2D1600 0%,#1A0A00 100%)", borderLeft: "1px solid rgba(255,107,44,0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#FF6B2C]" size={22} />
                <h2 className="text-white font-bold text-xl">My Cart</h2>
                {state.items.length > 0 && (
                  <span className="bg-[#FF6B2C] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {state.items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={clearCart}
                    className="text-white/40 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> Clear
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/60 hover:text-white ml-2"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20"
                  >
                    <div className="text-6xl opacity-20">☕</div>
                    <p className="text-white/40 text-center">Your cart is empty.<br />Add some delicious items!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={closeCart}
                      className="mt-2 px-6 py-2 rounded-full text-white text-sm font-semibold"
                      style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
                    >
                      Browse Menu
                    </motion.button>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                      className="rounded-2xl p-4 flex items-center gap-4"
                      style={{ background: "rgba(255,107,44,0.08)", border: "1px solid rgba(255,107,44,0.15)" }}
                    >
                      {/* Mini Cup */}
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: item.product.bgColor }}
                      >
                        <CoffeeCupSVG size={44} color={item.product.color} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{item.product.name}</p>
                        <p className="text-[#FF6B2C] font-bold text-sm mt-0.5">{formatPrice(item.product.price)}</p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => decrement(item.product.id)}
                          className="w-7 h-7 rounded-full glass flex items-center justify-center text-white hover:text-[#FF6B2C] transition-colors"
                        >
                          <Minus size={12} />
                        </motion.button>
                        <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => increment(item.product.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                          style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
                        >
                          <Plus size={12} />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.product.id)}
                        className="text-white/30 hover:text-red-400 ml-1 transition-colors"
                      >
                        <X size={14} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="p-6 border-t border-white/10 space-y-3"
              >
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Total", value: formatPrice(totalPrice) },
                    { label: "VAT (15%)", value: formatPrice(vat) },
                    { label: "Delivery", value: "Free" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-white/50">
                      <span>{label}</span>
                      <span className={value === "Free" ? "text-green-400 font-medium" : ""}>{value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                    <span>Sub Total</span>
                    <span className="text-[#FF6B2C]">{formatPrice(subTotal)}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,107,44,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl text-white font-bold text-base"
                  style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
                >
                  Check Out — {formatPrice(subTotal)}
                </motion.button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
