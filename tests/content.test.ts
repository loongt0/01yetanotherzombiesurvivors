import {describe, expect, it} from 'vitest';
import {frontmatterSchema} from '@/content/schema';
import {getClassesArticle, getGuideCards} from '@/content/registry';

describe('content registry', () => {
  it('rejects incomplete frontmatter with the missing field name', () => {
    expect(() => frontmatterSchema.parse({title: 'Only a title'})).toThrow(/description/);
  });

  it('returns localized classes content and guide cards', () => {
    expect(getClassesArticle('de').frontmatter.title).toMatch(/Klassen/);
    expect(getGuideCards('en')).toHaveLength(14);
    expect(getGuideCards('de').find((card) => card.slug === 'farever-best-class')?.title).toMatch(
      /Klasse/
    );
  });

  it('falls back to English guide cards when a locale has no guide entry', () => {
    const fallbackCards = getGuideCards('it' as never);

    expect(fallbackCards).toHaveLength(14);
    expect(fallbackCards[0]?.href).toBe('/guides/farever-best-class/');
  });
});
