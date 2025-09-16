import LeadForm from "@/components/LeadForm";
import HireBanner from "@/components/hire/HireBanner";
import ServiceCard from "@/components/hire/ServiceCard";
import PackageCard from "@/components/hire/PackageCard";

export const metadata = {
  title: 'Hire — smlee.dev',
  description: 'Work with Sangmin Lee. Contact form for consulting or projects.'
};

const SERVICES = [
  { title: 'Full‑stack Delivery', desc: 'From Figma to production. Next.js, Node, Postgres, DX.' },
  { title: 'Experimentation', desc: 'A/B testing, growth loops, analytics, rapid iteration.' },
  { title: 'Performance & UX', desc: 'Ship fast, Lighthouse ≥95, web vitals, accessibility.' },
];

const PACKAGES = [
  { name: 'Sprint', detail: '1–2 weeks focused build' },
  { name: 'Build', detail: '4–6 weeks delivery' },
  { name: 'Partner', detail: 'Ongoing product partnership' },
];

export default function HirePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Glowing CTA Banner */}
      <HireBanner />

      {/* Services */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} />
        ))}
      </section>

      {/* Packages */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Packages</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <PackageCard key={p.name} name={p.name} detail={p.detail} index={i} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Tell me about your project</h2>
        <LeadForm />
      </section>
    </main>
  );
}
