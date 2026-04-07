"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects"; // Apne path ke anusar adjust karein

const categories = ["All", "Architecture", "Interior", "Exhibition Stall"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categoriesToDisplay = activeCategory === "All"
    ? ["Architecture", "Interior", "Exhibition Stall"]
    : [activeCategory];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* HEADER & FILTERS */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-white">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="display-title-responsive"
            >
              A Collection of Thoughtful Design
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-[14px] font-mono uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${activeCategory === category
                  ? "bg-stone-900 text-stone-100 border-stone-900"
                  : "bg-transparent text-stone-500 border-stone-300 hover:border-stone-900 hover:text-stone-900"
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PERFECT UNIFORM GRID */}
      <section className="px-10 md:px-8 py-18 md:py-12  ">
        <div className=" mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-24"
            >
              {categoriesToDisplay.map((cat, catIndex) => {
                const projectsInCat = projects.filter(p => p.category === cat);
                if (projectsInCat.length === 0) return null;

                return (
                  <div key={cat}>
                    {activeCategory === "All" && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12 flex items-center gap-6"
                      >
                        <h2 className="text-[20px] font-mono uppercase tracking-[0.3em] text-black whitespace-nowrap">
                          {cat}
                        </h2>
                        {/* Animated expanding line */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                          className="h-[1px] w-full bg-stone-200 origin-left"
                        />
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projectsInCat.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ 
                              duration: 0.8, 
                              delay: (index % 3) * 0.15,
                              ease: [0.215, 0.61, 0.355, 1] 
                            }}
                            className="bg-white border border-stone-200 group hover:shadow-xl transition-all duration-500"
                          >
                            <Link href={`/projects/${project.id}`} className="block h-full flex flex-col">

                              {/* STRICT SAME SIZE IMAGE CONTAINER */}
                              <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200">
                                <motion.img
                                  src={project.mainImage}
                                  alt={project.title}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.6 }}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-stone-200 text-[14px] font-mono text-stone-800 uppercase tracking-wider">
                                    {project.category}
                                  </span>
                                </div>
                              </div>

                            {/* TEXT CONTENT */}
                            <div className="p-6 flex-grow flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-light text-stone-900 mb-2 group-hover:text-stone-500 transition-colors duration-300">
                                  {project.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="text-[14px] font-mono uppercase text-stone-400">{project.location}</span>
                                  <span className="text-stone-300">/</span>
                                  <span className="text-[14px] font-mono uppercase text-stone-400">{project.year}</span>
                                </div>
                                <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2">
                                  {project.description}
                                </p>
                              </div>
                            </div>

                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}