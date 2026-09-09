import {expect, test} from '@playwright/test';

test('only the header dropdown changes language, including on English articles', async ({page}) => {
  await page.goto('/characters/');
  const dropdown = page.locator('header .language-switcher select');
  await expect(page.locator('.language-switcher')).toHaveCount(1);
  await expect(page.locator('footer select')).toHaveCount(0);
  await expect(dropdown).toHaveValue('en');
  await dropdown.selectOption('ru');
  await expect(page).toHaveURL(/\/ru\/characters\/$/);
  await expect(dropdown).toHaveValue('ru');

  await page.locator('.primary-navigation a[href="/items/"], .mobile-navigation a[href="/items/"]').filter({visible: true}).click();
  await expect(page).toHaveURL(/\/items\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(dropdown).toHaveValue('ru');
  await expect(page.locator('.site-brand__subtitle')).toHaveText('Фанатская база знаний выживших');
  expect((await page.context().cookies()).find(c => c.name === 'YAZS_LANGUAGE')?.value).toBe('ru');

  await page.reload();
  await expect(dropdown).toHaveValue('ru');
  // Even a direct link to another article language must not set the preference.
  await page.goto('/de/characters/');
  await expect(dropdown).toHaveValue('ru');

  await page.goto('/items/');
  await dropdown.selectOption('de');
  await expect(dropdown).toHaveValue('de');
  await expect(page).toHaveURL(/\/items\/$/);
  await dropdown.selectOption('en');
  await expect(dropdown).toHaveValue('en');
  expect((await page.context().cookies()).find(c => c.name === 'YAZS_LANGUAGE')?.value).toBe('en');
  expect((await page.context().cookies()).some(c => c.name === 'NEXT_LOCALE')).toBe(false);
});

test('language menu stays inside the top-right header without horizontal overflow', async ({page}) => {
  await page.goto('/');
  const dropdown = page.locator('header .language-switcher select');
  const box = await dropdown.boundingBox();
  const viewport = page.viewportSize()!;
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThan(viewport.width / 2);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
  expect(box!.y).toBeLessThan(90);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
