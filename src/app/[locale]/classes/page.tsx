import {hasLocale} from 'next-intl';
import {notFound, permanentRedirect} from 'next/navigation';

import {localizeHref, routing} from '@/i18n/routing';

export default async function LegacyClassesPage({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<never> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  permanentRedirect(localizeHref(locale, '/characters/'));
}
