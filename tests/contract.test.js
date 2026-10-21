import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const componentsDir = path.join(root, 'src', 'components');
const components = fs.readdirSync(componentsDir).filter((name) => name.endsWith('.svelte'));

test('no component reaches into an application', () => {
  const forbidden = /from\s+['"](?:\.\.\/)+(?:stores|strings|lib\/api|lib\/app-shell)/;
  const offenders = components.filter((name) => forbidden.test(fs.readFileSync(path.join(componentsDir, name), 'utf-8')));
  expect(offenders).toEqual([]);
});

test('no component carries a literal colour', () => {
  const offenders = [];
  for (const name of components) {
    const source = fs.readFileSync(path.join(componentsDir, name), 'utf-8');
    if (/#[0-9a-f]{3,8}\b/i.test(source)) offenders.push(`${name}: hex`);
    if (/\brgba?\(/i.test(source)) offenders.push(`${name}: rgb`);
  }
  expect(offenders).toEqual([]);
});

test('every component is exported from the package', () => {
  const index = fs.readFileSync(path.join(root, 'src', 'index.js'), 'utf-8');
  for (const name of components) {
    expect(index, `${name} is missing from src/index.js`).toContain(`components/${name.replace(/\.svelte$/, '')}.svelte`);
  }
});

test('the styles entry brings tokens, themes and base together', () => {
  const index = fs.readFileSync(path.join(root, 'src', 'styles', 'index.css'), 'utf-8');
  expect(index).toContain("./tokens.css");
  expect(index).toContain("./themes.css");
  expect(index).toContain("./base.css");
});

test('the package exposes source, styles and the Tailwind preset', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
  expect(pkg.name).toBe('@monos/ui');
  expect(pkg.svelte).toBe('./src/index.js');
  expect(pkg.exports['./styles.css']).toBe('./src/styles/index.css');
  expect(pkg.exports['./tailwind-preset']).toBe('./src/tailwind-preset.js');
});
