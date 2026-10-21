# Contributing

The kit is a small package and the visual contract is enforced by tests. A change is welcome when it keeps both.

## Set up

```bash
npm install
npm run dev          # gallery at http://127.0.0.1:5180
```

The gallery is the visual reference: every component, every theme, both modes. A change to a component should be visible there.

## Before a pull request

```bash
npm test             # theme contract, contrast and component behaviour
npm run check        # svelte-check
npm run build:gallery
```

Please also look at the change in the gallery in a light and a dark theme, at a wide window and at a phone width. If the change is visual, include a screenshot in the pull request.

## Tokens

- A colour is a role. Add it to `src/themes.js` for every theme and mode, run `npm run build:themes`, and update the contrast test if needed.
- Do not put a hex literal in a component. `tests/contract.test.js` checks this.
- Geometry belongs to `src/styles/tokens.css`; the Tailwind names live in `src/tailwind-preset.js`.
- A component does not import an application's stores, strings or API. Labels arrive as props and slots.

## Commits

Small commits with a clear reason. The changelog is for the package, not for every internal refactor.
