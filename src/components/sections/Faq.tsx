"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { MaskedLines } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_BREATH } from "@/lib/motion";
import { FAQS, WA } from "@/lib/site";

function Answer({ text }: { text: string }) {
  return text.startsWith("[PLACEHOLDER") ? <span className="placeholder">{text}</span> : <>{text}</>;
}

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <MaskedLines
              id="faq-title"
              as="h2"
              lines={["Questions,", "answered."]}
              className="display text-[clamp(2.5rem,5.6vw,4.5rem)] tracking-[-0.025em]"
            />
            <p className="mt-6 max-w-[30ch] text-[15px] leading-relaxed text-ink-muted">
              Something else on your mind?{" "}
              <a
                href={WA.faq}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-mint underline decoration-mint/40 underline-offset-4 hover:decoration-mint"
              >
                <WhatsAppIcon className="size-3.5" />
                Ask us on WhatsApp
              </a>
            </p>
          </div>
        </div>

        <ul className="lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <motion.li
                key={f.q}
                layout={reduce ? false : "position"}
                className="border-b border-hairline first:border-t"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={`text-lg font-medium tracking-[-0.01em] transition-colors duration-500 sm:text-xl ${
                        isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative grid size-10 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-500 ${
                        isOpen ? "bg-mint ring-mint" : "ring-hairline-strong group-hover:ring-mint/60"
                      }`}
                    >
                      <span className={`absolute h-px w-3.5 ${isOpen ? "bg-on-mint" : "bg-ink"}`} />
                      <motion.span
                        className={`absolute h-3.5 w-px ${isOpen ? "bg-on-mint" : "bg-ink"}`}
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.5, ease: EASE_BREATH }}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease: EASE_BREATH }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={reduce ? false : { y: 12 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: EASE_BREATH }}
                        className="max-w-[60ch] pb-8 pr-14 text-[16px] leading-relaxed text-ink-muted"
                      >
                        <Answer text={f.a} />
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
