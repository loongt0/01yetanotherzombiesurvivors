# Farever Wiki Replica Design

## Goal

Build a faithful, responsive replica of `https://farevergame.wiki/` with Next.js, localized routes, and MDX-authored content. The first release implements three representative pages while preserving the target site's Farever branding, copy, navigation structure, and visual language.

## First-release scope

The required pages are:

1. `/` — the full landing page.
2. `/guides/` — the guide directory/list page.
3. `/guides/farever-best-class/` — an article detail page.

The same pages are available under `/de/`, `/es/`, and `/fr/`. English is the default locale and keeps the target site's unprefixed URLs. Other visible navigation links retain the target site's information architecture but resolve to the replica's localized 404 until their pages are implemented.

## Fidelity target

The implementation reproduces the target site's layout rather than introducing a new design. The reference was inspected from the live homepage, guide directory, best-class article, rendered HTML, and public stylesheet.

The shared visual system includes:

- A near-black `#05030c` background with violet, cyan, and gold radial lighting.
- A faint fixed grid and noise texture.
- Gold `#d4af6a`, pale gold `#f6d98a`, cyan `#5ee2d8`, violet `#8b5cf6`, and off-white `#f5f1ff` tokens.
- Metamorphous/Cormorant Garamond display typography and Inter body typography.
- A two-level sticky desktop header, compact wrapped mobile navigation, and the target footer structure.
- Gold/cyan gradient headings, glowing diamond ornaments, gradient-border cards, pill buttons, and restrained hover elevation.
- The same 1240px outer content width and approximately 780px article measure.

Images will use the target site's public Farever icon and referenced imagery only where required for faithful reproduction. Assets needed at runtime will be stored locally in `public/` so the replica does not depend on hotlinking.

## Page designs

### Homepage

The homepage mirrors the target page section order:

1. Full-height hero with concentric animated rings, Farever icon, eyebrow, two-line gradient title, supporting copy, two CTAs, four-stat strip, and scroll cue.
2. “What is Farever?” overview with prose and quick-facts card.
3. Four-class card grid.
4. Two-region feature grid.
5. “Start Your Journey” guide grid.
6. Tools and tier-list cards.
7. Featured guides.
8. Latest news.
9. FAQ.
10. Final CTA and shared footer.

Motion matches the reference's fade-up, floating icon, slow rotation, and glow pulse. Reduced-motion users receive static equivalents.

### Guide directory

The guide directory uses the target article-style page header: radial violet glow, gold diamond eyebrow, gradient H1, summary, and ornament. Below it is the same two-column desktop/one-column mobile grid of bordered guide cards. Cards show category, title, description, and a read affordance.

### Article detail

The best-class article uses the target's narrow `prose-game` template. It contains the same centered header treatment followed by MDX-rendered paragraphs, tier sections, internal links, and comparison table. Headings, lists, links, emphasis, tables, and callouts are mapped to controlled MDX components so content authors cannot accidentally break the visual system.

## Application architecture

The project uses:

- Next.js App Router with TypeScript.
- `next-intl` for locale detection, dictionaries, localized links, and metadata strings.
- `@next/mdx` plus frontmatter parsing for authored pages.
- CSS Modules or a single global stylesheet with semantic component classes. Tailwind is not required; fidelity comes from reproducing the observed CSS values and responsive rules directly.
- `lucide-react` for the small interface icons visible in the reference.

Key modules:

- `app/[locale]/...` contains localized route entry points.
- Middleware redirects or rewrites default English routes so `/`, `/guides/`, and `/guides/farever-best-class/` remain canonical without `/en`.
- `components/site-header.tsx` and `components/site-footer.tsx` own shared chrome.
- `components/page-hero.tsx`, `components/section-title.tsx`, and card components reproduce shared presentation units.
- `components/mdx-components.tsx` provides the controlled article component map.
- `content/{locale}/.../*.mdx` stores page content and frontmatter.
- `messages/{locale}.json` stores navigation, button, footer, and other shared UI strings.
- `lib/content.ts` resolves a locale and slug to content, validates frontmatter, and falls back to English only when a localized document is absent.

## Localization behavior

Supported locales are English, German, Spanish, and French, matching the reference site's language set. English is canonical at unprefixed URLs. German, Spanish, and French use `/de`, `/es`, and `/fr` prefixes.

Each page emits localized title and description metadata, canonical URL, and `hreflang` alternates. The language selector keeps the user on the equivalent page when a translation exists. Missing localized content falls back to English while shared interface strings remain localized; missing slugs render the localized 404.

## Content model

Every MDX file includes validated frontmatter:

```yaml
title: string
description: string
eyebrow: string
published: YYYY-MM-DD
updated: YYYY-MM-DD
```

Directory cards are generated from guide article frontmatter rather than duplicated in React. Homepage section data may remain in locale-aware TypeScript configuration where the layout is highly structured, while narrative article content stays in MDX.

## Error and boundary behavior

- Unknown paths use a themed “Lost in Siagarta” 404 with home and beginner-guide actions.
- Invalid or incomplete frontmatter fails the build with a readable file-specific error.
- Missing images show reserved aspect-ratio placeholders and meaningful alt text rather than collapsing layout.
- External Steam links open in a new tab with safe `rel` attributes.
- No analytics, account system, forms, or live server data are included in this release.

## Responsive and accessibility requirements

- Desktop breakpoint behavior follows the reference: the full two-level navigation appears at 1024px and above; smaller widths use the wrapped compact navigation.
- Page grids collapse from two or four columns to one or two columns as in the reference.
- Article tables remain usable on narrow screens through horizontal overflow.
- All interactive elements have visible keyboard focus, image alt text, sufficient labels, and semantic landmarks.
- Decorative animation obeys `prefers-reduced-motion`.

## Verification

Completion requires:

- TypeScript and production build success.
- Automated route checks for all three page types in all four locales.
- MDX rendering tests for headings, links, lists, and tables.
- Metadata and alternate-language link checks.
- Desktop and mobile browser screenshots compared against the reference for header, hero, card grid, article measure, footer, colors, spacing, and responsive behavior.
- Browser console inspection with no application errors.

## Out of scope

The first release does not reproduce every target URL, live Steam/server widgets, analytics, advertising, user accounts, search, CMS editing, or the separate Yet Another Zombie Survivors content already present in the workspace. Those can be added after the three-page replica is accepted.
