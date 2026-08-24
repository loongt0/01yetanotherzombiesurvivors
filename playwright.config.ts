import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: {
    baseURL: 'http://localhost:3108'
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3108',
    url: 'http://127.0.0.1:3108/de',
    reuseExistingServer: true,
    timeout: 120_000
  }
});
