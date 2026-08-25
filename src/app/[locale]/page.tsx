import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {HomeSections} from '@/components/home-sections';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {getHomeData, getHomeSeo} from '@/lib/home-data';
import {
  GAME_NAME,
  OFFICIAL_WEBSITE_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  STEAM_URL
} from '@/lib/site-data';

type HomePageProps = {params: Promise<{locale: string}>};

const alternateUrls = Object.fromEntries(
  routing.locales.map((locale) => [locale, `${SITE_URL}${localizeHref(locale, '/')}`])
) as Record<Locale, string>;

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  es: 'es_ES',
  de: 'de_DE'
};

async function resolveLocale(params: HomePageProps['params']): Promise<Locale> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = getHomeSeo(locale);
  const canonical = alternateUrls[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: [...SITE_KEYWORDS],
    alternates: {canonical, languages: alternateUrls},
    openGraph: {
      type: 'website',
      locale: openGraphLocales[locale],
      url: canonical,
      siteName: SITE_NAME,
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      images: ['/og.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      images: ['/og.png']
    }
  };
}

function getHomeStructuredData(locale: Locale) {
  const data = getHomeData(locale);
  const seo = getHomeSeo(locale);
  const canonical = alternateUrls[locale];
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#organization`;
  const gameId = `${SITE_URL}/#game`;

  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: canonical,
          name: SITE_NAME,
          description: seo.description,
          inLanguage: locale,
          publisher: {'@id': organizationId},
          about: {'@id': gameId}
        },
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon.png`}
        },
        {
          '@type': 'VideoGame',
          '@id': gameId,
          name: GAME_NAME,
          description: data.hero.description,
          url: STEAM_URL,
          gamePlatform: ['Steam'],
          applicationCategory: 'Game',
          publisher: {
            '@type': 'Organization',
            name: 'Awesome Games Studio',
            url: OFFICIAL_WEBSITE_URL
          },
          author: {'@type': 'Organization', name: 'Awesome Games Studio'},
          genre: ['Bullet Heaven', 'Action Roguelike', 'Squad Builder'],
          datePublished: '2026-08-20'
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.title,
      description: seo.description,
      url: canonical,
      mainEntityOfPage: {'@type': 'WebPage', '@id': canonical},
      datePublished: '2026-08-20',
      dateModified: '2026-08-20',
      author: {'@type': 'Organization', name: SITE_NAME},
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon.png`}
      },
      about: {'@id': gameId},
      isPartOf: {'@id': websiteId},
      inLanguage: locale
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {'@type': 'Answer', text: item.answer}
      }))
    }
  ];
}

export default async function HomePage({params}: HomePageProps) {
  const locale = await resolveLocale(params);

  return (
    <>
      {getHomeStructuredData(locale).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c')
          }}
        />
      ))}
      <HomeSections locale={locale} />
    </>
  );
}
