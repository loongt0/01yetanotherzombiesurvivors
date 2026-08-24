import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

export function localizeHref(locale: Locale, href: string): string {
  const path = href === '/' ? '/' : `/${href.replace(/^\/+|\/+$/g, '')}/`;

  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}
