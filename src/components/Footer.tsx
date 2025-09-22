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
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-background to-black/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* CTA Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Let's Build Something</h2>
            <p className="text-muted-foreground max-w-md">
              I'm open to senior engineering roles and select freelance projects. If you're building something ambitious, let's talk.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/resume" className="btn btn-primary">View Resume</Link>
              <Link href="/hire" className="btn btn-ghost">Hire Me</Link>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="font-medium mb-4 text-lg">Site Map</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:underline hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:underline hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:underline hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link href="/resume" className="hover:underline hover:text-foreground transition-colors">Resume</Link></li>
              <li><Link href="/hire" className="hover:underline hover:text-foreground transition-colors">Hire</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-medium mb-4 text-lg">Connect</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {links?.github && (
                <li><Link href={links.github} target="_blank" className="hover:underline hover:text-foreground transition-colors">GitHub</Link></li>
              )}
              {links?.twitter && (
                <li><Link href={links.twitter} target="_blank" className="hover:underline hover:text-foreground transition-colors">Twitter</Link></li>
              )}
              {links?.linkedin && (
                <li><Link href={links.linkedin} target="_blank" className="hover:underline hover:text-foreground transition-colors">LinkedIn</Link></li>
              )}
              {email && (
                <li><Link href={`mailto:${email}`} className="hover:underline hover:text-foreground transition-colors">Email</Link></li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground pt-8 mt-10 border-t border-white/10">
          <p suppressHydrationWarning> {year} {name ?? '—'}</p>
          <p className="text-xs">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}

