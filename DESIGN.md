---
name: '@monos/ui'
description: 'Svelte 4 interface kit: warm paper, one 6px radius, text buttons, and six themes in light and dark.'
colors:
  primary: '#3c3836'
  canvas: '#fbf1c7'
  surface: '#ebdbb2'
  accent: '#458588'
  danger: '#cc241d'
  line: '#d5c4a1'
typography:
  body:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: '20px'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.02em'
rounded:
  md: '6px'
spacing:
  tight: '4px'
  base: '12px'
  roomy: '24px'
---

# Design system: @monos/ui

The kit is a desk under warm light: paper, ink, one corner, and controls that are words before they are boxes. It is extracted from Monos, but it is not the notes app: the editor, the note card, the sidebar and the terminal stay in the product.

**Source of truth.** Colour values live in [`src/themes.js`](src/themes.js); geometry in [`src/styles/tokens.css`](src/styles/tokens.css); the utility names in [`src/tailwind-preset.js`](src/tailwind-preset.js). This file explains the rules; [`docs/tokens.md`](docs/tokens.md) lists the tokens, and [`docs/components.md`](docs/components.md) lists the APIs.

## Overview

Six palettes ship in a light and a dark mode: Gruvbox (the reference), GitHub, Dracula, Nord, Solarized, Catppuccin. A component never names a palette colour; it reads `--ui-bg`, `--ui-ink`, `--ui-line`, `--ui-danger` and their siblings. A theme is a set of values behind those roles, so a new palette is data, not a component change.

The personality is quiet and dense. There is one face, one corner and a small type scale. Depth belongs to hover and overlays, not to importance. The controls are deliberately plain: a button is a word, a field is an underline, and a badge is a status word.

**Creative North Star: "the paper desk."** Everything sits on a warm ground with a hairline and a 3% shadow. When a screen needs emphasis, it changes the weight of the text or lifts one surface, never the number of colours.

Key characteristics:

- Warm paper and ink, with six interchangeable palettes.
- One 6px radius on every rectangle.
- Text-only actions.
- A small type scale: 30, 24, 20, 14, 12, 11px.
- Focus and state colours come from the theme.

## Colors

Colour is a role. The frontmatter carries the default Gruvbox values; every theme and mode sets the same names.

### Primary

- **Ink** (`#3c3836`): body text, bold button labels, the focus line. This is the darkest text role on a light theme.
- **Accent** (`#458588`): selection fills, dots and focus-adjacent marks. It is a state signal, not decoration.

### Neutral

- **Canvas** (`#fbf1c7`): the page ground.
- **Surface** (`#ebdbb2`): a card, a panel, a hovered row.
- **Surface 2** (`#d5c4a1`): a track or a pressed state.
- **Line** (`#d5c4a1`): every hairline.

### Status

- **Danger** (`#cc241d`): destructive fills and dots.
- **Warning**, **success** and **info** work the same way. A status word reads its `*-text` sibling (`--ui-danger-text`, and so on), which is darkened on light or lightened on dark until it clears AA on the page and on a card; the hue stays. The signal stays vivid in the dot; the word stays readable.

### Named rules

**The variable rule.** A component reads `var(--ui-…)` or a Tailwind name from the preset. A hex inside a component is a defect.

**The accent rule.** Accents mean state. Spending red, orange or yellow on decoration spends their meaning.

**The two surfaces rule.** Text has to clear AA on both `--ui-bg` and `--ui-surface`, because the same sentence can sit on either. `--ui-ink-muted` is for decoration and disabled states, never for a sentence.

## Typography

**Display Font:** JetBrains Mono, with the system monospace stack behind it.
**Body Font:** JetBrains Mono, same stack.

One face at a time. Code stays in the fixed face; nothing else introduces a second family.

The working scale is small: `30px` display, `24px` headline, `20px` title, `14px` body, `12px` interface, `11px` metadata. Metadata is uppercase and tracked; it whispers, it does not compete with the title. The token layer names the two smallest steps: `--ui-text-whisper` (11px) and `--ui-text-whisper-lg` (12px); the rest come from Tailwind's scale.

## Layout

One 4px grid. The spacing tokens are 2, 4, 6, 8, 10, 12, 16, 24, 32px, named from `hair` to `section`. A surface changes the role (card, panel, modal), not the number.

The layout primitives own the page: `Container` has the measure and the gutters, `Stack` handles one axis, `Grid` sets equal or auto-fit tracks, `Section` carries the vertical rhythm and `Separator` draws the hairline. They read the same spacing scale as the controls.

Controls step through 24, 28, 32, 36, 40 and 44px; icons through 12, 14, 16, 20 and 24px. On a phone the primary controls grow to 44px, because a finger is not a pointer. The page column is `Container`'s business; the root element sets no width.

## Elevation & Depth

Flat at rest, lifted by touch.

A card has `shadow-rest` (`0 1px 2px / 3%`), which reads as paper texture rather than shadow. Hover adds `shadow-lift` and a half-pixel rise; a modal, menu or tooltip uses `shadow-overlay`. Nothing permanent carries a shadow that means "important".

## Shapes

The radius is `6px` for every rectangle: cards, menus, fields, buttons, tags, checkboxes. Density changes size and padding, never the corner. Circles are reserved for things that are round by nature: avatars, radio marks, a slider thumb.

Borders are one hairline in `--ui-line`; hover and focus borders use `--ui-line-strong`. There is no second border weight, no double frame and no clipped corner. Icons share one stroke, `1.7`.

## Components

The component set is documented prop by prop in [`docs/components.md`](docs/components.md). What follows is the design intent.

### Buttons

- **Shape:** no frame, no fill. Padding is horizontal; the height comes from the control scale.
- **Primary:** bold ink. **Secondary:** soft ink. **Text:** bold ink with a stronger press. **Quiet:** sentence case. **Danger:** the AA danger word.
- **Hover / Focus:** opacity drops slightly on hover; the focus ring is the theme's 2px ink line, keyboard only.

### Inputs and fields

- **Style:** underline row (`h-9`, bottom border) by default; `boxed` for a pill or a contained field.
- **Focus:** the border takes the focus colour and the ring appears for the keyboard.
- **Error:** the message is an alert, the border takes the danger role, and the error wins over the hint.

### Fields with a list

A choice whose list is part of the interface uses `Select`, a themed listbox. A long form may keep the native `SelectField`. A searchable choice is a `Combobox` (one) or `MultiSelect` (several): a field, a filtered listbox and an option named by `aria-activedescendant`.

### Overlays

Menus are a trigger plus data items; arrows, Home/End, Escape and an outside click work, and the first item takes focus when the menu opens. Modals name themselves, trap Tab, lock the page, close on Escape or the backdrop and return focus. Drawers are the side version with the same behaviour. Popovers are anchored and non-modal; they flip when the page runs out of room. Alert dialogs are the one dialog with no close cross and no backdrop dismissal; focus starts on Cancel.

### Feedback and data

Notices are inline, one dot, a title and a sentence. Toasts are transient and live in one region; a danger toast is an alert, the rest are status, and four at a time is enough. Progress is a thin bar with the one radius; indeterminate is a sweep. A skeleton reserves the size the content will take. Tables are for data, not layout: headers sort with a triangle and `aria-sort`, selection is a checkbox column, and a row action belongs in a cell.

### Layout and navigation

Breadcrumbs say where the page sits; the last item is the current page, not a link. A page header is a title, a sentence and the actions at the top right. Pagination keeps first, last and the current neighbourhood; a gap is an ellipsis. A stepper is a sequence, not a progress bar. A nav item is one row: a link when it goes somewhere, a button when it acts.

### Utilities

`Portal` moves an overlay out of its parent's overflow; `FocusTrap` keeps Tab inside a custom region. `Prose` is the reading column, 70ch wide, with code on one surface and tables on a hairline. `FileUpload` selects and lists files; it does not upload. `DatePicker` draws the calendar grid; the host owns the date logic beyond it.

## Do's and Don'ts

### Do

- **Do** read `var(--ui-*)` or a preset name for every colour, border and shadow.
- **Do** keep every rectangle on `--ui-radius`.
- **Do** make an action a word, and use a frame only for a chosen state.
- **Do** give every icon-only control a `label`, and keep a tooltip as a hint rather than the name.
- **Do** test a new colour role on both `--ui-bg` and `--ui-surface` in all twelve theme and mode pairs.
- **Do** let text roles carry sentences and keep `--ui-ink-muted` for decoration.

### Don't

- **Don't** write a hex or `rgb()` value inside a component; the contract test fails.
- **Don't** add a filled call to action or an outlined action button.
- **Don't** use a status signal where a status word belongs, or the reverse.
- **Don't** invent a second corner size, a second font family or a second icon stroke.
- **Don't** use a clickable table row as a keyboard control; put the action in a cell.
- **Don't** add locale strings, fetch calls or application imports to the kit.

## What the kit does not own

`NoteCard`, `NoteBoard`, `Sidebar`, `Editor`, `TerminalPanel`, the conflict screens, the command palette, charts, a date engine, an upload transport and a drag-and-drop board are product patterns. They may be assembled from these primitives, but their content and behaviour belong to the app. See [`docs/migrating-monos.md`](docs/migrating-monos.md) for the map.
