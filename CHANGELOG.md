# Changelog

## 2.0.0

- The kit's faces are now Medeo (SIL OFL 1.1, Latin and Cyrillic): `mono` is
  Medeo Mono, `sans` is Medeo Sans, and the old `serif` face is gone in favour
  of `pixel`, Medeo Pixel, a display face. JetBrains Mono, Inter and Source
  Serif 4 no longer ship, which also trims the package.
- Migration: a host that stored `data-font="serif"` must map it to `mono` or
  `sans` (or `pixel`); a host that named `'JetBrains Mono'` or `'Inter'` in
  its own CSS should name `'Medeo Mono'` or `'Medeo Sans'`.

## 1.5.3

- `FieldControl` renders a real `<input>`, `<textarea>` or `<select>` instead of
  one `<svelte:element>`, so Svelte's development runtime no longer prints the
  self-closing warning for every text field. The props, events and classes are
  the same.
- `FocusTrap` skips `tabindex="-1"` buttons, inputs, links, selects and
  textareas: they cannot be reached with Tab, so they are no longer the first or
  last stop that Tab wraps around.

## 1.5.2

- Gallery: the top bar has a fixed 48px height and the phone section picker
  tucks 2px under it, so no strip of the page shows between them while
  scrolling.

## 1.5.1

- `FontPicker` cards shrink to the screen: the one-column grid is
  `minmax(0, 1fr)` and each card is `min-w-0`, so a long sample line no longer
  widens the page on a phone. The gallery's phone frame shrinks the same way at
  320px.

## 1.5.0

- Typefaces: JetBrains Mono (the default), Inter and Source Serif 4, each as
  variable woff2 with Latin and Cyrillic (`styles/fonts.css`, imported by
  `styles.css`; the licences sit beside the files). `data-font="mono | sans |
serif"` on the root sets `--ui-font`. `fonts`, `fontNames` and `DEFAULT_FONT`
  describe them (`@monos/ui/fonts`).
- `FontPicker`: a radio group of cards, each set in its own face. `apply` writes
  `data-font` for the host; `options` takes a host's own faces.
- The mobile profile is split into `iphone` and `android` (the `mobile` token
  block stays as an alias of `iphone`). iOS centres the title over a 44px bar
  with small tab labels; Android left-aligns it over a 56px bar, marks the
  current tab with a pill and squares the `Fab`.
- `MindMap` measures its boxes with the face the page uses, and again when
  `data-font` changes.
- The gallery remembers the theme, mode, font and profile across a reload, has
  a font switch in the header and a font picker in Type, and an iPhone or
  Android switch on the mobile parts.

## 1.4.0

- Device profiles: desktop, laptop, tablet, mobile and watch. Put
  `data-profile` on an app root and the bar height and touch target follow the
  device (`styles/profiles.css`, imported by `styles.css`). `profiles` and
  `profileNames` describe each one (`@monos/ui/profiles`).
- `DeviceFrame` shows a layout at the real screen size of a profile, scaled to
  fit, with the safe-area insets of that device.
- `TopBar` and `BottomNav` mark their subtitle, actions and tab labels
  `ui-wide-only`; the watch profile hides them. A `BottomNav` item keeps its
  `aria-label` either way.
- `SegmentedControl` options no longer wrap their labels.
- The gallery has a sticky section index with the current section marked, a
  sticky section picker on a phone, and a Devices part with a profile switcher.

## 1.3.1

- `Button` drops its own `px-*` and `justify-center` when the host passes a
  `p-`, `px-` or `justify-` class. Tailwind orders those by value, so `px-0` and
  `justify-start` used to lose to the kit's defaults.

## 1.3.0

- `MindMap`: a tree of `{ id, label, children }` drawn in SVG, laid out to the
  right or on both sides of the root. Branches fold, the background pans,
  Ctrl or Cmd with the wheel zooms, and arrow keys move through the nodes as a
  WAI-ARIA tree. No new dependency.
- `layoutMindMap` and `measureLabel` are exported for hosts that draw their
  own map.
- The gallery has a Mind map section.

## 1.2.1

- `Button` label wrapper fills the button and inherits its `justify-content`,
  so `justify-between` and `justify-start` on a button spread or align its
  children again. They had collapsed into one group since 1.1.20.

## 1.2.0

- Mobile set for a phone app: `TopBar`, `BottomNav`, `BottomSheet`, `ListRow`
  and `Fab`. Each pads itself with the safe-area insets and keeps targets at
  44px.
- Tokens `--ui-safe-top`, `--ui-safe-right`, `--ui-safe-bottom`,
  `--ui-safe-left` and `--ui-bar-height`; the Tailwind preset adds `h-bar` and
  `min-h-touch`.
- The gallery reads in seven numbered parts (foundations, inputs, content,
  layout and navigation, overlays and feedback, utilities, mobile) with a
  grouped section index, and has a Mobile section with a phone frame.

## 1.1.18

- `FilterChip` is a selectable chip: `aria-pressed`, active border, optional
  `element` binding for measurement.

## 1.1.17

- `FieldControl` takes `bare`, so a host with its own field classes can still
  use the component and its `inputEl`.

## 1.1.16

- `FieldControl` exposes `inputEl`, so an inline editor can focus and select the
  native field after mount.

## 1.1.15

- `Menu` items take `checked`; they render as `menuitemradio`, carry
  `aria-checked` and show a check mark.

## 1.1.14

- `SearchField` takes `clearable`. A compact field that has its own close button
  can hide the built-in clear button.

## 1.1.13

- `Tabs` takes `closable`, `closeLabel` and a `bare` variant; items take
  `testid`, `closeTestid` and `class`.

## 1.1.12

- `FieldControl` keeps its `value` in step on `change` too, not only on `input`.
  A native select bound to a store updates the store before its change handler.

## 1.1.11

- `SearchField` takes `clearOnEscape`. A command palette can close on Escape
  instead of clearing its query first.

## 1.1.10

- `Menu` takes a bindable `open`; items take `iconProps` and `class`.
- A product menu can keep its state, its filled icons and its mobile-only rows.

## 1.1.9

- `Menu` items take `href` and `testid`; the list takes `menuTestid`. A product
  menu keeps its links and its existing test hooks.

## 1.1.8

- `Card` takes `bare`, so a product that already paints its own note card can
  still use the kit surface for structure and events.

## 1.1.7

- `Card` forwards click, context-menu and drag events, so a product's existing
  card can become the kit surface without a wrapper.

## 1.1.6

- `SidebarSection` takes `toggleTestid` and `bodyTestid`, so a host can keep its
  existing collapse hooks while using the section.

## 1.1.5

- `Sidebar` takes `scroll` and `bordered`, and forwards a context-menu event from
  its scroll body. A host can keep its own scroll, resize border and background
  menu while using the shell.

## 1.1.4

- `SidebarItem` takes `style` and forwards context-menu, keyboard and drag
  events, so a product's existing tree row keeps its drag-and-drop and colour.

## 1.1.3

- `TagInput` suggestions show the same `prefix` as the chosen tags and are
  ordinary buttons, so a product keeps its `#tag` labels in the suggestions.

## 1.1.2

- `TagInput` takes `ariaLabel`, `testid`, `suggestionsTestid`, `prefix`,
  `commitOnBlur`, and `removeLabel` can be a function of the tag. This lets a
  product keep its "Remove tag alpha" labels and `#` prefixes.
- 68 tests.

## 1.1.1

- `Select` `sm` is 28px, like the other small controls.
- `SearchField` uses the same 28/36/44 scale; `md` is 36px, not 40px.
- `SegmentedControl` has a fixed outer height, `full` and `lg`; its `sm` and `md`
  now line up with `Select` and the fields.
- The control scale is documented in `docs/tokens.md`; 67 tests.

## 1.1.0

- `Sidebar`, `SidebarSection` and `SidebarItem` give a product shell a generic
  surface, a collapsible group and a navigation row with depth.
- `TagInput` adds a controlled tag field with suggestions and keyboard
  add/remove.
- 66 tests.

## 1.0.7

- `@monos/ui/field` exposes `fieldControlClass` without importing the Svelte
  components, so a host's Node-side helpers and tests can use it.

## 1.0.6

- `FieldControl` and `fieldControlClass` give a native input, select or textarea
  the same height, underline and focus as the labelled fields.
- 63 tests.

## 1.0.5

- `Modal` keeps a stack of open dialogs: only the top one answers Escape and
  holds Tab, and a child dialog returns focus to the panel under it.
- A control inside a dialog that autofocuses keeps focus; the panel is the
  fallback.
- `Modal` takes `widthClass`, `titleClass` and `descriptionClass` so a host can
  keep its own dialog face without copying the panel.
- 62 tests.

## 1.0.4

- `IconButton` takes `bare` for a host that owns the row size and variant.
- `SearchField` exposes `inputEl` and a `trailing` slot, so a product can put a
  save action inside the field without replacing it.
- 62 tests.

## 1.0.3

- Added ESLint and Prettier gates for JavaScript and Svelte; CI now runs `lint` and `format:check`.
- Split the gallery into one component per section under `gallery/sections/`; `App.svelte` keeps the shell, theme state and header.
- Fixed a duplicate `Breadcrumbs` import and kept `Table`'s `aria-sort` reactive after extracting its helper.

## 1.0.2

- Code hygiene: exports sorted, unused bindings and test imports removed, the gallery's section list defined once, the enabled-index wrap simplified.
- `Portal` now survives a change of target correctly and cannot re-attach itself after destroy.
- No public API change.

## 1.0.1

- The indeterminate `Progress` bar now has two offset segments, so it never shows an empty track at a bad animation frame.
- On a phone, the gallery's section index is a collapsed "Jump to a section" disclosure instead of a five-line wall.
- `NavItem` labels stay left-aligned inside the button; the separator demo no longer creates horizontal overflow.

## 1.0.0

- Layout primitives: `Container`, `Stack`, `Grid`, `Section`, `Separator`.
- Navigation: `Stepper`, `NavItem`.
- Data: `List`, `DescriptionList`.
- Utilities: `Portal`, `FocusTrap`.
- 53 primitives; 61 tests; the gallery has Layout, Data, Utilities and the final navigation controls.

## 0.6.0

- Status **words** now use generated AA text roles (`--ui-*-text`); status dots and fills keep the vivid signal.
- Every theme/mode passes AA for badge words, destructive labels and field errors on the page and on a card.
- Smaller polish: mobile chip remove targets, status-dot sizes per avatar size, vertical radio group on a phone, no horizontal overflow at 320px.

## 0.5.1

- `Tabs` no longer shows a stray vertical scrollbar. The line variant draws its active underline inside the tab, and the scroll container hides the vertical axis.

## 0.5.0

- `Breadcrumbs`, `PageHeader`, `Pagination`, `Drawer` and `Prose`.
- 42 primitives; 49 tests; the gallery has a Navigation and content section.

## 0.4.0

- `Combobox`, `MultiSelect`, `DatePicker`, `Slider`, `FileUpload`, `Fieldset` and `FormField`.
- The form layer is controlled and labelled: bindable values, real listboxes, a drawn calendar and a native range.
- 37 primitives; 44 tests; the gallery has a Form controls section.

## 0.3.0

- `Tabs`, `Accordion`, `Popover`, `AlertDialog`, `RadioGroup`, `Progress`, `Skeleton`, `Avatar`, `Table`, and `Toaster` / `toast`.
- `Modal` takes `role`, `showClose` and `initialFocus`; `AlertDialog` is built on them.
- `Button` exposes its DOM node as `buttonEl`; `Checkbox` takes `ariaLabel`.
- The gallery has Structure, Table, Overlays, Feedback and People sections; 30 primitives.

## 0.2.0

- `Select`: a themed listbox with a drawn popup, keyboard navigation and a selected check. The gallery theme picker uses it; `SelectField` stays native for forms.
- The GitHub Pages site is now a landing page: a sticky nav, the install command with a copy button, package facts, jump links and a footer.

## 0.1.0

- The first extraction from Monos: six themes with light and dark modes, no JavaScript needed to switch.
- Semantic tokens for colour, geometry, type, depth, motion and layers; the Tailwind preset names them.
- Svelte 4 primitives: Button, IconButton, TextField, TextArea, Select, SelectField, SearchField, Checkbox, Switch, Chip, Badge, Card, Menu, Modal, Notice, SegmentedControl, EmptyState, Kbd, Spinner, Tooltip.
- A gallery that shows every component in every theme, a contract test, contrast tests and behaviour tests.
