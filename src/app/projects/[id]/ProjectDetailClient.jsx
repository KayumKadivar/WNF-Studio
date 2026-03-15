"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Building, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailClient({ project, allProjects }) {
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[currentIndex - 1];
  const nextProject = allProjects[currentIndex + 1];

  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-12 px-6 lg:px-12 border-b border-stone-200">
        <div className="  mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-none px-3 py-1 font-mono text-[10px] uppercase">
                  Status: Published
                </Badge>
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-tighter">
                  // {project.category}
                </span>
              </div>
              <h1 className="text-6xl font-light tracking-tighter uppercase leading-[0.85] mb-4 text-stone-800">
                {project.title}
              </h1>
            </motion.div>
          </div>

          {/* FIXED MAIN IMAGE: No fixed aspect ratio, max height applied to prevent excessive scrolling */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="w-full border border-stone-200 bg-stone-100 flex justify-center"
          >
            <img 
              src={project.mainImage} 
              alt={project.title} 
              className="w-full max-h-[75vh] object-contain" 
            />
          </motion.div>
        </div>
      </section>

      {/* 2. DATA GRID */}
      <section className="px-6 lg:px-12 py-16 bg-white border-b border-stone-200">
        <div className="  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-stone-200">
          {[
            { icon: MapPin, label: "LOCATION", value: project.location },
            { icon: Calendar, label: "TIMELINE", value: project.year },
            { icon: Ruler, label: "DIMENSIONS", value: project.size },
            { icon: Building, label: "PARTNER", value: project.client },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 border-stone-200 border-b md:border-b-0 md:border-r last:border-r-0 hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-6">
                <item.icon className="w-4 h-4 text-stone-400" />
                <span className="text-[10px] font-mono text-stone-500 font-medium uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-xl font-medium uppercase truncate text-stone-800">{item.value || "—"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE CONTENT */}
      <section className="py-24 px-6 lg:px-12 border-b border-stone-200">
        <div className="  mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-mono text-sm font-medium mb-10 flex items-center gap-2 text-stone-500">
              <Plus className="w-4 h-4 text-stone-400" /> THE_CONCEPT
            </h2>
            <p className="text-3xl md:text-5xl font-light leading-[1.2] tracking-tight text-balance text-stone-800">
              {project.description}
            </p>
          </div>
          
          <div className="lg:col-span-4 sticky top-12">
            <div className="border border-stone-200 p-8 bg-white">
              <h3 className="font-medium text-xl uppercase mb-6 border-b border-stone-200 pb-2 text-stone-800">Technical Specs</h3>
              <ul className="space-y-4 font-mono text-xs text-stone-600 uppercase">
                {project.features?.map((f, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="text-stone-400">MOD_{i+1}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY - FIXED IMAGES (Masonry Layout) */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50">
        <div className="  mx-auto">
          {/* Using columns instead of grid for seamless variable-height images */}
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {project.gallery?.map((img, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 0.99 }}
                className="break-inside-avoid bg-white p-2 border border-stone-200 transition-transform inline-block w-full"
              >
                <img 
                  src={img} 
                  alt={`Gallery view ${i + 1}`} 
                  className="w-full h-auto object-contain bg-stone-100" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NAVIGATION */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-48 border-t border-stone-200 bg-[#F9F8F6]">
        <Link href={prevProject ? `/projects/${prevProject.id}` : "#"} 
          className="group flex flex-col justify-center p-12 hover:bg-stone-100 transition-all border-b md:border-b-0 md:border-r border-stone-200">
          <span className="font-mono text-[10px] text-stone-500 font-medium mb-2">← PREVIOUS_WORK</span>
          <h4 className="text-2xl md:text-4xl font-light uppercase text-stone-800">{prevProject?.title || "END"}</h4>
        </Link>

        <Link href={nextProject ? `/projects/${nextProject.id}` : "#"} 
          className="group flex flex-col justify-center p-12 hover:bg-stone-100 transition-all text-right">
          <span className="font-mono text-[10px] text-stone-500 font-medium mb-2">NEXT_WORK →</span>
          <h4 className="text-2xl md:text-4xl font-light uppercase text-stone-800">{nextProject?.title || "END"}</h4>
        </Link>
      </section>
    </div>
  );
}