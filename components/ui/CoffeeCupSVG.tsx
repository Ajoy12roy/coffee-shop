interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export default function CoffeeCupSVG({ size = 80, color = "#FF6B2C", className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`cup-${color.replace("#", "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>

      {/* Steam lines */}
      <path d="M38 22 Q35 14 38 6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 18 Q47 10 50 2" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 22 Q59 14 62 6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />

      {/* Cup body */}
      <path
        d="M22 32 L28 100 Q50 110 72 100 L78 32 Z"
        fill={`url(#cup-${color.replace("#", "")})`}
      />
      {/* Shine overlay */}
      <path d="M22 32 L28 100 Q50 110 72 100 L78 32 Z" fill="url(#shine)" />
      {/* Rim */}
      <ellipse cx="50" cy="32" rx="28" ry="7" fill={color} />
      {/* Handle */}
      <path
        d="M78 55 Q96 55 96 72 Q96 89 78 89"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Logo text */}
      <text x="50" y="68" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="serif" fontWeight="bold">
        coffee
      </text>
      <text x="50" y="55" textAnchor="middle" fontSize="13">☕</text>
      {/* Dark band */}
      <path d="M24 75 L26 90 Q50 98 74 90 L76 75 Z" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}
