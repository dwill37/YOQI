"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user" makes every transform/layout animation instant for
 * visitors with prefers-reduced-motion. Loops, parallax and clip-path reveals
 * also check useReducedMotion() locally and fall back to a static state.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
