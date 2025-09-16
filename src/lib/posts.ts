import fs from 'fs';
import path from 'path';

export type PostMeta = {
  slug: string;
  title?: string;
  date?: string | null;
  summary?: string | null;
};

const POSTS_DIR = path.join(process.cwd(), 'posts');

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const fmMatch = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!fmMatch) return { data: {}, body: src };
  const fm = fmMatch[1];
  const rest = src.slice(fmMatch[0].length);
  const data: Record<string, string> = {};
  fm.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });
  return { data, body: rest };
}

function mdToHtml(md: string): string {
  // Very small, non-comprehensive converter for common markdown bits
  let html = md;
  // Code blocks ```
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${escapeHtml(code)}</code></pre>`);
  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, (_m, code) => `<code>${escapeHtml(code)}</code>`);
  // Headings ###### to #
  for (let i = 6; i >= 1; i--) {
    const re = new RegExp(`^${'#'.repeat(i)}\\s+(.+)$`, 'gm');
    html = html.replace(re, (_m, text) => `<h${i}>${text}</h${i}>`);
  }
  // Bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1<\/a>');
  // Paragraphs: split by blank lines
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      if (/^<h\d|<pre>|<ul>|<ol>|<blockquote>/.test(block)) return block; // skip wrapping heading/code
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');
  return html;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function listPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/i, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || null,
      summary: data.summary || null,
    };
  }).sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
}

export function getPost(slug: string): { meta: PostMeta; html: string } {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  const html = mdToHtml(body.trim());
  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date || null,
      summary: data.summary || null,
    },
    html,
  };
}
