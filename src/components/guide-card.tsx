import type {GuideCardRecord} from '@/content/registry';
import {localizeAvailableHref, type Locale} from '@/i18n/routing';

type GuideCardProps = {
  card: GuideCardRecord;
  locale: Locale;
};

export function GuideCard({card, locale}: GuideCardProps) {
  return (
    <a
      className="card guide-directory-card"
      href={localizeAvailableHref(locale, card.href)}
    >
      <span className="guide-directory-card__eyebrow">{card.eyebrow}</span>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </a>
  );
}
