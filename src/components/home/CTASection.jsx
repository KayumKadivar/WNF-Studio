"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FolderKanban } from "lucide-react";

const CTASection = () => (
  // Anchored to the #F9F8F6 light theme background
  <section className="py-16 lg:py-24 px-6 lg:px-12 bg-[#F9F8F6] border-t border-stone-200" aria-label="Start your project">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Stark, sharp dark block to create a high-contrast focal point */}
        <div className="bg-stone-900 text-stone-100 px-8 py-16 md:px-16 md:py-24 text-center border border-stone-800 relative overflow-hidden">

          {/* Faint architectural grid overlay (sharp lines, no blurry gradients) */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <span className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium">
              // Start Your Project
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] max-w-3xl mx-auto mb-8 tracking-tight">
              Ready to Transform Your Space?
            </h2>

            <p className="text-lg text-stone-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Let's collaborate to create something extraordinary. Reach out to discuss your vision and see how we can bring it to life.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;