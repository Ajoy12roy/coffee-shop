"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Facebook,  href: "#", label: "Facebook"  },
  { icon: Youtube,   href: "#", label: "YouTube"   },
];

const links: Record<string, string[]> = {
  Menu:    ["Coffee", "Donuts", "Snacks", "Seasonal Specials"],
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background:"linear-gradient(135deg,#FF6B2C,#FF8C55)" }}>☕</div>
              <span className="text-white font-bold text-xl">Coffee<span style={{ color:"#FF6B2C" }}>App</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Premium coffee and donuts crafted with love. Order now and experience the best flavours in town.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href}
                  whileHover={{ scale:1.15, y:-2 }} whileTap={{ scale:0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-[#FF6B2C] transition-colors">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} CoffeeApp. All rights reserved.</p>
          <p className="text-white/30 text-xs">Made with ☕ & ❤️ in Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
