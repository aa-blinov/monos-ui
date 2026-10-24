import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import DeviceFrame from '../src/components/DeviceFrame.svelte';
import { profileNames, profiles } from '../src/profiles.js';

afterEach(cleanup);

const css = fs.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'styles', 'profiles.css'),
  'utf-8',
);

describe('profiles', () => {
  test('there are five, from the desktop to the watch, ordered by size', () => {
    expect(profileNames).toEqual(['desktop', 'laptop', 'tablet', 'iphone', 'android', 'watch']);
    expect(profiles.desktop.width).toBeGreaterThan(profiles.laptop.width);
    expect(profiles.watch.width).toBeLessThan(profiles.iphone.width);
    expect(profiles.android.bar).not.toBe(profiles.iphone.bar);
  });

  test('the stylesheet sets the bar and touch tokens that profiles.js documents', () => {
    for (const id of profileNames) {
      expect(css, `${id} has no block`).toContain(`data-profile='${id}'`);
    }
    for (const id of ['tablet', 'iphone', 'android', 'watch']) {
      const block = css.slice(css.indexOf(`[data-profile='${id}']`));
      expect(block).toContain(`--ui-bar-height: ${profiles[id].bar}`);
      expect(block).toContain(`--ui-control-touch: ${profiles[id].touch}`);
    }
  });
});

describe('DeviceFrame', () => {
  test('its screen carries the profile and the exact screen size', () => {
    render(DeviceFrame, { profile: 'watch' });
    const screen_ = screen.getByTestId('device-screen');
    expect(screen_.getAttribute('data-profile')).toBe('watch');
    expect(screen_.style.width).toBe('198px');
    expect(screen_.style.height).toBe('242px');
    expect(screen.getByRole('group', { name: 'Watch' })).toBeTruthy();
  });

  test('an unknown profile falls back to the iPhone', () => {
    render(DeviceFrame, { profile: 'fridge' });
    expect(screen.getByTestId('device-screen').getAttribute('data-profile')).toBe('iphone');
  });
});
