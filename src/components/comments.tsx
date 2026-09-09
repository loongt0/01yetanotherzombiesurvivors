'use client';

import {useEffect, useState} from 'react';
import type {Locale} from '@/i18n/routing';

const HOST = 'https://comments.yetanotherzombiesurvivors.world';
const copy = {
  en: {title: 'Community discussion', hint: 'Share a tip, ask a question, or suggest a correction.', loading: 'Loading comments…', error: 'Comments could not load. Please refresh to try again.'},
  ru: {title: 'Обсуждение', hint: 'Поделитесь советом, задайте вопрос или предложите исправление.', loading: 'Загрузка комментариев…', error: 'Не удалось загрузить комментарии. Обновите страницу.'},
  es: {title: 'Conversación de la comunidad', hint: 'Comparte un consejo, haz una pregunta o sugiere una corrección.', loading: 'Cargando comentarios…', error: 'No se pudieron cargar los comentarios. Actualiza la página.'},
  de: {title: 'Diskussion', hint: 'Teile einen Tipp, stelle eine Frage oder schlage eine Korrektur vor.', loading: 'Kommentare werden geladen…', error: 'Kommentare konnten nicht geladen werden. Bitte lade die Seite neu.'}
};

type Config = {host: string; site_id: string; url: string; page_title: string; locale: string; theme: 'dark'};
type Instance = {destroy: () => void};
declare global {
  interface Window {
    remark_config?: Config;
    REMARK42?: {createInstance: (config: Config) => Instance | undefined; destroy?: () => void};
  }
}

export function Comments({url, title, locale}: {url: string; title: string; locale: Locale}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const text = copy[locale];

  useEffect(() => {
    const config: Config = {host: HOST, site_id: 'remark', url, page_title: title, locale, theme: 'dark'};
    let disposed = false;
    let instance: Instance | undefined;
    window.remark_config = config;
    const mount = () => {
      if (disposed || !window.REMARK42) return;
      // The embed script may auto-mount on first load. Recreate it with this route's config.
      window.REMARK42.destroy?.();
      instance = window.REMARK42.createInstance(config);
      setStatus(instance ? 'ready' : 'error');
    };
    let script: HTMLScriptElement | undefined;
    if (window.REMARK42) mount();
    else {
      script = document.createElement('script');
      script.src = `${HOST}/web/embed.js`;
      script.async = true;
      script.onload = mount;
      script.onerror = () => {if (!disposed) setStatus('error');};
      document.head.appendChild(script);
    }
    return () => {
      disposed = true;
      instance?.destroy();
      script?.remove();
    };
  }, [url, title, locale]);

  return (
    <section className="comments-section" aria-label={text.title}>
      <h2>{text.title}</h2>
      <p>{text.hint}</p>
      {status !== 'ready' && <p role="status">{status === 'error' ? text.error : text.loading}</p>}
      <div id="remark42" />
      <noscript>Please enable JavaScript to read and post comments.</noscript>
    </section>
  );
}
