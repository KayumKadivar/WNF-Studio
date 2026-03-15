"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const detailedServices = [
  {
    id: "architecture",
    title: "Architecture",
    description: "Our architectural practice is rooted in the belief that buildings should respond to their context, climate, and culture. We design structures that are not only visually striking but also highly functional and sustainable, ensuring they stand the test of time.",
    features: ["Master Planning", "Concept Design", "Building Permits", "Construction Administration"],
    image: "/assets/aboutusimage/office.png" // Replace with your actual image paths
  },
  {
    id: "interior-design",
    title: "Interior Design",
    description: "We view interior design as the intimate continuation of architecture. By carefully curating materials, lighting, and spatial flow, we create cohesive environments that reflect the identity and enhance the daily lives of those who inhabit them.",
    features: ["Space Planning", "Material Selection", "Custom Millwork", "Furniture Procurement"],
    image: "/assets/aboutusimage/makbul.png"
  },
  {
    id: "residential",
    title: "Residential Estates",
    description: "Designing a home is a highly personal journey. We work closely with our clients to translate their vision into bespoke residential spaces, balancing monumental scale with intimate comfort to create ultimate private sanctuaries.",
    features: ["Custom Homes", "Estate Planning", "Landscape Integration", "Smart Home Design"],
    image: "/assets/aboutusimage/office.png"
  }
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "Understanding your vision, constraints, and project aspirations." },
  { step: "02", title: "Concept", desc: "Translating ideas into spatial diagrams and preliminary designs." },
  { step: "03", title: "Development", desc: "Refining the design with precise materials, engineering, and details." },
  { step: "04", title: "Execution", desc: "Overseeing construction to ensure absolute design fidelity." },
];

export default function ServicesPageClient() {
  return (
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-24 px-6 md:px-2 lg:px-0 border-b border-stone-200 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium"
          >
            // Expertise
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-light text-stone-900 leading-[1] mb-8 tracking-tight"
          >
            Disciplines <br /> & Services.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We provide comprehensive design solutions, seamlessly bridging the gap between grand architectural vision and meticulous interior execution.
          </motion.p>
        </div>
      </section>

      {/* 2. DETAILED SERVICES (Alternating Layout) */}
      <div className="bg-[#F9F8F6]">
        {detailedServices.map((service, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <section key={service.id} id={service.id} className="py-24 lg:py-32 px-6 lg:px-12 border-b border-stone-200">
              <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  
                  {/* Image Block: Framed and un-cropped */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
                  >
                    <div className="bg-white p-3 border border-stone-200 shadow-sm">
                      <div className="relative w-full bg-stone-50 overflow-hidden flex justify-center">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-auto max-h-[60vh] object-contain transition-transform duration-1000 hover:scale-[1.02]" 
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Block */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`lg:col-span-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium">
                      0{index + 1} // {service.title}
                    </span>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 leading-[1.1] mb-8 tracking-tight">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-stone-600 font-light leading-relaxed mb-12">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-4">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex justify-between items-center border-b border-stone-200 pb-3 group">
                          <span className="text-sm font-light text-stone-700 group-hover:text-stone-900 transition-colors">
                            {feature}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. OUR PROCESS (Architectural Grid) */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white border-b border-stone-200">
        <div className="container mx-auto max-w-7xl">
          
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-4 block font-medium">
              // Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200">
            {processSteps.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 lg:p-10 border-b border-r border-stone-200 hover:bg-stone-50 transition-colors"
              >
                <span className="text-3xl font-light text-stone-300 block mb-6">
                  {item.step}
                </span>
                <h3 className="text-xl font-medium text-stone-900 mb-4 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 4. CTA SECTION (Dark Contrast Block) */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-stone-900 text-stone-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-8">
            Ready to start a conversation?
          </h2>
          <p className="text-lg text-stone-400 font-light mb-12 max-w-2xl mx-auto">
            Contact our studio to discuss your next architectural or interior design project.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-stone-200 transition-colors group"
          >
            Get In Touch
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}