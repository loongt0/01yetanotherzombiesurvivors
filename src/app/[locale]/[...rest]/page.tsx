import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {GuideCard} from '@/components/guide-card';
import {PageHero} from '@/components/page-hero';
import {getGuideByHref, getGuideCards, type GuideCardRecord} from '@/content/registry';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {GAME_NAME, SITE_NAME, SITE_URL} from '@/lib/site-data';

type MatrixPageProps = {
  params: Promise<{locale: string; rest: string[]}>;
};

type MatrixCategory = 'builds' | 'weapons' | 'tools';

const categoryTitles: Record<Locale, Record<MatrixCategory, string>> = {
  en: {builds: 'Builds', weapons: 'Weapons', tools: 'Tools'},
  ru: {builds: 'Сборки', weapons: 'Оружие', tools: 'Инструменты'},
  es: {builds: 'Builds', weapons: 'Armas', tools: 'Herramientas'},
  de: {builds: 'Builds', weapons: 'Waffen', tools: 'Tools'}
};

const categoryDescriptions: Record<Locale, Record<MatrixCategory, string>> = {
  en: {
    builds: 'Research-backed Survivor builds and permanent progression guides.',
    weapons: 'Weapon upgrades, attack speed, cooldowns, and researched loadouts.',
    tools: 'Trainer, Cheat Engine, and mod guidance with safety and save-file caveats.'
  },
  ru: {
    builds: 'Проверенные сборки выживших и развитие аккаунта.',
    weapons: 'Улучшения оружия, скорость атаки и перезарядка.',
    tools: 'Trainer, Cheat Engine и моды с учетом безопасности сохранений.'
  },
  es: {
    builds: 'Builds contrastadas de supervivientes y progresión permanente.',
    weapons: 'Mejoras de armas, velocidad de ataque y tiempos de reutilización.',
    tools: 'Trainer, Cheat Engine y mods con advertencias de seguridad.'
  },
  de: {
    builds: 'Recherchierte Überlebenden-Builds und permanenter Fortschritt.',
    weapons: 'Waffen-Upgrades, Angriffstempo und Abklingzeiten.',
    tools: 'Trainer, Cheat Engine und Mods mit Sicherheits- und Speicherhinweisen.'
  }
};

type ResolvedMatrixRoute = {
  locale: Locale;
  href: string;
  article: GuideCardRecord | undefined;
  category: MatrixCategory | undefined;
  title: string;
  description: string;
};

async function resolveMatrixRoute(
  params: MatrixPageProps['params']
): Promise<ResolvedMatrixRoute> {
  const {locale, rest} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const href = `/${rest.join('/')}/`;
  const article = getGuideByHref(locale, href);
  const category =
    rest.length === 1 && Object.hasOwn(categoryTitles[locale], rest[0])
      ? (rest[0] as MatrixCategory)
      : undefined;

  if (!article && !category) notFound();

  return {
    locale,
    href,
    article,
    category,
    title: article?.title ?? `${GAME_NAME} ${categoryTitles[locale][category!]}`,
    description:
      article?.description ?? categoryDescriptions[locale][category!]
  };
}

export async function generateMetadata({params}: MatrixPageProps): Promise<Metadata> {
  const {locale, href, article, title, description} = await resolveMatrixRoute(params);
  const languages = Object.fromEntries(
    routing.locales.map((alternate) => [
      alternate,
      `${SITE_URL}${localizeHref(alternate, href)}`
    ])
  ) as Record<Locale, string>;
  const canonical = languages[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {canonical, languages},
    openGraph: {
      type: article ? 'article' : 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: ['/og.png'],
      ...(article
        ? {publishedTime: article.published, modifiedTime: article.updated}
        : {})
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png']
    }
  };
}

function MatrixArticle({
  article,
  locale,
  href
}: {
  article: GuideCardRecord;
  locale: Locale;
  href: string;
}) {
  const canonical = `${SITE_URL}${localizeHref(locale, href)}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: canonical,
    mainEntityOfPage: {'@type': 'WebPage', '@id': canonical},
    datePublished: article.published,
    dateModified: article.updated,
    author: {'@type': 'Organization', name: SITE_NAME},
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon.png`}
    },
    inLanguage: locale
  };
  const Content = article.Content;

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
            eyebrow={article.eyebrow}
            title={article.title}
            description={article.description}
          />
          <div className="classes-article__body">
            <Content />
          </div>
        </article>
      </main>
    </>
  );
}

function MatrixCategoryPage({
  category,
  locale,
  title,
  description
}: {
  category: MatrixCategory;
  locale: Locale;
  title: string;
  description: string;
}) {
  const cards = getGuideCards(locale).filter((card) =>
    card.href.startsWith(`/${category}/`)
  );

  return (
    <main className="guides-page">
      <section className="guide-directory shell-container" aria-label={title}>
        <PageHero
          eyebrow={categoryTitles[locale][category]}
          title={title}
          description={description}
        />
        <div className="guide-grid" data-guide-grid>
          {cards.map((card) => (
            <GuideCard key={card.slug} card={card} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default async function LocaleCatchAllPage({params}: MatrixPageProps) {
  const {locale, href, article, category, title, description} =
    await resolveMatrixRoute(params);

  if (article) {
    return <MatrixArticle article={article} locale={locale} href={href} />;
  }

  return (
    <MatrixCategoryPage
      category={category!}
      locale={locale}
      title={title}
      description={description}
    />
  );
}
