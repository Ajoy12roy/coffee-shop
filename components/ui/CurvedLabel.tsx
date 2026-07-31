interface Props {
  id: string;
  text: string;
  width?: number;
  className?: string;
}

/**
 * Renders text along a gentle arc so it reads like it's wrapped around a
 * cylindrical cup surface, rather than sitting flat above the photo.
 */
export default function CurvedLabel({ id, text, width = 140, className = "" }: Props) {
  const pathId = `curve-${id}`;
  return (
    <svg
      viewBox="0 0 140 44"
      width={width}
      height={(width / 140) * 44}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d="M8,36 Q70,4 132,36" fill="none" />
      </defs>
      <text
        fontSize="13.5"
        fontWeight="700"
        fontFamily="Georgia, serif"
        letterSpacing="1.5"
        fill="white"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.65))" }}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text.toUpperCase()}
        </textPath>
      </text>
    </svg>
  );
}
