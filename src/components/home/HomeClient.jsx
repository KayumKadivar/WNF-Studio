"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import IconStrip from "@/components/home/IconStrip";
import CTASection from "@/components/home/CTASection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";

const LogoIntro = dynamic(
  () => import("@/components/shared/LogoIntro5"),
  { ssr: false }
);

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {/* Logo Splash — shows for 2-3 seconds on every homepage load */}
      {showIntro && <LogoIntro onComplete={handleIntroComplete} />}

      {/* Main Page Content — fades in after logo */}
      <div
        className="transition-opacity duration-500 ease-out"
        style={{ opacity: introComplete ? 1 : 0 }}
      >
        <HeroSlider />
        <IconStrip />
        <AboutPreview />
        <FeaturedProjects />
        <ServicesSection />
        <CTASection />
      </div>
    </>
  );
}
