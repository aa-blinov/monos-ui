<script>
  /**
   * A selectable chip for a filter row. It is a real button: `aria-pressed`
   * carries the state, and the active chip takes the stronger border. A host
   * can bind `element` to measure the chip before showing it.
   */
  export let active = false;
  export let disabled = false;
  export let element = null;

  let className = '';
  export { className as class };
</script>

<button
  bind:this={element}
  type="button"
  aria-pressed={active}
  {disabled}
  class="inline-flex max-w-full items-center gap-1 truncate rounded-ui border px-2.5 text-[length:var(--text-whisper-lg)] leading-tight transition disabled:opacity-40 {active
    ? 'border-[var(--text-primary)] bg-surface font-bold text-ink'
    : 'border-line text-ink-soft hover:bg-surface hover:text-ink'} {className}"
  on:click
  {...$$restProps}
>
  <span class="min-w-0 truncate"><slot /></span>
</button>
