"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import PageIntroWrapper from "@/components/shared/PageIntroWrapper";

const categories = ["All", "Architecture", "Interior", "Exhibition Stall"];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categoriesToDisplay = activeCategory === "All"
    ? ["Architecture", "Interior", "Exhibition Stall"]
    : [activeCategory];

  return (
    <PageIntroWrapper type="projects">
      <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

        {/* HEADER & FILTERS */}
        <section className="pt-32 pb-16 px-6 lg:px-12 bg-white">
          <div className="mx-auto">

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
          <div className="mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-12"
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
                            <Link href={`/projects/${project.id}`} className="block h-full flex flex-col group">

                              {/* STRICT SAME SIZE IMAGE CONTAINER */}
                              <motion.div 
                                initial="initial"
                                whileHover="hover"
                                className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200"
                              >
                                <motion.img
                                  src={project.mainImage}
                                  alt={project.title}
                                  variants={{
                                    initial: { scale: 1 },
                                    hover: { scale: 1.05 }
                                  }}
                                  transition={{ duration: 0.6 }}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                                
                                {/* Hover Overlay */}
                                <motion.div 
                                  variants={{
                                    initial: { opacity: 0 },
                                    hover: { opacity: 1 }
                                  }}
                                  transition={{ duration: 0.3 }}
                                  className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 z-10"
                                >
                                  <motion.h3 
                                    variants={{
                                      initial: { y: 20, opacity: 0 },
                                      hover: { y: 0, opacity: 1 }
                                    }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="text-white text-2xl font-light tracking-wide"
                                  >
                                    {project.title}
                                  </motion.h3>
                                  <motion.div 
                                    variants={{
                                      initial: { y: 20, opacity: 0 },
                                      hover: { y: 0, opacity: 1 }
                                    }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="h-1 w-12 bg-white mt-4 mb-2"
                                  />
                                  <motion.span
                                    variants={{
                                      initial: { y: 10, opacity: 0 },
                                      hover: { y: 0, opacity: 0.7 }
                                    }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="text-white text-[14px] font-mono uppercase font-semibold tracking-[0.2em]"
                                  >
                                    Click to Open
                                  </motion.span>
                                </motion.div>
                            </motion.div>
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
    </PageIntroWrapper>
  );
}
