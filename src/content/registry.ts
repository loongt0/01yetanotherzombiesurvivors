import type {ComponentType} from 'react';
import type {Locale} from '@/i18n/routing';
import {
  parseContentFrontmatter,
  type ContentFrontmatter
} from './schema';

import enClasses, {frontmatter as enClassesFrontmatter} from './en/classes.mdx';
import enBestClass, {frontmatter as enBestClassFrontmatter} from './en/guides/farever-best-class.mdx';
import enLevelingGuide, {frontmatter as enLevelingGuideFrontmatter} from './en/guides/farever-leveling-guide.mdx';
import enCraftingGuide, {frontmatter as enCraftingGuideFrontmatter} from './en/guides/farever-crafting-guide.mdx';
import enMountGuide, {frontmatter as enMountGuideFrontmatter} from './en/guides/farever-mount-guide.mdx';
import enVsWartales, {frontmatter as enVsWartalesFrontmatter} from './en/guides/farever-vs-wartales.mdx';
import enWorthIt, {frontmatter as enWorthItFrontmatter} from './en/guides/is-farever-worth-it.mdx';
import enSoloVsCoop, {frontmatter as enSoloVsCoopFrontmatter} from './en/guides/farever-solo-vs-coop.mdx';
import enSkyoverIsland, {frontmatter as enSkyoverIslandFrontmatter} from './en/guides/farever-skyover-island.mdx';
import enEternalAutumn, {frontmatter as enEternalAutumnFrontmatter} from './en/guides/farever-valley-of-the-eternal-autumn.mdx';
import enRoadmap2026, {frontmatter as enRoadmap2026Frontmatter} from './en/guides/farever-roadmap-2026.mdx';
import enLore, {frontmatter as enLoreFrontmatter} from './en/guides/farever-lore.mdx';
import enBestMount, {frontmatter as enBestMountFrontmatter} from './en/guides/farever-best-mount.mdx';
import enVsDiablo4, {frontmatter as enVsDiablo4Frontmatter} from './en/guides/farever-vs-diablo-4.mdx';
import enVsLostArk, {frontmatter as enVsLostArkFrontmatter} from './en/guides/farever-vs-lost-ark.mdx';
import deClasses, {frontmatter as deClassesFrontmatter} from './de/classes.mdx';
import deBestClass, {frontmatter as deBestClassFrontmatter} from './de/guides/farever-best-class.mdx';
import deLevelingGuide, {frontmatter as deLevelingGuideFrontmatter} from './de/guides/farever-leveling-guide.mdx';
import deCraftingGuide, {frontmatter as deCraftingGuideFrontmatter} from './de/guides/farever-crafting-guide.mdx';
import deMountGuide, {frontmatter as deMountGuideFrontmatter} from './de/guides/farever-mount-guide.mdx';
import deVsWartales, {frontmatter as deVsWartalesFrontmatter} from './de/guides/farever-vs-wartales.mdx';
import deWorthIt, {frontmatter as deWorthItFrontmatter} from './de/guides/is-farever-worth-it.mdx';
import deSoloVsCoop, {frontmatter as deSoloVsCoopFrontmatter} from './de/guides/farever-solo-vs-coop.mdx';
import deSkyoverIsland, {frontmatter as deSkyoverIslandFrontmatter} from './de/guides/farever-skyover-island.mdx';
import deEternalAutumn, {frontmatter as deEternalAutumnFrontmatter} from './de/guides/farever-valley-of-the-eternal-autumn.mdx';
import deRoadmap2026, {frontmatter as deRoadmap2026Frontmatter} from './de/guides/farever-roadmap-2026.mdx';
import deLore, {frontmatter as deLoreFrontmatter} from './de/guides/farever-lore.mdx';
import deBestMount, {frontmatter as deBestMountFrontmatter} from './de/guides/farever-best-mount.mdx';
import deVsDiablo4, {frontmatter as deVsDiablo4Frontmatter} from './de/guides/farever-vs-diablo-4.mdx';
import deVsLostArk, {frontmatter as deVsLostArkFrontmatter} from './de/guides/farever-vs-lost-ark.mdx';
import esClasses, {frontmatter as esClassesFrontmatter} from './es/classes.mdx';
import esBestClass, {frontmatter as esBestClassFrontmatter} from './es/guides/farever-best-class.mdx';
import esLevelingGuide, {frontmatter as esLevelingGuideFrontmatter} from './es/guides/farever-leveling-guide.mdx';
import esCraftingGuide, {frontmatter as esCraftingGuideFrontmatter} from './es/guides/farever-crafting-guide.mdx';
import esMountGuide, {frontmatter as esMountGuideFrontmatter} from './es/guides/farever-mount-guide.mdx';
import esVsWartales, {frontmatter as esVsWartalesFrontmatter} from './es/guides/farever-vs-wartales.mdx';
import esWorthIt, {frontmatter as esWorthItFrontmatter} from './es/guides/is-farever-worth-it.mdx';
import esSoloVsCoop, {frontmatter as esSoloVsCoopFrontmatter} from './es/guides/farever-solo-vs-coop.mdx';
import esSkyoverIsland, {frontmatter as esSkyoverIslandFrontmatter} from './es/guides/farever-skyover-island.mdx';
import esEternalAutumn, {frontmatter as esEternalAutumnFrontmatter} from './es/guides/farever-valley-of-the-eternal-autumn.mdx';
import esRoadmap2026, {frontmatter as esRoadmap2026Frontmatter} from './es/guides/farever-roadmap-2026.mdx';
import esLore, {frontmatter as esLoreFrontmatter} from './es/guides/farever-lore.mdx';
import esBestMount, {frontmatter as esBestMountFrontmatter} from './es/guides/farever-best-mount.mdx';
import esVsDiablo4, {frontmatter as esVsDiablo4Frontmatter} from './es/guides/farever-vs-diablo-4.mdx';
import esVsLostArk, {frontmatter as esVsLostArkFrontmatter} from './es/guides/farever-vs-lost-ark.mdx';
import frClasses, {frontmatter as frClassesFrontmatter} from './fr/classes.mdx';
import frBestClass, {frontmatter as frBestClassFrontmatter} from './fr/guides/farever-best-class.mdx';
import frLevelingGuide, {frontmatter as frLevelingGuideFrontmatter} from './fr/guides/farever-leveling-guide.mdx';
import frCraftingGuide, {frontmatter as frCraftingGuideFrontmatter} from './fr/guides/farever-crafting-guide.mdx';
import frMountGuide, {frontmatter as frMountGuideFrontmatter} from './fr/guides/farever-mount-guide.mdx';
import frVsWartales, {frontmatter as frVsWartalesFrontmatter} from './fr/guides/farever-vs-wartales.mdx';
import frWorthIt, {frontmatter as frWorthItFrontmatter} from './fr/guides/is-farever-worth-it.mdx';
import frSoloVsCoop, {frontmatter as frSoloVsCoopFrontmatter} from './fr/guides/farever-solo-vs-coop.mdx';
import frSkyoverIsland, {frontmatter as frSkyoverIslandFrontmatter} from './fr/guides/farever-skyover-island.mdx';
import frEternalAutumn, {frontmatter as frEternalAutumnFrontmatter} from './fr/guides/farever-valley-of-the-eternal-autumn.mdx';
import frRoadmap2026, {frontmatter as frRoadmap2026Frontmatter} from './fr/guides/farever-roadmap-2026.mdx';
import frLore, {frontmatter as frLoreFrontmatter} from './fr/guides/farever-lore.mdx';
import frBestMount, {frontmatter as frBestMountFrontmatter} from './fr/guides/farever-best-mount.mdx';
import frVsDiablo4, {frontmatter as frVsDiablo4Frontmatter} from './fr/guides/farever-vs-diablo-4.mdx';
import frVsLostArk, {frontmatter as frVsLostArkFrontmatter} from './fr/guides/farever-vs-lost-ark.mdx';

export type GuideCardRecord = ContentFrontmatter & {
  href: string;
  Content: ComponentType;
};

type ArticleRecord = {
  frontmatter: ContentFrontmatter;
  Content: ComponentType;
};

export type GuideDocumentRegistry = Record<
  'en',
  Record<string, GuideCardRecord>
> &
  Partial<
    Record<Exclude<Locale, 'en'>, Partial<Record<string, GuideCardRecord>>>
  >;

const guideSourceSlugs = [
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

type RawGuideModule = readonly [unknown, ComponentType];

function createArticle(
  frontmatter: unknown,
  Content: ComponentType,
  sourceFilename: string
): ArticleRecord {
  return {
    frontmatter: parseContentFrontmatter(frontmatter, sourceFilename),
    Content
  };
}

function createGuideCard(
  frontmatter: unknown,
  Content: ComponentType,
  sourceFilename: string
): GuideCardRecord {
  const parsedFrontmatter = parseContentFrontmatter(frontmatter, sourceFilename);

  return {
    ...parsedFrontmatter,
    href: `/guides/${parsedFrontmatter.slug}/`,
    Content
  };
}

function createGuideCards(
  locale: Locale,
  modules: readonly RawGuideModule[]
): GuideCardRecord[] {
  return modules.map(([frontmatter, Content], index) =>
    createGuideCard(
      frontmatter,
      Content,
      `src/content/${locale}/guides/${guideSourceSlugs[index]}.mdx`
    )
  );
}

const classesByLocale: Record<Locale, ArticleRecord> = {
  en: createArticle(enClassesFrontmatter, enClasses, 'src/content/en/classes.mdx'),
  de: createArticle(deClassesFrontmatter, deClasses, 'src/content/de/classes.mdx'),
  es: createArticle(esClassesFrontmatter, esClasses, 'src/content/es/classes.mdx'),
  fr: createArticle(frClassesFrontmatter, frClasses, 'src/content/fr/classes.mdx')
};

const guideCardListsByLocale: Record<Locale, GuideCardRecord[]> = {
  en: createGuideCards('en', [
    [enBestClassFrontmatter, enBestClass],
    [enLevelingGuideFrontmatter, enLevelingGuide],
    [enCraftingGuideFrontmatter, enCraftingGuide],
    [enMountGuideFrontmatter, enMountGuide],
    [enVsWartalesFrontmatter, enVsWartales],
    [enWorthItFrontmatter, enWorthIt],
    [enSoloVsCoopFrontmatter, enSoloVsCoop],
    [enSkyoverIslandFrontmatter, enSkyoverIsland],
    [enEternalAutumnFrontmatter, enEternalAutumn],
    [enRoadmap2026Frontmatter, enRoadmap2026],
    [enLoreFrontmatter, enLore],
    [enBestMountFrontmatter, enBestMount],
    [enVsDiablo4Frontmatter, enVsDiablo4],
    [enVsLostArkFrontmatter, enVsLostArk]
  ]),
  de: createGuideCards('de', [
    [deBestClassFrontmatter, deBestClass],
    [deLevelingGuideFrontmatter, deLevelingGuide],
    [deCraftingGuideFrontmatter, deCraftingGuide],
    [deMountGuideFrontmatter, deMountGuide],
    [deVsWartalesFrontmatter, deVsWartales],
    [deWorthItFrontmatter, deWorthIt],
    [deSoloVsCoopFrontmatter, deSoloVsCoop],
    [deSkyoverIslandFrontmatter, deSkyoverIsland],
    [deEternalAutumnFrontmatter, deEternalAutumn],
    [deRoadmap2026Frontmatter, deRoadmap2026],
    [deLoreFrontmatter, deLore],
    [deBestMountFrontmatter, deBestMount],
    [deVsDiablo4Frontmatter, deVsDiablo4],
    [deVsLostArkFrontmatter, deVsLostArk]
  ]),
  es: createGuideCards('es', [
    [esBestClassFrontmatter, esBestClass],
    [esLevelingGuideFrontmatter, esLevelingGuide],
    [esCraftingGuideFrontmatter, esCraftingGuide],
    [esMountGuideFrontmatter, esMountGuide],
    [esVsWartalesFrontmatter, esVsWartales],
    [esWorthItFrontmatter, esWorthIt],
    [esSoloVsCoopFrontmatter, esSoloVsCoop],
    [esSkyoverIslandFrontmatter, esSkyoverIsland],
    [esEternalAutumnFrontmatter, esEternalAutumn],
    [esRoadmap2026Frontmatter, esRoadmap2026],
    [esLoreFrontmatter, esLore],
    [esBestMountFrontmatter, esBestMount],
    [esVsDiablo4Frontmatter, esVsDiablo4],
    [esVsLostArkFrontmatter, esVsLostArk]
  ]),
  fr: createGuideCards('fr', [
    [frBestClassFrontmatter, frBestClass],
    [frLevelingGuideFrontmatter, frLevelingGuide],
    [frCraftingGuideFrontmatter, frCraftingGuide],
    [frMountGuideFrontmatter, frMountGuide],
    [frVsWartalesFrontmatter, frVsWartales],
    [frWorthItFrontmatter, frWorthIt],
    [frSoloVsCoopFrontmatter, frSoloVsCoop],
    [frSkyoverIslandFrontmatter, frSkyoverIsland],
    [frEternalAutumnFrontmatter, frEternalAutumn],
    [frRoadmap2026Frontmatter, frRoadmap2026],
    [frLoreFrontmatter, frLore],
    [frBestMountFrontmatter, frBestMount],
    [frVsDiablo4Frontmatter, frVsDiablo4],
    [frVsLostArkFrontmatter, frVsLostArk]
  ])
};

function indexGuideCards(
  cards: GuideCardRecord[]
): Record<string, GuideCardRecord> {
  return Object.fromEntries(cards.map((card) => [card.slug, card]));
}

const guideDocumentsByLocale: GuideDocumentRegistry = {
  en: indexGuideCards(guideCardListsByLocale.en),
  de: indexGuideCards(guideCardListsByLocale.de),
  es: indexGuideCards(guideCardListsByLocale.es),
  fr: indexGuideCards(guideCardListsByLocale.fr)
};

export function resolveGuideCards(
  locale: Locale,
  registry: GuideDocumentRegistry
): GuideCardRecord[] {
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

export function getClassesArticle(locale: Locale): {
  frontmatter: ContentFrontmatter;
  Content: ComponentType;
} {
  return classesByLocale[locale];
}
