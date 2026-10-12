"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowIcon, StarShape, WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_BREATH, EASE_EXHALE } from "@/lib/motion";
import { WA } from "@/lib/site";

const HEADLINE = [
  "Exhale.",
  <>
    You&rsquo;re in <em className="italic text-mint">Bali</em> now.
  </>,
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle depth while leaving the hero: photo drifts slower than the copy.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  const enter = (delay: number, y = 18) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, ease: EASE_BREATH, delay },
        };

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-canvas"
    >
      {/* Photo revealed through an expanding ellipse, like a ripple on still water. */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { clipPath: "ellipse(30% 24% at 50% 58%)" }}
        animate={{ clipPath: "ellipse(125% 125% at 50% 58%)" }}
        transition={{ duration: 2, ease: EASE_EXHALE, delay: 0.05 }}
      >
        <motion.div className="absolute inset-0" style={{ y: photoY }}>
          {/* The photo "breathes in": a long, soft settle from 1.08 to 1. */}
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease: EASE_BREATH }}
          >
            <Image
              src="/images/waterfall-hero.jpg"
              alt="A tall jungle waterfall pouring into a dark pool between moss- and fern-covered cliffs in Bali"
              fill
              preload
              sizes="100vw"
              quality={80}
              className="object-cover object-[50%_40%]"
            />
          </motion.div>
        </motion.div>
        {/* Scrims keep text contrast high over the brightest water. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_18_15/0.94)_0%,rgb(11_18_15/0.55)_38%,rgb(11_18_15/0.15)_70%,rgb(11_18_15/0.45)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(11_18_15/0.7)_0%,rgb(11_18_15/0)_65%)]" />
      </motion.div>

      {/* Two faint ripples spreading from the reveal point. Always rendered (so server
          and client markup match) and hidden by CSS under reduced motion. */}
      {[0, 0.35].map((d) => (
          <motion.span
            key={d}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[58%] -z-10 size-[40vmin] rounded-full ring-1 ring-mint/40 motion-reduce:hidden"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 2.4, ease: EASE_BREATH, delay: 0.1 + d }}
          />
        ))}

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-28 sm:px-8 sm:pb-20 lg:pb-24"
      >
        <motion.p
          {...enter(0.35, 12)}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-[rgb(11_18_15/0.55)] py-1.5 pl-2 pr-4 text-[13px] font-medium text-ink ring-1 ring-inset ring-[rgb(233_236_228/0.2)] backdrop-blur-md"
        >
          <span className="grid size-6 place-items-center rounded-full bg-mint text-on-mint">
            <StarShape className="size-3.5" />
          </span>
          <span>
            5.0 <span aria-hidden="true">★</span>
            <span className="sr-only">out of 5 stars</span> on Google
          </span>
        </motion.p>

        <h1
          id="hero-title"
          className="display text-[clamp(2.55rem,10.4vw,8.25rem)] leading-[0.98] tracking-[-0.03em] text-ink"
        >
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, ease: EASE_BREATH, delay: 0.3 + i * 0.16 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Thin horizon line drawing across under the headline. */}
        <motion.div
          aria-hidden="true"
          className="mt-6 h-px w-full max-w-[560px] sm:mt-8 origin-left bg-[linear-gradient(to_right,var(--mint),rgb(161_216_183/0))]"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE_EXHALE, delay: 0.85 }}
        />

        {/* Transform-only entrance: the subtext is the LCP element on phones, so it is
            painted (opacity 1) from the very first frame, even before hydration. */}
        <motion.p
          initial={reduce ? false : { y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.4, ease: EASE_BREATH, delay: 0.6 }}
          className="mt-5 max-w-[34rem] text-[16px] sm:mt-7 sm:text-[17px] leading-relaxed text-ink/85 sm:text-lg"
        >
          A wellness center in Buduk, Bali. Send us one message and we&rsquo;ll plan your time
          here together.
        </motion.p>

        <div className="mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <motion.div {...enter(1.15)}>
            <MagneticButton
              href={WA.stay}
              external
              size="lg"
              icon={<WhatsAppIcon className="size-[18px]" />}
            >
              Plan your stay on WhatsApp
            </MagneticButton>
          </motion.div>
          <motion.div {...enter(1.28)}>
            <MagneticButton
              href="#experiences"
              variant="glass"
              size="lg"
              icon={<ArrowIcon className="size-3.5 rotate-90" />}
            >
              Explore experiences
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
