"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AudienceSplit({ resumeUrl }: { resumeUrl?: string | null }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Full‑Stack Engineer</div>
        </div>
        <div className="mt-4 flex gap-3">
          {resumeUrl && (
            <Button asChild variant="outline">
              <Link href={resumeUrl}>View Resume</Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/projects">Projects</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="card p-6"
      >
        <div className="text-lg font-semibold">Freelance</div>
        <div className="mt-4 flex gap-3">
          <Button asChild>
            <Link href="/hire">Hire Me</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">About</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
