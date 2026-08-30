import {describe, expect, it} from 'vitest';
import type {ComponentType} from 'react';

import {
  getCharactersArticle,
  getGuideByHref,
  getGuideCards,
  resolveGuideCards,
  type GuideCardRecord,
  type GuideDocumentRegistry
} from '@/content/registry';
import {frontmatterSchema, parseContentFrontmatter} from '@/content/schema';

const researchedGuideSlugs = [
  'rocket-launcher-and-minigun',
  'tier-list',
  'best-team',
  'synergies',
  'achievements',
  'save-problem',
  'characters',
  'hidden-characters',
  'ghost',
  'huntress',
  'sanji-the-rabbit',
  'items',
  'general-points-build-1-0',
  'weapon-upgrades',
  'huntress-upgrades',
  'attack-speed-vs-cooldown',
  'trainer',
  'cheat-engine',
  'mods'
];

describe('researched MDX content registry', () => {
  it('rejects incomplete frontmatter with the missing field name', () => {
    expect(() => frontmatterSchema.parse({title: 'Only a title'})).toThrow(/description/);
  });

  it('wraps invalid frontmatter with the source filename', () => {
    expect(() =>
      parseContentFrontmatter({title: 'Only a title'}, 'src/content/en/guides/broken.mdx')
    ).toThrow(/broken\.mdx[\s\S]*description/);
  });

  it.each([
    ['en', /Characters & Survivors/],
    ['ru', /Персонажи и выжившие/],
    ['es', /Personajes y supervivientes/],
    ['de', /Charaktere & Überlebende/]
  ] as const)('returns a researched localized character article in %s', (locale, title) => {
    expect(getCharactersArticle(locale).frontmatter.title).toMatch(title);
  });

  it.each(['en', 'ru', 'es', 'de'] as const)(
    'returns the complete researched guide matrix with English fallback in %s',
    (locale) => {
      const cards = getGuideCards(locale);

      expect(cards.map((card) => card.slug)).toEqual(researchedGuideSlugs);
      expect(cards.find((card) => card.slug === 'best-team')?.href).toBe(
        '/guides/best-team/'
      );
      expect(cards.find((card) => card.slug === 'ghost')?.href).toBe(
        '/characters/ghost/'
      );
      expect(cards.find((card) => card.slug === 'weapon-upgrades')?.href).toBe(
        '/weapons/upgrades/'
      );
    }
  );

  it('falls back per slug and sorts localized and fallback documents by date', () => {
    const Content: ComponentType = () => null;
    const card = (slug: string, title: string, updated: string): GuideCardRecord => ({
      title,
      description: `${title} description`,
      eyebrow: 'Guide',
      published: '2026-08-20',
      updated,
      slug,
      href: `/guides/${slug}/`,
      Content
    });
    const registry: GuideDocumentRegistry = {
      en: {
        fallback: card('fallback', 'English fallback', '2026-08-21'),
        localized: card('localized', 'English original', '2026-08-20')
      },
      ru: {
        localized: card('localized', 'Русский перевод', '2026-08-22')
      }
    };

    expect(resolveGuideCards('ru', registry).map(({title}) => title)).toEqual([
      'Русский перевод',
      'English fallback'
    ]);
  });

  it('resolves researched MDX documents by their actual section-specific URLs', () => {
    expect(getGuideByHref('en', '/guides/best-team/')?.slug).toBe('best-team');
    expect(getGuideByHref('ru', '/characters/ghost/')?.slug).toBe('ghost');
    expect(getGuideByHref('de', '/weapons/upgrades/')?.slug).toBe('weapon-upgrades');
    expect(getGuideByHref('es', '/tools/mods/')?.slug).toBe('mods');
    expect(getGuideByHref('en', '/guides/not-a-real-article/')).toBeUndefined();
  });

  it('uses the same researched character article for its directory card and live page', () => {
    expect(getGuideByHref('en', '/characters/')?.Content).toBe(
      getCharactersArticle('en').Content
    );
  });
});
