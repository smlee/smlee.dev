export const metadata = {
  title: 'Writing — smlee.dev',
  description: 'Notes and articles by Sangmin Lee',
};

import { listPosts } from "@/lib/posts";

export default function WritingPage() {
  const posts = listPosts();

  return (
    <main className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Writing</h1>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet. Add .md files under <code>/posts</code> with optional frontmatter (title, date, summary).</p>
      ) : (
        <ul className="grid gap-4">
          {posts.map((post) => (
            <li key={post.slug} className="card p-4 rounded-lg">
              <a href={`/posts/${post.slug}`} className="block">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg md:text-xl font-semibold">{post.title}</h2>
                  {post.date && <span className="text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>}
                </div>
                {post.summary && (
                  <p className="text-sm text-muted-foreground mt-1">{post.summary}</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
