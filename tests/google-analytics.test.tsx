import {Children, isValidElement, type ReactNode} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import LocaleLayout from '@/app/[locale]/layout';

vi.mock('@/i18n/navigation', () => ({
  Link: () => null,
  usePathname: () => '/'
}));

type ScriptProps = {
  children?: ReactNode;
  id?: string;
  src?: string;
  strategy?: string;
};

async function getLayoutScripts() {
  const layout = await LocaleLayout({
    children: <main>Guide content</main>,
    params: Promise.resolve({locale: 'en'})
  });
  const body = layout.props.children;

  return Children.toArray(body.props.children).filter(
    (child): child is React.ReactElement<ScriptProps> =>
      isValidElement<ScriptProps>(child) &&
      (child.props.id === 'google-analytics-init' ||
        child.props.src?.includes('googletagmanager.com/gtag/js') === true)
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('optional Google Analytics 4 tracking', () => {
  it('loads the Google tag and configures the supplied GA4 measurement ID', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST12345');

    const scripts = await getLayoutScripts();
    const loader = scripts.find((script) => script.props.src);
    const initializer = scripts.find(
      (script) => script.props.id === 'google-analytics-init'
    );

    expect(scripts).toHaveLength(2);
    expect(loader?.props.src).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-TEST12345'
    );
    expect(loader?.props.strategy).toBe('afterInteractive');
    expect(initializer?.props.strategy).toBe('afterInteractive');
    expect(initializer?.props.children).toContain(
      "gtag('config', 'G-TEST12345')"
    );
  });

  it.each([undefined, '', 'UA-123456', 'G-TEST12345<script>'])(
    'omits Google Analytics when the measurement ID is missing or invalid: %s',
    async (measurementId) => {
      if (measurementId === undefined) {
        delete process.env.NEXT_PUBLIC_GA_ID;
      } else {
        vi.stubEnv('NEXT_PUBLIC_GA_ID', measurementId);
      }

      expect(await getLayoutScripts()).toEqual([]);
    }
  );
});
