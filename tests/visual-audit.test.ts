import {readFileSync} from 'node:fs';
import path from 'node:path';

import {describe, expect, it} from 'vitest';

const readProjectFile = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), 'utf8');

describe('visual audit handoff', () => {
  it('exposes the reproducible visual audit command', () => {
    const packageJson = JSON.parse(readProjectFile('package.json')) as {
      scripts: Record<string, string>;
    };
    const auditSource = readProjectFile('scripts/visual-audit.mjs');

    expect(packageJson.scripts['audit:visual']).toBe(
      'node scripts/visual-audit.mjs'
    );
    expect(auditSource).toContain('VISUAL_REFERENCE_URL');
    expect(auditSource).toContain('http://127.0.0.1:3000');
    expect(auditSource).toContain("{width: 1440, height: 1000}");
    expect(auditSource).toContain("viewport: {width: 390, height: 844}");
    expect(auditSource).toContain('await document.fonts.ready');
  });

  it('commits a portable six-case researched-game measurement baseline', () => {
    const baseline = JSON.parse(
      readProjectFile('e2e/reference-baseline/measurements.json')
    ) as Array<{
      source: string;
      viewport: string;
      route: string;
      screenshotPath: string;
      documentHeight: number;
      header: unknown;
      hero: unknown;
      guideGrid: unknown;
      footer: unknown;
    }>;

    expect(baseline).toHaveLength(6);
    expect(
      baseline.map(({source, viewport, route}) => `${source}:${viewport}:${route}`)
    ).toEqual([
      'local:desktop:/',
      'local:desktop:/guides/',
      'local:desktop:/characters/',
      'local:mobile:/',
      'local:mobile:/guides/',
      'local:mobile:/characters/'
    ]);

    for (const measurement of baseline) {
      expect(measurement.screenshotPath).toMatch(
        /^test-results\/visual-audit\/local\/(desktop|mobile)\/(home|guides|characters)\.png$/
      );
      expect(measurement.screenshotPath.startsWith('/')).toBe(false);
      expect(measurement.documentHeight).toBeGreaterThan(0);
      expect(measurement.header).toBeTruthy();
      expect(measurement.hero).toBeTruthy();
      expect(measurement.guideGrid).toBeTruthy();
      expect(measurement.footer).toBeTruthy();
    }
  });
});
