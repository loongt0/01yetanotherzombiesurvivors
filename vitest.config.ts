import path from 'node:path';
import {fileURLToPath} from 'node:url';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import {defineConfig} from 'vitest/config';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter]
    })
  ],
  resolve: {
    alias: {
      '@': path.join(projectRoot, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  }
});
