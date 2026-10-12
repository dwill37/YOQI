"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowIcon, StarShape } from "@/components/ui/Icons";
import { MaskedLines } from "@/components/ui/Reveal";
import { EASE_BREATH } from "@/lib/motion";
import { BUSINESS, MAPS } from "@/lib/site";

const REVIEWERS = [
  { name: "Joe R.", role: "Google Local Guide", initial: "J" },
  { name: "Maddie W.", role: "Google review", initial: "M" },
];

/** Five stars that fill one after another, like a slow breath. */
function BreathingStars({
  play,
  start = 0,
  size = "size-7",
  gap = "gap-1.5",
}: {
  play: boolean;
  start?: number;
  size?: string;
  gap?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex ${gap}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`relative ${size}`}>
          <StarShape className={`absolute inset-0 ${size} text-ink/12`} />
          <motion.span
            className="absolute inset-0 origin-left overflow-hidden"
            initial={reduce ? false : { scaleX: 0, opacity: 0.4 }}
            animate={play || reduce ? { scaleX: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: EASE_BREATH, delay: start + i * 0.26 }}
          >
            <StarShape className={`${size} text-mint`} />
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function RatingCounter() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Same starting value on server and client to keep hydration consistent.
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 28, damping: 18, mass: 1 });
  const text = useTransform(spring, (v) => v.toFixed(1));

  useEffect(() => {
    if (reduce) {
      value.jump(BUSINESS.rating);
      spring.jump(BUSINESS.rating);
    } else if (inView) {
      value.set(BUSINESS.rating);
    }
  }, [inView, reduce, value, spring]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p className="sr-only">
        Rated {BUSINESS.rating.toFixed(1)} out of 5, based on {BUSINESS.reviewCount} Google reviews.
      </p>
      <motion.span
        aria-hidden="true"
        className="display block text-[clamp(7rem,22vw,15rem)] leading-[0.85] tracking-[-0.045em] tabular-nums"
      >
        {text}
      </motion.span>
      <div className="mt-8">
        <BreathingStars play={inView} start={0.9} size="size-8" gap="gap-2" />
      </div>
      <p className="mt-5 text-[15px] text-ink-muted" aria-hidden="true">
        Based on {BUSINESS.reviewCount} Google reviews
      </p>
    </div>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();
  const cardsRef = useRef<HTMLUListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.4 });

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 lg:py-40"
    >
      {/* Soft halo behind the score. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-48 -z-10 size-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(161_216_183/0.08),transparent_60%)]"
      />
      <div className="mx-auto max-w-[1040px]">
        <MaskedLines
          id="reviews-title"
          as="h2"
          lines={["A perfect score,", "so far."]}
          className="display text-center text-[clamp(2.4rem,5vw,4rem)] tracking-[-0.025em]"
          lineClassName="text-center"
        />

        <div className="mt-16">
          <RatingCounter />
        </div>

        <ul ref={cardsRef} className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
          {REVIEWERS.map((r, i) => (
            <motion.li
              key={r.name}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.3, ease: EASE_BREATH, delay: 0.15 + i * 0.2 }}
              whileHover={{ y: -4 }}
              className="rounded-[28px] bg-surface-1 p-1.5 ring-1 ring-hairline"
            >
              <figure className="h-full rounded-[22px] bg-surface-2/60 p-7 shadow-[inset_0_1px_0_rgb(233_236_228/0.05)] sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <BreathingStars play={cardsInView} start={0.5 + i * 0.2} size="size-4" gap="gap-1" />
                  <span className="sr-only">5 out of 5 stars</span>
                  <span className="text-[12px] text-ink-faint">Google</span>
                </div>
                <blockquote className="mt-6 text-[17px] leading-relaxed text-ink">
                  <span className="placeholder">[PLACEHOLDER: review text]</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="display grid size-11 place-items-center rounded-full bg-mint-soft text-xl text-mint ring-1 ring-mint/25"
                  >
                    {r.initial}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[15px] font-medium text-ink">{r.name}</span>
                    <span className="text-[13px] text-ink-muted">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <MagneticButton
            href={MAPS.reviews}
            external
            variant="outline"
            icon={<ArrowIcon />}
          >
            Read all reviews on Google
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
