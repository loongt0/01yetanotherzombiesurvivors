# Farever Wiki replica

A local Next.js replica of the Farever Wiki reference, with canonical English pages and translated German, Spanish, and French routes.

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

The development server defaults to `http://localhost:3000`.

## Routes and locales

The three canonical English URLs are:

- `http://localhost:3000/`
- `http://localhost:3000/guides/`
- `http://localhost:3000/classes/`

English is canonical and therefore has no locale prefix. Translations use the `/de`, `/es`, and `/fr` prefixes; for example, `/de/guides/`, `/es/guides/`, and `/fr/guides/`.

## Content

MDX source content lives under `src/content/<locale>/`:

- Class articles: `src/content/<locale>/classes.mdx`
- Guide articles: `src/content/<locale>/guides/*.mdx`
- Content registration and guide ordering: `src/content/registry.ts`

English MDX in `src/content/en/` is the canonical source. The matching `de`, `es`, and `fr` trees contain translated content.

## Repository guidance

`AGENTS.md` is intentionally committed because Next.js 16 generates and
re-adds its version-specific agent rules during development. `CLAUDE.md`
includes those same rules. They are repository guidance rather than runtime
application files, and keeping both avoids a dirty tree after `next dev`.

## Visual verification

`npm run test:e2e` exercises the desktop and mobile route matrix. For a measured
side-by-side audit, leave the local development server running in one terminal:

```bash
npm run dev
```

Then run this in a second terminal:

```bash
npm run audit:visual
```

The audit requires Chromium (installed by the Playwright command above), the
local app at `http://127.0.0.1:3000`, and network access to the public reference
at `https://farevergame.wiki`. It captures `/`, `/guides/`, and `/classes/` at
1440×1000 and at the Playwright iPhone 13 390×844 profile. It waits for fonts and
images, scrolls through lazy content, and writes the 12 ignored screenshots plus
raw measurements to `test-results/visual-audit/`.

The audit method, screenshot matrix, and findings are documented in
`e2e/reference-checklist.md`. The reviewed raw measurement baseline is committed
at `e2e/reference-baseline/measurements.json`. Maintainers can deliberately
replace that baseline after reviewing a new capture with:

```bash
npm run audit:visual -- --write-baseline
```
