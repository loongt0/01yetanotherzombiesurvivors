import {expect, test} from '@playwright/test';

test('renders the themed Farever 404 for an unmatched English route', async ({
  request
}) => {
  const response = await request.get('/unknown/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Lost in Siagarta');
  expect(html).toContain('Unofficial fan-made guide');
});

test('renders the localized Farever 404 for an unmatched German route', async ({
  request
}) => {
  const response = await request.get('/de/unknown/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Verloren in Siagarta');
  expect(html).toContain('Inoffizieller, von Fans erstellter Guide');
});

test('does not let a spoofed rewrite marker bypass locale canonicalization', async ({
  request
}) => {
  const response = await request.get('/en/missing-route', {
    headers: {'x-farever-i18n-rewrite': '1'},
    maxRedirects: 0
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/missing-route');
});
