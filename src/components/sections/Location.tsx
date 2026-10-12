"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowIcon } from "@/components/ui/Icons";
import { FadeUp, MaskedLines } from "@/components/ui/Reveal";
import { EASE_EXHALE } from "@/lib/motion";
import { BUSINESS, MAPS } from "@/lib/site";

export function Location() {
  const reduce = useReducedMotion();

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative bg-surface-1/40 px-5 py-28 sm:px-8 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <MaskedLines
            id="location-title"
            as="h2"
            lines={["Find us", <em key="e" className="italic text-mint">in Buduk.</em>]}
            className="display text-[clamp(2.5rem,5.6vw,4.5rem)] tracking-[-0.025em]"
          />

          <FadeUp delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 text-[15px]">
              <div className="col-span-2">
                <dt className="text-ink-faint">Address</dt>
                <dd className="mt-1.5 max-w-[30ch] leading-relaxed text-ink">
                  <address className="not-italic">{BUSINESS.fullAddress}</address>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-ink-faint">Plus code</dt>
                <dd className="mt-1.5 text-ink">{BUSINESS.plusCode}</dd>
              </div>
                <div>
                  <dt className="text-ink-faint">Hours</dt>
                  {/* TODO(verify): Google lists "Open 24 hours". Confirm with the owner. */}
                  <dd className="mt-1.5 text-ink">{BUSINESS.hours}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Phone</dt>
                  <dd className="mt-1.5">
                    <a
                      href={BUSINESS.phoneHref}
                      className="text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-mint"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </dd>
                </div>
            </dl>
            <div className="mt-10">
              <MagneticButton href={MAPS.directions} external icon={<ArrowIcon />}>
                Get directions
              </MagneticButton>
            </div>
          </FadeUp>
        </div>

        {/* Map unveiled with a ripple-style circular clip-path. */}
        {/* Trigger on the unclipped wrapper; a fully clipped child never reports in view. */}
        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div
            className="h-full rounded-[34px] bg-surface-1 p-2 ring-1 ring-hairline"
            variants={{
              hidden: { clipPath: "circle(0% at 50% 50%)" },
              show: {
                clipPath: "circle(75% at 50% 50%)",
                transition: { duration: 1.8, ease: EASE_EXHALE },
              },
            }}
          >
            <div className="relative h-[420px] overflow-hidden rounded-[26px] bg-surface-2 lg:h-full lg:min-h-[520px]">
              <iframe
                title="Map showing YOQI Wellness Travel at Jl. Tunon No.37, Buduk, Mengwi, Bali"
                src={MAPS.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-dark absolute inset-0 size-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
