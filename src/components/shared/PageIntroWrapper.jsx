"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PageIntroWrapper({ type, children }) {
  const [showIntro, setShowIntro] = useState(type === "home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (type === "home") {
      const timer = setTimeout(() => {
        setShowIntro(false);
        setIsLoaded(true);
      }, 2500); // Show intro for 2.5 seconds
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [type]);

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
                alt="WNF Studio"
                width={300}
                height={150}
                className="w-auto h-32 md:h-48 object-contain"
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
