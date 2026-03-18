"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Ruler, Building, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─── Shimmer Skeleton ───────────────────────────────────────────────────────
// Renders a pulsing placeholder until the real image loads.
const ShimmerSkeleton = () => (
  <motion.div
    className="absolute inset-0 bg-stone-200 overflow-hidden"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    aria-hidden="true"
  >
    {/* Animated shimmer sweep */}
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
// Drop-in replacement for <img>. Shows shimmer → fades in the real image.
export const AnimatedImage = ({ src, alt, className, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Skeleton placeholder — only shown while loading */}
      <AnimatePresence>
        {!isLoaded && !hasError && <ShimmerSkeleton />}
      </AnimatePresence>

      {/* The real image, hidden until loaded */}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        // Invisible + slightly zoomed until loaded
        initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
        animate={
          isLoaded
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 1.04, filter: "blur(12px)" }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true); // remove skeleton on error too
        }}
        // Invisible image still takes up space during load
        style={{ display: "block", minHeight: isLoaded ? "auto" : "200px" }}
      />

      {/* Subtle vignette that fades in with the image */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
};

// ─── ProjectDetailClient ────────────────────────────────────────────────────
export default function ProjectDetailClient({ project, allProjects }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[currentIndex - 1];
  const nextProject = allProjects[currentIndex + 1];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-12 px-6 lg:px-12 border-b border-stone-200">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-none px-3 py-1 font-mono text-[14px] uppercase">
                  Status: Published
                </Badge>
                <span className="font-mono text-[14px] text-stone-500 uppercase tracking-tighter">
                  // {project.category}
                </span>
              </div>
              <h1 className="display-title-responsive uppercase">
                {project.title}
              </h1>
            </motion.div>
          </div>

          {/* Hero image — click to open modal */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border border-stone-200 bg-stone-100 overflow-hidden cursor-zoom-in"
            onClick={() => setSelectedImage(project.mainImage)}
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

      {/* 2. DATA GRID */}
      <section className="px-6 lg:px-12 py-16 bg-white border-b border-stone-200">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-stone-200">
          {[
            { icon: MapPin, label: "LOCATION", value: project.location },
            { icon: Calendar, label: "TIMELINE", value: project.year },
            { icon: Ruler, label: "DIMENSIONS", value: project.size },
            { icon: Building, label: "PARTNER", value: project.client },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 border-stone-200 border-b md:border-b-0 md:border-r last:border-r-0 hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-6">
                <item.icon className="w-4 h-4 text-stone-400" />
                <span className="text-[14px] font-mono text-stone-500 font-medium uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
              <p className="text-xl font-medium uppercase truncate text-stone-800">
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE CONTENT */}
      <section className="py-24 px-6 lg:px-12 border-b border-stone-200">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-mono text-sm font-medium mb-10 flex items-center gap-2 text-stone-500">
              <Plus className="w-4 h-4 text-stone-400" /> THE_CONCEPT
            </h2>
            <p className="text-3xl md:text-5xl font-light leading-[1.2] tracking-tight text-balance text-stone-800">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4 sticky top-12">
            <div className="border border-stone-200 p-8 bg-white">
              <h3 className="font-medium text-xl uppercase mb-6 border-b border-stone-200 pb-2 text-stone-800">
                Technical Specs
              </h3>
              <ul className="space-y-4 font-mono text-xs text-stone-600 uppercase">
                {project.features?.map((f, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="text-stone-400">MOD_{i + 1}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY — staggered image entrance */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50">
        <div className="mx-auto">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {project.gallery?.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 0.995 }}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid bg-white p-2 border border-stone-200 cursor-zoom-in transition-all inline-block w-full overflow-hidden"
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

      {/* 5. IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-stone-400 transition-colors p-2"
              >
                <X size={40} strokeWidth={1} />
              </button>
              <img
                src={selectedImage}
                alt="Project Preview"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl bg-white p-1"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. NAVIGATION */}
      <section className="flex flex-row h-32 md:h-48 border-t border-stone-200 bg-[#F9F8F6]">
        <Link
          href={prevProject ? `/projects/${prevProject.id}` : "#"}
          className="group flex-1 flex flex-col justify-center p-4 md:p-12 hover:bg-stone-100 transition-all border-r border-stone-200"
        >
          <span className="font-mono text-[10px] md:text-[14px] text-stone-500 font-medium mb-1 md:mb-2">
            ← PREV
          </span>
          <h4 className="text-sm md:text-3xl font-light uppercase text-stone-800 line-clamp-1">
            {prevProject?.title || "END"}
          </h4>
        </Link>

        <Link
          href={nextProject ? `/projects/${nextProject.id}` : "#"}
          className="group flex-1 flex flex-col justify-center p-4 md:p-12 hover:bg-stone-100 transition-all text-right"
        >
          <span className="font-mono text-[10px] md:text-[14px] text-stone-500 font-medium mb-1 md:mb-2">
            NEXT →
          </span>
          <h4 className="text-sm md:text-3xl font-light uppercase text-stone-800 line-clamp-1">
            {nextProject?.title || "END"}
          </h4>
        </Link>
      </section>
    </div>
  );
}