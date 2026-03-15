"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force a slightly longer delay to show the animation properly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1212]"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Logo */}
            <div className="relative overflow-hidden">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }}
                className="flex items-center gap-4"
              >
                <Image
                  src="/assets/studio-wnf-logo.webp"
                  alt="Studio WnF"
                  width={120}
                  height={48}
                  priority
                  className="h-12 w-auto object-contain invert"
                />
              </motion.div>
              
              {/* Animated reveal bar like Vivify */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  delay: 0.5 
                }}
                className="absolute -bottom-4 left-0 right-0 h-[2px] bg-primary origin-left"
              />
            </div>

            {/* Sophisticated Text Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 overflow-hidden"
            >
              <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-medium">
                Architecture & Interior Design
              </p>
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-10 left-10 w-12 h-12 border-t border-l border-white/10" 
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-10 right-10 w-12 h-12 border-r border-b border-white/10" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
