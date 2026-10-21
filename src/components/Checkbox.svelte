<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A checkbox with a real input underneath. The box is 16px, the row is 24px
   * (44px on a touch screen), and the label arrives through the default slot.
   */
  export let checked = false;
  export let indeterminate = false;
  export let disabled = false;
  export let id = '';

  let className = '';
  export { className as class };

  const fallbackId = `ui-checkbox-${++counter}`;
  $: fieldId = id || fallbackId;
  let inputEl;

  $: if (inputEl) inputEl.indeterminate = indeterminate;
</script>

<label
  for={fieldId}
  class="group inline-flex min-h-6 select-none items-center gap-2.5 {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} max-sm:min-h-11 {className}"
>
  <span class="relative inline-flex h-4 w-4 items-center justify-center">
    <input
      bind:this={inputEl}
      id={fieldId}
      type="checkbox"
      bind:checked
      {disabled}
      class="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none rounded-ui border border-line bg-canvas transition-colors duration-fast checked:border-ink checked:bg-ink group-hover:border-line-strong disabled:cursor-not-allowed"
      on:change
    />
    {#if indeterminate}
      <svg class="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-canvas" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
    {:else}
      <svg class="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-canvas opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    {/if}
  </span>
  <span class="text-xs text-ink-soft transition-colors duration-fast group-hover:text-ink">
    <slot />
  </span>
</label>
