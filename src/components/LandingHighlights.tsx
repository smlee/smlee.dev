"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LandingHighlights() {
  const items = [
    { icon: "⚡", title: "28% faster UIs", desc: "Measured performance uplift" },
    { icon: "🚀", title: "Launched Mindcraftor", desc: "AI validation for 1,600+ users" },
    { icon: "🗺️", title: "3D Geospatial Visuals", desc: "Secure, compliance-friendly" },
    { icon: "🔁", title: "Legacy → React/Node", desc: "Improved CRO at Complex" },
  ];

  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Highlights / Proof</h2>
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="h-full"
          >
            <Card className="h-full px-4 py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span aria-hidden>{it.icon}</span>
                  {it.title}
                </CardTitle>
                <CardDescription>{it.desc}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
