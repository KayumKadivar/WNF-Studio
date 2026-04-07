"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Palette, Home, Wrench, Lightbulb, Users, ArrowUpRight, LayoutGrid } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const services = [
  { icon: Building2, title: "Architecture", description: "From concept to completion, we design buildings that stand the test of time while pushing creative boundaries.", href: "/services#architecture" },
  { icon: Palette, title: "Interior Design", description: "Creating cohesive interior environments that reflect your personality and enhance your lifestyle.", href: "/services#interior-design" },
  { icon: Home, title: "Residential", description: "Bespoke homes designed around your unique needs, bringing together comfort and sophistication.", href: "/services#residential" },
  { icon: Wrench, title: "Renovation", description: "Breathing new life into existing spaces with thoughtful redesign and modern updates.", href: "/services#renovation" },
  { icon: Lightbulb, title: "Consulting", description: "Expert guidance on design strategy, feasibility studies, and project planning.", href: "/services#consulting" },
  { icon: Users, title: "Project Management", description: "End-to-end project oversight ensuring quality delivery on time and within budget.", href: "/services#project-management" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 },
  },
};

const ServicesSection = () => (
  <section className="section-padding bg-white relative overflow-hidden" aria-label="Our services">
    {/* Decorative background elements */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left gradient blob */}
      <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl" />
      {/* Bottom-right gradient blob */}
      <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-tl from-amber-50/10 to-transparent rounded-full blur-3xl" />
    </div>

    {/* Subtle background icons */}
    <div className="absolute top-12 left-8 pointer-events-none z-0 opacity-[0.06]">
      <Building2 className="w-24 h-24 text-amber-700" strokeWidth={0.8} />
    </div>
    <div className="absolute bottom-24 right-12 pointer-events-none z-0 opacity-[0.05]">
      <LayoutGrid className="w-32 h-32 text-zinc-600" strokeWidth={0.8} />
    </div>

    <div className="my-container relative z-10">
      {/* Header block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-16 md:mb-20"
      >
        <SectionHeading
          label="What We Do"
          title="Our Services"
          description="Comprehensive design solutions tailored to bring your vision to life."
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 h-1 w-16 bg-gradient-to-r from-amber-600 to-amber-300 origin-left"
        />
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {services.map((service, index) => (
          <motion.div key={service.title} variants={card}>
            <Link href={service.href} className="group relative h-full block">
              {/* Card background with gradient on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 rounded-2xl
                           transition-all duration-500 group-hover:border-amber-300/40 group-hover:shadow-2xl group-hover:shadow-amber-900/10"
              />

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/0 to-amber-400/0
                           group-hover:from-amber-400/5 group-hover:via-amber-300/5 group-hover:to-amber-400/5
                           rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Content */}
              <div className="relative h-full p-8 md:p-10 flex flex-col">
                {/* Header with icon and number */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50
                               group-hover:from-amber-600 group-hover:to-amber-700 text-amber-800 group-hover:text-white
                               transition-all duration-400 flex-shrink-0"
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                  >
                    <service.icon className="w-7 h-7" strokeWidth={1.8} />
                  </motion.div>
                  <motion.span
                    className="text-xs font-bold tracking-widest text-transparent bg-gradient-to-r from-amber-600 to-amber-500
                               bg-clip-text group-hover:from-amber-700 group-hover:to-amber-600 transition-all duration-300"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Title */}
                <motion.h3
                  className="font-display text-2xl md:text-3xl text-zinc-900 mb-4
                             group-hover:text-amber-800 transition-colors duration-300"
                >
                  {service.title}
                </motion.h3>

                {/* Description */}
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Footer with CTA */}
                <motion.div
                  className="flex items-center gap-2 text-sm font-semibold text-amber-800
                             group-hover:text-amber-900 transition-colors duration-300"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <span>Learn more</span>
                  <motion.div
                    initial={{ opacity: 0.7, x: 0, y: 0 }}
                    whileHover={{ opacity: 1, x: 1, y: -1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-600 to-amber-300 rounded-tr-2xl"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider
                     text-zinc-600 hover:text-amber-700 transition-colors link-underline group"
        >
          View all services
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
