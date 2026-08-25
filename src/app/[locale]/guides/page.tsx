import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';

import {GuideCard} from '@/components/guide-card';
import {PageHero} from '@/components/page-hero';
import {getBeginnerGuideArticle, getGuideCards} from '@/content/registry';
import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {SITE_NAME, SITE_URL} from '@/lib/site-data';

type GuidesPageProps = {params: Promise<{locale: string}>};
type DirectoryCopy = {
  eyebrow: string;
  title: string;
  description: string;
  metadataTitle: string;
};

const copyByLocale: Record<Locale, DirectoryCopy> = {
  en: {
    eyebrow: 'Guides',
    title: 'Yet Another Zombie Survivors Guides',
    description: 'Yet another zombie survivors guide covering version 1.0, Survivor teams, upgrades, items, new maps, achievements, safe progression, and verified unlocks.',
    metadataTitle: 'Yet Another Zombie Survivors Guide: Builds, Teams & Tips'
  },
  ru: {
    eyebrow: 'Гайды',
    title: 'Гайды Yet Another Zombie Survivors',
    description: 'Проверенные гайды для новичков: выжившие, команды, синергии, предметы, оружие и разблокировки.',
    metadataTitle: 'Yet Another Zombie Survivors — Гайды и сборки'
  },
  es: {
    eyebrow: 'Guías',
    title: 'Guías de Yet Another Zombie Survivors',
    description: 'Guías contrastadas para principiantes: supervivientes, equipos, sinergias, objetos, armas y desbloqueos.',
    metadataTitle: 'Yet Another Zombie Survivors — Guías y equipos'
  },
  de: {
    eyebrow: 'Guides',
    title: 'Yet Another Zombie Survivors Guides',
    description: 'Recherchierte Guides zu Überlebenden, Teams, Synergien, Items, Waffen und Freischaltungen.',
    metadataTitle: 'Yet Another Zombie Survivors — Guides & Teams'
  }
};

const alternateUrls = Object.fromEntries(
  routing.locales.map((locale) => [
    locale,
    `${SITE_URL}${localizeHref(locale, '/guides/')}`
  ])
) as Record<Locale, string>;

async function resolveLocale(params: GuidesPageProps['params']): Promise<Locale> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export async function generateMetadata({params}: GuidesPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = copyByLocale[locale];
  const canonical = alternateUrls[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.metadataTitle,
    description: copy.description,
    alternates: {canonical, languages: alternateUrls},
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
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
  const {Content} = getBeginnerGuideArticle();

  return (
    <main className="guides-page">
      <section className="guide-directory shell-container" aria-label={copy.title}>
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div className="guide-grid" data-guide-grid>
          {getGuideCards(locale).map((card) => (
            <GuideCard key={card.slug} card={card} locale={locale} />
          ))}
        </div>
        <article className="prose-game guide-directory__article">
          <Content />
        </article>
      </section>
    </main>
  );
}
