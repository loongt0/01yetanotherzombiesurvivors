import type {ComponentType} from 'react';
import type {Locale} from '@/i18n/routing';
import {frontmatterSchema, type ContentFrontmatter} from './schema';

import enClasses, {frontmatter as enClassesFrontmatter} from './en/classes.mdx';
import enBestClass, {frontmatter as enBestClassFrontmatter} from './en/guides/farever-best-class.mdx';
import deClasses, {frontmatter as deClassesFrontmatter} from './de/classes.mdx';
import deBestClass, {frontmatter as deBestClassFrontmatter} from './de/guides/farever-best-class.mdx';
import esClasses, {frontmatter as esClassesFrontmatter} from './es/classes.mdx';
import esBestClass, {frontmatter as esBestClassFrontmatter} from './es/guides/farever-best-class.mdx';
import frClasses, {frontmatter as frClassesFrontmatter} from './fr/classes.mdx';
import frBestClass, {frontmatter as frBestClassFrontmatter} from './fr/guides/farever-best-class.mdx';

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
    href: `/guides/${parsedFrontmatter.slug}`,
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
  en: [createGuideCard(enBestClassFrontmatter, enBestClass)],
  de: [createGuideCard(deBestClassFrontmatter, deBestClass)],
  es: [createGuideCard(esBestClassFrontmatter, esBestClass)],
  fr: [createGuideCard(frBestClassFrontmatter, frBestClass)]
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
