# tensift · site

The premium product page for [tensift](https://github.com/sachncs/tensift) — a research-grade Rust implementation of a deterministic 7-stage integer-factorization pipeline.

This directory is the source of truth for everything that ships to the GitHub Pages site at <https://sachncs.github.io/tensift/>.

## Stack

- **Vite 5** — fast, modern build tool
- **React 18** + **TypeScript** — typed component model
- **Tailwind CSS 3** — design tokens & utility classes
- **Framer Motion** — restrained, on-scroll animations
- **Lucide React** — crisp icon set

## Layout

```
site/
├── index.html              # Vite entry HTML (meta, fonts, schema)
├── public/                 # Copied as-is to dist root
│   ├── favicon.svg
│   ├── logo.svg
│   └── og.svg              # Open Graph preview card
├── src/
│   ├── components/         # Section-level React components
│   │   ├── Nav.tsx         # Sticky, blurred, theme-aware navigation
│   │   ├── Logo.tsx
│   │   ├── Hero.tsx        # Headline + CTA + animated trace visual
│   │   ├── HeroVisual.tsx
│   │   ├── CredibilityBar.tsx
│   │   ├── Pipeline.tsx    # The 7-stage pipeline (lattice → algebra)
│   │   ├── Features.tsx    # Six premium feature cards
│   │   ├── Trace.tsx       # Animated CLI / terminal demo
│   │   ├── Numbers.tsx     # Engineering metrics
│   │   ├── UseCases.tsx    # Audience tiles
│   │   ├── GetStarted.tsx  # CTA with copy-to-clipboard install
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useScroll.ts    # scroll position / direction
│   │   └── useTheme.ts     # dark / light toggle (persisted)
│   ├── lib/
│   │   └── site-config.ts  # Single source of truth for copy & stats
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Tailwind layers + design tokens
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── tsconfig.json
```

## Scripts

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Deployment

The site deploys automatically to GitHub Pages on every push to `master` via `.github/workflows/pages.yml`. The workflow:

1. Sets up Node 20 with npm caching.
2. Reads `${{ steps.pages.outputs.base_path }}` from the official Pages setup action and exposes it as `VITE_BASE` (so the project page at `/tensift/` resolves assets correctly).
3. Builds with `npm run build`, producing `site/dist/`.
4. Uploads `site/dist/` as the Pages artifact.

The page is a single document — every section uses anchor IDs (`#pipeline`, `#features`, `#trace`, `#numbers`, `#audience`, `#start`) and the nav scrolls smoothly between them. No client-side router is needed.

## Brand

- Background: `#0b0a09` (warm ink)
- Accent: `#D67829` → `#A14A14` (amber gradient)
- Display: Instrument Serif (italic available)
- Body: Inter
- Mono: JetBrains Mono

Colors and typography live in `tailwind.config.js` and `src/index.css`. Keep the page restrained — restraint is the point.