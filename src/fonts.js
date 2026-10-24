/**
 * The faces of the kit. `family` is the CSS stack that `data-font` sets as
 * `--ui-font`; `styles/fonts.css` ships the files. All three carry Latin and
 * Cyrillic. A host that wants more adds its own entry and its own
 * `[data-font]` rule, and passes the list to `FontPicker`.
 */
export const fonts = {
  mono: {
    id: 'mono',
    name: 'JetBrains Mono',
    category: 'Monospace',
    note: 'The default: code and prose in one grid',
    family: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  sans: {
    id: 'sans',
    name: 'Inter',
    category: 'Sans serif',
    note: 'A neutral interface face for long reading',
    family: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  serif: {
    id: 'serif',
    name: 'Source Serif 4',
    category: 'Serif',
    note: 'A warm book face for notes and essays',
    family: "'Source Serif 4', ui-serif, Georgia, 'Times New Roman', serif",
  },
};

export const fontNames = Object.keys(fonts);
export const DEFAULT_FONT = 'mono';
