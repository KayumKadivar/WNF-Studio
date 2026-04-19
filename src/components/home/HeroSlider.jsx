"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slides } from "@/data/slides";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-dvh w-full overflow-hidden" aria-label="Hero slideshow" aria-roledescription="carousel">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) =>
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
              <div className="relative h-full container mx-auto px-6 lg:px-12 flex items-center">
                <div className="max-w-3xl pt-20">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-6 block">
                    {slide.label}
                  </motion.div>
                  <h1 className="display-title-responsive !text-white mb-6 overflow-hidden flex flex-wrap">
                    {slide.title.split(" ").map((word, wordIdx) => (
                      <span key={wordIdx} className="overflow-hidden inline-flex mr-4">
                        <motion.span
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.33, 1, 0.68, 1], // Custom easing for smooth pop up
                            delay: 0.4 + wordIdx * 0.1,
                          }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </h1>
                  <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + slide.title.split(" ").length * 0.1, duration: 0.6 }} className="body-lg text-white/80 mb-10 max-w-xl">
                    {slide.description}
                  </motion.p>
        
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

   

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 flex gap-3">
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`h-1 transition-all duration-500 ${index === currentSlide ? "w-12 bg-primary-foreground" : "w-6 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-primary-foreground/40" />
      </motion.div>
    </section>
  );
};

export default HeroSlider;
