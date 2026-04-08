"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro3 — 3rd Demo of GSAP-powered animated logo reveal.
 * Modern 3D Flip & Slide:
 * Letters flip into place using rotateX (3D effect) like a luxury fashion brand.
 * Frames expand from the center outwards. Snappy and stylish.
 */
const LogoIntro3 = ({ onComplete }) => {
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
            }, 800);
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 1300);
          },
        });

        // ─── All animated elements ───
        const studio = containerRef.current.querySelector(".logo-studio");
        const letters = containerRef.current.querySelectorAll(".logo-letter");
        const tagline = containerRef.current.querySelector(".logo-tagline");
        const frameBack = containerRef.current.querySelector(".frame-back");
        const frameFront = containerRef.current.querySelector(".frame-front");

        // Set perspective for 3D parent container
        gsap.set(containerRef.current.querySelector(".wnf-group"), {
          perspective: 800
        });

        // ─── STEP 1: Initial States ───
        gsap.set([studio, tagline], { opacity: 0 });
        gsap.set([frameBack, frameFront], { opacity: 0, scale: 0.5 });

        // Letters start rotated -90deg on X axis (flipped away) and slightly lower
        gsap.set(letters, {
          opacity: 0,
          rotateX: -90,
          y: 40,
          transformOrigin: "center top",
        });

        // ─── STEP 2: 3D Flip Reveal for Letters ───
        tl.to(letters, {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15, // W, then n, then F
        }, 0.2);

        // ─── STEP 3: Frames expand from center ───
        tl.to([frameBack, frameFront], {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.7)",
          stagger: 0.1,
        }, 0.5);

        // ─── STEP 4: "Studio" fades down from above ───
        tl.fromTo(studio, {
          y: -20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 1.0);

        // ─── STEP 5: Tagline fades up from below ───
        tl.fromTo(tagline, {
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 1.2);

      }, containerRef);

      return () => ctx.revert();
    };

    runAnimation();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      <div className="relative w-[280px] md:w-[340px]">
        {/* ── SVG Frame: Back ── */}
        <svg
          className="frame-back absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#cccccc" strokeWidth="0.4" />
        </svg>

        {/* ── SVG Frame: Front ── */}
        <svg
          className="frame-front absolute -bottom-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#cccccc" strokeWidth="0.4" />
        </svg>

        {/* ── Logo Content ── */}
        <div className="relative z-10 flex flex-col items-center py-10 px-4 mt-2">
          {/* Studio */}
          <span
            className="logo-studio block text-[20px] md:text-[24px] tracking-[0.15em] mb-1"
            style={{ color: "#999999", fontWeight: 300 }}
          >
            Studio
          </span>

          {/* W n F Group */}
          <div className="wnf-group flex items-baseline justify-center select-none">
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>W</span>
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 400, color: "#888888", lineHeight: 1 }}>n</span>
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>F</span>
          </div>

          {/* Tagline */}
          <span
            className="logo-tagline block mt-4 text-[13px] md:text-[16px] tracking-[0.25em] uppercase"
            style={{ color: "#888888" }}
          >
            Interior&nbsp;&nbsp;|&nbsp;&nbsp;Architecture
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro3;
