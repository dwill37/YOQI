"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { SPRING_MAGNET } from "@/lib/motion";

type Variant = "mint" | "glass" | "outline";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  /** Leading/trailing glyph rendered inside its own circular "island". */
  icon?: React.ReactNode;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  mint: "bg-mint text-on-mint hover:bg-[#b4e3c6]",
  glass:
    "bg-[rgb(11_18_15/0.55)] text-ink ring-1 ring-inset ring-[rgb(233_236_228/0.28)] backdrop-blur-md hover:bg-[rgb(11_18_15/0.7)]",
  outline: "text-ink ring-1 ring-inset ring-hairline-strong hover:bg-surface-2",
};

const islands: Record<Variant, string> = {
  mint: "bg-on-mint/10",
  glass: "bg-ink/10",
  outline: "bg-ink/10",
};

/**
 * Pill CTA with a gentle magnetic pull toward the cursor (mouse only),
 * spring-driven via motion values so nothing re-renders on pointer move.
 */
export function MagneticButton({
  href,
  children,
  variant = "mint",
  size = "md",
  icon,
  external,
  magnetic = true,
  className = "",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNET);
  const sy = useSpring(y, SPRING_MAGNET);
  const active = magnetic && !reduce;

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!active || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const pad = size === "lg" ? "h-14 pl-7 pr-2 text-[15px]" : "h-12 pl-5 pr-1.5 text-sm";
  const island = size === "lg" ? "size-10" : "size-9";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-colors duration-500 ease-breath ${pad} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <span
          className={`grid place-items-center rounded-full transition-transform duration-500 ease-breath group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${island} ${islands[variant]}`}
        >
          {icon}
        </span>
      )}
    </motion.a>
  );
}
