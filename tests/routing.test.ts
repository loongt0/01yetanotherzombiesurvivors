import {describe, expect, it} from 'vitest';
import {routing} from '@/i18n/routing';

describe('locale routing', () => {
  it('keeps English unprefixed and exposes the researched locales', () => {
    expect(routing.locales).toEqual(['en', 'ru', 'es', 'de']);
    expect(routing.defaultLocale).toBe('en');
    expect(routing.localePrefix).toBe('as-needed');
  });
});
