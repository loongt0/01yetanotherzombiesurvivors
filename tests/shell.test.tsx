import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {GameImage} from '@/components/game-image';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    locale,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    locale?: string;
  }) => (
    <a href={locale ? `/${locale}${href === '/' ? '' : href}` : href} {...props} />
  ),
  usePathname: () => '/characters/'
}));

describe('researched shared shell', () => {
  it('renders both matrix-derived navigation tiers and the real Steam action', () => {
    const {container} = render(<SiteHeader locale="en" />);

    expect(
      screen.getAllByRole('link', {name: 'Characters'}).every((link) =>
        link.getAttribute('href') === '/characters/'
      )
    ).toBe(true);
    expect(screen.getAllByRole('link', {name: 'Best Team'})).toHaveLength(2);
    expect(screen.getByRole('link', {name: /Play on Steam/i})).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/'
    );
    expect(container.querySelectorAll('.mobile-navigation a')).toHaveLength(14);
  });

  it('offers exactly one language dropdown in the header and none in the footer', () => {
    const {container} = render(<><SiteHeader locale="ru" /><SiteFooter locale="ru" /></>);
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
    expect(screen.getByRole('combobox', {name: 'Язык'})).toHaveValue('ru');
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(container.querySelector('header .language-switcher')).not.toBeNull();
    expect(container.querySelector('footer .language-switcher')).toBeNull();
  });

  it('keeps the complete navigation visible in Russian with English fallbacks', () => {
    const header = render(<SiteHeader locale="ru" />);
    const headerHrefs = Array.from(header.container.querySelectorAll('a[href^="/"]')).map(
      (link) => link.getAttribute('href')
    );

    expect(headerHrefs).toContain('/ru/characters/');
    expect(headerHrefs).toContain('/ru/builds/');
    expect(headerHrefs).toContain('/ru/guides/best-team/');
    expect(headerHrefs).toContain('/items/');
    expect(headerHrefs).toContain('/weapons/');
    expect(headerHrefs).toContain('/tools/');
    expect(headerHrefs).toContain('/guides/');

    header.unmount();

    const footer = render(<SiteFooter locale="ru" />);
    const contentHrefs = Array.from(
      footer.container.querySelectorAll('.site-footer__grid a[href^="/"]')
    ).map((link) => link.getAttribute('href'));

    expect(contentHrefs.every((href) => href?.startsWith('/ru/'))).toBe(true);
    expect(contentHrefs).toContain('/ru/weapons/rocket-launcher-and-minigun/');
    expect(footer.container.querySelector('.language-switcher')).toBeNull();
  });

  it('keeps image dimensions and alt context after a load failure', () => {
    render(<GameImage src="/missing-art.png" alt="Survivor Ranger" width={320} height={180} />);
    fireEvent.error(screen.getByRole('img', {name: 'Survivor Ranger'}));

    expect(
      screen.getByRole('img', {name: /Survivor Ranger.*image unavailable/i})
    ).toHaveStyle({width: '320px', height: '180px'});
  });

  it('separates an image intrinsic ratio from its measured rendered box', () => {
    const view = render(
      <GameImage
        src="/icon.png"
        alt="Yet Another Zombie Survivors"
        width={42}
        height={42}
        intrinsicWidth={154}
        intrinsicHeight={152}
      />
    );
    const image = view.container.querySelector('img');

    expect(image).toHaveAttribute('width', '154');
    expect(image).toHaveAttribute('height', '152');
    expect(image).toHaveStyle({width: '42px', height: '42px'});
  });

  it('can fill a responsive wrapper without overriding its measured box', () => {
    const view = render(
      <GameImage
        src="/icon.png"
        alt="Yet Another Zombie Survivors"
        width={144}
        height={144}
        intrinsicWidth={154}
        intrinsicHeight={152}
        fillContainer
      />
    );

    expect(view.container.querySelector('img')).toHaveStyle({
      width: '100%',
      height: '100%'
    });
  });
});
