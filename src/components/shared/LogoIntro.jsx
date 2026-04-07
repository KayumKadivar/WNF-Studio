"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro — GSAP-powered animated logo reveal.
 * Letters scatter from random positions and assemble with elastic bounce.
 * SVG frames draw themselves in. Then fades out to reveal hero.
 */
const LogoIntro = ({ onComplete }) => {
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
            // Wait just 400ms before fading out (very fast finish)
            setTimeout(() => {
              if (!cancelled) setFadeOut(true);
            }, 400);
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 900);
          },
        });

        // ─── All animated elements ───
        const studio = containerRef.current.querySelector(".logo-studio");
        const letters = containerRef.current.querySelectorAll(".logo-letter");
        const tagline = containerRef.current.querySelector(".logo-tagline");
        const frames = containerRef.current.querySelectorAll(".frame-path");

        // ─── STEP 1: Set everything invisible ───
        gsap.set([studio, ...letters, tagline], { opacity: 0 });

        // ─── STEP 2: "Studio" fades in + slides down ───
        tl.fromTo(
          studio,
          { y: -30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          0
        );

        // ─── STEP 3: Letters fly in from scattered positions ───
        letters.forEach((letter, i) => {
          const randomX = (Math.random() - 0.5) * 600;
          const randomY = (Math.random() - 0.5) * 400;
          const randomRot = (Math.random() - 0.5) * 360;

          tl.fromTo(
            letter,
            {
              x: randomX,
              y: randomY,
              rotation: randomRot,
              opacity: 0,
              scale: 0.3,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 3.5, // Super slow motion for W n F
              ease: "elastic.out(1, 0.5)",
            },
            0.2 + i * 0.45 // Stagger interval significantly slowed down
          );
        });

        // ─── STEP 4: SVG frames draw in ───
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
            0.5 + i * 0.15
          );
        });

        // ─── STEP 5: Tagline fades up ───
        tl.fromTo(
          tagline,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          1.5 // delayed slightly to match slow letters
        );

        // ─── STEP 6: Settle bounce on letters ───
        tl.to(
          letters,
          {
            y: -6,
            duration: 0.25,
            ease: "power2.out",
            stagger: 0.05,
          },
          3.0 // start bounce after letters arrived
        );
        tl.to(
          letters,
          {
            y: 0,
            duration: 0.4,
            ease: "bounce.out",
            stagger: 0.05,
          },
          3.25
        );
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
      <div className="relative w-[260px] md:w-[340px]">
        {/* ── SVG Frame: Back (offset top-right) ── */}
        <svg
          className="absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#cccccc" strokeWidth="0.4" />
        </svg>

        {/* ── SVG Frame: Front (offset bottom-left) ── */}
        <svg
          className="absolute -bottom-4 -left-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
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

          {/* W n F */}
          <div className="flex items-baseline justify-center select-none">
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>W</span>
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 400, color: "#888888", lineHeight: 1 }}>n</span>
            <span className="logo-letter inline-block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>F</span>
          </div>

          {/* Tagline */}
          <span
            className="logo-tagline block mt-4 text-[13px] md:text-[15px] tracking-[0.25em] uppercase"
            style={{ color: "#888888" }}
          >
            Interior&nbsp;&nbsp;|&nbsp;&nbsp;Architecture
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro;
