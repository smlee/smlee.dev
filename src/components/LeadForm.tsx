"use client";

import { useState } from "react";
import { postLead } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setError(null);
    try {
      const payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        company: String(formData.get("company") || ""),
        message: String(formData.get("message") || ""),
        source: "hire-page",
      };
      await postLead(payload);
      setStatus("success");
    } catch (e: unknown) {
      const message =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to submit";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <form action={onSubmit} className="space-y-4 max-w-xl">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message">Project details</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send"}
      </Button>
      {status === "success" && (
        <p className="text-green-600 text-sm">Thanks! I’ll get back to you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </form>
  );
}
