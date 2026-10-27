/**
 * The faces of the kit. `family` is the CSS stack that `data-font` sets as
 * `--ui-font`; `styles/fonts.css` ships the files. All three are Medeo and carry Latin
 * and Cyrillic. A host that wants more adds its own entry and its own
 * `[data-font]` rule, and passes the list to `FontPicker`.
 */
export const fonts = {
  mono: {
    id: 'mono',
    name: 'Medeo Mono',
    category: 'Monospace',
    note: 'The default: code and prose in one grid',
    family: "'Medeo Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  sans: {
    id: 'sans',
    name: 'Medeo Sans',
    category: 'Sans serif',
    note: 'A neutral interface face for long reading',
    family: "'Medeo Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  pixel: {
    id: 'pixel',
    name: 'Medeo Pixel',
    category: 'Display',
    note: 'A dot-grid face for headings and moods',
    family: "'Medeo Pixel', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
};

export const fontNames = Object.keys(fonts);
export const DEFAULT_FONT = 'mono';
