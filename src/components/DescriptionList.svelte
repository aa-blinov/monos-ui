<script>
  /**
   * A definition list. `stacked` puts the term above the description; `inline`
   * puts the term in a narrow left column from the small breakpoint up.
   */
  export let items = [];
  export let layout = 'stacked';

  let className = '';
  export { className as class };
</script>

<dl class="space-y-3 {className}">
  {#each items as item, index (item.term + index)}
    <div
      class="grid gap-1 {layout === 'inline'
        ? 'sm:grid-cols-[minmax(7rem,0.35fr)_1fr] sm:items-baseline sm:gap-4'
        : ''}"
    >
      <dt class="text-whisper uppercase tracking-widest text-ink-faint">{item.term}</dt>
      <dd class="m-0 text-sm leading-relaxed text-ink-soft">{item.description}</dd>
    </div>
  {/each}
</dl>
