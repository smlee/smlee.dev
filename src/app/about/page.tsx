import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import { loadContentPack } from "@/lib/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || "https://smlee.dev";
export const metadata = {
  title: "About — smlee.dev",
  description: "About Sangmin Lee — Full‑Stack Engineer & SaaS founder in NJ. 10+ years shipping production systems, experimentation frameworks, and performance‑driven products.",
  alternates: {
    canonical: `${siteBase}/about`,
  },
};

export default function AboutPage() {
  const content = loadContentPack();
  const experience = content.experience ?? [];
  const skills = content.skills ?? [];
  const summary: string | undefined =
    (content as any)?.about?.summary ?? content?.person?.subtext ?? undefined;

  return (
    <main className="container mx-auto px-4 py-12 space-y-12">
      <h1 className="text-3xl font-bold">About</h1>

      {/* Personal Intro */}
      <section className="space-y-4 max-w-3xl">
        {summary && (
          <p className="text-muted-foreground">{summary}</p>
        )}
        <p className="text-lg leading-relaxed mt-8">
          I love building at the edge of complexity and usability — systems that are technically solid but also delightful to use. My career has taken me from leading experiments at Complex Networks, to federal-scale visualization at Peraton Labs, to founding SaaS startups like Mindcraftor. Along the way, I’ve learned that the best products don’t just solve problems — they create leverage.
        </p>
      </section>

      {/* Highlights / Proof */}
      <section className="space-y-4 mt-16 mb-16">
        <h2 className="text-2xl font-semibold">Highlights / Proof</h2>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="h-full px-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span aria-hidden>⚡</span>
                Cut UI load times by 28%
              </CardTitle>
              <CardDescription>Peraton Labs</CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full px-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span aria-hidden>🛡️</span>
                Secure 3D geospatial visuals
              </CardTitle>
              <CardDescription>Compliance-heavy environments</CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full px-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span aria-hidden>🔁</span>
                Migrated Complex to React/Node
              </CardTitle>
              <CardDescription>Improved CRO post-migration</CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full px-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span aria-hidden>🚀</span>
                Launched Mindcraftor
              </CardTitle>
              <CardDescription>AI idea validation for 1,600+ users</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Philosophy / How I Work */}
      <section className="space-y-4 max-w-3xl mt-20">
        <h2 className="text-2xl font-semibold">My Philosophy</h2>
        <p className="text-lg leading-relaxed">
          I believe in shipping lean, testing aggressively, and learning faster than competitors. Whether in a corporate or startup setting, my focus is on clarity, scalability, and experimentation — because products that evolve quickly are the ones that win.
        </p>
      </section>

      {/* Humanize */}
      <section className="space-y-4 max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold">Beyond the Work</h2>
        <p className="text-lg leading-relaxed">
          Outside of code, I’m a dad, a relentless tinkerer, and I love blending design with engineering. Whether it’s exploring AI workflows or teaching my daughter to problem-solve, I bring the same curiosity to everything I do.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-4 max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">Who is Sangmin Lee?</summary>
            <p className="mt-2 text-muted-foreground">
              I’m a full-stack engineer and SaaS founder with 10+ years of experience shipping production systems and leading experiments. I’ve worked across startups and enterprise environments, and I’m the founder of Mindcraftor and RankLabs. I specialize in Next.js/Node, experimentation, and performance-driven product delivery.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">What kind of roles or work are you open to?</summary>
            <p className="mt-2 text-muted-foreground">
              Senior full-stack engineering roles and select freelance engagements. Typical scopes: MVP builds, performance/UX improvements, experimentation frameworks, and AI-assisted workflows. I can lead end-to-end delivery or embed with existing teams.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">What technologies do you specialize in?</summary>
            <p className="mt-2 text-muted-foreground">
              TypeScript, Next.js/React, Node.js/Fastify, Postgres/Supabase, Tailwind, Redis, Stripe, and Framer Motion. I’m experienced with CRO/experimentation tools (Optimizely/Google Optimize patterns) and 3D geospatial visualization with CesiumJS in compliance-heavy environments.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">What is Mindcraftor?</summary>
            <p className="mt-2 text-muted-foreground">
              Mindcraftor is an AI SaaS for idea generation, validation, and autonomous CX workflows. It’s built with Next.js, Node.js, Supabase, and Stripe, and supports RAG-style flows with integrated analytics. It helps teams move from raw ideas to validated, testable product directions.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">What is RankLabs?</summary>
            <p className="mt-2 text-muted-foreground">
              RankLabs focuses on programmatic SEO and ranking systems, including Answer Engine Optimization (AEO). It combines data pipelines with AI-assisted insights to improve visibility across traditional SERPs and AI/answer engines.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">What is “experimentation engineering”?</summary>
            <p className="mt-2 text-muted-foreground">
              It’s the practice of building the technical rails for rapid, safe testing—client-side or server-side. I design testable UI patterns, measurement, guardrails, and analysis workflows so teams can learn fast without breaking core experiences, even in restricted environments like CDN-cached or WordPress stacks.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">How do you approach performance and UX?</summary>
            <p className="mt-2 text-muted-foreground">
              Start with baselines (Core Web Vitals), isolate regressions, and fix structural issues: bundle splitting, caching, prefetch strategies, and rendering patterns. I balance perceived performance with true latency reduction and ensure improvements are measurable, accessible, and resilient under real traffic.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">Do you work with regulated or compliance-heavy teams?</summary>
            <p className="mt-2 text-muted-foreground">
              Yes. I’ve delivered secure interactive 3D geospatial visualization and collaborated on federal compliance and accessibility aims. I design with least privilege, auditability, and progressive enhancement so features meet constraints without stalling product velocity.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">Can you help validate a new SaaS idea?</summary>
            <p className="mt-2 text-muted-foreground">
              Absolutely. I run lean validation: define the critical assumption, ship a minimal test surface, instrument it, and measure adoption/retention signals. I favor fast prototypes, realistic funnels, and clear kill/sustain criteria to avoid sunk-cost traps.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">How do I start a project with you?</summary>
            <p className="mt-2 text-muted-foreground">
              Email sangmlee23@gmail.com or use the Hire form on the site. Share goals, timeline, constraints, and any prior artifacts (briefs, designs, repos). I’ll propose scope options (Sprint / Build / Partner) with clear deliverables and pricing.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">Where are you based and do you work remotely?</summary>
            <p className="mt-2 text-muted-foreground">
              I’m based in Palisades Park, NJ, and I work remotely with clients in the US and abroad. For onsite needs, short travel is possible with advance notice.
            </p>
          </details>
          <details className="group rounded border p-4">
            <summary className="cursor-pointer font-medium">Are you available for consultations or audits?</summary>
            <p className="mt-2 text-muted-foreground">
              Yes. I offer short consultations and focused audits (performance, experimentation, architecture). You’ll get a prioritized findings list, quick wins, and a roadmap for deeper work if needed.
            </p>
          </details>
        </div>
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
                  "name": "Who is Sangmin Lee?",
                  "acceptedAnswer": { "@type": "Answer", "text": "I’m a full-stack engineer and SaaS founder with 10+ years of experience shipping production systems and leading experiments. I’ve worked across startups and enterprise environments, and I’m the founder of Mindcraftor and RankLabs. I specialize in Next.js/Node, experimentation, and performance-driven product delivery." }
                },
                {
                  "@type": "Question",
                  "name": "What kind of roles or work are you open to?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Senior full-stack engineering roles and select freelance engagements. Typical scopes: MVP builds, performance/UX improvements, experimentation frameworks, and AI-assisted workflows. I can lead end-to-end delivery or embed with existing teams." }
                },
                {
                  "@type": "Question",
                  "name": "What technologies do you specialize in?",
                  "acceptedAnswer": { "@type": "Answer", "text": "TypeScript, Next.js/React, Node.js/Fastify, Postgres/Supabase, Tailwind, Redis, Stripe, and Framer Motion. I’m experienced with CRO/experimentation tools (Optimizely/Google Optimize patterns) and 3D geospatial visualization with CesiumJS in compliance-heavy environments." }
                },
                {
                  "@type": "Question",
                  "name": "What is Mindcraftor?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Mindcraftor is an AI SaaS for idea generation, validation, and autonomous CX workflows. It’s built with Next.js, Node.js, Supabase, and Stripe, and supports RAG-style flows with integrated analytics. It helps teams move from raw ideas to validated, testable product directions." }
                },
                {
                  "@type": "Question",
                  "name": "What is RankLabs?",
                  "acceptedAnswer": { "@type": "Answer", "text": "RankLabs focuses on programmatic SEO and ranking systems, including Answer Engine Optimization (AEO). It combines data pipelines with AI-assisted insights to improve visibility across traditional SERPs and AI/answer engines." }
                },
                {
                  "@type": "Question",
                  "name": "What is “experimentation engineering”?",
                  "acceptedAnswer": { "@type": "Answer", "text": "It’s the practice of building the technical rails for rapid, safe testing—client-side or server-side. I design testable UI patterns, measurement, guardrails, and analysis workflows so teams can learn fast without breaking core experiences, even in restricted environments like CDN-cached or WordPress stacks." }
                },
                {
                  "@type": "Question",
                  "name": "How do you approach performance and UX?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Start with baselines (Core Web Vitals), isolate regressions, and fix structural issues: bundle splitting, caching, prefetch strategies, and rendering patterns. I balance perceived performance with true latency reduction and ensure improvements are measurable, accessible, and resilient under real traffic." }
                },
                {
                  "@type": "Question",
                  "name": "Do you work with regulated or compliance-heavy teams?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes. I’ve delivered secure interactive 3D geospatial visualization and collaborated on federal compliance and accessibility aims. I design with least privilege, auditability, and progressive enhancement so features meet constraints without stalling product velocity." }
                },
                {
                  "@type": "Question",
                  "name": "Can you help validate a new SaaS idea?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. I run lean validation: define the critical assumption, ship a minimal test surface, instrument it, and measure adoption/retention signals. I favor fast prototypes, realistic funnels, and clear kill/sustain criteria to avoid sunk-cost traps." }
                },
                {
                  "@type": "Question",
                  "name": "How do I start a project with you?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Email sangmlee23@gmail.com or use the Hire form on the site. Share goals, timeline, constraints, and any prior artifacts (briefs, designs, repos). I’ll propose scope options (Sprint / Build / Partner) with clear deliverables and pricing." }
                },
                {
                  "@type": "Question",
                  "name": "Where are you based and do you work remotely?",
                  "acceptedAnswer": { "@type": "Answer", "text": "I’m based in Palisades Park, NJ, and I work remotely with clients in the US and abroad. For onsite needs, short travel is possible with advance notice." }
                },
                {
                  "@type": "Question",
                  "name": "Are you available for consultations or audits?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes. I offer short consultations and focused audits (performance, experimentation, architecture). You’ll get a prioritized findings list, quick wins, and a roadmap for deeper work if needed." }
                }
              ]
            })
          }}
        />
      </section>

      {/* Timeline and Skills */}
      <div className="mt-10">
        <Timeline items={experience} />
      </div>
      <div className="skills">
        <Skills items={skills} />
      </div>

      
    </main>
  );
}
