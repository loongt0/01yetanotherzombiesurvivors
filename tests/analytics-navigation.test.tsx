import {fireEvent, render} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {AnalyticsNavigationTracker} from '@/components/analytics-navigation-tracker';

afterEach(() => {
  delete window.gtag;
});

describe('language-aware analytics navigation tracking', () => {
  it('records an English fallback article selected from the Russian interface', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(<AnalyticsNavigationTracker interfaceLocale="ru" contentLocale="ru" />);
    const main = document.createElement('main');
    const link = document.createElement('a');
    link.href = '/guides/max-level-and-rank-5/';
    link.textContent = 'Max level guide';
    link.addEventListener('click', (event) => event.preventDefault());
    main.append(link);
    document.body.append(main);

    fireEvent.click(link);

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'select_content',
      expect.objectContaining({
        content_type: 'internal_page',
        item_id: '/guides/max-level-and-rank-5/',
        interface_locale: 'ru',
        source_content_locale: 'ru',
        destination_content_locale: 'en',
        navigation_area: 'main'
      })
    );

    main.remove();
  });

  it('ignores external and same-page links', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(<AnalyticsNavigationTracker interfaceLocale="ru" contentLocale="en" />);
    const external = document.createElement('a');
    external.href = 'https://example.com/';
    external.textContent = 'External';
    const samePage = document.createElement('a');
    samePage.href = `${window.location.pathname}#details`;
    samePage.textContent = 'Same page';
    for (const link of [external, samePage]) {
      link.addEventListener('click', (event) => event.preventDefault());
      document.body.append(link);
    }

    fireEvent.click(external);
    fireEvent.click(samePage);

    expect(gtag).not.toHaveBeenCalled();

    external.remove();
    samePage.remove();
  });
});
