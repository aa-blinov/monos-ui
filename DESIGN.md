# Monos UI — the design system

The kit is a desk under warm light: paper, ink, one corner, and controls that are words before they are boxes. It is extracted from Monos, but it is not the notes app: the editor, the note card, the sidebar and the terminal stay in the product.

**Source of truth.** Colour values live in [`src/themes.js`](src/themes.js); geometry in [`src/styles/tokens.css`](src/styles/tokens.css); the utility names in [`src/tailwind-preset.js`](src/tailwind-preset.js). This file explains the rules; [`docs/tokens.md`](docs/tokens.md) lists the tokens, and [`docs/components.md`](docs/components.md) lists the APIs.

## Colour is a role

Six palettes ship in a light and a dark mode: Gruvbox (the reference), GitHub, Dracula, Nord, Solarized, Catppuccin. A component never names a palette colour; it reads `--ui-bg`, `--ui-ink`, `--ui-line`, `--ui-danger` and their siblings. A theme is a set of values behind those roles, so a new palette is data, not a component change.

- `--ui-bg` / `--ui-surface` / `--ui-surface-2` are three tonal steps, not three colours.
- `--ui-ink` is body text; `--ui-ink-soft` supports it; `--ui-ink-faint` is metadata; `--ui-ink-muted` is decoration and disabled, never a sentence.
- `--ui-accent`, `--ui-danger`, `--ui-warning`, `--ui-success`, `--ui-info` are state signals. They are not decoration.
- The text roles clear WCAG AA on the page and on a card in all twelve theme/mode pairs; the Solarized ink is walked slightly darker/lighter than the upstream ramp for that reason.

The full contract and the theme names are in [`docs/tokens.md`](docs/tokens.md).

## Type

One face at a time: JetBrains Mono, with the system monospace stack behind it. Code stays in the fixed face; nothing else introduces a second family.

The working scale is small: `30px` display, `24px` headline, `20px` title, `14px` body, `12px` interface, `11px` metadata. Metadata is uppercase and tracked; it whispers, it does not compete with the title.

## Space and shape

One 4px grid, one radius.

- The grid: 2, 4, 6, 8, 10, 12, 16, 24, 32. A surface changes the role (card, panel, modal), not the number.
- The radius is `6px` for every rectangle: cards, menus, fields, buttons, tags, checkboxes. Circles are only for things round by nature.
- Controls step 24, 28, 32, 36, 40, 44px; icons 12, 14, 16, 20, 24px. On a phone the primary controls grow to 44px, because a finger is not a pointer.
- Icons share one stroke, `1.7`.

## Depth

Flat at rest, lifted by touch.

A card has `shadow-rest` (`0 1px 2px / 3%`), which is paper texture rather than shadow. Hover adds `shadow-lift` and a half-pixel rise; a modal or menu uses `shadow-overlay`. Nothing permanent carries a shadow that means "important".

## The components

- **Text buttons.** The word is the button: `primary` is bold ink, `secondary` is soft ink, `danger` is red. There is no filled call to action and no outlined action. The only frame is a toggle's chosen state.
- **Icon buttons** are 28/36/44px squares with a required `label`. A tooltip repeats the name; it is never the only name.
- **Fields** are underline rows (`h-9`, bottom border), with search fields as pills. Height is declared, not derived from padding. A choice whose list is part of the interface uses `Select`, a themed listbox; a long form may keep the native `SelectField`.
- **A searchable choice** is a `Combobox` (one) or `MultiSelect` (several): a field, a filtered listbox and an active option named by `aria-activedescendant`. `Select` is for a short fixed list; the native `SelectField` is for a long form.
- **A date** is a `DatePicker`: an ISO string, a drawn calendar, month and weekday names from `Intl`, and min/max compared as strings. The kit owns no date arithmetic beyond the calendar grid.
- **A range** is a `Slider`: a native range with a themed track and a thumb that is a circle because a thumb is round by nature. The value is visible beside the label.
- **A file** is a `FileUpload`: a drop zone, a real file input and a list of `File` objects. The kit picks and lists; it does not upload.
- **A group** is a `Fieldset`; a label, hint and error around an arbitrary control is a `FormField`. The error is an alert and wins over the hint.
- **Chips** are bordered labels, not filters; **badges** are uppercase status words, optionally with a dot.
- **Cards** are `bg-surface`, one border and a resting shadow. `interactive` makes the card a button and adds the lift.
- **Menus** are a trigger plus data items; arrows, Home/End, Escape and an outside click work; the first item takes focus when the menu opens.
- **Modals** name themselves, trap Tab, lock the page, close on Escape or the backdrop, and return focus.
- **Notices** are inline, one dot, a title and a sentence.
- **Tabs** are a line under the word (`line`) or a frame around the chosen option (`pill`). One tab is in the tab order; arrows and Home/End move. A tab is navigation, not an action.
- **Accordions** are heading buttons over a region. The chevron turns; the content is hidden, not removed; one open at a time unless `multiple`.
- **Popovers** are anchored, non-modal panels. They flip when the page runs out of room and close on Escape or an outside click; the content is any markup.
- **Alert dialogs** are the one dialog with no close cross and no backdrop dismissal. The focus starts on Cancel, because the safe choice should be the easy one.
- **Radio groups** are real radios; the circle is round by nature. `Checkbox`, `Switch`, `RadioGroup` and `Select` are the four forms of a choice; do not use one where another is the honest control.
- **Progress** is a thin bar with the one radius. Indeterminate is a sweep, not a spinner in disguise; `Skeleton` reserves the size the content will take, so the arrival does not move the page.
- **Avatars** are circles, image or initials, with a status dot on the edge. The dot is the only place where a status colour is a dot, not a word; it is never the only signal (the name is there).
- **Tables** are for data, not layout. Headers sort with a triangle and `aria-sort`; selection is a checkbox column; a row action belongs in a cell, because a clickable `<tr>` is not a keyboard control.
- **Breadcrumbs** say where the page sits; the last item is the current page, not a link. The separator is a slash, never a middle dot.
- **A page header** is a title, a sentence and the actions at the top right. It is a pattern, not an app shell.
- **Pagination** keeps first, last and the current neighbourhood; a gap is an ellipsis, not a disabled button.
- **A drawer** is the side version of a modal: same focus trap, same scroll lock, same focus return, a slide from the edge. Use it for navigation or a long filter form on a phone.
- **Prose** is the reading column: 70ch measure, 14/1.7 body, one face, code on one surface, tables with a hairline. It owns rhythm, not words.
- **Toasts** are transient and live in one region; `Notice` is inline and stays. A danger toast is an alert; the rest are status. Four at a time is enough.
- **The tooltip** is one look and one delay (450ms; immediate on keyboard focus), and it does not exist below 640px.

## States

Every control has rest, hover, `:focus-visible`, disabled and, where it applies, selected or loading. A state never relies on colour alone: a checkbox has a check, a tab has an underline, a sort has a triangle, a toast has a word and a dot.

The touch target is 44px on a phone for anything a finger presses, including a calendar day. A desktop row may be 24 or 28px; the padding around it is what makes the target, not the glyph.

## Motion

Only state changes move. `--ui-duration-fast` (150ms) for colour and focus, `--ui-duration-base` (200ms) for the larger transitions. The card lift is half a pixel; a popover and a toast arrive in 200ms; an indeterminate bar sweeps. Under `prefers-reduced-motion`, the lift is removed, the popover does not slide, the skeleton stops pulsing and the sweep becomes a still, low-opacity bar. Nothing jumps.

## Rules

**The variable rule.** A component reads `var(--ui-…)` or a Tailwind name from the preset. A hex inside a component is a defect.

**The one-radius rule.** Every rectangle is `--ui-radius`. Density changes size and padding, never the corner.

**The text-button rule.** No filled or outlined action buttons. A frame belongs to a choice among options, not to an action.

**The flat-by-default rule.** Depth answers hover or overlay, not importance.

**The accent rule.** Accents mean state. Spending red, orange or yellow on decoration spends their meaning.

**The words rule.** The kit has no locale files. Every label, message and empty state comes from the product as a prop or a slot; the kit supplies the shape, not the language.

## What the kit does not own

`NoteCard`, `NoteBoard`, `Sidebar`, `Editor`, `TerminalPanel`, the conflict screens, the command palette, charts, a date engine, an upload transport and a drag-and-drop board are product patterns. They may be assembled from these primitives, but their content and behaviour belong to the app. See [`docs/migrating-monos.md`](docs/migrating-monos.md) for the map.
