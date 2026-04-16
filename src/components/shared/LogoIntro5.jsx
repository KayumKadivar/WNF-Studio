"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro5 — Minimalist Ultra-Fast Reveal
 * High-end, snappy start directly into the site without holding the user back.
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
            }, 100); // Barely any pause before fading
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 600); // 500ms for the CSS fade-out to finish
          },
        });

        const frames = containerRef.current.querySelectorAll(".frame-path");
        const letters = containerRef.current.querySelectorAll(".letter > span");
        const studioText = containerRef.current.querySelectorAll(".logo-studio");
        const taglineText = containerRef.current.querySelectorAll(".logo-tagline");

        // ─── Initial State ───
        gsap.set(frames, { opacity: 0, scale: 0.95 });
        gsap.set(letters, { opacity: 0, y: 30 });
        gsap.set([studioText, taglineText], { opacity: 0 });

        // ─── Fast Reveal Sequence ───
        // 1. Snappily draw frames
        frames.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { opacity: 1, scale: 1, duration: 0.1 }, 0);
          tl.to(path, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, 0.1);
        });

        // 2. Letters rise up fast (Staggered)
        tl.to(letters, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05 // Tiny stagger for organic feel
        }, 0.2);

        // 3. Studio / Tagline fade in
        tl.to([studioText, taglineText], {
          opacity: 1,
          duration: 0.4,
          ease: "power1.inOut"
        }, 0.3);

      }, containerRef);

      return () => ctx.revert();
    };

    runAnimation();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 transition-opacity duration-500 bg-[#0a0a0a] flex flex-col items-center justify-center ${fadeOut ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      <div className="relative w-[380px] md:w-[600px]">
        {/* ── SVG Frame: Back ── */}
        <svg
          className="absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#333333" strokeWidth="0.4" />
        </svg>

        {/* ── SVG Frame: Front ── */}
        <svg
          className="absolute -bottom-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#333333" strokeWidth="0.4" />
        </svg>

        {/* ── Typography Content ── */}
        <div className="relative z-10 flex flex-col items-center py-10 px-4 mt-2">
          <span
            className="logo-studio block text-[24px] md:text-[28px] tracking-[0.15em] mb-1 text-[#cccccc]"
            style={{ fontWeight: 300 }}
          >
            Studio
          </span>
          <div className="flex items-baseline justify-center select-none origin-center letter">
            <span className="block" style={{ fontSize: "clamp(100px, 20vw, 150px)", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>W</span>
            <span className="block" style={{ fontSize: "clamp(100px, 20vw, 150px)", fontWeight: 400, color: "#aaaaaa", lineHeight: 1 }}>n</span>
            <span className="block" style={{ fontSize: "clamp(100px, 20vw, 150px)", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>F</span>
          </div>
          <span
            className="logo-tagline block mt-4 text-[15px] md:text-[18px] tracking-[0.25em] uppercase text-[#aaaaaa]"
          >
            Interior&nbsp;&nbsp;|&nbsp;&nbsp;Architecture
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro5;
