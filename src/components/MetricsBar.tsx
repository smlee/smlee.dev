"use client";

import { motion } from "framer-motion";

type Stats = {
  years_experience?: string | null;
  products_built?: string | null;
  startups_founded?: string | null;
  repos_count?: string | null;
};

export default function MetricsBar({ stats }: { stats: Stats }) {
  const entries = [
    stats.years_experience,
    stats.products_built,
    stats.startups_founded,
    stats.repos_count,
  ].filter((v) => v && String(v).trim().length > 0) as string[];

  // Hide strip unless there are at least 3 non-empty metrics to avoid confusing single numbers.
  if (entries.length < 3) return null;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-10">
      {entries.map((value, i) => (
        <motion.div
          key={`${i}-${value}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="card rounded-lg p-5 text-center card-hover"
        >
          <div className="text-3xl font-bold">{value}</div>
        </motion.div>
      ))}
    </section>
  );
}
