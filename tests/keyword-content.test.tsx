import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import MatrixPage, {
  generateMetadata as generateMatrixMetadata
} from '@/app/[locale]/[...rest]/page';
import CharactersPage, {
  generateMetadata as generateCharactersMetadata
} from '@/app/[locale]/characters/page';
import GuidesPage, {
  generateMetadata as generateGuidesMetadata
} from '@/app/[locale]/guides/page';
import {getGuideCards} from '@/content/registry';

const keywordPages = [
  ['yet another zombie survivors guide', '/guides/'],
  ['yet another zombie survivors tier list', '/guides/tier-list/'],
  ['yet another zombie survivors best team', '/guides/best-team/'],
  ['yet another zombie survivors synergies', '/guides/synergies/'],
  ['yet another zombie survivors items', '/items/'],
  ['yet another zombie survivors achievements', '/guides/achievements/'],
  ['yet another zombie survivors problem with save', '/guides/save-problem/'],
  ['yet another zombie survivors characters', '/characters/'],
  ['yet another zombie survivors hidden characters', '/characters/hidden-characters/'],
  ['yet another zombie survivors ghost skills', '/characters/ghost/'],
  ['yet another zombie survivors huntress skills', '/characters/huntress/'],
  ['yet another zombie survivors sanji the rabbit', '/guides/sanji-the-rabbit/'],
  [
    'yet another zombie survivors best general points build 1.0',
    '/builds/general-points-build-1-0/'
  ],
  ['yet another zombie survivors weapon upgrades', '/weapons/upgrades/'],
  ['yet another zombie survivors huntress upgrades', '/characters/huntress/upgrades/'],
  [
    'yet another zombie survivors weapon attack speed vs weapon cooldown',
    '/weapons/attack-speed-vs-cooldown/'
  ],
  [
    'yet another zombie survivors rocket launcher and minigun',
    '/weapons/rocket-launcher-and-minigun/'
  ],
  ['yet another zombie survivors trainer', '/tools/trainer/'],
  ['yet another zombie survivors cheat engine', '/tools/cheat-engine/'],
  ['yet another zombie survivors mods', '/tools/mods/']
] as const;

async function resolveKeywordPage(path: string) {
  if (path === '/guides/') {
    const props = {params: Promise.resolve({locale: 'en'})};
    return {
      metadata: await generateGuidesMetadata(props),
      content: await GuidesPage(props)
    };
  }

  if (path === '/characters/') {
    const props = {params: Promise.resolve({locale: 'en'})};
    return {
      metadata: await generateCharactersMetadata(props),
      content: await CharactersPage(props)
    };
  }

  const props = {
    params: Promise.resolve({
      locale: 'en',
      rest: path.split('/').filter(Boolean)
    })
  };

  return {
    metadata: await generateMatrixMetadata(props),
    content: await MatrixPage(props)
  };
}

describe('researched one-keyword-one-page publishing contract', () => {
  it('assigns all 20 researched keywords to unique accessible content URLs', () => {
    expect(keywordPages).toHaveLength(20);
    expect(new Set(keywordPages.map(([, path]) => path)).size).toBe(20);
    expect(getGuideCards('en')).toHaveLength(19);
    expect(getGuideCards('en').map(({href}) => href)).toEqual(
      expect.arrayContaining([
        '/characters/hidden-characters/',
        '/characters/huntress/upgrades/'
      ])
    );
  });

  it.each(keywordPages)(
    'publishes keyword-focused SEO within the feasible character limits for %s',
    async (keyword, path) => {
      const {metadata} = await resolveKeywordPage(path);
      const title = String(metadata.title);
      const description = String(metadata.description);

      expect(title.toLowerCase()).toContain(keyword);
      expect(title.length).toBeGreaterThanOrEqual(40);
      expect(title.length).toBeLessThanOrEqual(Math.max(60, keyword.length));
      expect(description.toLowerCase()).toContain(keyword);
      expect(description.length).toBeGreaterThanOrEqual(140);
      expect(description.length).toBeLessThanOrEqual(160);
    }
  );

  it.each(keywordPages)(
    'answers %s directly with a substantial, sourced, scannable article',
    async (keyword, path) => {
      const {content} = await resolveKeywordPage(path);
      const {container} = render(content);
      const article = container.querySelector('article.prose-game');

      expect(article, path).not.toBeNull();

      const firstParagraph = article?.querySelector('p')?.textContent ?? '';
      const text = article?.textContent ?? '';
      const wordCount = text.match(/[\p{L}\p{N}]+(?:[.'’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

      expect(firstParagraph.toLowerCase()).toContain(keyword);
      expect(wordCount, `${path}: ${wordCount} words`).toBeGreaterThanOrEqual(850);
      expect(wordCount, `${path}: ${wordCount} words`).toBeLessThanOrEqual(1500);
      expect(article?.querySelectorAll('h2').length).toBeGreaterThanOrEqual(7);
      expect(article?.querySelectorAll('a[href^="https://"]').length).toBeGreaterThanOrEqual(2);
      expect(text).toContain('unconfirmed');
      expect(text).not.toMatch(/[\u3400-\u9fff]/u);
      expect(text).not.toMatch(/229\s+achievements/i);
    }
  );
});
