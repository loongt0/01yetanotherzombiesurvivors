import {describe, expect, it} from 'vitest';

import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

const siteUrl = 'https://www.yetanotherzombiesurvivors.world';

describe('technical SEO routes', () => {
  it('publishes canonical www URLs and only researched localized article copies', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteUrl}/`);
    expect(urls).toContain(`${siteUrl}/ru/characters/`);
    expect(urls).toContain(`${siteUrl}/guides/best-team/`);
    expect(urls).toContain(`${siteUrl}/ru/guides/best-team/`);
    expect(urls).toContain(`${siteUrl}/ru/builds/`);
    expect(urls).toContain(`${siteUrl}/ru/characters/ghost/build/`);
    expect(urls).toContain(`${siteUrl}/ru/guides/skill-tree/`);
    expect(urls).toContain(`${siteUrl}/ru/guides/friendship-and-team-bond/`);
    expect(urls).toContain(`${siteUrl}/ru/weapons/rocket-launcher-and-minigun/`);
    expect(urls).not.toContain(`${siteUrl}/ru/guides/tier-list/`);
    expect(urls.every((url) => url.startsWith(`${siteUrl}/`))).toBe(true);
  });

  it('links only sitemap destinations and publishes reciprocal language groups', () => {
    const entries = sitemap();
    const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
    for (const entry of entries) {
      const languages = entry.alternates?.languages;
      expect(languages).toBeDefined();
      for (const target of Object.values(languages ?? {})) {
        expect(byUrl.has(target as string)).toBe(true);
        expect(byUrl.get(target as string)?.alternates?.languages).toEqual(languages);
      }
    }
    expect(byUrl.get(`${siteUrl}/guides/best-team/`)?.alternates?.languages).toEqual({
      en: `${siteUrl}/guides/best-team/`, ru: `${siteUrl}/ru/guides/best-team/`
    });
    expect(byUrl.get(`${siteUrl}/builds/general-points-build-1-0/`)?.alternates?.languages).toEqual({
      en: `${siteUrl}/builds/general-points-build-1-0/`
    });
  });

  it('advertises the canonical sitemap to search crawlers', () => {
    expect(robots()).toEqual({
      rules: {userAgent: '*', allow: '/'},
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl
    });
  });
});
