import {expect, test} from '@playwright/test';

test('renders the themed survivor-game 404 for an unmatched English route', async ({
  request
}) => {
  const response = await request.get('/missing-route/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Lost Among the Horde');
  expect(html).toContain('Yet Another Zombie Survivors Wiki');
});

test('renders the localized survivor-game 404 for an unmatched Russian route', async ({
  request
}) => {
  const response = await request.get('/ru/missing-route/');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Затерялись среди орды');
  expect(html).toContain('Yet Another Zombie Survivors Wiki');
});

test('does not let a spoofed rewrite marker bypass locale canonicalization', async ({
  request
}) => {
  const response = await request.get('/en/missing-route/', {
    headers: {'x-yazs-i18n-rewrite': '1'},
    maxRedirects: 0
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/missing-route/');
});

test('negotiates Russian for an unprefixed route from Accept-Language', async ({
  request
}) => {
  const response = await request.get('/missing-route/', {
    headers: {'accept-language': 'ru'},
    maxRedirects: 0
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/ru/missing-route/');
});

test('does not route special or dotted paths through the localized catch-all', async ({
  request
}) => {
  for (const path of ['/api/missing-route', '/missing-asset.png']) {
    const response = await request.get(path);

    expect(response.status()).toBe(404);
    expect(await response.text()).not.toContain('Lost Among the Horde');
  }
});
