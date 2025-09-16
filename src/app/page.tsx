import LandingHero from "@/components/LandingHero";
import LandingProducts from "@/components/LandingProducts";
import LandingExperience from "@/components/LandingExperience";
import LandingMetrics from "@/components/LandingMetrics";
import LandingStatsBar from "@/components/LandingStatsBar";
import LandingHighlights from "@/components/LandingHighlights";
import { loadContentPack } from "@/lib/content";

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
export const metadata = {
  title: 'Sangmin Lee — smlee.dev',
  description: 'Full‑Stack Engineer & SaaS Founder in NJ. 10+ years building production systems, experimentation frameworks, and performance‑driven products.',
  alternates: {
    canonical: siteBase,
  },
};

export default function Home() {
  const content = loadContentPack();
  const person = content.person ?? {};
  const products = content.products ?? [];
  const experience = content.experience ?? [];
  type HomeMetrics = { left?: { value?: string | null; label?: string | null } | null; right?: { value?: string | null; label?: string | null } | null };
  const homeMetrics = (content as unknown as { home_metrics?: HomeMetrics }).home_metrics ?? null;
  const stats = {
    years: content.stats?.years_experience ?? null,
    products: content.stats?.products_built ?? null,
    startups: content.stats?.startups_founded ?? null,
    repos: content.stats?.repos_count ?? null,
  };
  // Timeline/skills are shown on About page only per request.

  return (
    <>
      <div className="full-bleed">
        <LandingHero
          name={person.name}
          tagline={person.tagline}
          subtext={person.subtext}
          resumeUrl={person.links?.resume_url ?? null}
        />
      </div>
      {/* Metrics bar (site-wide stats) in a subtle background strip */}
      <div className="full-bleed bg-secondary/20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <LandingStatsBar stats={stats} />
        </div>
      </div>
      <main className="relative mx-auto max-w-7xl px-6 md:px-8 pt-6 md:pt-8 pb-14 md:pb-16 space-y-12 md:space-y-16">
        {/* Page-specific metrics if provided in pack */}
        <LandingMetrics left={homeMetrics?.left} right={homeMetrics?.right} />
        {(() => {
          const filtered = products.filter(
            (p) => p?.name !== 'Free Tunnel Server' && p?.name !== 'Free Tunnel Client'
          );
          return <LandingProducts products={filtered} />;
        })()}
      </main>
      {/* Highlights section with a faint background to break flow */}
      <div className="full-bleed bg-card/20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <LandingHighlights />
        </div>
      </div>
      {/* Experience on base background with a divider */}
      <div className="full-bleed border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <LandingExperience items={experience} />
        </div>
      </div>
    </>
  );
}
