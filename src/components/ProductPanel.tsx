"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Product = {
  name?: string;
  summary?: string | null;
  bullets?: string[];
  screenshot?: string | null;
  cta_url?: string | null;
  status?: string | null;
  date_start?: string | null;
  date_end?: string | null;
};

export default function ProductPanel({ products }: { products: Product[] }) {
  return (
    <section className="py-10 grid gap-10">
      {products.map((p, i) => (
        <motion.div
          key={`${p.name ?? 'product'}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className={`grid items-stretch gap-8 md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
        >
          <div>
            <Card className="rounded-xl border h-full transition-transform hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl font-semibold">{p.name ?? '—'}</CardTitle>
                  {p.status && (
                    <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                      {p.status}
                    </span>
                  )}
                </div>
                {(p.date_start || p.date_end) && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {(p.date_start ?? '—')}{p.date_end ? ` → ${p.date_end}` : ''}
                  </div>
                )}
                {p.summary && (
                  <CardDescription className="mt-2">{p.summary}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {p.bullets && p.bullets.length > 0 && (
                  <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground list-disc list-inside">
                    {p.bullets.map((pt, j) => (
                      <li key={`${i}-${j}`}>{pt}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex gap-3">
                  {p.cta_url ? (
                    <a
                      href={p.cta_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      {p.cta_url?.startsWith('http') ? 'Visit Website' : 'Learn More'}
                    </a>
                  ) : (
                    <span className="btn btn-ghost opacity-70 pointer-events-none">Coming Soon</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-xl h-full overflow-hidden border-0 shadow-none p-0">
              <div className="rounded-md overflow-hidden border border-white/10">
                <div className="px-3 py-2 border-b border-white/10 flex items-center gap-1 window-chrome">
                  <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
                </div>
                <div className="aspect-[16/10] grid place-items-center text-sm text-muted-foreground bg-black/20">
                  {p.screenshot ? (
                    <Image src={p.screenshot} alt={`${p.name ?? 'Product'} — screenshot`} width={1600} height={1000} className="w-full h-full object-cover" />
                  ) : (
                    <span className="px-3 py-1">No screenshot</span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

