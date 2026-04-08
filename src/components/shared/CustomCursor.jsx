"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Real mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for magnetic trailing ring
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);
  const pathname = usePathname();

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isMobile) return;
    
    let interactables = [];
    
    const attachListeners = () => {
      interactables = document.querySelectorAll(
        'a, button, input, textarea, select, label, [role="button"], [role="link"], .cursor-pointer'
      );

      const handleEnter = () => setIsHovering(true);
      const handleLeave = () => setIsHovering(false);

      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
        el._cursorEnter = handleEnter;
        el._cursorLeave = handleLeave;
      });
    };

    const timer = setTimeout(attachListeners, 500);

    return () => {
      clearTimeout(timer);
      interactables.forEach((el) => {
        if (el._cursorEnter) el.removeEventListener("mouseenter", el._cursorEnter);
        if (el._cursorLeave) el.removeEventListener("mouseleave", el._cursorLeave);
      });
    };
  }, [pathname, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, input, select, textarea, .cursor-pointer {
            cursor: none !important;
          }
        }
      `}} />
      
      {/* Exact Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-primary)] rounded-full pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          opacity: isHovering ? 0 : 1, // hide inner dot on hover
        }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[var(--color-primary)] rounded-full pointer-events-none z-[99998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(180, 120, 40, 0.15)" : "rgba(180, 120, 40, 0)", 
        }}
        transition={{ scale: { duration: 0.2, ease: "backOut" } }}
      />
    </>
  );
};

export default CustomCursor;
