import type {Locale} from '@/i18n/routing';
import {
  GAME_NAME,
  OFFICIAL_TRAILER_URL,
  STEAM_URL
} from '@/lib/site-data';
import deMessages from '@/messages/de.json';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import ruMessages from '@/messages/ru.json';

export type ActionData = {label: string; href: string};
export type Fact = {label: string; value: string};

export type HeroData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryAction: ActionData;
  secondaryAction: ActionData;
  tertiaryAction: ActionData;
  videoAction: ActionData;
  stats: Fact[];
  scrollLabel: string;
};

export type FeatureIcon =
  | 'book' | 'calendar' | 'chart' | 'code' | 'compass' | 'gamepad'
  | 'gem' | 'globe' | 'heart' | 'map' | 'mountain' | 'network' | 'radio'
  | 'scroll' | 'server' | 'shield' | 'sparkles' | 'swords' | 'trophy'
  | 'users' | 'wand' | 'wifi' | 'wrench' | 'zap';

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

export type NewsItem = {date: string; text: string};
export type FaqItem = {question: string; answer: string};

export type CtaData = {
  eyebrow: string;
  title: string;
  description: string;
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
    eyebrow: 'Fan-Made Survivor Guide Hub',
    titleLead: 'Yet Another',
    titleAccent: 'Zombie Survivors',
    description:
      'Build a squad of up to three Survivors and turn each run into an escalating storm of bullets, blades, fire, and explosions. Learn the strongest teams, upgrades, synergies, items, and unlock paths for Version 1.0.',
    primaryAction: {label: 'Start Beginner Guide', href: '/guides/'},
    secondaryAction: {label: 'Compare Survivors', href: '/characters/'},
    tertiaryAction: {label: 'Browse All Items', href: '/items/'},
    videoAction: {label: 'Official 1.0 Trailer', href: OFFICIAL_TRAILER_URL},
    stats: [
      {value: 'Aug 20, 2026', label: 'Full Release'},
      {value: 'Aug 20, 2026', label: 'Updated'},
      {value: '600,000+', label: 'Copies Sold'},
      {value: '12,000+', label: 'Steam Reviews'},
      {value: '9', label: 'Survivors'}
    ],
    scrollLabel: 'Discover the game'
  },
  facts: [
    {label: 'Developer', value: 'Awesome Games Studio'},
    {label: 'Platform', value: 'Steam'},
    {label: 'Genre', value: 'Squad-Building Bullet Heaven Roguelike'},
    {label: 'Copies Sold', value: '600,000+'},
    {label: 'Steam Reviews', value: '12,000+'},
    {label: 'Survivors', value: '9'}
  ],
  classes: [
    {
      badge: 'Durable · Heavy Weapons',
      title: 'Tank',
      description: 'A durable Survivor with researched Minigun and Rocket Launcher weapon paths.',
      href: '/characters/',
      action: 'Explore',
      icon: 'shield'
    },
    {
      badge: 'Ranged · Critical Hits',
      title: 'Huntress',
      description: 'A ranged Survivor focused on critical hits, cross-Survivor synergies, and boss pressure.',
      href: '/characters/huntress/',
      action: 'Explore',
      icon: 'compass'
    },
    {
      badge: 'Melee · Close Range',
      title: 'Ghost',
      description: 'A melee-focused Survivor with weapon upgrades, abilities, and squad synergies.',
      href: '/characters/ghost/',
      action: 'Explore',
      icon: 'swords'
    },
    {
      badge: 'Version 1.0 · Ninth Survivor',
      title: 'Ranger',
      description: 'Added in version 1.0 and unlocked at Survival Level 175.',
      href: '/characters/',
      action: 'Explore',
      icon: 'users'
    }
  ],
  regions: [
    {
      badge: 'Version 1.0 Arena',
      meta: 'Verified unlock',
      title: 'Bio Lab',
      description: 'The version 1.0 arena unlocks after Dead Terminal is completed on Default.',
      href: '/guides/',
      action: 'View Guides',
      icon: 'map'
    },
    {
      badge: 'Version 1.0 Mode',
      meta: 'Verified unlock',
      title: 'Boss Rush',
      description: 'Boss Rush unlocks after Hardcore mode is completed for each map.',
      href: '/guides/',
      action: 'View Guides',
      icon: 'trophy'
    }
  ],
  journey: [
    {
      title: 'Beginner Guide',
      description: 'Learn the basic run loop, squad recruitment, permanent progression, items, upgrades, and the fastest route through your first successful runs.',
      href: '/guides/',
      action: 'Start Reading',
      icon: 'compass'
    },
    {
      title: 'Best Teams & Synergies',
      description: 'Choose a strong team leader, recruit complementary Survivors, and combine cross-Survivor abilities into reliable early and late-game squads.',
      href: '/guides/best-team/',
      action: 'Start Reading',
      icon: 'users'
    },
    {
      title: 'Character Skills & Upgrades',
      description: 'Compare every Survivor’s weapons, abilities, leader bonus, unlock requirements, skill-tree ranks, and strongest upgrade paths.',
      href: '/characters/',
      action: 'Start Reading',
      icon: 'zap'
    },
    {
      title: 'Achievements & Unlocks',
      description: 'Track achievements and learn which Survivors, weapons, items, arenas, modes, and hidden objectives each challenge unlocks.',
      href: '/guides/achievements/',
      action: 'Start Reading',
      icon: 'trophy'
    }
  ],
  tools: [
    {
      badge: 'Teams',
      title: 'Survivor Tier List',
      description: 'Compare researched Survivor roles and squad synergies without inventing unsupported rankings.',
      href: '/guides/tier-list/',
      action: 'Open',
      icon: 'trophy'
    },
    {
      badge: 'Builds',
      title: 'Best Team',
      description: 'Build a squad of up to three Survivors around compatible weapons, abilities, and synergies.',
      href: '/guides/best-team/',
      action: 'Open',
      icon: 'users'
    },
    {
      badge: 'Weapons',
      title: 'Weapon Upgrades',
      description: 'Explore researched weapon paths, achievement unlocks, and version 1.0 skill trees.',
      href: '/weapons/upgrades/',
      action: 'Open',
      icon: 'swords'
    },
    {
      badge: 'Items',
      title: 'Items & Synergies',
      description: 'Understand item effects, squad interactions, and researched version 1.0 additions.',
      href: '/items/',
      action: 'Open',
      icon: 'gem'
    },
    {
      badge: 'Support',
      title: 'Save Problems',
      description: 'Review official Steam Cloud backup guidance before attempting save recovery.',
      href: '/guides/save-problem/',
      action: 'Open',
      icon: 'wrench'
    },
    {
      badge: 'Community',
      title: 'Mods',
      description: 'Check mod sources, update dates, and current version compatibility before installing.',
      href: '/tools/mods/',
      action: 'Open',
      icon: 'gamepad'
    }
  ],
  guides: [
    {category: 'Teams', title: 'Best Team & Squad Synergies', href: '/guides/best-team/', action: 'Read'},
    {category: 'Rankings', title: 'Survivor Tier List', href: '/guides/tier-list/', action: 'Read'},
    {category: 'Survivor', title: 'Ghost Skills & Builds', href: '/characters/ghost/', action: 'Read'},
    {category: 'Survivor', title: 'Huntress Skills & Upgrades', href: '/characters/huntress/', action: 'Read'},
    {category: 'Weapons', title: 'Rocket Launcher vs Minigun', href: '/weapons/rocket-launcher-and-minigun/', action: 'Read'},
    {category: 'Secrets', title: 'Sanji the Rabbit', href: '/guides/sanji-the-rabbit/', action: 'Read'},
    {category: 'Builds', title: 'Version 1.0 Build Hub', href: '/builds/', action: 'Read'},
    {category: 'Builds', title: 'Ghost Build', href: '/characters/ghost/build/', action: 'Read'},
    {category: 'Builds', title: 'Huntress Build', href: '/characters/huntress/build/', action: 'Read'},
    {category: 'Progression', title: 'Skill Tree & Rank 5', href: '/guides/skill-tree/', action: 'Read'},
    {category: 'Progression', title: 'Friendship & Team Bond', href: '/guides/friendship-and-team-bond/', action: 'Read'},
    {category: 'Progression', title: 'Max Level & Rank 5', href: '/guides/max-level-and-rank-5/', action: 'Read'}
  ],
  news: [
    {
      date: 'Aug 20, 2026',
      text: 'Version 1.0 adds Ranger, Bio Lab, Boss Rush, Survivors’ Camp, story missions, Friendship, and rank-five skill trees.'
    },
    {
      date: 'Version 1.0',
      text: 'Ranger joins the researched roster as the ninth playable Survivor and unlocks at Survival Level 175.'
    },
    {
      date: 'Developer Notes',
      text: 'New cross-Survivor synergy nodes, additional items, and achievements expand the verified progression systems.'
    }
  ],
  faq: [
    {
      question: 'What is Yet Another Zombie Survivors?',
      answer: 'It is a squad-building bullet heaven action roguelike developed by Awesome Games Studio.'
    },
    {
      question: 'How many Survivors can join one run?',
      answer: 'Each run starts with one Survivor, and SOS calls can recruit up to two more for a maximum squad of three.'
    },
    {
      question: 'How many playable Survivors are in version 1.0?',
      answer: 'The researched version 1.0 roster includes nine playable Survivors.'
    },
    {
      question: 'How do I unlock Ranger?',
      answer: 'The official version 1.0 developer notes state that Ranger unlocks at Survival Level 175.'
    }
  ],
  finalCta: {
    eyebrow: 'Start your next run',
    title: 'Ready to Master Yet Another Zombie Survivors?',
    description: 'From your first SOS rescue to rank-five builds, hidden unlocks, Boss Rush, and high-synergy endgame squads, our fan-made guide hub keeps every useful answer in one place.',
    primaryAction: {label: 'Read the Beginner Guide', href: '/guides/'},
    secondaryAction: {label: 'Play on Steam', href: STEAM_URL}
  }
};

const englishCopy: HomeCopy = {
  about: {
    eyebrow: 'Meet the Survivors',
    title: 'What is Yet Another Zombie Survivors?',
    paragraphs: [
      'Yet Another Zombie Survivors is a squad-building bullet heaven action roguelike by Awesome Games Studio. You begin each run with one Survivor, answer SOS calls to recruit up to two more, and combine automatic attacks, weapons, abilities, and items against thousands of undead.',
      'Version 1.0 adds the Survivors’ Camp, story and character missions, the Ranger, Bio Lab, Boss Rush, rank-five skill trees, more synergies, Torments, Friendship progression, new items, and new achievements. Runs stay easy to start while permanent upgrades and team composition create deep build choices.'
    ],
    factsLabel: 'Verified Game Facts'
  },
  classes: {eyebrow: 'Build Your Squad', title: 'Meet the Survivors'},
  regions: {eyebrow: 'Version 1.0', title: 'New Arenas & Modes'},
  journey: {eyebrow: 'Start Here', title: 'Your Yet Another Zombie Survivors Journey'},
  tools: {eyebrow: 'Research-backed Resources', title: 'Guides, Builds & Tools'},
  guides: {eyebrow: 'Deep Dive', title: 'Featured Guides', all: 'Explore All Guides'},
  news: {eyebrow: 'Officially Documented', title: 'Version 1.0 Highlights'},
  faq: {eyebrow: 'Quick Answers', title: 'Yet Another Zombie Survivors FAQ', all: 'Explore All Guides'}
};

type Translation = {
  hero: Pick<HeroData, 'eyebrow' | 'description' | 'scrollLabel'> & {
    primary: string;
    secondary: string;
    tertiary: string;
    video: string;
  };
  about: HomeCopy['about'];
  sections: Omit<HomeCopy, 'about'>;
  final: {eyebrow: string; title: string; description: string; primary: string; secondary: string};
  facts: Fact[];
  news: NewsItem[];
  faq: FaqItem[];
};

const translations: Record<Exclude<Locale, 'en'>, Translation> = {
  ru: {
    hero: {
      eyebrow: 'Фанатская база знаний выживших',
      description: 'Соберите отряд максимум из трёх выживших и изучайте проверенные команды, навыки, синергии, предметы и открытия версии 1.0.',
      primary: 'Гайд для новичков',
      secondary: 'Сравнить выживших',
      tertiary: 'Посмотреть предметы',
      video: 'Официальный трейлер 1.0',
      scrollLabel: 'Об игре'
    },
    about: {
      eyebrow: 'Познакомьтесь с выжившими',
      title: 'Что такое Yet Another Zombie Survivors?',
      paragraphs: [
        'Yet Another Zombie Survivors — squad-building bullet heaven roguelike от Awesome Games Studio. Начните с одного выжившего, отвечайте на сигналы SOS и соберите отряд максимум из трёх персонажей.',
        'Версия 1.0 добавляет Survivors’ Camp, Ranger, Bio Lab, Boss Rush, деревья навыков пятого ранга, Friendship, новые предметы, достижения и синергии.'
      ],
      factsLabel: 'Проверенные сведения'
    },
    sections: {
      classes: {eyebrow: 'Соберите отряд', title: 'Познакомьтесь с выжившими'},
      regions: {eyebrow: 'Версия 1.0', title: 'Новые арены и режимы'},
      journey: {eyebrow: 'Начните здесь', title: 'Ваш путь в Yet Another Zombie Survivors'},
      tools: {eyebrow: 'Проверенные материалы', title: 'Гайды, сборки и инструменты'},
      guides: {eyebrow: 'Подробные материалы', title: 'Избранные гайды', all: 'Все гайды'},
      news: {eyebrow: 'Данные разработчика', title: 'Нововведения версии 1.0'},
      faq: {eyebrow: 'Быстрые ответы', title: 'Вопросы о Yet Another Zombie Survivors', all: 'Все гайды'}
    },
    final: {
      eyebrow: 'Начните следующий забег',
      title: 'Готовы освоить Yet Another Zombie Survivors?',
      description: 'Гайды по спасению SOS, сборкам пятого ранга, скрытым открытиям, Boss Rush и командным синергиям собраны в одном месте.',
      primary: 'Читать гайд для новичков',
      secondary: 'Играть в Steam'
    },
    facts: [
      {label: 'Разработчик', value: 'Awesome Games Studio'},
      {label: 'Платформа', value: 'Steam'},
      {label: 'Жанр', value: 'Squad-building bullet heaven roguelike'},
      {label: 'Проданные копии', value: '600,000+'},
      {label: 'Отзывы Steam', value: '12,000+'},
      {label: 'Выжившие', value: '9'}
    ],
    news: [
      {date: '20 августа 2026', text: 'Версия 1.0 добавляет Ranger, Bio Lab, Boss Rush, Survivors’ Camp, Friendship и навыки пятого ранга.'},
      {date: 'Версия 1.0', text: 'Ranger становится девятым выжившим и открывается на Survival Level 175.'},
      {date: 'Заметки разработчика', text: 'Новые синергии, предметы и достижения расширяют систему прогрессии.'}
    ],
    faq: [
      {question: 'Что такое Yet Another Zombie Survivors?', answer: 'Это squad-building bullet heaven roguelike от Awesome Games Studio.'},
      {question: 'Сколько персонажей может быть в отряде?', answer: 'Один стартовый выживший и до двух спасённых по сигналам SOS — максимум три.'},
      {question: 'Сколько выживших в версии 1.0?', answer: 'Исследование версии 1.0 подтверждает девять выживших.'},
      {question: 'Как открыть Ranger?', answer: 'Официальные заметки разработчика указывают Survival Level 175.'}
    ]
  },
  es: {
    hero: {
      eyebrow: 'Guías de supervivientes hechas por fans',
      description: 'Forma un equipo de hasta tres supervivientes y descubre builds, sinergias, objetos y desbloqueos contrastados de la versión 1.0.',
      primary: 'Guía para principiantes',
      secondary: 'Comparar supervivientes',
      tertiary: 'Ver todos los objetos',
      video: 'Tráiler oficial 1.0',
      scrollLabel: 'Descubre el juego'
    },
    about: {
      eyebrow: 'Conoce a los supervivientes',
      title: '¿Qué es Yet Another Zombie Survivors?',
      paragraphs: [
        'Yet Another Zombie Survivors es un roguelike bullet heaven de Awesome Games Studio. Empiezas con un superviviente y las llamadas SOS permiten formar un equipo de hasta tres.',
        'La versión 1.0 añade Survivors’ Camp, Ranger, Bio Lab, Boss Rush, habilidades de rango cinco, Friendship, objetos, logros y nuevas sinergias.'
      ],
      factsLabel: 'Datos verificados'
    },
    sections: {
      classes: {eyebrow: 'Forma tu equipo', title: 'Conoce a los supervivientes'},
      regions: {eyebrow: 'Versión 1.0', title: 'Nuevas arenas y modos'},
      journey: {eyebrow: 'Empieza aquí', title: 'Tu aventura en Yet Another Zombie Survivors'},
      tools: {eyebrow: 'Recursos contrastados', title: 'Guías, builds y herramientas'},
      guides: {eyebrow: 'A fondo', title: 'Guías destacadas', all: 'Ver todas las guías'},
      news: {eyebrow: 'Notas oficiales', title: 'Novedades de la versión 1.0'},
      faq: {eyebrow: 'Respuestas rápidas', title: 'Preguntas sobre Yet Another Zombie Survivors', all: 'Ver todas las guías'}
    },
    final: {
      eyebrow: 'Empieza tu próxima partida',
      title: '¿Listo para dominar Yet Another Zombie Survivors?',
      description: 'Desde el primer rescate SOS hasta las builds de rango cinco, Boss Rush y las sinergias de equipo: todas las respuestas útiles en un solo lugar.',
      primary: 'Leer la guía para principiantes',
      secondary: 'Jugar en Steam'
    },
    facts: [
      {label: 'Desarrollador', value: 'Awesome Games Studio'},
      {label: 'Plataforma', value: 'Steam'},
      {label: 'Género', value: 'Squad-building bullet heaven roguelike'},
      {label: 'Copias vendidas', value: '600,000+'},
      {label: 'Reseñas en Steam', value: '12,000+'},
      {label: 'Supervivientes', value: '9'}
    ],
    news: [
      {date: '20 ago 2026', text: 'La versión 1.0 incorpora Ranger, Bio Lab, Boss Rush, Survivors’ Camp y habilidades de rango cinco.'},
      {date: 'Versión 1.0', text: 'Ranger es el noveno superviviente y se desbloquea en Survival Level 175.'},
      {date: 'Notas oficiales', text: 'Nuevas sinergias, objetos y logros amplían la progresión del juego.'}
    ],
    faq: [
      {question: '¿Qué es Yet Another Zombie Survivors?', answer: 'Es un roguelike bullet heaven de formación de equipos desarrollado por Awesome Games Studio.'},
      {question: '¿Cuántos supervivientes puede tener un equipo?', answer: 'Uno inicial y hasta dos reclutas SOS: un máximo de tres.'},
      {question: '¿Cuántos supervivientes hay en la versión 1.0?', answer: 'La investigación confirma nueve supervivientes jugables.'},
      {question: '¿Cómo se desbloquea Ranger?', answer: 'Las notas oficiales indican Survival Level 175.'}
    ]
  },
  de: {
    hero: {
      eyebrow: 'Von Fans erstelltes Survivor-Wiki',
      description: 'Stelle ein Team aus bis zu drei Überlebenden zusammen und entdecke recherchierte Builds, Synergien, Items und Freischaltungen für Version 1.0.',
      primary: 'Einsteiger-Guide starten',
      secondary: 'Überlebende vergleichen',
      tertiary: 'Alle Items ansehen',
      video: 'Offizieller 1.0-Trailer',
      scrollLabel: 'Spiel entdecken'
    },
    about: {
      eyebrow: 'Lerne die Überlebenden kennen',
      title: 'Was ist Yet Another Zombie Survivors?',
      paragraphs: [
        'Yet Another Zombie Survivors ist ein Squad-building Bullet-Heaven-Roguelike von Awesome Games Studio. Du startest mit einem Überlebenden und kannst über SOS-Rufe bis zu zwei weitere rekrutieren.',
        'Version 1.0 ergänzt Survivors’ Camp, Ranger, Bio Lab, Boss Rush, Rang-fünf-Fähigkeiten, Friendship, neue Items, Erfolge und Synergien.'
      ],
      factsLabel: 'Geprüfte Spielfakten'
    },
    sections: {
      classes: {eyebrow: 'Stelle dein Squad zusammen', title: 'Lerne die Überlebenden kennen'},
      regions: {eyebrow: 'Version 1.0', title: 'Neue Arenen & Modi'},
      journey: {eyebrow: 'Hier anfangen', title: 'Deine Reise in Yet Another Zombie Survivors'},
      tools: {eyebrow: 'Recherchierte Ressourcen', title: 'Guides, Builds & Tools'},
      guides: {eyebrow: 'Im Detail', title: 'Empfohlene Guides', all: 'Alle Guides ansehen'},
      news: {eyebrow: 'Offiziell dokumentiert', title: 'Highlights aus Version 1.0'},
      faq: {eyebrow: 'Schnelle Antworten', title: 'Yet Another Zombie Survivors FAQ', all: 'Alle Guides ansehen'}
    },
    final: {
      eyebrow: 'Starte deinen nächsten Run',
      title: 'Bereit für Yet Another Zombie Survivors?',
      description: 'Vom ersten SOS-Ruf über Rang-fünf-Builds bis zu Boss Rush und Team-Synergien: Unser Fan-Wiki bündelt die recherchierten Antworten.',
      primary: 'Einsteiger-Guide lesen',
      secondary: 'Auf Steam spielen'
    },
    facts: [
      {label: 'Entwickler', value: 'Awesome Games Studio'},
      {label: 'Plattform', value: 'Steam'},
      {label: 'Genre', value: 'Squad-building Bullet-Heaven-Roguelike'},
      {label: 'Verkaufte Exemplare', value: '600,000+'},
      {label: 'Steam-Bewertungen', value: '12,000+'},
      {label: 'Überlebende', value: '9'}
    ],
    news: [
      {date: '20. Aug. 2026', text: 'Version 1.0 ergänzt Ranger, Bio Lab, Boss Rush, Survivors’ Camp und Rang-fünf-Fähigkeiten.'},
      {date: 'Version 1.0', text: 'Ranger ist der neunte Überlebende und wird auf Survival Level 175 freigeschaltet.'},
      {date: 'Entwicklernotizen', text: 'Neue Synergien, Items und Erfolge erweitern die bestätigten Fortschrittssysteme.'}
    ],
    faq: [
      {question: 'Was ist Yet Another Zombie Survivors?', answer: 'Ein Squad-building Bullet-Heaven-Roguelike von Awesome Games Studio.'},
      {question: 'Wie groß kann ein Squad werden?', answer: 'Eine Startfigur und bis zu zwei SOS-Rekruten ergeben maximal drei Überlebende.'},
      {question: 'Wie viele Überlebende enthält Version 1.0?', answer: 'Die Recherche bestätigt neun spielbare Überlebende.'},
      {question: 'Wie schalte ich Ranger frei?', answer: 'Die offiziellen Entwicklernotizen nennen Survival Level 175.'}
    ]
  }
};

function buildLocalizedData(locale: Exclude<Locale, 'en'>): HomeData {
  const translation = translations[locale];

  return {
    ...englishData,
    hero: {
      ...englishData.hero,
      eyebrow: translation.hero.eyebrow,
      description: translation.hero.description,
      primaryAction: {...englishData.hero.primaryAction, label: translation.hero.primary},
      secondaryAction: {...englishData.hero.secondaryAction, label: translation.hero.secondary},
      tertiaryAction: {...englishData.hero.tertiaryAction, label: translation.hero.tertiary},
      videoAction: {...englishData.hero.videoAction, label: translation.hero.video},
      scrollLabel: translation.hero.scrollLabel
    },
    facts: translation.facts,
    news: translation.news,
    faq: translation.faq,
    finalCta: {
      ...englishData.finalCta,
      eyebrow: translation.final.eyebrow,
      title: translation.final.title,
      description: translation.final.description,
      primaryAction: {...englishData.finalCta.primaryAction, label: translation.final.primary},
      secondaryAction: {...englishData.finalCta.secondaryAction, label: translation.final.secondary}
    }
  };
}

const russianBaseData = buildLocalizedData('ru');

const russianData: HomeData = {
  ...russianBaseData,
  hero: {
    ...russianBaseData.hero,
    primaryAction: {label: 'Открыть сборки', href: '/builds/'},
    secondaryAction: {label: 'Сравнить выживших', href: '/characters/'},
    tertiaryAction: {label: 'Изучить дерево навыков', href: '/guides/skill-tree/'}
  },
  classes: [
    {
      badge: 'Прочность · Тяжёлое оружие',
      title: 'Танк',
      description: 'Стойкий выживший с исследованными ветками Минигана и Ракетницы.',
      href: '/characters/',
      action: 'Подробнее',
      icon: 'shield'
    },
    {
      badge: 'Дальний бой · Критические удары',
      title: 'Охотница',
      description: 'Сравните роль Охотницы с другими выжившими и подберите состав отряда.',
      href: '/characters/',
      action: 'Подробнее',
      icon: 'compass'
    },
    {
      badge: 'Ближний бой · Сборка',
      title: 'Призрак',
      description: 'Готовая русская сборка с оружием, навыками и командными синергиями.',
      href: '/characters/ghost/build/',
      action: 'Открыть сборку',
      icon: 'swords'
    },
    {
      badge: 'Версия 1.0 · Девятый выживший',
      title: 'Рейнджер',
      description: 'Добавлен в версии 1.0 и открывается на 175-м уровне выживания.',
      href: '/characters/',
      action: 'Подробнее',
      icon: 'users'
    }
  ],
  regions: [
    {
      badge: 'Арена версии 1.0',
      meta: 'Условие проверено',
      title: 'Биолаборатория',
      description: 'Открывается после прохождения Dead Terminal на стандартной сложности.',
      href: '/guides/skill-tree/',
      action: 'Изучить прогрессию',
      icon: 'map'
    },
    {
      badge: 'Режим версии 1.0',
      meta: 'Условие проверено',
      title: 'Натиск боссов',
      description: 'Открывается после прохождения каждой карты в режиме Hardcore.',
      href: '/builds/',
      action: 'Подобрать сборку',
      icon: 'trophy'
    }
  ],
  journey: [
    {
      title: 'Персонажи и выжившие',
      description: 'Сравните роли, оружие, бонусы лидера и условия открытия всех выживших.',
      href: '/characters/',
      action: 'Читать',
      icon: 'compass'
    },
    {
      title: 'Лучшие команды и синергии',
      description: 'Выберите лидера и дополните его совместимыми выжившими, оружием и способностями.',
      href: '/guides/best-team/',
      action: 'Читать',
      icon: 'users'
    },
    {
      title: 'Сборки версии 1.0',
      description: 'Используйте проверенные сборки и адаптируйте их под состав отряда и режим игры.',
      href: '/builds/',
      action: 'Читать',
      icon: 'zap'
    },
    {
      title: 'Дерево навыков и пятый ранг',
      description: 'Разберитесь в постоянной прогрессии, узлах синергии и развитии до пятого ранга.',
      href: '/guides/skill-tree/',
      action: 'Читать',
      icon: 'trophy'
    }
  ],
  tools: [
    {
      badge: 'Команды',
      title: 'Лучший состав',
      description: 'Соберите отряд до трёх выживших вокруг совместимых способностей и синергий.',
      href: '/guides/best-team/',
      action: 'Открыть',
      icon: 'users'
    },
    {
      badge: 'Сборки',
      title: 'Центр сборок 1.0',
      description: 'Выберите проверенную основу сборки для актуальной версии игры.',
      href: '/builds/',
      action: 'Открыть',
      icon: 'wrench'
    },
    {
      badge: 'Персонаж',
      title: 'Сборка Призрака',
      description: 'Оружие, навыки и командные сочетания для сильной сборки ближнего боя.',
      href: '/characters/ghost/build/',
      action: 'Открыть',
      icon: 'swords'
    },
    {
      badge: 'Прогрессия',
      title: 'Дерево навыков',
      description: 'Развитие до пятого ранга и выбор узлов для постоянного усиления.',
      href: '/guides/skill-tree/',
      action: 'Открыть',
      icon: 'network'
    },
    {
      badge: 'Отряд',
      title: 'Дружба и Team Bond',
      description: 'Как дружба и командная связь влияют на совместную силу выживших.',
      href: '/guides/friendship-and-team-bond/',
      action: 'Открыть',
      icon: 'heart'
    },
    {
      badge: 'Оружие',
      title: 'Ракетница или Миниган',
      description: 'Сравните два тяжёлых оружия и выберите подходящую ветку улучшений.',
      href: '/weapons/rocket-launcher-and-minigun/',
      action: 'Открыть',
      icon: 'swords'
    }
  ],
  guides: [
    {category: 'Команды', title: 'Лучший отряд и синергии', href: '/guides/best-team/', action: 'Читать'},
    {category: 'Сборки', title: 'Сборки версии 1.0', href: '/builds/', action: 'Читать'},
    {category: 'Персонаж', title: 'Сборка Призрака', href: '/characters/ghost/build/', action: 'Читать'},
    {category: 'Прогрессия', title: 'Дерево навыков и пятый ранг', href: '/guides/skill-tree/', action: 'Читать'},
    {category: 'Прогрессия', title: 'Дружба и Team Bond', href: '/guides/friendship-and-team-bond/', action: 'Читать'},
    {category: 'Оружие', title: 'Ракетница или Миниган', href: '/weapons/rocket-launcher-and-minigun/', action: 'Читать'}
  ],
  finalCta: {
    ...russianBaseData.finalCta,
    primaryAction: {label: 'Открыть сборки', href: '/builds/'}
  }
};

const dataByLocale: Record<Locale, HomeData> = {
  en: englishData,
  ru: russianData,
  es: buildLocalizedData('es'),
  de: buildLocalizedData('de')
};

const copyByLocale: Record<Locale, HomeCopy> = {
  en: englishCopy,
  ru: {about: translations.ru.about, ...translations.ru.sections},
  es: {about: translations.es.about, ...translations.es.sections},
  de: {about: translations.de.about, ...translations.de.sections}
};

const seoByLocale: Record<Locale, HomeSeo> = {
  en: enMessages.Home,
  ru: ruMessages.Home,
  es: esMessages.Home,
  de: deMessages.Home
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

export {GAME_NAME};
