<script>
  import { onDestroy, onMount } from 'svelte';
  import pkg from '../package.json';
  import { IconButton, Select, SegmentedControl, Toaster, themes, themeNames } from '../src/index.js';
  import AppShellSection from './sections/AppShellSection.svelte';
  import ButtonsSection from './sections/ButtonsSection.svelte';
  import DataSection from './sections/DataSection.svelte';
  import EmptySection from './sections/EmptySection.svelte';
  import FeedbackSection from './sections/FeedbackSection.svelte';
  import FieldsSection from './sections/FieldsSection.svelte';
  import FormsSection from './sections/FormsSection.svelte';
  import LayoutSection from './sections/LayoutSection.svelte';
  import MarksSection from './sections/MarksSection.svelte';
  import NavigationSection from './sections/NavigationSection.svelte';
  import NoticesSection from './sections/NoticesSection.svelte';
  import OverlaysSection from './sections/OverlaysSection.svelte';
  import PaletteSection from './sections/PaletteSection.svelte';
  import StructureSection from './sections/StructureSection.svelte';
  import SurfacesSection from './sections/SurfacesSection.svelte';
  import TableSection from './sections/TableSection.svelte';
  import TypeSection from './sections/TypeSection.svelte';
  import UtilitiesSection from './sections/UtilitiesSection.svelte';

  let theme = 'gruvbox';
  let mode = 'light';
  let copied = false;
  let copyTimer = null;

  const INSTALL = 'npm install github:aa-blinov/monos-ui';
  const VERSION = pkg.version;
  const RELEASE_URL = `https://github.com/aa-blinov/monos-ui/releases/tag/v${VERSION}`;

  const sections = [
    ['palette', 'Palette'],
    ['type', 'Type'],
    ['buttons', 'Buttons'],
    ['fields', 'Fields'],
    ['forms', 'Forms'],
    ['marks', 'Chips'],
    ['surfaces', 'Surfaces'],
    ['layout', 'Layout'],
    ['structure', 'Structure'],
    ['table', 'Table'],
    ['data', 'Data'],
    ['app-shell', 'App shell'],
    ['navigation', 'Navigation'],
    ['utilities', 'Utilities'],
    ['overlays', 'Overlays'],
    ['feedback', 'Feedback'],
    ['notices', 'Notices'],
    ['empty', 'Empty'],
  ];

  $: palette = themes[theme][mode];
  $: applyTheme(theme, mode);

  function applyTheme(nextTheme, nextMode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    root.dataset.mode = nextMode;
  }

  async function copyInstall() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(INSTALL);
      ok = true;
    } catch {
      // A clipboard permission can be refused; a selected field still copies in older browsers.
      try {
        const area = document.createElement('textarea');
        area.value = INSTALL;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        ok = document.execCommand('copy');
        area.remove();
      } catch {
        ok = false;
      }
    }
    copied = ok;
    if (ok) {
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = false), 2000);
    }
  }

  onMount(() => {
    document.title = `Monos UI ${VERSION}`;
  });

  onDestroy(() => clearTimeout(copyTimer));
</script>

<nav class="sticky top-0 z-20 border-b border-line bg-canvas" aria-label="Monos UI">
  <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
    <a href="#top" class="flex items-baseline gap-2 text-sm font-bold tracking-tight"
      >Monos UI <span
        class="rounded-ui border border-line px-1.5 py-0.5 font-mono text-[length:var(--text-whisper)] font-normal uppercase tracking-widest text-ink-faint"
        >v{VERSION}</span
      ></a
    >
    <div class="flex items-center gap-5 text-whisper uppercase tracking-widest text-ink-faint">
      <a href="https://github.com/aa-blinov/monos-ui" class="transition-colors duration-fast hover:text-ink">GitHub</a>
      <a href="https://github.com/aa-blinov/monos-ui/releases" class="transition-colors duration-fast hover:text-ink"
        >Release</a
      >
      <a
        href="https://github.com/aa-blinov/monos-ui/tree/main/docs"
        class="transition-colors duration-fast hover:text-ink">Docs</a
      >
    </div>
  </div>
</nav>

<div id="top" class="mx-auto max-w-5xl px-6 pb-24 pt-10">
  <header class="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
    <div class="min-w-0">
      <h1 class="text-3xl font-bold tracking-tight">The desk, as a kit</h1>
      <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
        Warm paper, one radius, text buttons and a quiet focus ring. Pick a palette and a mode; everything below is
        drawn from the same tokens.
      </p>
      <div class="mt-5 flex min-w-0 max-w-full items-center gap-2">
        <code
          class="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-ui border border-line bg-surface px-3 py-2 font-mono text-xs text-ink-soft"
          >{INSTALL}</code
        >
        <IconButton
          label={copied ? 'Copied' : 'Copy install command'}
          tooltipText={copied ? 'Copied' : 'Copy install command'}
          variant="outline"
          size="sm"
          on:click={copyInstall}
        >
          {#if copied}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline
                points="20 6 9 17 4 12"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {:else}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.7" />
              <path
                d="M15 9V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15H9"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          {/if}
        </IconButton>
      </div>
      <p class="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-whisper uppercase tracking-widest text-ink-faint">
        <a href={RELEASE_URL} class="normal-case transition-colors duration-fast hover:text-ink">v{VERSION}</a>
        <span>57 components</span>
        <span>6 themes</span>
        <span>2 modes</span>
        <span>Svelte 4 and Tailwind 3</span>
      </p>
    </div>
    <div class="flex flex-wrap items-end gap-3">
      <div class="w-40">
        <Select
          label="Theme"
          bind:value={theme}
          options={themeNames.map((id) => ({ value: id, label: themes[id].name }))}
          size="sm"
        />
      </div>
      <div class="w-40">
        <SegmentedControl
          label="Mode"
          full
          bind:value={mode}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
          size="sm"
        />
      </div>
    </div>
  </header>

  <nav class="mt-6" aria-label="Sections">
    <details class="sm:hidden">
      <summary
        class="flex cursor-pointer list-none items-center gap-2 text-whisper uppercase tracking-widest text-ink-faint"
      >
        Jump to a section
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </summary>
      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-whisper uppercase tracking-widest text-ink-faint">
        {#each sections as [id, name]}
          <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
        {/each}
      </div>
    </details>
    <div class="hidden flex-wrap gap-x-4 gap-y-2 text-whisper uppercase tracking-widest text-ink-faint sm:flex">
      {#each sections as [id, name]}
        <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
      {/each}
    </div>
  </nav>

  <PaletteSection {palette} />
  <TypeSection />
  <ButtonsSection />
  <FieldsSection />
  <FormsSection />
  <MarksSection />
  <SurfacesSection />
  <LayoutSection />
  <StructureSection />
  <TableSection />
  <DataSection />
  <AppShellSection />
  <NavigationSection />
  <UtilitiesSection />
  <OverlaysSection />
  <FeedbackSection />
  <NoticesSection />
  <EmptySection />

  <footer
    class="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint"
  >
    <p>
      MIT, Svelte 4, Tailwind 3, <a href={RELEASE_URL} class="transition-colors duration-fast hover:text-ink"
        >v{VERSION}</a
      >
    </p>
    <p>
      <a href="https://github.com/aa-blinov/monos-ui" class="transition-colors duration-fast hover:text-ink">GitHub</a>,
      <a href="https://github.com/aa-blinov/monos-ui/releases" class="transition-colors duration-fast hover:text-ink"
        >Release</a
      >
    </p>
  </footer>
</div>

<Toaster />
