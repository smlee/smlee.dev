"use client";

import { motion } from "framer-motion";

export default function LandingMetrics({
  left,
  right,
}: {
  left?: { value?: string | null; label?: string | null } | null;
  right?: { value?: string | null; label?: string | null } | null;
}) {
  const items = [left, right].filter(
    (i) => i && (i.value || i.label)
  ) as { value?: string | null; label?: string | null }[];

  if (items.length < 2) return null; // mirror the mockup only if we have two metrics

  return (
    <section className="py-8 md:py-10">
      <div className="grid grid-cols-2 gap-6 text-center">
        {items.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="relative"
          >
            {i === 1 && (
              <span className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
            )}
            <div className="text-2xl md:text-3xl font-semibold">
              {m.value ?? "—"}
            </div>
            {m.label && (
              <div className="text-xs md:text-sm text-white/60 mt-1">{m.label}</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
