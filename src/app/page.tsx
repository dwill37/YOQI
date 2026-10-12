import { About } from "@/components/sections/About";
import { Experiences } from "@/components/sections/Experiences";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { Navbar } from "@/components/sections/Navbar";
import { Reviews } from "@/components/sections/Reviews";
import { WhyYoqi } from "@/components/sections/WhyYoqi";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:text-on-mint"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <WhyYoqi />
        <About />
        <Experiences />
        <Reviews />
        <HowItWorks />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
