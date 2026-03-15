import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import IconStrip from "@/components/home/IconStrip";
import CTASection from "@/components/home/CTASection";
import Marquee from "@/components/shared/Marquee";
import AboutPreview from "@/components/home/AboutPreview";

export const metadata = {
  title: "WNF Studio | Architecture & Interior Design",
  description:
    "Award-winning architecture and interior design studio creating timeless spaces that inspire. Residential, commercial, and luxury design services.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <IconStrip />
      <AboutPreview />
      <ServicesSection />
      <CTASection />
    </>
  );
}
