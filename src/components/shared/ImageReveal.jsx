"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function ImageReveal({ src, alt, className = "", imgClassName = "" }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: image moves slightly up as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* The solid colored mask block that slides away */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isInView ? "100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-10 bg-foreground pointer-events-none"
      />
      
      {/* The actual image with parallax */}
      <motion.div style={{ y, height: "120%", top: "-10%" }} className="relative w-full">
         <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}
