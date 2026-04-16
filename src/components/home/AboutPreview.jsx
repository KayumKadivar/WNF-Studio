"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => (
  <section className="py-12 md:py-16 bg-[#F9F8F6]" aria-label="About WNF Studio">
    <div className="max-w-[1200px] mx-auto">
      
      {/* Replaced Grid with Flexbox.
        - flex-col: Stacks vertically on mobile.
        - md:flex-row: Places elements side-by-side on medium screens and up.
        - gap-10 lg:gap-16: Enforces a strict, controlled gap between the elements.
      */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch lg:items-center gap-10 lg:gap-16 sm:px-4 ">

        {/* LEFT: Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[45%] lg:w-[40%] shrink-0"
        >
          <div className="relative group w-full max-w-lg lg:ml-0 mr-auto h-full flex flex-col justify-center mx-auto">
            <div className="bg-white p-3 md:p-4 border border-stone-200 shadow-sm">
              
              <div className="relative w-full bg-stone-50 overflow-hidden aspect-[4/5] max-h-[85vh]">
                <Image
                  src="/assets/aboutusimage/makbul.png"
                  alt="Makbul - Founder of WNF Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-700 pointer-events-none" />
              </div>

            </div>
          </div>
        </motion.div>

        {/* RIGHT: Text Section */}
        {/* flex-1 allows this section to dynamically consume the remaining width */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex-1 flex flex-col justify-center py-8"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-8">
            <span className="text-[14px] font-mono uppercase tracking-widest text-stone-500 font-medium">
              // About Us
            </span>
            <div className="h-[1px] w-12 bg-stone-300" />
          </div>

          <h2 className="display-title-responsive text-stone-900 mb-8 leading-[1.1]">
            A Studio Where Vision Meets Precision.
          </h2>

          <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed mb-12 max-w-xl">
            <p>
              Founded in 2021, WNF Studio has been at the forefront of architectural innovation, blending timeless design principles with contemporary aesthetics.
            </p>
            <p>
              Our multidisciplinary team of architects, interior designers, and project managers work collaboratively to deliver exceptional spaces that exceed expectations. Every project is a unique journey, guided by our commitment to sustainability, functionality, and aesthetic excellence.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default AboutPreview;