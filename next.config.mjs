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
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    async rewrites() {
      return {
        afterFiles: [
          {source: '/', destination: '/en'},
          {
            source:
              '/:path((?!en(?:/|$)|de(?:/|$)|es(?:/|$)|fr(?:/|$)).*)',
            destination: '/en/:path'
          }
        ]
      };
    }
  })
);
