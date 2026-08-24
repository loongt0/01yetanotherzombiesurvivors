import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {GuideCard} from '@/components/guide-card';
import {PageHero} from '@/components/page-hero';
import {getGuideCards} from '@/content/registry';
import {routing, type Locale} from '@/i18n/routing';

type GuidesPageProps = {
  params: Promise<{locale: string}>;
};

type DirectoryCopy = {
  eyebrow: string;
  title: string;
  description: string;
  readLabel: string;
  metadataTitle: string;
};

const SITE_URL = 'https://farevergame.wiki';

const copyByLocale: Record<Locale, DirectoryCopy> = {
  en: {
    eyebrow: 'Guides',
    title: 'All Farever Guides',
    description: 'Deep-dive long-form guides on every aspect of Farever.',
    readLabel: 'Read',
    metadataTitle: 'Farever Guides Hub — All Long-Form Guides'
  },
  de: {
    eyebrow: 'Guides',
    title: 'Alle Farever-Guides',
    description: 'Ausführliche Guides zu allen Bereichen von Farever.',
    readLabel: 'Lesen',
    metadataTitle: 'Farever-Guides — Alle ausführlichen Guides'
  },
  es: {
    eyebrow: 'Guías',
    title: 'Todas las guías de Farever',
    description: 'Guías detalladas sobre todos los aspectos de Farever.',
    readLabel: 'Leer',
    metadataTitle: 'Guías de Farever — Todas las guías detalladas'
  },
  fr: {
    eyebrow: 'Guides',
    title: 'Tous les guides Farever',
    description: 'Des guides détaillés sur tous les aspects de Farever.',
    readLabel: 'Lire',
    metadataTitle: 'Guides Farever — Tous les guides détaillés'
  }
};

const alternateUrls: Record<Locale, string> = {
  en: `${SITE_URL}/guides/`,
  de: `${SITE_URL}/de/guides/`,
  es: `${SITE_URL}/es/guides/`,
  fr: `${SITE_URL}/fr/guides/`
};

async function resolveLocale(params: GuidesPageProps['params']): Promise<Locale> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({
  params
}: GuidesPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = copyByLocale[locale];
  const canonical = alternateUrls[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.metadataTitle,
    description: copy.description,
    alternates: {
      canonical,
      languages: alternateUrls
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.metadataTitle,
      description: copy.description,
      images: ['/og.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metadataTitle,
      description: copy.description,
      images: ['/og.png']
    }
  };
}

export default async function GuidesPage({params}: GuidesPageProps) {
  const locale = await resolveLocale(params);
  const copy = copyByLocale[locale];
  const cards = getGuideCards(locale);

  return (
    <main className="guides-page">
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <section className="guide-directory shell-container" aria-label={copy.title}>
        <div className="guide-grid" data-guide-grid>
          {cards.map((card) => (
            <GuideCard
              key={card.slug}
              card={card}
              locale={locale}
              readLabel={copy.readLabel}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
