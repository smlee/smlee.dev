import Link from "next/link";

export default function Nav({
  brand,
  links,
}: {
  brand?: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">{brand ?? '—'}</Link>
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
      </nav>
    </header>
  );
}
