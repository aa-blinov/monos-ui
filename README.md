# @monos/ui

[![test](https://github.com/aa-blinov/monos-ui/actions/workflows/test.yml/badge.svg)](https://github.com/aa-blinov/monos-ui/actions/workflows/test.yml) [![the gallery](https://img.shields.io/badge/gallery-live-7a9e9f)](https://aa-blinov.github.io/monos-ui/)

The interface kit extracted from [Monos](https://github.com/aa-blinov/monos): warm paper, one radius, text buttons and a focus ring that belongs to the theme.

It is a Svelte 4 component library with a Tailwind preset and a plain-CSS token layer. The tokens work without Svelte or Tailwind; the components are source files that your bundler compiles.

The design system itself, in one page: [DESIGN.md](DESIGN.md).

> **Status:** 0.5.0, source distribution. Not on npm yet; install from this repository.

**Live gallery:** [aa-blinov.github.io/monos-ui](https://aa-blinov.github.io/monos-ui/)

![The kit's gallery: palette, type, buttons and fields](docs/preview.png)

## Install

```bash
# from GitHub, until it is published on npm
npm install github:aa-blinov/monos-ui svelte tailwindcss
```

Peer dependencies: `svelte@^4` and `tailwindcss@^3.4`.

## Set it up

### 1. Tailwind preset

```js
// tailwind.config.js
import ui from '@monos/ui/tailwind-preset';

export default {
  presets: [ui],
  content: [
    './src/**/*.{svelte,js}',
    './node_modules/@monos/ui/src/**/*.svelte',
  ],
};
```

The preset names the semantic colours (`bg-canvas`, `bg-surface`, `text-ink`, `border-line`, `text-danger`), the one radius (`rounded-ui`), the whisper sizes, the shadows, the durations and the z-layers. Components use those names, never raw palette values.

### 2. Styles

```js
import '@monos/ui/styles.css';
```

`styles.css` brings the geometry tokens, all six themes and the optional base (page colour, font, focus ring, scrollbars, placeholders). If your product owns `body`, import `@monos/ui/tokens.css` and `@monos/ui/themes.css` instead.

### 3. Pick a theme

No JavaScript needed:

```html
<html data-theme="gruvbox" data-mode="dark">
```

Themes: `gruvbox`, `github`, `dracula`, `nord`, `solarized`, `catppuccin`. Modes: `light`, `dark`. Without attributes the page is Gruvbox light; `data-mode="dark"` alone is Gruvbox dark.

### 4. Write a screen

```svelte
<script>
  import { Button, Card, Modal, TextField } from '@monos/ui';
  let open = false;
</script>

<Card interactive on:click={() => (open = true)}>
  <p class="text-sm font-bold">A note</p>
  <p class="mt-1 text-xs text-ink-soft">Warm paper, one radius, no decoration.</p>
</Card>

<Button on:click={() => (open = true)}>New note</Button>

<Modal bind:open title="New note" description="The title becomes the file name.">
  <TextField label="Title" placeholder="Untitled" />
  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => (open = false)}>Cancel</Button>
    <Button on:click={() => (open = false)}>Create</Button>
  </svelte:fragment>
</Modal>
```

## Components

| Component | What it is |
|---|---|
| `Button` | Text-only action: `primary`, `secondary`, `text`, `quiet`, `danger`; sizes `sm`, `md`, `lg`; `loading`, `full` |
| `IconButton` | 28/36/44px square, outline or ghost, always named by `label`; tooltip by default |
| `TextField` | Underline or boxed input with label, hint, error |
| `TextArea` | The same field, multi-line |
| `Select` | Themed listbox: the popup is drawn by the kit |
| `SelectField` | Native select for forms, themed closed control |
| `Combobox` | Searchable single choice; typed filter, listbox, active descendant |
| `MultiSelect` | Searchable multiple choice; chips inside the field |
| `DatePicker` | ISO string + drawn calendar; `Intl` month and weekday names |
| `Slider` | Native range, themed track and thumb |
| `FileUpload` | Drop zone and file list; `files` is data, not a transport |
| `Fieldset` / `FormField` | Named group; label, hint and error around any control |
| `SearchField` | Pill search with magnifier and clear |
| `Checkbox` | 16px box, 24/44px row |
| `Switch` | `role="switch"` row |
| `Chip` | Quiet bordered label; optional remove |
| `Badge` | Uppercase status word with optional dot |
| `Card` | Surface; `interactive` makes it a button, `selected` marks it |
| `Menu` | Trigger slot + data items; keyboard, outside click, Escape |
| `Modal` | Focus trap, Escape, backdrop, scroll lock, focus return |
| `Notice` | Inline status, warning, success or error |
| `SegmentedControl` | Pressed choice in a group |
| `EmptyState` | Icon, title, sentence, actions |
| `Kbd` | Key cap |
| `Spinner` | Loading ring |
| `Tabs` | WAI-ARIA tab list; line or pill; arrows, Home/End; panel slot |
| `Accordion` | Disclosure stack; one or many open; heading buttons |
| `Popover` | Anchored non-modal panel; trigger slot; flips, Escape, outside click |
| `AlertDialog` | `role="alertdialog"` confirmation; focus starts on Cancel |
| `RadioGroup` | Real radios, one name, custom circle |
| `Progress` | Determinate and indeterminate bar; tones; reduced motion |
| `Skeleton` | Reserves the size; pulse stops under reduce motion |
| `Avatar` | Image or initials; five sizes; status dot |
| `Table` | Sortable, selectable data table; cell slot; sticky header |
| `Toaster` / `toast` | Queue, auto-dismiss, actions; danger is an alert |
| `Breadcrumbs` | Path back up; the last item is the current page |
| `PageHeader` | Title, sentence and actions; heading level is a prop |
| `Pagination` | First, last and the current neighbourhood; real ellipsis |
| `Drawer` | Modal side panel with focus trap, scroll lock and focus return |
| `Prose` | Reading column for Markdown: measure, rhythm, code, tables |
| `Tooltip` / `tooltip` | Hint on any element; one look, 450 ms, never on a phone |

Full props, events and slots: [docs/components.md](docs/components.md). Tokens: [docs/tokens.md](docs/tokens.md). Moving Monos itself onto the kit: [docs/migrating-monos.md](docs/migrating-monos.md).

## What it believes

- **Colour is a role, not a value.** Components read `var(--ui-…)`; a theme changes values, never components.
- **One radius.** Every rectangle is `--ui-radius` (6px). Circles are only things that are round by nature.
- **Text is the button.** No filled CTA, no outlined action button; the only frame is a toggle's chosen state.
- **Flat at rest.** Cards carry a 3%-black shadow; only hover and overlays lift.
- **Quiet focus.** A 2px line in the theme's ink, shown from the keyboard; a mouse click never draws it.
- **Words belong to the product.** The kit has no locale files; labels arrive as props and slots.

## Accessibility

- The focus ring is a theme token and clears 3:1 (covered by the theme tests).
- `IconButton` requires `label`; `Modal` names itself and traps Tab; `Menu` moves with arrows, Home/End, Escape; `Switch` is a `role="switch"` button.
- Text roles (`ink`, `ink-soft`, `ink-faint`) are tested for WCAG AA on the page and on a card in all twelve theme/mode pairs.
- Tooltips are visual hints only; every control keeps its accessible name without one.

## Development

```bash
npm install
npm run dev            # gallery at http://127.0.0.1:5180
npm run test           # theme contract + component behaviour
npm run check          # svelte-check
npm run build:gallery  # production build of the gallery
npm run build:themes   # regenerate src/styles/themes.css after editing src/themes.js
```

The gallery is the visual reference: every component, every theme, both modes. It is built from the same source consumers import.

## Structure

```
src/
  components/          Svelte 4 primitives
  styles/
    tokens.css         geometry, type, motion, z
    themes.css         generated palette blocks
    base.css           optional page base
    index.css          all of the above
  themes.js            palette data
  theme-css.js          the generator shared by the build and the tests
  tailwind-preset.js   semantic names for Tailwind
  tooltip.js           the shared tooltip action
  index.js             the public surface
gallery/               the visual reference
tests/                 contract, contrast and behaviour tests
```

## Licence

MIT. The visual system comes from Monos; the kit is a separate package so other products can use it without the app.
