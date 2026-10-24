# AGENTS.md: agent context for `monos-ui`

`@monos/ui` is a Svelte 4 component kit: 64 primitives in `src/components/`, a Tailwind preset, and a CSS token layer with six themes in light and dark. The package ships source. There is no library build.

## Run / build / test

```bash
npm install              # install the dev dependencies
npm run dev              # gallery at http://127.0.0.1:5180
npm test                 # vitest, 78 tests in tests/
npm run check            # svelte-check against jsconfig.json
npm run lint             # ESLint 9, JS and Svelte, zero warnings
npm run format:check     # Prettier, including .svelte files
npm run build:themes     # regenerate src/styles/themes.css from src/themes.js
npm run build:gallery    # production build of the gallery into dist-gallery/
```

`npm run dev` serves `gallery/`, not a demo app for the package. It is the only place the components run together, and the fastest way to see a visual change in all six themes.

## Where things live

| Path                      | What it is                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `src/components/`         | 64 Svelte 4 primitives. Every file is exported from `src/index.js`.                           |
| `src/index.js`            | The public surface: components, `tooltip`, `HOVER_DELAY`, the toast store, the themes.        |
| `src/themes.js`           | The six palettes, each with a `light` and a `dark` object, plus `themeNames` and `modes`.     |
| `src/theme-css.js`        | `renderThemesCss`, `readableStatus` and the variable maps. Shared by the build and the tests. |
| `src/styles/tokens.css`   | Geometry, type, motion and z-index tokens.                                                    |
| `src/styles/themes.css`   | Generated colour blocks. Never edit by hand.                                                  |
| `src/styles/base.css`     | Optional page base: body colour, focus ring, selection, scrollbars, placeholders.             |
| `src/styles/index.css`    | Imports tokens, themes and base in that order.                                                |
| `src/tailwind-preset.js`  | Semantic colour, radius, font, spacing, shadow, duration and z-index names.                   |
| `src/toast.js`            | `toasts`, `toast`, `dismissToast`, `clearToasts`; the queue keeps four.                       |
| `src/tooltip.js`          | The `tooltip` action and `HOVER_DELAY` (450 ms).                                              |
| `gallery/`                | The visual reference. `gallery/sections/` has one file per section.                           |
| `tests/`                  | `contract.test.js`, `themes.test.js`, `components.test.js` and four harness fixtures.         |
| `scripts/build-themes.js` | Writes `src/styles/themes.css` and prints the block count.                                    |
| `docs/`                   | Architecture, the component API, tokens and the Monos migration map.                          |

## Traps

- **`themes.css` is generated.** Edit `src/themes.js`, run `npm run build:themes`, and commit both. `tests/themes.test.js` compares the committed CSS with `renderThemesCss(themes, modes)` and fails on any drift.
- **A component may not hold a colour.** `tests/contract.test.js` fails on a `#hex` or an `rgb()` inside `src/components/`. Read a token or a preset name.
- **A new component needs an export.** The same contract test walks `src/components/*.svelte` and requires a matching line in `src/index.js`.
- **Tailwind purges the kit's classes.** A consumer has to add `./node_modules/@monos/ui/src/**/*.svelte` to `content`; the preset alone is not enough.
- **There is no library build.** `npm run build:gallery` builds the gallery only. The publishable artefact is `src/` plus `styles.css`, listed in the `files` field of `package.json`.
- **CI is `ci.yml`.** It runs `npm ci`, `npm test`, `npm run check`, `npm run lint`, `npm run format:check` and `npm run build:gallery` on Node 22. The scaffold's `test.yml` duplicated it and is gone; `release.yml` triggers on a tag and publishes the changelog, and builds nothing, because the kit ships source.
- **The Node runtime is written in two places.** `package.json` declares `engines.node` as `^18.0.0 || >=20.0.0`; `test.yml` installs Node 22. A manifest without an `engines.node` value fails HS210, and the checker does not compare the range with the workflow, so the two have to be kept in step by hand.
- **The version appears in three places.** `package.json` says 1.0.5, `CHANGELOG.md` tops out at 1.0.5, and the README status line says 1.0.5. Update all three together.
- **The gallery is not imported by consumers.** It uses the same `src/index.js` as a consumer, but its section files are not part of the package `files` list.
- **Tests run in jsdom, not a browser.** Layout-dependent numbers (actual pixel widths, real scroll positions) are not covered; a visual change still needs the gallery.

## Style / safety rails

- **Comments explain why, never what.**
- **No emojis in any file.** The house style bans them and the checker fails on them.
- **No literal colours in components.** The contract test is the enforcement, not a convention.
- **Do not edit `src/styles/themes.css`** or add a palette value outside `src/themes.js`.
- **Do not add a dependency without a reason written down next to it.** The runtime has two peer dependencies: Svelte 4 and Tailwind 3.4.
- **Do not add locale strings, fetch calls or application imports to `src/components/`.** Labels are props or slots; data belongs to the host.
- **Do not weaken a test to make a change pass.** If the contract is wrong, change the contract and the test in the same commit.
- **Do not remove functionality that looks intentional.** Ask first; the changelog records why the current behaviour exists.
