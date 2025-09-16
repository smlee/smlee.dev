import type { MetadataRoute } from 'next';
import { listPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
  const now = new Date().toISOString();
  const hasPosts = (listPosts().length ?? 0) > 0;
  const routes = [
    '',
    '/projects',
    '/hire',
    '/about',
    ...(hasPosts ? ['/writing'] : [] as string[]),
    '/resume',
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
