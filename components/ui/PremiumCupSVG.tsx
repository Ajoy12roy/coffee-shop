interface Props {
  size?: number;
  variant?: "light" | "dark";
  accent?: string;
  className?: string;
}

/**
 * Premium reusable tumbler-style coffee cup illustration, modelled on
 * a realistic to-go cup with a domed screw lid (matte body, subtle
 * vertical sheen, small circular wordmark badge).
 */
export default function PremiumCupSVG({ size = 200, variant = "light", accent = "#FF6B2C", className = "" }: Props) {
  const isDark = variant === "dark";
  const bodyTop = isDark ? "#3a3a3d" : "#fbfbfa";
  const bodyBottom = isDark ? "#0e0e10" : "#e9e6df";
  const bodyStroke = isDark ? "#000000" : "#d8d4cb";
  const lidColor = "#141416";
  const lidHighlight = "#2a2a2e";
  const textColor = isDark ? "#f2f2f0" : "#1a1a1a";

  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 160 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`bodyGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={bodyBottom} />
          <stop offset="12%" stopColor={bodyTop} />
          <stop offset="50%" stopColor={bodyTop} />
          <stop offset="88%" stopColor={bodyTop} />
          <stop offset="100%" stopColor={bodyBottom} />
        </linearGradient>
        <linearGradient id={`lidGrad-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lidHighlight} />
          <stop offset="100%" stopColor={lidColor} />
        </linearGradient>
        <radialGradient id={`shadowGrad-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Contact shadow */}
      <ellipse cx="80" cy="206" rx="42" ry="8" fill={`url(#shadowGrad-${variant})`} />

      {/* Cup body (tapered) */}
      <path
        d="M32 66 L40 190 Q80 202 120 190 L128 66 Z"
        fill={`url(#bodyGrad-${variant})`}
        stroke={bodyStroke}
        strokeWidth="1"
      />

      {/* Vertical sheen highlight */}
      <path className="cup-sheen" d="M58 72 L62 182" stroke={isDark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.75)"} strokeWidth="7" strokeLinecap="round" opacity="0.8" />

      {/* Bottom rim shadow band */}
      <path d="M42 176 L44 190 Q80 200 116 190 L118 176 Z" fill="rgba(0,0,0,0.14)" />

      {/* Logo badge */}
      <g>
        <circle cx="80" cy="120" r="24" fill={isDark ? "#1c1c1e" : "#ffffff"} stroke={accent} strokeWidth="1.5" />
        <path d="M71 118 h18 v6 a9 9 0 0 1 -18 0 z" fill="none" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M89 120 h3 a3 3 0 0 1 0 6 h-3" fill="none" stroke={textColor} strokeWidth="1.6" />
        <path d="M74 112 q1.5 -3 0 -5" stroke={textColor} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M79 112 q1.5 -3 0 -5" stroke={textColor} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </g>
      <text x="80" y="154" textAnchor="middle" fill={textColor} fontSize="9" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="0.5">
        coffee
      </text>

      {/* Lid collar */}
      <path d="M30 62 L130 62 L127 72 L33 72 Z" fill={`url(#lidGrad-${variant})`} />
      {/* Lid dome */}
      <path d="M26 40 Q80 18 134 40 L131 62 L29 62 Z" fill={`url(#lidGrad-${variant})`} />
      {/* Lid rim highlight */}
      <path d="M30 62 L130 62" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      {/* Sip vent */}
      <ellipse cx="80" cy="34" rx="9" ry="3.5" fill="#000000" opacity="0.55" />
      <ellipse cx="80" cy="33" rx="6" ry="2.2" fill="#050505" />
    </svg>
  );
}
