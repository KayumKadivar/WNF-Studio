"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Calendar, Ruler, Building, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// ─── Easing Curves ───────────────────────────────────────────────────────────
const EASE_SMOOTH = [0.22, 1, 0.36, 1];
const EASE_SPRING = { type: "spring", stiffness: 300, damping: 30 };
const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

// ─── Shimmer Skeleton ────────────────────────────────────────────────────────
const ShimmerSkeleton = () => (
  <motion.div
    className="absolute inset-0 bg-stone-200 overflow-hidden rounded-sm"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

// ─── Square/Uniform Image Card ───────────────────────────────────────────────
// All gallery images rendered in a fixed aspect ratio box — NO layout shift
const ImageCard = ({ src, alt, onClick, className = "", index = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.85, ease: EASE_SMOOTH }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_EXPO_OUT } }}
      onClick={onClick}
      className={`relative cursor-zoom-in overflow-hidden border border-stone-200 bg-stone-100 group ${className}`}
    >
      <AnimatePresence>{!loaded && !error && <ShimmerSkeleton />}</AnimatePresence>

      {!error ? (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="w-full h-auto transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
          Image unavailable
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── Hero Image (full-width, fixed height) ───────────────────────────────────
const HeroImage = ({ src, alt, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 1.1, ease: EASE_SMOOTH }}
      onClick={onClick}
      className="relative w-full overflow-hidden border border-stone-200 cursor-zoom-in group"
    >
      <AnimatePresence>{!loaded && <ShimmerSkeleton />}</AnimatePresence>
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
      />
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F8F6]/60 to-transparent pointer-events-none" />
      {/* Zoom hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.2em] text-stone-500 uppercase bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-stone-200"
      >
        Click to expand
      </motion.div>
    </motion.div>
  );
};

// ─── Lightbox ────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const Lightbox = ({ images, index, onClose, onPrev, onNext, direction }) => {
  const canPrev = index > 0;
  const canNext = index < images.length - 1;

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
      role="dialog"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ delay: 0.30, duration: 0.9, ease: EASE_SMOOTH }}
        whileHover={{ scale: 1.15, rotate: 90 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-[210] w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X size={18} />
      </motion.button>

      {/* Prev */}
      <AnimatePresence>
        {canPrev && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 z-[210] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image area */}
      <div
        className="relative w-full max-w-7xl h-[95vh] flex items-center justify-center px-20 md:px-28 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.6, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.4 },
            }}
            src={images[index]}
            alt={`Image ${index + 1}`}
            className="max-w-full max-h-[78vh] object-contain shadow-2xl bg-white/5 p-1"
            style={{ borderRadius: 2 }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Next */}
      <AnimatePresence>
        {canNext && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 z-[210] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Counter + dots */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === index ? 24 : 6,
                  backgroundColor: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                }}
                transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProjectDetailPage({ project, allProjects }) {
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [direction, setDirection] = useState(0);

  const currentIndex = allProjects?.findIndex((p) => p.id === project.id) ?? -1;
  const prevProject = allProjects?.[currentIndex - 1];
  const nextProject = allProjects?.[currentIndex + 1];

  const allImages = [project.mainImage, ...(project.gallery || [])].filter(Boolean);

  const openAt = useCallback((i) => {
    setDirection(0);
    setLightboxIdx(i);
  }, []);

  const closeLight = useCallback(() => setLightboxIdx(-1), []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIdx((p) => Math.max(0, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightboxIdx((p) => Math.min(allImages.length - 1, p + 1));
  }, [allImages.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIdx < 0) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeLight();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, goPrev, goNext, closeLight]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxIdx >= 0 ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const dataItems = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Timeline", value: project.year },
    { icon: Ruler, label: "Dimensions", value: project.size },
    { icon: Building, label: "Partner", value: project.client },
  ];

  // ── Gallery layout: first image wide, rest 2-col grid ────────────────────
  const gallery = project.gallery || [];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200">

      {/* ══ HERO ══ */}
      <section className="pt-28 pb-0 px-6 lg:px-12">
        {/* Title */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SMOOTH }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-light uppercase tracking-tight leading-none text-stone-900"
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Hero Image */}
        <HeroImage
          src={project.mainImage}
          alt={project.title}
          onClick={() => openAt(0)}
        />
      </section>

      {/* ══ DATA GRID ══ */}
      <section className="px-6 lg:px-12 py-16 bg-white border-y border-stone-200">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          {dataItems.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SMOOTH } },
              }}
              className="p-8 border-stone-200 border-r last:border-r-0 border-b md:border-b-0 hover:bg-stone-50 transition-colors duration-400 group"
            >
              <div className="flex items-center gap-2 mb-5">
                <item.icon className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors duration-300" />
                <span className="text-[13px] font-mono text-stone-400 uppercase tracking-[0.2em]">
                  {item.label}
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium uppercase text-stone-800 truncate">
                {item.value || "—"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══ DESCRIPTION ══ */}
      <section className="py-24 px-6 lg:px-12 border-b border-stone-200">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-8 h-[2px] bg-stone-400 mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.1 }}
            className="text-[clamp(1.4rem,3vw,2.8rem)] font-light leading-[1.3] tracking-tight text-stone-700"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      {gallery.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-stone-50 border-b border-stone-200">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="font-mono text-[13px] uppercase tracking-[0.3em] text-stone-400">
              Project Gallery
            </h2>
            <span className="font-mono text-[13px] text-stone-400 tracking-widest">
              {gallery.length} Images
            </span>
          </motion.div>

          {/* ── Uniform 2-column grid – all images same aspect ratio 4/3 ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* If first image is alone (odd count), make it full-width */}
            {gallery.map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                index={i}
                onClick={() => openAt(i + 1)}
                /* Full-width if first item AND odd total */
                className={i === 0 && gallery.length % 2 !== 0 ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </section>
      )}

      {/* ══ LIGHTBOX ══ */}
      <AnimatePresence>
        {lightboxIdx >= 0 && (
          <Lightbox
            images={allImages}
            index={lightboxIdx}
            direction={direction}
            onClose={closeLight}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>

      {/* ══ PROJECT NAVIGATION ══ */}
      <motion.section
        className="flex border-t border-stone-200 bg-[#F9F8F6]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
      >
        {/* Prev */}
        <Link
          href={prevProject ? `/projects/${prevProject.id}` : "#"}
          className={`group flex-1 flex flex-col justify-center gap-2 px-6 md:px-12 py-10 border-r border-stone-200 transition-colors duration-400 ${prevProject ? "hover:bg-stone-100/80 cursor-pointer" : "opacity-30 pointer-events-none"
            }`}
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            className="font-mono text-[10px] md:text-[16px] text-stone-400 uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors"
          >
            ← Previous
          </motion.span>
          <h4 className="text-base md:text-2xl font-light uppercase text-stone-800 line-clamp-1 group-hover:-translate-x-1 transition-transform duration-400">
            {prevProject?.title || "—"}
          </h4>
        </Link>

        {/* Next */}
        <Link
          href={nextProject ? `/projects/${nextProject.id}` : "#"}
          className={`group flex-1 flex flex-col justify-center items-end gap-2 px-6 md:px-12 py-10 transition-colors duration-400 text-right ${nextProject ? "hover:bg-stone-100/80 cursor-pointer" : "opacity-30 pointer-events-none"
            }`}
        >
          <motion.span
            className="font-mono text-[10px] md:text-[16px] text-stone-400 uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors"
          >
            Next →
          </motion.span>
          <h4 className="text-base md:text-2xl font-light uppercase text-stone-800 line-clamp-1 group-hover:translate-x-1 transition-transform duration-400">
            {nextProject?.title || "—"}
          </h4>
        </Link>
      </motion.section>
    </div>
  );
}