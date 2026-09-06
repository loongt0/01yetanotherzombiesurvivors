import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'es', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

export function localizeHref(locale: Locale, href: string): string {
  const path = href === '/' ? '/' : `/${href.replace(/^\/+|\/+$/g, '')}/`;

  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

const sharedLocalizedContentPaths = new Set(['/', '/characters/', '/privacy/', '/terms/']);

const localeSpecificContentPaths: Partial<Record<Locale, Set<string>>> = {
  ru: new Set([
    '/guides/best-team/',
    '/characters/ghost/build/',
    '/builds/',
    '/guides/skill-tree/',
    '/guides/friendship-and-team-bond/',
    '/weapons/rocket-launcher-and-minigun/'
  ])
};

export function hasLocalizedContent(locale: Locale, href: string): boolean {
  const path = href === '/' ? '/' : `/${href.replace(/^\/+|\/+$/g, '')}/`;

  return locale === routing.defaultLocale
    || sharedLocalizedContentPaths.has(path)
    || Boolean(localeSpecificContentPaths[locale]?.has(path));
}

export function localizeAvailableHref(locale: Locale, href: string): string {
  const path = href === '/' ? '/' : `/${href.replace(/^\/+|\/+$/g, '')}/`;
  const targetLocale = hasLocalizedContent(locale, path) ? locale : routing.defaultLocale;

  return localizeHref(targetLocale, path);
}
