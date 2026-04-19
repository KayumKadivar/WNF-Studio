"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Ruler, Building, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// ─── Shimmer Skeleton ────────────────────────────────────────────────────────
const ShimmerSkeleton = () => (
  <motion.div
    className="absolute inset-0 bg-stone-200 overflow-hidden"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

// ─── Gallery Image Card ───────────────────────────────────────────────────────
const ImageCard = ({ src, alt, onClick, className = "", index = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: EASE_SMOOTH }}
      whileHover={{ y: -4, transition: { duration: 0.35 } }}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      className={`relative cursor-zoom-in overflow-hidden border border-stone-200 bg-stone-100 group ${className}`}
    >
      <AnimatePresence>{!loaded && !error && <ShimmerSkeleton />}</AnimatePresence>

      {!error ? (
        <motion.img
          ref={(el) => { if (el?.complete) setLoaded(true); }}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
          Image unavailable
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transform">
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Hero Image ───────────────────────────────────────────────────────────────
const HeroImage = ({ src, alt, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 1, ease: EASE_SMOOTH }}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      className="relative w-full overflow-hidden border border-stone-200 cursor-zoom-in group"
    >
      <AnimatePresence>{!loaded && <ShimmerSkeleton />}</AnimatePresence>
      <motion.img
        ref={(el) => { if (el?.complete) setLoaded(true); }}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
      />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F9F8F6]/60 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.18em] uppercase text-stone-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-stone-200"
      >
        Click to expand
      </motion.div>
    </motion.div>
  );
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, index, onClose, onPrev, onNext, direction }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const canPrev = index > 0;
  const canNext = index < images.length - 1;

  useEffect(() => {
    setImgLoaded(false);
  }, [index]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0, scale: 0.96 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-black/97 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        onClick={onClose}
        className="absolute top-5 right-5 z-[210] w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X size={17} />
      </motion.button>

      {/* Prev arrow */}
      <AnimatePresence>
        {canPrev && (
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 md:left-6 z-[210] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image container — full screen */}
      <div
        className="relative w-full h-full flex items-center justify-center px-16 md:px-24 py-16 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center justify-center w-full h-full"
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/60"
                />
              </div>
            )}
            <img
              src={images[index]}
              alt={`Image ${index + 1}`}
              onLoad={() => setImgLoaded(true)}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain select-none"
              style={{
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.4s ease",
                borderRadius: 2,
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next arrow */}
      <AnimatePresence>
        {canNext && (
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 md:right-6 z-[210] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dots + counter */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.15 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <div className="flex gap-1.5 items-center">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => { e.stopPropagation(); /* jump to i */ }}
                animate={{
                  width: i === index ? 22 : 6,
                  backgroundColor:
                    i === index
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.22)",
                }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                className="h-1.5 rounded-full cursor-pointer border-0 p-0"
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/30">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage({ project, allProjects }) {
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [direction, setDirection] = useState(0);

  const sortedProjects = [...(allProjects || [])].sort((a, b) => a.id - b.id);
  const currentIndex = sortedProjects.findIndex((p) => p.id === project.id);
  const prevProject = sortedProjects[currentIndex - 1];
  const nextProject = sortedProjects[currentIndex + 1];

  // All images: hero first, then gallery
  const allImages = [project.mainImage, ...(project.gallery || [])].filter(Boolean);
  const gallery = project.gallery || [];

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

  // Keyboard navigation
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

  // Body scroll lock when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx >= 0 ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const metaItems = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Timeline", value: project.year },
    { icon: Ruler, label: "Dimensions", value: project.size },
    { icon: Building, label: "Partner", value: project.client },
  ];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200">

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 px-6 lg:px-12">
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
            className="text-[clamp(2rem,7vw,4rem)] font-light uppercase tracking-tight leading-none text-stone-900"
          >
            {project.title}
          </motion.h1>
        </div>

        <HeroImage
          src={project.mainImage}
          alt={project.title}
          onClick={() => openAt(0)}
        />
      </section>

      {/* ── META GRID ── */}
      <section className="px-6 lg:px-12 py-0 bg-white border-y border-stone-200 mt-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
        >
          {metaItems.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SMOOTH } },
              }}
              className="p-6 md:p-8 border-stone-200 border-r last:border-r-0 border-b md:border-b-0 hover:bg-stone-50 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <item.icon className="w-3 h-3 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-[0.2em]">
                  {item.label}
                </span>
              </div>
              <p className="text-base md:text-lg font-medium uppercase text-stone-800 truncate">
                {item.value || "—"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── DESCRIPTION & CHALLENGE ── */}
      <section className="py-16 px-6 lg:px-12 border-b border-stone-200">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
            className="text-[clamp(1.3rem,3vw,2.4rem)] font-light leading-[1.35] tracking-tight text-stone-600 mb-16"
          >
            {project.description}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400 mb-6">The Challenge</h3>
                <p className="text-lg text-stone-700 leading-relaxed font-light italic">
                  "{project.challenge}"
                </p>
              </motion.div>
            )}
            
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400 mb-6">The Solution</h3>
                <p className="text-lg text-stone-700 leading-relaxed font-light">
                  {project.solution}
                </p>
              </motion.div>
            )}
          </div>

          {project.features && project.features.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-20 pt-12 border-t border-stone-100"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400 mb-8">Key Features</h3>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span className="text-stone-600 font-light tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      {gallery.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-stone-50 border-b border-stone-200">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400">
              Project Gallery
            </h2>
            <span className="font-mono text-[11px] text-stone-400 tracking-widest">
              {gallery.length} Images
            </span>
          </motion.div>

   
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {gallery.map((img, i) => {
              const isWide = i === 0 && gallery.length % 2 !== 0;
              return (
                <ImageCard
                  key={i}
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  index={i}
                  onClick={() => openAt(i + 1)} // +1 because index 0 = hero
                  className={`
                    ${isWide ? "md:col-span-2" : ""}
                    ${isWide ? "aspect-[21/9]" : "aspect-[4/3]"}
                  `}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ── */}
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

      {/* ── PROJECT NAV ── */}
      <motion.section
        className="flex border-t border-stone-200 bg-[#F9F8F6]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      >
        <Link
          href={prevProject ? `/projects/${prevProject.id}` : "#"}
          className={`group flex-1 flex flex-col justify-center gap-1.5 px-6 md:px-12 py-10 border-r border-stone-200 transition-colors duration-300 ${
            prevProject
              ? "hover:bg-stone-100/70 cursor-pointer"
              : "opacity-25 pointer-events-none"
          }`}
        >
          <span className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors">
            ← Previous
          </span>
          <h4 className="text-base md:text-xl font-light uppercase text-stone-800 line-clamp-1 group-hover:-translate-x-1 transition-transform duration-300">
            {prevProject?.title || "—"}
          </h4>
        </Link>

        <Link
          href={nextProject ? `/projects/${nextProject.id}` : "#"}
          className={`group flex-1 flex flex-col justify-center items-end gap-1.5 px-6 md:px-12 py-10 transition-colors duration-300 text-right ${
            nextProject
              ? "hover:bg-stone-100/70 cursor-pointer"
              : "opacity-25 pointer-events-none"
          }`}
        >
          <span className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors">
            Next →
          </span>
          <h4 className="text-base md:text-xl font-light uppercase text-stone-800 line-clamp-1 group-hover:translate-x-1 transition-transform duration-300">
            {nextProject?.title || "—"}
          </h4>
        </Link>
      </motion.section>
    </div>
  );
}