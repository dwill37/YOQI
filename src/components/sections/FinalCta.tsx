"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeUp, MaskedLines } from "@/components/ui/Reveal";
import { BUSINESS, WA } from "@/lib/site";

export function FinalCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // The loop only runs while the band is on screen (saves GPU/battery on mobile).
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div ref={ref} className="relative isolate overflow-hidden rounded-[32px] px-6 py-28 sm:px-10 lg:rounded-[40px] lg:py-40">
        {/* Very slow "breathing" scale loop. Static under reduced motion. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          animate={reduce || !inView ? { scale: 1 } : { scale: [1, 1.07, 1] }}
          transition={
            reduce || !inView
              ? { duration: 1.2, ease: "easeOut" }
              : { duration: 14, ease: "easeInOut", repeat: Infinity }
          }
        >
          <Image
            src="/images/forest-book.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-[70%_50%]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(11_18_15/0.55),rgb(11_18_15/0.88)_75%)]" />

        <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <MaskedLines
            id="cta-title"
            as="h2"
            lines={["Take a breath.", <em key="e" className="italic text-mint">Then say hello.</em>]}
            className="display text-[clamp(2.8rem,7vw,5.5rem)] tracking-[-0.03em]"
            lineClassName="text-center"
          />
          <FadeUp delay={0.25}>
            <p className="mt-7 max-w-[40ch] text-[17px] leading-relaxed text-ink/85">
              Tell us your dates and what you&rsquo;re hoping to feel. We&rsquo;ll take it from
              there.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} className="mt-10 flex flex-col items-center gap-5">
            <MagneticButton
              href={WA.general}
              external
              size="lg"
              icon={<WhatsAppIcon className="size-[18px]" />}
            >
              Message us on WhatsApp
            </MagneticButton>
            <a
              href={BUSINESS.phoneHref}
              className="text-sm text-ink/75 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-mint"
            >
              or call {BUSINESS.phoneDisplay}
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
