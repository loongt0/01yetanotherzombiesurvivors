import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {PageHero} from '@/components/page-hero';
import {getClassesArticle} from '@/content/registry';
import {routing, type Locale} from '@/i18n/routing';

type ClassesPageProps = {
  params: Promise<{locale: string}>;
};

const SITE_URL = 'https://farevergame.wiki';

const metadataTitles: Record<Locale, string> = {
  en: 'Farever Classes & Jobs — All 4 Classes and 6 Jobs Explained',
  de: 'Farever-Klassen & Berufe — Alle 4 Klassen und 6 Berufe erklärt',
  es: 'Clases y profesiones de Farever — Las 4 clases y 6 profesiones explicadas',
  fr: 'Classes et métiers de Farever — Les 4 classes et 6 métiers expliqués'
};

const alternateUrls: Record<Locale, string> = {
  en: `${SITE_URL}/classes/`,
  de: `${SITE_URL}/de/classes/`,
  es: `${SITE_URL}/es/classes/`,
  fr: `${SITE_URL}/fr/classes/`
};

async function resolveLocale(params: ClassesPageProps['params']): Promise<Locale> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params
}: ClassesPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const {frontmatter} = getClassesArticle(locale);
  const canonical = alternateUrls[locale];
  const title = metadataTitles[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: frontmatter.description,
    alternates: {
      canonical,
      languages: alternateUrls
    },
    openGraph: {
      type: 'article',
      url: canonical,
      siteName: 'Farever Wiki',
      title,
      description: frontmatter.description,
      publishedTime: frontmatter.published,
      modifiedTime: frontmatter.updated,
      images: ['/og.png']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: frontmatter.description,
      images: ['/og.png']
    }
  };
}

export default async function ClassesPage({params}: ClassesPageProps) {
  const locale = await resolveLocale(params);
  const {frontmatter, Content} = getClassesArticle(locale);
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
    author: {'@type': 'Organization', name: 'Farever Wiki'},
    publisher: {
      '@type': 'Organization',
      name: 'Farever Wiki',
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
        <article className="classes-article">
          <PageHero
            eyebrow={frontmatter.eyebrow}
            title={frontmatter.title}
            description={frontmatter.description}
          />
          <div className="classes-article__body prose-game">
            <Content />
          </div>
        </article>
      </main>
    </>
  );
}
