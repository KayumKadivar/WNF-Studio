"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => (
  <section className="py-20 bg-[#F9F8F6] border-b border-stone-200">
    <div className="w-full px-3 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* Image Section: Fixed Cropping */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          {/* Framed border to act as a matte for the un-cropped image */}
          <div className="bg-white p-3 border border-stone-200 shadow-sm">
            <div className="relative w-full bg-stone-50 flex justify-center overflow-hidden">
              <img
                src="/assets/aboutusimage/makbul.png"
                alt="Our studio"
                // Removed fixed height. h-auto allows the image to dictate its own natural height.
                // max-h-[70vh] prevents it from becoming absurdly tall on massive monitors.
                className="w-full h-auto max-h-[70vh] object-contain transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 lg:pl-10"
        >
          <span className="text-[16px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium">
            // ABOUT_US
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 leading-[1.1] mb-8 tracking-tight">
            A Studio Where Vision Meets Precision
          </h2>

          <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed mb-12">
            <p>
              Founded in 2021, WNF Studio has been at the forefront of architectural innovation, blending timeless design principles with contemporary aesthetics.
            </p>
            <p>
              Our multidisciplinary team of architects, interior designers, and project managers work collaboratively to deliver exceptional spaces that exceed expectations. Every project is a unique journey, guided by our commitment to sustainability, functionality, and aesthetic excellence.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center justify-center border border-stone-300 text-stone-800 px-8 py-4 text-sm uppercase tracking-widest hover:bg-stone-100 transition-colors"
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