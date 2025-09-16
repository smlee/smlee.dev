"use client";

import { motion } from "framer-motion";

export type Stat = { value?: string | null; label?: string | null };

export default function LandingStatsBar({
  stats,
}: {
  stats: { years?: string | null; products?: string | null; startups?: string | null; repos?: string | null };
}) {
  const items: { value: string; label: string }[] = [
    { value: stats.years ?? "—", label: "Years Experience" },
    { value: stats.startups ?? "—", label: "Startups" },
    { value: stats.products ?? "—", label: "Products" },
    { value: stats.repos ?? "—", label: "Repos" },
  ];

  return (
    <section className="py-8 md:py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="relative"
          >
            {i > 0 && (
              <span className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
            )}
            <div className="text-2xl md:text-3xl font-semibold">{m.value}</div>
            <div className="text-xs md:text-sm text-white/60 mt-1">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
