import {PageHero} from '@/components/page-hero';
import type {Locale} from '@/i18n/routing';
import {SITE_NAME} from '@/lib/site-data';

type LegalKind = 'privacy' | 'terms';

const copy: Record<Locale, Record<LegalKind, {title: string; description: string; body: string[]}>> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      description: `Privacy information for ${SITE_NAME}.`,
      body: [
        'This is an independent fan-made guide website and is not affiliated with Awesome Games Studio.'
      ]
    },
    terms: {
      title: 'Terms of Service',
      description: `Terms information for ${SITE_NAME}.`,
      body: [
        'This website provides independent fan-made game guides based on researched public information.',
        'Game names, artwork, and trademarks belong to their respective owners.'
      ]
    }
  },
  ru: {
    privacy: {title: 'Политика конфиденциальности', description: `Сведения о конфиденциальности для ${SITE_NAME}.`, body: ['Это независимый фанатский сайт, не связанный с Awesome Games Studio.']},
    terms: {title: 'Условия использования', description: `Условия использования ${SITE_NAME}.`, body: ['Сайт публикует независимые фанатские материалы по проверенным открытым источникам.']}
  },
  es: {
    privacy: {title: 'Política de privacidad', description: `Información de privacidad de ${SITE_NAME}.`, body: ['Este es un sitio independiente de fans y no está afiliado con Awesome Games Studio.']},
    terms: {title: 'Términos de servicio', description: `Términos de uso de ${SITE_NAME}.`, body: ['Este sitio publica guías independientes basadas en información pública contrastada.']}
  },
  de: {
    privacy: {title: 'Datenschutz', description: `Datenschutzhinweise für ${SITE_NAME}.`, body: ['Dies ist eine unabhängige Fanseite ohne Verbindung zu Awesome Games Studio.']},
    terms: {title: 'Nutzungsbedingungen', description: `Nutzungsbedingungen für ${SITE_NAME}.`, body: ['Diese Website bietet unabhängige Fan-Guides auf Basis recherchierter öffentlicher Informationen.']}
  }
};

export function LegalPage({kind, locale}: {kind: LegalKind; locale: Locale}) {
  const page = copy[locale][kind];

  return (
    <main className="classes-page">
      <article className="classes-article prose-game">
        <PageHero eyebrow={SITE_NAME} title={page.title} description={page.description} />
        <div className="classes-article__body">
          {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  );
}
