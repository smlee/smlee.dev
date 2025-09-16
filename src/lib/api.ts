export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
};

export async function postLead(payload: LeadPayload) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-cache',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Lead submit failed (${res.status}): ${text}`);
  }
  return res.json().catch(() => ({}));
}
