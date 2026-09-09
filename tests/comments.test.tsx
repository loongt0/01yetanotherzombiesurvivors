import {render, screen} from '@testing-library/react';
import {afterEach, expect, it, vi} from 'vitest';
import {Comments} from '@/components/comments';

afterEach(() => {delete window.REMARK42; delete window.remark_config;});

it('replaces the comment thread on navigation and cleans it up on unmount', () => {
  const first = {destroy: vi.fn()};
  const second = {destroy: vi.fn()};
  const createInstance = vi.fn().mockReturnValueOnce(first).mockReturnValueOnce(second);
  window.REMARK42 = {createInstance};
  const {rerender, unmount} = render(<Comments url="https://www.yetanotherzombiesurvivors.world/characters/" title="Characters" locale="en" />);
  expect(createInstance).toHaveBeenCalledWith(expect.objectContaining({site_id: 'remark', theme: 'dark', url: 'https://www.yetanotherzombiesurvivors.world/characters/'}));
  rerender(<Comments url="https://www.yetanotherzombiesurvivors.world/guides/best-team/" title="Best team" locale="en" />);
  expect(first.destroy).toHaveBeenCalledOnce();
  expect(createInstance).toHaveBeenLastCalledWith(expect.objectContaining({url: 'https://www.yetanotherzombiesurvivors.world/guides/best-team/'}));
  expect(document.querySelectorAll('#remark42')).toHaveLength(1);
  unmount();
  expect(second.destroy).toHaveBeenCalledOnce();
});

it('shows localized copy and removes a pending script when leaving the page', () => {
  const {unmount} = render(<Comments url="https://www.yetanotherzombiesurvivors.world/de/characters/" title="Characters" locale="de" />);
  expect(screen.getByRole('heading', {name: 'Diskussion'})).toBeInTheDocument();
  const script = document.querySelector('script[src="https://comments.yetanotherzombiesurvivors.world/web/embed.js"]');
  expect(script).not.toBeNull();
  unmount();
  expect(script?.isConnected).toBe(false);
});
