# Yet Another Zombie Survivors Wiki

A research-backed Next.js wiki for **Yet Another Zombie Survivors**, with MDX
articles, localized routes, verified official links, and a desktop/mobile visual
audit.

## Requirements and commands

Use Node.js 24 LTS (also used by CI).

```bash
npm ci
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
`/ru`, `/es`, and `/de` prefixes. URL paths determine the language; browser preferences and saved locale
cookies do not redirect English URLs. Untranslated localized articles redirect to
their English URL without negotiating back to the missing translation. The legacy `/classes/` path permanently redirects
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

## Comments

Remark42 is embedded below guide articles, the beginner guide, and survivor pages.
The service is `https://comments.yetanotherzombiesurvivors.world`, site ID `remark`.
Each localized canonical page URL identifies its discussion; query strings and
preview origins do not create separate threads. The widget follows the site's
dark theme and is destroyed/recreated during client-side navigation.

Login providers are managed on the Remark42 server (currently Discord and
anonymous). OAuth secrets stay on that server and must never be added to the
Next.js environment or repository. Browser integration testing requires HTTPS,
since Remark42 rejects a parent page whose protocol differs from its host.

## Security and automated checks

GitHub Actions runs dependency audit, lint, type checking, unit tests, a production
build, and HTTP routing regressions on pushes and pull requests. CodeQL scans
JavaScript/TypeScript on pushes, pull requests, and weekly. Dependabot checks npm
and GitHub Actions dependencies weekly.

The scoped `toml` override keeps `remark-mdx-frontmatter` on patched versions (4.2 or later)
until its upstream dependency range is updated. MDX compilation is covered by the
content tests and production build; review this override when upgrading the plugin.
