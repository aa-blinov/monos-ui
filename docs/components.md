# Components

Every component is a Svelte 4 component. Labels are props or slots; there are no locale files, stores or API calls in the kit.

## Button

Text-only action. No filled or outlined variant: the word is the button.

| Prop       | Type                                              | Default   | Notes                                        |
| ---------- | ------------------------------------------------- | --------- | -------------------------------------------- |
| `variant`  | `primary \| secondary \| text \| quiet \| danger` | `primary` | `quiet` is sentence case; the rest uppercase |
| `size`     | `sm \| md \| lg`                                  | `md`      | 28 / 36 / 44px                               |
| `type`     | string                                            | `button`  |                                              |
| `disabled` | boolean                                           | `false`   |                                              |
| `loading`  | boolean                                           | `false`   | Disables, shows a spinner, `aria-busy`       |
| `full`     | boolean                                           | `false`   |                                              |
| `buttonEl` | HTMLButtonElement                                 | `null`    | The DOM node, for a parent that focuses it   |
| `class`    | string                                            | `''`      |                                              |

Slots: default, `icon`, `trailing`. Event: `click`.

## IconButton

| Prop          | Type               | Default     | Notes                                |
| ------------- | ------------------ | ----------- | ------------------------------------ |
| `label`       | string             | required    | `aria-label`; the tooltip repeats it |
| `tooltipText` | string \| `''`     | `label`     | `''` removes the tooltip             |
| `variant`     | `outline \| ghost` | `outline`   |                                      |
| `size`        | `sm \| md \| lg`   | `md`        | 28 / 36 / 44px                       |
| `disabled`    | boolean            | `false`     |                                      |
| `pressed`     | boolean            | `undefined` | Adds `aria-pressed`                  |
| `class`       | string             | `''`        |                                      |

Slot: default (the icon). Event: `click`.

## TextField

| Prop                                    | Type                 | Default                 |
| --------------------------------------- | -------------------- | ----------------------- |
| `value`                                 | string               | `''` (bindable)         |
| `label` / `hint` / `error`              | string               | `''`                    |
| `id`                                    | string               | generated               |
| `type`                                  | string               | `text`                  |
| `name` / `placeholder` / `autocomplete` | string               | `''` / `''` / undefined |
| `size`                                  | `sm \| md \| lg`     | `md`                    |
| `variant`                               | `underline \| boxed` | `underline`             |
| `disabled` / `required`                 | boolean              | `false`                 |
| `class`                                 | string               | `''`                    |

Events: `input`, `change`, `keydown`, `focus`, `blur`.

## TextArea

Same label, hint, error, `variant`, `disabled`, `required` and `class` props as TextField, plus `rows` (4), `name`, `placeholder`, `id`, `value` (bindable). Events: `input`, `change`, `keydown`, `focus`, `blur`.

## Select

A themed single choice: the trigger shows the current label, the popup is drawn by the kit. Use it where the choice is part of the interface (a theme picker, a toolbar mode). For a long form with many options, `SelectField` is the native control.

| Prop          | Type                             | Default         |
| ------------- | -------------------------------- | --------------- |
| `value`       | string                           | `''` (bindable) |
| `options`     | `{ value, label?, disabled? }[]` | `[]`            |
| `label`       | string                           | `''`            |
| `placeholder` | string                           | `Select`        |
| `size`        | `sm \| md \| lg`                 | `md`            |
| `disabled`    | boolean                          | `false`         |
| `class`       | string                           | `''`            |

Event: `change` with `{ value, option }`. The trigger opens with Enter/Space or ArrowDown/ArrowUp; arrows, Home and End move; Enter chooses; Escape closes and returns focus; an outside click closes. The list is a `role="listbox"` with `role="option"` rows and `aria-selected`.

## SelectField

| Prop                       | Type                             | Default         |
| -------------------------- | -------------------------------- | --------------- |
| `value`                    | string                           | `''` (bindable) |
| `options`                  | `{ value, label?, disabled? }[]` | `[]`            |
| `label` / `hint` / `error` | string                           | `''`            |
| `placeholder`              | string                           | `''`            |
| `size`                     | `sm \| md \| lg`                 | `md`            |
| `variant`                  | `underline \| boxed`             | `underline`     |

Events: `change`, `focus`, `blur`.

## SearchField

| Prop          | Type             | Default         |
| ------------- | ---------------- | --------------- |
| `value`       | string           | `''` (bindable) |
| `label`       | string           | `Search`        |
| `placeholder` | string           | `Search`        |
| `clearLabel`  | string           | `Clear`         |
| `size`        | `sm \| md \| lg` | `md`            |
| `disabled`    | boolean          | `false`         |
| `class`       | string           | `''`            |

Events: `input`, `clear`, `keydown`, `focus`, `blur`. Escape clears a non-empty value and stops there.

## Checkbox

`checked` (bindable), `indeterminate`, `disabled`, `id`, `ariaLabel`, `class`. Slot: label. Event: `change`. `ariaLabel` names a box that has no visible label, as in a table.

The row is 24px; on a touch screen it is 44px.

## Switch

`checked` (bindable), `disabled`, `class`. Slot: label. Event: `change` with the new boolean. Renders `<button role="switch" aria-checked>`.

## FilterChip

A selectable chip for a filter row: a real button with `aria-pressed`, the active border and a bound `element` for measuring before it is shown.

`active`, `disabled`, `element` (bindable), `class`. Slot: label. Event: `click`.

## Chip

`tone`: `neutral | accent | danger | warning | success`; `size`: `sm | md`; `removable`; `removeLabel`; `class`. Slot: label. Event: `remove`.

## Badge

`tone`: `neutral | accent | danger | warning | success`; `dot`; `class`. Slot: the word.

## Card

| Prop          | Type                     | Default |
| ------------- | ------------------------ | ------- |
| `as`          | element name             | `div`   |
| `padding`     | `none \| sm \| md \| lg` | `md`    |
| `interactive` | boolean                  | `false` |
| `selected`    | boolean                  | `false` |
| `class`       | string                   | `''`    |

Every card has `rounded-ui`, a 1px `line` border and `shadow-rest`. `interactive` adds hover lift, deepens the border and makes the card a button (`role="button"`, `tabindex="0"`, Enter/Space); with `as="a"` or `as="button"` the native role is kept. Slot: default. Events (interactive): `click`, `keydown`, `focus`, `blur`.

Do not nest another control inside an interactive card.

## Menu

| Prop        | Type                                                         | Default  |
| ----------- | ------------------------------------------------------------ | -------- |
| `items`     | `{ value?, label, icon?, disabled?, danger?, separator? }[]` | `[]`     |
| `label`     | string                                                       | `Menu`   |
| `align`     | `start \| end`                                               | `start`  |
| `placement` | `bottom \| top`                                              | `bottom` |
| `width`     | `menu \| trigger \| auto`                                    | `menu`   |
| `disabled`  | boolean                                                      | `false`  |

Event: `select` with the item.

Slot `trigger` receives:

```svelte
<Menu {items} label="Actions" on:select={...}>
  <svelte:fragment slot="trigger" let:open let:toggle let:triggerProps>
    <Button on:click={toggle} {...triggerProps}>{open ? 'Close' : 'Open'}</Button>
  </svelte:fragment>
</Menu>
```

Without a trigger slot the menu draws a quiet button with `label`. Keyboard: the trigger opens with Enter/Space; ArrowUp/Down, Home/End move; Escape closes and returns focus; Tab closes. An outside pointerdown closes.

`icon` is a Svelte component (for example a Lucide icon); it is rendered with `size={16}`, `strokeWidth="1.7"`.

## Modal

`widthClass`, `titleClass` and `descriptionClass` let a host keep its dialog face. Dialogs stack: only the top one answers Escape and holds Tab; a control that autofocuses inside the dialog keeps focus.

| Prop              | Type                    | Default            |
| ----------------- | ----------------------- | ------------------ |
| `open`            | boolean                 | `false` (bindable) |
| `title`           | string                  | `''`               |
| `description`     | string                  | `''`               |
| `size`            | `sm \| md \| lg \| xl`  | `md`               |
| `closeLabel`      | string                  | `Close`            |
| `closeOnBackdrop` | boolean                 | `true`             |
| `closeOnEscape`   | boolean                 | `true`             |
| `role`            | `dialog \| alertdialog` | `dialog`           |
| `showClose`       | boolean                 | `true`             |
| `initialFocus`    | HTMLElement             | `null`             |
| `class`           | string                  | `''`               |

Slots: default, `footer`. Event: `close`.

On open it focuses the dialog, locks page scroll, traps Tab and returns focus on close. Escape and a backdrop click close it (both configurable). The close control has no tooltip; its name is `closeLabel`.

## Notice

`tone`: `info | success | warning | danger | neutral`; `title`; `dismissible`; `dismissLabel`; `class`. Slot: the sentence. Event: `dismiss`. `danger` renders `role="alert"`, everything else `role="status"`.

## SegmentedControl

`options` (`{ value, label?, disabled? }[]`), `value` (bindable), `label`, `size` (`sm | md`), `disabled`, `class`. Event: `change`. Renders a group of buttons with `aria-pressed`.

## EmptyState

`title`, `description`, `class`. Slots: `icon`, `actions`.

## Kbd

`class`. Slot: the key. Renders `<kbd>` with the one radius and the whisper size.

## Spinner

`size`: `xs | sm | md | lg | xl`; `label`. Without a label it is `aria-hidden`; with one it is `role="status"`.

## Tooltip

`text`, `placement` (`bottom | top`), `align` (`center | start | end`), `class`. Slot: the element to hint. It is a wrapper; the hint is visual only.

The same behaviour is available as an action:

```svelte
<button use:tooltip={'Delete'}>…</button>
<button use:tooltip={{ text: 'Deletes the note for good', placement: 'top' }}>…</button>
```

It waits 450 ms under the pointer, shows at once on keyboard focus, hides on click, Escape, blur or leave, and never appears below 640px.

## Tabs

The tab list of the WAI-ARIA pattern. `items` are data; the panel comes through the `panel` slot and receives the active id.

| Prop      | Type                         | Default         |
| --------- | ---------------------------- | --------------- |
| `items`   | `{ id, label, disabled? }[]` | `[]`            |
| `value`   | string                       | `''` (bindable) |
| `label`   | string                       | `''`            |
| `variant` | `line \| pill`               | `line`          |
| `class`   | string                       | `''`            |

Event: `change` with the new id. One tab is in the tab order; ArrowLeft/ArrowRight, Home and End move and select; disabled items are skipped. With a `panel` slot the component renders `role="tabpanel"`, `aria-labelledby` and `tabindex="0"`.

```svelte
<Tabs items={tabs} bind:value={tab} label="Note view">
  <svelte:fragment slot="panel" let:active>
    {#if active === 'write'}…{/if}
  </svelte:fragment>
</Tabs>
```

## Accordion

A stack of disclosures.

| Prop           | Type                                   | Default         |
| -------------- | -------------------------------------- | --------------- |
| `items`        | `{ id, title, content?, disabled? }[]` | `[]`            |
| `open`         | string[]                               | `[]` (bindable) |
| `multiple`     | boolean                                | `false`         |
| `label`        | string                                 | `''`            |
| `headingLevel` | 2–6                                    | `3`             |
| `class`        | string                                 | `''`            |

Event: `change` with the new open ids. The default slot receives `item`; without a slot, `item.content` is rendered. The trigger is a heading button with `aria-expanded` and `aria-controls`; the panel is a `role="region"`.

```svelte
<Accordion {items} bind:open let:item>{item.body}</Accordion>
```

## Popover

An anchored, non-modal panel for arbitrary content.

| Prop                               | Type                     | Default            |
| ---------------------------------- | ------------------------ | ------------------ |
| `open`                             | boolean                  | `false` (bindable) |
| `placement`                        | `bottom \| top`          | `bottom`           |
| `align`                            | `start \| center \| end` | `start`            |
| `width`                            | `sm \| md \| lg`         | `md`               |
| `label`                            | string                   | `''`               |
| `focusOnOpen`                      | boolean                  | `false`            |
| `closeOnEscape` / `closeOnOutside` | boolean                  | `true`             |
| `class`                            | string                   | `''`               |

Events: `open`, `close`. The `trigger` slot receives `open`, `toggle` and `triggerProps` (spread them on the trigger). Without a slot it draws a quiet button named by `label`. The panel is a `role="dialog"`; it flips above the trigger when there is no room below. An outside pointerdown or Escape closes it; `focusOnOpen` moves focus to the first control.

## AlertDialog

| Prop                    | Type                | Default            |
| ----------------------- | ------------------- | ------------------ |
| `open`                  | boolean             | `false` (bindable) |
| `title` / `description` | string              | `''`               |
| `confirmLabel`          | string              | `Confirm`          |
| `cancelLabel`           | string              | `Cancel`           |
| `tone`                  | `danger \| neutral` | `danger`           |
| `loading`               | boolean             | `false`            |
| `closeOnConfirm`        | boolean             | `true`             |
| `closeOnEscape`         | boolean             | `true`             |

Events: `confirm`, `cancel`. It is a `role="alertdialog"` with no close cross and no backdrop dismissal; focus starts on Cancel. The default slot adds body content; the footer is fixed to Cancel and Confirm. With `closeOnConfirm={false}` the product owns closing, which is what an async action needs; set `loading` while it runs.

## RadioGroup

| Prop          | Type                                           | Default         |
| ------------- | ---------------------------------------------- | --------------- |
| `value`       | string                                         | `''` (bindable) |
| `options`     | `{ value, label?, description?, disabled? }[]` | `[]`            |
| `label`       | string                                         | `''`            |
| `name`        | string                                         | generated       |
| `orientation` | `vertical \| horizontal`                       | `vertical`      |
| `disabled`    | boolean                                        | `false`         |
| `class`       | string                                         | `''`            |

Event: `change` with the value. Real `<input type="radio">` elements share one name, so the browser moves with the arrow keys; the circle and its dot are drawn by the kit.

## Progress

| Prop            | Type                                             | Default  |
| --------------- | ------------------------------------------------ | -------- |
| `value`         | number                                           | `0`      |
| `max`           | number                                           | `100`    |
| `label`         | string                                           | `''`     |
| `tone`          | `accent \| success \| warning \| danger \| info` | `accent` |
| `size`          | `sm \| md \| lg`                                 | `md`     |
| `indeterminate` | boolean                                          | `false`  |
| `class`         | string                                           | `''`     |

`role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`; indeterminate omits the value. The label is the accessible name, not a visible caption. The indeterminate sweep stops under reduce motion.

## Skeleton

`width` (`100%`), `height` (`1rem`), `rounded` (`ui | full`), `class`. It is `aria-hidden`; set the size the content will need so the page does not move when it arrives. The pulse stops under reduce motion.

## Avatar

| Prop           | Type                         | Default     |
| -------------- | ---------------------------- | ----------- |
| `src`          | string                       | `''`        |
| `alt` / `name` | string                       | `''`        |
| `size`         | `xs \| sm \| md \| lg \| xl` | `md`        |
| `status`       | `online \| away \| offline`  | `undefined` |
| `class`        | string                       | `''`        |

With `src` it shows the picture; without it, the initials of `name` (two letters); a failed image falls back to the initials. Circles are round by nature; the status dot sits on the edge.

## Table

| Prop             | Type                                                      | Default           |
| ---------------- | --------------------------------------------------------- | ----------------- |
| `columns`        | `{ key, label, align?, width?, sortable?, sortValue? }[]` | `[]`              |
| `rows`           | object[]                                                  | `[]`              |
| `rowKey`         | string \| `(row) => key`                                  | `id`              |
| `caption`        | string                                                    | `''`              |
| `density`        | `comfortable \| compact`                                  | `comfortable`     |
| `selectable`     | boolean                                                   | `false`           |
| `selected`       | key[]                                                     | `[]` (bindable)   |
| `sort`           | `{ key, direction } \| null`                              | `null` (bindable) |
| `manualSort`     | boolean                                                   | `false`           |
| `stickyHeader`   | boolean                                                   | `true`            |
| `emptyLabel`     | string                                                    | `No rows`         |
| `selectAllLabel` | string                                                    | `Select all rows` |
| `selectRowLabel` | `(row, index) => string`                                  | `Select row N`    |

Events: `sort` with the next sort or `null`, `select` with the selected keys. A sort cycles ascending, descending and off; without `manualSort` the table sorts by the column key (or `sortValue(row)`). The header uses `aria-sort`; the caption is screen-reader only. Cells render `row[column.key]` or the `cell` slot (`let:row let:column let:value`); `empty` replaces the empty row. Row actions belong in a cell, not on the row.

## Toaster and toast

`Toaster` renders the queue; mount one near the app root.

| Prop           | Type                                                                    | Default        |
| -------------- | ----------------------------------------------------------------------- | -------------- |
| `position`     | `bottom-right \| bottom-left \| top-right \| top-left \| bottom-center` | `bottom-right` |
| `max`          | number                                                                  | `4`            |
| `dismissLabel` | string                                                                  | `Dismiss`      |

The store functions are exported beside it:

```js
import { toast, dismissToast, clearToasts, toasts, Toaster } from '@monos/ui';

toast('Saved');
toast({ title: 'Sync failed', description: 'The token cannot write.', tone: 'danger', duration: 0 });
toast({ title: 'Deleted', tone: 'success', action: { label: 'Undo', onClick: undo } });
```

`toast(options | string)` returns the id. `title`, `description`, `tone` (`neutral | info | success | warning | danger`), `duration` (5000; `0` keeps it) and `action` (`{ label, onClick }`) are the options. The store keeps four; older messages are dropped and their timers cleared. A danger toast is `role="alert"`; the rest are `role="status"`. The action dismisses after `onClick`.

## Fieldset

`legend`, `hint`, `disabled`, `class`. A native `<fieldset>` with a legend; the default slot holds the controls. Disabling the fieldset disables everything inside it.

## FieldControl

`as` (`input | select | textarea`), `value`, `type`, `options`, `id`, `name`, `placeholder`, `disabled`, `rows`, `inputEl`, `bare`, `variant` (`underline | boxed`), `size`, `class`. A native field with the kit geometry, for a product that already owns its label, hint and error. The same class is exported as `fieldControlClass({ variant, size, extraClass })`.

## FormField

A label, a hint and an error around a control the kit does not wrap.

| Prop             | Type    | Default |
| ---------------- | ------- | ------- |
| `label`          | string  | `''`    |
| `hint` / `error` | string  | `''`    |
| `forId`          | string  | `''`    |
| `required`       | boolean | `false` |
| `class`          | string  | `''`    |

The slot receives `describedBy`; put it on the control's `aria-describedby`. An error is `role="alert"` and wins over the hint. Without `forId` the label is a `span`, so pass the control's id when there is one.

## Slider

A native `<input type="range">`, themed.

| Prop                       | Type                | Default           |
| -------------------------- | ------------------- | ----------------- |
| `value`                    | number              | `0` (bindable)    |
| `min` / `max` / `step`     | number              | `0` / `100` / `1` |
| `label` / `hint` / `error` | string              | `''`              |
| `id`                       | string              | generated         |
| `disabled`                 | boolean             | `false`           |
| `showValue`                | boolean             | `true`            |
| `format`                   | `(value) => string` | `null`            |
| `class`                    | string              | `''`              |

Events: `input` and `change` with the number. The track is filled to the value; the thumb is a circle because a thumb is round by nature. Keyboard is the browser's range behaviour.

## Combobox

A searchable single choice. The input is the combobox; the popup is a listbox.

| Prop                        | Type                             | Default                |
| --------------------------- | -------------------------------- | ---------------------- |
| `value`                     | string                           | `''` (bindable)        |
| `options`                   | `{ value, label?, disabled? }[]` | `[]`                   |
| `label` / `placeholder`     | string                           | `''`                   |
| `emptyLabel` / `clearLabel` | string                           | `No results` / `Clear` |
| `hint` / `error`            | string                           | `''`                   |
| `disabled`                  | boolean                          | `false`                |
| `id`                        | string                           | generated              |
| `class`                     | string                           | `''`                   |

Event: `change` with `{ value, option }`; `option` is `null` when cleared. Focusing opens the list; typing filters by label and value; ArrowDown/ArrowUp, Home/End move; Enter chooses; Escape closes; Tab closes. The list has `role="listbox"` and the input names the active option with `aria-activedescendant`.

## MultiSelect

The multiple version of Combobox. Selected values are chips inside the field.

| Prop                                        | Type                             | Default                               |
| ------------------------------------------- | -------------------------------- | ------------------------------------- |
| `values`                                    | string[]                         | `[]` (bindable)                       |
| `options`                                   | `{ value, label?, disabled? }[]` | `[]`                                  |
| `label` / `placeholder`                     | string                           | `''`                                  |
| `emptyLabel` / `clearLabel` / `removeLabel` | string                           | `No results` / `Clear all` / `Remove` |
| `hint` / `error`                            | string                           | `''`                                  |
| `disabled`                                  | boolean                          | `false`                               |
| `id`                                        | string                           | generated                             |
| `class`                                     | string                           | `''`                                  |

Event: `change` with the values array. The list stays open while picking; Backspace with an empty query removes the last value; each chip has a named remove button; the listbox is `aria-multiselectable="true"`.

## DatePicker

A field with a drawn calendar.

| Prop                                         | Type             | Default                                   |
| -------------------------------------------- | ---------------- | ----------------------------------------- |
| `value`                                      | ISO `YYYY-MM-DD` | `''` (bindable)                           |
| `label` / `placeholder`                      | string           | `''` / `Select a date`                    |
| `hint` / `error`                             | string           | `''`                                      |
| `min` / `max`                                | ISO string       | `''`                                      |
| `locale`                                     | BCP 47 tag       | `en-US`                                   |
| `firstDay`                                   | `0 \| 1`         | `1` (Monday)                              |
| `clearable`                                  | boolean          | `true`                                    |
| `clearLabel` / `previousLabel` / `nextLabel` | string           | `Clear` / `Previous month` / `Next month` |
| `disabled` / `required`                      | boolean          | `false`                                   |
| `id`                                         | string           | generated                                 |
| `class`                                      | string           | `''`                                      |

Event: `change` with the ISO string, or `''` when cleared. The visible date and the month/weekday names come from `Intl`; the kit owns no date engine. `min`/`max` are compared as strings, which is why the value is ISO. Keyboard: arrows move by day/week, Home/End to the week's edges, PageUp/PageDown by month, Escape closes and returns focus.

## FileUpload

A drop zone and a file list.

| Prop                    | Type    | Default                            |
| ----------------------- | ------- | ---------------------------------- |
| `files`                 | File[]  | `[]` (bindable)                    |
| `accept`                | string  | `''`                               |
| `multiple`              | boolean | `true`                             |
| `disabled`              | boolean | `false`                            |
| `label` / `chooseLabel` | string  | `Drop files here` / `Choose files` |
| `removeLabel`           | string  | `Remove`                           |
| `hint` / `error`        | string  | `''`                               |
| `class`                 | string  | `''`                               |

Event: `change` with the files array. The component picks and lists files; it does not upload. `accept` filters the picker; a dropped file is not filtered by the component. Drop, click and Enter/Space open the picker; each file has a named remove button.

## Breadcrumbs

`items` (`{ label, href? }[]`), `label` (`Breadcrumb`), `class`. The last item is the current page (`aria-current="page"`) and is not a link. The separators are a decorative slash, not a middle dot.

## PageHeader

`title`, `description`, `level` (1–6), `class`. Slot `actions`. It draws the page's heading, a sentence and the actions at the top right; the heading level is a prop because a page header is not always the document's first heading.

## Pagination

| Prop                          | Type   | Default                       |
| ----------------------------- | ------ | ----------------------------- |
| `page`                        | number | `1` (bindable)                |
| `pages`                       | number | `1`                           |
| `label`                       | string | `Pagination`                  |
| `previousLabel` / `nextLabel` | string | `Previous page` / `Next page` |
| `class`                       | string | `''`                          |

Event: `change` with the new page. Up to seven pages are all shown; longer ranges keep first, last and the current neighbourhood, with a real ellipsis for the gaps. The current button has `aria-current="page"`.

## Drawer

A modal panel from the side. Use it for navigation or a long filter form on a phone.

| Prop                                | Type                   | Default            |
| ----------------------------------- | ---------------------- | ------------------ |
| `open`                              | boolean                | `false` (bindable) |
| `title` / `description`             | string                 | `''`               |
| `side`                              | `right \| left`        | `right`            |
| `size`                              | `sm \| md \| lg \| xl` | `md`               |
| `closeLabel`                        | string                 | `Close`            |
| `closeOnBackdrop` / `closeOnEscape` | boolean                | `true`             |
| `class`                             | string                 | `''`               |

Events: `close`. Slots: default, `footer`. It locks the page, traps Tab, focuses the panel, closes on Escape or the backdrop, and returns focus on close. The panel slides in; under reduce motion it appears without movement.

## Prose

A reading column for Markdown or article content: 70ch measure, 14/1.7 body, headings, lists, links, inline code, code blocks, blockquotes, rules, tables and images in the kit's tokens. Slot: default; `class` for the wrapper. The component owns the rhythm, the product owns the words.

## Container

`as` (`div`), `size` (`sm | md | lg | xl | full`), `padded` (`true`), `class`. A centred page column with the kit's gutters; `size` is the maximum measure. It is a layout primitive, so pass `as="main"` when it is the page.

## Stack

`as`, `direction` (`column | row`), `gap` (`none | xs | sm | md | lg | xl`), `align` (`start | center | end | stretch | baseline`), `justify` (`start | center | end | between`), `wrap` (`false`), `class`. A one-dimensional flex; the gap comes from the spacing scale.

## Grid

`as`, `columns` (1–12, `2`), `gap` (`none | sm | md | lg | xl`), `min` (a CSS length), `class`. With `columns` the tracks are equal; with `min` the tracks auto-fit, so the number of columns follows the space instead of a breakpoint.

## Section

`as` (`section`), `spacing` (`none | sm | md | lg | xl`), `class`. Vertical rhythm only; put `PageHeader` inside when the section needs a heading.

## Separator

`orientation` (`horizontal | vertical`), `decorative` (`true`), `class`. Decorative is `aria-hidden`; `decorative={false}` renders `role="separator"` with the orientation. The line is one hairline in `--ui-line`.

## Stepper

| Prop          | Type                                       | Default         |
| ------------- | ------------------------------------------ | --------------- |
| `steps`       | `{ id, label, description?, disabled? }[]` | `[]`            |
| `value`       | string                                     | `''` (bindable) |
| `orientation` | `horizontal \| vertical`                   | `horizontal`    |
| `clickable`   | boolean                                    | `false`         |
| `label`       | string                                     | `''`            |
| `class`       | string                                     | `''`            |

Event: `change` with the step id when `clickable`. The current step has `aria-current="step"`; earlier steps get a check. A horizontal stepper becomes a vertical list on a phone.

## NavItem

`href`, `active`, `disabled`, `label`, `class`. Slots: `icon`, default, `trailing`. With `href` it is a link (`aria-current="page"` when active); without it, a button. The active row takes `bg-surface` and ink; the rest stay soft.

## List

`items` (`{ id?, label, description?, meta?, href? }[]`), `divided` (`true`), `compact` (`false`), `class`. Slots: `icon`, default, `meta`, each receiving `item`. A row with `href` is a link; otherwise it is a div. The default slot replaces the label for arbitrary row content; the description and meta still render.

## DescriptionList

`items` (`{ term, description }[]`), `layout` (`stacked | inline`), `class`. `stacked` puts the term above the description; `inline` puts the term in a narrow left column from `sm` up. The markup is a real `<dl>`.

## Portal

`target` (a selector or an element; `document.body` by default), `class`. The default slot is moved into the target after mount and moved back out on destroy; the target can change. Use it for overlays that must leave a parent's overflow or stacking context.

## FocusTrap

`active` (`true`), `initialFocus` (an element), `returnFocus` (`true`), `class`. Keeps Tab inside the region while active, starts on `initialFocus` or the first control, and restores the previous focus when released or destroyed. It is a utility, not a dialog: the owner still handles Escape, the backdrop and the close.

## Sidebar

`as` (`aside`), `label`, `width` (`16rem`), `scroll` (`true`), `bordered` (`true`), `class`. A labelled shell that owns its scroll and the one vertical border; a host that manages its own scroll and border passes `scroll={false}` and `bordered={false}`. The content is `SidebarSection` groups and `SidebarItem` rows; the component knows nothing about notes.

## SidebarSection

`title`, `count`, `collapsible` (`false`), `open` (`true`, bindable), `level` (`2`), `toggleTestid`, `bodyTestid`, `class`. Slots: `actions`, default. A collapsible section announces `aria-expanded` and hides its body when closed. `count` is the quiet number after the title.

## SidebarItem

`href`, `active`, `disabled`, `depth` (`0`), `label`, `style`, `class`. Slots: `icon`, default, `trailing`. A link when `href` is set, a button otherwise; `depth` indents a tree row. The active row takes the surface.

## TagInput

`tags` (bindable string array), `suggestions`, `label`, `ariaLabel`, `placeholder`, `hint`, `removeLabel` (string or `(tag) => string`), `prefix`, `testid`, `suggestionsTestid`, `commitOnBlur`, `disabled`, `max` (`0` = no limit), `id`, `class`. Enter or a comma adds a tag, Backspace in an empty field removes the last, and suggestions narrow as the person types. Event: `change` with the next array.

## TopBar

The navigation bar of a phone screen. It pads itself with `--ui-safe-top`, so it sits under a notch.

| Prop        | Type    | Default | Notes                                |
| ----------- | ------- | ------- | ------------------------------------ |
| `title`     | string  | `''`    | The default slot replaces it         |
| `subtitle`  | string  | `''`    | A small line under the title         |
| `back`      | boolean | `false` | Shows the back control; fires `back` |
| `backLabel` | string  | `Back`  | Accessible name of the back control  |
| `sticky`    | boolean | `true`  | Sticks to the top of its scroll area |
| `bordered`  | boolean | `true`  | A line under the bar                 |
| `class`     | string  | `''`    |                                      |

Slots: default (the title), `leading` (replaces the back control), `actions`. Event: `back`.

## BottomNav

The tab bar at the foot of a phone screen: three to five destinations. It pads itself with `--ui-safe-bottom`.

| Prop    | Type    | Default | Notes                                                          |
| ------- | ------- | ------- | -------------------------------------------------------------- |
| `items` | array   | `[]`    | `{ id, label, href?, badge?, disabled? }`; `href` makes a link |
| `value` | string  | `''`    | The current id (bindable); `aria-current="page"` marks it      |
| `label` | string  | `Main`  | `aria-label` of the `nav`                                      |
| `fixed` | boolean | `true`  | Fixed to the screen bottom; `false` for an in-flow bar         |
| `class` | string  | `''`    |                                                                |

Slot: `icon` (receives `item` and `active`). Event: `change` (detail is the id).

## BottomSheet

A dialog that rises from the bottom edge. Focus is held, the page does not scroll, Escape and the backdrop close it, and a drag down on the handle past `dismissDistance` closes it.

| Prop              | Type                   | Default | Notes                                         |
| ----------------- | ---------------------- | ------- | --------------------------------------------- |
| `open`            | boolean                | `false` | Bindable                                      |
| `title`           | string                 | `''`    | Names the dialog                              |
| `description`     | string                 | `''`    |                                               |
| `snap`            | `auto \| half \| full` | `auto`  | Content up to 85% of the screen, 50%, or full |
| `closeLabel`      | string                 | `Close` | Name of the backdrop button                   |
| `closeOnBackdrop` | boolean                | `true`  |                                               |
| `closeOnEscape`   | boolean                | `true`  |                                               |
| `dismissDistance` | number                 | `96`    | Pixels of drag that close the sheet           |

Slots: default, `footer`. Event: `close`.

## ListRow

One touch row, at least 44px tall. An anchor when `href` is set, a button otherwise.

| Prop          | Type    | Default | Notes                        |
| ------------- | ------- | ------- | ---------------------------- |
| `title`       | string  | `''`    | The default slot replaces it |
| `description` | string  | `''`    | A second line                |
| `value`       | string  | `''`    | Quiet text on the right      |
| `href`        | string  | `''`    |                              |
| `navigates`   | boolean | `false` | Draws a chevron              |
| `danger`      | boolean | `false` | Destructive colour           |
| `disabled`    | boolean | `false` |                              |
| `class`       | string  | `''`    |                              |

Slots: default, `icon`, `trailing`. Event: `click`.

## Fab

A floating pill with a word, fixed above the bottom edge and the home indicator.

| Prop       | Type                      | Default | Notes                                            |
| ---------- | ------------------------- | ------- | ------------------------------------------------ |
| `label`    | string                    | `''`    | The default slot replaces it                     |
| `position` | `left \| center \| right` | `right` |                                                  |
| `lift`     | boolean                   | `false` | Adds the bar height, to clear a `BottomNav`      |
| `fixed`    | boolean                   | `true`  | `false` pins it to the nearest positioned parent |
| `disabled` | boolean                   | `false` |                                                  |
| `class`    | string                    | `''`    |                                                  |

Slots: default, `icon`. Event: `click`.

## MindMap

One idea in the middle and its branches around it, drawn in SVG. It is a WAI-ARIA tree: one node is in the tab order, arrows move between nodes, Enter or Space folds a branch, Home returns to the root. Drag the background to pan; Ctrl or Cmd with the wheel zooms.

| Prop           | Type                       | Default       | Notes                                            |
| -------------- | -------------------------- | ------------- | ------------------------------------------------ |
| `root`         | `{ id, label, children? }` | `null`        | The tree; ids are unique strings                 |
| `value`        | string                     | `''`          | Selected id (bindable)                           |
| `collapsed`    | string[]                   | `[]`          | Ids of folded branches (bindable)                |
| `direction`    | `right \| both`            | `right`       | `both` splits the root's children onto two sides |
| `label`        | string                     | `Mind map`    | `aria-label` of the tree                         |
| `height`       | string                     | `28rem`       | CSS height of the frame                          |
| `zoomInLabel`  | string                     | `Zoom in`     | Names of the three corner buttons                |
| `zoomOutLabel` | string                     | `Zoom out`    |                                                  |
| `fitLabel`     | string                     | `Fit to view` |                                                  |
| `class`        | string                     | `''`          |                                                  |

Events: `select` (detail is the id), `toggle` (detail is `{ id, collapsed }`).

`layoutMindMap(root, { collapsed, direction, rowGap, colGap, nodeHeight, measure })` is exported for a host that draws its own map: it returns `{ nodes, links, bounds }` with positioned boxes and cubic link paths.

## DeviceFrame

A device around a screen, for previewing a layout at the size of a profile. The screen has the exact CSS-pixel size and carries `data-profile`; the frame scales down to the width it is given and to `maxHeight`.

| Prop        | Type                                                        | Default  | Notes                                 |
| ----------- | ----------------------------------------------------------- | -------- | ------------------------------------- |
| `profile`   | `desktop \| laptop \| tablet \| iphone \| android \| watch` | `iphone` | Unknown values fall back to `iphone`  |
| `label`     | string                                                      | profile  | `aria-label` of the frame             |
| `maxHeight` | number                                                      | `620`    | Pixels; a phone is taller than a page |
| `class`     | string                                                      | `''`     |                                       |

Slot: default (the screen). Use `fixed={false}` on `Fab` and `BottomNav` inside it.

## Profiles

`profiles` (from `@monos/ui` or `@monos/ui/profiles`) maps each id to `{ name, width, height, input, bar, touch, safe, shape }`. `styles/profiles.css` turns `data-profile` into tokens:

| Profile   | Screen (px) | `--ui-bar-height` | `--ui-control-touch` |
| --------- | ----------- | ----------------- | -------------------- |
| `desktop` | 1280 x 800  | 3rem              | 2.25rem              |
| `laptop`  | 1024 x 640  | 3rem              | 2.25rem              |
| `tablet`  | 768 x 1024  | 3.5rem            | 2.75rem              |
| `iphone`  | 390 x 844   | 2.75rem           | 2.75rem              |
| `android` | 412 x 892   | 3.5rem            | 3rem                 |
| `watch`   | 198 x 242   | 2.25rem           | 2.5rem               |

On the watch, anything marked `ui-wide-only` (a bar subtitle, its actions, a tab label) is hidden.

## FontPicker

One card per typeface, each set in its own face; a radio group. The kit ships `mono` (Medeo Mono, the default), `sans` (Medeo Sans) and `pixel` (Medeo Pixel, a display face), all with Latin and Cyrillic.

| Prop       | Type                                      | Default           | Notes                                                |
| ---------- | ----------------------------------------- | ----------------- | ---------------------------------------------------- |
| `value`    | string                                    | `mono`            | Selected face id (bindable)                          |
| `options`  | `{ id, name, category, note?, family }[]` | the three faces   | A host adds its own, with its own `[data-font]` rule |
| `label`    | string                                    | `Typeface`        | Legend of the group                                  |
| `sample`   | string                                    | pangram, Cyrillic | Line set in each face                                |
| `apply`    | boolean                                   | `false`           | Also sets `data-font` on the root                    |
| `disabled` | boolean                                   | `false`           |                                                      |
| `class`    | string                                    | `''`              |                                                      |

Event: `change` with `{ value, option }`. `data-font` sets `--ui-font`; load the faces with `@monos/ui/fonts.css` (already in `styles.css`).
