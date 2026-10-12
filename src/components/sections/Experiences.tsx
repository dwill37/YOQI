"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeUp, MaskedLines } from "@/components/ui/Reveal";
import { EASE_EXHALE, EASE_BREATH } from "@/lib/motion";
import { EXPERIENCES, whatsappLink, type Experience } from "@/lib/site";

/** Renders text, styling it as an owner-facing marker if it is still a placeholder. */
function Fill({ text }: { text: string }) {
  return text.startsWith("[PLACEHOLDER") ? <span className="placeholder">{text}</span> : <>{text}</>;
}

// Each card wipes open from a different edge so the sequence never feels mechanical.
const WIPES = ["inset(100% 0% 0% 0%)", "inset(0% 0% 100% 0%)", "inset(0% 100% 0% 0%)"];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const innerY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const message = `Hi YOQI Wellness Travel! I'd like to know more about ${exp.name}.`;

  return (
    <motion.article
      className={`flex flex-col ${index === 1 ? "lg:mt-28" : index === 2 ? "lg:mt-14" : ""}`}
      // The trigger lives on this unclipped wrapper: a fully clipped element never
      // reports as intersecting, so the wipe below is driven through variants.
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { y: 56 },
        show: { y: 0, transition: { duration: 1.6, ease: EASE_BREATH, delay: index * 0.18 } },
      }}
    >
      <div className="group rounded-[30px] bg-surface-1 p-1.5 ring-1 ring-hairline">
        <motion.div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
          variants={{
            hidden: { clipPath: WIPES[index % WIPES.length] },
            show: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 1.5, ease: EASE_EXHALE, delay: 0.1 + index * 0.18 },
            },
          }}
        >
          <motion.div className="absolute inset-[-9%_0]" style={{ y: innerY }}>
            <Image
              src={exp.image.src}
              alt={exp.image.alt}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              quality={80}
              className="object-cover transition-transform duration-[1.4s] ease-breath group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_18_15/0.55),transparent_45%)]" />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-7">
        <h3 className="display text-[1.9rem] leading-tight tracking-[-0.015em]">
          <Fill text={exp.name} />
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          <Fill text={exp.description} />
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-5 text-sm">
          <div>
            <dt className="text-ink-faint">Duration</dt>
            <dd className="mt-1 text-ink">
              <Fill text={exp.duration} />
            </dd>
          </div>
          <div>
            <dt className="text-ink-faint">Price</dt>
            <dd className="mt-1 text-ink">
              <Fill text={exp.price} />
            </dd>
          </div>
        </dl>
        <div className="mt-7">
          <MagneticButton
            href={whatsappLink(message)}
            external
            variant="outline"
            magnetic={false}
            icon={<WhatsAppIcon className="size-4" />}
            ariaLabel={`Book on WhatsApp: ${exp.name}`}
          >
            Book on WhatsApp
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}

export function Experiences() {
  return (
    <section
      id="experiences"
      aria-labelledby="experiences-title"
      className="relative bg-surface-1/40 px-5 py-28 sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[40rem]">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-mint">
            Experiences
          </p>
          <MaskedLines
            id="experiences-title"
            as="h2"
            lines={["Choose your pace.", "We take care of the rest."]}
            className="display mt-5 text-[clamp(2.5rem,5.6vw,4.5rem)] tracking-[-0.025em]"
          />
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted">
              Pick what calls to you and book it in one WhatsApp message.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
