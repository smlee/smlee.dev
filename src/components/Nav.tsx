import Link from "next/link";

export default function Nav({
  brand,
  links,
  socials,
}: {
  brand?: string;
  links?: { href: string; label: string }[];
  socials?: { github?: string | null; linkedin?: string | null; twitter?: string | null } | null;
}) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">{brand ?? '—'}</Link>
        <div className="flex items-center gap-4">
          {links && links.length > 0 && (
            <ul className="flex items-center gap-4 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline hover:underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {socials && (
            <ul className="hidden md:flex items-center gap-3 text-sm text-muted-foreground">
              {socials.github && (
                <li>
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-white/10"
                  >
                    {/* GitHub mark */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.849-2.336 4.695-4.563 4.943.359.309.679.918.679 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              )}
              {socials.twitter && (
                <li>
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X"
                    title="Twitter/X"
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-white/10"
                  >
                    {/* X (Twitter) mark */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2H21l-6.54 7.48L22 22h-6.59l-4.6-5.98L5.24 22H3l6.98-7.98L2 2h6.59l4.2 5.6L18.244 2Zm-1.152 18h1.706L7.01 4h-1.7l11.782 16Z" />
                    </svg>
                  </a>
                </li>
              )}
              {socials.linkedin && (
                <li>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-white/10"
                  >
                    {/* LinkedIn mark */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.73-2.46C21.4 7.74 24 10 24 14.26V24h-5v-8.6c0-2.06-.04-4.7-2.86-4.7-2.86 0-3.3 2.23-3.3 4.54V24H8z" />
                    </svg>
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
