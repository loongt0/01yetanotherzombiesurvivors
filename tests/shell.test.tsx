import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {GameImage} from '@/components/game-image';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/classes/'
}));

describe('shared shell', () => {
  it('renders both navigation tiers and the Steam action', () => {
    const {container} = render(<SiteHeader locale="en" />);

    expect(
      screen.getAllByRole('link', {name: 'Classes'}).every((link) =>
        link.getAttribute('href') === '/classes/'
      )
    ).toBe(true);
    expect(
      screen.getAllByRole('link', {name: 'Server Status'})
    ).toHaveLength(2);
    expect(screen.getByRole('link', {name: /Play on Steam/i})).toHaveAttribute(
      'target',
      '_blank'
    );
    expect(
      container.querySelectorAll('.mobile-navigation a')
    ).toHaveLength(15);
  });

  it('labels the footer and all four locales', () => {
    render(<SiteFooter locale="en" />);

    expect(
      screen.getByText(/Unofficial fan-made guide/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', {name: /Languages/i})
    ).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /English/i})).toHaveAttribute(
      'href',
      '/classes/'
    );
    expect(screen.getByRole('link', {name: /Deutsch/i})).toHaveAttribute(
      'href',
      '/de/classes/'
    );
    expect(screen.getByRole('link', {name: /Español/i})).toHaveAttribute(
      'href',
      '/es/classes/'
    );
    expect(screen.getByRole('link', {name: /Français/i})).toHaveAttribute(
      'href',
      '/fr/classes/'
    );
  });

  it('keeps image dimensions and alt context after a load failure', () => {
    render(
      <GameImage
        src="/missing-art.png"
        alt="Skyover Island"
        width={320}
        height={180}
      />
    );

    fireEvent.error(screen.getByRole('img', {name: 'Skyover Island'}));

    const fallback = screen.getByRole('img', {
      name: /Skyover Island.*image unavailable/i
    });
    expect(fallback).toHaveStyle({width: '320px', height: '180px'});
  });
});
