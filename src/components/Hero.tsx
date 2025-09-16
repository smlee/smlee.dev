"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero({
  name,
  tagline,
  subtext,
  resumeUrl,
}: {
  name?: string;
  tagline?: string;
  subtext?: string;
  resumeUrl?: string | null;
}) {
  return (
    <section className="relative overflow-hidden gradient-hero beams py-20 md:py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          {name ?? "—"}
        </h1>
        {(tagline || subtext) && (
          <p className="mt-6 text-lg md:text-xl text-white/80">
            {[tagline, subtext].filter(Boolean).join(" ")}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          {resumeUrl && (
            <Button asChild variant="outline">
              <Link href={resumeUrl}>View Resume</Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/hire">Hire Me</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Projects</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
