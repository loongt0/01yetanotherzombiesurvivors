import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import CharactersPage, {
  generateMetadata as generateCharactersMetadata
} from '@/app/[locale]/characters/page';
import MatrixPage, {
  generateMetadata as generateMatrixMetadata
} from '@/app/[locale]/[...rest]/page';
import GuidesPage, {
  generateMetadata as generateGuidesMetadata
} from '@/app/[locale]/guides/page';
import HomePage, {generateMetadata as generateHomeMetadata} from '@/app/[locale]/page';
import PrivacyPage from '@/app/[locale]/privacy/page';
import TermsPage from '@/app/[locale]/terms/page';

const siteUrl = 'https://www.yetanotherzombiesurvivors.world';
const alternates = (path: string) => ({
  en: `${siteUrl}${path}`,
  ru: `${siteUrl}/ru${path}`,
  es: `${siteUrl}/es${path}`,
  de: `${siteUrl}/de${path}`
});

describe('researched homepage', () => {
  it('preserves the reference section structure with researched game headings', async () => {
    const {container} = render(await HomePage({params: Promise.resolve({locale: 'en'})}));
    const headings = Array.from(container.querySelectorAll('main h1, main h2')).map(
      (node) => node.textContent
    );

    expect(headings).toEqual([
      'Yet Another Zombie Survivors',
      'What is Yet Another Zombie Survivors?',
      'Meet the Survivors',
      'New Arenas & Modes',
      'Your Yet Another Zombie Survivors Journey',
      'Guides, Builds & Tools',
      'Featured Guides',
      'Version 1.0 Highlights',
      'Yet Another Zombie Survivors FAQ',
      'Ready to Master Yet Another Zombie Survivors?'
    ]);
  });

  it('keeps semantic term-value ordering for verified hero statistics', async () => {
    const {container} = render(await HomePage({params: Promise.resolve({locale: 'en'})}));
    const stat = container.querySelector('.home-hero__stats > div');

    expect(Array.from(stat?.children ?? []).map((node) => node.tagName)).toEqual([
      'DT',
      'DD'
    ]);
  });

  it.each([
    ['ru', 'Что такое Yet Another Zombie Survivors?', 'Гайд для новичков', '/guides/'],
    ['es', '¿Qué es Yet Another Zombie Survivors?', 'Guía para principiantes', '/guides/'],
    ['de', 'Was ist Yet Another Zombie Survivors?', 'Einsteiger-Guide starten', '/guides/']
  ] as const)(
    'localizes the primary %s homepage content and guide links',
    async (locale, aboutHeading, beginnerLabel, beginnerHref) => {
      render(await HomePage({params: Promise.resolve({locale})}));

      expect(screen.getByRole('heading', {level: 2, name: aboutHeading})).toBeInTheDocument();
      expect(screen.getByRole('link', {name: beginnerLabel})).toHaveAttribute(
        'href',
        beginnerHref
      );
    }
  );

  it('publishes canonical URLs, researched keywords, and the four selected alternates', async () => {
    const metadata = await generateHomeMetadata({params: Promise.resolve({locale: 'ru'})});

    expect(metadata.title).toContain('Yet Another Zombie Survivors');
    expect(metadata.metadataBase?.toString()).toBe(`${siteUrl}/`);
    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/ru/`,
      languages: alternates('/')
    });
    expect(metadata.keywords).toContain('YAZS');
  });

  it('embeds verified publisher and squad-game structured data without invented offers', async () => {
    const {container} = render(await HomePage({params: Promise.resolve({locale: 'en'})}));
    const payloads = Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
      (script) => JSON.parse(script.textContent ?? '{}')
    );
    const graph = payloads[0]['@graph'] as Array<Record<string, unknown>>;
    const game = graph.find((node) => node['@type'] === 'VideoGame');

    expect(game).toMatchObject({
      name: 'Yet Another Zombie Survivors',
      gamePlatform: ['Steam'],
      datePublished: '2026-08-20',
      publisher: {name: 'Awesome Games Studio'}
    });
    expect(game).not.toHaveProperty('offers');
    expect(JSON.stringify(payloads)).not.toMatch(/SearchAction|229 Achievements/);
  });

  it('omits redemption codes when no researched code system exists', async () => {
    const {container} = render(await HomePage({params: Promise.resolve({locale: 'en'})}));

    expect(container.querySelector('.facts-card__codes')).toBeNull();
    expect(container.textContent).not.toMatch(/redemption codes|[\u3400-\u9fff]/iu);
  });
});

describe('guide directory', () => {
  it('renders all matrix topics with correct section-specific URLs', async () => {
    const {container} = render(await GuidesPage({params: Promise.resolve({locale: 'en'})}));
    const page = within(container);

    expect(page.getByRole('heading', {
      level: 1,
      name: 'Yet Another Zombie Survivors Guides'
    })).toBeInTheDocument();
    expect(container.querySelectorAll('.guide-directory-card')).toHaveLength(19);
    expect(page.getByRole('link', {name: /Best Team/})).toHaveAttribute(
      'href',
      '/guides/best-team/'
    );
    expect(page.getByRole('link', {name: /Ghost Skills/})).toHaveAttribute(
      'href',
      '/characters/ghost/'
    );
  });

  it.each(['ru', 'es', 'de'] as const)(
    'redirects the untranslated %s guide directory to English',
    async (locale) => {
      await expect(
        GuidesPage({params: Promise.resolve({locale})})
      ).rejects.toThrow('NEXT_REDIRECT');
    }
  );

  it('publishes only the real English alternate for untranslated guide directories', async () => {
    const metadata = await generateGuidesMetadata({
      params: Promise.resolve({locale: 'de'})
    });

    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/guides/`,
      languages: {en: `${siteUrl}/guides/`}
    });
  });
});

describe('researched character article', () => {
  it('renders all nine verified Survivors and both researched tables', async () => {
    const {container} = render(
      await CharactersPage({params: Promise.resolve({locale: 'en'})})
    );

    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Yet Another Zombie Survivors Characters & Survivors'
    })).toBeInTheDocument();
    expect(container.querySelectorAll('table')).toHaveLength(2);

    for (const survivor of [
      'SWAT', 'Tank', 'Engineer', 'Huntress', 'Ghost', 'Medic', 'Pyro', 'Mechanic', 'Ranger'
    ]) {
      expect(container.textContent).toContain(survivor);
    }

    expect(container.textContent).toContain('Survival Level 175');
    expect(container.textContent).toContain('unconfirmed');
    expect(container.textContent).not.toContain('229 Achievements');
  });

  it.each([
    ['ru', /Персонажи и выжившие/],
    ['es', /Personajes y supervivientes/],
    ['de', /Charaktere & Überlebende/]
  ] as const)('renders a localized %s character article', async (locale, title) => {
    render(await CharactersPage({params: Promise.resolve({locale})}));

    expect(screen.getByRole('heading', {level: 1, name: title})).toBeInTheDocument();
    expect(screen.getAllByRole('table')).toHaveLength(2);
  });

  it('publishes canonical article metadata and structured data for the researched game', async () => {
    const metadata = await generateCharactersMetadata({
      params: Promise.resolve({locale: 'es'})
    });
    const {container} = render(
      await CharactersPage({params: Promise.resolve({locale: 'es'})})
    );
    const structuredData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'
    );

    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/es/characters/`,
      languages: alternates('/characters/')
    });
    expect(structuredData).toMatchObject({
      '@type': 'Article',
      inLanguage: 'es',
      author: {name: 'Yet Another Zombie Survivors Wiki'}
    });
  });
});

describe('researched matrix article and category routes', () => {
  it.each([
    [['guides', 'best-team'], /Best Team/],
    [['characters', 'ghost'], /Ghost Skills/],
    [['items'], /Items: Effects & Unlocks/],
    [['weapons', 'upgrades'], /Weapon Upgrades/],
    [['tools', 'mods'], /Mods/]
  ] as const)('renders the researched MDX article at /%s/', async (rest, title) => {
    const {container} = render(
      await MatrixPage({params: Promise.resolve({locale: 'en', rest: [...rest]})})
    );

    expect(screen.getByRole('heading', {level: 1, name: title})).toBeInTheDocument();
    expect(container.querySelector('article.prose-game')).toBeInTheDocument();
  });

  it('publishes only the real English alternate for untranslated MDX articles', async () => {
    const metadata = await generateMatrixMetadata({
      params: Promise.resolve({locale: 'ru', rest: ['guides', 'best-team']})
    });

    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/guides/best-team/`,
      languages: {en: `${siteUrl}/guides/best-team/`}
    });
    expect(metadata.title).toContain('Best Team');
  });

  it.each([
    [['builds'], /Builds/],
    [['weapons'], /Weapons/],
    [['tools'], /Tools/]
  ] as const)('lists real researched topics at /%s/', async (rest, title) => {
    const {container} = render(
      await MatrixPage({params: Promise.resolve({locale: 'en', rest: [...rest]})})
    );

    expect(screen.getByRole('heading', {level: 1, name: title})).toBeInTheDocument();
    expect(container.querySelectorAll('.guide-directory-card').length).toBeGreaterThan(0);
  });

  it('rejects an unsupported redemption-code page', async () => {
    await expect(
      MatrixPage({params: Promise.resolve({locale: 'en', rest: ['codes']})})
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});

describe('legal pages', () => {
  it.each([
    [PrivacyPage, 'Privacy Policy'],
    [TermsPage, 'Terms of Service']
  ] as const)('renders %s without inventing an unverified legal policy', async (Page, title) => {
    const {container} = render(await Page({params: Promise.resolve({locale: 'en'})}));

    expect(screen.getByRole('heading', {level: 1, name: title})).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[\u3400-\u9fff]/u);
    expect(container.textContent).not.toMatch(/data retention|governing jurisdiction/i);
    expect(container.textContent).toContain('Yet Another Zombie Survivors');
  });
});
