import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { themes, modes, themeNames } from '../src/themes.js';
import { THEME_VAR, renderThemesCss } from '../src/theme-css.js';

const here = path.dirname(fileURLToPath(import.meta.url));

function rgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((value) => {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test('the committed themes.css matches the palette', () => {
  const css = fs.readFileSync(path.join(here, '..', 'src', 'styles', 'themes.css'), 'utf-8');
  assert.equal(css, renderThemesCss(themes, modes));
});

test('every theme and mode carries the whole contract', () => {
  assert.deepEqual(themeNames, ['gruvbox', 'github', 'dracula', 'nord', 'solarized', 'catppuccin']);
  for (const name of themeNames) {
    for (const mode of modes) {
      const palette = themes[name][mode];
      for (const key of Object.keys(THEME_VAR)) {
        assert.match(palette[key], /^#[0-9a-f]{6}$/i, `${name}.${mode}.${key}`);
      }
    }
  }
});

test('the default is Gruvbox light', () => {
  assert.equal(themes.gruvbox.light.ink, '#3c3836');
  assert.equal(themes.gruvbox.light.bg, '#fbf1c7');
});

test('readable text clears AA on the page and on a card', () => {
  const offenders = [];
  for (const name of themeNames) {
    for (const mode of modes) {
      const p = themes[name][mode];
      for (const surface of [p.bg, p.surface]) {
        for (const key of ['ink', 'inkSoft', 'inkFaint']) {
          const ratio = contrast(p[key], surface);
          if (ratio < 4.5) offenders.push(`${name}.${mode}.${key} on ${surface}: ${ratio.toFixed(2)}`);
        }
      }
    }
  }
  assert.deepEqual(offenders, []);
});
