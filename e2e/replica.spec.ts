import {expect, test, type Page} from '@playwright/test';

const paths = ['/', '/guides/', '/characters/'] as const;
const localeRoutes = [
  {locale: 'en', prefix: ''},
  {locale: 'ru', prefix: '/ru'},
  {locale: 'es', prefix: '/es'},
  {locale: 'de', prefix: '/de'}
] as const;
const siteUrl = 'https://yetanotherzombiesurvivors.world';

function absoluteRouteUrl(prefix: string, path: (typeof paths)[number]) {
  return `${siteUrl}${prefix}${path}`;
}

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

for (const {locale, prefix} of localeRoutes) {
  for (const path of paths) {
    test(`${locale}${path} renders the researched game without console issues`, async ({
      page
    }) => {
      const issues: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          issues.push(`${message.type()}: ${message.text()}`);
        }
      });

      await page.goto(`${prefix}${path}`);

      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer.site-footer')).toBeVisible();
      await expect(page.locator('header.site-header')).toContainText(
        'Yet Another Zombie Survivors'
      );
      expect(issues).toEqual([]);
    });
  }
}

test.describe('canonical route policy', () => {
  for (const {locale, prefix} of localeRoutes) {
    for (const path of paths) {
      test(`${locale}${path} resolves directly with the canonical trailing slash`, async ({
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

  test('normalizes slashless routes and redirects legacy class URLs to characters', async ({
    isMobile,
    request
  }) => {
    test.skip(Boolean(isMobile), 'HTTP route policy is viewport-independent.');

    for (const [source, destination] of [
      ['/guides', '/guides/'],
      ['/characters', '/characters/'],
      ['/ru/guides', '/ru/guides/'],
      ['/de/characters', '/de/characters/']
    ] as const) {
      const response = await request.get(source, {maxRedirects: 0});

      expect(response.status(), source).toBe(308);
      expect(response.headers().location, source).toBe(destination);
    }

    for (const [source, destination] of [
      ['/classes/', '/characters/'],
      ['/ru/classes/', '/ru/characters/']
    ] as const) {
      const response = await request.get(source, {maxRedirects: 0});

      expect(response.status(), source).toBe(308);
      expect(response.headers().location, source).toBe(destination);
    }
  });

  test('removes the English prefix without producing an empty Location', async ({
    isMobile,
    page,
    request
  }) => {
    test.skip(Boolean(isMobile), 'HTTP route policy is viewport-independent.');

    const bare = await request.get('/en', {maxRedirects: 0});
    expect(bare.status()).toBe(308);
    expect(bare.headers().location).toBe('/en/');

    for (const [source, destination] of [
      ['/en/', '/'],
      ['/en/guides/', '/guides/'],
      ['/en/characters/', '/characters/']
    ] as const) {
      const response = await request.get(source, {maxRedirects: 0});

      expect(response.status(), source).toBe(307);
      expect(response.headers().location, source).toBe(destination);
      await page.goto(source);
      expect(new URL(page.url()).pathname).toBe(destination);
    }
  });
});

test('language links preserve the character page and synchronize NEXT_LOCALE', async ({
  page
}) => {
  await page.goto('/ru/characters/');

  await expect.poll(async () =>
    (await page.context().cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE')?.value
  ).toBe('ru');

  await page.locator('.language-switcher').getByRole('link', {name: /English/}).click();
  await expect.poll(() => new URL(page.url()).pathname).toBe('/characters/');
  await expect.poll(async () =>
    (await page.context().cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE')?.value
  ).toBe('en');

  await page.locator('.language-switcher').getByRole('link', {name: /Deutsch/}).click();
  await expect.poll(() => new URL(page.url()).pathname).toBe('/de/characters/');
});

test.describe('researched metadata', () => {
  for (const {locale, prefix} of localeRoutes) {
    for (const path of paths) {
      test(`${locale}${path} publishes its canonical and four selected locale alternates`, async ({
        isMobile,
        page
      }) => {
        test.skip(Boolean(isMobile), 'Metadata is viewport-independent.');
        await page.goto(`${prefix}${path}`);

        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          'href',
          absoluteRouteUrl(prefix, path)
        );

        const alternates = await page
          .locator('link[rel="alternate"][hreflang]')
          .evaluateAll((links) =>
            links
              .map((link) => ({
                hreflang: link.getAttribute('hreflang'),
                href: link.getAttribute('href')
              }))
              .sort((a, b) => (a.hreflang ?? '').localeCompare(b.hreflang ?? ''))
          );
        const expected = localeRoutes
          .map((entry) => ({
            hreflang: entry.locale,
            href: absoluteRouteUrl(entry.prefix, path)
          }))
          .sort((a, b) => a.hreflang.localeCompare(b.hreflang));

        expect(alternates).toEqual(expected);
      });
    }
  }
});

test('preserves desktop navigation and a compact mobile navigation', async ({
  isMobile,
  page
}) => {
  await page.goto('/');
  await waitForFonts(page);

  if (isMobile) {
    await expect(page.locator('.primary-navigation')).toBeHidden();
    await expect(page.locator('.utility-navigation')).toBeHidden();
    await expect(page.locator('.mobile-navigation')).toBeVisible();
    await expect(page.locator('.mobile-navigation a')).toHaveCount(14);
  } else {
    await expect(page.locator('.primary-navigation')).toBeVisible();
    await expect(page.locator('.utility-navigation')).toBeVisible();
    await expect(page.locator('.mobile-navigation')).toBeHidden();
  }

  await expect(page.locator('.site-header__steam')).toBeVisible();
});

test('uses the researched zombie-red theme without unsupported redemption codes', async ({
  page
}) => {
  await page.goto('/');
  const theme = await page.locator(':root').evaluate((element) => {
    const style = getComputedStyle(element);

    return {
      primary: style.getPropertyValue('--nav-theme').trim(),
      accent: style.getPropertyValue('--nav-theme-light').trim(),
      background: style.getPropertyValue('--background').trim()
    };
  });

  expect(theme).toEqual({
    primary: '8 78% 56%',
    accent: '24 95% 64%',
    background: '220 16% 8%'
  });
  await expect(page.locator('.facts-card__codes')).toHaveCount(0);
  await expect(page.getByText(/redemption codes/i)).toHaveCount(0);
});

test('keeps the site icon in navigation without presenting it as game artwork', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('.home-hero img')).toHaveCount(0);
  await expect(page.locator('.site-header img')).toBeVisible();
  await expect(page.locator('.site-footer img')).toBeVisible();
});

test('lists the researched guide matrix and keeps the character tables within the viewport', async ({
  page
}) => {
  await page.goto('/guides/');
  await expect(page.locator('.guide-directory-card')).toHaveCount(19);
  await expect(page.getByRole('link', {name: /Best Team/}).last()).toHaveAttribute(
    'href',
    '/guides/best-team/'
  );

  await page.goto('/characters/');
  await expect(page.locator('article table')).toHaveCount(2);
  await expect(page.locator('article')).toContainText('Survival Level 175');
  await expect(page.locator('article')).toContainText('unconfirmed');
  await expect(page.locator('article')).not.toContainText(/[\u3400-\u9fff]/u);
});

test('serves every researched guide-card destination and localized article details', async ({
  page,
  request
}) => {
  await page.goto('/guides/');
  const articlePaths = await page.locator('.guide-directory-card').evaluateAll((cards) =>
    cards.map((card) => card.getAttribute('href'))
  );

  expect(articlePaths).toHaveLength(19);

  for (const path of [
    ...articlePaths,
    '/ru/guides/best-team/',
    '/es/characters/ghost/',
    '/de/weapons/upgrades/'
  ]) {
    expect(path).toBeTruthy();
    const response = await request.get(path!);
    expect(response.status(), path!).toBe(200);
  }
});

test('renders researched article details and all primary matrix destinations', async ({
  page
}) => {
  const researchedRoutes = [
    ['/guides/best-team/', /Best Team/],
    ['/characters/ghost/', /Ghost/],
    ['/items/', /Items/],
    ['/builds/', /Builds/],
    ['/weapons/', /Weapons/],
    ['/tools/', /Tools/]
  ] as const;

  for (const [path, title] of researchedRoutes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole('heading', {level: 1, name: title})).toBeVisible();
  }
  expect((await page.request.get('/codes/')).status()).toBe(404);
});

test('publishes the researched official community links and themed legal pages', async ({
  page
}) => {
  await page.goto('/');
  await expect(page.getByRole('link', {name: 'Official Website'})).toHaveAttribute(
    'href',
    'https://yazs.awesomegamesstudio.com/'
  );
  await expect(page.getByRole('link', {name: 'Official Discord'})).toHaveAttribute(
    'href',
    'https://discord.com/invite/m4JfXuS'
  );
  await expect(page.getByRole('link', {name: 'Official YouTube'})).toHaveAttribute(
    'href',
    'https://youtube.com/user/AwesomeGamesStudio'
  );

  for (const [path, title] of [
    ['/privacy/', 'Privacy Policy'],
    ['/terms/', 'Terms of Service']
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole('heading', {level: 1, name: title})).toBeVisible();
    await expect(page.locator('main')).not.toContainText(/[\u3400-\u9fff]/u);
  }
});

for (const path of paths) {
  const slug = path === '/' ? 'home' : path.replaceAll('/', '');

  test(`captures the researched full-page ${slug} screenshot`, async ({page}, testInfo) => {
    await page.goto(path);
    await waitForFonts(page);
    await page.screenshot({
      animations: 'disabled',
      fullPage: true,
      path: testInfo.outputPath(`${slug}.png`)
    });
  });
}
