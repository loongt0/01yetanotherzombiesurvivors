# Farever replica reference checklist

Measured on 2026-08-25 with Playwright Chromium against the public reference at
`https://farevergame.wiki` and the local replica at `http://127.0.0.1:3000`.
Desktop uses a 1440×1000 CSS-pixel viewport. Mobile uses the Playwright iPhone 13
profile with a 390×844 CSS-pixel viewport (DPR 3, so PNGs are 1170 pixels wide).
Reduced motion was enabled, the document was scrolled to trigger lazy images,
fonts/images were allowed to settle, and every capture is a full-page screenshot.

Raw measurements: `test-results/visual-audit/measurements.json` (ignored output).

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

- [x] Header heights — desktop target and local both declare nominal 80px + 48px
  tiers. The public page measures 85px primary + 51px utility inner (137px total,
  including the tier border) because its 17px root size scales Tailwind `h-20` and
  `h-12`. Local measures 80px + 48px (130px total, including borders).
- [x] Hero viewport depth — exact CSS-pixel measurements:

  | Route | Reference desktop | Local desktop | Reference mobile | Local mobile |
  | --- | ---: | ---: | ---: | ---: |
  | `/` | 1189.64 | 1047.81 | 1285.69 | 1119.81 |
  | `/guides/` | 447.75 | 383.00 | 475.38 | 425.44 |
  | `/classes/` | 537.00 | 412.25 | 500.88 | 454.69 |

- [x] 1240px outer width — the corresponding header/content shell measures
  1240px on both desktop pages. Both collapse to the full 390px mobile viewport.
- [x] 780px prose width — the Classes article/prose container measures 780px on
  both desktop pages and 390px on both mobile pages. Local table wrappers remain
  inside that container; the 620px tables scroll within the wrappers instead of
  widening the document.
- [x] Section order — homepage order matches exactly: hero, What is Farever?, The
  Four Classes, Explore Two Regions, Start Your Journey, Tools & Tier Lists,
  Featured Guides, Latest News, Farever FAQ, and the final CTA. Classes order also
  matches exactly: hero, The 4 classes, The 6 jobs, co-op combos, respec,
  deep-dives, FAQ, Related. Guides preserves the same 14-card content order;
  reference card titles are not `h2` elements while local card titles are.
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
  groups on mobile. Reference/local footer heights are 1044.75/1045.50px desktop
  and 2021.88/2096.38px mobile.
- [x] Mobile collapse — both hide the brand subtitle, but the Steam action is a
  measured mismatch: the public reference keeps it visible (`display: flex`) while
  local hides it (`display: none`). The public page also hides the desktop primary
  and utility tiers and replaces them with one combined 15-link compact nav
  (143.25px, 5 wrapped lines; 228.25px total header). Local keeps a wrapped primary
  tier plus a separate wrapped utility tier (129.56px + 99px; utility links occupy
  3 lines; 230.56px total header). Task 8 should show the mobile Steam action and
  adopt the single combined compact navigation without regressing wrapping.

## Full-page visual findings for Task 8

- [x] Homepage — the major section/card geometry and complete content order align.
  Local is 10,156px versus the reference 10,701px on desktop; local has a brighter,
  broader hero aurora and a 141.83px shallower desktop hero. Mobile total heights
  are nearly identical (17,292px local versus 17,273px reference in CSS pixels).
- [x] Guides — count and columns align. Local cards include a visible `READ →` row
  and have greater vertical padding/density: the grid is 2183.11px local versus
  1573px reference desktop, and 4630.63px versus 3754.81px mobile. Full desktop
  pages are 3,870px local versus 3,415px reference.
- [x] Classes — section/content order and 780px desktop measure align. Local is more
  vertically compact (5,194px versus 5,883px desktop; 7,640px versus 9,838px
  mobile), driven by heading/copy/table line-height and wrapping differences. The
  local mobile table remains deliberately horizontally scroll-contained.

No production visual changes were made from these findings; they are measurements
for Task 8.
