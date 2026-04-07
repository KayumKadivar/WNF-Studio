import PageIntroWrapper from "@/components/shared/PageIntroWrapper";
import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import IconStrip from "@/components/home/IconStrip";
import CTASection from "@/components/home/CTASection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export const metadata = {
  title: "Home | WNF Studio - Modern Architecture & Luxury Interior Design",
  description:
    "Explore WNF Studio, an award-winning architecture and interior design firm specializing in timeless residential and commercial spaces. Elevating design standards.",
};

export default function HomePage() {
  return (
    <PageIntroWrapper type="home">
      <HeroSlider />
      <IconStrip />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesSection />
      <CTASection />
    </PageIntroWrapper>
  );
}
