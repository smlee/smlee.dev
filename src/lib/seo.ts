export function jsonLd<T extends Record<string, unknown>>(data: T) {
  return {
    __html: JSON.stringify(data),
  };
}

export function siteUrl(path = '/') {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
  return new URL(path, base).toString();
}
