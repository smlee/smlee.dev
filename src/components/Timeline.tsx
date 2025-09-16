"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Exp = {
  role?: string;
  company?: string;
  date_start?: string | null;
  date_end?: string | null;
  bullets?: string[];
  logo?: string | null;
};

export default function Timeline({ items }: { items: Exp[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items || items.length === 0) return null;
  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      <div className="relative">
        {/* Animated progress spine */}
        <motion.div
          className="absolute left-0 top-0 h-full w-px bg-white/10 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <ol className="relative ms-3 space-y-8">
          {items.map((it, idx) => {
            const expanded = open === idx;
            return (
              <motion.li
                key={`${idx}-${it.role ?? 'item'}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="pl-4 relative"
              >
                <span className="absolute -left-3 mt-1.5 h-3 w-3 rounded-full bg-foreground"></span>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : idx)}
                  className="text-left w-full"
                >
                  <time className="mb-1 text-sm text-muted-foreground block">
                    {(it.date_start ?? '—')}{it.date_end ? ` → ${it.date_end}` : ''}
                  </time>
                  <h3 className="text-lg font-medium leading-tight">
                    {(it.role ?? '—')}{it.company ? ` @ ${it.company}` : ''}
                  </h3>
                </button>
                <AnimatePresence initial={false}>
                  {it.bullets && it.bullets.length > 0 && expanded && (
                    <motion.ul
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 list-disc list-inside text-sm text-muted-foreground"
                    >
                      {it.bullets.map((b, j) => (
                        <li key={`${idx}-${j}`}>{b}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
