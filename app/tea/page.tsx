"use client";

import { motion } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";

const TEA_CATEGORIES = [
  { name: "Green Tea", desc: "Light, grassy, and full of antioxidants.", color: "#7BAE7F", leaf: "🍃" },
  { name: "Black Tea", desc: "Bold, malty, and richly satisfying.", color: "#A9683D", leaf: "🍂" },
  { name: "Herbal Infusion", desc: "Caffeine-free blends of flowers and herbs.", color: "#D98BA0", leaf: "🌸" },
  { name: "Oolong", desc: "Half-oxidized, floral with a smooth finish.", color: "#C9A24B", leaf: "🍵" },
];

export default function TeaPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 overflow-hidden" style={{ background: "#0e1410" }}>
      {/* Ambient sage/gold blobs — distinct palette from the coffee pages */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/5 w-96 h-96 rounded-full opacity-25" style={{ background: "radial-gradient(circle,rgba(123,174,127,0.35) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-10 right-1/5 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle,rgba(201,162,75,0.35) 0%,transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Floating leaves */}
      {[10, 30, 55, 75, 90].map((left, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none select-none opacity-30"
          style={{ left: `${left}%`, top: "-5%" }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 180, 360] }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, delay: i * 2.4, ease: "linear" }}
        >
          🍃
        </motion.span>
      ))}

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
          style={{ background: "rgba(123,174,127,0.12)", border: "1px solid rgba(123,174,127,0.3)" }}
        >
          <Leaf size={14} style={{ color: "#7BAE7F" }} />
          <span className="text-sm font-semibold tracking-wide" style={{ color: "#7BAE7F" }}>Slow Steeped, Naturally</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-extrabold text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6"
          style={{ color: "#F4F1EA" }}
        >
          A Quieter Kind{" "}
          <span style={{ background: "linear-gradient(135deg,#7BAE7F,#C9A24B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            of Ritual
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mb-16"
          style={{ color: "rgba(244,241,234,0.6)", fontSize: "1.125rem", lineHeight: 1.7, fontWeight: 300 }}
        >
          Our tea program is brewing — hand-picked leaves, single-origin infusions,
          and a calmer corner of the menu. Here's a preview of what's steeping.
        </motion.p>

        {/* Category preview grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {TEA_CATEGORIES.map((tea, i) => (
            <motion.div
              key={tea.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-6 relative overflow-hidden"
              style={{ background: "rgba(244,241,234,0.04)", border: "1px solid rgba(244,241,234,0.08)", backdropFilter: "blur(12px)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${tea.color}22` }}
              >
                {tea.leaf}
              </div>
              <h3 className="font-bold text-lg mb-1.5" style={{ color: "#F4F1EA" }}>{tea.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(244,241,234,0.55)" }}>{tea.desc}</p>
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20"
                style={{ background: tea.color, filter: "blur(20px)" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 inline-flex items-center gap-2 text-sm"
          style={{ color: "rgba(244,241,234,0.4)" }}
        >
          <Sparkles size={14} />
          Full tea menu and ordering arriving soon
        </motion.div>
      </div>
    </div>
  );
}
