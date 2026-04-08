"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LogoIntro6 — 6th Demo of GSAP-powered animated logo reveal.
 * Zero-Gravity Fly-Through (Cinematic 3D Camera):
 * - Logo starts tiny and distant, tilted in 3D zero-gravity space.
 * - Slowly floats towards the camera, snapping into perfect alignment.
 * - After a brief hold, the camera accelerates and flies THROUGH the logo.
 */
const LogoIntro6 = ({ onComplete }) => {
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
            }, 100);
            setTimeout(() => {
              if (!cancelled) onComplete?.();
            }, 600);
          },
        });

        const wrapper = containerRef.current.querySelector(".logo-3d-wrapper");
        const wnfGroup = containerRef.current.querySelector(".wnf-group");
        const studioText = containerRef.current.querySelector(".logo-studio");
        const taglineText = containerRef.current.querySelector(".logo-tagline");
        const frames = containerRef.current.querySelectorAll(".frame-path");

        // Set perspective so 3D rotations look realistic
        gsap.set(containerRef.current, { perspective: 800 });

        // ─── STEP 1: Initial State ───
        // Entire wrapper is tiny, slightly tilted in 3D
        gsap.set(wrapper, {
          scale: 0.05,
          opacity: 0,
          rotateX: 30,
          rotateY: -40,
          rotateZ: 10,
          transformOrigin: "center center"
        });

        // Hide text initially so only structure is visible
        gsap.set([studioText, taglineText], { opacity: 0 });

        // ─── STEP 2: Float towards camera & align ───
        tl.to(wrapper, {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 2.2,
          ease: "expo.out"
        }, 0);

        // SVG Frames draw in while floating
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

        // Secondary text fades in as it approaches
        tl.to([studioText, taglineText], {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        }, 1.2);

        // ─── STEP 3: Hold and breathe ───
        // Very subtle continuous scale to mimic floating/breathing
        tl.to(wrapper, {
          scale: 1.05,
          duration: 1.5,
          ease: "none"
        }, 2.2);

        // ─── STEP 4: Cinematic Fly-Through (Camera passes through the logo) ───
        tl.to(wrapper, {
          scale: 30,           // Massive scale creates fly-through illusion
          opacity: 0,          // Fades out as we pass "through" it
          duration: 1.0,
          ease: "power4.in"    // Accelerates rapidly into the camera
        }, 3.0);

      }, containerRef);

      return () => ctx.revert();
    };

    runAnimation();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 overflow-hidden ${fadeOut ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      <div className="logo-3d-wrapper relative w-[280px] md:w-[340px] will-change-transform">
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
          <span
            className="logo-studio block text-[20px] md:text-[24px] tracking-[0.15em] mb-1"
            style={{ color: "#999999", fontWeight: 300 }}
          >
            Studio
          </span>

          <div className="wnf-group flex items-baseline justify-center select-none origin-center">
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>W</span>
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 400, color: "#888888", lineHeight: 1 }}>n</span>
            <span className="logo-letter block" style={{ fontSize: "clamp(70px, 12vw, 110px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1 }}>F</span>
          </div>

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

export default LogoIntro6;
