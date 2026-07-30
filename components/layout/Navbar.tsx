"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass border-b border-white/10 py-3" : "py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B2C] to-[#FF8C55] flex items-center justify-center text-white text-lg font-bold shadow-lg"
            >
              ☕
            </motion.div>
            <span className="text-white font-bold text-xl hidden sm:block tracking-tight">
              Coffee<span style={{ color: "#FF6B2C" }}>App</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B2C] transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Search">
              <Search size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors relative"
              aria-label="Cart">
              <ShoppingBag size={16} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B2C] rounded-full text-[10px] flex items-center justify-center font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,107,44,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-lg"
                style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
              >
                Order Now
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu">
              {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass border-b border-white/10 p-6"
          >
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 hover:text-white text-lg font-medium block"
                    onClick={() => setIsMobileOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/profile" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full text-white py-3 rounded-full font-semibold mt-2"
                    style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}>
                    Order Now
                  </button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
