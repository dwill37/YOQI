"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_BREATH } from "@/lib/motion";
import { WA } from "@/lib/site";

/**
 * Mobile: always visible once the hero intro has played.
 * Desktop: appears only after the visitor scrolls past the hero, and stays small.
 */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [introDone, setIntroDone] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroDone(true), reduce ? 0 : 2300);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useMotionValueEvent(scrollY, "change", (v) => setPastHero(v > window.innerHeight * 0.7));

  return (
    <AnimatePresence>
      {introDone && (
        <motion.a
          key="wa"
          href={WA.general}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message YOQI Wellness Travel on WhatsApp"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-30 grid size-14 place-items-center rounded-full bg-mint text-on-mint shadow-[0_14px_40px_-10px_rgb(161_216_183/0.45)] transition-[opacity,visibility] duration-700 ease-breath lg:bottom-8 lg:right-8 lg:size-[52px] ${
            pastHero ? "" : "lg:invisible lg:opacity-0"
          }`}
        >
          {/* Slow breathing ring. */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full ring-1 ring-mint"
              animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
              // A handful of slow breaths, then it rests (no endless motion next to content).
              transition={{ duration: 3.2, ease: EASE_BREATH, repeat: 5, repeatDelay: 1.4 }}
            />
          )}
          <WhatsAppIcon className="relative size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
