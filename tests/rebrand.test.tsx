import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

import {render, screen, within} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {metadata as siteMetadata} from '@/app/[locale]/layout';
import HomePage, {generateMetadata} from '@/app/[locale]/page';
import GuidesPage from '@/app/[locale]/guides/page';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {routing} from '@/i18n/routing';
import {STEAM_URL} from '@/lib/site-data';

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    locale,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    locale?: string;
  }) => (
    <a
      href={locale ? `/${locale}${href === '/' ? '' : href}` : href}
      {...props}
    />
  ),
  usePathname: () => '/characters/'
}));

describe('researched Yet Another Zombie Survivors website', () => {
  it('uses the researched English, Russian, Spanish and German locales', () => {
    expect(routing.locales).toEqual(['en', 'ru', 'es', 'de']);
  });

  it('publishes the finished browser, Apple and Android icon set throughout the site', () => {
    expect(siteMetadata.icons).toEqual({
      icon: [
        {url: '/favicon.ico'},
        {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
        {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
        {url: '/icon.png', sizes: '512x512', type: 'image/png'}
      ],
      apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}]
    });
    expect(siteMetadata.manifest).toBe('/site.webmanifest');

    for (const asset of [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'site.webmanifest'
    ]) {
      expect(existsSync(path.join(process.cwd(), 'public', asset)), asset).toBe(true);
    }

    const manifest = JSON.parse(
      readFileSync(path.join(process.cwd(), 'public', 'site.webmanifest'), 'utf8')
    );
    expect(manifest.name).toBe('Yet Another Zombie Survivors Wiki');
    expect(manifest.icons).toEqual([
      {src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png'},
      {src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png'}
    ]);
  });

  it('renders the researched homepage without old-game copy or unsupported numbers', async () => {
    const {container} = render(
      await HomePage({params: Promise.resolve({locale: 'en'})})
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Yet Another Zombie Survivors'
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Awesome Games Studio')).toBeInTheDocument();
    expect(within(container).getAllByText('600,000+')).toHaveLength(2);
    expect(within(container).getAllByText('12,000+')).toHaveLength(2);
    expect(container.querySelector('.facts-card__codes')).toBeNull();
    expect(container.textContent).not.toMatch(/[\u3400-\u9fff]/u);
    expect(container.textContent).not.toMatch(/farever|shiro games|siagarta/i);
    expect(container.textContent).not.toContain('229 Achievements');
  });

  it('publishes the researched home SEO title, description and keywords', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({locale: 'en'})
    });

    expect(metadata.title).toBe(
      'Yet Another Zombie Survivors Wiki — Guides & Builds'
    );
    expect(metadata.description).toBe(
      'Master Yet Another Zombie Survivors with beginner guides, survivor builds, tier lists, team synergies, item tips, achievements, weapons, and unlocks.'
    );
    expect(metadata.keywords).toEqual([
      'Yet Another Zombie Survivors',
      'YAZS',
      'Steam',
      'guide',
      'tier list',
      'builds',
      'characters',
      'items'
    ]);
    expect(metadata.metadataBase?.toString()).toBe(
      'https://yetanotherzombiesurvivors.world/'
    );
    expect(metadata.alternates?.canonical).toBe(
      'https://yetanotherzombiesurvivors.world/'
    );
    expect(metadata.openGraph?.url).toBe(
      'https://yetanotherzombiesurvivors.world/'
    );
  });

  it('links the researched official Steam, Discord and YouTube resources', () => {
    const {container} = render(
      <>
        <SiteHeader locale="en" />
        <SiteFooter locale="en" />
      </>
    );

    expect(STEAM_URL).toBe(
      'https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/'
    );
    expect(
      container.querySelector('a[href="https://discord.com/invite/m4JfXuS"]')
    ).not.toBeNull();
    expect(
      container.querySelector(
        'a[href="https://youtube.com/user/AwesomeGamesStudio"]'
      )
    ).not.toBeNull();
    expect(container.textContent).not.toMatch(/farever|shiro games/i);
  });

  it('lists real researched guide topics instead of the old game articles', async () => {
    const {container} = render(
      await GuidesPage({params: Promise.resolve({locale: 'en'})})
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Yet Another Zombie Survivors Guides'
      })
    ).toBeInTheDocument();
    expect(
      within(container).getByRole('link', {name: /Best Team/i})
    ).toHaveAttribute('href', '/guides/best-team/');
    expect(container.textContent).not.toMatch(/farever|siagarta|shiro/i);
  });
});
