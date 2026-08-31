import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import type {ReactNode} from 'react';

import '@/app/globals.css';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {routing} from '@/i18n/routing';

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>;

export const metadata: Metadata = {
  icons: {
    icon: [
      {url: '/favicon.ico'},
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/icon.png', sizes: '512x512', type: 'image/png'}
    ],
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}]
  },
  manifest: '/site.webmanifest'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const analyticsEnabled =
    measurementId !== undefined && /^G-[A-Z0-9]+$/.test(measurementId);
  const adPlacementId = process.env.ADSTERRA_PLACEMENT_ID;
  const adEnabled =
    adPlacementId !== undefined && /^[a-f0-9]{32}$/.test(adPlacementId);

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader locale={locale} />
          {children}
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
        {adEnabled && (
          <>
            <Script
              async
              data-cfasync="false"
              src={`https://pl31112454.profitableratecpmnetwork.com/${adPlacementId}/invoke.js`}
              strategy="lazyOnload"
            />
            <div id={`container-${adPlacementId}`} />
          </>
        )}
        {analyticsEnabled && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
        )}
        {analyticsEnabled && (
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
