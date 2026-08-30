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

import {SectionTitle} from '@/components/section-title';
import {localizeAvailableHref, type Locale} from '@/i18n/routing';
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
  return href.startsWith('http') ? href : localizeAvailableHref(locale, href);
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
  const action = (
    <span className="home-card__action">
      {card.action}
      <ArrowRight size={14} aria-hidden="true" />
    </span>
  );

  let content;

  if (variant === 'class') {
    content = (
      <>
        <div className="home-card__glow home-card__glow--class" aria-hidden="true" />
        <div className="home-card__content">
          <span className="home-card__icon home-card__icon--class" aria-hidden="true">
            <Icon size={26} />
          </span>
          <span className="home-card__badge">{card.badge}</span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {action}
        </div>
      </>
    );
  } else if (variant === 'region') {
    content = (
      <>
        <div className="home-card__glow home-card__glow--region" aria-hidden="true" />
        <div className="home-card__content">
          <div className="home-card__topline">
            <span className="home-card__badge">{card.badge}</span>
            <span className="home-card__meta">{card.meta}</span>
          </div>
          <h3>{card.title}</h3>
          <div className="ornament home-card__ornament" aria-hidden="true">
            <span className="diamond" />
          </div>
          <p>{card.description}</p>
          {action}
        </div>
      </>
    );
  } else if (variant === 'tool') {
    content = (
      <>
        <div className="home-card__glow home-card__glow--tool" aria-hidden="true" />
        <div className="home-card__content">
          <div className="home-card__topline home-card__topline--tool">
            <span className="home-card__icon home-card__icon--compact" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="home-card__badge home-card__badge--cyan">{card.badge}</span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {action}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="home-card__heading-row">
          <span className="home-card__icon home-card__icon--compact" aria-hidden="true">
            <Icon size={22} />
          </span>
          <h3>{card.title}</h3>
        </div>
        <p>{card.description}</p>
        {action}
      </>
    );
  }

  return (
    <a
      className={`${variant === 'region' ? 'card-grad' : 'card'} home-card home-card--${variant}`}
      href={hrefFor(locale, card.href)}
    >
      {content}
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
        <div className="home-hero__emblem" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="noise" aria-hidden="true" />
        <div className="home-hero__content">
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
          <div className="home-hero__secondary-links">
            <ActionLink
              action={data.hero.tertiaryAction}
              locale={locale}
              className="home-hero__text-link"
            />
            <ActionLink
              action={data.hero.videoAction}
              locale={locale}
              className="home-hero__text-link"
            />
          </div>
          <dl className="home-hero__stats">
            {data.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <a className="home-hero__scroll" href="#about-game">
            {data.hero.scrollLabel}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="shell-container home-sections">
        <section className="home-section" id="about-game">
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
            <a className="btn-ghost" href={localizeAvailableHref(locale, '/guides/')}>
              {copy.guides.all}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.news.eyebrow} title={copy.news.title} />
          <div className="news-list">
            {data.news.map((item) => (
              <article className="card news-item" key={`${item.date}-${item.text}`}>
                <time>{item.date}</time>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionTitle eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
          <div className="faq-list">
            {data.faq.map((item) => (
              <article className="card faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="home-section__action">
            <a className="btn-ghost" href={localizeAvailableHref(locale, '/guides/')}>
              {copy.faq.all}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta__glow" aria-hidden="true" />
          <div className="final-cta__content">
            <div className="final-cta__eyebrow">
              <span className="diamond-bullet" aria-hidden="true" />
              {data.finalCta.eyebrow}
              <span className="diamond-bullet" aria-hidden="true" />
            </div>
            <h2>{data.finalCta.title}</h2>
            <p>{data.finalCta.description}</p>
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
