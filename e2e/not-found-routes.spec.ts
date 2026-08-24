import {expect, test} from '@playwright/test';

test('renders the themed Farever 404 for an unmatched English route', async ({
  request
}) => {
  const response = await request.get('/missing-route/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Lost in Siagarta');
  expect(html).toContain('Unofficial fan-made guide');
});

test('renders the localized Farever 404 for an unmatched German route', async ({
  request
}) => {
  const response = await request.get('/de/missing-route/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Verloren in Siagarta');
  expect(html).toContain('Inoffizieller, von Fans erstellter Guide');
});

test('does not let a spoofed rewrite marker bypass locale canonicalization', async ({
  request
}) => {
  const response = await request.get('/en/missing-route/', {
    headers: {'x-farever-i18n-rewrite': '1'},
    maxRedirects: 0
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/missing-route/');
});

test('negotiates German for an unprefixed route from Accept-Language', async ({
  request
}) => {
  const response = await request.get('/missing-route/', {
    headers: {'accept-language': 'de'},
    maxRedirects: 0
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/de/missing-route/');
});

test('does not route special or dotted paths through the English catch-all', async ({
  request
}) => {
  for (const path of ['/api/missing-route', '/missing-asset.png']) {
    const response = await request.get(path);
    const html = await response.text();

    expect(response.status()).toBe(404);
    expect(html).not.toContain('Lost in Siagarta');
    expect(html).not.toContain('Unofficial fan-made guide');
  }
});
