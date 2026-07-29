"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "+880 1700-000000" },
  { icon: Mail, label: "Email", value: "hello@coffeeapp.bd" },
  { icon: MapPin, label: "Address", value: "Gulshan 2, Dhaka 1212" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Contact Us</span>
          <h1 className="text-white font-bold text-5xl sm:text-6xl mt-3 mb-4">
            Get in{" "}
            <span style={{ background: "linear-gradient(135deg,#FF6B2C,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Touch
            </span>
          </h1>
          <p className="text-white/50 text-lg">We'd love to hear from you. Send us a message!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {CONTACT_INFO.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{ background: "rgba(255,107,44,0.07)", border: "1px solid rgba(255,107,44,0.12)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}>
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-3xl p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-12"
                >
                  <CheckCircle size={52} style={{ color: "#FF6B2C" }} />
                  <h3 className="text-white font-bold text-2xl">Message Sent!</h3>
                  <p className="text-white/50 text-center">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)}
                    className="mt-2 text-[#FF6B2C] text-sm font-medium hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "Your Name", type: "text", placeholder: "Rahim Ahmed" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "rahim@email.com" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-white/60 text-sm mb-2 block">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        required
                        className="w-full px-5 py-3.5 rounded-xl text-white text-sm outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      className="w-full px-5 py-3.5 rounded-xl text-white text-sm outline-none resize-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255,107,44,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold"
                    style={{ background: "linear-gradient(135deg,#FF6B2C,#FF8C55)" }}
                  >
                    <Send size={16} /> Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
