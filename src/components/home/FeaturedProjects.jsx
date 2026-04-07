"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

// Grouping projects by category
const archiProjects = projects.filter(p => p.category === "Architecture");
const intrProjects = projects.filter(p => p.category === "Interior");
const exiProjects = projects.filter(p => p.category === "Exhibition Stall");

const ProjectGrid = ({ projects, title, label }) => {
  if (projects.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="flex flex-col mb-4">
        <h3 className="text-4xl font-light text-stone-900">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
            className="group"
          >
            <Link href={`/projects/${project.id}`} className="block w-full h-full cursor-pointer">
              <div className="relative bg-white p-3 border border-stone-200 shadow-sm mb-5 overflow-hidden">
                <div className="relative bg-stone-50 overflow-hidden aspect-[4/3]">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
              <div className="px-2 flex flex-col">

                <h3 className="text-2xl font-light text-stone-900 group-hover:text-stone-500 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FeaturedProjects = () => (
  <section className="py-16 bg-[#F9F8F6]" aria-label="Featured projects">
    <div className="w-full my-container">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-stone-200 pb-8">
        <div className="max-w-3xl">
          <h2 className="display-title-responsive text-stone-900">
            Our Projects
          </h2>
        </div>
      </div>

      {/* PROJECT SECTIONS */}
      <ProjectGrid projects={archiProjects} title="Architecture" label="Archi" />
      <ProjectGrid projects={intrProjects} title="Interior" label="Intr" />
      <ProjectGrid projects={exiProjects} title="Exhibition Stall" label="Exi" />

    </div>
  </section>
);

export default FeaturedProjects;