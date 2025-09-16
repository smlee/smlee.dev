import { loadContentPack } from "@/lib/content";

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://smlee.dev';
export const metadata = {
  title: 'Resume — smlee.dev',
  description: 'Resume of Sangmin Lee — Full‑Stack Engineer & SaaS founder. Experience across startups and enterprise; experimentation, performance, and delivery.',
  alternates: {
    canonical: `${siteBase}/resume`,
  },
};

export default function ResumePage() {
  const content = loadContentPack();
  const resumeUrl = content.person?.links?.resume_url || "/Sangmin-Lee-Resume-2025.pdf";

  return (
    <main className="container mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Resume</h1>
        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open PDF
          </a>
          <a href={resumeUrl} download className="btn btn-ghost">
            Download
          </a>
        </div>
      </div>

      <div className="card">
        <iframe
          title="Resume PDF"
          src={resumeUrl}
          className="w-full h-[80vh] rounded-md"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        If the preview doesn&apos;t load, you can {" "}
        <a className="underline" href={resumeUrl} target="_blank" rel="noopener noreferrer">open the PDF in a new tab</a>.
      </p>
    </main>
  );
}
