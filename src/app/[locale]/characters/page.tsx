import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {PageHero} from '@/components/page-hero';
import {getCharactersArticle} from '@/content/registry';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {SITE_NAME, SITE_URL} from '@/lib/site-data';

type CharactersPageProps = {params: Promise<{locale: string}>};

const alternateUrls = Object.fromEntries(
  routing.locales.map((locale) => [
    locale,
    `${SITE_URL}${localizeHref(locale, '/characters/')}`
  ])
) as Record<Locale, string>;

async function resolveLocale(params: CharactersPageProps['params']): Promise<Locale> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export async function generateMetadata({params}: CharactersPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const {frontmatter} = getCharactersArticle(locale);
  const canonical = alternateUrls[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {canonical, languages: alternateUrls},
    openGraph: {
      type: 'article',
      url: canonical,
      siteName: SITE_NAME,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.published,
      modifiedTime: frontmatter.updated,
      images: ['/og.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: ['/og.png']
    }
  };
}

export default async function CharactersPage({params}: CharactersPageProps) {
  const locale = await resolveLocale(params);
  const {frontmatter, Content} = getCharactersArticle(locale);
  const canonical = alternateUrls[locale];
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    url: canonical,
    mainEntityOfPage: {'@type': 'WebPage', '@id': canonical},
    datePublished: frontmatter.published,
    dateModified: frontmatter.updated,
    author: {'@type': 'Organization', name: SITE_NAME},
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon.png`}
    },
    inLanguage: locale
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
        }}
      />
      <main className="classes-page">
        <article className="classes-article prose-game">
          <PageHero
            eyebrow={frontmatter.eyebrow}
            title={frontmatter.title}
            description={frontmatter.description}
          />
          <div className="classes-article__body">
            <Content />
          </div>
        </article>
      </main>
    </>
  );
}
