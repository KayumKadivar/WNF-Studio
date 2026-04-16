"use client";
import { motion } from "framer-motion";

const team = [
  { name: "James Morrison", role: "Founder & Principal Architect", image: "/assets/team-1.webp", bio: "With over 25 years of experience, James leads our vision for creating spaces that transcend the ordinary." },
  { name: "Sofia Chen", role: "Interior Design Director", image: "/assets/team-2.webp", bio: "Sofia brings a refined aesthetic sensibility to every project, blending function with beauty." },
  { name: "David Miller", role: "Senior Architect", image: "/assets/team-3.webp", bio: "David's innovative approach to sustainable design has earned numerous industry accolades." },
  { name: "Emma Liu", role: "Project Manager", image: "/assets/team-4.webp", bio: "Emma ensures every project runs smoothly from concept to completion with meticulous attention." },
];

const stats = [
  { value: "5+", label: "Years of Excellence" },
  { value: "10+", label: "Projects Completed" },
  { value: "2", label: "Design Awards" },
  { value: "5", label: "Team Members" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* 1. HERO SECTION (Inlined to guarantee theme) */}
      <section className="pt-32 pb-12 md:pb-20 my-container border-b border-stone-200 bg-white">
        <div className="w-full max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-title-responsive mb-3"
          >
            Crafting Extraordinary Spaces Since 2021
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We are a multidisciplinary design studio dedicated to creating architecture and interiors that inspire, elevate, and endure.
          </motion.p>
        </div>
      </section>

      {/* 2. VISION SECTION (Fixed Image Cropping) */}
      <section className="py-12 md:py-24 my-container border-b border-stone-200">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Image Box - No fixed height, object-contain used */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="bg-white p-3 border border-stone-200 shadow-sm mx-auto w-fit">
                <div className="relative w-full bg-stone-50 flex justify-center overflow-hidden">
                  <img
                    src="/assets/aboutusimage/makbul.png"
                    alt="Our studio"
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8 lg:pl-10 px-4"
            >
              <span className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium">
                // Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 leading-[1.1] mb-8 tracking-tight">
                Design That Transcends Time
              </h2>

              <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                <p>
                  At WNF Studio, we believe that great design has the power to transform not just spaces, but the way people live, work, and experience the world around them.
                </p>
                <p>
                  Our approach combines deep respect for architectural heritage with bold innovation, creating environments that are both timeless and distinctly contemporary.
                </p>
                <p>
                  Every project is a unique journey, guided by our commitment to sustainability, functionality, and aesthetic excellence.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}