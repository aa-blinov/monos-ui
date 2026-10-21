<script>
  export let palette = {};
</script>

<section id="palette" class="mt-10 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Palette</h2>
  <p class="mt-1 text-xs text-ink-soft">Semantic roles, not colour names. The same roles exist in every theme.</p>
  <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
    {#each Object.entries(palette) as [name, value]}
      <div class="rounded-ui border border-line bg-surface p-2">
        <div class="h-10 rounded-ui border border-line" style="background: {value}"></div>
        <p class="mt-2 truncate text-whisper uppercase tracking-widest text-ink-soft">{name}</p>
        <p class="text-whisper text-ink-faint">{value}</p>
      </div>
    {/each}
  </div>
</section>
