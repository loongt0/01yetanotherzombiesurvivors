import {getLocale} from 'next-intl/server';

import {localizeHref, routing, type Locale} from '@/i18n/routing';
import {getSiteMessages} from '@/lib/site-data';

export default async function NotFound() {
  const requestedLocale = await getLocale();
  const locale = routing.locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;
  const messages = getSiteMessages(locale).NotFound;

  return (
    <main className="not-found">
      <div className="noise" aria-hidden="true" />
      <div className="not-found__content">
        <div className="not-found__eyebrow">{messages.eyebrow}</div>
        <h1 className="text-gradient">{messages.title}</h1>
        <p>{messages.description}</p>
        <div className="not-found__actions">
          <a className="btn-primary" href={localizeHref(locale, '/')}>
            {messages.home}
          </a>
          <a
            className="btn-ghost"
            href={localizeHref(locale, '/beginner-guide/')}
          >
            {messages.beginnerGuide}
          </a>
        </div>
      </div>
    </main>
  );
}
