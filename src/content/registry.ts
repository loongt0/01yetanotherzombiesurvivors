import type {ComponentType} from 'react';
import type {Locale} from '@/i18n/routing';
import {frontmatterSchema, type ContentFrontmatter} from './schema';

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

function createArticle(frontmatter: unknown, Content: ComponentType): ArticleRecord {
  return {frontmatter: frontmatterSchema.parse(frontmatter), Content};
}

function createGuideCard(frontmatter: unknown, Content: ComponentType): GuideCardRecord {
  const parsedFrontmatter = frontmatterSchema.parse(frontmatter);

  return {
    ...parsedFrontmatter,
    href: `/guides/${parsedFrontmatter.slug}/`,
    Content
  };
}

const classesByLocale: Record<Locale, ArticleRecord> = {
  en: createArticle(enClassesFrontmatter, enClasses),
  de: createArticle(deClassesFrontmatter, deClasses),
  es: createArticle(esClassesFrontmatter, esClasses),
  fr: createArticle(frClassesFrontmatter, frClasses)
};

const guideCardsByLocale: Partial<Record<Locale, GuideCardRecord[]>> = {
  en: [
    createGuideCard(enBestClassFrontmatter, enBestClass),
    createGuideCard(enLevelingGuideFrontmatter, enLevelingGuide),
    createGuideCard(enCraftingGuideFrontmatter, enCraftingGuide),
    createGuideCard(enMountGuideFrontmatter, enMountGuide),
    createGuideCard(enVsWartalesFrontmatter, enVsWartales),
    createGuideCard(enWorthItFrontmatter, enWorthIt),
    createGuideCard(enSoloVsCoopFrontmatter, enSoloVsCoop),
    createGuideCard(enSkyoverIslandFrontmatter, enSkyoverIsland),
    createGuideCard(enEternalAutumnFrontmatter, enEternalAutumn),
    createGuideCard(enRoadmap2026Frontmatter, enRoadmap2026),
    createGuideCard(enLoreFrontmatter, enLore),
    createGuideCard(enBestMountFrontmatter, enBestMount),
    createGuideCard(enVsDiablo4Frontmatter, enVsDiablo4),
    createGuideCard(enVsLostArkFrontmatter, enVsLostArk)
  ],
  de: [
    createGuideCard(deBestClassFrontmatter, deBestClass),
    createGuideCard(deLevelingGuideFrontmatter, deLevelingGuide),
    createGuideCard(deCraftingGuideFrontmatter, deCraftingGuide),
    createGuideCard(deMountGuideFrontmatter, deMountGuide),
    createGuideCard(deVsWartalesFrontmatter, deVsWartales),
    createGuideCard(deWorthItFrontmatter, deWorthIt),
    createGuideCard(deSoloVsCoopFrontmatter, deSoloVsCoop),
    createGuideCard(deSkyoverIslandFrontmatter, deSkyoverIsland),
    createGuideCard(deEternalAutumnFrontmatter, deEternalAutumn),
    createGuideCard(deRoadmap2026Frontmatter, deRoadmap2026),
    createGuideCard(deLoreFrontmatter, deLore),
    createGuideCard(deBestMountFrontmatter, deBestMount),
    createGuideCard(deVsDiablo4Frontmatter, deVsDiablo4),
    createGuideCard(deVsLostArkFrontmatter, deVsLostArk)
  ],
  es: [
    createGuideCard(esBestClassFrontmatter, esBestClass),
    createGuideCard(esLevelingGuideFrontmatter, esLevelingGuide),
    createGuideCard(esCraftingGuideFrontmatter, esCraftingGuide),
    createGuideCard(esMountGuideFrontmatter, esMountGuide),
    createGuideCard(esVsWartalesFrontmatter, esVsWartales),
    createGuideCard(esWorthItFrontmatter, esWorthIt),
    createGuideCard(esSoloVsCoopFrontmatter, esSoloVsCoop),
    createGuideCard(esSkyoverIslandFrontmatter, esSkyoverIsland),
    createGuideCard(esEternalAutumnFrontmatter, esEternalAutumn),
    createGuideCard(esRoadmap2026Frontmatter, esRoadmap2026),
    createGuideCard(esLoreFrontmatter, esLore),
    createGuideCard(esBestMountFrontmatter, esBestMount),
    createGuideCard(esVsDiablo4Frontmatter, esVsDiablo4),
    createGuideCard(esVsLostArkFrontmatter, esVsLostArk)
  ],
  fr: [
    createGuideCard(frBestClassFrontmatter, frBestClass),
    createGuideCard(frLevelingGuideFrontmatter, frLevelingGuide),
    createGuideCard(frCraftingGuideFrontmatter, frCraftingGuide),
    createGuideCard(frMountGuideFrontmatter, frMountGuide),
    createGuideCard(frVsWartalesFrontmatter, frVsWartales),
    createGuideCard(frWorthItFrontmatter, frWorthIt),
    createGuideCard(frSoloVsCoopFrontmatter, frSoloVsCoop),
    createGuideCard(frSkyoverIslandFrontmatter, frSkyoverIsland),
    createGuideCard(frEternalAutumnFrontmatter, frEternalAutumn),
    createGuideCard(frRoadmap2026Frontmatter, frRoadmap2026),
    createGuideCard(frLoreFrontmatter, frLore),
    createGuideCard(frBestMountFrontmatter, frBestMount),
    createGuideCard(frVsDiablo4Frontmatter, frVsDiablo4),
    createGuideCard(frVsLostArkFrontmatter, frVsLostArk)
  ]
};

export function getGuideCards(locale: Locale): GuideCardRecord[] {
  return [...(guideCardsByLocale[locale] ?? guideCardsByLocale.en ?? [])].sort((a, b) =>
    b.updated.localeCompare(a.updated)
  );
}

export function getClassesArticle(locale: Locale): {
  frontmatter: ContentFrontmatter;
  Content: ComponentType;
} {
  return classesByLocale[locale];
}
