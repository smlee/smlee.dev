"use client";

import { motion } from "framer-motion";

export default function ServiceCard({ title, desc, index = 0 }: { title: string; desc: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="glass rounded-2xl p-5 hover:-translate-y-0.5 transition-transform"
    >
      <div className="text-lg font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </motion.div>
  );
}
