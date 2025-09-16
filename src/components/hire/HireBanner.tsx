"use client";

import { motion } from "framer-motion";

export default function HireBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl gradient-hero glow p-8 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold">Available for Select Freelance Projects</h1>
      <p className="mt-3 text-white/80 max-w-3xl mx-auto">
        Work with a founder‑engineer who ships. I help startups and teams move from idea → live product with speed and quality.
      </p>
    </motion.section>
  );
}
