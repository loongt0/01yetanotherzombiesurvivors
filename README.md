# Yet Another Zombie Survivors Wiki

A research-backed Next.js wiki for **Yet Another Zombie Survivors**, with MDX
articles, localized routes, verified official links, and a desktop/mobile visual
audit.

## Requirements and commands

Use Node.js 20.9 or newer.

```bash
npm install
npx playwright install chromium
npm run dev
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run test:e2e
```

The development server runs at `http://localhost:3000`. The production website,
canonical URLs, localized alternates, and structured data use
`https://www.yetanotherzombiesurvivors.world` by default. Override
`NEXT_PUBLIC_SITE_URL` only when deploying to another explicitly configured origin.

## Google Analytics

Google Analytics 4 is optional. Set your real measurement ID in `.env.local` for
local development or in your hosting provider's production environment:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The Google tag loads across all pages and locales only when the value is a valid
GA4 measurement ID. Leave the variable unset to disable analytics. Configure it
before running `npm run build`, because Next.js embeds public environment
variables at build time; redeploy or rebuild after changing the value.

## Routes and locales

The primary English URLs are:

- `https://yetanotherzombiesurvivors.world/`
- `https://yetanotherzombiesurvivors.world/guides/`
- `https://yetanotherzombiesurvivors.world/guides/best-team/`
- `https://yetanotherzombiesurvivors.world/characters/`
- `https://yetanotherzombiesurvivors.world/privacy/`
- `https://yetanotherzombiesurvivors.world/terms/`

English is the canonical unprefixed locale. Russian, Spanish, and German use the
`/ru`, `/es`, and `/de` prefixes. The legacy `/classes/` path permanently redirects
to `/characters/`.

## Content and fact checking

English guide articles live in `src/content/en/guides/*.mdx`. Localized survivor
articles live in `src/content/<locale>/characters.mdx`, while
`src/content/registry.ts` owns article registration and English fallback.

Homepage copy, navigation, SEO keywords, and verified official URLs are defined
in `src/lib/home-data.ts` and `src/lib/site-data.ts`. Only researched facts belong
in published content: version-specific uncertainties must be labeled
`unconfirmed`, and features without researched sources must not be published.

## Visual verification

Start the local development server in one terminal and run the audit in another:

```bash
npm run dev
npm run audit:visual
```

The audit measures `/`, `/guides/`, and `/characters/` at desktop 1440×1000 and
mobile 390×844 viewports. It writes six screenshots and measurements to the
ignored `test-results/visual-audit/` directory. An optional
`VISUAL_REFERENCE_URL` enables a separately configured comparison source.

Refresh the reviewed baseline only after checking the new captures:

```bash
npm run audit:visual -- --write-baseline
```

The audit checklist is `e2e/reference-checklist.md`, and its portable measurement
baseline is `e2e/reference-baseline/measurements.json`.
