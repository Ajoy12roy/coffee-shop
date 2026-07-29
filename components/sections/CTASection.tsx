"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg,#FF6B2C 0%,#9C27B0 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/10" />
          <div className="absolute top-6 left-10 text-5xl opacity-20 select-none">☕</div>
          <div className="absolute bottom-6 right-10 text-4xl opacity-20 select-none">🍩</div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-4 block"
            >
              🎁
            </motion.div>
            <h2 className="text-white font-bold text-4xl sm:text-5xl mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Subscribe to our newsletter and we'll send you an exclusive discount code instantly.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 text-white font-semibold text-lg"
                >
                  <CheckCircle size={24} />
                  Check your inbox for your discount code!
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-full px-6 py-4 text-sm outline-none focus:border-white/60 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 bg-white text-[#FF6B2C] font-bold px-8 py-4 rounded-full text-sm shadow-xl hover:bg-white/90 transition-colors"
                  >
                    Subscribe <ArrowRight size={16} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-white/50 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
