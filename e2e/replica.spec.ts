import {expect, test} from '@playwright/test';

const paths = ['/', '/guides/', '/classes/'] as const;
const prefixes = ['', '/de', '/es', '/fr'] as const;
const siteUrl = 'https://farevergame.wiki';

const localeRoutes = [
  {locale: 'en', prefix: ''},
  {locale: 'de', prefix: '/de'},
  {locale: 'es', prefix: '/es'},
  {locale: 'fr', prefix: '/fr'}
] as const;

function absoluteRouteUrl(prefix: string, path: (typeof paths)[number]) {
  return prefix === '' && path === '/' ? siteUrl : `${siteUrl}${prefix}${path}`;
}

for (const prefix of prefixes) {
  for (const path of paths) {
    const localeLabel = prefix || '/en';

    test(`${localeLabel}${path} renders the shared page shell without console errors`, async ({
      page
    }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') {
          errors.push(message.text());
        }
      });

      await page.goto(`${prefix}${path}`);

      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
}

test.describe('metadata', () => {
  for (const {locale, prefix} of localeRoutes) {
    for (const path of paths) {
      test(`${locale}${path} publishes the canonical and four locale alternates`, async ({
        isMobile,
        page
      }) => {
        test.skip(Boolean(isMobile), 'Metadata is viewport-independent.');

        const expectedPath = `${prefix}${path}`;
        const expectedCanonical = absoluteRouteUrl(prefix, path);
        const expectedAlternates = localeRoutes
          .map(({locale: alternateLocale, prefix: alternatePrefix}) => ({
            href: absoluteRouteUrl(alternatePrefix, path),
            hreflang: alternateLocale
          }))
          .sort((a, b) => a.hreflang.localeCompare(b.hreflang));

        await page.goto(expectedPath);

        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveCount(1);
        await expect(canonical).toHaveAttribute('href', expectedCanonical);

        if (locale === 'en') {
          expect(new URL(await canonical.getAttribute('href') as string).pathname).not.toMatch(
            /^\/en(?:\/|$)/
          );
        }

        const alternates = await page
          .locator('link[rel="alternate"][hreflang]')
          .evaluateAll((links) =>
            links
              .map((link) => ({
                href: link.getAttribute('href'),
                hreflang: link.getAttribute('hreflang')
              }))
              .sort((a, b) => (a.hreflang ?? '').localeCompare(b.hreflang ?? ''))
          );

        expect(alternates).toEqual(expectedAlternates);
      });
    }
  }
});

test('renders the themed English 404 in the page shell', async ({page}) => {
  const response = await page.goto('/missing-page/');

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', {level: 1, name: 'Lost in Siagarta'})
  ).toBeVisible();
  await expect(page.locator('header.site-header')).toBeVisible();
  await expect(page.locator('footer.site-footer')).toBeVisible();
});

test('keeps two measured navigation tiers on desktop and compact wrapped navigation on mobile', async ({
  isMobile,
  page
}) => {
  await page.goto('/');

  const primaryRow = page.locator('.site-header__primary');
  const primaryNavigation = page.locator('.primary-navigation');
  const utilityRow = page.locator('.utility-navigation__inner');
  const steamAction = page.locator('.site-header__steam');
  const brandSubtitle = page.locator('.site-brand__subtitle');

  if (isMobile) {
    await expect(brandSubtitle).toBeHidden();

    const compactNavigations = await page.locator('header nav').evaluateAll((navigations) =>
      navigations
        .filter((navigation) => getComputedStyle(navigation).display !== 'none')
        .map((navigation) => {
          const links = Array.from(navigation.querySelectorAll('a'));
          return {
            lineCount: new Set(
              links.map((link) => Math.round(link.getBoundingClientRect().top))
            ).size,
            maximumFontSize: Math.max(
              ...links.map((link) => Number.parseFloat(getComputedStyle(link).fontSize))
            )
          };
        })
    );

    expect(
      compactNavigations.some(
        ({lineCount, maximumFontSize}) => lineCount > 1 && maximumFontSize <= 12
      )
    ).toBe(true);
  } else {
    await expect(primaryNavigation).toBeVisible();
    await expect(utilityRow).toBeVisible();
    await expect(steamAction).toBeVisible();
    await expect(brandSubtitle).toBeVisible();
    expect(await primaryRow.evaluate((node) => node.getBoundingClientRect().height)).toBe(80);
    expect(await utilityRow.evaluate((node) => node.getBoundingClientRect().height)).toBe(48);
  }
});

test('contains the Classes tables without document-level horizontal overflow', async ({
  page
}) => {
  await page.goto('/classes/');

  const viewportWidth = page.viewportSize()?.width;
  expect(viewportWidth).toBeDefined();

  const tableWraps = page.locator('.article-table-wrap');
  await expect(tableWraps).toHaveCount(2);

  const boxes = await tableWraps.evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return {left: box.left, right: box.right};
    })
  );

  for (const box of boxes) {
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(viewportWidth as number);
  }

  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(viewportWidth as number);
});

test('opens every external Steam link in an isolated tab', async ({page}) => {
  await page.goto('/');

  const steamLinks = page.locator('a[href^="https://store.steampowered.com/"]');
  expect(await steamLinks.count()).toBeGreaterThan(0);

  for (const steamLink of await steamLinks.all()) {
    await expect(steamLink).toHaveAttribute('target', '_blank');
    await expect(steamLink).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

for (const path of paths) {
  const screenshotName = path === '/' ? 'home' : path.split('/').filter(Boolean)[0];

  test(`captures a full-page local ${screenshotName} screenshot`, async ({page}, testInfo) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto(path);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images, (image) =>
          image.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.addEventListener('load', () => resolve(), {once: true});
                image.addEventListener('error', () => resolve(), {once: true});
              })
        )
      );
    });

    await page.screenshot({
      animations: 'disabled',
      fullPage: true,
      path: testInfo.outputPath(`${screenshotName}-local.png`)
    });
  });
}
