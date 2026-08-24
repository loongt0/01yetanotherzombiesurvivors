import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import HomePage from '@/app/[locale]/page';
import ClassesPage from '@/app/[locale]/classes/page';
import GuidesPage from '@/app/[locale]/guides/page';

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

describe('guide directory', () => {
  it('renders a two-column guide directory sourced from MDX', async () => {
    const {container} = render(
      await GuidesPage({params: Promise.resolve({locale: 'en'})})
    );

    expect(
      screen.getByRole('heading', {level: 1, name: 'All Farever Guides'})
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {name: /Farever Best Class/i})
    ).toHaveAttribute('href', '/guides/farever-best-class/');
    expect(container.querySelector('[data-guide-grid]')).toHaveClass('guide-grid');
    expect(container.querySelector('.guide-directory-card h3')).toHaveTextContent(
      /Farever Best Class/i
    );
    expect(container.querySelector('.guide-directory-card h2')).toBeNull();
    expect(container.querySelector('.guide-directory-card__action')).toBeNull();
  });

  it('renders apostrophes from guide frontmatter as characters, not entity text', async () => {
    const {container} = render(
      await GuidesPage({params: Promise.resolve({locale: 'en'})})
    );
    const view = within(container);
    const roadmapCard = view
      .getByRole('heading', {
        level: 3,
        name: "Farever 2026 Roadmap — What's Coming This Year"
      })
      .closest('.guide-directory-card');
    const valleyCard = view
      .getByRole('heading', {
        level: 3,
        name: 'Valley of the Eternal Autumn — Complete Region Guide'
      })
      .closest('.guide-directory-card');

    expect(roadmapCard).toHaveTextContent(
      "Farever 2026 Roadmap — What's Coming This Year"
    );
    expect(valleyCard).toHaveTextContent("Farever's second EA region");
    for (const card of [roadmapCard, valleyCard]) {
      expect(card).not.toHaveTextContent('&apos;');
      expect(card).not.toHaveTextContent('&amp;apos;');
    }
  });

  it.each([
    ['de', 'Alle Farever-Guides', /Beste Farever-Klasse/i, '/de/guides/farever-best-class/'],
    ['es', 'Todas las guías de Farever', /Mejor clase de Farever/i, '/es/guides/farever-best-class/'],
    ['fr', 'Tous les guides Farever', /Meilleure classe de Farever/i, '/fr/guides/farever-best-class/']
  ] as const)(
    'localizes the %s directory copy and guide links',
    async (locale, title, guideName, guideHref) => {
      render(await GuidesPage({params: Promise.resolve({locale})}));

      expect(
        screen.getByRole('heading', {level: 1, name: title})
      ).toBeInTheDocument();
      expect(screen.getByRole('link', {name: guideName})).toHaveAttribute(
        'href',
        guideHref
      );
    }
  );

  it('publishes localized metadata and language alternates', async () => {
    const pageModule = await import('@/app/[locale]/guides/page');
    const metadata = await pageModule.generateMetadata({
      params: Promise.resolve({locale: 'fr'})
    });

    expect(metadata.title).toBe('Guides Farever — Tous les guides détaillés');
    expect(metadata.alternates).toEqual({
      canonical: 'https://farevergame.wiki/fr/guides/',
      languages: {
        en: 'https://farevergame.wiki/guides/',
        de: 'https://farevergame.wiki/de/guides/',
        es: 'https://farevergame.wiki/es/guides/',
        fr: 'https://farevergame.wiki/fr/guides/'
      }
    });
  });
});

describe('classes article', () => {
  it('keeps the hero and MDX body inside one prose-constrained article', async () => {
    const {container, unmount} = render(
      await ClassesPage({params: Promise.resolve({locale: 'en'})})
    );
    const view = within(container);
    const article = view.getByRole('article');
    const hero = article.querySelector<HTMLElement>(':scope > .page-hero');
    const proseBody = article.querySelector<HTMLElement>(
      ':scope > .classes-article__body'
    );

    expect(article).toHaveClass('classes-article');
    expect(article).toHaveClass('prose-game');
    expect(hero).toBeInTheDocument();
    expect(proseBody).toBeInTheDocument();
    expect(proseBody).not.toHaveClass('prose-game');
    expect(
      within(hero as HTMLElement).getByRole('heading', {
        level: 1,
        name: 'Farever Classes & Jobs'
      })
    ).toBeInTheDocument();
    expect(
      within(proseBody as HTMLElement).getByRole('heading', {
        level: 2,
        name: 'The 4 classes'
      })
    ).toBeInTheDocument();
    expect(
      within(proseBody as HTMLElement).getByRole('columnheader', {name: 'Class'})
    ).toBeInTheDocument();
    expect(
      within(proseBody as HTMLElement).getByRole('heading', {level: 2, name: /FAQ/})
    ).toBeInTheDocument();
    expect(article.querySelector('.article-table-wrap')).toBeNull();

    unmount();
  });

  it('preserves the exact English section hierarchy and Related links', async () => {
    const {container, unmount} = render(
      await ClassesPage({params: Promise.resolve({locale: 'en'})})
    );
    const article = within(container).getByRole('article');
    const articleView = within(article);

    expect(
      articleView
        .getAllByRole('heading', {level: 2})
        .map((heading) => heading.textContent)
    ).toEqual([
      'The 4 classes',
      'The 6 jobs',
      'Best class combos for co-op',
      'Should you respec?',
      'Class deep-dives',
      'FAQ — Farever classes',
      'Related'
    ]);
    expect(
      articleView
        .getAllByRole('heading', {level: 3})
        .map((heading) => heading.textContent)
    ).toEqual([
      'Warrior — best for new players',
      'Ranger — best for solo players',
      'Mage — highest damage ceiling',
      'Mystic — flex support',
      'How many classes are in Farever?',
      'Best Farever class for beginners?',
      'Best Farever class for solo play?',
      'Best Farever class for co-op / groups?',
      'Can I switch classes in Farever?',
      'How does the talent tree work?'
    ]);

    for (const [name, href] of [
      ['Farever class tier list', '/tier-list/'],
      ['Meta builds for every class', '/builds/'],
      ['Jobs & crafting professions', '/jobs/'],
      ['All weapons', '/weapons/'],
      ['Leveling guide', '/leveling-guide/']
    ] as const) {
      expect(articleView.getByRole('link', {name})).toHaveAttribute('href', href);
    }

    unmount();
  });

  it('matches the target emphasis in English introductions and tables', async () => {
    const {container, unmount} = render(
      await ClassesPage({params: Promise.resolve({locale: 'en'})})
    );
    const articleView = within(within(container).getByRole('article'));

    expect(
      articleView.getByText('baseline stats, armour type and identity').tagName
    ).toBe('STRONG');
    expect(
      articleView.getByText('crafting and gathering professions').tagName
    ).toBe('STRONG');
    expect(articleView.getAllByRole('strong')).toHaveLength(15);

    const tables = articleView.getAllByRole('table');
    for (const [table, labels] of [
      [tables[0], ['Warrior', 'Ranger', 'Mage', 'Mystic']],
      [
        tables[1],
        ['Blacksmith', 'Alchemist', 'Hunter', 'Miner', 'Scholar', 'Cook']
      ]
    ] as const) {
      for (const label of labels) {
        const cell = within(table).getByRole('cell', {name: label});
        expect(within(cell).getByText(label).tagName).toBe('STRONG');
      }
    }

    unmount();
  });

  it.each([
    ['de', 'Farever-Klassen & Berufe', 'Die 4 Klassen'],
    ['es', 'Clases y profesiones de Farever', 'Las 4 clases'],
    ['fr', 'Classes et métiers de Farever', 'Les 4 classes']
  ] as const)(
    'renders the complete localized %s article',
    async (locale, title, firstSection) => {
      const {container, unmount} = render(
        await ClassesPage({params: Promise.resolve({locale})})
      );
      const view = within(container);
      const article = view.getByRole('article');
      const articleView = within(article);

      expect(view.getByRole('heading', {level: 1, name: title})).toBeInTheDocument();
      expect(
        articleView.getByRole('heading', {level: 2, name: firstSection})
      ).toBeInTheDocument();
      expect(articleView.getAllByRole('row')).toHaveLength(12);

      unmount();
    }
  );

  it.each([
    [
      'de',
      'Grundwerte, deinen Rüstungstyp und deine Identität',
      'Berufe zum Herstellen und Sammeln'
    ],
    [
      'es',
      'tus atributos básicos, el tipo de armadura y tu identidad',
      'Las profesiones de fabricación y recolección'
    ],
    [
      'fr',
      "vos caractéristiques de base, votre type d'armure et votre identité",
      "Les métiers d'artisanat et de récolte"
    ]
  ] as const)(
    'matches the target emphasis in the localized %s article',
    async (locale, classesEmphasis, jobsEmphasis) => {
      const {container, unmount} = render(
        await ClassesPage({params: Promise.resolve({locale})})
      );
      const articleView = within(within(container).getByRole('article'));

      expect(articleView.getByText(classesEmphasis).tagName).toBe('STRONG');
      expect(articleView.getByText(jobsEmphasis).tagName).toBe('STRONG');
      expect(articleView.getAllByRole('strong')).toHaveLength(15);

      const tables = articleView.getAllByRole('table');
      for (const [table, labels] of [
        [tables[0], ['Warrior', 'Ranger', 'Mage', 'Mystic']],
        [
          tables[1],
          ['Blacksmith', 'Alchemist', 'Hunter', 'Miner', 'Scholar', 'Cook']
        ]
      ] as const) {
        for (const label of labels) {
          const cell = within(table).getByRole('cell', {name: label});
          expect(within(cell).getByText(label).tagName).toBe('STRONG');
        }
      }

      unmount();
    }
  );

  it('publishes localized article metadata and language alternates', async () => {
    const pageModule = await import('@/app/[locale]/classes/page');
    const metadata = await pageModule.generateMetadata({
      params: Promise.resolve({locale: 'fr'})
    });

    expect(metadata.title).toBe(
      'Classes et métiers de Farever — Les 4 classes et 6 métiers expliqués'
    );
    expect(metadata.alternates).toEqual({
      canonical: 'https://farevergame.wiki/fr/classes/',
      languages: {
        en: 'https://farevergame.wiki/classes/',
        de: 'https://farevergame.wiki/de/classes/',
        es: 'https://farevergame.wiki/es/classes/',
        fr: 'https://farevergame.wiki/fr/classes/'
      }
    });
    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      url: 'https://farevergame.wiki/fr/classes/',
      publishedTime: '2026-05-07',
      modifiedTime: '2026-05-18'
    });
  });

  it('embeds a localized Article JSON-LD payload from frontmatter', async () => {
    const {container, unmount} = render(
      await ClassesPage({params: Promise.resolve({locale: 'de'})})
    );
    const payload = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'
    );

    expect(payload).toMatchObject({
      '@type': 'Article',
      headline: 'Farever-Klassen & Berufe',
      url: 'https://farevergame.wiki/de/classes/',
      datePublished: '2026-05-07',
      dateModified: '2026-05-18',
      inLanguage: 'de'
    });

    unmount();
  });

  it('rejects invalid locales before reading article content or metadata', async () => {
    const pageModule = await import('@/app/[locale]/classes/page');

    await expect(
      ClassesPage({params: Promise.resolve({locale: 'favicon.ico'})})
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    await expect(
      pageModule.generateMetadata({
        params: Promise.resolve({locale: 'favicon.ico'})
      })
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});
