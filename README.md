# Karim Nucci — Portfolio

Production-ready personal portfolio scaffolded for fast deploy on Vercel. Built to be the proof itself: the portfolio is a working demo of the frontend skills it advertises.

**Live target:** `karimnucci.dev` (register on Cloudflare/Namecheap, point to Vercel after deploy)

---

## Stack

- **Next.js 15** (App Router, RSC where possible, Turbopack)
- **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css`)
- **Motion** (formerly Framer Motion) — animations, scroll progress, magnetic hover
- **React Three Fiber + drei** — 3D hero element (icosahedron with distortion material)
- **next-themes** — dark mode (default: dark, with light toggle)
- **Anthropic SDK** — AI chat widget that answers questions about Karim, streamed responses
- **lucide-react** — icons

---

## Quick start (4 steps)

```bash
# 1. Install
npm install

# 2. Setup env
cp .env.example .env.local
# then edit .env.local and add ANTHROPIC_API_KEY (get it from console.anthropic.com)

# 3. Run dev
npm run dev

# 4. Open
# http://localhost:3000
```

---

## Things Karim has to customize (≈2-4 hours)

### 1. Content — edit `src/lib/data.ts`

Single source of truth for everything visible on the page. Replace placeholder values with real ones:

- `profile.name` `profile.title` `profile.tagline` — already filled, tweak voice if wanted
- `profile.longBio[]` — 3 paragraphs about Karim
- `profile.email` `profile.phone` `profile.socials.*`
- `projects[]` — replace placeholder metrics (`4+ product teams`, `~30%`, etc.) with real numbers from Accenture projects
- `skills[]` — already organized, tweak proficiency levels (`expert` / `advanced` / `proficient` / `familiar`) to match honest self-assessment
- `experience[]` — bullets matching CV v3, sync any updates
- `languages[]` — already correct

**Important:** keep this data in sync with `Karim_CV_v3_FINAL_2026-05-21.md`. Recruiter cross-checking is real in 2026.

### 2. Assets — drop files in `/public`

- `public/karim-nucci-cv.pdf` — the visual CV exported from FlowCV. Linked from hero "Download CV" button.
- `public/og-image.png` — 1200×630 social share image (optional but recommended)
- `public/favicon.ico` — favicon (optional, Next.js has a default)
- `public/karim.jpg` — profile photo (currently not used in components but you can add it to About section if desired)

### 3. AI chat — add API key

- Get an API key at [console.anthropic.com](https://console.anthropic.com)
- Add to `.env.local` as `ANTHROPIC_API_KEY=sk-ant-...`
- The chat uses `claude-haiku-4-5` (fast, cheap, ~$1/M input tokens)
- Estimated cost: pennies per month for a personal portfolio
- If no key is set, the chat shows a friendly "not configured" message — site still works perfectly

### 4. Optional polish

- Replace the 3D mesh in `src/components/hero-3d.tsx` with something custom (current: distorted icosahedron — clean default)
- Customize colors in `src/app/globals.css` `@theme` block
- Update site metadata in `src/app/layout.tsx`

---

## Deploy to Vercel (5 minutes)

```bash
# Option A — via Vercel CLI
npm i -g vercel
vercel
# follow prompts; on first deploy add env var ANTHROPIC_API_KEY in dashboard or via prompt

# Option B — via GitHub
# 1. Push this folder to a new repo: github.com/Nucci-karim/portfolio
# 2. Go to vercel.com → New Project → Import from GitHub → pick the repo
# 3. Add env var: ANTHROPIC_API_KEY=sk-ant-...
# 4. Deploy → done. Vercel gives you karimnucci-portfolio.vercel.app
```

### Custom domain (`karimnucci.dev`)

1. Buy domain on Cloudflare or Namecheap (~$12/year for `.dev` TLD)
2. In Vercel project → Settings → Domains → Add Domain
3. Update DNS records as Vercel instructs (CNAME or A records)
4. Wait 5-30 min for propagation, Let's Encrypt SSL auto-provisions

---

## Performance targets

- Lighthouse Performance ≥ 95
- LCP < 2.5s on 4G
- CLS < 0.1
- No render-blocking resources
- 3D scene lazy-loaded (`dynamic({ ssr: false })`)
- Tree-shaken icons via `optimizePackageImports`

Run audit:
```bash
npm run build
npm run start
# then in Chrome DevTools → Lighthouse → Generate report (Desktop + Mobile)
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout + theme provider
│   ├── page.tsx             # Main page assembly
│   ├── globals.css          # Tailwind v4 + theme tokens
│   └── api/chat/route.ts    # AI chat backend (streaming)
├── components/
│   ├── navigation.tsx       # Sticky nav with scroll-aware blur
│   ├── theme-toggle.tsx     # Light/dark toggle
│   ├── theme-provider.tsx   # next-themes wrapper
│   ├── scroll-progress.tsx  # Top progress bar
│   ├── hero.tsx             # Hero section (text)
│   ├── hero-3d.tsx          # 3D mesh (client-only)
│   ├── about.tsx            # About + experience + languages
│   ├── selected-work.tsx    # Project grid + modal
│   ├── tech-stack.tsx       # Skill categories with dot levels
│   ├── contact.tsx          # Contact info + mailto form
│   └── ai-chat.tsx          # Floating chat widget
└── lib/
    ├── data.ts              # ALL content lives here
    └── utils.ts             # cn() helper
```

---

## License

MIT — free to fork, learn from, or use as a starting point for your own portfolio.

---

## Built with

Next.js · TypeScript · Tailwind v4 · Motion · React Three Fiber · Anthropic API · Vercel
