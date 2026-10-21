import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  root: 'gallery',
  base: './',
  plugins: [svelte()],
  server: { port: 5180 },
  build: {
    outDir: '../dist-gallery',
    emptyOutDir: true,
  },
});
