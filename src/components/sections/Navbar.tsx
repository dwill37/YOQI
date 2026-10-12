"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { BUSINESS, NAV_LINKS, WA } from "@/lib/site";
import { EASE_BREATH } from "@/lib/motion";

export function Navbar() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Only flips state when crossing the threshold, so React re-renders at most twice.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 48));

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Keep keyboard focus inside the open menu (toggle button + menu links).
      if (e.key === "Tab") {
        const menu = document.getElementById("mobile-menu");
        const items = [
          toggleRef.current,
          ...Array.from(menu?.querySelectorAll<HTMLElement>("a[href]") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="px-3 pt-3 sm:px-6 lg:pt-4">
      <motion.nav
        aria-label="Main"
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_BREATH, delay: 0.9 }}
        className="relative mx-auto flex max-w-[1240px] items-center justify-between px-2 py-2 sm:px-3"
      >
        {/* Background pill fades and settles in once the visitor leaves the hero. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[rgb(17_26_22/0.82)] shadow-[0_18px_50px_-20px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(233_236_228/0.06)] ring-1 ring-hairline backdrop-blur-xl"
          initial={false}
          animate={scrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: EASE_BREATH }}
        />

        <a
          href="#top"
          className={`relative z-10 flex items-center rounded-full px-2 py-1 transition-transform duration-700 ease-breath ${
            scrolled ? "scale-90" : "scale-100"
          }`}
        >
          <Image
            src="/images/yoqi-wordmark.png"
            alt={BUSINESS.name}
            width={198}
            height={64}
            className="h-7 w-auto sm:h-8"
            loading="eager"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-[14px] text-ink/80 transition-colors duration-300 hover:text-ink after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-mint after:transition-transform after:duration-500 after:ease-breath hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex items-center gap-2">
          {/* On phones the floating WhatsApp button covers this, so the pill is tablet+. */}
          <div className="hidden sm:block">
            <MagneticButton
              href={WA.general}
              external
              variant="mint"
              icon={<WhatsAppIcon className="size-4" />}
            >
              Message us
            </MagneticButton>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-12 place-items-center rounded-full bg-surface-2/80 ring-1 ring-hairline backdrop-blur-md lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-500 ease-breath ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-500 ease-breath ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-10 flex flex-col overscroll-contain bg-canvas/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 4%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 92% 4%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-[clamp(2.6rem,11vw,4rem)] text-ink"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={reduce ? undefined : { y: "110%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.9, ease: EASE_BREATH, delay: 0.25 + i * 0.07 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_BREATH, delay: 0.7 }}
              className="flex flex-col gap-5"
            >
              <MagneticButton
                href={WA.general}
                external
                size="lg"
                magnetic={false}
                className="justify-between self-stretch"
                icon={<WhatsAppIcon className="size-4" />}
              >
                Message us
              </MagneticButton>
              <a href={BUSINESS.phoneHref} className="text-sm text-ink-muted">
                Call {BUSINESS.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
