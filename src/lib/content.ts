import fs from 'fs';
import path from 'path';

type Person = {
  name?: string;
  tagline?: string;
  subtext?: string;
  location?: string;
  email?: string;
  links?: {
    github?: string | null;
    linkedin?: string | null;
    resume_url?: string | null;
  };
};

export type ContentPack = {
  person?: Person;
  stats?: {
    years_experience?: string | null;
    products_built?: string | null;
    startups_founded?: string | null;
    repos_count?: string | null;
  };
  products?: Array<{
    name?: string;
    status?: string | null;
    date_start?: string | null;
    date_end?: string | null;
    summary?: string | null;
    bullets?: string[];
    screenshot?: string | null;
    cta_url?: string | null;
  }>;
  experience?: Array<{
    role?: string;
    company?: string;
    date_start?: string | null;
    date_end?: string | null;
    bullets?: string[];
    logo?: string | null;
  }>;
  skills?: string[];
  hire?: {
    services?: string[];
    packages?: string[];
  };
  assertions?: {
    fail_on_todo?: boolean;
    forbid_guesses?: boolean;
    render_missing_as?: string;
  };
};

export function loadContentPack(): ContentPack {
  const file = path.join(process.cwd(), 'CONTENT_PACK');
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw) as ContentPack;

  const problems: string[] = [];
  // Fail if any literal "TODO" is present in known string fields
  const checkTodo = (label: string, value: unknown) => {
    if (typeof value === 'string' && value.trim().toUpperCase() === 'TODO') {
      problems.push(`${label} has TODO`);
    }
  };

  data.products?.forEach((p, idx) => {
    checkTodo(`products[${idx}].date_start`, p.date_start ?? null);
    checkTodo(`products[${idx}].date_end`, p.date_end ?? null);
  });

  if (data.assertions?.fail_on_todo && problems.length > 0) {
    const msg = `CONTENT_PACK validation failed due to TODOs:\n- ${problems.join('\n- ')}`;
    throw new Error(msg);
  }

  return data;
}

export function display(value: unknown, fallback = '—'): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string' && value.trim().length === 0) return fallback;
  return String(value);
}
