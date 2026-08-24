import {expect, test, type Page} from '@playwright/test';

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
  return `${siteUrl}${prefix}${path}`;
}

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

for (const prefix of prefixes) {
  for (const path of paths) {
    const localeLabel = prefix || '/en';

    test(`${localeLabel}${path} renders the shared page shell without console errors`, async ({
      page
    }) => {
      const consoleIssues: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          consoleIssues.push(`${message.type()}: ${message.text()}`);
        }
      });

      await page.goto(`${prefix}${path}`);

      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      expect(consoleIssues).toEqual([]);
    });
  }
}

test.describe('canonical route policy', () => {
  for (const prefix of prefixes) {
    for (const path of paths) {
      test(`${prefix || '/en'}${path} resolves directly with its canonical trailing slash`, async ({
        isMobile,
        request
      }) => {
        test.skip(Boolean(isMobile), 'HTTP route policy is viewport-independent.');

        const response = await request.get(`${prefix}${path}`, {maxRedirects: 0});

        expect(response.status()).toBe(200);
        expect(response.headers().location).toBeUndefined();
      });
    }
  }

  test('redirects slashless document routes to the public trailing-slash form', async ({
    isMobile,
    request
  }) => {
    test.skip(Boolean(isMobile), 'HTTP route policy is viewport-independent.');

    for (const [source, destination] of [
      ['/guides', '/guides/'],
      ['/classes', '/classes/'],
      ['/de/guides', '/de/guides/'],
      ['/fr/classes', '/fr/classes/']
    ] as const) {
      const response = await request.get(source, {maxRedirects: 0});

      expect(response.status(), source).toBe(308);
      expect(response.headers().location, source).toBe(destination);
    }
  });

  test('redirects English-prefixed URLs without an empty Location and preserves the final path', async ({
    isMobile,
    page,
    request
  }) => {
    test.skip(Boolean(isMobile), 'HTTP route policy is viewport-independent.');
    const consoleWarnings: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'warning') {
        consoleWarnings.push(message.text());
      }
    });

    const bareEnglish = await request.get('/en', {maxRedirects: 0});
    expect(bareEnglish.status()).toBe(308);
    expect(bareEnglish.headers().location).toBe('/en/');
    await page.goto('/en');
    expect(new URL(page.url()).pathname).toBe('/');

    for (const [source, destination] of [
      ['/en/', '/'],
      ['/en/guides/', '/guides/'],
      ['/en/classes/', '/classes/']
    ] as const) {
      const response = await request.get(source, {maxRedirects: 0});

      expect(response.status(), source).toBe(307);
      expect(response.headers().location, source).toBe(destination);

      await page.goto(source);
      expect(new URL(page.url()).pathname, source).toBe(destination);
    }

    const withQuery = await request.get('/en/classes/?from=legacy', {
      maxRedirects: 0
    });
    expect(withQuery.status()).toBe(307);
    expect(withQuery.headers().location).toBe('/classes/?from=legacy');

    const slashlessNested = await request.get('/en/guides', {maxRedirects: 0});
    expect(slashlessNested.status()).toBe(308);
    expect(slashlessNested.headers().location).toBe('/en/guides/');

    await page.goto('/en/guides');
    expect(new URL(page.url()).pathname).toBe('/guides/');
    expect(consoleWarnings).toEqual([]);
  });
});

test('language links synchronize NEXT_LOCALE and can switch back to English', async ({
  page
}) => {
  const consoleWarnings: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'warning') {
      consoleWarnings.push(message.text());
    }
  });

  await page.goto('/de/classes/');
  await expect.poll(async () =>
    (await page.context().cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE')?.value
  ).toBe('de');

  const englishLink = page
    .locator('.language-switcher')
    .getByRole('link', {name: /English/});
  await expect(englishLink).toHaveAttribute('href', '/en/classes/');
  await englishLink.click();
  await expect.poll(async () =>
    (await page.context().cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE')?.value
  ).toBe('en');
  await expect.poll(() => new URL(page.url()).pathname).toBe('/classes/');

  await page.locator('.language-switcher').getByRole('link', {name: /Deutsch/}).click();
  await expect.poll(() => new URL(page.url()).pathname).toBe('/de/classes/');
  expect(
    (await page.context().cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE')?.value
  ).toBe('de');
  expect(consoleWarnings).toEqual([]);
});

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
  await waitForFonts(page);

  const primaryRow = page.locator('.site-header__primary');
  const primaryNavigation = page.locator('.primary-navigation');
  const utilityRow = page.locator('.utility-navigation__inner');
  const utilityNavigation = page.locator('.utility-navigation');
  const mobileNavigation = page.locator('.mobile-navigation');
  const steamAction = page.locator('.site-header__steam');
  const brandSubtitle = page.locator('.site-brand__subtitle');

  if (isMobile) {
    await expect(brandSubtitle).toBeHidden();
    await expect(primaryNavigation).toBeHidden();
    await expect(utilityNavigation).toBeHidden();
    await expect(mobileNavigation).toBeVisible();
    await expect(steamAction).toBeVisible();
    await expect(mobileNavigation.locator('a')).toHaveCount(15);
    expect(
      await mobileNavigation.locator('a').evaluateAll(
        (links) =>
          new Set(
            links.map((link) => Math.round(link.getBoundingClientRect().top))
          ).size
      )
    ).toBe(5);
    expect(
      await page.locator('.site-header').evaluate((node) =>
        Number(node.getBoundingClientRect().height.toFixed(2))
      )
    ).toBe(228.25);
  } else {
    await expect(primaryNavigation).toBeVisible();
    await expect(utilityRow).toBeVisible();
    await expect(steamAction).toBeVisible();
    await expect(brandSubtitle).toBeVisible();
    await expect(mobileNavigation).toBeHidden();
    expect(await primaryRow.evaluate((node) => node.getBoundingClientRect().height)).toBe(85);
    expect(await utilityRow.evaluate((node) => node.getBoundingClientRect().height)).toBe(51);
  }
});

test('matches the measured Guides hero and card density', async ({isMobile, page}) => {
  await page.goto('/guides/');
  await waitForFonts(page);

  const hero = page.locator('.page-hero');
  const grid = page.locator('.guide-grid');

  if (isMobile) {
    await expect.poll(async () =>
      Number((await hero.boundingBox())?.height.toFixed(2))
    ).toBe(475.38);
    expect(Number((await grid.boundingBox())?.width.toFixed(2))).toBe(339);
  } else {
    expect(Number((await hero.boundingBox())?.height.toFixed(2))).toBe(447.75);
    expect(Number((await hero.boundingBox())?.width.toFixed(2))).toBe(1104);
    expect(Number((await grid.boundingBox())?.width.toFixed(2))).toBe(952);
    expect(Number((await grid.boundingBox())?.height.toFixed(2))).toBe(1573);
  }

  await expect(page.locator('.guide-directory-card__action')).toHaveCount(0);
});

test('keeps the homepage hero image inside its responsive wrapper', async ({page}) => {
  await page.goto('/');
  await waitForFonts(page);

  const wrapper = page.locator('.home-hero__image-wrap');
  const image = wrapper.locator('.home-hero__image');
  const [wrapperBox, imageBox] = await Promise.all([
    wrapper.boundingBox(),
    image.boundingBox()
  ]);

  expect(imageBox?.width).toBe(wrapperBox?.width);
  expect(imageBox?.height).toBe(wrapperBox?.height);
});

test('contains the Classes article and tables at the measured target width', async ({
  isMobile,
  page
}) => {
  await page.goto('/classes/');
  await waitForFonts(page);

  const viewportWidth = page.viewportSize()?.width;
  expect(viewportWidth).toBeDefined();

  const article = page.locator('.classes-article.prose-game');
  const hero = article.locator(':scope > .page-hero');
  const tables = article.locator('.article-table');
  await expect(tables).toHaveCount(2);

  const boxes = await tables.evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return {left: box.left, right: box.right};
    })
  );

  for (const box of boxes) {
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(viewportWidth as number);
  }

  if (isMobile) {
    expect(Number((await hero.boundingBox())?.width.toFixed(2))).toBe(339);
    expect(Number((await tables.first().boundingBox())?.width.toFixed(2))).toBe(339);
  } else {
    expect(Number((await article.boundingBox())?.width.toFixed(2))).toBe(780);
    expect(Number((await hero.boundingBox())?.width.toFixed(2))).toBe(695);
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
    await waitForFonts(page);
    await page.evaluate(async () => {
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
