"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  type?: "image" | "video"; // ready for video: set type: "video" and src to an .mp4/.webm path
  poster?: string; // optional poster frame for videos
}

const GALLERY_IMAGES: GalleryItem[] = [
  { src: "/images/gallery/gallery-latte-art.jpg", alt: "Latte art in a blue cup, sunlit table", caption: "Morning Light", type: "image" },
  { src: "/images/gallery/gallery-hand-red-cup.jpg", alt: "Hand holding a red coffee cup", caption: "On The Go", type: "image" },
  { src: "/images/gallery/gallery-steaming-cup.jpg", alt: "Steaming white cup with coffee beans", caption: "Fresh Brew", type: "image" },
  { src: "/images/gallery/gallery-barista.jpg", alt: "Person carrying a barista coffee holder on the street", caption: "Street Style", type: "image" },
  { src: "/images/gallery/gallery-hand-gold-cup.jpg", alt: "Hand holding a gold coffee cup", caption: "Golden Hour", type: "image" },
  { src: "/images/gallery/gallery-beans-splash.jpg", alt: "Coffee beans splashing into a cup", caption: "Roasted Daily", type: "image" },
  { src: "/images/gallery/gallery-hand-holder-cup.jpg", alt: "Hand holding a coffee cup with a holder", caption: "Every Sip", type: "image" },
  { src: "/images/gallery/gallery-iced-coffee.jpg", alt: "Iced coffee with a straw", caption: "Cold Brew Season", type: "image" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-[#FF6B2C] text-sm font-semibold tracking-widest uppercase">Gallery</span>
          <h1 className="text-white font-bold text-4xl mt-1">Moments Over Coffee</h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            A look at how our cups fit into everyday life.
          </p>
        </motion.div>

        {/* Masonry grid via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              onClick={() => setSelected(i)}
              className="relative w-full break-inside-avoid rounded-2xl overflow-hidden block group"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {img.type === "video" ? (
                <video
                  src={img.src}
                  poster={img.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              )}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)" }}
              >
                <span className="text-white font-semibold text-sm">{img.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm"
          >
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[85vh]"
            >
              {GALLERY_IMAGES[selected].type === "video" ? (
                <video
                  src={GALLERY_IMAGES[selected].src}
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-[85vh] rounded-2xl"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={GALLERY_IMAGES[selected].src}
                  alt={GALLERY_IMAGES[selected].alt}
                  className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                />
              )}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
              >
                <X size={16} />
              </button>
              <p className="text-white/70 text-sm mt-3 text-center">{GALLERY_IMAGES[selected].caption}</p>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
