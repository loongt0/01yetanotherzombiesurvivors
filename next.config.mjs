import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter', 'remark-mdx-frontmatter']
  }
});

export default withNextIntl(
  withMDX({
    allowedDevOrigins: ['127.0.0.1'],
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    redirects() {
      return [
        {
          source: '/en/:path*',
          destination: '/:path*/',
          permanent: true
        },
        {
          source: '/guides/achievement-guide/',
          destination: '/guides/achievements/',
          permanent: true
        },
        {
          source: '/guides/achievements-guide/',
          destination: '/guides/achievements/',
          permanent: true
        },
        {
          source: '/guides/im-boss-here-achievement-guide/',
          destination: '/guides/achievements/',
          permanent: true
        },
        {
          source: '/guides/trophy-guide/',
          destination: '/guides/achievements/',
          permanent: true
        },
        {
          source: '/guides/potato-guide-find-sanji/',
          destination: '/guides/sanji-the-rabbit/',
          permanent: true
        },
        {
          source: '/guides/beginner-guide/',
          destination: '/guides/',
          permanent: true
        },
        {
          source: '/guides/build-guide/',
          destination: '/builds/',
          permanent: true
        }
      ];
    },
    skipProxyUrlNormalize: true,
    trailingSlash: true
  })
);
