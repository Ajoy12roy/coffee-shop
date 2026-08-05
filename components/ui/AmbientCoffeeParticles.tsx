"use client";

import { motion } from "framer-motion";

const BEANS = [
  { left: "8%", size: 14, duration: 16, delay: 0, drift: 18 },
  { left: "18%", size: 10, duration: 21, delay: 3, drift: -14 },
  { left: "30%", size: 16, duration: 18, delay: 6, drift: 12 },
  { left: "45%", size: 11, duration: 24, delay: 1.5, drift: -20 },
  { left: "62%", size: 15, duration: 19, delay: 4.5, drift: 16 },
  { left: "75%", size: 12, duration: 22, delay: 8, drift: -12 },
  { left: "88%", size: 13, duration: 17, delay: 2, drift: 20 },
];

const MOTES = [
  { left: "15%", top: "20%", size: 3, duration: 8 },
  { left: "35%", top: "60%", size: 2, duration: 10 },
  { left: "55%", top: "30%", size: 4, duration: 9 },
  { left: "70%", top: "70%", size: 2, duration: 11 },
  { left: "85%", top: "40%", size: 3, duration: 7 },
];

/**
 * Very low-opacity ambient motion for the Menu showcase backdrop.
 * Coffee beans drift upward and sway, dust motes twinkle, steam wisps
 * rise near the center — all subtle enough to never compete with the
 * coffee carousel in front of it.
 */
export default function AmbientCoffeeParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Coffee beans drifting upward */}
      {BEANS.map((b, i) => (
        <motion.svg
          key={`bean-${i}`}
          width={b.size}
          height={b.size * 1.4}
          viewBox="0 0 10 14"
          className="absolute opacity-0"
          style={{ left: b.left, bottom: "-5%" }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, b.drift, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.16, 0.16, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
            opacity: { duration: b.duration, times: [0, 0.1, 0.85, 1], repeat: Infinity, delay: b.delay },
          }}
        >
          <ellipse cx="5" cy="7" rx="4.5" ry="6.5" fill="#5A3A22" />
          <path d="M5 1 Q3 7 5 13" stroke="#3A2313" strokeWidth="0.8" fill="none" />
        </motion.svg>
      ))}

      {/* Soft dust motes */}
      {MOTES.map((m, i) => (
        <motion.div
          key={`mote-${i}`}
          className="absolute rounded-full bg-white"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
          animate={{ opacity: [0, 0.25, 0], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}

      {/* Faint steam wisps near center */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`steam-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${46 + i * 4}%`,
            bottom: "38%",
            width: 3,
            height: 40,
            background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent)",
          }}
          animate={{ y: [-10, -90], opacity: [0, 0.18, 0], scaleX: [1, 2] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
