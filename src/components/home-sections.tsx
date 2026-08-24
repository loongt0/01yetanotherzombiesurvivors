import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Code2,
  Compass,
  Gamepad2,
  Gem,
  Globe2,
  HeartPulse,
  Map,
  Mountain,
  Network,
  Radio,
  ScrollText,
  Server,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
  WandSparkles,
  Wifi,
  Wrench,
  Zap,
  type LucideIcon
} from 'lucide-react';

import {GameImage} from '@/components/game-image';
import {SectionTitle} from '@/components/section-title';
import {localizeHref, type Locale} from '@/i18n/routing';
import {
  getHomeCopy,
  getHomeData,
  type ActionData,
  type FeatureCard,
  type FeatureIcon,
  type GuideCardData
} from '@/lib/home-data';

const iconByName: Record<FeatureIcon, LucideIcon> = {
  book: BookOpen,
  calendar: CalendarDays,
  chart: ChartNoAxesColumnIncreasing,
  code: Code2,
  compass: Compass,
  gamepad: Gamepad2,
  gem: Gem,
  globe: Globe2,
  heart: HeartPulse,
  map: Map,
  mountain: Mountain,
  network: Network,
  radio: Radio,
  scroll: ScrollText,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  swords: Swords,
  trophy: Trophy,
  users: Users,
  wand: WandSparkles,
  wifi: Wifi,
  wrench: Wrench,
  zap: Zap
};

function hrefFor(locale: Locale, href: string): string {
  return href.startsWith('http') ? href : localizeHref(locale, href);
}

function ActionLink({
  action,
  locale,
  className
}: {
  action: ActionData;
  locale: Locale;
  className: string;
}) {
  const external = action.href.startsWith('http');

  return (
    <a
      className={className}
      href={hrefFor(locale, action.href)}
      {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    >
      {action.label}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

function FeatureCardLink({
  card,
  locale,
  variant = 'default'
}: {
  card: FeatureCard;
  locale: Locale;
  variant?: 'class' | 'default' | 'region' | 'tool';
}) {
  const Icon = iconByName[card.icon];

  return (
    <a
      className={`${variant === 'region' ? 'card-grad' : 'card'} home-card home-card--${variant}`}
      href={hrefFor(locale, card.href)}
    >
      <div className="home-card__topline">
        {card.badge ? <span className="home-card__badge">{card.badge}</span> : null}
        {card.meta ? <span className="home-card__meta">{card.meta}</span> : null}
      </div>
      <span className="home-card__icon" aria-hidden="true">
        <Icon size={variant === 'region' ? 30 : 24} strokeWidth={1.5} />
      </span>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <span className="home-card__action">
        {card.action}
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}

function GuideCard({card, locale}: {card: GuideCardData; locale: Locale}) {
  return (
    <a className="card guide-card" href={hrefFor(locale, card.href)}>
      <span className="guide-card__category">{card.category}</span>
      <h3>{card.title}</h3>
      <span className="home-card__action">
        {card.action}
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}

export function HomeSections({locale}: {locale: Locale}) {
  const data = getHomeData(locale);
  const copy = getHomeCopy(locale);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__aurora" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <div className="home-hero__content">
          <div className="home-hero__emblem" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="home-hero__image-wrap">
            <GameImage
              src="/icon.png"
              alt="Farever"
              width={154}
              height={152}
              className="home-hero__image"
            />
          </div>
          <div className="home-hero__eyebrow">
            <span className="diamond-bullet" aria-hidden="true" />
            {data.hero.eyebrow}
            <span className="diamond-bullet" aria-hidden="true" />
          </div>
          <h1>
            <span>{data.hero.titleLead}</span>{' '}
            <span className="text-gradient">{data.hero.titleAccent}</span>
          </h1>
          <p>{data.hero.description}</p>
          <div className="home-hero__actions">
            <ActionLink
              action={data.hero.primaryAction}
              locale={locale}
              className="btn-primary"
            />
            <ActionLink
              action={data.hero.secondaryAction}
              locale={locale}
              className="btn-ghost"
            />
          </div>
          <dl className="home-hero__stats">
            {data.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dd>{stat.value}</dd>
                <dt>{stat.label}</dt>
              </div>
            ))}
          </dl>
          <a className="home-hero__scroll" href="#about-farever">
            {data.hero.scrollLabel}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="shell-container home-sections">
        <section className="home-section" id="about-farever">
          <SectionTitle eyebrow={copy.about.eyebrow} title={copy.about.title} />
          <div className="about-grid">
            <div className="about-copy">
              {copy.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="card facts-card" aria-label={copy.about.factsLabel}>
              <h3>{copy.about.factsLabel}</h3>
              <dl>
                {data.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.classes.eyebrow} title={copy.classes.title} />
          <div className="home-grid home-grid--four">
            {data.classes.map((card) => (
              <FeatureCardLink
                key={card.title}
                card={card}
                locale={locale}
                variant="class"
              />
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.regions.eyebrow} title={copy.regions.title} />
          <div className="home-grid home-grid--two">
            {data.regions.map((card) => (
              <FeatureCardLink
                key={card.title}
                card={card}
                locale={locale}
                variant="region"
              />
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.journey.eyebrow} title={copy.journey.title} />
          <div className="home-grid home-grid--three">
            {data.journey.map((card) => (
              <FeatureCardLink key={card.title} card={card} locale={locale} />
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.tools.eyebrow} title={copy.tools.title} />
          <div className="home-grid home-grid--three">
            {data.tools.map((card) => (
              <FeatureCardLink
                key={card.title}
                card={card}
                locale={locale}
                variant="tool"
              />
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.guides.eyebrow} title={copy.guides.title} />
          <div className="home-grid home-grid--three">
            {data.guides.map((card) => (
              <GuideCard key={card.title} card={card} locale={locale} />
            ))}
          </div>
          <div className="home-section__action">
            <a className="btn-ghost" href={localizeHref(locale, '/guides/')}>
              {copy.guides.all}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.news.eyebrow} title={copy.news.title} />
          <div className="news-list">
            {data.news.map((item) => (
              <article className="news-item" key={`${item.date}-${item.text}`}>
                <time>{item.date}</time>
                <span className="diamond-bullet" aria-hidden="true" />
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
          <div className="faq-list">
            {data.faq.map((item, index) => (
              <article className="faq-item" key={item.question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="home-section__action">
            <a className="btn-ghost" href={localizeHref(locale, '/faq/')}>
              {copy.faq.all}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta__glow" aria-hidden="true" />
          <div className="final-cta__content">
            <span>{data.finalCta.eyebrow}</span>
            <h2>{data.finalCta.title}</h2>
            <div className="home-hero__actions">
              <ActionLink
                action={data.finalCta.primaryAction}
                locale={locale}
                className="btn-primary"
              />
              <ActionLink
                action={data.finalCta.secondaryAction}
                locale={locale}
                className="btn-ghost"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
