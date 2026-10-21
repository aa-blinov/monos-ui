/**
 * Turns src/themes.js into src/styles/themes.css. The CSS is committed so a
 * consumer can import it without a build step; tests regenerate it and fail
 * when the committed file is out of date.
 *
 * Run: npm run build:themes
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { themes, modes } from '../src/themes.js';
import { renderThemesCss } from '../src/theme-css.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../src/styles/themes.css');

fs.writeFileSync(out, renderThemesCss(themes, modes));
console.log(`themes.css: ${Object.keys(themes).length} themes, ${Object.keys(themes).length * modes.length + 2} blocks`);
