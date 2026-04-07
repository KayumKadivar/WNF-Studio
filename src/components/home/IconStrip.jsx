"use client";

import { motion } from "framer-motion";
import { Compass, Ruler, PenTool, Lightbulb, Home, Building2 } from "lucide-react";

const features = [
  { icon: Compass, label: "Architecture" },
  { icon: Ruler, label: "Planning" },
  { icon: PenTool, label: "Interior Design" },
  { icon: Lightbulb, label: "Consultation" },
  { icon: Home, label: "Residential" },
  { icon: Building2, label: "Commercial" },
];

const IconStrip = () => (
  <section className="relative sm:py-10 lg:py-16 overflow-hidden bg-white" aria-label="Our expertise">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

    <div className="w-full my-container">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-md font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-8"
      >
        What we do
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center items-stretch gap-0"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group flex flex-col items-center justify-center min-w-[160px] sm:min-w-[180px] py-6 px-4 sm:py-8 sm:px-6 relative"
          >
            {index < features.length - 1 && (
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 sm:h-14 bg-zinc-200 hidden sm:block"
                aria-hidden
              />
            )}

            <span className="flex items-center justify-center w-16 h-16 rounded-full border border-zinc-200 bg-zinc-50/80 text-zinc-500 group-hover:border-[var(--color-primary)] group-hover:bg-amber-50 group-hover:text-[var(--color-primary)] transition-all duration-300 mb-3">
              <feature.icon strokeWidth={1.5} className="w-5 h-5" />
            </span>
            <span className="text-md font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors duration-300 text-center">
              {feature.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-10 h-0.5 w-20 rounded-full bg-[var(--color-primary)] origin-center"
      />
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
  </section>
);

export default IconStrip;
