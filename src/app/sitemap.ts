import type {MetadataRoute} from 'next';

import {getGuideCards, getLocalizedGuideCards} from '@/content/registry';
import {localizeHref, routing} from '@/i18n/routing';
import {getLanguageAlternates} from '@/lib/seo';
import {SITE_URL} from '@/lib/site-data';

const localizedPaths = ['/', '/characters/', '/privacy/', '/terms/'] as const;
const englishDirectoryPaths = ['/guides/', '/builds/', '/weapons/', '/tools/'] as const;
const staticLastModified = new Date('2026-08-25T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedEntries = localizedPaths.flatMap((path) => {
    const languages = getLanguageAlternates(path);
    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified: staticLastModified,
      alternates: {languages}
    }));
  });

  const directoryEntries = englishDirectoryPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: staticLastModified,
    alternates: {languages: getLanguageAlternates(path)}
  }));

  const articleEntries = getGuideCards(routing.defaultLocale)
    .filter((article) => article.href !== '/characters/')
    .map((article) => ({
      url: `${SITE_URL}${article.href}`,
      lastModified: new Date(`${article.updated}T00:00:00Z`),
      alternates: {languages: getLanguageAlternates(article.href)}
    }));

  const russianArticleEntries = getLocalizedGuideCards('ru').map((article) => ({
    url: `${SITE_URL}${localizeHref('ru', article.href)}`,
    lastModified: new Date(`${article.updated}T00:00:00Z`),
    alternates: {languages: getLanguageAlternates(article.href)}
  }));

  return [...localizedEntries, ...directoryEntries, ...articleEntries, ...russianArticleEntries];
}
