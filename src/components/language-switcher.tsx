'use client';

import {hasLocalizedContent, localizeHref, routing, type Locale} from '@/i18n/routing';
import {LANGUAGE_PREFERENCE_COOKIE} from '@/i18n/preference';
import {localeOptions} from '@/lib/site-data';

const labels: Record<Locale, string> = {
  en: 'Language', ru: 'Язык', es: 'Idioma', de: 'Sprache'
};

export function LanguageSwitcher({locale}: {locale: Locale}) {
  function changeLanguage(nextLocale: Locale) {
    if (!routing.locales.includes(nextLocale) || nextLocale === locale) return;

    // Only this explicit user action writes the interface language preference.
    document.cookie = `${LANGUAGE_PREFERENCE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    const current = new URL(window.location.href);
    const path = current.pathname.replace(/^\/(en|ru|es|de)(?=\/|$)/, '') || '/';
    // Keep the same article when it has no translation instead of sending the
    // reader home or treating an English article as a new language preference.
    if (hasLocalizedContent(nextLocale, path)) {
      current.pathname = localizeHref(nextLocale, path);
    }
    window.location.assign(current.href);
  }

  return (
    <label className="language-switcher">
      <select aria-label={labels[locale]} value={locale}
        onChange={(event) => changeLanguage(event.target.value as Locale)}>
        {localeOptions.map((option) => (
          <option key={option.locale} value={option.locale}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
