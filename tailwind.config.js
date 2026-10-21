import preset from './src/tailwind-preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './src/**/*.{svelte,js}',
    './gallery/**/*.{svelte,js,html}',
  ],
};
