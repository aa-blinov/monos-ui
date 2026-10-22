# Changelog

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
