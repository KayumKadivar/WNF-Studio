"use client";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h2 className="heading-md mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
