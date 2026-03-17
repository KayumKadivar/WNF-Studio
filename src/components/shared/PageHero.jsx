"use client";
import TextReveal from "./TextReveal";
import { motion } from "framer-motion";

const PageHero = ({ label, title, description }) => (
  <section className="relative pt-40 pb-24 bg-secondary overflow-hidden">
    <div className="w-full my-container relative z-10">
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-text mb-4 block"
        >
          {label}
        </motion.span>
      )}
      <TextReveal text={title} el="h1" className="heading-lg" />
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 font-medium text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  </section>
);

export default PageHero;
