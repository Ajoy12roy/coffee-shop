"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface Props {
  size?: number;
}

/**
 * Hero visual — two identical premium cups (from the uploaded cup photo),
 * placed side-by-side at a slight angle, each floating independently.
 */
export default function HeroCupDuo({ size = 220 }: Props) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.to(leftRef.current, {
          y: -12,
          rotate: -5,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (rightRef.current) {
        gsap.to(rightRef.current, {
          y: -16,
          rotate: 9,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
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
    <div className="relative flex items-end justify-center" style={{ width: size * 1.7, height: size * 1.35 }}>
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(255,107,44,0.32) 0%,transparent 70%)", filter: "blur(36px)" }}
      />

      {/* Left cup — slight angle, sits behind */}
      <div
        ref={leftRef}
        className="absolute z-10"
        style={{ left: "4%", bottom: "2%", transform: "rotate(-6deg)" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/coffee/cappuccino.png"
            alt=""
            style={{ width: size * 0.86, height: "auto", filter: "drop-shadow(0 20px 24px rgba(0,0,0,0.5)) brightness(0.85)" }}
          />
          <Steam left="46%" delay={0.5} />
        </div>
      </div>

      {/* Right cup — mirrored angle, in front */}
      <div
        ref={rightRef}
        className="absolute z-20"
        style={{ right: "6%", bottom: "0%", transform: "rotate(5deg)" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/coffee/cappuccino.png"
            alt="Signature coffee cup"
            style={{ width: size, height: "auto", filter: "drop-shadow(0 24px 28px rgba(0,0,0,0.55))" }}
          />
          <Steam left="46%" delay={0} />

          {/* Shine sweep */}
          <motion.div
            animate={{ x: [-40, 40, -40], opacity: [0, 0.4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-0 w-8 h-2/3 pointer-events-none"
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
