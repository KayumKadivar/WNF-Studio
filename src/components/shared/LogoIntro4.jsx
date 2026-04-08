"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro4 — 4th Demo of GSAP-powered animated logo reveal.
 * Elegant Mask Wipe (Clip-Path):
 * Letters don't fly in; instead, they wipe into existence smoothly using clip-path.
 * Gives a very clean, stationary, and premium architectural feel.
 */
const LogoIntro4 = ({ onComplete }) => {
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
        const frames = containerRef.current.querySelectorAll(".frame-path");
        const wnfGroup = containerRef.current.querySelector(".wnf-group");

        // ─── STEP 1: Initial States ───
        // We use clipPath inset: inset(top right bottom left)
        // Hidden state: 100% clip from bottom means fully hidden
        gsap.set(studio, { opacity: 0, y: 15 });
        gsap.set(tagline, { opacity: 0, clipPath: "inset(0 50% 0 50%)" }); // hidden from center horizontally
        gsap.set(wnfGroup, { scale: 0.95 });

        gsap.set(letters[0], { clipPath: "inset(100% 0 0 0)" }); // hidden bottom-to-top
        gsap.set(letters[1], { clipPath: "inset(0 0 100% 0)" }); // hidden top-to-bottom
        gsap.set(letters[2], { clipPath: "inset(100% 0 0 0)" }); // hidden bottom-to-top

        // ─── STEP 2: Wipe Reveal Letters ───
        // Wipes from bottom for W and F, from top for n
        tl.to(letters, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          stagger: 0.2,
        }, 0.2);

        // Group slightly scales up to 1 for a subtle "breathing" effect while revealing
        tl.to(wnfGroup, {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }, 0);

        // ─── STEP 3: "Studio" emerges ───
        tl.to(studio, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }, 1.2);

        // ─── STEP 4: Frames wipe in ───
        // Draw frames in properly
        frames.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            0.8
          );
        });

        // ─── STEP 5: Tagline reveals from center outwards ───
        tl.to(tagline, {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.inOut",
        }, 1.5);

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
          className="frame-svg-back absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#cccccc" strokeWidth="0.4" />
        </svg>

        {/* ── SVG Frame: Front ── */}
        <svg
          className="frame-svg-front absolute -bottom-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
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
          <div className="wnf-group flex items-baseline justify-center select-none origin-center">
            {/* Display block needed for clipPath on spans */}
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>W</span>
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 400, color: "#888888", lineHeight: 1 }}>n</span>
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>F</span>
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

export default LogoIntro4;
