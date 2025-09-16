import LeadForm from "@/components/LeadForm";
import HireBanner from "@/components/hire/HireBanner";
import ServiceCard from "@/components/hire/ServiceCard";
import PackageCard from "@/components/hire/PackageCard";

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
export const metadata = {
  title: 'Hire — smlee.dev',
  description: 'Hire Sangmin Lee — Senior full‑stack engineer for MVP builds, experimentation frameworks, and performance/UX improvements. Contact for roles or select freelance.',
  alternates: {
    canonical: `${siteBase}/hire`,
  },
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
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": siteBase },
              { "@type": "ListItem", "position": 2, "name": "Hire", "item": `${siteBase}/hire` },
            ]
          }),
        }}
      />
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

      {/* FAQ */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <details className="group rounded border p-4">
          <summary className="cursor-pointer font-medium">What types of projects do you take?</summary>
          <p className="mt-2 text-muted-foreground">MVP builds, performance/UX improvements, experimentation frameworks, and AI‑assisted workflows. I can lead end‑to‑end delivery or embed with a team.</p>
        </details>
        <details className="group rounded border p-4">
          <summary className="cursor-pointer font-medium">What’s the usual engagement length?</summary>
          <p className="mt-2 text-muted-foreground">Sprints (1–2 weeks), Builds (4–6 weeks), or ongoing Partnership. We can tailor scope to your goals and constraints.</p>
        </details>
        <details className="group rounded border p-4">
          <summary className="cursor-pointer font-medium">How do we get started?</summary>
          <p className="mt-2 text-muted-foreground">Share goals, timeline, constraints, and any prior artifacts (briefs, designs, repos). I’ll propose scope options with clear deliverables and pricing.</p>
        </details>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What types of projects do you take?",
                  "acceptedAnswer": { "@type": "Answer", "text": "MVP builds, performance/UX improvements, experimentation frameworks, and AI‑assisted workflows. I can lead end‑to‑end delivery or embed with a team." }
                },
                {
                  "@type": "Question",
                  "name": "What’s the usual engagement length?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Sprints (1–2 weeks), Builds (4–6 weeks), or ongoing Partnership. We can tailor scope to your goals and constraints." }
                },
                {
                  "@type": "Question",
                  "name": "How do we get started?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Share goals, timeline, constraints, and any prior artifacts (briefs, designs, repos). I’ll propose scope options with clear deliverables and pricing." }
                }
              ]
            })
          }}
        />
      </section>
    </main>
  );
}
