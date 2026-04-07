"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Intros = {
  home: dynamic(() => import("@/components/shared/LogoIntro5"), { ssr: false }),
  about: dynamic(() => import("@/components/shared/LogoIntro"), { ssr: false }),
  projects: dynamic(() => import("@/components/shared/LogoIntro2"), { ssr: false }),
  services: dynamic(() => import("@/components/shared/LogoIntro6"), { ssr: false }),
  contact: dynamic(() => import("@/components/shared/LogoIntro4"), { ssr: false }),
};

export default function PageIntroWrapper({ type, children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const IntroComponent = Intros[type];

  // If no matching intro type exists, just render children directly
  if (!IntroComponent) {
    return <>{children}</>;
  }

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {showIntro && <IntroComponent onComplete={handleIntroComplete} />}
      <div
        className="transition-opacity duration-500 ease-out"
        style={{ opacity: introComplete ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  );
}
