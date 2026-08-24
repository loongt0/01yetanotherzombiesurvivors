import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {HomeSections} from '@/components/home-sections';
import {routing, type Locale} from '@/i18n/routing';
import {getHomeData, getHomeSeo} from '@/lib/home-data';
import {STEAM_URL} from '@/lib/site-data';

type HomePageProps = {
  params: Promise<{locale: string}>;
};

const SITE_URL = 'https://farevergame.wiki';
const EN_WEBSITE_DESCRIPTION =
  'Unofficial Farever wiki and guide hub — classes, weapons, dungeons, bosses, roadmap and live server status for the Shiro Games co-op action RPG.';
const EN_GAME_DESCRIPTION =
  'Online co-op action RPG by Shiro Games (Wartales, Northgard). Released into Steam Early Access on May 7, 2026.';

const alternateUrls: Record<Locale, string> = {
  en: `${SITE_URL}/`,
  de: `${SITE_URL}/de/`,
  es: `${SITE_URL}/es/`,
  fr: `${SITE_URL}/fr/`
};

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR'
};

async function resolveLocale(params: HomePageProps['params']): Promise<Locale> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params
}: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = getHomeSeo(locale);
  const canonical = alternateUrls[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    icons: {icon: '/icon.png'},
    alternates: {
      canonical,
      languages: alternateUrls
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocales[locale],
      url: canonical,
      siteName: 'Farever Wiki',
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
  const organizationId = `${SITE_URL}/#org`;
  const gameId = `${SITE_URL}/#game`;

  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: canonical,
          name: 'Farever Wiki',
          description:
            locale === 'en' ? EN_WEBSITE_DESCRIPTION : seo.description,
          inLanguage: locale,
          publisher: {'@id': organizationId},
          about: {'@id': gameId}
        },
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: 'Farever Wiki',
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/icon.png`,
            width: 512,
            height: 512
          }
        },
        {
          '@type': 'VideoGame',
          '@id': gameId,
          name: 'Farever',
          alternateName: ['FAREVER'],
          description: locale === 'en' ? EN_GAME_DESCRIPTION : data.hero.description,
          url: STEAM_URL,
          gamePlatform: ['PC', 'Steam'],
          applicationCategory: 'Game',
          operatingSystem: ['Windows'],
          publisher: {
            '@type': 'Organization',
            name: 'Shiro Games',
            url: 'https://shirogames.com/'
          },
          author: {'@type': 'Organization', name: 'Shiro Games'},
          genre: ['Action RPG', 'Co-op', 'MMO-lite', 'Open World'],
          datePublished: '2026-05-07'
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
      datePublished: '2026-05-07',
      dateModified: '2026-05-18',
      author: {'@type': 'Organization', name: 'Farever Wiki'},
      publisher: {
        '@type': 'Organization',
        name: 'Farever Wiki',
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
  const structuredData = getHomeStructuredData(locale);

  return (
    <>
      {structuredData.map((schema, index) => (
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
