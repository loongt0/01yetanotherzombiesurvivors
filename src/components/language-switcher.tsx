'use client';

import {Link, usePathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {localeOptions} from '@/lib/site-data';

const PRESERVED_PATHS = new Set([
  '/',
  '/characters/',
  '/privacy/',
  '/terms/'
]);

function getPreservedPath(
  pathname: string
): '/' | '/characters/' | '/privacy/' | '/terms/' {
  const normalized = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}/`;

  return PRESERVED_PATHS.has(normalized)
    ? (normalized as '/' | '/characters/' | '/privacy/' | '/terms/')
    : '/';
}

export function LanguageSwitcher({locale}: {locale: Locale}) {
  const pathname = usePathname();
  const preservedPath = getPreservedPath(pathname);

  return (
    <nav
      className="language-switcher"
      aria-label={localeOptions.map((option) => option.label).join(' · ')}
    >
      <ul>
        {localeOptions.map((option) => (
          <li key={option.locale}>
            <Link
              href={preservedPath}
              locale={option.locale === locale ? undefined : option.locale}
              hrefLang={option.locale}
              aria-current={option.locale === locale ? 'page' : undefined}
            >
              <span aria-hidden="true">{option.flag}</span> {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
