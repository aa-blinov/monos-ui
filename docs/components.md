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

`checked` (bindable), `indeterminate`, `disabled`, `id`, `class`. Slot: label. Event: `change`.

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
