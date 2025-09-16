import { Card } from "@/components/ui/card";
import Image from "next/image";

type Exp = {
  role?: string;
  company?: string;
  date_start?: string | null;
  date_end?: string | null;
  bullets?: string[];
  logo?: string | null;
};

export default function LandingExperience({ items }: { items: Exp[] }) {
  if (!items || items.length === 0) return null;
  const top = items.slice(0, 5);
  return (
    <section className="py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Experience</h2>
      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {top.map((it, i) => (
          <div key={`${i}-${it.role ?? 'exp'}`}>
            <Card className="rounded-md border p-4 h-full">
              {/* Header: logo + stacked company/role on left, date on right */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  {it.logo && (
                    <div className="shrink-0 mt-0.5">
                      <Image src={it.logo} alt={`${it.company ?? 'Company'} logo`} width={24} height={24} className="rounded" />
                    </div>
                  )}
                  <div>
                    <div className="text-base font-semibold text-xl md:text-2xl leading-tight">
                      {it.company ?? '—'}
                    </div>
                    <div className="text-sm text-white/80 mt-0">{it.role ?? '—'}</div>
                  </div>
                </div>
                <div className="text-[11px] text-white/60 whitespace-nowrap">
                  {(it.date_start ?? '—')}{it.date_end ? ` → ${it.date_end}` : ''}
                </div>
              </div>

              {/* First two bullets */}
              {it.bullets && it.bullets.length > 0 && (
                <ul className="mt-2 text-sm text-white/60 space-y-1 list-disc list-inside">
                  {it.bullets.slice(0, 2).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
