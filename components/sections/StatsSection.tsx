"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Menu Items", emoji: "🍽️" },
  { value: 10000, suffix: "+", label: "Happy Customers", emoji: "😊" },
  { value: 4.9, suffix: "★", label: "Average Rating", emoji: "⭐", decimal: true },
  { value: 25, suffix: "min", label: "Avg Delivery", emoji: "🚀" },
];

function CountUp({ target, suffix, decimal = false, start }: { target: number; suffix: string; decimal?: boolean; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(current.toFixed(decimal ? 1 : 0)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [start, target, decimal]);

  return (
    <span>
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-14 grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,44,0.12) 0%, rgba(156,39,176,0.08) 100%)",
            border: "1px solid rgba(255,107,44,0.15)",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-4xl mb-3">{stat.emoji}</div>
              <div className="font-bold text-3xl sm:text-4xl mb-1" style={{
                background: "linear-gradient(135deg,#FF6B2C,#FFD700)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>
                <CountUp target={stat.value} suffix={stat.suffix} decimal={stat.decimal} start={inView} />
              </div>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
