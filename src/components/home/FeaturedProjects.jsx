"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

// Rendering all projects as requested.
const allProjects = projects;

const FeaturedProjects = () => (
  <section className="py-20 bg-[#F9F8F6] border-b border-stone-200">
    <div className="w-full my-container">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-stone-200 pb-12">
        <div className="max-w-3xl">
          <span className="text-[16px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium">
            // Complete Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.1] tracking-tight">
            Our Selected Works
          </h2>
        </div>

        {/* Simple count indicator instead of a button, since all are displayed */}
        <div className="pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
            Showing {allProjects.length} Projects
          </span>
        </div>
      </div>

      {/* MASONRY LAYOUT */}
      {/* columns-1, 2, or 3 creates the vertical masonry flow. gap-8 spaces the columns. */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {allProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
            // break-inside-avoid ensures a project card is never split across two columns
            className="break-inside-avoid group cursor-pointer"
          >
            <Link href={`/projects/${project.id}`} className="block w-full h-full">

              {/* IMAGE FRAME: h-auto allows natural height, zero cropping */}
              <div className="relative bg-white p-3 border border-stone-200 shadow-sm mb-5 overflow-hidden">
                <div className="relative bg-stone-50 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
                  />

                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>

              {/* TYPOGRAPHY */}
              <div className="px-2 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h3 className="text-2xl font-light text-stone-900 group-hover:text-stone-500 transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-widest">
                    {project.location}
                  </span>
                </div>
              </div>

            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default FeaturedProjects;