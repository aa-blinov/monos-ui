# Moving Monos onto the kit

The kit is a separate package on purpose: Monos can keep shipping while the primitives move over one at a time. This is the map, not a drop-in replacement.

## Tokens

`@monos/ui` prefixes its variables with `--ui-` so a host can keep its own names during the move.

| Monos | Kit |
|---|---|
| `--bg-primary` | `--ui-bg` |
| `--bg-secondary` | `--ui-surface` |
| `--bg-tertiary` | `--ui-surface-2` |
| `--text-primary` | `--ui-ink` |
| `--text-secondary` | `--ui-ink-soft` |
| `--text-tertiary` | `--ui-ink-faint` |
| `--text-muted` | `--ui-ink-muted` |
| `--border-subtle` | `--ui-line` |
| `--red` | `--ui-danger` |
| `--orange`, `--yellow` | `--ui-warning` |
| `--green` | `--ui-success` |
| `--blue` | `--ui-accent`, `--ui-info` |
| `--radius` | `--ui-radius` |
| `--text-whisper` | `--ui-text-whisper` |

Monos has six palettes and both modes; the kit ships the same six as `[data-theme][data-mode]`. The Solarized ink is a little darker/lighter than Monos's to clear AA on the second surface; the contrast test records it.

## Components

| Monos | Kit | Note |
|---|---|---|
| `TooltipIconButton` | `IconButton` | `label` is required; `tooltipText=""` removes the hint |
| `getModalButtonClass('primary')` | `Button variant="primary"` | the kit does not stretch by default; use `full` |
| `getModalButtonClass('secondary')` | `Button variant="secondary"` | |
| `formFieldClass()` input | `TextField` | underline is the default; `boxed` for the pill fields |
| underline `<select>` | `SelectField` | native option list stays |
| `SearchField` | `SearchField` | same look, now with the clear event and mobile size |
| `Checkbox` | `Checkbox` | 24px row, 44px on a phone |
| `ModalShell` | `Modal` | `open` is bindable; the close label is a prop |
| sidebar "More" menu | `Menu` | items are data; the trigger is a slot |
| tag / `+N` | `Chip` | optional remove |
| agent and conflict marks | `Badge` | `dot`, `tone` |
| note card surface | `Card` | `interactive` is the note card's hover; the note content stays Monos |
| page/panel surface | `Card` or a plain `bg-surface` | no nested cards |

Not extracted: `NoteCard`, `NoteBoard`, `Sidebar`, `Editor`, `TerminalPanel`, `ConflictNoteView` and the rest of the product. They stay in Monos and can be rebuilt from the primitives later.

## Order

1. **Tokens first.** Add the kit's `styles.css`, map Monos's variables to the `--ui-` roles, and check the board, a note, Settings and Trash in light and dark. No component changes yet.
2. **One primitive at a time.** Start with `IconButton`, then `Button`, then `TextField`/`SelectField`, then `Checkbox`, `Chip`, `Badge`, `Card`, `Menu`, `Modal`. Run the existing e2e suite and compare screenshots after each.
3. **Delete the local helper** only when every use is gone: `getModalButtonClass`, `formFieldClass`, `TooltipIconButton`, the menu row class constants.
4. **Keep product patterns.** A note card is a Monos pattern; it may use `Card` for its surface but its title, excerpt, tags, date and agent mark stay the app's.

## What will differ

- The kit's buttons do not stretch by default; modal footers need `full` or a wrapper class.
- The kit's `Menu` uses data items; the tree's context menu has a different shape and stays app code.
- The kit's `Badge` is a word, not a colored pill; Monos already uses it that way.
- The kit's CSS is optional in parts: import `tokens.css` and `themes.css` if Monos keeps its own `body`.
