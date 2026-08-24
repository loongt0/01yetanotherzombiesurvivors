# Farever Wiki replica

A local Next.js replica of the Farever Wiki reference, with canonical English pages and translated German, Spanish, and French routes.

## Requirements and commands

Use Node.js 20.9 or newer.

```bash
npm install
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

## Visual verification

`npm run test:e2e` exercises the desktop and mobile route matrix. The measured reference notes and screenshot matrix are recorded in `e2e/reference-checklist.md`; the audit writes ignored screenshots and raw measurements to `test-results/visual-audit/`.
