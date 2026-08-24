import {describe, expect, it} from 'vitest';
import type {ComponentType} from 'react';
import {
  getClassesArticle,
  getGuideCards,
  resolveGuideCards,
  type GuideCardRecord,
  type GuideDocumentRegistry
} from '@/content/registry';
import {
  frontmatterSchema,
  parseContentFrontmatter
} from '@/content/schema';

const canonicalGuideSlugs = [
  'farever-best-class',
  'farever-leveling-guide',
  'farever-crafting-guide',
  'farever-mount-guide',
  'farever-vs-wartales',
  'is-farever-worth-it',
  'farever-solo-vs-coop',
  'farever-skyover-island',
  'farever-valley-of-the-eternal-autumn',
  'farever-roadmap-2026',
  'farever-lore',
  'farever-best-mount',
  'farever-vs-diablo-4',
  'farever-vs-lost-ark'
] as const;

describe('content registry', () => {
  it('rejects incomplete frontmatter with the missing field name', () => {
    expect(() => frontmatterSchema.parse({title: 'Only a title'})).toThrow(/description/);
  });

  it('wraps invalid frontmatter with the source filename', () => {
    expect(() =>
      parseContentFrontmatter(
        {title: 'Only a title'},
        'src/content/en/guides/broken-guide.mdx'
      )
    ).toThrow(/broken-guide\.mdx[\s\S]*description/);
  });

  it('returns localized classes content and guide cards', () => {
    expect(getClassesArticle('de').frontmatter.title).toMatch(/Klassen/);
    expect(getGuideCards('de').find((card) => card.slug === 'farever-best-class')?.title).toMatch(
      /Klasse/
    );
  });

  it.each([
    ['en', /Farever Best Class/],
    ['de', /Beste Farever-Klasse/],
    ['es', /Mejor clase de Farever/],
    ['fr', /Meilleure classe de Farever/]
  ] as const)(
    'returns all canonical guide cards in %s without falling back to English',
    (locale, localizedFirstTitle) => {
      const cards = getGuideCards(locale);

      expect(cards).toHaveLength(14);
      expect(cards.map((card) => card.slug)).toEqual(canonicalGuideSlugs);
      expect(cards[0]?.title).toMatch(localizedFirstTitle);
    }
  );

  it('falls back per slug and sorts localized and fallback documents by varied dates', () => {
    const Content: ComponentType = () => null;
    const card = (
      slug: string,
      title: string,
      updated: string
    ): GuideCardRecord => ({
      title,
      description: `${title} description`,
      eyebrow: 'Guide',
      published: '2026-01-01',
      updated,
      slug,
      href: `/guides/${slug}/`,
      Content
    });
    const registry: GuideDocumentRegistry = {
      en: {
        fallback: card('fallback', 'English fallback', '2026-03-01'),
        localized: card('localized', 'English original', '2026-01-01')
      },
      de: {
        localized: card('localized', 'Deutsche Übersetzung', '2026-04-01')
      }
    };

    expect(resolveGuideCards('de', registry).map(({title}) => title)).toEqual([
      'Deutsche Übersetzung',
      'English fallback'
    ]);
  });
});
