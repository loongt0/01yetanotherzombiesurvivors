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

const localizedContentPaths = new Set([
  '/',
  '/characters/',
  '/privacy/',
  '/terms/'
]);

export function localizeAvailableHref(locale: Locale, href: string): string {
  const path = href === '/' ? '/' : `/${href.replace(/^\/+|\/+$/g, '')}/`;
  const targetLocale = localizedContentPaths.has(path)
    ? locale
    : routing.defaultLocale;

  return localizeHref(targetLocale, path);
}
