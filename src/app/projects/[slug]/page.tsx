import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = `${params.slug} — Project — smlee.dev`;
  return {
    title,
    description: `Details for project ${params.slug}`,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
      <p className="text-muted-foreground mt-2">In-depth project write-up coming soon.</p>
    </main>
  );
}
