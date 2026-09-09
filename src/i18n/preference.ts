import {routing, type Locale} from './routing';

export const LANGUAGE_PREFERENCE_COOKIE = 'YAZS_LANGUAGE';

export function resolveLanguagePreference(value: string | undefined): Locale {
  return routing.locales.includes(value as Locale) ? value as Locale : routing.defaultLocale;
}
