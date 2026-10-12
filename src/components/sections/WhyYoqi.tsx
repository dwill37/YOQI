"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MaskedLines } from "@/components/ui/Reveal";
import { EASE_BREATH } from "@/lib/motion";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 70 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 38, damping: 15, mass: 1.1 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: EASE_BREATH, delay: 0.35 + i * 0.2 },
      opacity: { duration: 0.2, delay: 0.35 + i * 0.2 },
    },
  }),
};

function LineIcon({ paths, className = "" }: { paths: string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`size-9 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path key={i} d={d} variants={draw} custom={i} />
      ))}
    </svg>
  );
}

const ICONS = {
  star: ["M16 4.5l3.5 7.1 7.8 1.1-5.65 5.5 1.33 7.8L16 22.3l-6.98 3.7 1.33-7.8-5.65-5.5 7.8-1.1L16 4.5z"],
  clock: ["M16 4a12 12 0 1 1 0 24a12 12 0 1 1 0-24", "M16 9.5V16l4.5 3"],
  chat: [
    "M5 15.5C5 9.7 9.9 5.5 16 5.5s11 4.2 11 10-4.9 10-11 10c-1.5 0-3-.25-4.3-.72L6 26.5l1.7-4.6C6 20.2 5 18 5 15.5z",
    "M11.5 15.5h9",
  ],
  pin: [
    "M16 28s-9-8.2-9-15a9 9 0 0 1 18 0c0 6.8-9 15-9 15z",
    "M16 9.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 1 1 0-7",
  ],
};

export function WhyYoqi() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="relative px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[1240px]">
        <MaskedLines
          lines={["Four reasons", "to breathe easy."]}
          className="display max-w-[16ch] text-[clamp(2.6rem,6vw,4.75rem)] tracking-[-0.025em]"
          as="h2"
          id="why-title"
        />

        <motion.ul
          className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]"
          variants={grid}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Perfect rating: the anchor tile. */}
          <motion.li
            variants={card}
            className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] bg-surface-2 p-7 ring-1 ring-hairline md:row-span-2 lg:col-span-5 lg:row-span-2 lg:min-h-[480px] lg:p-10"
          >
            <LineIcon paths={ICONS.star} className="text-mint" />
            <div>
              <p className="display text-[clamp(6rem,14vw,10rem)] leading-[0.8] tracking-[-0.04em] text-ink">
                5.0
              </p>
              <h3 className="mt-6 text-xl font-medium tracking-[-0.01em]">Rated 5.0 on Google</h3>
              <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-ink-muted">
                A perfect score from every guest who has left a review so far.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(161_216_183/0.14),transparent_65%)] transition-transform duration-[1.6s] ease-breath group-hover:scale-125"
            />
          </motion.li>

          {/* Around the clock: concentric ripple texture. */}
          {/* TODO(verify): "Open 24 hours" is how Google lists the business. Confirm with the owner. */}
          <motion.li
            variants={card}
            whileHover={{ y: -4 }}
            className="relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[28px] bg-surface-1 p-7 ring-1 ring-hairline lg:col-span-7 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 top-1/2 size-[520px] -translate-y-1/2 rounded-full opacity-70 [background:repeating-radial-gradient(circle,rgb(161_216_183/0.09)_0_1px,transparent_1px_34px)]"
            />
            <LineIcon paths={ICONS.clock} className="relative text-mint" />
            <div className="relative mt-10">
              <h3 className="text-xl font-medium tracking-[-0.01em]">Open 24 hours</h3>
              <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-ink-muted">
                Listed on Google as open around the clock, so you can reach out whenever it suits
                you.
              </p>
            </div>
          </motion.li>

          {/* Booking: the one mint tile on the page grid. */}
          <motion.li
            variants={card}
            whileHover={{ y: -4 }}
            className="flex min-h-[230px] flex-col justify-between rounded-[28px] bg-mint p-7 text-on-mint lg:col-span-4 lg:p-9"
          >
            <LineIcon paths={ICONS.chat} />
            <div className="mt-10">
              <h3 className="text-xl font-medium tracking-[-0.01em]">Book in one message</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-mint/80">
                No forms, no apps to download. Message us on WhatsApp and we&rsquo;ll arrange the
                details with you.
              </p>
            </div>
          </motion.li>

          {/* Place. */}
          <motion.li
            variants={card}
            whileHover={{ y: -4 }}
            className="flex min-h-[230px] flex-col justify-between rounded-[28px] p-7 ring-1 ring-inset ring-hairline-strong lg:col-span-3 lg:p-9"
          >
            <LineIcon paths={ICONS.pin} className="text-mint" />
            <div className="mt-10">
              <h3 className="text-xl font-medium tracking-[-0.01em]">Rooted in Buduk</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Find us in Buduk, Mengwi, in Bali&rsquo;s Badung Regency.
              </p>
            </div>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
