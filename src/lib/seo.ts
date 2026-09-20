import {hasLocalizedContent, localizeHref, routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site-data';

/** Keep reciprocal language annotations limited to real content versions. */
export function getLanguageAlternates(href: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales
      .filter((locale) => hasLocalizedContent(locale, href))
      .map((locale) => [locale, `${SITE_URL}${localizeHref(locale, href)}`])
  );
}
