"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FadeUp, MaskedLines } from "@/components/ui/Reveal";

export function About() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1.04, 1.12]);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative px-5 pb-28 sm:px-8 lg:pb-40"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Double-bezel frame: a soft outer shell holding the photo core. */}
        <div className="lg:col-span-6">
          <div className="rounded-[34px] bg-surface-1 p-2 ring-1 ring-hairline">
            <div
              ref={frameRef}
              className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[inset_0_1px_0_rgb(233_236_228/0.08)]"
            >
              <motion.div className="absolute inset-[-10%_0]" style={{ y, scale }}>
                <Image
                  src="/images/yoqi-fern-emblem.jpg"
                  alt="The YOQI logo inside a thin gold double ring, resting on dark green fern leaves"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  quality={80}
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <MaskedLines
            id="about-title"
            as="h2"
            lines={["A slower rhythm,", <em key="e" className="italic text-mint">shaped around you.</em>]}
            className="display text-[clamp(2.5rem,5.4vw,4.4rem)] tracking-[-0.025em]"
          />

          <FadeUp className="mt-8 max-w-[52ch] space-y-6 text-[17px] leading-relaxed text-ink-muted" delay={0.2}>
            <p>
              <span className="placeholder">
                [PLACEHOLDER: what YOQI Wellness Travel offers and its philosophy]
              </span>
            </p>
          </FadeUp>

          <FadeUp className="mt-12 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-2" delay={0.35}>
            <div>
              <h3 className="text-[15px] font-medium text-ink">The people behind YOQI</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                <span className="placeholder">[PLACEHOLDER: founder or team story]</span>
              </p>
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-ink">What sets us apart</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                <span className="placeholder">[PLACEHOLDER: key differentiator]</span>
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
