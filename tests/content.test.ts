import {describe, expect, it} from 'vitest';
import {frontmatterSchema} from '@/content/schema';
import {getClassesArticle, getGuideCards} from '@/content/registry';

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

  it('falls back to English guide cards when a locale has no guide entry', () => {
    const fallbackCards = getGuideCards('it' as never);

    expect(fallbackCards).toHaveLength(14);
    expect(fallbackCards[0]?.href).toBe('/guides/farever-best-class/');
  });
});
