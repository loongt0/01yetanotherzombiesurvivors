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
  ['yet another zombie survivors achievement guide', '/guides/achievements/'],
  [
    'yet another zombie survivors potato guide – find sanji',
    '/guides/sanji-the-rabbit/'
  ],
  [
    'yet another zombie survivors im boss here achievement guide',
    '/guides/achievements/'
  ],
  ['yet another zombie survivors trophy guide', '/guides/achievements/'],
  ['yet another zombie survivors upgrade guide', '/guides/upgrade-guide/'],
  ['yet another zombie survivors achievements guide', '/guides/achievements/'],
  ['yet another zombie survivors beginner guide', '/guides/'],
  ['yet another zombie survivors build guide', '/builds/'],
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
    'rocket launcher vs minigun',
    '/weapons/rocket-launcher-and-minigun/'
  ],
  ['yet another zombie survivors trainer', '/tools/trainer/'],
  ['yet another zombie survivors cheat engine', '/tools/cheat-engine/'],
  ['yet another zombie survivors mods', '/tools/mods/'],
  ['yet another zombie survivors builds', '/builds/'],
  ['yet another zombie survivors ghost build', '/characters/ghost/build/'],
  ['yet another zombie survivors huntress build', '/characters/huntress/build/'],
  ['yet another zombie survivors skill tree', '/guides/skill-tree/'],
  ['yet another zombie survivors friendship', '/guides/friendship-and-team-bond/'],
  ['yet another zombie survivors team bond', '/guides/friendship-and-team-bond/'],
  ['yet another zombie survivors max level', '/guides/max-level-and-rank-5/']
] as const;

const mergedAliases = [
  'yet another zombie survivors achievement guide',
  'yet another zombie survivors potato guide – find sanji',
  'yet another zombie survivors im boss here achievement guide',
  'yet another zombie survivors trophy guide',
  'yet another zombie survivors achievements guide',
  'yet another zombie survivors beginner guide',
  'yet another zombie survivors build guide'
];

function getAliasPhrase(keyword: string) {
  if (keyword.includes('potato')) return 'potato guide';
  if (keyword.includes('trophy')) return 'trophy guide';
  if (keyword.includes('boss')) return "i'm the boss";
  if (keyword.includes('beginner')) return 'beginner guide';
  if (keyword.includes('build')) return 'build guide';
  return 'achievement guide';
}

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
  it('assigns all 35 researched keywords to accessible content URLs', () => {
    expect(keywordPages).toHaveLength(35);
    expect(new Set(keywordPages.map(([, path]) => path)).size).toBe(27);
    expect(getGuideCards('en')).toHaveLength(26);
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
      const mergedAlias = mergedAliases.includes(keyword);

      if (mergedAlias) {
        expect(title.toLowerCase()).toContain('yet another zombie survivors');
      } else if (keyword === 'yet another zombie survivors team bond') {
        expect(title.toLowerCase()).toContain('yet another zombie survivors');
        expect(title.toLowerCase()).toContain('team bond');
      } else {
        expect(title.toLowerCase()).toContain(keyword);
      }
      expect(title.length).toBeGreaterThanOrEqual(40);
      expect(title.length).toBeLessThanOrEqual(Math.max(60, keyword.length));
      if (mergedAlias) {
        expect(description.toLowerCase().replace('’', "'")).toContain(
          getAliasPhrase(keyword)
        );
      } else if (keyword === 'yet another zombie survivors team bond') {
        expect(description.toLowerCase()).toContain('yet another zombie survivors');
        expect(description.toLowerCase()).toContain('team bond');
      } else {
        expect(description.toLowerCase()).toContain(keyword);
      }
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

      if (mergedAliases.includes(keyword)) {
        const expectedPhrase = keyword.includes('boss')
          ? "i'm boss here"
          : getAliasPhrase(keyword);
        expect(text.toLowerCase()).toContain(expectedPhrase);
      } else {
        expect(firstParagraph.toLowerCase()).toContain(keyword);
      }
      expect(wordCount, `${path}: ${wordCount} words`).toBeGreaterThanOrEqual(850);
      expect(wordCount, `${path}: ${wordCount} words`).toBeLessThanOrEqual(1500);
      expect(article?.querySelectorAll('h2').length).toBeGreaterThanOrEqual(7);
      expect(article?.querySelectorAll('a[href^="https://"]').length).toBeGreaterThanOrEqual(2);
      expect(text).toContain('unconfirmed');
      expect(text).not.toMatch(/[\u3400-\u9fff]/u);
      if (path === '/guides/achievements/') {
        expect(text).toMatch(/229(?: total)? achievements/i);
      } else {
        expect(text).not.toMatch(/229\s+achievements/i);
      }
    }
  );

  it('merges synonymous long-tail queries into substantial canonical pages', async () => {
    const canonicalPages = await Promise.all([
      '/guides/achievements/',
      '/guides/sanji-the-rabbit/',
      '/guides/upgrade-guide/',
      '/guides/',
      '/builds/'
    ].map(async (path) => render((await resolveKeywordPage(path)).content).container));

    expect(canonicalPages).toHaveLength(5);
    expect(canonicalPages.every((container) =>
      container.querySelector('article.prose-game') !== null
    )).toBe(true);
  });

  it('publishes the Tank weapon comparison with official-only evidence and a scannable table', async () => {
    const path = '/weapons/rocket-launcher-and-minigun/';
    const {metadata, content} = await resolveKeywordPage(path);
    const {container} = render(content);
    const article = container.querySelector('article.prose-game');
    const citations = Array.from(
      article?.querySelectorAll<HTMLAnchorElement>('a[href^="https://"]') ?? []
    );

    expect(metadata.title).toBe(
      'Rocket Launcher vs Minigun: Best Tank Build in YAZS 1.0'
    );
    expect(
      article?.querySelector('h1')?.textContent
    ).toBe('Rocket Launcher vs Minigun: Best Tank Build in YAZS 1.0');
    expect(article?.querySelector('table')).not.toBeNull();
    expect(article?.textContent).toContain('Which Is Better?');
    expect(
      citations.every(({hostname}) =>
        ['awesomegamesstudio.com', 'yazs.awesomegamesstudio.com'].includes(hostname)
      )
    ).toBe(true);
    expect(article?.textContent).not.toMatch(/reddit|wiki\.gg|steamcommunity/iu);
    expect(article?.textContent?.match(/unconfirmed/giu) ?? []).toHaveLength(1);
  });
});
