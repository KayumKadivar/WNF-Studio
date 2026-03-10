import HeroSlider from "@/components/home/HeroSlider";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import IconStrip from "@/components/home/IconStrip";
import CTASection from "@/components/home/CTASection";
import Marquee from "@/components/shared/Marquee";

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
      <Marquee text="Design Excellence" className="py-12 bg-secondary text-foreground" />
      <FeaturedProjects />
      <ServicesSection />
      <CTASection />
    </>
  );
}
