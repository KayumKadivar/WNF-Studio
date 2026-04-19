"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";

const LogoIntro = dynamic(
  () => import("@/components/shared/LogoIntro5"),
  { ssr: false }
);

export default function HomeClient() {
  // Only show intro on very first site load (not on back navigation or re-visits)
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('logoIntroPlayed')) {
      return false;
    }
    return true;
  });
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('logoIntroPlayed')) {
      return true;
    }
    return false;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
    sessionStorage.setItem('logoIntroPlayed', 'true');
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
        {/* <IconStrip /> */}
        <AboutPreview />
        <FeaturedProjects />
        <ServicesSection />
        <CTASection />
      </div>
    </>
  );
}
