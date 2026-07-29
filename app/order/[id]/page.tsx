"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Minus, Plus, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { addOrderRecord } from "@/lib/profileStore";
import { formatPrice } from "@/lib/utils";
import CoffeeCupSVG from "@/components/ui/CoffeeCupSVG";

const SIZES = [
  { id: "small", label: "Small", delta: -0.5 },
  { id: "medium", label: "Medium", delta: 0 },
  { id: "large", label: "Large", delta: 0.75 },
];

const SUGAR_LEVELS = ["None", "Less", "Regular", "Extra"];

const MILKS = [
  { id: "whole", label: "Whole Milk", delta: 0 },
  { id: "oat", label: "Oat Milk", delta: 0.5 },
  { id: "almond", label: "Almond Milk", delta: 0.5 },
  { id: "skim", label: "Skim Milk", delta: 0 },
];

const TOPPINGS = [
  { id: "whip", label: "Whipped Cream", delta: 0.5 },
  { id: "shot", label: "Extra Shot", delta: 0.75 },
  { id: "caramel", label: "Caramel Drizzle", delta: 0.4 },
  { id: "cinnamon", label: "Cinnamon", delta: 0.2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const product = useMemo(() => PRODUCTS.find((p) => p.id === params.id), [params.id]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("medium");
  const [sugar, setSugar] = useState("Regular");
  const [milk, setMilk] = useState("whole");
  const [toppings, setToppings] = useState<string[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const isDrink = product?.category === "drinks";

  const toggleTopping = (id: string) =>
    setToppings((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    let p = product.price;
    if (isDrink) {
      p += SIZES.find((s) => s.id === size)?.delta || 0;
      p += MILKS.find((m) => m.id === milk)?.delta || 0;
      p += toppings.reduce((sum, t) => sum + (TOPPINGS.find((x) => x.id === t)?.delta || 0), 0);
    }
    return Math.max(p, 0.5);
  }, [product, isDrink, size, milk, toppings]);

  const total = unitPrice * qty;

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-white font-bold text-2xl mb-4">We couldn&apos;t find that item</h1>
        <button
          onClick={() => router.push("/menu")}
          className="text-[#FF6B2C] font-semibold underline"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    addOrderRecord({
      productName: product.name,
      productColor: product.color,
      quantity: qty,
      total,
    });
    openCart();
  };

  return (
    <div className="min-h-screen pb-40">
      {/* Hero — cup floating in a soft breathing gradient, same language as the detail sheet */}
      <div
        className="relative pt-24 pb-10 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${product.color}35 0%, transparent 72%)` }}
      >
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => router.back()}
          className="absolute top-24 left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white z-10"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </motion.button>

        {/* Soft ambient glow pulsing behind the cup */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${product.color}45 0%, transparent 70%)`, filter: "blur(30px)" }}
        />

        {/* Steam */}
        <div className="absolute top-16">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute block w-1 rounded-full"
              style={{ left: i * 14 - 14, height: 26, background: "rgba(255,255,255,0.35)" }}
              animate={{ y: [-4, -34], opacity: [0, 0.5, 0], scaleX: [1, 1.6] }}
              transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.div
          key={product.id}
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 120 }}
          className="relative z-10"
        >
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <CoffeeCupSVG size={190} color="rgba(255,255,255,0.95)" />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-10 text-center mt-4">
          <h1 className="text-white font-bold text-3xl">{product.name}</h1>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"} />
            ))}
            <span className="text-white/50 text-xs ml-1.5">{product.rating} · {product.prepTime}</span>
          </div>
        </motion.div>
      </div>

      {/* Customize card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 200, delay: 0.1 }}
        className="max-w-2xl mx-auto -mt-4 relative z-10 rounded-t-[2rem] px-6 pt-8 pb-4"
        style={{ background: "linear-gradient(180deg,#241100 0%,#1A0A00 100%)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg">
          {product.description}
        </motion.p>

        {isDrink && (
          <>
            {/* Size */}
            <Section title="Size" delay={0}>
              <div className="grid grid-cols-3 gap-3">
                {SIZES.map((s) => (
                  <Chip key={s.id} active={size === s.id} color={product.color} onClick={() => setSize(s.id)}>
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-[11px] opacity-70">{s.delta === 0 ? "Base" : `${s.delta > 0 ? "+" : ""}${formatPrice(s.delta)}`}</div>
                  </Chip>
                ))}
              </div>
            </Section>

            {/* Sugar */}
            <Section title="Sugar Level" delay={0.05}>
              <div className="grid grid-cols-4 gap-3">
                {SUGAR_LEVELS.map((s) => (
                  <Chip key={s} active={sugar === s} color={product.color} onClick={() => setSugar(s)}>
                    <div className="font-semibold text-xs">{s}</div>
                  </Chip>
                ))}
              </div>
            </Section>

            {/* Milk */}
            <Section title="Milk" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {MILKS.map((m) => (
                  <Chip key={m.id} active={milk === m.id} color={product.color} onClick={() => setMilk(m.id)}>
                    <div className="font-semibold text-sm">{m.label}</div>
                    <div className="text-[11px] opacity-70">{m.delta === 0 ? "Free" : `+${formatPrice(m.delta)}`}</div>
                  </Chip>
                ))}
              </div>
            </Section>

            {/* Toppings */}
            <Section title="Extra Toppings" delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {TOPPINGS.map((t) => (
                  <Chip key={t.id} active={toppings.includes(t.id)} color={product.color} onClick={() => toggleTopping(t.id)} multi>
                    <div className="font-semibold text-sm">{t.label}</div>
                    <div className="text-[11px] opacity-70">+{formatPrice(t.delta)}</div>
                  </Chip>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* Quantity */}
        <Section title="Quantity" delay={0.2}>
          <div className="flex items-center gap-4 glass rounded-2xl px-4 py-3 w-fit">
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Minus size={16} className="text-white/70" />
            </motion.button>
            <span className="text-white font-bold w-6 text-center text-lg">{qty}</span>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => q + 1)}>
              <Plus size={16} style={{ color: product.color }} />
            </motion.button>
          </div>
        </Section>
      </motion.div>

      {/* Sticky bottom bar — animated total + actions */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", damping: 24, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-3"
        style={{ background: "linear-gradient(180deg, transparent, rgba(13,5,0,0.95) 30%)" }}
      >
        <div
          className="max-w-2xl mx-auto flex items-center gap-3 rounded-2xl px-5 py-4"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex flex-col leading-none">
            <span className="text-white/50 text-[11px] mb-1">Total</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={total.toFixed(2)}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-bold text-2xl text-white block"
              >
                {formatPrice(total)}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span key="added" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                  <Check size={16} /> Added
                </motion.span>
              ) : (
                <motion.span key="add">Add to Cart</motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${product.color}66` }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBuyNow}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white"
            style={{ background: `linear-gradient(135deg,${product.color},${product.color}99)` }}
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay }}
      className="mb-7"
    >
      <p className="text-white/70 text-sm font-semibold mb-3">{title}</p>
      {children}
    </motion.div>
  );
}

function Chip({
  active,
  color,
  onClick,
  children,
  multi = false,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
  multi?: boolean;
}) {
  return (
    <motion.button
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative rounded-xl px-3 py-2.5 text-left overflow-hidden text-white"
      style={{
        background: active ? `linear-gradient(135deg,${color},${color}99)` : "rgba(255,255,255,0.05)",
        border: active ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {active && (
        <motion.div
          layoutId={multi ? undefined : `chip-glow-${color}`}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="absolute inset-0 -z-10"
          style={{ boxShadow: `0 0 18px ${color}55 inset` }}
        />
      )}
      {children}
    </motion.button>
  );
}
