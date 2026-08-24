import {describe, expect, it} from 'vitest';
import {frontmatterSchema} from '@/content/schema';
import {getClassesArticle, getGuideCards} from '@/content/registry';

describe('content registry', () => {
  it('rejects incomplete frontmatter with the missing field name', () => {
    expect(() => frontmatterSchema.parse({title: 'Only a title'})).toThrow(/description/);
  });

  it('returns localized classes content and guide cards', () => {
    expect(getClassesArticle('de').frontmatter.title).toMatch(/Klassen/);
    expect(getGuideCards('en').some((card) => card.slug === 'farever-best-class')).toBe(true);
  });

  it('falls back to English guide cards when a locale has no guide entry', () => {
    expect(getGuideCards('it' as never).map((card) => card.href)).toEqual([
      '/guides/farever-best-class'
    ]);
  });
});
