"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_BREATH } from "@/lib/motion";

type Tag = "h2" | "h3" | "p" | "div";

const lineVariants: Variants = {
  hidden: { y: "105%" },
  show: ({ i, delay }: { i: number; delay: number }) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE_BREATH, delay: delay + i * 0.12 },
  }),
};

/**
 * Text revealed line by line through overflow masks, like a slow exhale.
 * Each entry in `lines` is one visual line on desktop.
 */
export function MaskedLines({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  id,
}: {
  id?: string;
  lines: React.ReactNode[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={lineVariants}
            custom={{ i, delay }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/** Soft fade-and-float for supporting copy. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: EASE_BREATH, delay }}
    >
      {children}
    </motion.div>
  );
}
