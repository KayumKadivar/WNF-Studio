"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ImageReveal from "@/components/shared/ImageReveal";
import { projects } from "@/data/projects";

const categories = ["All", "Architecture", "Interior", "Exhibition Stall"];

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* <PageHero label="Our Work" title="A Collection of Thoughtful Design" description="Each project tells a unique story of collaboration, creativity, and commitment to excellence." /> */}

      <section className="section-padding bg-background mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-4 mb-16 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Link href={`/projects/${project.id}`} className="group block">
                    <div className="relative mb-6">
                      <ImageReveal 
                        src={project.mainImage} 
                        alt={project.title} 
                        className="w-full h-[400px] rounded-sm"
                        imgClassName="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500 rounded-sm pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                        <span className="w-14 h-14 flex items-center justify-center bg-background rounded-full">
                          <ArrowUpRight className="text-foreground" />
                        </span>
                      </div>
                      <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <span className="px-3 py-1 bg-background/90 text-xs uppercase tracking-wider">{project.category}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-display group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                    <p className="text-muted-foreground mt-1">{project.location} · {project.year}</p>
                    <p className="text-muted-foreground mt-3 text-sm">{project.description}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
