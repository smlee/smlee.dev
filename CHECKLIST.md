# smlee.dev Setup Checklist

Last updated: 2025-09-12

## 0. Repo setup
- [x] Create repo structure (local)
- [x] Add MIT LICENSE
- [x] Add README
- [x] Add .gitignore

## 1. Frontend (smlee.dev)
- [x] Init Next.js App Router + TypeScript (npm)
- [x] Add Tailwind (via Next.js setup)
- [ ] Add shadcn/ui
- [x] Add Framer Motion (pkg installed)
- [ ] Add Contentlayer for MDX projects (deferred: Next.js 15 compat)
- [x] Routes: `/`, `/projects`, `/projects/[slug]`, `/hire`, `/about`, `/writing`, `/resume`
- [x] Components: Hero, MetricsBar, ProductPanel (Mindcraftor, RankLabs), Timeline, Skills, LeadForm
- [x] SEO/AEO: per-page metadata, sitemap, robots.txt, OG images, JSON-LD
- [x] API client `lib/api.ts` uses `process.env.NEXT_PUBLIC_API_BASE_URL`
- [ ] Vercel deploy target
- [ ] Env vars in Vercel dashboard:
  - [ ] `NEXT_PUBLIC_API_BASE_URL=https://api.smlee.dev`
  - [ ] `NEXT_PUBLIC_SHOW_HIRE_CTA=true`
- [ ] CI/CD: Vercel auto-build from main

## 2. Backend (smlee.dev-api)
- [ ] Init Node.js + TypeScript project with Fastify (npm)
- [ ] Add routes: `GET /health`, `POST /leads` (Zod, rate-limited), `GET /search` (optional Supabase pgvector), `POST /notify` (optional Resend)
- [ ] Middleware: Helmet, CORS, Pino logger, rate limit
- [ ] Env config via `.env`
- [ ] PM2 installed on server
- [ ] `ecosystem.config.js` for process management
- [ ] Nginx reverse proxy: `smlee.dev` → Vercel, `api.smlee.dev` → DO backend (4000 → 80/443)
- [ ] Deployment steps documented: clone → npm install → npm run build → pm2 start
- [ ] PM2 startup + logs: `pm2 save && pm2 startup`

## 3. Integration
- [ ] Frontend `/hire` form posts to backend `/leads`
- [ ] Backend CORS whitelist: `https://smlee.dev`, `http://localhost:3000`

## 4. Supabase (optional)
- [ ] `USE_SUPABASE=true` flag
- [ ] Tables: `leads`, `search_docs`
- [ ] Nightly script to embed MDX content

## 5. QA & Security
- [ ] Lighthouse (mobile ≥95)
- [ ] Validate JSON-LD in Google Rich Results
- [ ] Test `/hire` lead capture end-to-end
- [ ] Rate limit + input validation enforced
- [ ] HTTPS via Nginx + Let’s Encrypt on `api.smlee.dev`

## 6. CI/CD
- [ ] Frontend: Vercel auto-deploy on push to main
- [ ] Backend: GitHub Actions (build & test on push)
- [ ] Backend deploy: manual or script to DO server
- [ ] PM2 keeps backend alive and restarts on crash


SEO/AEO/GEO Checklist

Confirm per-page metadata (titles/descriptions) for Home, About, Projects, Hire, Resume and improve descriptions for About/Projects/Hire.

Add canonical tags to each page’s metadata using NEXT_PUBLIC_SITE_URL + path.

Enhance Person JSON-LD with ContactPoint (business email), availableLanguage, and areaServed.

Add JSON-LD for Projects as CreativeWork (name, description, url, image) on Projects page.

Ensure image alt text is descriptive for product screenshots on LandingProducts and ProductPanel.

Add FAQ block (and JSON-LD) to Hire page (2–4 concise Q&As).

Set up BreadcrumbList JSON-LD for deeper pages (projects/posts) for future-proofing.

Verify robots.txt and conditional sitemap work in prod, exclude /writing if no posts.

Entity building: expand sameAs with additional authoritative profiles (Twitter/X, NPM, YouTube, Mindcraftor, RankLabs).

Submit site to Google Search Console and Bing Webmaster Tools; verify domain.

Performance/CWV pass: check LCP/CLS/INP, ensure images have width/height, preconnect to API/CDN, audit font loading.

Backlinks: add links from GitHub profile, LinkedIn, Mindcraftor, RankLabs back to smlee.dev.