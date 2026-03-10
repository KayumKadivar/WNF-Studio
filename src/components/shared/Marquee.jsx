"use client";
import { motion } from "framer-motion";

export default function Marquee({ text, repetition = 10, className = "" }) {
  // We repeat the text multiple times to ensure there's enough content to scroll infinitely without gaps
  const words = Array(repetition).fill(text);

  return (
    <div className={`relative flex overflow-x-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap min-w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Adjust this value to change scroll speed
        }}
      >
        {/* We need two duplicated sets of the items to loop seamlessly */}
        <div className="flex shrink-0 px-4 items-center gap-12 sm:gap-24">
          {words.map((word, idx) => (
             <span key={`first-${idx}`} className="text-4xl md:text-6xl font-display uppercase tracking-widest text-transparent" style={{ WebkitTextStroke: '1px currentColor' }}>
               {word}
             </span>
          ))}
        </div>
        <div className="flex shrink-0 px-4 items-center gap-12 sm:gap-24">
          {words.map((word, idx) => (
             <span key={`second-${idx}`} className="text-4xl md:text-6xl font-display uppercase tracking-widest text-transparent" style={{ WebkitTextStroke: '1px currentColor' }}>
               {word}
             </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
