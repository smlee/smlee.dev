import { loadContentPack } from "@/lib/content";
import ProductPanel from "@/components/ProductPanel";

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
export const metadata = {
  title: 'Projects — smlee.dev',
  description: 'Selected projects and products by Sangmin Lee — Mindcraftor, RankLabs, and more. Engineering, experimentation, and performance-focused work.',
  alternates: {
    canonical: `${siteBase}/projects`,
  },
};

export default function ProjectsPage() {
  const content = loadContentPack();
  const products = content.products ?? [];
  return (
    <main className="relative mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20 space-y-8">
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": siteBase },
              { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${siteBase}/projects` },
            ]
          }),
        }}
      />
      <h1 className="text-3xl font-bold">Projects</h1>
      {/* JSON-LD: CreativeWork for each project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": products.map((p) => ({
              "@type": "Product",
              "name": p.name || undefined,
              "description": p.summary || undefined,
              "url": p.cta_url || undefined,
              "image": p.screenshot || undefined,
              "author": { "@type": "Person", "name": content.person?.name || 'Sangmin Lee' },
            })),
          }),
        }}
      />
      <ProductPanel products={products} />
    </main>
  );
}
