import {expect, test} from '@playwright/test';

test('renders the themed Farever 404 for an unmatched English route', async ({
  request
}) => {
  const response = await request.get('/missing-route');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Lost in Siagarta');
  expect(html).toContain('Unofficial fan-made guide');
});

test('renders the localized Farever 404 for an unmatched German route', async ({
  request
}) => {
  const response = await request.get('/de/missing-route');
  const html = await response.text();

  expect(response.status()).toBe(404);
  expect(html).toContain('Verloren in Siagarta');
  expect(html).toContain('Inoffizieller, von Fans erstellter Guide');
});
