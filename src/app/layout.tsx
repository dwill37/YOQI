import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { BUSINESS, SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const title = "YOQI Wellness Travel | Wellness Center in Buduk, Bali";
const description =
  "YOQI Wellness Travel is a wellness center in Buduk, Mengwi, Bali, rated 5.0 on Google. Plan your wellness travel in Bali and book in one WhatsApp message.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "wellness center Buduk Bali",
    "wellness Mengwi Bali",
    "wellness travel Bali",
    "YOQI Wellness Travel",
    "wellness Badung Bali",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: BUSINESS.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b120f",
  colorScheme: "dark",
};

// [PLACEHOLDER: latitude/longitude from plus code 95X8+VW Buduk]
// Open the plus code in Google Maps, copy the coordinates, then set e.g.
// const GEO = { latitude: -8.6, longitude: 115.1 };
const GEO = null as { latitude: number; longitude: number } | null;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  description,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/images/yoqi-mark.png`,
  telephone: BUSINESS.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.street}, ${BUSINESS.village}`,
    addressLocality: "Mengwi",
    addressRegion: "Bali",
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.countryCode,
  },
  // geo is only emitted once real coordinates are set in GEO (above),
  // so search engines never receive placeholder text as coordinates.
  ...(GEO && {
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
  }),
  hasMap: "https://www.google.com/maps/search/?api=1&query=95X8%2BVW%20Buduk%2C%20Bali",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: BUSINESS.reviewCount,
  },
  // TODO(verify): Google lists "Open 24 hours". Confirm before launch.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${cormorant.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <MotionProvider>{children}</MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
