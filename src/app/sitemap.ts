import type {MetadataRoute} from 'next';

import {getGuideCards} from '@/content/registry';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site-data';

const localizedPaths = ['/', '/characters/', '/privacy/', '/terms/'] as const;
const englishDirectoryPaths = ['/guides/', '/builds/', '/weapons/', '/tools/'] as const;
const staticLastModified = new Date('2026-08-25T00:00:00Z');

function localizedAlternates(path: (typeof localizedPaths)[number]) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${SITE_URL}${localizeHref(locale, path)}`
    ])
  ) as Record<Locale, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedEntries = localizedPaths.flatMap((path) => {
    const languages = localizedAlternates(path);
    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified: staticLastModified,
      alternates: {languages}
    }));
  });

  const directoryEntries = englishDirectoryPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: staticLastModified
  }));

  const articleEntries = getGuideCards(routing.defaultLocale)
    .filter((article) => article.href !== '/characters/')
    .map((article) => ({
      url: `${SITE_URL}${article.href}`,
      lastModified: new Date(`${article.updated}T00:00:00Z`)
    }));

  return [...localizedEntries, ...directoryEntries, ...articleEntries];
}
