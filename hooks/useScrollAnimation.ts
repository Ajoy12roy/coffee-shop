import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: `-${Math.round(threshold * 100)}px` });
  return { ref, isInView };
}
