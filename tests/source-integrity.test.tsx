import {render} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import MatrixPage from '@/app/[locale]/[...rest]/page';
import CharactersPage from '@/app/[locale]/characters/page';
import GuidesPage from '@/app/[locale]/guides/page';
import HomePage from '@/app/[locale]/page';
import PrivacyPage from '@/app/[locale]/privacy/page';
import TermsPage from '@/app/[locale]/terms/page';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {getGuideCards} from '@/content/registry';
import {routing} from '@/i18n/routing';

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

const researchedSourceHosts = new Set([
  'awesomegamesstudio.com',
  'cheatengine.net',
  'community.wemod.com',
  'steamcommunity.com',
  'store.steampowered.com',
  'www.idreamofindie.com',
  'www.nexusmods.com',
  'www.reddit.com',
  'www.wemod.com',
  'www.youtube.com',
  'yazs.awesomegamesstudio.com',
  'yetanotherzombie.wiki.gg'
]);

const researchedInternalPaths = new Set([
  '/',
  '/guides/',
  '/guides/tier-list/',
  '/guides/best-team/',
  '/guides/synergies/',
  '/guides/achievements/',
  '/guides/save-problem/',
  '/guides/sanji-the-rabbit/',
  '/characters/',
  '/characters/hidden-characters/',
  '/characters/ghost/',
  '/characters/huntress/',
  '/characters/huntress/upgrades/',
  '/items/',
  '/builds/',
  '/builds/general-points-build-1-0/',
  '/weapons/',
  '/weapons/upgrades/',
  '/weapons/attack-speed-vs-cooldown/',
  '/weapons/rocket-launcher-and-minigun/',
  '/tools/',
  '/tools/trainer/',
  '/tools/cheat-engine/',
  '/tools/mods/',
  '/privacy/',
  '/terms/'
]);

describe('source-verified public website', () => {
  it.each(routing.locales)(
    'renders the complete %s shell, homepage and legal pages without Chinese text',
    async (locale) => {
      const params = Promise.resolve({locale});
      const {container} = render(
        <>
          <SiteHeader locale={locale} />
          {await HomePage({params})}
          {await GuidesPage({params})}
          {await CharactersPage({params})}
          {await PrivacyPage({params})}
          {await TermsPage({params})}
          <SiteFooter locale={locale} />
        </>
      );

      expect(container.textContent).not.toMatch(/[\u3400-\u9fff]/u);
    }
  );

  it('links only researched pages and shows only the supplied game icon', async () => {
    const {container} = render(
      <>
        <SiteHeader locale="en" />
        {await HomePage({params: Promise.resolve({locale: 'en'})})}
        <SiteFooter locale="en" />
      </>
    );

    for (const link of container.querySelectorAll('a[href^="/"]')) {
      const href = link.getAttribute('href') ?? '';
      const normalized = href.replace(/^\/(?:en|ru|es|de)(?=\/)/u, '');

      expect(researchedInternalPaths.has(normalized), `${link.textContent}: ${href}`).toBe(true);
    }

    for (const image of container.querySelectorAll('img')) {
      const source = image.getAttribute('src') ?? '';
      expect(source.includes('icon.png'), source).toBe(true);
    }

    expect(container.textContent).not.toMatch(/redemption codes|redeem codes/iu);
    expect(container.querySelector('.facts-card__codes')).toBeNull();
  });

  it('keeps the site icon in the shared shell without presenting it as official hero artwork', async () => {
    const {container} = render(
      <>
        <SiteHeader locale="en" />
        {await HomePage({params: Promise.resolve({locale: 'en'})})}
        <SiteFooter locale="en" />
      </>
    );

    expect(container.querySelector('.home-hero img')).toBeNull();
    expect(container.querySelector('.site-header img')).not.toBeNull();
    expect(container.querySelector('.site-footer img')).not.toBeNull();
  });

  it.each(getGuideCards('en'))(
    'publishes only source-backed, non-Chinese content for $href',
    async ({href}) => {
      const content =
        href === '/characters/'
          ? await CharactersPage({params: Promise.resolve({locale: 'en'})})
          : await MatrixPage({
              params: Promise.resolve({
                locale: 'en',
                rest: href.split('/').filter(Boolean)
              })
            });
      const {container} = render(content);
      const article = container.querySelector('article.prose-game');

      expect(article?.textContent, href).not.toMatch(/[\u3400-\u9fff]/u);
      expect(article?.textContent, href).not.toMatch(
        /redemption code|promotional code|unlock codes/iu
      );

      const citations = article?.querySelectorAll('a[href^="https://"]') ?? [];
      expect(citations.length, href).toBeGreaterThanOrEqual(2);

      for (const citation of citations) {
        const url = new URL(citation.getAttribute('href') ?? '');
        expect(researchedSourceHosts.has(url.hostname), `${href}: ${url.href}`).toBe(true);
      }
    }
  );
});
