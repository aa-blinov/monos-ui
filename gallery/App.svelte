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
  import GroupHeading from './GroupHeading.svelte';
  import LayoutSection from './sections/LayoutSection.svelte';
  import MarksSection from './sections/MarksSection.svelte';
  import MobileSection from './sections/MobileSection.svelte';
  import MindMapSection from './sections/MindMapSection.svelte';
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

  // The page reads in the order a product is built: tokens, the controls a
  // person acts on, what the page shows, how it is laid out and moved through,
  // what appears on top of it, and last the phone set.
  const groups = [
    {
      id: 'foundations',
      name: 'Foundations',
      hint: 'The tokens every other part is drawn from.',
      items: [
        ['palette', 'Palette'],
        ['type', 'Type'],
      ],
    },
    {
      id: 'inputs',
      name: 'Actions and inputs',
      hint: 'What a person presses, types and chooses.',
      items: [
        ['buttons', 'Buttons'],
        ['fields', 'Fields'],
        ['forms', 'Forms'],
      ],
    },
    {
      id: 'display',
      name: 'Content',
      hint: 'Marks, surfaces and the data a page shows.',
      items: [
        ['marks', 'Chips'],
        ['surfaces', 'Surfaces'],
        ['data', 'Data'],
        ['table', 'Table'],
        ['mindmap', 'Mind map'],
        ['empty', 'Empty'],
      ],
    },
    {
      id: 'structure-group',
      name: 'Layout and navigation',
      hint: 'How a page is arranged and how a person moves through it.',
      items: [
        ['layout', 'Layout'],
        ['structure', 'Structure'],
        ['app-shell', 'App shell'],
        ['navigation', 'Navigation'],
      ],
    },
    {
      id: 'overlay-group',
      name: 'Overlays and feedback',
      hint: 'What appears over the page, and how it answers back.',
      items: [
        ['overlays', 'Overlays'],
        ['feedback', 'Feedback'],
        ['notices', 'Notices'],
      ],
    },
    {
      id: 'utility-group',
      name: 'Utilities',
      hint: 'Small helpers for custom parts.',
      items: [['utilities', 'Utilities']],
    },
    {
      id: 'mobile-group',
      name: 'Mobile',
      hint: 'Phone-sized parts for a mobile app.',
      items: [['mobile', 'Mobile']],
    },
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
    <a href="#top" class="text-sm font-bold tracking-tight transition-colors duration-fast hover:text-ink">Monos UI</a>
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
        <span>65 components</span>
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
      <div class="mt-3 space-y-3">
        {#each groups as group}
          <div>
            <p class="text-whisper font-bold uppercase tracking-widest text-ink-soft">{group.name}</p>
            <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-whisper uppercase tracking-widest text-ink-faint">
              {#each group.items as [id, name]}
                <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </details>
    <div class="hidden gap-x-8 gap-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {#each groups as group, at}
        <div>
          <a
            href="#{group.id}"
            class="text-whisper font-bold uppercase tracking-widest text-ink-soft transition-colors duration-fast hover:text-ink"
            >{at + 1}. {group.name}</a
          >
          <div class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-whisper uppercase tracking-widest text-ink-faint">
            {#each group.items as [id, name]}
              <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </nav>

  <GroupHeading index={1} id="foundations" name={groups[0].name} hint={groups[0].hint} />
  <PaletteSection {palette} />
  <TypeSection />

  <GroupHeading index={2} id="inputs" name={groups[1].name} hint={groups[1].hint} />
  <ButtonsSection />
  <FieldsSection />
  <FormsSection />

  <GroupHeading index={3} id="display" name={groups[2].name} hint={groups[2].hint} />
  <MarksSection />
  <SurfacesSection />
  <DataSection />
  <TableSection />
  <MindMapSection />
  <EmptySection />

  <GroupHeading index={4} id="structure-group" name={groups[3].name} hint={groups[3].hint} />
  <LayoutSection />
  <StructureSection />
  <AppShellSection />
  <NavigationSection />

  <GroupHeading index={5} id="overlay-group" name={groups[4].name} hint={groups[4].hint} />
  <OverlaysSection />
  <FeedbackSection />
  <NoticesSection />

  <GroupHeading index={6} id="utility-group" name={groups[5].name} hint={groups[5].hint} />
  <UtilitiesSection />

  <GroupHeading index={7} id="mobile-group" name={groups[6].name} hint={groups[6].hint} />
  <MobileSection />

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
