import Image from "next/image";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { BUSINESS, NAV_LINKS, SOCIAL } from "@/lib/site";

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon }, // [PLACEHOLDER: Instagram]
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon }, // [PLACEHOLDER: Facebook]
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon }, // [PLACEHOLDER: TikTok]
];

// Update yearly, or swap for a dynamic year if the page is rendered on request.
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-20 sm:px-8 sm:pb-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/yoqi-logo.png"
              alt={BUSINESS.name}
              width={359}
              height={193}
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-ink-muted">
              {BUSINESS.name}. A wellness center in Buduk, Mengwi, Bali.
            </p>
            <ul className="mt-7 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`${BUSINESS.shortName} on ${label}`}
                    className="grid size-11 place-items-center rounded-full text-ink-muted ring-1 ring-hairline transition-colors duration-300 hover:text-mint hover:ring-mint/50"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-ink">Visit</h2>
            <address className="mt-4 max-w-[30ch] text-[15px] not-italic leading-relaxed text-ink-muted">
              {BUSINESS.fullAddress}
            </address>
            <p className="mt-4 text-[15px]">
              <a
                href={BUSINESS.phoneHref}
                className="text-ink underline decoration-hairline-strong underline-offset-4 hover:decoration-mint"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            {/* TODO(verify): "Open 24 hours" as listed on Google. */}
            <p className="mt-2 text-[15px] text-ink-muted">{BUSINESS.hours}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-[13px] font-medium text-ink">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-8 text-[13px] text-ink-faint sm:flex-row sm:justify-between">
          <p>
            &copy; {COPYRIGHT_YEAR} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Buduk, Mengwi, Badung, Bali</p>
        </div>
      </div>
    </footer>
  );
}
