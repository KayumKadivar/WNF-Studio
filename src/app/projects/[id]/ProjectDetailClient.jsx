"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Calendar, Ruler, Building, X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Shared Easing Curves ───────────────────────────────────────────────────
const EASE_SMOOTH = [0.22, 1, 0.36, 1];       // Smooth deceleration (Apple-like)
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];      // Fast start, very slow end
const EASE_OUT_QUINT = [0.23, 1, 0.32, 1];    // Ultra gentle stop

// ─── Reusable Variant Presets ───────────────────────────────────────────────
const fadeUp = (delay = 0, distance = 30) => ({
  initial: { opacity: 0, y: distance, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.9, ease: EASE_SMOOTH },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.7, ease: "easeOut" },
});

const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// ─── Shimmer Skeleton ───────────────────────────────────────────────────────
const ShimmerSkeleton = () => (
  <motion.div
    className="absolute inset-0 bg-stone-200 overflow-hidden"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: EASE_SMOOTH }}
    aria-hidden="true"
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

// ─── AnimatedImage ──────────────────────────────────────────────────────────
export const AnimatedImage = ({ src, alt, className, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence>
        {!isLoaded && !hasError && <ShimmerSkeleton />}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0, scale: 1.06, filter: "blur(16px)" }}
        animate={
          isLoaded
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 1.06, filter: "blur(16px)" }
        }
        transition={{ duration: 1.1, ease: EASE_SMOOTH }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{ display: "block", minHeight: isLoaded ? "auto" : "200px" }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.05) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </div>
  );
};

// ─── ProjectDetailClient ────────────────────────────────────────────────────
export default function ProjectDetailClient({ project, allProjects }) {
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [direction, setDirection] = useState(0);

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[currentIndex - 1];
  const nextProject = allProjects[currentIndex + 1];

  const allImages = [project.mainImage, ...(project.gallery || [])].filter(Boolean);
  const selectedImage = selectedIdx >= 0 ? allImages[selectedIdx] : null;

  const openImage = useCallback((imgOrIdx) => {
    if (typeof imgOrIdx === "number") {
      setSelectedIdx(imgOrIdx);
    } else {
      const idx = allImages.indexOf(imgOrIdx);
      setSelectedIdx(idx >= 0 ? idx : 0);
    }
  }, [allImages]);

  const closeImage = useCallback(() => setSelectedIdx(-1), []);

  const handlePrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setSelectedIdx((prev) => (prev < allImages.length - 1 ? prev + 1 : prev));
  }, [allImages.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx < 0) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, handlePrevImage, handleNextImage, closeImage]);

  // Lock body scroll
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  // ─── Slide Variants for Lightbox ────────────────────────────────────────
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      filter: "blur(8px)",
    }),
  };

  const dataItems = [
    { icon: MapPin, label: "LOCATION", value: project.location },
    { icon: Calendar, label: "TIMELINE", value: project.year },
    { icon: Ruler, label: "DIMENSIONS", value: project.size },
    { icon: Building, label: "PARTNER", value: project.client },
  ];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative pt-28 pb-12 px-6 lg:px-12 border-b border-stone-200 overflow-hidden">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ x: -40, opacity: 0, filter: "blur(8px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: EASE_SMOOTH }}
              className="max-w-5xl"
            >
              <h1 className="display-title-responsive uppercase">
                {project.title}
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: EASE_SMOOTH }}
            className="w-full border border-stone-200 bg-stone-100 overflow-hidden cursor-zoom-in"
            onClick={() => openImage(0)}
          >
            <AnimatedImage
              src={project.mainImage}
              alt={project.title}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════ DATA GRID — Smooth Stagger ═══════ */}
      <section className="px-6 lg:px-12 py-16 bg-white border-b border-stone-200">
        <motion.div
          className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-stone-200"
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {dataItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: EASE_SMOOTH },
                },
              }}
              className="p-8 border-stone-200 border-b md:border-b-0 md:border-r last:border-r-0 hover:bg-stone-50 transition-all duration-500 ease-out"
            >
              <motion.div
                className="flex items-center gap-2 mb-6"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: EASE_SMOOTH },
                  },
                }}
              >
                <item.icon className="w-4 h-4 text-stone-400" />
                <span className="text-[14px] font-mono text-stone-500 font-medium uppercase tracking-widest">
                  {item.label}
                </span>
              </motion.div>
              <motion.p
                className="text-xl font-medium uppercase truncate text-stone-800"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_SMOOTH, delay: 0.05 },
                  },
                }}
              >
                {item.value || "—"}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════ CORE CONTENT — Elegant Reveal ═══════ */}
      <section className="py-24 px-6 lg:px-12 border-b border-stone-200 overflow-hidden">
        <motion.div
          className="max-w-7xl"
          {...fadeUp(0, 50)}
          whileInView={fadeUp(0, 50).animate}
          initial={fadeUp(0, 50).initial}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: EASE_SMOOTH }}
        >
          <motion.p
            className="text-3xl md:text-5xl font-light leading-[1.2] tracking-tight text-balance text-stone-800"
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2, duration: 1, ease: EASE_SMOOTH }}
          >
            {project.description}
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════ GALLERY — Smooth Masonry ═══════ */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50">
        <div className="mx-auto">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {project.gallery?.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.96, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.9,
                  ease: EASE_SMOOTH,
                }}
                whileHover={{
                  scale: 0.985,
                  y: -4,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                  transition: { duration: 0.5, ease: EASE_OUT_QUINT },
                }}
                onClick={() => openImage(i + 1)}
                className="break-inside-avoid bg-white p-2 border border-stone-200 cursor-zoom-in inline-block w-full overflow-hidden"
              >
                <AnimatedImage
                  src={img}
                  alt={`Gallery view ${i + 1}`}
                  className="w-full h-auto object-contain bg-stone-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ IMAGE MODAL — Premium Lightbox ═══════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            onClick={closeImage}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            {/* Prev Button — hidden on first image */}
            {allImages.length > 1 && selectedIdx > 0 && (
              <motion.button
                onClick={handlePrevImage}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE_SMOOTH }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 md:left-10 z-[110] text-white/50 hover:text-white transition-colors duration-300 p-2 md:p-4 rounded-full"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </motion.button>
            )}

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeImage}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.2, duration: 0.4, ease: EASE_SMOOTH }}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 md:-top-12 md:right-0 text-white/70 hover:text-white transition-colors duration-300 p-2 z-[120]"
              >
                <X size={36} strokeWidth={1.5} />
              </motion.button>

              {/* Sliding Image with Crossfade + Blur */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={selectedIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.5, ease: EASE_SMOOTH },
                    opacity: { duration: 0.4, ease: EASE_SMOOTH },
                    scale: { duration: 0.5, ease: EASE_SMOOTH },
                    filter: { duration: 0.5, ease: EASE_SMOOTH },
                  }}
                  src={selectedImage}
                  alt="Project Preview"
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl bg-white p-1 absolute"
                />
              </AnimatePresence>
            </motion.div>

            {/* Next Button — hidden on last image */}
            {allImages.length > 1 && selectedIdx < allImages.length - 1 && (
              <motion.button
                onClick={handleNextImage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE_SMOOTH }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 md:right-10 z-[110] text-white/50 hover:text-white transition-colors duration-300 p-2 md:p-4 rounded-full"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </motion.button>
            )}

            {/* Image Counter with smooth number transition */}
            {allImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.35, duration: 0.5, ease: EASE_SMOOTH }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110]"
              >
                <span className="font-mono text-xs text-white/40 tracking-[0.3em]">
                  {selectedIdx + 1} / {allImages.length}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ NAVIGATION — Smooth Slide-In ═══════ */}
      <motion.section
        className="flex flex-row border-t border-stone-200 bg-[#F9F8F6]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
      >
        <Link
          href={prevProject ? `/projects/${prevProject.id}` : "#"}
          className="group flex-1 flex flex-col justify-center px-4 py-8 md:px-12 md:py-10 hover:bg-stone-100/80 transition-all duration-500 ease-out border-r border-stone-200"
        >
          <motion.span
            className="font-mono text-[10px] md:text-[14px] text-stone-500 font-medium mb-1 md:mb-2 inline-block"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_SMOOTH }}
          >
            ← PREV
          </motion.span>
          <motion.h4
            className="text-sm md:text-2xl font-light uppercase text-stone-800 line-clamp-1 group-hover:translate-x-2 transition-transform duration-500 ease-out"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE_SMOOTH }}
          >
            {prevProject?.title || "END"}
          </motion.h4>
        </Link>

        <Link
          href={nextProject ? `/projects/${nextProject.id}` : "#"}
          className="group flex-1 flex flex-col justify-center px-4 py-8 md:px-12 md:py-10 hover:bg-stone-100/80 transition-all duration-500 ease-out text-right"
        >
          <motion.span
            className="font-mono text-[10px] md:text-[14px] text-stone-500 font-medium mb-1 md:mb-2 inline-block"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_SMOOTH }}
          >
            NEXT →
          </motion.span>
          <motion.h4
            className="text-sm md:text-2xl font-light uppercase text-stone-800 line-clamp-1 group-hover:-translate-x-2 transition-transform duration-500 ease-out"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE_SMOOTH }}
          >
            {nextProject?.title || "END"}
          </motion.h4>
        </Link>
      </motion.section>
    </div>
  );
}