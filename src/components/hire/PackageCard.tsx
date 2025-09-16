"use client";

import { motion } from "framer-motion";

export default function PackageCard({ name, detail, index = 0 }: { name: string; detail: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="glass rounded-2xl p-5"
    >
      <div className="text-lg font-semibold">{name}</div>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </motion.div>
  );
}
