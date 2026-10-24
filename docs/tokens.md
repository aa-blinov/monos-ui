# Tokens

Three layers. A component reads semantic roles; a theme sets them; the geometry is shared.

```
src/styles/tokens.css     geometry, type, motion, z
src/styles/themes.css     semantic colours per [data-theme][data-mode]
src/tailwind-preset.js    the same names as Tailwind utilities
```

## Semantic colours

Every theme/mode pair sets all of them. Components never name a palette colour.

| Token               | Tailwind             | Role                                               |
| ------------------- | -------------------- | -------------------------------------------------- |
| `--ui-bg`           | `bg-canvas`          | the page                                           |
| `--ui-surface`      | `bg-surface`         | a card, a panel, a hovered row                     |
| `--ui-surface-2`    | `bg-surface-2`       | a deeper layer: track, pressed state               |
| `--ui-ink`          | `text-ink`           | readable text                                      |
| `--ui-ink-soft`     | `text-ink-soft`      | supporting text                                    |
| `--ui-ink-faint`    | `text-ink-faint`     | metadata, hints                                    |
| `--ui-ink-muted`    | `text-ink-muted`     | decoration, disabled, placeholders; not a sentence |
| `--ui-line`         | `border-line`        | every hairline                                     |
| `--ui-line-strong`  | `border-line-strong` | hover and focus borders (derived)                  |
| `--ui-accent`       | `bg-accent`          | selection, dots and fills                          |
| `--ui-danger`       | `bg-danger`          | destructive fills and dots                         |
| `--ui-warning`      | `bg-warning`         | attention dots and fills                           |
| `--ui-success`      | `bg-success`         | done dots and fills                                |
| `--ui-info`         | `bg-info`            | information dots and fills                         |
| `--ui-accent-text`  | `text-accent-text`   | the accent as a word, AA on bg and surface         |
| `--ui-danger-text`  | `text-danger-text`   | the destructive word, AA on bg and surface         |
| `--ui-warning-text` | `text-warning-text`  | the attention word, AA on bg and surface           |
| `--ui-success-text` | `text-success-text`  | the done word, AA on bg and surface                |
| `--ui-info-text`    | `text-info-text`     | the information word, AA on bg and surface         |
| `--ui-focus`        | —                    | 2px focus line (derived)                           |
| `--ui-selection`    | —                    | text selection (derived)                           |

Derived tokens are `color-mix()` over `--ui-ink` / `--ui-ink-soft` / `--ui-accent`; a theme does not set them. The `*-text` status roles are generated from the signal by darkening it on a light theme (or lightening it on a dark one) until the word clears AA on both `--ui-bg` and `--ui-surface`; the hue stays.

## Typography

| Token                  | Value                | Tailwind          | Role               |
| ---------------------- | -------------------- | ----------------- | ------------------ |
| `--ui-font`            | JetBrains Mono stack | `font-ui`         | the interface face |
| `--ui-text-whisper`    | 0.6875rem (11px)     | `text-whisper`    | metadata           |
| `--ui-text-whisper-lg` | 0.75rem (12px)       | `text-whisper-lg` | metadata labels    |

The rest of the scale is Tailwind: `text-xs` (12), `text-sm` (14), `text-lg` (18), `text-xl` (20), `text-2xl` (24), `text-3xl` (30).

## Geometry

| Token                    | Value |
| ------------------------ | ----- |
| `--ui-radius`            | 6px   |
| `--ui-space-hair`        | 2px   |
| `--ui-space-tight`       | 4px   |
| `--ui-space-field`       | 6px   |
| `--ui-space-snug`        | 8px   |
| `--ui-space-input`       | 10px  |
| `--ui-space-base`        | 12px  |
| `--ui-space-comfortable` | 16px  |
| `--ui-space-roomy`       | 24px  |
| `--ui-space-section`     | 32px  |

## Controls and icons

| Token                | Value | Tailwind      | Role                |
| -------------------- | ----- | ------------- | ------------------- |
| `--ui-control-xs`    | 24px  | —             | inline icon button  |
| `--ui-control-sm`    | 28px  | —             | dense rows          |
| `--ui-control-md`    | 32px  | —             | toolbars            |
| `--ui-control-lg`    | 36px  | —             | default controls    |
| `--ui-control-xl`    | 40px  | —             | header bars, search |
| `--ui-control-touch` | 44px  | `min-h-touch` | touch rows          |
| `--ui-icon-xs`       | 12px  | —             | inside text         |
| `--ui-icon-sm`       | 14px  | —             | dense rows          |
| `--ui-icon-md`       | 16px  | —             | default icon        |
| `--ui-icon-lg`       | 20px  | —             | page actions        |
| `--ui-icon-xl`       | 24px  | —             | rare, large         |

Icons use `strokeWidth="1.7"` throughout.

## Phone bars and safe areas

| Token              | Value                            | Tailwind | Role                                 |
| ------------------ | -------------------------------- | -------- | ------------------------------------ |
| `--ui-bar-height`  | 52px                             | `h-bar`  | height of a top or bottom bar        |
| `--ui-safe-top`    | `env(safe-area-inset-top, 0)`    | —        | `TopBar` pads itself with it         |
| `--ui-safe-bottom` | `env(safe-area-inset-bottom, 0)` | —        | `BottomNav`, `BottomSheet` and `Fab` |
| `--ui-safe-left`   | `env(safe-area-inset-left, 0)`   | —        | landscape notch                      |
| `--ui-safe-right`  | `env(safe-area-inset-right, 0)`  | —        | landscape notch                      |

The insets are 0 off a phone. A page needs `viewport-fit=cover` in its viewport meta tag for the browser to report them.

## Depth and motion

| Token                 | Value                               | Tailwind         |
| --------------------- | ----------------------------------- | ---------------- |
| `--ui-shadow-rest`    | 0 1px 2px rgb(0 0 0 / 0.03)         | `shadow-rest`    |
| `--ui-shadow-lift`    | 0 20px 25px -5px rgb(0 0 0 / 0.1)   | `shadow-lift`    |
| `--ui-shadow-overlay` | 0 25px 50px -12px rgb(0 0 0 / 0.25) | `shadow-overlay` |
| `--ui-duration-fast`  | 150ms                               | `duration-fast`  |
| `--ui-duration-base`  | 200ms                               | `duration-base`  |
| `--ui-z-menu`         | 40                                  | `z-menu`         |
| `--ui-z-modal`        | 50                                  | `z-modal`        |
| `--ui-z-tooltip`      | 60                                  | `z-tooltip`      |

## Themes

| `data-theme` | Name              |
| ------------ | ----------------- |
| `gruvbox`    | Gruvbox (default) |
| `github`     | GitHub            |
| `dracula`    | Dracula           |
| `nord`       | Nord              |
| `solarized`  | Solarized         |
| `catppuccin` | Catppuccin        |

Solarized's ink is walked slightly darker/lighter than the upstream ramp so body text clears AA on its second surface; the test records the reason.

## Rules

1. A component reads `var(--ui-…)` or a preset name; it never writes a hex.
2. A new colour is a role, not a shade. If a new role is needed, add it to `src/themes.js` for every theme and mode, regenerate, and update the contract test.
3. A new geometry step is added to `tokens.css` and, when useful, to the preset; no arbitrary `h-[…]` in a component.
4. Text roles are AA on `--ui-bg` and `--ui-surface`; `--ui-ink-muted` is not a text role.
5. A status **word** uses `text-*-text`; a **dot, fill or border** uses the signal (`bg-*`). They are not interchangeable.

## Control scale

One height for every control at a size, so a select and a segmented control on
the same row line up:

| size | height |
| ---- | ------ |
| `sm` | 28px   |
| `md` | 36px   |
| `lg` | 44px   |

`Button`, `IconButton`, `TextField`, `SelectField`, `Select`, `SegmentedControl`
and `SearchField` use this scale. Width is the host's: fields and selects are
full-width by default, `SegmentedControl` takes `full`, and `IconButton` is a
square. On a phone the touch rule lifts the controls to 44px.
