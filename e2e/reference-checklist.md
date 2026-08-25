# Yet Another Zombie Survivors visual review checklist

The automated audit measures the local site at `http://127.0.0.1:3000`. Desktop
uses a 1440×1000 CSS-pixel viewport, and mobile uses the Playwright iPhone 13
profile at 390×844. Reduced motion is enabled, lazy-loaded images are scrolled
into view, and each capture includes the complete page.

Run `npm run audit:visual` with the development server already running. Working
screenshots and measurements are written to `test-results/visual-audit/`. The
reviewed baseline is `e2e/reference-baseline/measurements.json`; refresh it only
with `npm run audit:visual -- --write-baseline`.

| Viewport | Route | Screenshot |
| --- | --- | --- |
| Desktop | `/` | `test-results/visual-audit/local/desktop/home.png` |
| Desktop | `/guides/` | `test-results/visual-audit/local/desktop/guides.png` |
| Desktop | `/characters/` | `test-results/visual-audit/local/desktop/characters.png` |
| Mobile | `/` | `test-results/visual-audit/local/mobile/home.png` |
| Mobile | `/guides/` | `test-results/visual-audit/local/mobile/guides.png` |
| Mobile | `/characters/` | `test-results/visual-audit/local/mobile/characters.png` |

Review the persistent site header, responsive navigation, desktop and mobile
content widths, homepage section order, guide-card columns, survivor article
tables, footer columns, typography, and the researched red/orange dark theme.
Confirm that the full game name appears throughout, official destinations match
the researched URLs, with unsupported redemption-code links and placeholders removed.

If a real comparison origin is available later, set `VISUAL_REFERENCE_URL` before
running the audit. No comparison domain is assumed or embedded in the project.
