"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Rafi Ahmed", role: "Coffee Enthusiast", avatar: "🧑🏽", rating: 5, text: "Best flat white I've ever had outside of Melbourne. The delivery was super fast and the cup arrived piping hot. 10/10 will order again!" },
  { name: "Nadia Islam", role: "Food Blogger", avatar: "👩🏽", rating: 5, text: "The donuts are absolutely divine! Pink in Disguise is my weekly guilty pleasure. The app is beautiful and ordering takes literally 30 seconds." },
  { name: "Tanvir Khan", role: "Developer", avatar: "🧑🏾", rating: 5, text: "I use CoffeeApp every single morning. The espresso is consistently perfect and the UI/UX of the app is smoother than any other delivery app I've used." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-white font-bold text-4xl sm:text-5xl mt-2">
            What People{" "}
            <span style={{ background: "linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Say
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-3xl p-6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-5 text-5xl text-[#FF6B2C]/15 font-serif leading-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">{t.text}</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "rgba(255,107,44,0.15)", border: "1px solid rgba(255,107,44,0.2)" }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
