"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-20 md:py-28 lg:py-32 bg-stone-50 relative overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(184,134,11,0.1), transparent 65%)",
      }}
    />

    <div className="w-full px-3 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative px-8 py-14 md:px-14 md:py-16 lg:px-16 lg:py-20 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] opacity-90 mb-6">
              Start Your Project
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium leading-tight tracking-tight max-w-2xl mx-auto mb-6">
              Ready to Transform Your Space?
            </h2>

            <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-xl mx-auto mb-10">
              Let's collaborate to create something extraordinary. Reach out to discuss your vision and see how we can bring it to life.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
              <Button
                size="xl"
                asChild
                className="bg-white text-[var(--color-primary)] hover:bg-zinc-100 border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
              >
                <Link href="/contact" className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)] font-semibold transition-all duration-300 rounded-xl"
              >
                <Link href="/projects" className="flex items-center gap-3">
                  <FolderKanban className="h-5 w-5" />
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
