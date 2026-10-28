# Product

<!-- impeccable:product-schema 1 -->

## Platform

Web. The kit targets Svelte 4 applications with Tailwind CSS 3.4. It ships as source: `.svelte` files, CSS custom properties and one Tailwind preset. The token layer also works in plain HTML or any other framework that can load CSS.

## Users

The primary user is a developer building a Svelte 4 product in the Monos visual language. They have a screen to finish, they already use Tailwind, and they need controls that match the rest of the product without rebuilding buttons, fields and dialogs for each project.

A second user imports only `tokens.css` and `themes.css`: a static page, a prototype or an app in another framework that needs the six palettes and the semantic roles but not the Svelte components.

The kit is not aimed at teams that want a compiled component package with a provider, a theme context or TypeScript declarations. Those do not ship here.

## Product Purpose

The kit exists so the Monos look can be used outside Monos. It packages the visual decisions of that product as roles, tokens and primitives, so a new interface starts from the same paper, ink and 6px corner instead of a fresh set of choices.

Success for the user: import one stylesheet, set two attributes on `<html>`, and a screen built from the primitives reads correctly in all six themes and both modes. Success for the package: Monos itself can move onto the primitives one component at a time without changing the app's look.

## Positioning

The mechanism a neighbour would have to copy combines a source distribution and a data-driven theme layer. The palettes live in `src/themes.js`; a contrast function in `src/theme-css.js` derives the status-word roles until they clear AA on both the page and a card; `scripts/build-themes.js` writes one committed CSS file. A theme change is an edit to data, then a rebuild, with no component change and no JavaScript at runtime.

The second part is the visual contract: one 6px radius, text-only actions, and a 3% shadow at rest. A compiled component library can copy the colours. Copying the rules requires the same restraint.

## Operating Context

1. Install from the repository with `npm install github:aa-blinov/monos-ui svelte tailwindcss`.
2. Add `@monos/ui/tailwind-preset` to the `presets` list in `tailwind.config.js`, and add `./node_modules/@monos/ui/src/**/*.svelte` to `content` so the classes used inside the components survive Tailwind's purge.
3. Import `@monos/ui/styles.css` once, or import `tokens.css` and `themes.css` when the product owns `body`.
4. Set `data-theme` and `data-mode` on `<html>`. No provider, store or hydration step is involved.
5. Compose screens from the components and keep product-specific patterns, content and copy in the application.

The gallery runs at `http://127.0.0.1:5180` with `npm run dev` and shows every component in every theme and both modes. It is the review surface for a visual change.

## Capabilities and Constraints

Confirmed:

- 70 Svelte 4 components exported from `src/index.js`, covering actions, form fields, choices, overlays, notices, navigation, data display, layout and chat.
- Three conversation components: `ChatPanel` provides named layout slots, `ChatMessage` standardizes a message row, and `ChatComposer` supplies the composer surface. The host owns the words, messages, controls and send action.
- Six themes (`gruvbox`, `github`, `dracula`, `nord`, `solarized`, `catppuccin`), each with a light and a dark palette, so twelve theme and mode pairs.
- A semantic token layer: colour, geometry, type, depth, motion and z-index. Components read `var(--ui-*)` or a preset utility, never a palette value.
- A Tailwind preset with semantic colour, radius, font, spacing, shadow, duration and z-index names.
- A toast store with a four-message limit and a tooltip action with a 450 ms hover delay.
- A gallery built from the same source consumers import.

Constraints that future work has to keep:

- Svelte 4 (`^4.0.0`) and Tailwind 3.4 (`^3.4.0`) are peer dependencies. No Svelte 5 runes build exists.
- No locale files. Every label, message and empty state arrives as a prop or a slot; the kit supplies the shape, not the language.
- No network calls, no persistence and no application imports inside `src/components/`.
- No literal colour in a component. `tests/contract.test.js` fails on a hex or `rgb()` value.
- `FileUpload` selects and lists files; it does not upload them. `DatePicker` owns the calendar grid, not date arithmetic beyond it. `Toaster` keeps the last four messages.
- Tooltips do not appear below 640px, and they are never the only accessible name of a control.
- There is no library build. Consumers compile the source with their own bundler.
- No TypeScript declaration files ship; `npm run check` runs `svelte-check` against `jsconfig.json`.

Open questions:

- When the package will be published to npm. The README says it is installed from GitHub, and that is the current state.
- Whether Svelte 5 support is wanted. Nothing in the repository decides it.
- Which browsers are supported beyond the behaviour the tests exercise in jsdom.

## Brand Commitments

The name `@monos/ui`, the warm-paper palette, the 6px radius, text buttons, the six theme names, and the rule that accents signal state rather than decorate. The kit carries no logo of its own and no marketing copy. The gallery header and the package description use the same phrase: warm paper, one radius, quiet controls.

## Evidence on Hand

Real files and counts:

- `src/components/` holds 70 `.svelte` files, all exported from `src/index.js`.
- `src/themes.js` holds six palettes, each with a `light` and a `dark` object of thirteen colour keys.
- `src/styles/themes.css` is committed and matches `renderThemesCss(themes, modes)` in `tests/themes.test.js`.
- `tests/` holds 105 tests across six Vitest files, plus five component harness fixtures.
- `gallery/sections/` holds 23 section files; `gallery/App.svelte` holds the shell and the theme picker.
- `docs/preview.png` is a 1600x1125 capture of the gallery.
- `docs/components.md`, `docs/tokens.md` and `docs/migrating-monos.md` describe the API, the tokens and the move from Monos.
- `CHANGELOG.md` records 2.1.0 as the current release.

Not present, and not to be invented: a published npm package, download counts, user studies, performance benchmarks, a Figma source, a Svelte 5 build, screenshots of individual components, or a support policy.

## Product Principles

1. **Colour is a role.** A component asks for `--ui-danger`, not for red. This rules out per-theme component branches and per-product palettes.
2. **One radius, text actions.** Rectangles share a corner; actions are words. This rules out filled calls to action, outlined action buttons and a second corner size.
3. **The host owns the words and the data.** The kit ships no locale strings, no fetch calls and no application state. This rules out a built-in date engine, an upload transport and a copy deck.
4. **Accessibility is a test, not a promise.** Contrast, focus behaviour and keyboard movement are covered by tests. A new colour role is added only with a passing contrast pair.

## Accessibility & Inclusion

The target is WCAG AA for the parts the kit controls. The body and supporting text roles are tested against both `--ui-bg` and `--ui-surface` in all twelve theme and mode pairs. Status words have their own derived roles and a separate contrast pass; status dots keep the vivid signal. The focus ring is a 2px line in theme ink, shown for keyboard focus. Overlays name themselves, trap Tab and return focus. Controls grow to a 44px touch target on a phone.

Not decided: a formal audit by an external body, a documented screen-reader test matrix, and support for right-to-left layouts. No RTL test or stylesheet exists.
