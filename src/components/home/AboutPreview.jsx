"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => (
  // Maintained the strict English Light Theme
  <section className="py-16 bg-[#F9F8F6] border-b border-stone-200">
    <div className="w-full my-container">
      {/* Changed to an aligned grid, removing default gap to use precise column starts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">

        {/* LEFT: Image Section (Takes 5 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative group w-full max-w-md mx-auto">

            <div className="bg-white p-3 md:p-4 border border-stone-200 shadow-sm">

              <div className="relative w-full bg-stone-50 overflow-hidden flex justify-center items-center aspect-[4/5] max-h-[85vh]">

                <img
                  src="/assets/aboutusimage/founder.png"
                  alt="Studio Founder"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-700 pointer-events-none" />

              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT: Text Section (Takes 6 columns, starts at column 7, creating a 1-column empty gap) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 lg:col-start-6 flex flex-col justify-center"
        >
          {/* Monospaced Label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[12px] font-mono uppercase tracking-widest text-stone-500 font-medium">
              // About Us
            </span>
            <div className="h-[1px] w-12 bg-stone-300" />
          </div>

          {/* Main Title */}
          <h2 className="display-title-responsive text-stone-900 mb-8 leading-[1.1]">
            A Studio Where Vision Meets Precision.
          </h2>

          {/* Constrained Paragraphs for better reading rhythm */}
          <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed mb-12 max-w-xl">
            <p>
              Founded in 2021, WNF Studio has been at the forefront of architectural innovation, blending timeless design principles with contemporary aesthetics.
            </p>
            <p>
              Our multidisciplinary team of architects, interior designers, and project managers work collaboratively to deliver exceptional spaces that exceed expectations. Every project is a unique journey, guided by our commitment to sustainability, functionality, and aesthetic excellence.
            </p>
          </div>

          {/* Sharp Architectural Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center justify-center bg-transparent border border-stone-300 text-stone-800 px-8 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors duration-300 rounded-none"
            >
              Learn More About Us
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default AboutPreview;