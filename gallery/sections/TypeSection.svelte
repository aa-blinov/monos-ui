<script>
  import { FontPicker } from '../../src/index.js';

  export let font = 'mono';
</script>

<section id="type" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Type</h2>
  <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
    Three faces ship with the kit, each with Latin and Cyrillic. Pick one and the whole page changes with it; the kit
    reads the face from <code class="font-mono text-xs">--ui-font</code>, set by
    <code class="font-mono text-xs">data-font</code> on the root.
  </p>
  <FontPicker class="mt-4" bind:value={font} label="Typeface" />
  <div class="mt-6 space-y-2">
    <p class="text-3xl font-bold tracking-tight">Display 30</p>
    <p class="text-2xl font-bold tracking-tight">Headline 24</p>
    <p class="text-xl font-bold tracking-tight">Title 20</p>
    <p class="text-sm leading-relaxed text-ink-soft">
      Body 14. A calm sentence in the interface face, with enough room to breathe. Спокойное предложение с запасом
      воздуха.
    </p>
    <p class="text-whisper uppercase tracking-[0.16em] text-ink-faint">Metadata whisper 11</p>
  </div>
</section>
