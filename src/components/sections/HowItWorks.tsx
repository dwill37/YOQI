"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { MaskedLines } from "@/components/ui/Reveal";
import { WA } from "@/lib/site";

const STEPS = [
  {
    title: "Send us a message",
    body: (
      <>
        Say hello on{" "}
        <a href={WA.general} target="_blank" rel="noopener noreferrer" className="text-mint underline decoration-mint/40 underline-offset-4 hover:decoration-mint">
          WhatsApp
        </a>
        . Tell us what you&rsquo;re looking for and when you&rsquo;re in Bali.
      </>
    ),
  },
  {
    title: "Confirm the details together",
    body: (
      <>
        We reply and settle the details with you.{" "}
        <span className="placeholder">[PLACEHOLDER: booking process]</span>
      </>
    ),
  },
  {
    title: "Meet us in Buduk",
    body: (
      <>
        Find us at Jl. Tunon No.37, Buduk.{" "}
        <span className="placeholder">[PLACEHOLDER: or pickup details if applicable]</span>
      </>
    ),
  },
];

// Where each node sits along the path (fraction of total length).
const THRESHOLDS = [0.17, 0.5, 0.83];

function Step({
  index,
  progress,
  title,
  body,
}: {
  index: number;
  progress: MotionValue<number>;
  title: string;
  body: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const t = THRESHOLDS[index];
  const lit = useTransform(progress, [t - 0.08, t], reduce ? [1, 1] : [0, 1]);
  // Only the (large) title dims before it is reached; body copy keeps full contrast.
  const titleOpacity = useTransform(lit, [0, 1], [0.55, 1]);
  const nodeScale = useTransform(lit, [0, 0.6, 1], [0.85, 1.12, 1]);
  const numberColor = useTransform(lit, [0, 1], ["#e9ece4", "#0b120f"]);

  return (
    <li className="relative grid grid-cols-[56px_1fr] gap-5 md:block md:text-center">
      {/* Node: lights up as the line reaches it. */}
      <motion.div
        className="relative z-10 grid size-14 place-items-center rounded-full bg-canvas ring-1 ring-hairline-strong md:mx-auto"
        style={{ scale: nodeScale }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-mint"
          style={{ opacity: lit }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full ring-1 ring-mint/30"
          style={{ opacity: lit }}
        />
        <motion.span className="display relative text-2xl" style={{ color: numberColor }}>
          {index + 1}
        </motion.span>
      </motion.div>
      <div className="pb-2 md:mx-auto md:mt-10 md:max-w-[30ch]">
        <motion.h3
          style={{ opacity: titleOpacity }}
          className="display text-[1.85rem] leading-tight tracking-[-0.015em]"
        >
          {title}
        </motion.h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{body}</p>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });
  const pathLength = useTransform(progress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative px-5 py-28 sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <MaskedLines
          id="how-title"
          as="h2"
          lines={["Three steps,", "then you breathe."]}
          className="display max-w-[16ch] text-[clamp(2.5rem,5.6vw,4.5rem)] tracking-[-0.025em]"
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Desktop: a curved line weaving through the three nodes. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[-52px] hidden h-40 w-full md:block"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 120 C 90 120, 120 80, 200 80 C 330 80, 420 10, 600 80 C 780 150, 870 80, 1000 80 C 1080 80, 1110 40, 1200 40"
              stroke="rgb(233 236 228 / 0.1)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M0 120 C 90 120, 120 80, 200 80 C 330 80, 420 10, 600 80 C 780 150, 870 80, 1000 80 C 1080 80, 1110 40, 1200 40"
              stroke="var(--mint)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          {/* Mobile: a softly meandering vertical line behind the nodes. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[16px] top-6 w-6 md:hidden"
            viewBox="0 0 24 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M12 0 C 20 100, 4 200, 12 300 S 20 500, 12 600"
              stroke="rgb(233 236 228 / 0.1)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M12 0 C 20 100, 4 200, 12 300 S 20 500, 12 600"
              stroke="var(--mint)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          <ol className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <Step key={s.title} index={i} progress={progress} title={s.title} body={s.body} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
