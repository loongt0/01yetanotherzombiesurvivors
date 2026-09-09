'use client';

import {useEffect} from 'react';

import {routing, type Locale} from '@/i18n/routing';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function getContentLocale(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return routing.locales.includes(firstSegment as Locale)
    ? firstSegment as Locale
    : routing.defaultLocale;
}

function getNavigationArea(anchor: HTMLAnchorElement): string {
  if (anchor.closest('.site-header')) return 'header';
  if (anchor.closest('.site-footer')) return 'footer';
  if (anchor.closest('article')) return 'article';
  if (anchor.closest('main')) return 'main';
  return 'other';
}

export function AnalyticsNavigationTracker({
  interfaceLocale,
  contentLocale
}: {
  interfaceLocale: Locale;
  contentLocale: Locale;
}) {
  useEffect(() => {
    function trackInternalNavigation(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (
        destination.pathname === window.location.pathname
        && destination.search === window.location.search
      ) return;

      window.gtag?.('event', 'select_content', {
        content_type: 'internal_page',
        item_id: destination.pathname,
        interface_locale: interfaceLocale,
        source_content_locale: contentLocale,
        destination_content_locale: getContentLocale(destination.pathname),
        source_path: window.location.pathname,
        destination_path: destination.pathname,
        navigation_area: getNavigationArea(anchor),
        link_text: anchor.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) ?? '',
        transport_type: 'beacon'
      });
    }

    document.addEventListener('click', trackInternalNavigation, true);
    return () => document.removeEventListener('click', trackInternalNavigation, true);
  }, [contentLocale, interfaceLocale]);

  return null;
}
