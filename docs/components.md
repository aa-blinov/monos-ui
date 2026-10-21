# Components

Every component is a Svelte 4 component. Labels are props or slots; there are no locale files, stores or API calls in the kit.

## Button

Text-only action. No filled or outlined variant: the word is the button.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `primary \| secondary \| text \| quiet \| danger` | `primary` | `quiet` is sentence case; the rest uppercase |
| `size` | `sm \| md \| lg` | `md` | 28 / 36 / 44px |
| `type` | string | `button` | |
| `disabled` | boolean | `false` | |
| `loading` | boolean | `false` | Disables, shows a spinner, `aria-busy` |
| `full` | boolean | `false` | |
| `buttonEl` | HTMLButtonElement | `null` | The DOM node, for a parent that focuses it |
| `class` | string | `''` | |

Slots: default, `icon`, `trailing`. Event: `click`.

## IconButton

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | string | required | `aria-label`; the tooltip repeats it |
| `tooltipText` | string \| `''` | `label` | `''` removes the tooltip |
| `variant` | `outline \| ghost` | `outline` | |
| `size` | `sm \| md \| lg` | `md` | 28 / 36 / 44px |
| `disabled` | boolean | `false` | |
| `pressed` | boolean | `undefined` | Adds `aria-pressed` |
| `class` | string | `''` | |

Slot: default (the icon). Event: `click`.

## TextField

| Prop | Type | Default |
|---|---|---|
| `value` | string | `''` (bindable) |
| `label` / `hint` / `error` | string | `''` |
| `id` | string | generated |
| `type` | string | `text` |
| `name` / `placeholder` / `autocomplete` | string | `''` / `''` / undefined |
| `size` | `sm \| md \| lg` | `md` |
| `variant` | `underline \| boxed` | `underline` |
| `disabled` / `required` | boolean | `false` |
| `class` | string | `''` |

Events: `input`, `change`, `keydown`, `focus`, `blur`.

## TextArea

Same label, hint, error, `variant`, `disabled`, `required` and `class` props as TextField, plus `rows` (4), `name`, `placeholder`, `id`, `value` (bindable). Events: `input`, `change`, `keydown`, `focus`, `blur`.

## Select

A themed single choice: the trigger shows the current label, the popup is drawn by the kit. Use it where the choice is part of the interface (a theme picker, a toolbar mode). For a long form with many options, `SelectField` is the native control.

| Prop | Type | Default |
|---|---|---|
| `value` | string | `''` (bindable) |
| `options` | `{ value, label?, disabled? }[]` | `[]` |
| `label` | string | `''` |
| `placeholder` | string | `Select` |
| `size` | `sm \| md \| lg` | `md` |
| `disabled` | boolean | `false` |
| `class` | string | `''` |

Event: `change` with `{ value, option }`. The trigger opens with Enter/Space or ArrowDown/ArrowUp; arrows, Home and End move; Enter chooses; Escape closes and returns focus; an outside click closes. The list is a `role="listbox"` with `role="option"` rows and `aria-selected`.

## SelectField

| Prop | Type | Default |
|---|---|---|
| `value` | string | `''` (bindable) |
| `options` | `{ value, label?, disabled? }[]` | `[]` |
| `label` / `hint` / `error` | string | `''` |
| `placeholder` | string | `''` |
| `size` | `sm \| md \| lg` | `md` |
| `variant` | `underline \| boxed` | `underline` |

Events: `change`, `focus`, `blur`.

## SearchField

| Prop | Type | Default |
|---|---|---|
| `value` | string | `''` (bindable) |
| `label` | string | `Search` |
| `placeholder` | string | `Search` |
| `clearLabel` | string | `Clear` |
| `size` | `sm \| md \| lg` | `md` |
| `disabled` | boolean | `false` |
| `class` | string | `''` |

Events: `input`, `clear`, `keydown`, `focus`, `blur`. Escape clears a non-empty value and stops there.

## Checkbox

`checked` (bindable), `indeterminate`, `disabled`, `id`, `ariaLabel`, `class`. Slot: label. Event: `change`. `ariaLabel` names a box that has no visible label, as in a table.

The row is 24px; on a touch screen it is 44px.

## Switch

`checked` (bindable), `disabled`, `class`. Slot: label. Event: `change` with the new boolean. Renders `<button role="switch" aria-checked>`.

## Chip

`tone`: `neutral | accent | danger | warning | success`; `size`: `sm | md`; `removable`; `removeLabel`; `class`. Slot: label. Event: `remove`.

## Badge

`tone`: `neutral | accent | danger | warning | success`; `dot`; `class`. Slot: the word.

## Card

| Prop | Type | Default |
|---|---|---|
| `as` | element name | `div` |
| `padding` | `none \| sm \| md \| lg` | `md` |
| `interactive` | boolean | `false` |
| `selected` | boolean | `false` |
| `class` | string | `''` |

Every card has `rounded-ui`, a 1px `line` border and `shadow-rest`. `interactive` adds hover lift, deepens the border and makes the card a button (`role="button"`, `tabindex="0"`, Enter/Space); with `as="a"` or `as="button"` the native role is kept. Slot: default. Events (interactive): `click`, `keydown`, `focus`, `blur`.

Do not nest another control inside an interactive card.

## Menu

| Prop | Type | Default |
|---|---|---|
| `items` | `{ value?, label, icon?, disabled?, danger?, separator? }[]` | `[]` |
| `label` | string | `Menu` |
| `align` | `start \| end` | `start` |
| `placement` | `bottom \| top` | `bottom` |
| `width` | `menu \| trigger \| auto` | `menu` |
| `disabled` | boolean | `false` |

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

| Prop | Type | Default |
|---|---|---|
| `open` | boolean | `false` (bindable) |
| `title` | string | `''` |
| `description` | string | `''` |
| `size` | `sm \| md \| lg \| xl` | `md` |
| `closeLabel` | string | `Close` |
| `closeOnBackdrop` | boolean | `true` |
| `closeOnEscape` | boolean | `true` |
| `role` | `dialog \| alertdialog` | `dialog` |
| `showClose` | boolean | `true` |
| `initialFocus` | HTMLElement | `null` |
| `class` | string | `''` |

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

| Prop | Type | Default |
|---|---|---|
| `items` | `{ id, label, disabled? }[]` | `[]` |
| `value` | string | `''` (bindable) |
| `label` | string | `''` |
| `variant` | `line \| pill` | `line` |
| `class` | string | `''` |

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

| Prop | Type | Default |
|---|---|---|
| `items` | `{ id, title, content?, disabled? }[]` | `[]` |
| `open` | string[] | `[]` (bindable) |
| `multiple` | boolean | `false` |
| `label` | string | `''` |
| `headingLevel` | 2–6 | `3` |
| `class` | string | `''` |

Event: `change` with the new open ids. The default slot receives `item`; without a slot, `item.content` is rendered. The trigger is a heading button with `aria-expanded` and `aria-controls`; the panel is a `role="region"`.

```svelte
<Accordion items={items} bind:open let:item>{item.body}</Accordion>
```

## Popover

An anchored, non-modal panel for arbitrary content.

| Prop | Type | Default |
|---|---|---|
| `open` | boolean | `false` (bindable) |
| `placement` | `bottom \| top` | `bottom` |
| `align` | `start \| center \| end` | `start` |
| `width` | `sm \| md \| lg` | `md` |
| `label` | string | `''` |
| `focusOnOpen` | boolean | `false` |
| `closeOnEscape` / `closeOnOutside` | boolean | `true` |
| `class` | string | `''` |

Events: `open`, `close`. The `trigger` slot receives `open`, `toggle` and `triggerProps` (spread them on the trigger). Without a slot it draws a quiet button named by `label`. The panel is a `role="dialog"`; it flips above the trigger when there is no room below. An outside pointerdown or Escape closes it; `focusOnOpen` moves focus to the first control.

## AlertDialog

| Prop | Type | Default |
|---|---|---|
| `open` | boolean | `false` (bindable) |
| `title` / `description` | string | `''` |
| `confirmLabel` | string | `Confirm` |
| `cancelLabel` | string | `Cancel` |
| `tone` | `danger \| neutral` | `danger` |
| `loading` | boolean | `false` |
| `closeOnConfirm` | boolean | `true` |
| `closeOnEscape` | boolean | `true` |

Events: `confirm`, `cancel`. It is a `role="alertdialog"` with no close cross and no backdrop dismissal; focus starts on Cancel. The default slot adds body content; the footer is fixed to Cancel and Confirm. With `closeOnConfirm={false}` the product owns closing, which is what an async action needs; set `loading` while it runs.

## RadioGroup

| Prop | Type | Default |
|---|---|---|
| `value` | string | `''` (bindable) |
| `options` | `{ value, label?, description?, disabled? }[]` | `[]` |
| `label` | string | `''` |
| `name` | string | generated |
| `orientation` | `vertical \| horizontal` | `vertical` |
| `disabled` | boolean | `false` |
| `class` | string | `''` |

Event: `change` with the value. Real `<input type="radio">` elements share one name, so the browser moves with the arrow keys; the circle and its dot are drawn by the kit.

## Progress

| Prop | Type | Default |
|---|---|---|
| `value` | number | `0` |
| `max` | number | `100` |
| `label` | string | `''` |
| `tone` | `accent \| success \| warning \| danger \| info` | `accent` |
| `size` | `sm \| md \| lg` | `md` |
| `indeterminate` | boolean | `false` |
| `class` | string | `''` |

`role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`; indeterminate omits the value. The label is the accessible name, not a visible caption. The indeterminate sweep stops under reduce motion.

## Skeleton

`width` (`100%`), `height` (`1rem`), `rounded` (`ui | full`), `class`. It is `aria-hidden`; set the size the content will need so the page does not move when it arrives. The pulse stops under reduce motion.

## Avatar

| Prop | Type | Default |
|---|---|---|
| `src` | string | `''` |
| `alt` / `name` | string | `''` |
| `size` | `xs \| sm \| md \| lg \| xl` | `md` |
| `status` | `online \| away \| offline` | `undefined` |
| `class` | string | `''` |

With `src` it shows the picture; without it, the initials of `name` (two letters); a failed image falls back to the initials. Circles are round by nature; the status dot sits on the edge.

## Table

| Prop | Type | Default |
|---|---|---|
| `columns` | `{ key, label, align?, width?, sortable?, sortValue? }[]` | `[]` |
| `rows` | object[] | `[]` |
| `rowKey` | string \| `(row) => key` | `id` |
| `caption` | string | `''` |
| `density` | `comfortable \| compact` | `comfortable` |
| `selectable` | boolean | `false` |
| `selected` | key[] | `[]` (bindable) |
| `sort` | `{ key, direction } \| null` | `null` (bindable) |
| `manualSort` | boolean | `false` |
| `stickyHeader` | boolean | `true` |
| `emptyLabel` | string | `No rows` |
| `selectAllLabel` | string | `Select all rows` |
| `selectRowLabel` | `(row, index) => string` | `Select row N` |

Events: `sort` with the next sort or `null`, `select` with the selected keys. A sort cycles ascending, descending and off; without `manualSort` the table sorts by the column key (or `sortValue(row)`). The header uses `aria-sort`; the caption is screen-reader only. Cells render `row[column.key]` or the `cell` slot (`let:row let:column let:value`); `empty` replaces the empty row. Row actions belong in a cell, not on the row.

## Toaster and toast

`Toaster` renders the queue; mount one near the app root.

| Prop | Type | Default |
|---|---|---|
| `position` | `bottom-right \| bottom-left \| top-right \| top-left \| bottom-center` | `bottom-right` |
| `max` | number | `4` |
| `dismissLabel` | string | `Dismiss` |

The store functions are exported beside it:

```js
import { toast, dismissToast, clearToasts, toasts, Toaster } from '@monos/ui';

toast('Saved');
toast({ title: 'Sync failed', description: 'The token cannot write.', tone: 'danger', duration: 0 });
toast({ title: 'Deleted', tone: 'success', action: { label: 'Undo', onClick: undo } });
```

`toast(options | string)` returns the id. `title`, `description`, `tone` (`neutral | info | success | warning | danger`), `duration` (5000; `0` keeps it) and `action` (`{ label, onClick }`) are the options. The store keeps four; older messages are dropped and their timers cleared. A danger toast is `role="alert"`; the rest are `role="status"`. The action dismisses after `onClick`.

