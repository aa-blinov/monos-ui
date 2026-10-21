# Tokens

Three layers. A component reads semantic roles; a theme sets them; the geometry is shared.

```
src/styles/tokens.css     geometry, type, motion, z
src/styles/themes.css     semantic colours per [data-theme][data-mode]
src/tailwind-preset.js    the same names as Tailwind utilities
```

## Semantic colours

Every theme/mode pair sets all of them. Components never name a palette colour.

| Token | Tailwind | Role |
|---|---|---|
| `--ui-bg` | `bg-canvas` | the page |
| `--ui-surface` | `bg-surface` | a card, a panel, a hovered row |
| `--ui-surface-2` | `bg-surface-2` | a deeper layer: track, pressed state |
| `--ui-ink` | `text-ink` | readable text |
| `--ui-ink-soft` | `text-ink-soft` | supporting text |
| `--ui-ink-faint` | `text-ink-faint` | metadata, hints |
| `--ui-ink-muted` | `text-ink-muted` | decoration, disabled, placeholders; not a sentence |
| `--ui-line` | `border-line` | every hairline |
| `--ui-line-strong` | `border-line-strong` | hover and focus borders (derived) |
| `--ui-accent` | `text-accent`, `bg-accent` | selection and links |
| `--ui-danger` | `text-danger`, `bg-danger` | destructive and error |
| `--ui-warning` | `text-warning`, `bg-warning` | attention |
| `--ui-success` | `text-success`, `bg-success` | done |
| `--ui-info` | `text-info`, `bg-info` | information |
| `--ui-focus` | — | 2px focus line (derived) |
| `--ui-selection` | — | text selection (derived) |

Derived tokens are `color-mix()` over `--ui-ink` / `--ui-ink-soft` / `--ui-accent`; a theme does not set them.

## Typography

| Token | Value | Tailwind | Role |
|---|---|---|---|
| `--ui-font` | JetBrains Mono stack | `font-ui` | the interface face |
| `--ui-text-whisper` | 0.6875rem (11px) | `text-whisper` | metadata |
| `--ui-text-whisper-lg` | 0.75rem (12px) | `text-whisper-lg` | metadata labels |

The rest of the scale is Tailwind: `text-xs` (12), `text-sm` (14), `text-lg` (18), `text-xl` (20), `text-2xl` (24), `text-3xl` (30).

## Geometry

| Token | Value |
|---|---|
| `--ui-radius` | 6px |
| `--ui-space-hair` | 2px |
| `--ui-space-tight` | 4px |
| `--ui-space-field` | 6px |
| `--ui-space-snug` | 8px |
| `--ui-space-input` | 10px |
| `--ui-space-base` | 12px |
| `--ui-space-comfortable` | 16px |
| `--ui-space-roomy` | 24px |
| `--ui-space-section` | 32px |

## Controls and icons

| Token | Value | Tailwind | Role |
|---|---|---|---|
| `--ui-control-xs` | 24px | — | inline icon button |
| `--ui-control-sm` | 28px | — | dense rows |
| `--ui-control-md` | 32px | — | toolbars |
| `--ui-control-lg` | 36px | — | default controls |
| `--ui-control-xl` | 40px | — | header bars, search |
| `--ui-control-touch` | 44px | — | touch rows |
| `--ui-icon-xs` | 12px | — | inside text |
| `--ui-icon-sm` | 14px | — | dense rows |
| `--ui-icon-md` | 16px | — | default icon |
| `--ui-icon-lg` | 20px | — | page actions |
| `--ui-icon-xl` | 24px | — | rare, large |

Icons use `strokeWidth="1.7"` throughout.

## Depth and motion

| Token | Value | Tailwind |
|---|---|---|
| `--ui-shadow-rest` | 0 1px 2px rgb(0 0 0 / 0.03) | `shadow-rest` |
| `--ui-shadow-lift` | 0 20px 25px -5px rgb(0 0 0 / 0.1) | `shadow-lift` |
| `--ui-shadow-overlay` | 0 25px 50px -12px rgb(0 0 0 / 0.25) | `shadow-overlay` |
| `--ui-duration-fast` | 150ms | `duration-fast` |
| `--ui-duration-base` | 200ms | `duration-base` |
| `--ui-z-menu` | 40 | `z-menu` |
| `--ui-z-modal` | 50 | `z-modal` |
| `--ui-z-tooltip` | 60 | `z-tooltip` |

## Themes

| `data-theme` | Name |
|---|---|
| `gruvbox` | Gruvbox (default) |
| `github` | GitHub |
| `dracula` | Dracula |
| `nord` | Nord |
| `solarized` | Solarized |
| `catppuccin` | Catppuccin |

Solarized's ink is walked slightly darker/lighter than the upstream ramp so body text clears AA on its second surface; the test records the reason.

## Rules

1. A component reads `var(--ui-…)` or a preset name; it never writes a hex.
2. A new colour is a role, not a shade. If a new role is needed, add it to `src/themes.js` for every theme and mode, regenerate, and update the contract test.
3. A new geometry step is added to `tokens.css` and, when useful, to the preset; no arbitrary `h-[…]` in a component.
4. Text roles are AA on `--ui-bg` and `--ui-surface`; `--ui-ink-muted` is not a text role.
