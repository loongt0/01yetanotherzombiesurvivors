import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import HomePage from '@/app/[locale]/page';

describe('homepage', () => {
  it('renders the reference homepage section order', async () => {
    const {container} = render(
      await HomePage({params: Promise.resolve({locale: 'en'})})
    );

    const headings = Array.from(container.querySelectorAll('main h1, main h2')).map(
      (node) => node.textContent
    );

    expect(headings).toEqual([
      'Forge Your Legend in Farever',
      'What is Farever?',
      'The Four Classes',
      'Explore Two Regions',
      'Start Your Journey',
      'Tools & Tier Lists',
      'Featured Guides',
      'Latest News',
      'Farever FAQ',
      'Forge your legend today.'
    ]);
  });

  it('uses semantic term-value ordering for hero stats', async () => {
    const {container} = render(
      await HomePage({params: Promise.resolve({locale: 'en'})})
    );
    const firstStat = container.querySelector('.home-hero__stats > div');

    expect(Array.from(firstStat?.children ?? []).map((node) => node.tagName)).toEqual([
      'DT',
      'DD'
    ]);
  });

  it.each([
    [
      'de',
      'Schmiede deine Legende in Farever',
      'Die vier Klassen',
      'Einsteiger-Guide',
      '/de/beginner-guide/'
    ],
    [
      'es',
      'Forja tu leyenda en Farever',
      'Las cuatro clases',
      'Guía para principiantes',
      '/es/beginner-guide/'
    ],
    [
      'fr',
      'Forgez votre légende dans Farever',
      'Les quatre classes',
      'Guide du débutant',
      '/fr/beginner-guide/'
    ]
  ] as const)(
    'localizes the full %s homepage and its internal links',
    async (locale, heroTitle, classesTitle, beginnerLabel, beginnerHref) => {
      const {unmount} = render(
        await HomePage({params: Promise.resolve({locale})})
      );

      expect(
        screen.getByRole('heading', {level: 1, name: heroTitle})
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {level: 2, name: classesTitle})
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', {name: beginnerLabel})
      ).toHaveAttribute('href', beginnerHref);

      unmount();
    }
  );

  it('returns localized metadata with a canonical URL and four alternates', async () => {
    const pageModule = await import('@/app/[locale]/page');

    expect(typeof pageModule.generateMetadata).toBe('function');

    const metadata = await pageModule.generateMetadata({
      params: Promise.resolve({locale: 'de'})
    });

    expect(metadata.title).toBe(
      'Farever Wiki Deutsch — Klassen, Waffen & Koop-Guide'
    );
    expect(metadata.description).toContain('deutsche Farever-Wiki');
    expect(metadata.metadataBase?.toString()).toBe(
      'https://farevergame.wiki/'
    );
    expect(metadata.alternates).toEqual({
      canonical: 'https://farevergame.wiki/de/',
      languages: {
        en: 'https://farevergame.wiki/',
        de: 'https://farevergame.wiki/de/',
        es: 'https://farevergame.wiki/es/',
        fr: 'https://farevergame.wiki/fr/'
      }
    });
    expect(metadata.openGraph?.images).toEqual(['/og.png']);
  });

  it('embeds localized WebSite, Organization, VideoGame and Article JSON-LD', async () => {
    const {container} = render(
      await HomePage({params: Promise.resolve({locale: 'fr'})})
    );
    const payloads = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((script) => JSON.parse(script.textContent ?? '{}'));
    const entities = payloads.flatMap((payload) =>
      payload['@graph'] ? payload['@graph'] : [payload]
    );

    expect(entities.map((entity) => entity['@type'])).toEqual(
      expect.arrayContaining([
        'WebSite',
        'Organization',
        'VideoGame',
        'Article'
      ])
    );
    expect(
      entities.find((entity) => entity['@type'] === 'Article')
    ).toMatchObject({
      inLanguage: 'fr',
      url: 'https://farevergame.wiki/fr/'
    });
  });

  it('uses the live English WebSite and VideoGame descriptions in JSON-LD', async () => {
    const {container} = render(
      await HomePage({params: Promise.resolve({locale: 'en'})})
    );
    const payloads = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((script) => JSON.parse(script.textContent ?? '{}'));
    const entities = payloads.flatMap((payload) =>
      payload['@graph'] ? payload['@graph'] : [payload]
    );

    expect(
      entities.find((entity) => entity['@type'] === 'WebSite')?.description
    ).toBe(
      'Unofficial Farever wiki and guide hub — classes, weapons, dungeons, bosses, roadmap and live server status for the Shiro Games co-op action RPG.'
    );
    expect(
      entities.find((entity) => entity['@type'] === 'VideoGame')?.description
    ).toBe(
      'Online co-op action RPG by Shiro Games (Wartales, Northgard). Released into Steam Early Access on May 7, 2026.'
    );
  });

  it('rejects an invalid locale before reading homepage data', async () => {
    await expect(
      HomePage({
        params: Promise.resolve({locale: 'favicon.ico' as never})
      })
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });

  it('rejects an invalid locale before generating homepage metadata', async () => {
    const pageModule = await import('@/app/[locale]/page');

    await expect(
      pageModule.generateMetadata({
        params: Promise.resolve({locale: 'favicon.ico' as never})
      })
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});
