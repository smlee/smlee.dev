import Link from "next/link";

export default function Footer({
  name,
  links,
  email,
  resumeUrl,
}: {
  name?: string;
  links?: { github?: string | null; linkedin?: string | null; twitter?: string | null } | null;
  email?: string | null;
  resumeUrl?: string | null;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="card py-16 px-6 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold">Let’s Build Something</h2>
            <p className="text-muted-foreground">
              I’m open to senior engineering roles and select freelance projects. If you’re building something ambitious, let’s talk.
            </p>
          </div>
          <div className="flex gap-3">
            {resumeUrl && (
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Resume</Link>
            )}
            <Link href="/hire" className="btn btn-ghost">Hire Me</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p suppressHydrationWarning>© {year} {name ?? '—'}</p>
          <nav className="flex items-center gap-4">
            {links?.github && (
              <Link href={links.github} target="_blank" className="hover:underline">GitHub</Link>
            )}
            {links?.twitter && (
              <Link href={links.twitter} target="_blank" className="hover:underline">Twitter</Link>
            )}
            {links?.linkedin && (
              <Link href={links.linkedin} target="_blank" className="hover:underline">LinkedIn</Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} className="hover:underline">Email</Link>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}

