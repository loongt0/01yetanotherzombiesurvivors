import {GameImage} from '@/components/game-image';
import {localizeHref, type Locale} from '@/i18n/routing';
import {
  getSiteMessages,
  primaryNavigation,
  STEAM_URL,
  utilityNavigation
} from '@/lib/site-data';

export function SiteHeader({locale}: {locale: Locale}) {
  const messages = getSiteMessages(locale).Header;
  const compactNavigation = [...primaryNavigation, ...utilityNavigation];

  return (
    <header className="site-header">
      <div className="site-header__backdrop" aria-hidden="true" />
      <div className="site-header__rule" aria-hidden="true" />

      <div className="site-header__primary shell-container">
        <a className="site-brand" href={localizeHref(locale, '/')}>
          <span className="site-brand__image">
            <GameImage
              src="/icon.png"
              alt="Farever"
              width={42}
              height={42}
              intrinsicWidth={154}
              intrinsicHeight={152}
              loading="eager"
              className="site-brand__icon"
            />
          </span>
          <span className="site-brand__copy">
            <span className="site-brand__name">Farever</span>
            <span className="site-brand__subtitle">{messages.subtitle}</span>
          </span>
        </a>

        <nav className="primary-navigation" aria-label={messages.primaryLabel}>
          {primaryNavigation.map((item) => (
            <a key={item.key} href={localizeHref(locale, item.href)}>
              {messages.navigation[item.key]}
              <span aria-hidden="true" />
            </a>
          ))}
        </nav>

        <a
          className="btn-primary site-header__steam"
          href={STEAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {messages.steam}
        </a>
      </div>

      <nav className="utility-navigation" aria-label={messages.utilityLabel}>
        <div className="shell-container utility-navigation__inner">
          {utilityNavigation.map((item) => (
            <a key={item.key} href={localizeHref(locale, item.href)}>
              {messages.navigation[item.key]}
              <span aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>

      <nav
        className="mobile-navigation"
        aria-label={`${messages.primaryLabel} / ${messages.utilityLabel}`}
      >
        {compactNavigation.map((item) => (
          <a key={item.key} href={localizeHref(locale, item.href)}>
            {messages.navigation[item.key]}
          </a>
        ))}
      </nav>
    </header>
  );
}
