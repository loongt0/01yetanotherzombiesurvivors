import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {chromium, devices} from '@playwright/test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'test-results', 'visual-audit');
const baselinePath = path.join(
  projectRoot,
  'e2e',
  'reference-baseline',
  'measurements.json'
);

const routes = [
  {path: '/', slug: 'home'},
  {path: '/guides/', slug: 'guides'},
  {path: '/characters/', slug: 'characters'}
];
const sources = [
  {name: 'local', origin: 'http://127.0.0.1:3000'},
  ...(process.env.VISUAL_REFERENCE_URL
    ? [{name: 'reference', origin: process.env.VISUAL_REFERENCE_URL}]
    : [])
];
const viewports = [
  {name: 'desktop', options: {viewport: {width: 1440, height: 1000}}},
  {
    name: 'mobile',
    options: {
      ...devices['iPhone 13'],
      viewport: {width: 390, height: 844},
      screen: {width: 390, height: 844}
    }
  }
];

await mkdir(outputRoot, {recursive: true});

const browser = await chromium.launch({headless: true});
const measurements = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext(viewport.options);
    const page = await context.newPage();
    await page.emulateMedia({reducedMotion: 'reduce'});

    for (const source of sources) {
      const sourceOutput = path.join(outputRoot, source.name, viewport.name);
      await mkdir(sourceOutput, {recursive: true});

      for (const route of routes) {
        const url = `${source.origin}${route.path}`;
        const response = await page.goto(url, {
          waitUntil: 'networkidle',
          timeout: 60_000
        });
        if (!response?.ok()) {
          throw new Error(`${url} returned ${response?.status() ?? 'no response'}`);
        }

        await page.evaluate(async () => {
          await document.fonts.ready;
          for (
            let top = 0;
            top < document.documentElement.scrollHeight;
            top += innerHeight
          ) {
            scrollTo(0, top);
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          scrollTo(0, 0);
          await Promise.race([
            Promise.all(
              Array.from(document.images, (image) =>
                image.decode().catch(() => undefined)
              )
            ),
            new Promise((resolve) => setTimeout(resolve, 5_000))
          ]);
        });

        const absoluteScreenshotPath = path.join(
          sourceOutput,
          `${route.slug}.png`
        );
        const screenshotPath = path.relative(projectRoot, absoluteScreenshotPath);
        await page.screenshot({
          animations: 'disabled',
          fullPage: true,
          path: absoluteScreenshotPath
        });

        const values = await page.evaluate(({sourceName}) => {
          const rect = (element) => {
            if (!element) return null;
            const box = element.getBoundingClientRect();
            return {
              height: Number(box.height.toFixed(2)),
              width: Number(box.width.toFixed(2)),
              left: Number(box.left.toFixed(2)),
              top: Number(box.top.toFixed(2))
            };
          };
          const columns = (element) => {
            if (!element) return null;
            const template = getComputedStyle(element).gridTemplateColumns;
            return template === 'none'
              ? 0
              : template.split(' ').filter(Boolean).length;
          };
          const header =
            document.querySelector('body > header') ??
            document.querySelector('header');
          const primaryRow =
            sourceName === 'local'
              ? document.querySelector('.site-header__primary')
              : header?.querySelector(':scope > div.relative');
          const primaryNav =
            sourceName === 'local'
              ? document.querySelector('.primary-navigation')
              : primaryRow?.querySelector('nav');
          const utilityNav =
            sourceName === 'local'
              ? document.querySelector('.utility-navigation')
              : Array.from(header?.children ?? []).find(
                  (element, index) =>
                    index >= 3 && getComputedStyle(element).display !== 'none'
                );
          const utilityRow =
            sourceName === 'local'
              ? document.querySelector('.utility-navigation__inner')
              : utilityNav?.tagName === 'NAV'
                ? utilityNav
                : utilityNav?.querySelector(':scope > div') ?? utilityNav;
          const h1 = document.querySelector('main h1');
          const hero =
            h1?.closest('header') ?? h1?.closest('section') ?? h1?.parentElement;
          const article = document.querySelector('article.prose-game');
          const proseInner =
            sourceName === 'local'
              ? document.querySelector('.classes-article__body')
              : null;
          const guideGrid =
            sourceName === 'local'
              ? document.querySelector('.guide-grid')
              : Array.from(
                  document.querySelectorAll('main [class*="grid"]')
                ).find(
                  (element) =>
                    element.querySelectorAll(':scope > a').length >= 10
                );
          const footer = document.querySelector('footer');
          const footerGrid =
            sourceName === 'local'
              ? document.querySelector('.site-footer__grid')
              : Array.from(
                  footer?.querySelectorAll('[class*="grid"]') ?? []
                ).find((element) => element.children.length >= 4);
          const steam = header?.querySelector(
            'a[href^="https://store.steampowered.com/"]'
          );
          const subtitle =
            sourceName === 'local'
              ? document.querySelector('.site-brand__subtitle')
              : Array.from(header?.querySelectorAll('span') ?? []).find((node) =>
                  node.textContent?.includes('Wiki')
                );
          const utilityLineCount = utilityRow
            ? new Set(
                Array.from(utilityRow.querySelectorAll('a'), (link) =>
                  Math.round(link.getBoundingClientRect().top)
                )
              ).size
            : 0;
          const rootStyle = getComputedStyle(document.documentElement);
          const bodyStyle = getComputedStyle(document.body);
          const h1Style = h1 ? getComputedStyle(h1) : null;
          const mainHeadings = Array.from(
            document.querySelectorAll('main h1, main h2'),
            (heading) => heading.textContent?.replace(/\s+/g, ' ').trim()
          );
          const visibleGridSummary = Array.from(
            document.querySelectorAll('main *')
          )
            .filter((element) => {
              const style = getComputedStyle(element);
              return style.display === 'grid' && element.children.length >= 2;
            })
            .slice(0, 12)
            .map((element) => ({
              childCount: element.children.length,
              columns: columns(element),
              className:
                typeof element.className === 'string' ? element.className : ''
            }));
          const guideCards = Array.from(guideGrid?.children ?? [], (card) => ({
            title: card
              .querySelector('h2, h3')
              ?.textContent?.replace(/\s+/g, ' ')
              .trim(),
            rect: rect(card)
          }));

          return {
            documentHeight: document.documentElement.scrollHeight,
            header: {
              total: rect(header),
              primary: rect(primaryRow),
              utility: rect(utilityRow),
              primaryNavDisplay: primaryNav
                ? getComputedStyle(primaryNav).display
                : null,
              steamDisplay: steam ? getComputedStyle(steam).display : null,
              subtitleDisplay: subtitle
                ? getComputedStyle(subtitle).display
                : null,
              utilityFlexWrap: utilityRow
                ? getComputedStyle(utilityRow).flexWrap
                : null,
              utilityLineCount
            },
            hero: rect(hero),
            outer: rect(primaryRow),
            prose: rect(article),
            proseInner: rect(proseInner),
            guideGrid: {
              rect: rect(guideGrid),
              columns: columns(guideGrid),
              cards: guideGrid?.children.length ?? 0,
              cardMeasurements: guideCards
            },
            palette: {
              background: bodyStyle.backgroundColor,
              foreground: bodyStyle.color,
              bgVariable: rootStyle.getPropertyValue('--bg').trim(),
              goldVariable: rootStyle.getPropertyValue('--gold').trim(),
              mutedVariable: rootStyle.getPropertyValue('--muted').trim()
            },
            fonts: {
              body: bodyStyle.fontFamily,
              display: h1Style?.fontFamily ?? null
            },
            footer: {
              total: rect(footer),
              columns: columns(footerGrid),
              groups: footerGrid?.children.length ?? 0
            },
            headings: mainHeadings,
            grids: visibleGridSummary
          };
        }, {sourceName: source.name});

        measurements.push({
          source: source.name,
          viewport: viewport.name,
          route: route.path,
          screenshotPath,
          ...values
        });
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const serializedMeasurements = `${JSON.stringify(measurements, null, 2)}\n`;
const measurementsPath = path.join(outputRoot, 'measurements.json');
await writeFile(measurementsPath, serializedMeasurements);

if (process.argv.includes('--write-baseline')) {
  await mkdir(path.dirname(baselinePath), {recursive: true});
  await writeFile(baselinePath, serializedMeasurements);
}

console.log(
  JSON.stringify(
    {
      measurementsPath: path.relative(projectRoot, measurementsPath),
      baselinePath: process.argv.includes('--write-baseline')
        ? path.relative(projectRoot, baselinePath)
        : null,
      screenshots: measurements.map((item) => item.screenshotPath)
    },
    null,
    2
  )
);
