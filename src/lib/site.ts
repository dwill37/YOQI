/**
 * Single source of truth for YOQI Wellness Travel business data.
 * Every fact below comes from the Google Business Profile.
 * Anything marked [PLACEHOLDER: ...] must be filled in by the owner.
 */

export const SITE_URL = "https://www.yoqiwellness.com"; // [PLACEHOLDER: final domain]

export const BUSINESS = {
  name: "YOQI Wellness Travel",
  shortName: "YOQI",
  category: "Wellness center",
  rating: 5.0,
  reviewCount: 2,
  street: "Jl. Tunon No.37",
  village: "Buduk",
  district: "Kec. Mengwi",
  regency: "Kabupaten Badung",
  province: "Bali",
  postalCode: "80351",
  country: "Indonesia",
  countryCode: "ID",
  fullAddress:
    "Jl. Tunon No.37, Buduk, Kec. Mengwi, Kabupaten Badung, Bali 80351, Indonesia",
  plusCode: "95X8+VW Buduk, Badung Regency, Bali, Indonesia",
  phoneDisplay: "+62 851-2136-1088",
  phoneHref: "tel:+6285121361088",
  phoneE164: "+6285121361088",
  // TODO(verify): Google lists the business as "Open 24 hours". Confirm with the owner before launch.
  hours: "Open 24 hours",
} as const;

const WHATSAPP_BASE = "https://wa.me/6285121361088";

/** Builds a wa.me link with a URL-encoded, pre-filled message. */
export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: whatsappLink(
    "Hi YOQI Wellness Travel! I'd like to plan a wellness experience in Bali.",
  ),
  stay: whatsappLink(
    "Hi YOQI Wellness Travel! I'm planning my stay in Bali and would love to hear what you offer.",
  ),
  faq: whatsappLink("Hi YOQI Wellness Travel! I have a question before booking."),
} as const;

const MAP_QUERY = encodeURIComponent(
  "YOQI Wellness Travel, Jl. Tunon No.37, Buduk, Mengwi, Badung, Bali 80351",
);

export const MAPS = {
  embed: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`,
  // [PLACEHOLDER: Google reviews link] Replace with the direct "Read reviews" URL from the Google Business Profile.
  reviews: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
} as const;

export const SOCIAL = {
  instagram: "#", // [PLACEHOLDER: Instagram URL]
  facebook: "#", // [PLACEHOLDER: Facebook URL]
  tiktok: "#", // [PLACEHOLDER: TikTok URL]
} as const;

export const NAV_LINKS = [
  { href: "#experiences", label: "Experiences" },
  { href: "#reviews", label: "Reviews" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
] as const;

export type Experience = {
  name: string;
  description: string;
  duration: string;
  price: string;
  image: { src: string; alt: string; width: number; height: number };
};

/**
 * Experiences are intentionally placeholders: no service, duration or price
 * has been confirmed. Replace each [PLACEHOLDER] with the real offer.
 */
export const EXPERIENCES: Experience[] = [
  {
    name: "[PLACEHOLDER: experience name 1]",
    description: "[PLACEHOLDER: short description of experience 1]",
    duration: "[PLACEHOLDER: duration]",
    price: "[PLACEHOLDER: price]",
    image: {
      src: "/images/waterfall-left.jpg",
      alt: "Twin ribbons of white water falling down a dark, moss-covered rock face into a jungle pool",
      width: 720,
      height: 900,
    },
  },
  {
    name: "[PLACEHOLDER: experience name 2]",
    description: "[PLACEHOLDER: short description of experience 2]",
    duration: "[PLACEHOLDER: duration]",
    price: "[PLACEHOLDER: price]",
    image: {
      src: "/images/ferns.jpg",
      alt: "Deep green fern fronds against a black background, crossed by a thin gold ring",
      width: 464,
      height: 580,
    },
  },
  {
    name: "[PLACEHOLDER: experience name 3]",
    description: "[PLACEHOLDER: short description of experience 3]",
    duration: "[PLACEHOLDER: duration]",
    price: "[PLACEHOLDER: price]",
    image: {
      src: "/images/waterfall-right.jpg",
      alt: "A slender waterfall misting past a wall of bright green ivy at the edge of a still pool",
      width: 640,
      height: 800,
    },
  },
];

export const FAQS = [
  {
    q: "Where are you located?",
    a: `You’ll find us at ${BUSINESS.fullAddress}. Plus code: 95X8+VW Buduk.`,
  },
  {
    q: "What are your opening hours?",
    // TODO(verify): confirm 24-hour availability with the owner.
    a: "We’re listed on Google as open 24 hours. Send us a WhatsApp message to arrange a time that suits you.",
  },
  {
    q: "How do I book?",
    a: "Message us on WhatsApp at +62 851-2136-1088. Tell us what you’re looking for and your dates, and we’ll confirm the details together.",
  },
  {
    q: "What experiences do you offer?",
    a: "[PLACEHOLDER: list of experiences offered]",
  },
  {
    q: "How much does it cost?",
    a: "[PLACEHOLDER: pricing information]",
  },
  {
    q: "Do you offer hotel pickup or transport?",
    a: "[PLACEHOLDER: pickup and transport details]",
  },
] as const;
