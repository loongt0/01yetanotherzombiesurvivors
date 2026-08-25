import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {LegalPage} from '@/components/legal-page';
import {routing} from '@/i18n/routing';

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return <LegalPage kind="terms" locale={locale} />;
}
