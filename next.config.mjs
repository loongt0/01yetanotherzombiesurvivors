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
    skipProxyUrlNormalize: true,
    async redirects() {
      return [
        {
          source: '/en/:path*',
          destination: '/:path*',
          permanent: false
        }
      ];
    }
  })
);
