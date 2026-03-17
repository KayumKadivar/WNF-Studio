"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Palette, Home, Wrench, Lightbulb, Users, ArrowRight, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Building2, title: "Architecture", description: "From concept to completion, we design buildings that stand the test of time while pushing creative boundaries.", features: ["Master Planning", "Building Design", "3D Visualization", "Construction Documents"] },
  { icon: Palette, title: "Interior Design", description: "Creating cohesive interior environments that reflect your personality and enhance your lifestyle.", features: ["Space Planning", "Material Selection", "Custom Furniture", "Color Consultation"] },
  { icon: Home, title: "Residential", description: "Bespoke homes designed around your unique needs, bringing together comfort and sophistication.", features: ["Custom Homes", "Renovations", "Additions", "Landscape Integration"] },
  { icon: Wrench, title: "Renovation", description: "Breathing new life into existing spaces with thoughtful redesign and modern updates.", features: ["Historic Restoration", "Modern Updates", "Structural Changes", "Energy Efficiency"] },
  { icon: Lightbulb, title: "Consulting", description: "Expert guidance on design strategy, feasibility studies, and project planning.", features: ["Feasibility Studies", "Code Compliance", "Sustainability", "Budget Planning"] },
  { icon: Users, title: "Project Management", description: "End-to-end project oversight ensuring quality delivery on time and within budget.", features: ["Contractor Coordination", "Timeline Management", "Quality Control", "Budget Oversight"] },
];

const process = [
  { step: "01", title: "Discovery", description: "We begin with a thorough consultation to understand your vision, requirements, and project goals." },
  { step: "02", title: "Concept Design", description: "Our team develops initial concepts and sketches, exploring various design directions." },
  { step: "03", title: "Development", description: "Refining the chosen concept into detailed plans, specifications, and 3D visualizations." },
  { step: "04", title: "Execution", description: "Managing the construction process to ensure the design vision becomes reality." },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-stone-200 bg-white">
        <div className="my-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[14px] font-mono uppercase tracking-widest text-stone -500 mb-6 block font-medium"
          >
            // Expertise
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-title-responsive mb-4"
          >
            Our Services & Disciplines.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive design solutions tailored to bring your vision to life with raw excellence and precision.
          </motion.p>
        </div>
      </section>

      {/* 2. SERVICES GRID (Strict 1px Border Grid) */}
      <section className="py-20">
        <div className="my-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-stone-200">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-10 bg-white border-b border-r border-stone-200 hover:bg-[#F9F8F6] transition-colors duration-500 h-full flex flex-col cursor-pointer"
              >
                {/* Sharp Geometry Icon Box */}
                <div className="w-12 h-12 flex items-center justify-center border border-stone-200 text-stone-400 mb-8 group-hover:border-stone-900 group-hover:text-stone-900 transition-colors duration-500">
                  <service.icon size={20} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-light text-stone-900 mb-4 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>

                <p className="text-stone-600 font-light leading-relaxed mb-10 flex-grow">
                  {service.description}
                </p>

                {/* Features List with sharp squares instead of bullets */}
                <ul className="space-y-3 pt-6 border-t border-stone-100">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-[14px] font-mono tracking-widest uppercase text-stone-500 flex items-center gap-3">
                      <span className="w-1 h-1 bg-stone-300 group-hover:bg-stone-900 transition-colors duration-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="my-container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <span className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-4 block font-medium">
              // Methodology
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">
                How We Work
              </h2>
              <p className="text-stone-600 font-light max-w-md leading-relaxed">
                A proven methodology that ensures exceptional results from initial concept to final delivery.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 lg:p-10 border-b border-r border-stone-200 hover:bg-[#F9F8F6] transition-colors duration-500"
              >
                <span className="text-5xl font-light text-stone-300 block mb-8">
                  {item.step}
                </span>
                <h3 className="text-xl font-medium text-stone-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION (Dark Block Anchor) */}
      <section className="py-20 bg-[#F9F8F6] border-y border-stone-200">
        <div className="my-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium text-center">
        // Let's Collaborate
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-center text-stone-900 mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-stone-600 font-light text-lg leading-relaxed mb-10 max-w-2xl mx-auto text-center">
              Let's discuss your vision and explore how we can bring it to life with our expertise and passion for exceptional design.
            </p>
            <Link
              href="/contact"
              // Button is now dark to stand out against the light background
              className="inline-flex items-center justify-center bg-stone-900 text-white px-10 py-5 text-[14px] font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors group rounded-none"
            >
              Get in Touch
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}