"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Pencil, Save, X, Mail, Phone, MapPin, GraduationCap,
  Heart, Clock, Settings as SettingsIcon, ChevronDown, ShoppingBag, User,
} from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/utils";
import {
  ProfileData, DEFAULT_PROFILE, getProfile, saveProfile,
  OrderRecord, getOrderHistory,
  SettingsData, DEFAULT_SETTINGS, getSettings, saveSettings,
} from "@/lib/profileStore";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProfilePage() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [form, setForm] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const p = getProfile();
    setProfile(p);
    setForm(p);
    setOrders(getOrderHistory());
    setSettings(getSettings());
  }, []);

  const handlePictureClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const avatar = reader.result as string;
      const next = { ...profile, avatar };
      setProfile(next);
      setForm(next);
      saveProfile(next);
    };
    reader.readAsDataURL(file);
  };

  const startEditing = () => {
    setForm(profile);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setForm(profile);
    setIsEditing(false);
  };

  const saveEditing = () => {
    setProfile(form);
    saveProfile(form);
    setIsEditing(false);
  };

  const toggleSetting = (key: keyof SettingsData) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    saveSettings(next);
  };

  const favoriteProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-30" style={{ background: "radial-gradient(circle,rgba(255,107,44,0.25) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle,rgba(156,39,176,0.25) 0%,transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Hero card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative rounded-[2rem] p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePictureClick}
              className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center relative"
              style={{
                background: profile.avatar ? "transparent" : "linear-gradient(135deg,#FF6B2C,#FF8C55)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Change profile picture"
            >
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={44} className="text-white/90" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center pointer-events-none"
              style={{ background: "#FF6B2C", border: "2px solid #1A0A00" }}
            >
              <Camera size={13} className="text-white" />
            </motion.div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Fields */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-4 gap-3">
              {isEditing ? (
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-bold text-xl w-full max-w-xs focus:outline-none focus:border-[#FF6B2C]/50"
                />
              ) : (
                <h1 className="text-white font-bold text-2xl">{profile.name || "Guest User"}</h1>
              )}

              {isEditing ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={saveEditing}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg,#4CAF50,#66BB6A)" }} aria-label="Save profile">
                    <Save size={15} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={cancelEditing}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10" aria-label="Cancel editing">
                    <X size={15} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={startEditing}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full text-white flex-shrink-0"
                  style={{ background: "rgba(255,107,44,0.15)", border: "1px solid rgba(255,107,44,0.3)" }}
                >
                  <Pencil size={12} /> Edit Profile
                </motion.button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <ProfileField icon={Mail} label="Gmail" value={form.email} editing={isEditing}
                onChange={(v) => setForm({ ...form, email: v })} placeholder="you@gmail.com" />
              <ProfileField icon={Phone} label="Phone" value={form.phone} editing={isEditing}
                onChange={(v) => setForm({ ...form, phone: v })} placeholder="+880 1XXX-XXXXXX" />
              <ProfileField icon={MapPin} label="Address" value={form.address} editing={isEditing}
                onChange={(v) => setForm({ ...form, address: v })} placeholder="Your delivery address" />
              <ProfileField icon={GraduationCap} label="Qualification" value={form.qualification} editing={isEditing}
                onChange={(v) => setForm({ ...form, qualification: v })} placeholder="e.g. BSc in CSE" />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <StatCard icon={ShoppingBag} label="Orders Placed" value={orders.length} color="#FF6B2C" />
          <StatCard icon={Heart} label="Favorite Coffees" value={favoriteProducts.length} color="#E91E63" />
        </motion.div>

        {/* Order History */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[#FF6B2C]" />
            <h2 className="text-white font-bold text-lg">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <EmptyState text="No orders yet — head to the menu and treat yourself." href="/menu" cta="Browse Menu" />
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {orders.map((o) => (
                  <motion.div
                    key={o.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: o.productColor }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {o.productName} {o.quantity > 1 && <span className="text-white/50">×{o.quantity}</span>}
                      </p>
                      <p className="text-white/40 text-[11px]">
                        {new Date(o.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-white flex-shrink-0">{formatPrice(o.total)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Favorites */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart size={16} className="text-[#E91E63]" />
            <h2 className="text-white font-bold text-lg">Favorite Coffees</h2>
          </div>

          {favoriteProducts.length === 0 ? (
            <EmptyState text="Tap the heart on any drink to save it here." href="/menu" cta="Browse Menu" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence>
                {favoriteProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="relative rounded-2xl p-3 flex items-center gap-3"
                    style={{ background: p.bgColor }}
                  >
                    <div>
                      <p className="text-white font-semibold text-sm truncate">{p.name}</p>
                      <p className="text-white/80 text-xs font-bold">{formatPrice(p.price)}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => toggleFavorite(p.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/25 flex items-center justify-center"
                      aria-label="Remove from favorites"
                    >
                      <Heart size={11} className="fill-white text-white" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Settings shortcut */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
        >
          <button
            onClick={() => setSettingsOpen((o) => !o)}
            className="w-full flex items-center justify-between px-6 py-5"
          >
            <div className="flex items-center gap-2">
              <SettingsIcon size={16} className="text-white/70" />
              <span className="text-white font-bold text-lg">Settings</span>
            </div>
            <motion.div animate={{ rotate: settingsOpen ? 180 : 0 }}>
              <ChevronDown size={18} className="text-white/50" />
            </motion.div>
          </button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 flex flex-col gap-4">
                  <SettingToggle label="Email Notifications" checked={settings.emailNotifications} onChange={() => toggleSetting("emailNotifications")} />
                  <SettingToggle label="Order Updates" checked={settings.orderUpdates} onChange={() => toggleSetting("orderUpdates")} />
                  <SettingToggle label="Marketing Emails" checked={settings.marketingEmails} onChange={() => toggleSetting("marketingEmails")} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileField({
  icon: Icon, label, value, editing, onChange, placeholder,
}: {
  icon: React.ElementType; label: string; value: string; editing: boolean;
  onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <Icon size={15} className="text-[#FF6B2C] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-white/40 text-[10px] font-medium uppercase tracking-wide">{label}</p>
        {editing ? (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="bg-transparent text-white text-sm w-full focus:outline-none placeholder:text-white/25"
          />
        ) : (
          <p className="text-white text-sm truncate">{value || <span className="text-white/25">{placeholder}</span>}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="text-white font-bold text-xl leading-none">{value}</p>
        <p className="text-white/50 text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="text-center py-8">
      <p className="text-white/40 text-sm mb-3">{text}</p>
      <Link href={href} className="text-[#FF6B2C] text-sm font-semibold underline">{cta}</Link>
    </div>
  );
}

function SettingToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/80 text-sm">{label}</span>
      <button
        onClick={onChange}
        className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors"
        style={{ background: checked ? "#FF6B2C" : "rgba(255,255,255,0.15)" }}
        aria-label={label}
        aria-pressed={checked}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white block"
        />
      </button>
    </div>
  );
}
