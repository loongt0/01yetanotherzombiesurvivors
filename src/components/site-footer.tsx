import {GameImage} from '@/components/game-image';
import {LanguageSwitcher} from '@/components/language-switcher';
import {localizeHref, type Locale} from '@/i18n/routing';
import {
  footerGroups,
  getSiteMessages,
  STEAM_URL
} from '@/lib/site-data';

export function SiteFooter({locale}: {locale: Locale}) {
  const messages = getSiteMessages(locale).Footer;

  return (
    <footer className="site-footer">
      <div className="site-footer__rule" aria-hidden="true" />
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="shell-container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__about">
            <div className="site-footer__brand">
              <GameImage
                src="/icon.png"
                alt="Farever"
                width={36}
                height={36}
                className="site-footer__icon"
              />
              <div>
                <div className="site-footer__name">Farever</div>
                <div className="site-footer__tagline">Wiki · 2026</div>
              </div>
            </div>
            <p>{messages.about}</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.key} aria-label={messages.groups[group.key]}>
              <h2>{messages.groups[group.key]}</h2>
              <ul>
                {group.links.map((item) => (
                  <li key={`${group.key}-${item.href}`}>
                    <a href={localizeHref(locale, item.href)}>
                      {messages.links[item.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__languages">
          <h2>{messages.languagesLabel}</h2>
          <LanguageSwitcher locale={locale} />
        </div>

        <div className="ornament" aria-hidden="true">
          <span className="diamond" />
        </div>

        <div className="site-footer__legal">
          <span>{messages.copyright}</span>
          <a href={STEAM_URL} target="_blank" rel="noopener noreferrer">
            {messages.steam}
          </a>
        </div>
      </div>
    </footer>
  );
}
