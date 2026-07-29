"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  size?: number;
  className?: string;
}

/**
 * Premium looping "pour + steam" hero animation.
 * Pure SVG + GSAP (transform/opacity only — GPU-friendly, 60fps).
 * - Coffee stream pours from a kettle spout into the cup
 * - Liquid level rises inside the cup as it fills (clip-path mask)
 * - Ripple pulses on impact
 * - Soft steam wisps rise and dissolve
 * - Fine particle motes drift upward
 */
export default function CoffeePourAnimation({ size = 260, className = "" }: Props) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const stream = root.querySelector(".pour-stream");
      const kettle = root.querySelector(".kettle-group");
      const liquid = root.querySelector(".liquid-fill");
      const ripple = root.querySelectorAll(".ripple");
      const steams = root.querySelectorAll(".steam-wisp");
      const motes = root.querySelectorAll(".mote");
      const shine = root.querySelector(".cup-shine");

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });

      // Kettle gentle tilt-in
      tl.fromTo(
        kettle,
        { rotate: -6, y: -4, transformOrigin: "90% 10%" },
        { rotate: -2, y: 0, duration: 0.6, ease: "power2.out" },
        0
      )
        // Stream appears + pours
        .fromTo(
          stream,
          { scaleY: 0, opacity: 0, transformOrigin: "50% 0%" },
          { scaleY: 1, opacity: 1, duration: 0.5, ease: "power1.out" },
          0.35
        )
        // Liquid rises in cup
        .fromTo(
          liquid,
          { attr: { y: 92, height: 0 } },
          { attr: { y: 46, height: 46 }, duration: 2.4, ease: "power1.inOut" },
          0.55
        )
        // Ripple pulses while pouring
        .to(
          ripple,
          {
            attr: { rx: 16, ry: 4 },
            opacity: 0,
            duration: 0.9,
            repeat: 3,
            stagger: { each: 0.55, repeat: 3 },
            ease: "power1.out",
          },
          0.7
        )
        // Stream stops
        .to(stream, { scaleY: 0, opacity: 0, duration: 0.4, ease: "power1.in" }, 2.9)
        .to(kettle, { rotate: -6, y: -4, duration: 0.6, ease: "power2.inOut" }, 2.9)
        // Hold full cup
        .to({}, { duration: 1.4 })
        // Reset liquid for next loop (invisible cut, cup already "full" visually so we just hold)
        .set(liquid, { attr: { y: 92, height: 0 } }, "+=0.2");

      // Continuous steam wisps — independent looping, staggered
      steams.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 0, opacity: 0, scaleX: 1 },
          {
            y: -70 - i * 6,
            opacity: 0,
            scaleX: 1.6,
            duration: 3.2 + i * 0.4,
            repeat: -1,
            delay: i * 0.7,
            ease: "sine.out",
            keyframes: {
              "0%": { opacity: 0, y: 0, scaleX: 1 },
              "20%": { opacity: 0.55 },
              "100%": { opacity: 0, y: -70 - i * 6, scaleX: 1.7 },
            },
          }
        );
      });

      // Drifting soft particles / motes
      motes.forEach((el, i) => {
        gsap.to(el, {
          y: -50 - i * 10,
          x: (i % 2 === 0 ? 1 : -1) * (8 + i * 3),
          opacity: 0,
          duration: 3 + i * 0.5,
          repeat: -1,
          delay: i * 0.6,
          ease: "power1.out",
        });
      });

      // Subtle shine sweep across cup
      if (shine) {
        gsap.fromTo(
          shine,
          { x: -60, opacity: 0 },
          {
            x: 60,
            opacity: 0.5,
            duration: 2.6,
            repeat: -1,
            repeatDelay: 1.8,
            ease: "power2.inOut",
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cupBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFE9D6" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B3A2A" />
          <stop offset="100%" stopColor="#3D2000" />
        </linearGradient>
        <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B87A4A" />
          <stop offset="100%" stopColor="#6B3A2A" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cupClip">
          <path d="M62 92 L70 176 Q100 188 130 176 L138 92 Z" />
        </clipPath>
      </defs>

      {/* Ambient glow */}
      <circle cx="100" cy="140" r="90" fill="url(#glowGrad)" />

      {/* Steam wisps (rise above cup) */}
      <g>
        <path className="steam-wisp" d="M76 86 Q68 66 78 46 Q86 30 76 12" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="steam-wisp" d="M100 82 Q92 60 102 40 Q110 24 100 6" stroke="rgba(255,255,255,0.6)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path className="steam-wisp" d="M124 86 Q116 66 126 46 Q134 30 124 12" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* Drifting particles */}
      <circle className="mote" cx="82" cy="70" r="2" fill="#FFD700" opacity="0.7" />
      <circle className="mote" cx="118" cy="76" r="1.6" fill="#FFB27A" opacity="0.6" />
      <circle className="mote" cx="100" cy="60" r="1.8" fill="#FFFFFF" opacity="0.5" />
      <circle className="mote" cx="108" cy="90" r="1.4" fill="#FFD700" opacity="0.55" />

      {/* Kettle (implied pour source, top-right) */}
      <g className="kettle-group">
        <path
          d="M124 6 L172 6 Q182 6 182 18 L182 30 Q182 40 170 42 L146 44 L126 34 Z"
          fill="#2D1600"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <rect x="118" y="10" width="14" height="8" rx="3" fill="#1A0A00" />
        <path d="M182 22 Q198 24 200 30" stroke="#2D1600" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* Pour stream */}
      <rect className="pour-stream" x="97" y="40" width="6" height="52" rx="3" fill="url(#streamGrad)" />

      {/* Ripple rings on cup surface */}
      <ellipse className="ripple" cx="100" cy="92" rx="8" ry="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" opacity="0" />

      {/* Cup body */}
      <g>
        {/* Handle */}
        <path d="M138 118 Q166 118 166 142 Q166 166 138 166" stroke="#FFE9D6" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.9" />
        {/* Body */}
        <path d="M62 92 L70 176 Q100 188 130 176 L138 92 Z" fill="url(#cupBodyGrad)" />
        {/* Liquid fill (animated height/y) */}
        <rect className="liquid-fill" x="66" y="92" width="68" height="0" fill="url(#liquidGrad)" clipPath="url(#cupClip)" />
        {/* Shine sweep */}
        <rect className="cup-shine" x="90" y="92" width="10" height="84" fill="rgba(255,255,255,0.35)" clipPath="url(#cupClip)" opacity="0" />
        {/* Dark base shadow band */}
        <path d="M72 160 L74 176 Q100 186 126 176 L128 160 Z" fill="rgba(0,0,0,0.12)" />
        {/* Rim */}
        <ellipse cx="100" cy="92" rx="38" ry="9" fill="#FFF8F0" />
        <ellipse cx="100" cy="92" rx="38" ry="9" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        {/* Logo */}
        <text x="100" y="150" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="12" fontFamily="serif" fontWeight="bold">
          coffee
        </text>
      </g>
    </svg>
  );
}
