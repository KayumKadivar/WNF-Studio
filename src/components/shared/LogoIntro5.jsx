"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro5 — 5th Demo of GSAP-powered animated logo reveal.
 * Cinematic Spotlight Reveal:
 * - Starts pitch black.
 * - A 'spotlight' (clip-path circle) shines and sweeps across the letters.
 * - The spotlight expands explosively to fill the screen, inverting the colors to white.
 * - Highly dynamic, premium, and completely different from scaling/scattering.
 */
const LogoIntro5 = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const runAnimation = async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default || gsapModule;
      if (cancelled || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setTimeout(() => {
              if (!cancelled) setFadeOut(true);
            }, 600);
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 1100);
          },
        });

        const clipLayer = containerRef.current.querySelector(".clip-layer");
        const frames = containerRef.current.querySelectorAll(".frame-path");
        const studioText = containerRef.current.querySelectorAll(".logo-studio");
        const taglineText = containerRef.current.querySelectorAll(".logo-tagline");

        // ─── Initial State ───
        // The foreground (white bg, dark text) is entirely hidden initially.
        gsap.set(clipLayer, { clipPath: "circle(0% at 20% 50%)" });
        gsap.set(frames, { opacity: 0, scale: 0.9 });
        gsap.set([studioText, taglineText], { opacity: 0, y: 10 });

        // ─── Spotlight Animation Sequence ───
        // 1. Spotlight turns on over "W"
        tl.to(clipLayer, {
          clipPath: "circle(18% at 25% 50%)",
          duration: 0.8,
          ease: "power2.out"
        }, 0.2);

        // 2. Spotlight sweeps to "n"
        tl.to(clipLayer, {
          clipPath: "circle(18% at 50% 50%)",
          duration: 0.6,
          ease: "power1.inOut"
        });

        // 3. Spotlight sweeps to "F"
        tl.to(clipLayer, {
          clipPath: "circle(18% at 75% 50%)",
          duration: 0.6,
          ease: "power1.inOut"
        });

        // 4. Spotlight sweeps back to center "n"
        tl.to(clipLayer, {
          clipPath: "circle(18% at 50% 50%)",
          duration: 0.5,
          ease: "power1.inOut"
        });

        // 5. Spotlight EXPLODES to fill the entire screen (revealing white bg)
        tl.to(clipLayer, {
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.2,
          ease: "expo.inOut"
        });

        // ─── Post-Explosion Reveal ───
        // As the screen goes white, the frames and secondary text snap into place
        frames.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          tl.to(path, { opacity: 1, scale: 1, duration: 0.2 }, "-=0.6");
          tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.4");
        });

        tl.to([studioText, taglineText], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        }, "-=1.0");

      }, containerRef);

      return () => ctx.revert();
    };

    runAnimation();
    return () => { cancelled = true; };
  }, [onComplete]);

  const LogoLayout = ({ mode }) => {
    const isDark = mode === "dark";
    const bgColor = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const primaryText = isDark ? "#ffffff" : "#1a1a1a";
    const secondaryText = isDark ? "#aaaaaa" : "#888888";
    const frameColor = isDark ? "#333333" : "#cccccc";

    return (
      <div className={`absolute inset-0 flex items-center justify-center ${bgColor}`}>
        <div className="relative w-[260px] md:w-[340px]">
          {/* ── SVG Frame: Back ── */}
          <svg
            className="frame-svg-back absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
            viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
          >
            <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke={frameColor} strokeWidth="0.4" />
          </svg>

          {/* ── SVG Frame: Front ── */}
          <svg
            className="frame-svg-front absolute -bottom-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
            viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
          >
            <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke={frameColor} strokeWidth="0.4" />
          </svg>

          <div className="relative z-10 flex flex-col items-center py-10 px-4 mt-2">
            <span
              className="logo-studio block text-[20px] md:text-[24px] tracking-[0.15em] mb-1"
              style={{ color: isDark ? "#cccccc" : "#666666", fontWeight: 300 }}
            >  Studio
            </span>
            <div className="flex items-baseline justify-center select-none origin-center letter">
              <span className="block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: primaryText, lineHeight: 1 }}>W</span>
              <span className="block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 400, color: secondaryText, lineHeight: 1 }}>n</span>
              <span className="block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: primaryText, lineHeight: 1 }}>F</span>
            </div>
            <span
              className="logo-tagline block mt-4 text-[13px] md:text-[16px] tracking-[0.25em] uppercase"
              style={{ color: isDark ? "#aaaaaa" : "#888888" }}
            >
              Interior&nbsp;&nbsp;|&nbsp;&nbsp;Architecture
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      {/* Background Layer: Light mode (white bg, dark text) */}
      <LogoLayout mode="light" />

      {/* Foreground Layer: Dark mode (pitch black, light text) - Animates clip-path to reveal */}
      <div className="clip-layer absolute inset-0 z-10" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <LogoLayout mode="dark" />
      </div>
    </div>
  );
};

export default LogoIntro5;
