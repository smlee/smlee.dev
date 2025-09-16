import { getPost } from "@/lib/posts";

export function generateStaticParams() {
  // For simplicity, leave empty; this route will be SSR on demand.
  return [] as { slug: string }[];
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { meta, html } = getPost(params.slug);
  return (
    <main className="container mx-auto px-4 py-12 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        {meta.date && (
          <p className="text-sm text-muted-foreground">{meta.date}</p>
        )}
        {meta.summary && (
          <p className="text-muted-foreground">{meta.summary}</p>
        )}
      </header>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
