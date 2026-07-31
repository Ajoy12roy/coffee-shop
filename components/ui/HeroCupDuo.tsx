"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface Props {
  size?: number;
}

export default function HeroCupDuo({ size = 190 }: Props) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow independent float + rotation — opposite phase so the cross composition breathes
      if (frontRef.current) {
        gsap.to(frontRef.current, {
          y: -14,
          rotate: 3,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (backRef.current) {
        gsap.to(backRef.current, {
          y: 12,
          rotate: -4,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4,
        });
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.9,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size * 1.7, height: size * 1.75 }}>
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(255,107,44,0.32) 0%,transparent 70%)", filter: "blur(36px)" }}
      />

      {/* Back cup (black) — upper-right to lower-left axis */}
      <div
        ref={backRef}
        className="absolute z-10"
        style={{ top: "6%", right: "6%" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/coffee/cup.png"
            alt=""
            style={{ width: size * 0.78, height: "auto", transform: "scaleX(-1)", filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.45))" }}
          />
          <Steam delay={0.6} left="46%" />
          <motion.div
            animate={{ x: [-40, 40, -40], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[18%] left-0 w-6 h-2/3 pointer-events-none"
            style={{ background: "linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent)", filter: "blur(4px)" }}
          />
        </div>
      </div>

      {/* Front cup (white) — lower-left to upper-right axis, overlapping the black cup to form the X */}
      <div
        ref={frontRef}
        className="absolute z-20"
        style={{ bottom: "4%", left: "2%" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/coffee/cup.png"
            alt="Signature coffee cup"
            style={{ width: size, height: "auto", filter: "drop-shadow(0 22px 26px rgba(0,0,0,0.5))" }}
          />
          <Steam delay={0} left="46%" />
          <motion.div
            animate={{ x: [-40, 40, -40], opacity: [0, 0.4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute top-[18%] left-0 w-6 h-2/3 pointer-events-none"
            style={{ background: "linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent)", filter: "blur(4px)" }}
          />
        </div>
      </div>
    </div>
  );
}

function Steam({ delay = 0, left = "50%" }: { delay?: number; left?: string }) {
  return (
    <div className="absolute -top-6 pointer-events-none" style={{ left }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute block w-[3px] rounded-full bg-white/40"
          style={{ left: i * 7 - 7, height: 18 }}
          animate={{ y: [-2, -30], opacity: [0, 0.5, 0], scaleX: [1, 1.8] }}
          transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, delay: delay + i * 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
