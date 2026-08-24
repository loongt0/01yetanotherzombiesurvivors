import deMessages from '@/messages/de.json';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';
import type {Locale} from '@/i18n/routing';

export const STEAM_URL =
  'https://store.steampowered.com/app/3672400/Farever/';

export const primaryNavigation = [
  {key: 'classes', href: '/classes/'},
  {key: 'weapons', href: '/weapons/'},
  {key: 'bosses', href: '/bosses/'},
  {key: 'multiplayer', href: '/multiplayer/'},
  {key: 'walkthroughs', href: '/guide/'},
  {key: 'guides', href: '/guides/'}
] as const;

export const utilityNavigation = [
  {key: 'serverStatus', href: '/server-status/'},
  {key: 'steamCharts', href: '/steam-charts/'},
  {key: 'tierList', href: '/tier-list/'},
  {key: 'bestWeapons', href: '/best-weapons/'},
  {key: 'codes', href: '/codes/'},
  {key: 'steamDeck', href: '/steam-deck/'},
  {key: 'charts', href: '/charts/'},
  {key: 'release', href: '/release/'},
  {key: 'faq', href: '/faq/'}
] as const;

export const footerGroups = [
  {
    key: 'guides',
    links: [
      {key: 'beginnerGuide', href: '/beginner-guide/'},
      {key: 'classesJobs', href: '/classes/'},
      {key: 'weapons', href: '/weapons/'},
      {key: 'dungeonsBosses', href: '/dungeons/'},
      {key: 'tipsTricks', href: '/tips/'}
    ]
  },
  {
    key: 'resources',
    links: [
      {key: 'releaseDate', href: '/release-date/'},
      {key: 'roadmap', href: '/roadmap/'},
      {key: 'systemRequirements', href: '/system-requirements/'},
      {key: 'howToPlay', href: '/how-to-play/'},
      {key: 'faq', href: '/faq/'}
    ]
  },
  {
    key: 'liveTools',
    links: [
      {key: 'serverStatus', href: '/server-status/'},
      {key: 'steamCharts', href: '/steam-charts/'},
      {key: 'tierList', href: '/tier-list/'},
      {key: 'bestWeapons', href: '/best-weapons/'},
      {key: 'bossesGuide', href: '/bosses/'},
      {key: 'codes', href: '/codes/'},
      {key: 'steamDeck', href: '/steam-deck/'}
    ]
  },
  {
    key: 'longTailGuides',
    links: [
      {key: 'bestClassTierList', href: '/guides/farever-best-class/'},
      {key: 'levelingGuide', href: '/guides/farever-leveling-guide/'},
      {key: 'isItWorthIt', href: '/guides/is-farever-worth-it/'},
      {key: 'skyoverIsland', href: '/guides/farever-skyover-island/'},
      {key: 'loreStory', href: '/guides/farever-lore/'},
      {key: 'fareverReview', href: '/review/'},
      {key: 'bestBuilds', href: '/builds/'},
      {key: 'pvpStatus', href: '/pvp/'},
      {key: 'consoleRelease', href: '/console/'},
      {key: 'weaponTierList', href: '/weapon-tier-list/'},
      {key: 'companionTierList', href: '/companion-tier-list/'},
      {key: 'companions', href: '/companions/'},
      {key: 'hiddenCritter', href: '/hidden-critter/'},
      {key: 'quests', href: '/quests/'},
      {key: 'coopGuide', href: '/coop/'},
      {key: 'secretOcean', href: '/secret-of-the-ocean/'},
      {key: 'allWeapons', href: '/all-weapons/'},
      {key: 'playerCount', href: '/player-count/'},
      {key: 'maxLevel', href: '/max-level/'},
      {key: 'allGuides', href: '/guides/'}
    ]
  }
] as const;

export const localeOptions = [
  {locale: 'en', label: 'English', flag: '🇬🇧'},
  {locale: 'de', label: 'Deutsch', flag: '🇩🇪'},
  {locale: 'es', label: 'Español', flag: '🇪🇸'},
  {locale: 'fr', label: 'Français', flag: '🇫🇷'}
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
    navigation: Record<(typeof primaryNavigation)[number]['key'] | (typeof utilityNavigation)[number]['key'], string>;
  };
  Footer: {
    about: string;
    groups: Record<(typeof footerGroups)[number]['key'], string>;
    links: Record<(typeof footerGroups)[number]['links'][number]['key'], string>;
    languagesLabel: string;
    copyright: string;
    steam: string;
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
  de: deMessages,
  es: esMessages,
  fr: frMessages
};

export function getSiteMessages(locale: Locale): SharedMessages {
  return messagesByLocale[locale];
}
