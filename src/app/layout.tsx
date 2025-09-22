import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { loadContentPack } from "@/lib/content";
import { listPosts } from "@/lib/posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smlee.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sangmin Lee — smlee.dev",
    template: "%s — smlee.dev",
  },
  description: "Builder of products, ranking systems, and AI workflows.",
  openGraph: {
    title: "Sangmin Lee — smlee.dev",
    description: "Builder of products, ranking systems, and AI workflows.",
    url: siteUrl,
    siteName: "smlee.dev",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "smlee.dev",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangmin Lee — smlee.dev",
    description: "Builder of products, ranking systems, and AI workflows.",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "smlee.dev",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = loadContentPack();
  const person = content.person ?? {};
  const hasPosts = (listPosts().length ?? 0) > 0;
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    ...(hasPosts ? [{ href: "/writing", label: "Writing" }] : [] as { href: string; label: string }[]),
    { href: "/resume", label: "Resume" },
    { href: "/hire", label: "Hire" },
  ];
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD: WebSite + Person */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  "url": siteUrl,
                  "name": person.name || "Sangmin Lee",
                  "inLanguage": "en",
                  "publisher": { "@id": `${siteUrl}/#person` },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  "name": person.name || "Sangmin Lee",
                  "url": siteUrl,
                  "email": person.email || undefined,
                  "jobTitle": person.tagline || "Full-Stack Engineer",
                  "sameAs": [
                    person.links?.github,
                    person.links?.linkedin,
                  ].filter(Boolean),
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "contactType": "business",
                      "email": person.email || "sangmlee23@gmail.com",
                      "availableLanguage": ["English"],
                      "areaServed": "US"
                    }
                  ]
                }
              ]
            }),
          }}
        />
        <Suspense fallback={null}>
          <Analytics />  {/* Analytics tracking */}
        </Suspense>
        <Nav brand={person.name} links={navLinks} socials={person.links} />
        {children}
        <Footer name={person.name} links={person.links} email={person.email} />
        <CookieConsent privacyPolicyUrl="/privacy-policy" />
      </body>
    </html>
  );
}
