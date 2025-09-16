"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingHero({
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
    <section className="relative overflow-hidden gradient-hero py-16 md:py-20 px-6 text-center">
      {/* Overlays apply to the entire hero, keep subtle and avoid boxed feel */}
      <div className="hero-vignette" />
      <div className="hero-noise" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
          {tagline ?? name ?? "—"}
        </h1>
        {subtext && (
          <p className="mt-3 md:mt-4 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {subtext}
          </p>
        )}
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white/5">
            <Link href="/hire">Hire Me as an Engineer</Link>
          </Button>
          {resumeUrl && (
            <Button asChild variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white/5">
              <Link href={resumeUrl}>View Resume</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white/5">
            <Link href="/hire">Work with Me as a freelancer</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
