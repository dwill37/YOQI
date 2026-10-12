# YOQI Wellness Travel website

One-page site for YOQI Wellness Travel (Buduk, Mengwi, Bali). Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production preview (closest to the live site, use this to judge animation smoothness):

```bash
npm run build
npm start
```

## Where to edit content

- `src/lib/site.ts`: business facts, WhatsApp messages, experiences, FAQ, social links, map/review links.
- `src/app/layout.tsx`: SEO title/description, JSON-LD (set `GEO` coordinates there).
- `src/components/sections/*`: one component per page section.
- Search the project for `[PLACEHOLDER` to find every value still to fill in, and `TODO(verify)` for the "Open 24 hours" claim.

Images live in `public/images` (crops generated from the original `/image` folder).
