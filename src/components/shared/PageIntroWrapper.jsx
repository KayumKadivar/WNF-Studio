"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PageIntroWrapper({ type, children }) {
  const alreadyPlayed = typeof window !== 'undefined' && sessionStorage.getItem('pageIntroPlayed');
  const [showIntro, setShowIntro] = useState(type === "home" && !alreadyPlayed);
  const [isLoaded, setIsLoaded] = useState(alreadyPlayed ? true : false);

  useEffect(() => {
    if (type === "home" && !alreadyPlayed) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        setIsLoaded(true);
        sessionStorage.setItem('pageIntroPlayed', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [type, alreadyPlayed]);

  if (type !== "home") {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-100 bg-white flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image
                src="/assets/logo/animatedlogo.png"
                alt="WNF  Design Studio"
                width={500}
                height={500}
                className="w-auto h-80 md:h-[32rem] object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  );
}
