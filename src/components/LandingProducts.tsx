"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Product = {
  name?: string;
  summary?: string | null;
  bullets?: string[];
  screenshot?: string | null;
  cta_url?: string | null;
};

export default function LandingProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="py-8 md:py-12 space-y-14 md:space-y-20">
      {products.map((p, i) => (
        <motion.div
          key={`${p.name ?? 'product'}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className={`grid items-stretch gap-8 md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
        >
          <div className="flex flex-col h-full">
            <h2 className="text-3xl font-semibold tracking-tight">{p.name ?? '—'}</h2>
            {p.summary && (
              <p className="mt-2 text-base text-white/80">{p.summary}</p>
            )}
            {p.bullets && p.bullets.length > 0 && (
              <ul className="mt-4 grid gap-1 text-sm text-white/60 list-disc list-inside">
                {p.bullets.map((b, j) => (
                  <li key={`${i}-${j}`}>{b}</li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex gap-3 mt-auto">
              {p.cta_url ? (
                <Button asChild variant="default">
                  <a href={p.cta_url} target="_blank" rel="noreferrer">{p.cta_url?.startsWith('http') ? 'Visit Website' : 'Learn More'}</a>
                </Button>
              ) : (
                <Button variant="default" disabled>
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
          <div>
            <div className="rounded-md overflow-hidden border border-white/10">
              <div className="px-3 py-2 border-b border-white/10 flex items-center gap-1 window-chrome">
                <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
              </div>
              <div className="h-64 grid place-items-center text-sm text-muted-foreground">
                {p.screenshot ? (
                  <Image src={p.screenshot} alt={`${p.name ?? 'Product'} — screenshot`} width={1200} height={768} className="w-full h-auto" />
                ) : (
                  <span className="px-3 py-1">—</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
