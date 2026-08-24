# Farever Wiki Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a faithful four-locale Next.js replica of the Farever Wiki homepage, guide directory, and Classes & Jobs article at `/`, `/guides/`, and `/classes/`.

**Architecture:** A Next.js 16 App Router app renders locale-aware Server Components from a top-level `[locale]` segment while `next-intl` uses `localePrefix: 'as-needed'` to keep English URLs unprefixed. Shared chrome and visual primitives reproduce the reference CSS; structured homepage data lives in locale dictionaries, while the guide directory and Classes & Jobs article are authored in local MDX and resolved through a typed content registry.

**Tech Stack:** Node.js 20.9+, Next.js 16.3+, React 19, TypeScript, next-intl, @next/mdx, remark-gfm, remark-frontmatter, remark-mdx-frontmatter, Zod, Lucide React, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-24-farever-wiki-replica-design.md`

## Global Constraints

- Implement exactly three English canonical routes: `/`, `/guides/`, and `/classes/`.
- Provide equivalent German, Spanish, and French routes under `/de`, `/es`, and `/fr`; English remains unprefixed.
- Preserve Farever branding and the target site's visible copy, section order, shared navigation, footer, and responsive layout.
- Use the observed palette: `#05030c`, `#d4af6a`, `#f6d98a`, `#5ee2d8`, `#8b5cf6`, and `#f5f1ff`.
- Use Metamorphous/Cormorant Garamond for display text and Inter for body text.
- Store runtime images locally under `public/`; do not hotlink the reference site.
- Use MDX for the guide directory data source and the Classes & Jobs article body.
- Unknown routes render the themed localized “Lost in Siagarta” 404.
- Decorative animation must obey `prefers-reduced-motion`.
- Do not add analytics, accounts, forms, search, advertising, live server data, or YAZS content.

## File map

```text
farever-wiki/
├── package.json                         scripts and dependencies
├── next.config.mjs                     next-intl and MDX composition
├── tsconfig.json                        strict TypeScript and @/* alias
├── vitest.config.ts                     unit/component test environment
├── playwright.config.ts                 desktop/mobile browser projects
├── mdx-components.tsx                   required global MDX component map
├── public/
│   ├── icon.png                         local copy of Farever icon
│   └── og.png                           local social preview image
├── src/
│   ├── proxy.ts                         locale negotiation and prefix routing
│   ├── app/
│   │   ├── globals.css                  reference design tokens and primitives
│   │   └── [locale]/
│   │       ├── layout.tsx               locale validation and shared shell
│   │       ├── page.tsx                 homepage composition
│   │       ├── not-found.tsx            localized themed 404
│   │       ├── guides/page.tsx           guide directory
│   │       └── classes/page.tsx          MDX article detail
│   ├── components/
│   │   ├── site-header.tsx              two-level desktop/mobile navigation
│   │   ├── site-footer.tsx              five-column footer and locale links
│   │   ├── language-switcher.tsx        equivalent-route locale navigation
│   │   ├── game-image.tsx               stable image frame and failure fallback
│   │   ├── page-hero.tsx                shared article page header
│   │   ├── section-title.tsx            kicker/title/diamond ornament
│   │   ├── guide-card.tsx               guide directory card
│   │   └── home-sections.tsx            focused homepage section components
│   ├── content/
│   │   ├── registry.ts                  typed static MDX imports and lookup
│   │   ├── schema.ts                    Zod frontmatter validation
│   │   ├── en/guides/*.mdx              English guide cards/content
│   │   ├── de/guides/*.mdx              German guide cards/content
│   │   ├── es/guides/*.mdx              Spanish guide cards/content
│   │   ├── fr/guides/*.mdx              French guide cards/content
│   │   └── {en,de,es,fr}/classes.mdx     Classes & Jobs article bodies
│   ├── i18n/
│   │   ├── routing.ts                   localePrefix and supported locales
│   │   ├── navigation.ts                localized Link/pathname helpers
│   │   └── request.ts                   request locale and message loading
│   ├── lib/
│   │   ├── metadata.ts                  canonical and hreflang generation
│   │   └── site-data.ts                 nav/footer/home structured data
│   └── messages/{en,de,es,fr}.json       localized shared interface copy
├── tests/
│   ├── content.test.ts                  registry and frontmatter behavior
│   ├── routing.test.ts                  locale config and path helpers
│   ├── shell.test.tsx                   header/footer semantics
│   └── pages.test.tsx                   page composition and MDX components
└── e2e/replica.spec.ts                  routes, viewport, metadata, console
```

---

### Task 1: Scaffold the tested Next.js and locale-routing foundation

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `src/proxy.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/messages/en.json`
- Create: `src/messages/de.json`
- Create: `src/messages/es.json`
- Create: `src/messages/fr.json`
- Test: `tests/routing.test.ts`

**Interfaces:**
- Produces: `routing` with `locales = ['en', 'de', 'es', 'fr']`, `defaultLocale = 'en'`, and `localePrefix = 'as-needed'`.
- Produces: localized `Link`, `redirect`, `usePathname`, `useRouter`, and `getPathname` from `src/i18n/navigation.ts`.

- [ ] **Step 1: Create the package manifest and install the required toolchain**

Use scripts `dev`, `build`, `start`, `lint`, `test`, `test:watch`, and `test:e2e`. Install runtime packages `next`, `react`, `react-dom`, `next-intl`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, `zod`, and `lucide-react`; install TypeScript, ESLint, Vitest, jsdom, Testing Library, and Playwright development packages.

Run: `npm install`

Expected: dependencies install and `node_modules/.bin/next` exists.

- [ ] **Step 2: Write the failing locale-routing test**

```ts
import {describe, expect, it} from 'vitest';
import {routing} from '@/i18n/routing';

describe('locale routing', () => {
  it('keeps English unprefixed and exposes the reference locales', () => {
    expect(routing.locales).toEqual(['en', 'de', 'es', 'fr']);
    expect(routing.defaultLocale).toBe('en');
    expect(routing.localePrefix).toBe('as-needed');
  });
});
```

- [ ] **Step 3: Run the test and verify the missing module failure**

Run: `npm test -- tests/routing.test.ts`

Expected: FAIL because `@/i18n/routing` does not exist.

- [ ] **Step 4: Implement the locale foundation and a minimal localized root page**

`src/i18n/routing.ts` must contain:

```ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
```

Compose `createNextIntlPlugin()` with `createMDX()` in `next.config.mjs`, include `mdx` in `pageExtensions`, configure the three remark plugins by package-name string, and implement `src/proxy.ts` with the documented matcher that excludes APIs, Next internals, Vercel internals, and dotted asset paths. The locale layout validates `params.locale`, calls `notFound()` for unsupported values, loads messages, and emits `<html lang={locale}>`.

- [ ] **Step 5: Run foundation checks**

Run: `npm test -- tests/routing.test.ts && npm run lint && npm run build`

Expected: routing test PASS, ESLint exits 0, and Next production build succeeds for four localized root pages.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json package-lock.json next.config.mjs tsconfig.json eslint.config.mjs vitest.config.ts tests/setup.ts tests/routing.test.ts src
git commit -m "feat: scaffold localized Next.js app"
```

---

### Task 2: Add the validated MDX content registry

**Files:**
- Create: `mdx-components.tsx`
- Create: `src/content/schema.ts`
- Create: `src/content/registry.ts`
- Create: `src/content/mdx.d.ts`
- Create: `src/content/{en,de,es,fr}/guides/farever-best-class.mdx`
- Create: `src/content/{en,de,es,fr}/classes.mdx`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `type ContentFrontmatter = {title: string; description: string; eyebrow: string; published: string; updated: string; slug: string}` and `type GuideCardRecord = ContentFrontmatter & {href: string; Content: ComponentType}`.
- Produces: `getGuideCards(locale: Locale): GuideCardRecord[]`.
- Produces: `getClassesArticle(locale: Locale): {frontmatter: ContentFrontmatter; Content: ComponentType}`.

- [ ] **Step 1: Write failing validation and lookup tests**

```ts
import {describe, expect, it} from 'vitest';
import {frontmatterSchema} from '@/content/schema';
import {getClassesArticle, getGuideCards} from '@/content/registry';

describe('content registry', () => {
  it('rejects incomplete frontmatter with the missing field name', () => {
    expect(() => frontmatterSchema.parse({title: 'Only a title'})).toThrow(/description/);
  });

  it('returns localized classes content and guide cards', () => {
    expect(getClassesArticle('de').frontmatter.title).toMatch(/Klassen/);
    expect(getGuideCards('en').some((card) => card.slug === 'farever-best-class')).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests and verify lookup modules are missing**

Run: `npm test -- tests/content.test.ts`

Expected: FAIL because schema and registry modules do not exist.

- [ ] **Step 3: Implement the schema, static registry, and MDX component contract**

Use `z.object()` with ISO-date regex `/^\d{4}-\d{2}-\d{2}$/`. Import each MDX module explicitly so the build graph is static. Parse each module's generated `frontmatter` export once when constructing the registry. `getGuideCards(locale)` sorts by `updated` descending and falls back to English only when a locale entry is missing. `getClassesArticle(locale)` returns the exact localized module.

`mdx-components.tsx` exports `useMDXComponents(components)` and maps semantic elements to classes such as `article-heading`, `article-table-wrap`, and `article-link` without allowing page-level layout changes.

- [ ] **Step 4: Author minimal but valid localized MDX fixtures**

Each file begins with YAML frontmatter containing all six required fields. The English Classes file includes at least one `##` heading, one table, one list, and one link so later rendering tests cover every controlled MDX primitive. The three translations use accurate localized titles and section labels while retaining Farever proper nouns.

- [ ] **Step 5: Run the registry tests and typecheck**

Run: `npm test -- tests/content.test.ts && npx tsc --noEmit`

Expected: both content tests PASS and TypeScript exits 0.

- [ ] **Step 6: Commit the content pipeline**

```bash
git add mdx-components.tsx src/content tests/content.test.ts
git commit -m "feat: add localized MDX content registry"
```

---

### Task 3: Reproduce the shared visual system, header, footer, and 404

**Files:**
- Create: `src/app/globals.css`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/language-switcher.tsx`
- Create: `src/components/game-image.tsx`
- Create: `src/components/page-hero.tsx`
- Create: `src/components/section-title.tsx`
- Create: `src/lib/site-data.ts`
- Create: `src/app/[locale]/not-found.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/messages/{en,de,es,fr}.json`
- Test: `tests/shell.test.tsx`

**Interfaces:**
- Produces: `SiteHeader({locale}: {locale: Locale})`, `SiteFooter({locale}: {locale: Locale})`, `GameImage({src, alt, width, height, className})`, and `PageHero({eyebrow, title, description})`.
- Consumes: localized navigation helpers and messages from Task 1.

- [ ] **Step 1: Write failing shared-shell tests**

```tsx
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';

describe('shared shell', () => {
  it('renders both navigation tiers and the Steam action', () => {
    render(<SiteHeader locale="en" />);
    expect(screen.getByRole('link', {name: 'Classes'})).toHaveAttribute('href', '/classes/');
    expect(screen.getByRole('link', {name: 'Server Status'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Play on Steam/i})).toHaveAttribute('target', '_blank');
  });

  it('labels the footer and all four locales', () => {
    render(<SiteFooter locale="en" />);
    expect(screen.getByText(/Unofficial fan-made guide/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation', {name: /Languages/i})).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests and verify missing component failures**

Run: `npm test -- tests/shell.test.tsx`

Expected: FAIL because shared shell components do not exist.

- [ ] **Step 3: Implement reference design tokens and primitives**

In `globals.css`, define the six exact colors, 1240px content width, 780px prose width, body radial lights, 56px grid, embedded noise texture, reference card/card-gradient corners, primary and ghost pill buttons, ornaments, scrollbar, focus rings, and responsive breakpoints at 768px and 1024px. Load Google fonts via CSS import to match the reference, with the specified local fallback stacks. Add a `prefers-reduced-motion: reduce` rule that removes nonessential animation and smooth scrolling.

- [ ] **Step 4: Implement shared shell and themed 404**

Render the same two desktop header rows and compact wrapped mobile navigation. The footer contains the logo/about block, Guides, Resources, Live Tools, Long-tail Guides, locale navigation, disclaimer, and Steam link. Language links preserve `/`, `/guides/`, or `/classes/` via `usePathname()`. `GameImage` reserves width and height, renders meaningful alt text, and replaces a failed image with a same-size decorated fallback frame. The 404 renders “Lost in Siagarta,” explanatory copy, and home/beginner guide actions.

- [ ] **Step 5: Run shared-shell checks**

Run: `npm test -- tests/shell.test.tsx && npm run lint && npx tsc --noEmit`

Expected: tests PASS with no lint or type errors.

- [ ] **Step 6: Commit the shared UI**

```bash
git add src/app/globals.css src/app/'[locale]'/layout.tsx src/app/'[locale]'/not-found.tsx src/components src/lib/site-data.ts src/messages tests/shell.test.tsx
git commit -m "feat: reproduce Farever shared shell"
```

---

### Task 4: Build the full replica homepage

**Files:**
- Create: `src/components/home-sections.tsx`
- Create: `src/lib/home-data.ts`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/messages/{en,de,es,fr}.json`
- Create: `public/icon.png`
- Create: `public/og.png`
- Test: `tests/pages.test.tsx`

**Interfaces:**
- Produces: `HomeSections({locale}: {locale: Locale})` and `getHomeData(locale: Locale): HomeData`, where `HomeData = {hero: HeroData; facts: Fact[]; classes: FeatureCard[]; regions: FeatureCard[]; journey: FeatureCard[]; tools: FeatureCard[]; guides: GuideCardData[]; news: NewsItem[]; faq: FaqItem[]; finalCta: CtaData}`.
- Consumes: `SectionTitle` and shared card/button classes from Task 3.

- [ ] **Step 1: Write the failing homepage composition test**

```tsx
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import HomePage from '@/app/[locale]/page';

it('renders the reference homepage section order', async () => {
  render(await HomePage({params: Promise.resolve({locale: 'en'})}));
  const headings = screen.getAllByRole('heading').map((node) => node.textContent);
  expect(headings).toEqual(expect.arrayContaining([
    'Forge Your Legend in Farever',
    'What is Farever?',
    'The Four Classes',
    'Explore Two Regions',
    'Start Your Journey',
    'Tools & Tier Lists',
    'Featured Guides',
    'Latest News',
    'Farever FAQ',
    'Forge your legend today.'
  ]));
});
```

- [ ] **Step 2: Run the test and verify the missing sections**

Run: `npm test -- tests/pages.test.tsx`

Expected: FAIL because the minimal localized page lacks the reference headings.

- [ ] **Step 3: Acquire the two public image assets locally**

Run:

```bash
curl -L https://farevergame.wiki/icon.png -o public/icon.png
curl -L https://farevergame.wiki/og.png -o public/og.png
```

Expected: `file public/icon.png public/og.png` reports image formats and neither file is empty.

- [ ] **Step 4: Implement the hero and all homepage sections**

Reproduce the observed hero dimensions, three concentric rings, violet/cyan/gold radial lights, floating icon, split gradient H1, two CTAs, four-stat strip, and scroll cue. Add the nine following sections in the exact order from the test, using locale-aware structured data and the reference grid column counts, labels, card styles, and footer spacing.

- [ ] **Step 5: Add localized homepage metadata and structured data**

`generateMetadata` returns localized title/description, local `/og.png`, canonical URL, and four alternates. Include WebSite, Organization, VideoGame, and homepage Article JSON-LD using the reference values and selected locale.

- [ ] **Step 6: Run homepage checks**

Run: `npm test -- tests/pages.test.tsx && npm run build`

Expected: homepage composition test PASS and all four homepage variants build successfully.

- [ ] **Step 7: Commit the homepage**

```bash
git add public src/app/'[locale]'/page.tsx src/components/home-sections.tsx src/lib/home-data.ts src/messages tests/pages.test.tsx
git commit -m "feat: recreate Farever homepage"
```

---

### Task 5: Build the MDX-backed guide directory

**Files:**
- Create: `src/components/guide-card.tsx`
- Create: `src/app/[locale]/guides/page.tsx`
- Expand: `src/content/{en,de,es,fr}/guides/*.mdx`
- Modify: `tests/pages.test.tsx`

**Interfaces:**
- Consumes: `getGuideCards(locale)` from Task 2 and `PageHero` from Task 3.
- Produces: localized `/guides/` directory with `GuideCardRecord` cards.

- [ ] **Step 1: Add a failing guide-directory test**

```tsx
import GuidesPage from '@/app/[locale]/guides/page';

it('renders a two-column guide directory sourced from MDX', async () => {
  const {container} = render(await GuidesPage({params: Promise.resolve({locale: 'en'})}));
  expect(screen.getByRole('heading', {level: 1, name: 'Farever Guides'})).toBeInTheDocument();
  expect(screen.getByRole('link', {name: /Farever Best Class/i})).toHaveAttribute('href', '/guides/farever-best-class/');
  expect(container.querySelector('[data-guide-grid]')).toHaveClass('guide-grid');
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/pages.test.tsx -t "guide directory"`

Expected: FAIL because the directory page does not exist.

- [ ] **Step 3: Author the localized guide-card MDX set**

Create the 14 guide documents visible on the reference directory for each locale. Each document supplies complete frontmatter; the body may be a concise localized summary because only the directory is in first-release route scope. Preserve original Farever proper nouns and canonical slugs.

- [ ] **Step 4: Implement the directory page and cards**

Render the article-style hero followed by a `guide-grid` that is one column below 768px and two columns above it. Each `GuideCard` includes eyebrow/category, localized title, three-line summary, and gold read affordance. Links to out-of-scope article slugs intentionally resolve to the themed 404.

- [ ] **Step 5: Add guide-directory metadata and run checks**

Run: `npm test -- tests/pages.test.tsx -t "guide directory" && npm run build`

Expected: focused test PASS and `/guides/`, `/de/guides/`, `/es/guides/`, and `/fr/guides/` build.

- [ ] **Step 6: Commit the directory**

```bash
git add src/app/'[locale]'/guides src/components/guide-card.tsx src/content tests/pages.test.tsx
git commit -m "feat: add localized guide directory"
```

---

### Task 6: Build the exact `/classes/` MDX article page

**Files:**
- Modify: `src/content/{en,de,es,fr}/classes.mdx`
- Create: `src/app/[locale]/classes/page.tsx`
- Modify: `mdx-components.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/pages.test.tsx`

**Interfaces:**
- Consumes: `getClassesArticle(locale)` from Task 2 and `PageHero` from Task 3.
- Produces: localized Classes & Jobs article routes with controlled MDX typography.

- [ ] **Step 1: Add a failing Classes article test**

```tsx
import ClassesPage from '@/app/[locale]/classes/page';

it('renders Classes & Jobs as the required article detail page', async () => {
  render(await ClassesPage({params: Promise.resolve({locale: 'en'})}));
  expect(screen.getByRole('heading', {level: 1, name: 'Farever Classes & Jobs'})).toBeInTheDocument();
  expect(screen.getByRole('heading', {level: 2, name: 'The 4 classes'})).toBeInTheDocument();
  expect(screen.getByRole('columnheader', {name: 'Class'})).toBeInTheDocument();
  expect(screen.getByRole('heading', {level: 2, name: /FAQ/})).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/pages.test.tsx -t "Classes & Jobs"`

Expected: FAIL because the Classes route does not exist.

- [ ] **Step 3: Complete all four Classes & Jobs MDX documents**

The English body follows the target in this order: “The 4 classes” table; “The 6 jobs” table; co-op combinations; respec guidance; Warrior, Ranger, Mage, and Mystic deep-dives; six-question FAQ; Related links. Translate the full article into German, Spanish, and French while preserving class/job names where the reference does.

- [ ] **Step 4: Implement the article page and exact prose styling**

Render the page hero from frontmatter and the MDX body inside the 780px `prose-game` measure. Match the reference's 17px/1.75 body rhythm, gold diamond H2 marker, pale-gold H3, custom list diamonds, gradient table header, row borders, link underline offset, and narrow-screen table overflow.

- [ ] **Step 5: Add article metadata/JSON-LD and run checks**

Run: `npm test -- tests/pages.test.tsx -t "Classes & Jobs" && npm run build`

Expected: focused test PASS and all four Classes routes are included in the build output.

- [ ] **Step 6: Commit the Classes article**

```bash
git add mdx-components.tsx src/app/globals.css src/app/'[locale]'/classes src/content/*/classes.mdx tests/pages.test.tsx
git commit -m "feat: add Classes and Jobs MDX article"
```

---

### Task 7: Add end-to-end route, metadata, responsive, and visual verification

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/replica.spec.ts`
- Create: `e2e/reference-checklist.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: the completed production application.
- Produces: repeatable Chromium desktop/mobile regression checks and captured screenshots under Playwright's ignored output directory.

- [ ] **Step 1: Write failing browser tests for all route families**

```ts
import {expect, test} from '@playwright/test';

const paths = ['', '/guides/', '/classes/'];
const prefixes = ['', '/de', '/es', '/fr'];

for (const prefix of prefixes) {
  for (const path of paths) {
    test(`${prefix || '/en'}${path || '/'} renders`, async ({page}) => {
      const errors: string[] = [];
      page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
      await page.goto(`${prefix}${path || '/'}`);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
}
```

- [ ] **Step 2: Run browser tests and verify the initial configuration failure**

Run: `npm run test:e2e`

Expected: FAIL until the Playwright web server and projects are configured.

- [ ] **Step 3: Configure desktop and mobile projects**

Use Chromium at 1440×1000 and Mobile Safari emulation at 390×844. Configure `webServer.command` as `npm run dev`, `baseURL` as `http://127.0.0.1:3000`, trace on first retry, and screenshots only on failure.

- [ ] **Step 4: Add metadata, 404, and responsive assertions**

Assert that English canonical URLs have no `/en`; translated pages contain correct canonical and four alternate links; `/missing-page/` displays “Lost in Siagarta”; desktop shows the two-level navigation; mobile hides it and shows the wrapped compact nav; the Classes article table is horizontally contained; all external Steam links have `_blank` and `noopener noreferrer`.

- [ ] **Step 5: Create and execute the visual comparison checklist**

The checklist records exact inspection points for both target and local pages: header heights 80px + 48px desktop, hero viewport depth, 1240px outer width, 780px prose width, section order, card columns, palette, fonts, footer columns, and mobile collapse. Capture full-page local screenshots for `/`, `/guides/`, and `/classes/` at both viewport sizes and compare them side by side with the live reference.

- [ ] **Step 6: Run the full verification suite**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build && npm run test:e2e`

Expected: all unit/component tests PASS, lint/typecheck/build exit 0, and all 12 locale-route tests plus metadata/responsive/404 tests PASS with no console errors.

- [ ] **Step 7: Inspect repository state and commit verification**

Run: `git status --short && git diff --check`

Expected: only intended Playwright/checklist changes are uncommitted and diff check prints nothing.

```bash
git add package.json package-lock.json playwright.config.ts e2e
git commit -m "test: verify replica routes and responsive layout"
```

---

### Task 8: Final fidelity pass and release handoff

**Files:**
- Modify: only files identified by Task 7 visual comparison
- Create: `README.md`

**Interfaces:**
- Consumes: Task 7 screenshots and checklist.
- Produces: a clean, documented, verified local release.

- [ ] **Step 1: Fix every recorded visual mismatch**

Adjust only measured differences in spacing, typography, width, color, border, animation, or breakpoint behavior. Record each adjustment beside its checklist item; do not add new visual concepts.

- [ ] **Step 2: Write project documentation**

Document Node.js 20.9+, `npm install`, `npm run dev`, `npm test`, `npm run build`, `npm run test:e2e`, the three canonical URLs, the three translated prefixes, MDX content locations, and the rule that English content is canonical and unprefixed.

- [ ] **Step 3: Run final clean verification**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build && npm run test:e2e && git diff --check`

Expected: every command exits 0.

- [ ] **Step 4: Commit the fidelity pass**

```bash
git add README.md src public e2e/reference-checklist.md
git commit -m "docs: finalize Farever replica handoff"
```

- [ ] **Step 5: Record the final revision**

Run: `git status --short && git log --oneline -8`

Expected: clean working tree and the implementation commits from Tasks 1–8 visible in order.
