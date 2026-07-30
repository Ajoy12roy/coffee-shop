"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { HERO_STATS, PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import HeroCupDuo from "@/components/ui/HeroCupDuo";
import gsap from "gsap";

const floatingItems = [
  { emoji: "☕", x: "8%",  y: "22%", size: "text-3xl", delay: 0 },
  { emoji: "🍩", x: "84%", y: "16%", size: "text-2xl", delay: 0.5 },
  { emoji: "✨", x: "90%", y: "55%", size: "text-xl",  delay: 1 },
  { emoji: "🍪", x: "4%",  y: "68%", size: "text-2xl", delay: 0.8 },
  { emoji: "⭐", x: "80%", y: "78%", size: "text-lg",  delay: 1.2 },
];

export default function HeroSection() {
  const cupRef  = useRef<HTMLDivElement>(null);
  const bgRef   = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();
  const featuredProduct = PRODUCTS[0];

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, { scale: 1.06, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated BG */}
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,107,44,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0,30,0], y: [0,-20,0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(255,107,44,0.12) 0%,transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0,-20,0], y: [0,30,0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(156,39,176,0.1) 0%,transparent 70%)" }}
        />
      </div>

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ delay: item.delay + 1 }}
          style={{ position: "absolute", left: item.x, top: item.y }}
          className={`${item.size} select-none pointer-events-none z-10`}
        >
          <motion.span
            animate={{ y: [0,-12,0], rotate: [0,10,-10,0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            className="block"
          >
            {item.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.18fr_0.82fr] gap-10 items-center">
        {/* Text */}
        <div className="lg:-translate-x-6 xl:-translate-x-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background:"rgba(255,107,44,0.1)", border:"1px solid rgba(255,107,44,0.2)" }}>
            <Star size={14} style={{ color:"#FF6B2C", fill:"#FF6B2C" }} />
            <span className="text-sm font-medium" style={{ color:"#FF6B2C" }}>Artisan Coffee Experience</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
            className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white">
            Best{" "}
            <span style={{ background:"linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Coffee
            </span><br />
            In Town,<br />
            <span style={{ color:"#FF6B2C" }}>Now Online</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Order premium espresso, lattes, and fresh donuts from the comfort of your home.
            Delivered hot and fresh in minutes.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
            className="flex flex-wrap gap-4 mb-12">
            <motion.button
              whileHover={{ scale:1.05, boxShadow:"0 0 30px rgba(255,107,44,0.5)" }}
              whileTap={{ scale:0.97 }}
              onClick={() => { addItem(featuredProduct); openCart(); }}
              className="flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-base shadow-xl"
              style={{ background:"linear-gradient(135deg,#FF6B2C,#FF8C55)" }}>
              Order Now <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-base glass"
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior:"smooth" })}>
              View Menu
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            className="flex items-center gap-8">
            {HERO_STATS.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 + i*0.1 }}
                className="text-center">
                <div className="font-bold text-2xl text-white"
                  style={{ background:"linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full"
            style={{ background:"radial-gradient(circle,rgba(255,107,44,0.28) 0%,transparent 70%)", filter:"blur(40px)" }}
          />
          <motion.div animate={{ rotate:360 }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
            className="absolute w-72 h-72 rounded-full border border-dashed border-[#FF6B2C]/20" />
          <motion.div animate={{ rotate:-360 }} transition={{ duration:15, repeat:Infinity, ease:"linear" }}
            className="absolute w-56 h-56 rounded-full border border-dashed border-[#FF6B2C]/10" />

          <div ref={cupRef} className="relative z-10">
            <HeroCupDuo size={190} />

            <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut", delay:1 }}
              className="absolute -top-2 -right-8 sm:-right-12 rounded-2xl px-3 py-2 text-center z-30"
              style={{ background:"rgba(255,107,44,0.12)", border:"1px solid rgba(255,107,44,0.25)", backdropFilter:"blur(8px)" }}>
              <div className="font-bold text-sm" style={{ color:"#FF6B2C" }}>4.9 ★</div>
              <div className="text-white/60 text-xs">Rating</div>
            </motion.div>

            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut", delay:0.5 }}
              className="absolute -bottom-4 -left-8 sm:-left-12 rounded-2xl px-3 py-2 glass z-30">
              <div className="text-white font-semibold text-sm">🔥 Hot Deal</div>
              <div className="text-sm" style={{ color:"#FF6B2C" }}>20% OFF today</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
