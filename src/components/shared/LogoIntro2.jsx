"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro2 — 2nd Demo of GSAP-powered animated logo reveal.
 * Cinematic Reveal: 
 * Elements start huge and blurred, then smoothly scale down into place.
 * High-end architectural feel, slower and more sophisticated.
 */
const LogoIntro2 = ({ onComplete }) => {
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
            // Hold for a moment to let the user see the assembled logo
            setTimeout(() => {
              if (!cancelled) setFadeOut(true);
            }, 1000); // 1s hold
            // Trigger the transition to the main content
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 1500); // after fade out completes
          },
        });

        // ─── All animated elements ───
        const studio = containerRef.current.querySelector(".logo-studio");
        const letters = containerRef.current.querySelectorAll(".logo-letter");
        const tagline = containerRef.current.querySelector(".logo-tagline");
        const frames = containerRef.current.querySelectorAll(".frame-path");
        const wnfGroup = containerRef.current.querySelector(".wnf-group");

        // ─── STEP 1: Initial States ───
        // Hide frames and tagline initially
        gsap.set([tagline], { opacity: 0, y: 20 });

        // "Studio" starts with very wide letter spacing and blurry
        gsap.set(studio, {
          opacity: 0,
          letterSpacing: "0.8em",
          filter: "blur(10px)"
        });

        // W n F starts massive, spaced out, and blurry
        gsap.set(wnfGroup, {
          scale: 2.5,
        });

        // Individual letters
        gsap.set(letters, {
          opacity: 0,
          filter: "blur(20px)",
        });
        gsap.set(letters[0], { x: -100, y: 50 }); // W
        gsap.set(letters[1], { y: -80 });         // n
        gsap.set(letters[2], { x: 100, y: 50 });  // F

        // ─── STEP 2: Animate W, n, F in with Cinematic Scale Down ───
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
            0.5
          );
        });

        // 2. Letters unblur and scale down
        tl.to(letters, {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.inOut",
          stagger: 0.15,
        }, 0.2);

        // Bring group down to normal size
        tl.to(wnfGroup, {
          scale: 1,
          duration: 2.2,
          ease: "power4.inOut",
        }, 0);

        // ─── STEP 3: "Studio" fades in and tightens letter spacing ───
        tl.to(studio, {
          opacity: 1,
          letterSpacing: "0.15em",
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        }, 1.2);

        // ─── STEP 5: Tagline slowly fades up ───
        tl.to(tagline, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }, 2.0);

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
        {/* ── SVG Frame: Back ── */}
        <svg
          className="absolute -top-5 -right-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
        >
          <rect className="frame-path" x="0.5" y="0.5" width="99" height="99" stroke="#cccccc" strokeWidth="0.4" />
        </svg>

        {/* ── SVG Frame: Front ── */}
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

          {/* W n F Group */}
          <div className="wnf-group flex items-baseline justify-center select-none origin-center">
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

export default LogoIntro2;
