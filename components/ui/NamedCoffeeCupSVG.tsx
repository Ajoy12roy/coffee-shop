interface Props {
  productId: string;
  name: string;
  color: string;
  size?: number;
  className?: string;
}

/** Simple relative-luminance check so printed text always stays readable on any cup color. */
function contrastText(hex: string): string {
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#ffffff";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#20140a" : "#ffffff";
}

/** Cheap per-product hash so the accent stripe/rotation differs cup to cup without bespoke art per drink. */
function hashOf(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 97;
  return h;
}

export default function NamedCoffeeCupSVG({ productId, name, color, size = 90, className = "" }: Props) {
  const textColor = contrastText(color);
  const hash = hashOf(productId + name);
  const stripeY = 118 + (hash % 24); // varies the accent band position per drink
  const stripeTilt = (hash % 10) - 5; // subtle unique tilt per drink

  const words = name.split(" ");
  const twoLines = name.length > 8 && words.length > 1;
  const line1 = twoLines ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : name;
  const line2 = twoLines ? words.slice(Math.ceil(words.length / 2)).join(" ") : "";

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
        <linearGradient id={`namedBody-${productId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="15%" stopColor={color} />
          <stop offset="50%" stopColor={color} />
          <stop offset="85%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`namedShadow-${productId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`namedClip-${productId}`}>
          <path d="M32 66 L40 190 Q80 202 120 190 L128 66 Z" />
        </clipPath>
      </defs>

      <ellipse cx="80" cy="206" rx="42" ry="8" fill={`url(#namedShadow-${productId})`} />

      {/* Body */}
      <path d="M32 66 L40 190 Q80 202 120 190 L128 66 Z" fill={`url(#namedBody-${productId})`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

      {/* Unique diagonal accent stripe per drink */}
      <g clipPath={`url(#namedClip-${productId})`}>
        <rect
          x="10"
          y={stripeY}
          width="150"
          height="14"
          fill="rgba(255,255,255,0.16)"
          transform={`rotate(${stripeTilt} 80 ${stripeY + 7})`}
        />
      </g>

      {/* Vertical sheen */}
      <path d="M58 72 L62 182" stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />

      {/* Bottom shadow band */}
      <path d="M42 176 L44 190 Q80 200 116 190 L118 176 Z" fill="rgba(0,0,0,0.16)" />

      {/* Name printed on the cup */}
      {twoLines ? (
        <>
          <text x="80" y="132" textAnchor="middle" fill={textColor} fontSize="13" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="0.5">
            {line1}
          </text>
          <text x="80" y="148" textAnchor="middle" fill={textColor} fontSize="13" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="0.5">
            {line2}
          </text>
        </>
      ) : (
        <text x="80" y="142" textAnchor="middle" fill={textColor} fontSize="15" fontFamily="Georgia, serif" fontWeight="700" letterSpacing="0.5">
          {line1}
        </text>
      )}
      <line x1="62" y1="154" x2="98" y2="154" stroke={textColor} strokeWidth="1" opacity="0.5" />

      {/* Lid */}
      <path d="M30 62 L130 62 L127 72 L33 72 Z" fill="#141416" />
      <path d="M26 40 Q80 18 134 40 L131 62 L29 62 Z" fill="#1c1c1e" />
      <path d="M30 62 L130 62" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <ellipse cx="80" cy="34" rx="9" ry="3.5" fill="#000000" opacity="0.55" />
      <ellipse cx="80" cy="33" rx="6" ry="2.2" fill="#050505" />
    </svg>
  );
}
