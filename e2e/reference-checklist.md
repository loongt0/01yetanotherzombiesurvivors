# Farever replica reference checklist

Measured on 2026-08-25 with Playwright Chromium against the public reference at
`https://farevergame.wiki` and the local replica at `http://127.0.0.1:3000`.
Desktop uses a 1440×1000 CSS-pixel viewport. Mobile uses the Playwright iPhone 13
profile with a 390×844 CSS-pixel viewport (DPR 3, so PNGs are 1170 pixels wide).
Reduced motion was enabled, the document was scrolled to trigger lazy images,
fonts/images were allowed to settle, and every capture is a full-page screenshot.

The reviewed raw measurements are committed at
`e2e/reference-baseline/measurements.json`. Running `npm run audit:visual` while
the local server is available regenerates the ignored working artifacts at
`test-results/visual-audit/measurements.json` and the screenshot paths below.
The command requires network access to the public reference; pass
`-- --write-baseline` only when intentionally replacing the committed baseline.

## Side-by-side capture matrix

| Viewport / route | Public reference | Local replica |
| --- | --- | --- |
| Desktop `/` | `test-results/visual-audit/reference/desktop/home.png` | `test-results/visual-audit/local/desktop/home.png` |
| Desktop `/guides/` | `test-results/visual-audit/reference/desktop/guides.png` | `test-results/visual-audit/local/desktop/guides.png` |
| Desktop `/classes/` | `test-results/visual-audit/reference/desktop/classes.png` | `test-results/visual-audit/local/desktop/classes.png` |
| Mobile `/` | `test-results/visual-audit/reference/mobile/home.png` | `test-results/visual-audit/local/mobile/home.png` |
| Mobile `/guides/` | `test-results/visual-audit/reference/mobile/guides.png` | `test-results/visual-audit/local/mobile/guides.png` |
| Mobile `/classes/` | `test-results/visual-audit/reference/mobile/classes.png` | `test-results/visual-audit/local/mobile/classes.png` |

## Measured inspection points

- [x] Header heights — Task 8 replaced the nominal 80px/48px local tiers with the
  measured 85px primary and 51px utility tier. Desktop now matches the 137px
  reference total exactly.
- [x] Hero viewport depth — exact CSS-pixel measurements:

  | Route | Reference desktop | Local desktop | Reference mobile | Local mobile |
  | --- | ---: | ---: | ---: | ---: |
  | `/` | 1189.64 | 1189.64 | 1285.69 | 1285.69 |
  | `/guides/` | 447.75 | 447.75 | 475.38 | 475.38 |
  | `/classes/` | 537.00 | 537.00 | 500.88 | 500.88 |

- [x] 1240px outer width — the corresponding header/content shell measures
  1240px on both desktop pages. Both collapse to the full 390px mobile viewport.
- [x] 780px prose width — Task 8 placed the Classes hero and MDX body inside the
  same measured article: 780px desktop / 390px mobile, with 695px / 339px inner
  content. The wrapper and 620px minimum were removed; both tables now wrap to
  695px desktop and 339px mobile like the reference.
- [x] Section order — homepage order matches exactly: hero, What is Farever?, The
  Four Classes, Explore Two Regions, Start Your Journey, Tools & Tier Lists,
  Featured Guides, Latest News, Farever FAQ, and the final CTA. Classes order also
  matches exactly: hero, The 4 classes, The 6 jobs, co-op combos, respec,
  deep-dives, FAQ, Related. Guides preserves the same 14-card content order;
  Task 8 changed guide-card titles from `h2` to the reference `h3` structure.
- [x] Card columns — the main homepage grids match at desktop: stats 4, classes 4,
  regions 2, journey 3, tools 3, featured 3. Hero stats stay at 2 columns on
  mobile while content cards collapse to 1. Guides is 2 columns desktop and 1
  column mobile with 14 cards in both versions. The reference About layout uses a
  five-track 3/2 grid while local expresses the equivalent visual split as two
  tracks.
- [x] Palette — both compute background `rgb(5, 3, 12)` (`#05030c`), foreground
  `rgb(245, 241, 255)`, muted `rgb(154, 146, 192)`, and gold `#d4af6a`.
- [x] Fonts — both lead with `Inter` for body copy and `Metamorphous` with
  `Cormorant Garamond` fallback for display text. Local additionally declares the
  platform/system and Georgia fallbacks.
- [x] Footer columns — both use 5 columns / 5 groups on desktop and 1 column / 5
  groups on mobile. Task 8 applied the measured 14.875px/21.25px type, 59.5px
  padding, 42.5px grid gap, 8.5px link rhythm, responsive language-row height,
  and the two reference links (`/leveling-guide/`, `/skover-island/`), bringing
  the local footer to 1044.75px desktop and 2021.88px mobile.
- [x] Mobile collapse — Task 8 keeps Steam visible, hides the two desktop nav tiers,
  and renders one combined 15-link compact navigation. It measures 143.25px over
  5 wrapped lines and produces the exact 228.25px total mobile header.

## Full-page visual findings for Task 8

- [x] Homepage — Task 8 matched the 17px-derived section title, button, hero stats,
  About five-track layout, class/region/journey/tool/guide card typography, News
  cards, FAQ cards, and final CTA. The hero is now exact at 1189.64px desktop and
  1285.69px mobile; its `SCROLL` line and aurora stacking use the measured values.
- [x] Guides — Task 8 removed `READ →`, set 25.5px card padding and measured type,
  and retained the exact 14-card order. Both grids are 1573px desktop. The
  reference mobile grid is 3754.81px; local is 3700.89px after replacing two
  incorrectly rendered literal `&apos;` strings with real apostrophes. The exact
  53.92px reduction is reference/local card 9 at 277.69px/253.52px and card 10
  at 253.52px/223.77px: each corrected card wraps one line less. All other 12
  card heights match, so this is not a spacing or column mismatch (the pre-pass
  grids were 2183.11px / 4630.63px).
- [x] Classes — Task 8 matched the 17.85px/31.2375px prose, 31.45px section
  headings, 22.1px subheads, table-cell padding/type, FAQ card density, and mobile
  wrapping. The full article measures 4591.59px versus 4598.78px desktop and
  7508.86px versus 7485.66px mobile; the remaining 7.19px / 23.20px is content
  reflow rather than a width, overflow, or section-order mismatch.
