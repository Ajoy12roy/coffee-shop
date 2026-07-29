"use client";

import { motion } from "framer-motion";

const TEAM = [
  { name: "Rahim Uddin", role: "Head Barista", emoji: "👨🏽‍🍳" },
  { name: "Fatema Begum", role: "Pastry Chef", emoji: "👩🏽‍🍳" },
  { name: "Kamal Hossain", role: "Founder & CEO", emoji: "🧑🏾" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-white font-bold text-5xl sm:text-6xl mt-3 mb-6">
            Our{" "}
            <span style={{ background: "linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Story
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2020, CoffeeApp was born out of a simple desire — to bring premium, specialty coffee to everyone in Bangladesh, 
            delivered fresh and fast to your door. We source our beans from the world's finest farms and roast them in small batches 
            for maximum flavour.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: "🌱", title: "Sustainable", desc: "We partner with eco-certified farms and use compostable packaging." },
            { emoji: "☕", title: "Quality First", desc: "Every bean is hand-selected. Every cup is crafted with precision." },
            { emoji: "⚡", title: "Lightning Fast", desc: "Average delivery under 25 minutes — hot coffee, every time." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-6 text-center"
              style={{ background: "rgba(255,107,44,0.07)", border: "1px solid rgba(255,107,44,0.12)" }}
            >
              <div className="text-4xl mb-3">{v.emoji}</div>
              <h3 className="text-white font-bold text-xl mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-white font-bold text-3xl">Meet the Team</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-8 text-center glass"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <p className="text-white font-bold text-lg">{member.name}</p>
              <p className="text-[#FF6B2C] text-sm mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
