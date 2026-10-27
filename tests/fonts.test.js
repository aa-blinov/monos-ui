import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import FontPicker from '../src/components/FontPicker.svelte';
import { DEFAULT_FONT, fontNames, fonts } from '../src/fonts.js';

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.font;
});

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const fontsCss = fs.readFileSync(path.join(root, 'styles', 'fonts.css'), 'utf-8');
const tokensCss = fs.readFileSync(path.join(root, 'styles', 'tokens.css'), 'utf-8');

describe('fonts', () => {
  test('three faces, the monospace one the default', () => {
    expect(fontNames).toEqual(['mono', 'sans', 'pixel']);
    expect(DEFAULT_FONT).toBe('mono');
  });

  test('every face has files for Latin and Cyrillic, and a data-font rule', () => {
    for (const font of Object.values(fonts)) {
      expect(fontsCss, font.name).toContain(`font-family: '${font.name}'`);
      expect(tokensCss, font.id).toContain(`[data-font='${font.id}']`);
    }
    const files = [...fontsCss.matchAll(/url\('\.\.\/fonts\/([^']+)'\)/g)].map((match) => match[1]);
    expect(files).toHaveLength(5);
    for (const file of files) expect(fs.existsSync(path.join(root, 'fonts', file)), file).toBe(true);
  });

  test('the files are local: no remote url in the stylesheet', () => {
    expect(fontsCss).not.toMatch(/https?:/);
  });
});

describe('FontPicker', () => {
  test('is a radio group of the three faces with the current one checked', () => {
    render(FontPicker, { value: 'sans' });
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(screen.getByRole('radio', { name: /Medeo Sans/ }).checked).toBe(true);
  });

  test('choosing reports the face and, with apply, sets data-font', async () => {
    const { component } = render(FontPicker, { value: 'mono', apply: true });
    const change = vi.fn();
    component.$on('change', change);
    expect(document.documentElement.dataset.font).toBe('mono');
    await fireEvent.click(screen.getByRole('radio', { name: /Medeo Pixel/ }));
    expect(change.mock.calls[0][0].detail.value).toBe('pixel');
    expect(document.documentElement.dataset.font).toBe('pixel');
  });

  test('its cards can shrink below their content, so a phone gets no sideways scroll', () => {
    const { container } = render(FontPicker);
    expect(container.querySelector('.grid').className).toContain('grid-cols-[minmax(0,1fr)]');
    expect(container.querySelector('label').className).toContain('min-w-0');
  });

  test('takes a host list of faces', () => {
    render(FontPicker, { options: [{ id: 'x', name: 'Mine', category: 'Own', family: 'serif' }], value: 'x' });
    expect(screen.getAllByRole('radio')).toHaveLength(1);
  });
});
