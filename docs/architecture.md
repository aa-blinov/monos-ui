# Architecture

`@monos/ui` is a source package. It publishes Svelte components, a CSS token layer and a Tailwind preset; the consumer's bundler compiles the components and the CSS. There is no library build, no compiled JavaScript bundle and no runtime theme provider.

## The package

The entry points are declared in `package.json`:

| Entry                       | File                     | What it carries                                                                                                            |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `@monos/ui`                 | `src/index.js`           | 58 components, `tooltip`, `HOVER_DELAY`, `toasts`, `toast`, `dismissToast`, `clearToasts`, `themes`, `themeNames`, `modes` |
| `@monos/ui/styles.css`      | `src/styles/index.css`   | `tokens.css`, `themes.css`, `base.css`                                                                                     |
| `@monos/ui/tokens.css`      | `src/styles/tokens.css`  | Geometry, type, motion, z-index                                                                                            |
| `@monos/ui/themes.css`      | `src/styles/themes.css`  | The colour blocks                                                                                                          |
| `@monos/ui/tailwind-preset` | `src/tailwind-preset.js` | Semantic utility names                                                                                                     |
| `@monos/ui/themes`          | `src/themes.js`          | Palette data                                                                                                               |

`src/index.js` is a flat list of re-exports. `tests/contract.test.js` reads the component directory and fails when a `.svelte` file has no matching export, so the surface cannot drift from the directory.

The package `files` field ships `src`, `docs`, `DESIGN.md`, `README.md`, `CHANGELOG.md` and `LICENSE`. The gallery, the tests and the scripts stay in the repository.

## The token layer

Two kinds of token, with different sources.

**Geometry and motion** are fixed for every theme and live in `src/styles/tokens.css`: `--ui-font`, `--ui-radius` (6px), the control and icon sizes, the spacing scale, the three shadows, two durations and three z-index values. Three more tokens are derived in CSS with `color-mix()`: `--ui-line-strong`, `--ui-focus` and `--ui-selection`. They follow the theme lazily because they reference the colour variables rather than copying a value.

**Colour** is per theme and per mode. `src/themes.js` holds six palettes, each a `light` and a `dark` object with thirteen keys (`bg`, `surface`, `surface2`, `ink`, `inkSoft`, `inkFaint`, `inkMuted`, `line`, `accent`, `danger`, `warning`, `success`, `info`). `src/theme-css.js` maps those keys to the public variable names and renders the CSS:

```
src/themes.js
    |
    v
renderThemesCss(themes, modes)
    |   block() for each palette and mode
    |   readableStatus() for the five *-text roles
    v
src/styles/themes.css
```

`renderThemesCss` writes fourteen blocks: the Gruvbox light defaults on `:root`, a Gruvbox dark block on `:root[data-mode="dark"]:not([data-theme])`, and one block per theme and mode on `[data-theme="…"][data-mode="…"]`. Because the default block has no attribute selector, a page with no attributes is Gruvbox light, and a page with only `data-mode="dark"` is Gruvbox dark. A page with a theme but no mode has no matching block; it falls back to the `:root` defaults.

`readableStatus(signal, palette)` is the part that is not a plain copy. It measures the signal against `--ui-bg` and `--ui-surface`; if the contrast is below 4.5 on either, it mixes the signal toward black on a light palette or toward white on a dark one, in 1% steps, until both pass. The hue stays; the word becomes readable. The same function runs in the build and in the test, so a palette that cannot pass is caught before it ships.

The Tailwind preset names the variables: `bg-canvas`, `bg-surface`, `text-ink`, `border-line`, `text-danger`, `rounded-ui`, `shadow-rest`, `duration-fast`, `z-modal` and the rest. Colour values in the preset are `var(--ui-…)` strings, which means Tailwind's `/opacity` modifier does not work on them; a translucent surface uses `color-mix()` instead.

## The component layer

Every component is a Svelte 4 single-file component under `src/components/`. Labels, messages and data arrive as props or slots. There are no locale files, stores, fetch calls or application imports in the directory.

The components share a small set of conventions:

- A `class` prop is exposed through `let className = ''; export { className as class };` in 56 of the 58 components, so a host can extend the root element without a wrapper. `Spinner` is the exception.
- User-facing values are bindable props (`value`, `open`, `selected`, `files`, and so on), and events are forwarded with `on:click`, `on:input` and their siblings.
- The root element uses Tailwind names from the preset, never a palette value. `tests/contract.test.js` fails on a literal hex or `rgb()`.
- Overlays use `Portal` to leave a parent's overflow, and `FocusTrap` for the Tab loop. `Modal` stacks open dialogs: only the top one answers Escape and holds Tab, and a child returns focus to the panel under it.
- `Toaster` renders the queue from `src/toast.js`. The store keeps the last four messages and clears their timers when it drops them. `toast()` returns an id; `duration: 0` keeps a message until dismissal.
- `tooltip` is a Svelte action in `src/tooltip.js`, not a component. It appends one node to the body, waits 450 ms under the pointer, shows immediately on keyboard focus, hides below 640px, and leaves the accessible name to the host element.

There is no inheritance layer. Components do not import each other's internals. `AlertDialog` is the one composed control: it wraps `Modal` and uses `Button` for its two actions. The rest are standalone and share class strings, which keeps a change to one control from rippling through the set at the cost of repeating those strings in a few files.

## The build

There are two build commands and one test runner.

```
npm run build:themes     node scripts/build-themes.js
                         src/themes.js + src/theme-css.js -> src/styles/themes.css
npm run build:gallery    vite build
                         gallery/ -> dist-gallery/
npm test                 vitest run
                         tests/**/*.test.js in jsdom
```

`vite.config.js` sets `root: 'gallery'` and `outDir: '../dist-gallery'`, so the gallery build never touches the package source. `vitest.config.js` uses the Svelte plugin with hot reload off and the jsdom environment.

`themes.css` is committed. That is a deliberate trade: a consumer can import the CSS without running Node, and the cost is that the generated file can fall out of date. `tests/themes.test.js` regenerates it in memory and compares, so drift fails CI rather than reaching a release.

There is no `dist/` for the library. `npm run build:gallery` is not a package build, and the `files` field does not include `dist-gallery`.

## Boundaries

- `src/components/` may import from `../` utilities (`toast.js`, `tooltip.js`) and from other components, but never from an application, a store or an API module.
- No component writes a colour literal. Colour comes from a token or a preset name.
- `src/styles/base.css` is optional; a host that owns `body` imports `tokens.css` and `themes.css` and leaves the base out.
- The gallery imports the public surface (`src/index.js`), not component internals, so it exercises the same entry a consumer uses.
- Documentation changes do not touch `src/`, `tests/`, `.github/` or `package.json`.

## Decisions and costs

**Source distribution.** Consumers compile the `.svelte` files and need the kit's source in their Tailwind `content` list. The gain is that a consumer's Svelte version, compiler settings and CSS pipeline apply to the kit; the cost is that the package cannot be dropped into a project without Tailwind configured to scan it.

**Committed generated CSS.** The build is reproducible and the test catches drift, but a contributor has to remember `npm run build:themes` before committing a palette change. That is the most common way to fail the suite.

**One radius, one face.** The design is constrained on purpose; a new surface does not get a new corner or a new font. The cost is that a host with a different radius cannot restyle the kit without overriding `--ui-radius`, which changes every rectangle at once.

**Derived status words.** The `*-text` roles are computed rather than hand-picked. Adding a theme requires only the thirteen base keys, and the contrast walker fills in the rest. The cost is that the exact word colour is a function of the palette, so it moves when the base colours move.

**No type declarations.** The package ships `.svelte` source and no `.d.ts` files. `npm run check` covers the repository against `jsconfig.json`; a TypeScript consumer gets whatever the Svelte language tools infer from the source, not a published declaration file.
