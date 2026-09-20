import {expect, test} from '@playwright/test';

for (const locale of ['ru', 'es', 'de']) {
  for (const preference of ['header', 'cookie'] as const) {
    test(`${locale} ${preference}: untranslated routes reach English without a loop`, async ({request}) => {
      const headers: Record<string, string> = preference === 'header'
        ? {'accept-language': locale}
        : {cookie: `NEXT_LOCALE=${locale}`};
      for (const path of ['/tools/', '/guides/tier-list/', '/weapons/']) {
        const english = await request.get(path, {headers, maxRedirects: 0});
        expect(english.status()).toBe(200);
        expect(english.headers().location).toBeUndefined();
        expect(await english.text()).toContain('<html lang="en"');
        const localized = await request.get(`/${locale}${path}`, {headers, maxRedirects: 0});
        expect(localized.status()).toBe(308);
        expect(localized.headers().location).toBe(path);
        const followed = await request.get(`/${locale}${path}`, {headers, maxRedirects: 2});
        expect(followed.status()).toBe(200);
        expect(new URL(followed.url()).pathname).toBe(path);
      }
    });
  }
}

test('explicit translated routes win over a conflicting locale cookie', async ({request}) => {
  const response = await request.get('/ru/guides/best-team/', {
    headers: {cookie: 'NEXT_LOCALE=de', 'accept-language': 'es'},
    maxRedirects: 0
  });
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('<html lang="ru"');
});

// Regression for the two URLs reported by Search Console as redirect errors.
for (const [locale, path] of [
  ['es', '/builds/general-points-build-1-0/'],
  ['de', '/guides/friendship-and-team-bond/']
]) {
  test(`Search Console fallback ${locale}${path} has no phantom language headers`, async ({request}) => {
    const headers = {'accept-language': locale, cookie: `NEXT_LOCALE=${locale}`};
    const redirect = await request.get(`/${locale}${path}`, {headers, maxRedirects: 0});
    expect(redirect.status()).toBe(308);
    expect(redirect.headers().location).toBe(path);
    expect(redirect.headers().link ?? '').not.toContain('hreflang');
    const destination = await request.get(`/${locale}${path}`, {headers, maxRedirects: 1});
    expect(destination.status()).toBe(200);
    expect(destination.headers().link ?? '').not.toContain('hreflang');
    const html = await destination.text();
    expect(html).toContain('<html lang="en"');
    expect(html).not.toMatch(/hrefLang="(?:es|de)"/i);
  });
}
