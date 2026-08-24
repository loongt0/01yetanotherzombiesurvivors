import {ArrowRight} from 'lucide-react';

import type {GuideCardRecord} from '@/content/registry';
import {localizeHref, type Locale} from '@/i18n/routing';

type GuideCardProps = {
  card: GuideCardRecord;
  locale: Locale;
  readLabel: string;
};

export function GuideCard({card, locale, readLabel}: GuideCardProps) {
  return (
    <a
      className="card guide-directory-card"
      href={localizeHref(locale, card.href)}
    >
      <span className="guide-directory-card__eyebrow">{card.eyebrow}</span>
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <span className="guide-directory-card__action">
        {readLabel}
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}
