import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {getLegalPageCopy, LegalPage} from '@/components/legal-page';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site-data';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const languages = Object.fromEntries(
    routing.locales.map((alternate) => [
      alternate,
      `${SITE_URL}${localizeHref(alternate, '/privacy/')}`
    ])
  ) as Record<Locale, string>;
  const page = getLegalPageCopy('privacy', locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: {canonical: languages[locale], languages}
  };
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return <LegalPage kind="privacy" locale={locale} />;
}
