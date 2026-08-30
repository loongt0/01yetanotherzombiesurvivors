import deMessages from '@/messages/de.json';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import ruMessages from '@/messages/ru.json';
import type {Locale} from '@/i18n/routing';

export const GAME_NAME = 'Yet Another Zombie Survivors';
export const SITE_NAME = `${GAME_NAME} Wiki`;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.yetanotherzombiesurvivors.world'
).replace(/\/$/, '');

export const OFFICIAL_WEBSITE_URL = 'https://yazs.awesomegamesstudio.com/';
export const STEAM_URL =
  'https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/';
export const DISCORD_URL = 'https://discord.com/invite/m4JfXuS';
export const YOUTUBE_URL = 'https://youtube.com/user/AwesomeGamesStudio';
export const STEAM_COMMUNITY_URL = 'https://steamcommunity.com/app/2163330';
export const OFFICIAL_TRAILER_URL = 'https://www.youtube.com/watch?v=hwp9tDmVjiU';

export const SITE_KEYWORDS = [
  GAME_NAME,
  'YAZS',
  'Steam',
  'guide',
  'tier list',
  'builds',
  'characters',
  'items'
] as const;

export const primaryNavigation = [
  {key: 'characters', href: '/characters/'},
  {key: 'items', href: '/items/'},
  {key: 'weapons', href: '/weapons/'},
  {key: 'builds', href: '/builds/'},
  {key: 'tools', href: '/tools/'},
  {key: 'guides', href: '/guides/'}
] as const;

export const utilityNavigation = [
  {key: 'tierList', href: '/guides/tier-list/'},
  {key: 'bestTeam', href: '/guides/best-team/'},
  {key: 'synergies', href: '/guides/synergies/'},
  {key: 'achievements', href: '/guides/achievements/'},
  {key: 'ghost', href: '/characters/ghost/'},
  {key: 'huntress', href: '/characters/huntress/'},
  {key: 'saveProblem', href: '/guides/save-problem/'},
  {key: 'mods', href: '/tools/mods/'}
] as const;

export const footerGroups = [
  {
    key: 'guides',
    links: [
      {key: 'beginnerGuide', href: '/guides/'},
      {key: 'tierList', href: '/guides/tier-list/'},
      {key: 'bestTeam', href: '/guides/best-team/'},
      {key: 'synergies', href: '/guides/synergies/'},
      {key: 'achievements', href: '/guides/achievements/'}
    ]
  },
  {
    key: 'survivors',
    links: [
      {key: 'characters', href: '/characters/'},
      {key: 'ghost', href: '/characters/ghost/'},
      {key: 'huntress', href: '/characters/huntress/'},
      {key: 'items', href: '/items/'},
      {key: 'weapons', href: '/weapons/upgrades/'}
    ]
  },
  {
    key: 'buildsTools',
    links: [
      {key: 'generalBuild', href: '/builds/general-points-build-1-0/'},
      {key: 'weaponStats', href: '/weapons/attack-speed-vs-cooldown/'},
      {key: 'saveProblem', href: '/guides/save-problem/'},
      {key: 'trainer', href: '/tools/trainer/'},
      {key: 'cheatEngine', href: '/tools/cheat-engine/'},
      {key: 'mods', href: '/tools/mods/'}
    ]
  },
  {
    key: 'moreGuides',
    links: [
      {key: 'sanji', href: '/guides/sanji-the-rabbit/'},
      {key: 'weaponUpgrades', href: '/weapons/upgrades/'},
      {key: 'rocketMinigun', href: '/weapons/rocket-launcher-and-minigun/'},
      {key: 'allGuides', href: '/guides/'},
      {key: 'privacy', href: '/privacy/'},
      {key: 'terms', href: '/terms/'}
    ]
  }
] as const;

export const localeOptions = [
  {locale: 'en', label: 'English', flag: '🇬🇧'},
  {locale: 'ru', label: 'Русский', flag: '🇷🇺'},
  {locale: 'es', label: 'Español', flag: '🇪🇸'},
  {locale: 'de', label: 'Deutsch', flag: '🇩🇪'}
] as const satisfies ReadonlyArray<{
  locale: Locale;
  label: string;
  flag: string;
}>;

type SharedMessages = {
  Header: {
    subtitle: string;
    steam: string;
    primaryLabel: string;
    utilityLabel: string;
    navigation: Record<
      | (typeof primaryNavigation)[number]['key']
      | (typeof utilityNavigation)[number]['key'],
      string
    >;
  };
  Footer: {
    about: string;
    groups: Record<(typeof footerGroups)[number]['key'], string>;
    links: Record<(typeof footerGroups)[number]['links'][number]['key'], string>;
    languagesLabel: string;
    copyright: string;
    steam: string;
    officialWebsite: string;
    officialDiscord: string;
    officialYoutube: string;
  };
  NotFound: {
    eyebrow: string;
    title: string;
    description: string;
    home: string;
    beginnerGuide: string;
  };
};

const messagesByLocale: Record<Locale, SharedMessages> = {
  en: enMessages,
  ru: ruMessages,
  es: esMessages,
  de: deMessages
};

export function getSiteMessages(locale: Locale): SharedMessages {
  return messagesByLocale[locale];
}
