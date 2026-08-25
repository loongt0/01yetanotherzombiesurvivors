import type {ComponentType} from 'react';
import type {Locale} from '@/i18n/routing';
import {parseContentFrontmatter, type ContentFrontmatter} from './schema';

import enCharacters, {frontmatter as enCharactersFrontmatter} from './en/characters.mdx';
import ruCharacters, {frontmatter as ruCharactersFrontmatter} from './ru/characters.mdx';
import esCharacters, {frontmatter as esCharactersFrontmatter} from './es/characters.mdx';
import deCharacters, {frontmatter as deCharactersFrontmatter} from './de/characters.mdx';
import beginnerGuide, {frontmatter as beginnerGuideFrontmatter} from './en/guides/guide.mdx';
import guide0, {frontmatter as guide0Frontmatter} from './en/guides/tier-list.mdx';
import guide1, {frontmatter as guide1Frontmatter} from './en/guides/best-team.mdx';
import guide2, {frontmatter as guide2Frontmatter} from './en/guides/synergies.mdx';
import guide3, {frontmatter as guide3Frontmatter} from './en/guides/achievements.mdx';
import guide4, {frontmatter as guide4Frontmatter} from './en/guides/save-problem.mdx';
import guide6, {frontmatter as guide6Frontmatter} from './en/guides/ghost.mdx';
import guide7, {frontmatter as guide7Frontmatter} from './en/guides/huntress.mdx';
import guide8, {frontmatter as guide8Frontmatter} from './en/guides/sanji-the-rabbit.mdx';
import guide9, {frontmatter as guide9Frontmatter} from './en/guides/items.mdx';
import guide10, {frontmatter as guide10Frontmatter} from './en/guides/general-points-build-1-0.mdx';
import guide11, {frontmatter as guide11Frontmatter} from './en/guides/weapon-upgrades.mdx';
import guide12, {frontmatter as guide12Frontmatter} from './en/guides/attack-speed-vs-cooldown.mdx';
import guide13, {frontmatter as guide13Frontmatter} from './en/guides/rocket-launcher-and-minigun.mdx';
import guide14, {frontmatter as guide14Frontmatter} from './en/guides/trainer.mdx';
import guide15, {frontmatter as guide15Frontmatter} from './en/guides/cheat-engine.mdx';
import guide16, {frontmatter as guide16Frontmatter} from './en/guides/mods.mdx';
import guide17, {frontmatter as guide17Frontmatter} from './en/guides/hidden-characters.mdx';
import guide18, {frontmatter as guide18Frontmatter} from './en/guides/huntress-upgrades.mdx';

export type GuideCardRecord = ContentFrontmatter & {
  href: string;
  Content: ComponentType;
};

type ArticleRecord = {
  frontmatter: ContentFrontmatter;
  Content: ComponentType;
};

export type GuideDocumentRegistry = Record<'en', Record<string, GuideCardRecord>> &
  Partial<Record<Exclude<Locale, 'en'>, Partial<Record<string, GuideCardRecord>>>>;

function createArticle(frontmatter: unknown, Content: ComponentType, source: string): ArticleRecord {
  return {frontmatter: parseContentFrontmatter(frontmatter, source), Content};
}

const charactersByLocale: Record<Locale, ArticleRecord> = {
  en: createArticle(enCharactersFrontmatter, enCharacters, 'src/content/en/characters.mdx'),
  ru: createArticle(ruCharactersFrontmatter, ruCharacters, 'src/content/ru/characters.mdx'),
  es: createArticle(esCharactersFrontmatter, esCharacters, 'src/content/es/characters.mdx'),
  de: createArticle(deCharactersFrontmatter, deCharacters, 'src/content/de/characters.mdx')
};

const beginnerGuideArticle = createArticle(
  beginnerGuideFrontmatter,
  beginnerGuide,
  'src/content/en/guides/guide.mdx'
);

const rawGuides: Array<[unknown, ComponentType, string, string]> = [
  [guide0Frontmatter, guide0, '/guides/tier-list/', 'tier-list'],
  [guide1Frontmatter, guide1, '/guides/best-team/', 'best-team'],
  [guide2Frontmatter, guide2, '/guides/synergies/', 'synergies'],
  [guide3Frontmatter, guide3, '/guides/achievements/', 'achievements'],
  [guide4Frontmatter, guide4, '/guides/save-problem/', 'save-problem'],
  [enCharactersFrontmatter, enCharacters, '/characters/', 'characters'],
  [guide17Frontmatter, guide17, '/characters/hidden-characters/', 'hidden-characters'],
  [guide6Frontmatter, guide6, '/characters/ghost/', 'ghost'],
  [guide7Frontmatter, guide7, '/characters/huntress/', 'huntress'],
  [guide8Frontmatter, guide8, '/guides/sanji-the-rabbit/', 'sanji-the-rabbit'],
  [guide9Frontmatter, guide9, '/items/', 'items'],
  [guide10Frontmatter, guide10, '/builds/general-points-build-1-0/', 'general-points-build-1-0'],
  [guide11Frontmatter, guide11, '/weapons/upgrades/', 'weapon-upgrades'],
  [guide18Frontmatter, guide18, '/characters/huntress/upgrades/', 'huntress-upgrades'],
  [guide12Frontmatter, guide12, '/weapons/attack-speed-vs-cooldown/', 'attack-speed-vs-cooldown'],
  [guide13Frontmatter, guide13, '/weapons/rocket-launcher-and-minigun/', 'rocket-launcher-and-minigun'],
  [guide14Frontmatter, guide14, '/tools/trainer/', 'trainer'],
  [guide15Frontmatter, guide15, '/tools/cheat-engine/', 'cheat-engine'],
  [guide16Frontmatter, guide16, '/tools/mods/', 'mods'],
];

const englishGuides = Object.fromEntries(
  rawGuides.map(([frontmatter, Content, href, slug]) => {
    const parsed = parseContentFrontmatter(
      frontmatter,
      `src/content/en/guides/${slug}.mdx`
    );
    return [slug, {...parsed, href, Content} satisfies GuideCardRecord];
  })
);

const guideDocumentsByLocale: GuideDocumentRegistry = {en: englishGuides};

export function resolveGuideCards(locale: Locale, registry: GuideDocumentRegistry): GuideCardRecord[] {
  const localizedDocuments: Partial<Record<string, GuideCardRecord>> =
    locale === 'en' ? registry.en : (registry[locale] ?? {});

  return Object.keys(registry.en)
    .map((slug) => localizedDocuments[slug] ?? registry.en[slug])
    .filter((card): card is GuideCardRecord => card !== undefined)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getGuideCards(locale: Locale): GuideCardRecord[] {
  return resolveGuideCards(locale, guideDocumentsByLocale);
}

export function getGuideByHref(
  locale: Locale,
  href: string
): GuideCardRecord | undefined {
  return getGuideCards(locale).find((card) => card.href === href);
}

export function getCharactersArticle(locale: Locale): ArticleRecord {
  return charactersByLocale[locale];
}

export function getBeginnerGuideArticle(): ArticleRecord {
  return beginnerGuideArticle;
}

export const getClassesArticle = getCharactersArticle;
