import {describe, expect, it} from 'vitest';

import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

const siteUrl = 'https://www.yetanotherzombiesurvivors.world';

describe('technical SEO routes', () => {
  it('publishes only canonical www URLs and excludes untranslated locale copies', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteUrl}/`);
    expect(urls).toContain(`${siteUrl}/ru/characters/`);
    expect(urls).toContain(`${siteUrl}/guides/best-team/`);
    expect(urls).not.toContain(`${siteUrl}/ru/guides/best-team/`);
    expect(urls.every((url) => url.startsWith(`${siteUrl}/`))).toBe(true);
  });

  it('advertises the canonical sitemap to search crawlers', () => {
    expect(robots()).toEqual({
      rules: {userAgent: '*', allow: '/'},
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl
    });
  });
});
