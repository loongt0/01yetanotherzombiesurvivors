import type {Locale} from '@/i18n/routing';
import {STEAM_URL} from '@/lib/site-data';
import deMessages from '@/messages/de.json';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';

export type ActionData = {
  label: string;
  href: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type HeroData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryAction: ActionData;
  secondaryAction: ActionData;
  stats: Fact[];
  scrollLabel: string;
};

export type FeatureIcon =
  | 'book'
  | 'calendar'
  | 'chart'
  | 'code'
  | 'compass'
  | 'gamepad'
  | 'gem'
  | 'globe'
  | 'heart'
  | 'map'
  | 'mountain'
  | 'network'
  | 'radio'
  | 'scroll'
  | 'server'
  | 'shield'
  | 'sparkles'
  | 'swords'
  | 'trophy'
  | 'users'
  | 'wand'
  | 'wifi'
  | 'wrench'
  | 'zap';

export type FeatureCard = {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: FeatureIcon;
  badge?: string;
  meta?: string;
};

export type GuideCardData = {
  category: string;
  title: string;
  href: string;
  action: string;
};

export type NewsItem = {
  date: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CtaData = {
  eyebrow: string;
  title: string;
  primaryAction: ActionData;
  secondaryAction: ActionData;
};

export type HomeData = {
  hero: HeroData;
  facts: Fact[];
  classes: FeatureCard[];
  regions: FeatureCard[];
  journey: FeatureCard[];
  tools: FeatureCard[];
  guides: GuideCardData[];
  news: NewsItem[];
  faq: FaqItem[];
  finalCta: CtaData;
};

export type HomeSeo = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

export type HomeCopy = {
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    factsLabel: string;
  };
  classes: {eyebrow: string; title: string};
  regions: {eyebrow: string; title: string};
  journey: {eyebrow: string; title: string};
  tools: {eyebrow: string; title: string};
  guides: {eyebrow: string; title: string; all: string};
  news: {eyebrow: string; title: string};
  faq: {eyebrow: string; title: string; all: string};
};

const englishData: HomeData = {
  hero: {
    eyebrow: 'A Shiro Games Adventure · Steam Early Access',
    titleLead: 'Forge Your Legend',
    titleAccent: 'in Farever',
    description:
      'An online co-op action RPG set in the forgotten realm of Siagarta. Explore wild lands, conquer dungeons, master 4 classes, 6 jobs and over 100 weapons.',
    primaryAction: {label: 'Play on Steam', href: STEAM_URL},
    secondaryAction: {label: 'Beginner Guide', href: '/beginner-guide/'},
    stats: [
      {value: 'May 7, 2026', label: 'EA Launch'},
      {value: '$17.99', label: 'Steam Price'},
      {value: '72%', label: 'Mostly Positive'},
      {value: '~12 mo', label: 'EA Duration'}
    ],
    scrollLabel: 'Scroll'
  },
  facts: [
    {label: 'Developer', value: 'Shiro Games'},
    {label: 'Genre', value: 'Online Co-op Action RPG'},
    {label: 'Platform', value: 'PC (Steam)'},
    {label: 'Players', value: 'Solo or Online Co-op'},
    {label: 'Price', value: '$17.99 USD'},
    {label: 'Reviews', value: 'Mostly Positive (1,400+)'},
    {label: 'Engine', value: 'Heaps (Shiro in-house)'}
  ],
  classes: [
    {
      badge: 'Frontline · Tank-DPS',
      title: 'Warrior',
      description:
        'Plate-armoured bruiser with strong stagger and self-sustain. The most forgiving class to learn.',
      href: '/classes/',
      action: 'Explore',
      icon: 'shield'
    },
    {
      badge: 'Ranged · Kite DPS',
      title: 'Ranger',
      description:
        'Bows, traps and pets. Excellent solo class thanks to high mobility and burst at range.',
      href: '/classes/',
      action: 'Explore',
      icon: 'compass'
    },
    {
      badge: 'AoE · Burst Caster',
      title: 'Mage',
      description:
        'Elemental nuker. Squishy but melts grouped enemies; the highest damage ceiling in the game.',
      href: '/classes/',
      action: 'Explore',
      icon: 'wand'
    },
    {
      badge: 'Support · Hybrid',
      title: 'Mystic',
      description:
        'Buff/heal flex with battle-magic. Best in co-op groups but workable solo with the right weapon.',
      href: '/classes/',
      action: 'Explore',
      icon: 'sparkles'
    }
  ],
  regions: [
    {
      badge: 'Starter Region',
      meta: 'Lv 1–15',
      title: 'Skyover Island',
      description:
        'Floating archipelago of warring factions. Four primary dungeons culminating at the Cradle of the Sky.',
      href: '/dungeons/',
      action: 'Region Guide',
      icon: 'mountain'
    },
    {
      badge: 'End-Game · EA',
      meta: 'Lv 12+',
      title: 'Valley of the Eternal Autumn',
      description:
        'Permanent autumn forests filled with nature-and-decay enemies. Heavy poison, tighter boss windows.',
      href: '/dungeons/',
      action: 'Region Guide',
      icon: 'map'
    }
  ],
  journey: [
    {
      title: 'Release Date',
      description:
        "Early Access launch info, full release outlook and Shiro Games' year-long EA plan.",
      href: '/release-date/',
      action: 'Read More',
      icon: 'calendar'
    },
    {
      title: 'Beginner Guide',
      description:
        'Your first 5 hours: choosing a class, free mount, weapon mastery and town basics.',
      href: '/beginner-guide/',
      action: 'Read More',
      icon: 'compass'
    },
    {
      title: 'Classes & Jobs',
      description:
        'All 4 classes and 6 jobs — strengths, roles and recommended pairings.',
      href: '/classes/',
      action: 'Read More',
      icon: 'users'
    },
    {
      title: 'Weapons & Skills',
      description:
        'GW2-style weapon-skill system: how 100+ weapons unlock unique combat abilities.',
      href: '/weapons/',
      action: 'Read More',
      icon: 'swords'
    },
    {
      title: 'Dungeons & Bosses',
      description:
        'Skyover Island and the Valley of the Eternal Autumn — every dungeon, faction and boss.',
      href: '/dungeons/',
      action: 'Read More',
      icon: 'shield'
    },
    {
      title: 'Co-op How To',
      description:
        'Inviting friends, party scaling, crossplay status and dedicated server tips.',
      href: '/how-to-play/',
      action: 'Read More',
      icon: 'network'
    },
    {
      title: 'Tips & Tricks',
      description:
        'Level up fast, find the free mount, optimise crafting, dodge timing and more.',
      href: '/tips/',
      action: 'Read More',
      icon: 'zap'
    },
    {
      title: 'EA Roadmap',
      description:
        'New regions, classes, level cap, seasonal events and guilds — the full plan.',
      href: '/roadmap/',
      action: 'Read More',
      icon: 'map'
    },
    {
      title: 'FAQ',
      description:
        'Is Farever free? Crossplay? Solo-friendly? PvP? All your questions answered.',
      href: '/faq/',
      action: 'Read More',
      icon: 'book'
    }
  ],
  tools: [
    {
      badge: 'Live',
      title: 'Server Status',
      description:
        'Are Farever servers down? Live status, outage timeline and login fixes.',
      href: '/server-status/',
      action: 'Open',
      icon: 'server'
    },
    {
      badge: 'Data',
      title: 'Steam Charts',
      description:
        'Farever player count, 24h peak and 7-day trend — updated daily.',
      href: '/steam-charts/',
      action: 'Open',
      icon: 'chart'
    },
    {
      badge: 'Tier',
      title: 'Class Tier List',
      description:
        'S/A/B rankings for all 4 Farever classes — solo, duo and group scores.',
      href: '/tier-list/',
      action: 'Open',
      icon: 'trophy'
    },
    {
      badge: 'Tier',
      title: 'Best Weapons',
      description:
        'Top S/A/B Farever weapons by class with drop locations and upgrade paths.',
      href: '/best-weapons/',
      action: 'Open',
      icon: 'swords'
    },
    {
      badge: 'Combat',
      title: 'Bosses Guide',
      description:
        'Every Farever boss with phases, mechanics, party size and key drops.',
      href: '/bosses/',
      action: 'Open',
      icon: 'shield'
    },
    {
      badge: 'Codes',
      title: 'Codes',
      description:
        'Active Farever promo codes and how to redeem them (updated daily).',
      href: '/codes/',
      action: 'Open',
      icon: 'code'
    },
    {
      badge: 'Tech',
      title: 'Steam Deck',
      description:
        'Farever on Steam Deck — Verified status, FPS, battery life and best settings.',
      href: '/steam-deck/',
      action: 'Open',
      icon: 'gamepad'
    }
  ],
  guides: [
    {
      category: 'Builds',
      title: 'Best Class Tier List 2026',
      href: '/guides/farever-best-class/',
      action: 'Read'
    },
    {
      category: 'Leveling',
      title: 'Fastest Leveling Guide',
      href: '/guides/farever-leveling-guide/',
      action: 'Read'
    },
    {
      category: 'Review',
      title: 'Is Farever Worth It in 2026?',
      href: '/guides/is-farever-worth-it/',
      action: 'Read'
    },
    {
      category: 'Region',
      title: 'Skyover Island Complete Guide',
      href: '/guides/farever-skyover-island/',
      action: 'Read'
    },
    {
      category: 'Region',
      title: 'Valley of Eternal Autumn Guide',
      href: '/guides/farever-valley-of-the-eternal-autumn/',
      action: 'Read'
    },
    {
      category: 'Comparison',
      title: 'Farever vs Wartales',
      href: '/guides/farever-vs-wartales/',
      action: 'Read'
    }
  ],
  news: [
    {
      date: 'May 7, 2026',
      text: 'Farever launches into Steam Early Access with a 10% discount and a full year-long roadmap.'
    },
    {
      date: 'Apr 16, 2026',
      text: 'Shiro Games drops the official Early Access Release Date Trailer.'
    },
    {
      date: '2026 Roadmap',
      text: 'New biomes, raised level cap, additional skills and classes, seasonal events and guilds planned for EA.'
    }
  ],
  faq: [
    {
      question: 'What is Farever?',
      answer:
        'Farever is an online co-op action RPG by Shiro Games (Wartales, Northgard), set in the forgotten realm of Siagarta. It entered Steam Early Access on May 7, 2026.'
    },
    {
      question: 'Is Farever an MMO?',
      answer:
        'Farever is an MMO-lite — a co-op online action RPG where you explore, fight and craft in a shared open world. Party size is small (up to 4) rather than a true massively-multiplayer scale.'
    },
    {
      question: 'Is Farever free to play?',
      answer:
        'No. Farever is a paid Early Access title at $17.99 USD on Steam. There is no free-to-play tier and no demo.'
    },
    {
      question: 'Can I play Farever solo?',
      answer:
        'Yes. Every dungeon scales to party size and the game is fully completable solo, though duos are the most efficient.'
    },
    {
      question: 'Are Farever servers down right now?',
      answer:
        'Most of the time no — but during peak hours queues can appear. Check our live Farever server status page for the latest report.'
    },
    {
      question: 'When is the Farever full release?',
      answer:
        'Shiro Games has stated Farever will remain in Early Access for approximately one year, so the 1.0 release is expected around mid-2027.'
    },
    {
      question: 'Is the game "Farever" or "forever"?',
      answer:
        'Farever — one R, capital F. Google often autocorrects to "forever" but the game by Shiro Games is spelled Farever.'
    }
  ],
  finalCta: {
    eyebrow: 'Ready to begin?',
    title: 'Forge your legend today.',
    primaryAction: {label: 'Play on Steam', href: STEAM_URL},
    secondaryAction: {
      label: 'Start with Beginner Guide',
      href: '/beginner-guide/'
    }
  }
};

const englishCopy: HomeCopy = {
  about: {
    eyebrow: 'The Forgotten Realm',
    title: 'What is Farever?',
    paragraphs: [
      'Farever is an online co-op action RPG by Shiro Games — the studio behind Northgard, Wartales and Dune: Spice Wars. Set in the forgotten realm of Siagarta, it fuses Zelda-style exploration and platforming with MMO-flavoured combat, crafting and party progression.',
      'The Early Access build (launched May 7, 2026) ships with two regions, multiple dungeons, four classes, six jobs and over a hundred weapons. Roughly twelve months of additional content — new biomes, raised level cap, more classes, seasonal events and guilds — are planned for EA. Play solo or with friends online.'
    ],
    factsLabel: 'Quick Facts'
  },
  classes: {eyebrow: 'Choose Your Path', title: 'The Four Classes'},
  regions: {eyebrow: 'The World of Siagarta', title: 'Explore Two Regions'},
  journey: {eyebrow: "Adventurer's Codex", title: 'Start Your Journey'},
  tools: {eyebrow: 'Live Data & Rankings', title: 'Tools & Tier Lists'},
  guides: {eyebrow: 'Deep Dive', title: 'Featured Guides', all: 'View All Guides'},
  news: {eyebrow: 'Heralds of Siagarta', title: 'Latest News'},
  faq: {eyebrow: 'Quick Answers', title: 'Farever FAQ', all: 'See full FAQ'}
};

type FeatureTranslation = Partial<
  Pick<FeatureCard, 'action' | 'badge' | 'description' | 'meta' | 'title'>
>;

type GuideTranslation = Pick<GuideCardData, 'action' | 'category' | 'title'>;

type HomeTranslation = {
  hero: Omit<HeroData, 'primaryAction' | 'secondaryAction'> & {
    primaryLabel: string;
    secondaryLabel: string;
  };
  facts: Fact[];
  classes: FeatureTranslation[];
  regions: FeatureTranslation[];
  journey: FeatureTranslation[];
  tools: FeatureTranslation[];
  guides: GuideTranslation[];
  news: NewsItem[];
  faq: FaqItem[];
  finalCta: {
    eyebrow: string;
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

function translateFeatures(
  base: FeatureCard[],
  translations: FeatureTranslation[]
): FeatureCard[] {
  return base.map((card, index) => ({...card, ...translations[index]}));
}

function translateHome(translation: HomeTranslation): HomeData {
  const {primaryLabel, secondaryLabel, ...hero} = translation.hero;

  return {
    hero: {
      ...englishData.hero,
      ...hero,
      primaryAction: {
        ...englishData.hero.primaryAction,
        label: primaryLabel
      },
      secondaryAction: {
        ...englishData.hero.secondaryAction,
        label: secondaryLabel
      }
    },
    facts: translation.facts,
    classes: translateFeatures(englishData.classes, translation.classes),
    regions: translateFeatures(englishData.regions, translation.regions),
    journey: translateFeatures(englishData.journey, translation.journey),
    tools: translateFeatures(englishData.tools, translation.tools),
    guides: englishData.guides.map((guide, index) => ({
      ...guide,
      ...translation.guides[index]
    })),
    news: translation.news,
    faq: translation.faq,
    finalCta: {
      ...englishData.finalCta,
      eyebrow: translation.finalCta.eyebrow,
      title: translation.finalCta.title,
      primaryAction: {
        ...englishData.finalCta.primaryAction,
        label: translation.finalCta.primaryLabel
      },
      secondaryAction: {
        ...englishData.finalCta.secondaryAction,
        label: translation.finalCta.secondaryLabel
      }
    }
  };
}

const germanData = translateHome({
  hero: {
    eyebrow: 'Ein Abenteuer von Shiro Games · Steam Early Access',
    titleLead: 'Schmiede deine Legende',
    titleAccent: 'in Farever',
    description:
      'Ein Online-Koop-Action-RPG im vergessenen Reich Siagarta. Erkunde wilde Lande, bezwinge Dungeons und meistere 4 Klassen, 6 Berufe und über 100 Waffen.',
    primaryLabel: 'Auf Steam spielen',
    secondaryLabel: 'Einsteiger-Guide',
    stats: [
      {value: '7. Mai 2026', label: 'EA-Start'},
      {value: '17,99 $', label: 'Steam-Preis'},
      {value: '72 %', label: 'Größtenteils positiv'},
      {value: 'ca. 12 Mon.', label: 'EA-Dauer'}
    ],
    scrollLabel: 'Scrollen'
  },
  facts: [
    {label: 'Entwickler', value: 'Shiro Games'},
    {label: 'Genre', value: 'Online-Koop-Action-RPG'},
    {label: 'Plattform', value: 'PC (Steam)'},
    {label: 'Spieler', value: 'Solo oder Online-Koop'},
    {label: 'Preis', value: '17,99 USD'},
    {label: 'Rezensionen', value: 'Größtenteils positiv (1.400+)'},
    {label: 'Engine', value: 'Heaps (Shiro-intern)'}
  ],
  classes: [
    {
      badge: 'Frontlinie · Tank-DPS',
      title: 'Krieger',
      description:
        'Schwer gepanzerter Kämpfer mit starkem Taumelschaden und Selbstheilung. Die einsteigerfreundlichste Klasse.',
      action: 'Entdecken'
    },
    {
      badge: 'Fernkampf · Kite-DPS',
      title: 'Jäger',
      description:
        'Bögen, Fallen und Tiere. Dank hoher Mobilität und starkem Fernkampfschaden hervorragend für Solo-Spieler.',
      action: 'Entdecken'
    },
    {
      badge: 'Fläche · Burst-Zauberer',
      title: 'Magier',
      description:
        'Elementarer Fernkämpfer. Zerbrechlich, aber vernichtend gegen Gruppen und mit dem höchsten Schadenspotenzial.',
      action: 'Entdecken'
    },
    {
      badge: 'Support · Hybrid',
      title: 'Mystiker',
      description:
        'Flexibler Buff- und Heil-Support mit Kampfmagie. Im Koop am stärksten, mit der richtigen Waffe auch solo spielbar.',
      action: 'Entdecken'
    }
  ],
  regions: [
    {
      badge: 'Startregion',
      meta: 'Stufe 1–15',
      description:
        'Schwebender Archipel rivalisierender Fraktionen. Vier Hauptdungeons führen zur Wiege des Himmels.',
      action: 'Regions-Guide'
    },
    {
      badge: 'Endgame · EA',
      meta: 'Ab Stufe 12',
      title: 'Tal des ewigen Herbstes',
      description:
        'Ewige Herbstwälder voller Natur- und Verfallsgegner. Viel Gift und engere Zeitfenster bei Bossen.',
      action: 'Regions-Guide'
    }
  ],
  journey: [
    {title: 'Veröffentlichungsdatum', description: 'Infos zum Early-Access-Start, Ausblick auf Version 1.0 und Shiro Games’ einjähriger EA-Plan.', action: 'Mehr lesen'},
    {title: 'Einsteiger-Guide', description: 'Die ersten 5 Stunden: Klasse wählen, kostenloses Reittier, Waffenmeisterschaft und Stadtgrundlagen.', action: 'Mehr lesen'},
    {title: 'Klassen & Berufe', description: 'Alle 4 Klassen und 6 Berufe — Stärken, Rollen und empfohlene Kombinationen.', action: 'Mehr lesen'},
    {title: 'Waffen & Fähigkeiten', description: 'Das GW2-ähnliche Waffensystem: über 100 Waffen schalten einzigartige Kampffähigkeiten frei.', action: 'Mehr lesen'},
    {title: 'Dungeons & Bosse', description: 'Skyover Island und das Tal des ewigen Herbstes — alle Dungeons, Fraktionen und Bosse.', action: 'Mehr lesen'},
    {title: 'Koop-Anleitung', description: 'Freunde einladen, Gruppenskalierung, Crossplay-Status und Tipps für dedizierte Server.', action: 'Mehr lesen'},
    {title: 'Tipps & Tricks', description: 'Schnell leveln, das kostenlose Reittier finden, Handwerk optimieren und richtig ausweichen.', action: 'Mehr lesen'},
    {title: 'EA-Roadmap', description: 'Neue Regionen, Klassen, Levelgrenze, Saison-Events und Gilden — der vollständige Plan.', action: 'Mehr lesen'},
    {title: 'FAQ', description: 'Ist Farever kostenlos? Crossplay? Solo-tauglich? PvP? Hier stehen alle Antworten.', action: 'Mehr lesen'}
  ],
  tools: [
    {badge: 'Live', title: 'Serverstatus', description: 'Sind die Farever-Server offline? Live-Status, Störungsverlauf und Login-Lösungen.', action: 'Öffnen'},
    {badge: 'Daten', title: 'Steam-Charts', description: 'Farever-Spielerzahl, 24-Stunden-Spitze und 7-Tage-Trend — täglich aktualisiert.', action: 'Öffnen'},
    {badge: 'Rang', title: 'Klassen-Tier-Liste', description: 'S/A/B-Ranglisten für alle 4 Klassen — Solo-, Duo- und Gruppenwertung.', action: 'Öffnen'},
    {badge: 'Rang', title: 'Beste Waffen', description: 'Die besten S/A/B-Waffen je Klasse mit Fundorten und Upgrade-Pfaden.', action: 'Öffnen'},
    {badge: 'Kampf', title: 'Boss-Guide', description: 'Alle Farever-Bosse mit Phasen, Mechaniken, Gruppengröße und wichtigen Beutegegenständen.', action: 'Öffnen'},
    {badge: 'Codes', title: 'Codes', description: 'Aktive Farever-Promocodes und ihre Einlösung — täglich aktualisiert.', action: 'Öffnen'},
    {badge: 'Technik', title: 'Steam Deck', description: 'Farever auf Steam Deck — Verifizierungsstatus, FPS, Akkulaufzeit und beste Einstellungen.', action: 'Öffnen'}
  ],
  guides: [
    {category: 'Builds', title: 'Beste Klassen-Tier-Liste 2026', action: 'Lesen'},
    {category: 'Leveln', title: 'Schnellster Level-Guide', action: 'Lesen'},
    {category: 'Test', title: 'Lohnt sich Farever 2026?', action: 'Lesen'},
    {category: 'Region', title: 'Komplett-Guide für Skyover Island', action: 'Lesen'},
    {category: 'Region', title: 'Guide zum Tal des ewigen Herbstes', action: 'Lesen'},
    {category: 'Vergleich', title: 'Farever vs. Wartales', action: 'Lesen'}
  ],
  news: [
    {date: '7. Mai 2026', text: 'Farever startet mit 10 % Rabatt und einer vollständigen Jahres-Roadmap in den Steam Early Access.'},
    {date: '16. Apr. 2026', text: 'Shiro Games veröffentlicht den offiziellen Trailer zum Early-Access-Termin.'},
    {date: 'Roadmap 2026', text: 'Neue Biome, eine höhere Levelgrenze, zusätzliche Fähigkeiten und Klassen, Saison-Events und Gilden sind geplant.'}
  ],
  faq: [
    {question: 'Was ist Farever?', answer: 'Farever ist ein Online-Koop-Action-RPG von Shiro Games (Wartales, Northgard) im vergessenen Reich Siagarta. Der Steam Early Access begann am 7. Mai 2026.'},
    {question: 'Ist Farever ein MMO?', answer: 'Farever ist ein MMO-lite: ein kooperatives Online-Action-RPG mit gemeinsamer offener Welt. Gruppen sind mit bis zu vier Personen kleiner als in einem echten MMO.'},
    {question: 'Ist Farever kostenlos spielbar?', answer: 'Nein. Farever ist ein kostenpflichtiger Early-Access-Titel für 17,99 USD auf Steam. Es gibt weder Free-to-play noch eine Demo.'},
    {question: 'Kann ich Farever solo spielen?', answer: 'Ja. Jeder Dungeon skaliert mit der Gruppengröße und das Spiel ist vollständig solo abschließbar, auch wenn Duos am effizientesten sind.'},
    {question: 'Sind die Farever-Server gerade offline?', answer: 'Meistens nicht, zu Spitzenzeiten können aber Warteschlangen entstehen. Auf unserer Live-Statusseite steht der aktuelle Bericht.'},
    {question: 'Wann erscheint Farever vollständig?', answer: 'Shiro Games plant ungefähr ein Jahr Early Access. Version 1.0 wird daher etwa Mitte 2027 erwartet.'},
    {question: 'Heißt das Spiel „Farever“ oder „forever“?', answer: 'Farever — mit einem R und großem F. Google korrigiert den Namen oft zu „forever“, aber das Spiel von Shiro Games heißt Farever.'}
  ],
  finalCta: {
    eyebrow: 'Bereit für den Anfang?',
    title: 'Schmiede noch heute deine Legende.',
    primaryLabel: 'Auf Steam spielen',
    secondaryLabel: 'Mit dem Einsteiger-Guide starten'
  }
});

const spanishData = translateHome({
  hero: {
    eyebrow: 'Una aventura de Shiro Games · Acceso anticipado de Steam',
    titleLead: 'Forja tu leyenda',
    titleAccent: 'en Farever',
    description:
      'Un RPG de acción cooperativo en línea ambientado en el reino olvidado de Siagarta. Explora tierras salvajes, conquista mazmorras y domina 4 clases, 6 oficios y más de 100 armas.',
    primaryLabel: 'Jugar en Steam',
    secondaryLabel: 'Guía para principiantes',
    stats: [
      {value: '7 may 2026', label: 'Lanzamiento EA'},
      {value: '17,99 US$', label: 'Precio en Steam'},
      {value: '72 %', label: 'Mayormente positivas'},
      {value: '≈12 meses', label: 'Duración del EA'}
    ],
    scrollLabel: 'Desplázate'
  },
  facts: [
    {label: 'Desarrollador', value: 'Shiro Games'},
    {label: 'Género', value: 'RPG de acción cooperativo en línea'},
    {label: 'Plataforma', value: 'PC (Steam)'},
    {label: 'Jugadores', value: 'Solo o cooperativo en línea'},
    {label: 'Precio', value: '17,99 USD'},
    {label: 'Reseñas', value: 'Mayormente positivas (1.400+)'},
    {label: 'Motor', value: 'Heaps (interno de Shiro)'}
  ],
  classes: [
    {badge: 'Vanguardia · Tanque-DPS', title: 'Guerrero', description: 'Luchador con armadura pesada, gran capacidad de tambaleo y autosanación. La clase más accesible para aprender.', action: 'Explorar'},
    {badge: 'A distancia · DPS móvil', title: 'Explorador', description: 'Arcos, trampas y mascotas. Una clase excelente en solitario por su movilidad y daño explosivo a distancia.', action: 'Explorar'},
    {badge: 'Área · Mago explosivo', title: 'Mago', description: 'Especialista elemental. Frágil, pero derrite grupos de enemigos y tiene el mayor techo de daño.', action: 'Explorar'},
    {badge: 'Apoyo · Híbrido', title: 'Místico', description: 'Apoyo flexible con mejoras, curación y magia de batalla. Brilla en cooperativo y funciona solo con el arma adecuada.', action: 'Explorar'}
  ],
  regions: [
    {badge: 'Región inicial', meta: 'Nv. 1–15', description: 'Un archipiélago flotante de facciones enfrentadas. Cuatro mazmorras principales culminan en la Cuna del Cielo.', action: 'Guía de la región'},
    {badge: 'Final del juego · EA', meta: 'Nv. 12+', title: 'Valle del Otoño Eterno', description: 'Bosques de otoño permanente llenos de enemigos de naturaleza y decadencia. Mucho veneno y ventanas de jefe más exigentes.', action: 'Guía de la región'}
  ],
  journey: [
    {title: 'Fecha de lanzamiento', description: 'Datos del acceso anticipado, perspectivas de la versión completa y el plan anual de Shiro Games.', action: 'Leer más'},
    {title: 'Guía para principiantes', description: 'Tus primeras 5 horas: elegir clase, montura gratis, dominio de armas y fundamentos de la ciudad.', action: 'Leer más'},
    {title: 'Clases y oficios', description: 'Las 4 clases y los 6 oficios: fortalezas, funciones y combinaciones recomendadas.', action: 'Leer más'},
    {title: 'Armas y habilidades', description: 'El sistema de habilidades por arma al estilo GW2: más de 100 armas desbloquean técnicas únicas.', action: 'Leer más'},
    {title: 'Mazmorras y jefes', description: 'Skyover Island y el Valle del Otoño Eterno: todas las mazmorras, facciones y jefes.', action: 'Leer más'},
    {title: 'Cómo jugar en cooperativo', description: 'Invitar amigos, escalado de grupo, estado del juego cruzado y servidores dedicados.', action: 'Leer más'},
    {title: 'Consejos y trucos', description: 'Sube rápido, encuentra la montura gratis, optimiza la artesanía y perfecciona las esquivas.', action: 'Leer más'},
    {title: 'Hoja de ruta de EA', description: 'Nuevas regiones, clases, límite de nivel, eventos de temporada y gremios: el plan completo.', action: 'Leer más'},
    {title: 'Preguntas frecuentes', description: '¿Farever es gratis? ¿Tiene juego cruzado, modo solo o JcJ? Todas las respuestas.', action: 'Leer más'}
  ],
  tools: [
    {badge: 'En vivo', title: 'Estado del servidor', description: '¿Están caídos los servidores? Estado en vivo, cronología de incidencias y soluciones de acceso.', action: 'Abrir'},
    {badge: 'Datos', title: 'Gráficos de Steam', description: 'Jugadores de Farever, pico de 24 h y tendencia de 7 días; actualizado a diario.', action: 'Abrir'},
    {badge: 'Niveles', title: 'Lista de clases', description: 'Clasificaciones S/A/B para las 4 clases en solitario, dúo y grupo.', action: 'Abrir'},
    {badge: 'Niveles', title: 'Mejores armas', description: 'Las mejores armas S/A/B por clase con ubicaciones y rutas de mejora.', action: 'Abrir'},
    {badge: 'Combate', title: 'Guía de jefes', description: 'Todos los jefes de Farever con fases, mecánicas, tamaño de grupo y botín clave.', action: 'Abrir'},
    {badge: 'Códigos', title: 'Códigos', description: 'Códigos promocionales activos y cómo canjearlos; actualizado a diario.', action: 'Abrir'},
    {badge: 'Tecnología', title: 'Steam Deck', description: 'Farever en Steam Deck: verificación, FPS, batería y mejores ajustes.', action: 'Abrir'}
  ],
  guides: [
    {category: 'Configuraciones', title: 'Mejores clases de 2026', action: 'Leer'},
    {category: 'Nivelación', title: 'Guía para subir de nivel rápido', action: 'Leer'},
    {category: 'Análisis', title: '¿Vale la pena Farever en 2026?', action: 'Leer'},
    {category: 'Región', title: 'Guía completa de Skyover Island', action: 'Leer'},
    {category: 'Región', title: 'Guía del Valle del Otoño Eterno', action: 'Leer'},
    {category: 'Comparación', title: 'Farever vs. Wartales', action: 'Leer'}
  ],
  news: [
    {date: '7 may 2026', text: 'Farever llega al acceso anticipado de Steam con un 10 % de descuento y una hoja de ruta anual completa.'},
    {date: '16 abr 2026', text: 'Shiro Games publica el tráiler oficial de la fecha de acceso anticipado.'},
    {date: 'Hoja de ruta 2026', text: 'Se planean nuevos biomas, mayor nivel máximo, habilidades, clases, eventos de temporada y gremios.'}
  ],
  faq: [
    {question: '¿Qué es Farever?', answer: 'Farever es un RPG de acción cooperativo en línea de Shiro Games (Wartales, Northgard), ambientado en Siagarta. Entró en acceso anticipado de Steam el 7 de mayo de 2026.'},
    {question: '¿Farever es un MMO?', answer: 'Farever es un MMO ligero: un RPG de acción cooperativo en un mundo abierto compartido. Los grupos son de hasta cuatro jugadores, no de escala masiva.'},
    {question: '¿Farever es gratis?', answer: 'No. Farever es un título de acceso anticipado de pago por 17,99 USD en Steam. No tiene modalidad gratuita ni demo.'},
    {question: '¿Puedo jugar Farever solo?', answer: 'Sí. Todas las mazmorras escalan con el tamaño del grupo y el juego se puede completar en solitario, aunque los dúos son más eficientes.'},
    {question: '¿Están caídos los servidores de Farever?', answer: 'Normalmente no, aunque puede haber colas en horas punta. Consulta nuestra página de estado en vivo para ver el informe más reciente.'},
    {question: '¿Cuándo sale la versión completa?', answer: 'Shiro Games ha indicado que Farever permanecerá aproximadamente un año en acceso anticipado, así que la versión 1.0 se espera a mediados de 2027.'},
    {question: '¿El juego se llama “Farever” o “forever”?', answer: 'Farever, con una sola R y F mayúscula. Google suele corregirlo a “forever”, pero el juego de Shiro Games se escribe Farever.'}
  ],
  finalCta: {
    eyebrow: '¿Listo para empezar?',
    title: 'Forja tu leyenda hoy.',
    primaryLabel: 'Jugar en Steam',
    secondaryLabel: 'Empezar con la guía para principiantes'
  }
});

const frenchData = translateHome({
  hero: {
    eyebrow: 'Une aventure Shiro Games · Accès anticipé Steam',
    titleLead: 'Forgez votre légende',
    titleAccent: 'dans Farever',
    description:
      'Un action-RPG coopératif en ligne situé dans le royaume oublié de Siagarta. Explorez des terres sauvages, triomphez des donjons et maîtrisez 4 classes, 6 métiers et plus de 100 armes.',
    primaryLabel: 'Jouer sur Steam',
    secondaryLabel: 'Guide du débutant',
    stats: [
      {value: '7 mai 2026', label: 'Lancement EA'},
      {value: '17,99 $', label: 'Prix Steam'},
      {value: '72 %', label: 'Plutôt positives'},
      {value: '≈12 mois', label: 'Durée de l’EA'}
    ],
    scrollLabel: 'Défiler'
  },
  facts: [
    {label: 'Développeur', value: 'Shiro Games'},
    {label: 'Genre', value: 'Action-RPG coopératif en ligne'},
    {label: 'Plateforme', value: 'PC (Steam)'},
    {label: 'Joueurs', value: 'Solo ou coop en ligne'},
    {label: 'Prix', value: '17,99 USD'},
    {label: 'Avis', value: 'Plutôt positives (1 400+)'},
    {label: 'Moteur', value: 'Heaps (interne à Shiro)'}
  ],
  classes: [
    {badge: 'Première ligne · Tank-DPS', title: 'Guerrier', description: 'Combattant en armure lourde avec beaucoup d’impact et d’autonomie. La classe la plus facile à prendre en main.', action: 'Explorer'},
    {badge: 'Distance · DPS mobile', title: 'Rôdeur', description: 'Arcs, pièges et familiers. Excellent en solo grâce à sa mobilité et ses dégâts à distance.', action: 'Explorer'},
    {badge: 'Zone · Mage explosif', title: 'Mage', description: 'Maître des éléments. Fragile, mais redoutable contre les groupes et doté du meilleur potentiel de dégâts.', action: 'Explorer'},
    {badge: 'Soutien · Hybride', title: 'Mystique', description: 'Soutien polyvalent mêlant améliorations, soins et magie de combat. Idéal en coop et viable en solo.', action: 'Explorer'}
  ],
  regions: [
    {badge: 'Région de départ', meta: 'Niv. 1–15', description: 'Un archipel flottant où s’affrontent plusieurs factions. Quatre donjons majeurs mènent au Berceau du Ciel.', action: 'Guide de région'},
    {badge: 'Fin de jeu · EA', meta: 'Niv. 12+', title: 'Vallée de l’Automne éternel', description: 'Des forêts figées en automne, peuplées d’ennemis liés à la nature et à la décomposition. Poison fréquent et fenêtres de boss serrées.', action: 'Guide de région'}
  ],
  journey: [
    {title: 'Date de sortie', description: 'Informations sur l’accès anticipé, perspectives de la version complète et programme annuel de Shiro Games.', action: 'Lire la suite'},
    {title: 'Guide du débutant', description: 'Vos 5 premières heures : choix de classe, monture gratuite, maîtrise des armes et bases en ville.', action: 'Lire la suite'},
    {title: 'Classes et métiers', description: 'Les 4 classes et 6 métiers : forces, rôles et associations recommandées.', action: 'Lire la suite'},
    {title: 'Armes et compétences', description: 'Le système façon GW2 : plus de 100 armes débloquent des techniques de combat uniques.', action: 'Lire la suite'},
    {title: 'Donjons et boss', description: 'Skyover Island et la Vallée de l’Automne éternel : chaque donjon, faction et boss.', action: 'Lire la suite'},
    {title: 'Jouer en coop', description: 'Inviter des amis, mise à l’échelle du groupe, cross-play et conseils de serveurs dédiés.', action: 'Lire la suite'},
    {title: 'Astuces et conseils', description: 'Progressez vite, trouvez la monture gratuite, optimisez l’artisanat et maîtrisez l’esquive.', action: 'Lire la suite'},
    {title: 'Feuille de route EA', description: 'Nouvelles régions, classes, niveau maximal, événements saisonniers et guildes : le plan complet.', action: 'Lire la suite'},
    {title: 'FAQ', description: 'Farever est-il gratuit ? Cross-play, solo, JcJ ? Toutes les réponses sont ici.', action: 'Lire la suite'}
  ],
  tools: [
    {badge: 'Direct', title: 'État des serveurs', description: 'Les serveurs Farever sont-ils en panne ? État en direct, historique et solutions de connexion.', action: 'Ouvrir'},
    {badge: 'Données', title: 'Graphiques Steam', description: 'Nombre de joueurs, pic sur 24 h et tendance sur 7 jours — mise à jour quotidienne.', action: 'Ouvrir'},
    {badge: 'Classement', title: 'Tier list des classes', description: 'Classements S/A/B des 4 classes en solo, duo et groupe.', action: 'Ouvrir'},
    {badge: 'Classement', title: 'Meilleures armes', description: 'Les meilleures armes S/A/B par classe, leurs emplacements et améliorations.', action: 'Ouvrir'},
    {badge: 'Combat', title: 'Guide des boss', description: 'Tous les boss de Farever avec phases, mécaniques, taille de groupe et butin clé.', action: 'Ouvrir'},
    {badge: 'Codes', title: 'Codes', description: 'Codes promotionnels Farever actifs et méthode d’activation — mise à jour quotidienne.', action: 'Ouvrir'},
    {badge: 'Technique', title: 'Steam Deck', description: 'Farever sur Steam Deck : statut, FPS, autonomie et meilleurs réglages.', action: 'Ouvrir'}
  ],
  guides: [
    {category: 'Builds', title: 'Tier list des classes 2026', action: 'Lire'},
    {category: 'Progression', title: 'Guide de progression rapide', action: 'Lire'},
    {category: 'Test', title: 'Farever vaut-il le coup en 2026 ?', action: 'Lire'},
    {category: 'Région', title: 'Guide complet de Skyover Island', action: 'Lire'},
    {category: 'Région', title: 'Guide de la Vallée de l’Automne éternel', action: 'Lire'},
    {category: 'Comparatif', title: 'Farever face à Wartales', action: 'Lire'}
  ],
  news: [
    {date: '7 mai 2026', text: 'Farever arrive en accès anticipé Steam avec 10 % de réduction et une feuille de route annuelle complète.'},
    {date: '16 avr. 2026', text: 'Shiro Games dévoile la bande-annonce officielle de la date de l’accès anticipé.'},
    {date: 'Feuille de route 2026', text: 'Nouveaux biomes, niveau maximal relevé, compétences, classes, événements saisonniers et guildes sont prévus.'}
  ],
  faq: [
    {question: 'Qu’est-ce que Farever ?', answer: 'Farever est un action-RPG coopératif en ligne de Shiro Games (Wartales, Northgard), dans le royaume oublié de Siagarta. Il est arrivé en accès anticipé Steam le 7 mai 2026.'},
    {question: 'Farever est-il un MMO ?', answer: 'Farever est un MMO-lite : un action-RPG coopératif dans un monde ouvert partagé. Les groupes comptent jusqu’à quatre joueurs, loin de l’échelle d’un vrai MMO.'},
    {question: 'Farever est-il gratuit ?', answer: 'Non. Farever est un jeu payant en accès anticipé à 17,99 USD sur Steam. Il n’existe ni formule gratuite ni démo.'},
    {question: 'Puis-je jouer à Farever en solo ?', answer: 'Oui. Chaque donjon s’adapte à la taille du groupe et tout le jeu peut être terminé seul, même si les duos sont les plus efficaces.'},
    {question: 'Les serveurs Farever sont-ils en panne ?', answer: 'La plupart du temps non, mais des files peuvent apparaître aux heures de pointe. Consultez notre page d’état en direct pour le dernier rapport.'},
    {question: 'Quand sortira la version complète ?', answer: 'Shiro Games a annoncé environ un an d’accès anticipé. La version 1.0 est donc attendue vers le milieu de l’année 2027.'},
    {question: 'Le jeu s’appelle-t-il « Farever » ou « forever » ?', answer: 'Farever — un seul R et un F majuscule. Google corrige souvent en « forever », mais le jeu de Shiro Games s’écrit Farever.'}
  ],
  finalCta: {
    eyebrow: 'Prêt à commencer ?',
    title: 'Forgez votre légende dès aujourd’hui.',
    primaryLabel: 'Jouer sur Steam',
    secondaryLabel: 'Commencer par le guide du débutant'
  }
});

const germanCopy: HomeCopy = {
  about: {
    eyebrow: 'Das vergessene Reich',
    title: 'Was ist Farever?',
    paragraphs: [
      'Farever ist ein Online-Koop-Action-RPG von Shiro Games — dem Studio hinter Northgard, Wartales und Dune: Spice Wars. Im vergessenen Reich Siagarta verbindet es Erkundung und Plattformpassagen im Zelda-Stil mit MMO-inspirierten Kämpfen, Handwerk und Gruppenfortschritt.',
      'Der Early-Access-Build vom 7. Mai 2026 umfasst zwei Regionen, mehrere Dungeons, vier Klassen, sechs Berufe und über hundert Waffen. Für ungefähr zwölf weitere Monate sind neue Biome, eine höhere Levelgrenze, weitere Klassen, Saison-Events und Gilden geplant. Spiele solo oder online mit Freunden.'
    ],
    factsLabel: 'Schnelle Fakten'
  },
  classes: {eyebrow: 'Wähle deinen Pfad', title: 'Die vier Klassen'},
  regions: {eyebrow: 'Die Welt von Siagarta', title: 'Erkunde zwei Regionen'},
  journey: {eyebrow: 'Kodex der Abenteurer', title: 'Beginne deine Reise'},
  tools: {eyebrow: 'Live-Daten & Ranglisten', title: 'Tools & Tier-Listen'},
  guides: {eyebrow: 'Im Detail', title: 'Empfohlene Guides', all: 'Alle Guides anzeigen'},
  news: {eyebrow: 'Herolde von Siagarta', title: 'Neueste Nachrichten'},
  faq: {eyebrow: 'Schnelle Antworten', title: 'Farever FAQ', all: 'Vollständige FAQ'}
};

const spanishCopy: HomeCopy = {
  about: {
    eyebrow: 'El reino olvidado',
    title: '¿Qué es Farever?',
    paragraphs: [
      'Farever es un RPG de acción cooperativo en línea de Shiro Games, el estudio de Northgard, Wartales y Dune: Spice Wars. En el reino olvidado de Siagarta, combina exploración y plataformas al estilo Zelda con combate, artesanía y progresión de grupo inspirados en los MMO.',
      'La versión de acceso anticipado del 7 de mayo de 2026 incluye dos regiones, varias mazmorras, cuatro clases, seis oficios y más de cien armas. Se planean unos doce meses de contenido adicional con nuevos biomas, más nivel, clases, eventos de temporada y gremios. Juega solo o con amigos.'
    ],
    factsLabel: 'Datos rápidos'
  },
  classes: {eyebrow: 'Elige tu camino', title: 'Las cuatro clases'},
  regions: {eyebrow: 'El mundo de Siagarta', title: 'Explora dos regiones'},
  journey: {eyebrow: 'Códice del aventurero', title: 'Comienza tu viaje'},
  tools: {eyebrow: 'Datos y clasificaciones', title: 'Herramientas y listas'},
  guides: {eyebrow: 'En profundidad', title: 'Guías destacadas', all: 'Ver todas las guías'},
  news: {eyebrow: 'Heraldos de Siagarta', title: 'Últimas noticias'},
  faq: {eyebrow: 'Respuestas rápidas', title: 'Preguntas sobre Farever', all: 'Ver todas las preguntas'}
};

const frenchCopy: HomeCopy = {
  about: {
    eyebrow: 'Le royaume oublié',
    title: 'Qu’est-ce que Farever ?',
    paragraphs: [
      'Farever est un action-RPG coopératif en ligne de Shiro Games, le studio derrière Northgard, Wartales et Dune: Spice Wars. Dans le royaume oublié de Siagarta, il mêle exploration et plates-formes façon Zelda à des combats, de l’artisanat et une progression de groupe inspirés des MMO.',
      'La version en accès anticipé du 7 mai 2026 propose deux régions, plusieurs donjons, quatre classes, six métiers et plus de cent armes. Environ douze mois de contenu supplémentaire sont prévus : biomes, niveau maximal, classes, événements saisonniers et guildes. Jouez seul ou en ligne avec vos amis.'
    ],
    factsLabel: 'En bref'
  },
  classes: {eyebrow: 'Choisissez votre voie', title: 'Les quatre classes'},
  regions: {eyebrow: 'Le monde de Siagarta', title: 'Explorez deux régions'},
  journey: {eyebrow: 'Codex de l’aventurier', title: 'Commencez votre voyage'},
  tools: {eyebrow: 'Données & classements', title: 'Outils et tier lists'},
  guides: {eyebrow: 'En profondeur', title: 'Guides à la une', all: 'Voir tous les guides'},
  news: {eyebrow: 'Hérauts de Siagarta', title: 'Dernières nouvelles'},
  faq: {eyebrow: 'Réponses rapides', title: 'FAQ Farever', all: 'Voir toute la FAQ'}
};

const dataByLocale: Record<Locale, HomeData> = {
  en: englishData,
  de: germanData,
  es: spanishData,
  fr: frenchData
};

const copyByLocale: Record<Locale, HomeCopy> = {
  en: englishCopy,
  de: germanCopy,
  es: spanishCopy,
  fr: frenchCopy
};

const seoByLocale: Record<Locale, HomeSeo> = {
  en: enMessages.Home,
  de: deMessages.Home,
  es: esMessages.Home,
  fr: frMessages.Home
};

export function getHomeData(locale: Locale): HomeData {
  return dataByLocale[locale];
}

export function getHomeCopy(locale: Locale): HomeCopy {
  return copyByLocale[locale];
}

export function getHomeSeo(locale: Locale): HomeSeo {
  return seoByLocale[locale];
}
