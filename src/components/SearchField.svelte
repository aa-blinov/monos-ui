<script>
  /**
   * The one search box: a pill, a magnifier inside on the left, a clear button
   * on the right. Esc clears first; a second Esc reaches the page.
   */
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let placeholder = 'Search';
  export let label = 'Search';
  export let clearLabel = 'Clear';
  export let size = 'md';
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const sizes = {
    sm: 'h-8 pl-8 pr-8 text-xs',
    md: 'h-10 pl-10 pr-9 text-sm',
    lg: 'h-11 pl-11 pr-10 text-sm',
  };

  function clear() {
    value = '';
    dispatch('clear');
  }

  function onInput(event) {
    value = event.currentTarget.value;
    dispatch('input', event);
  }

  function onKeydown(event) {
    if (event.key === 'Escape' && value) {
      event.preventDefault();
      clear();
      return;
    }
    dispatch('keydown', event);
  }
</script>

<div class="relative {className}">
  <svg
    class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.7" />
    <path d="m16 16 4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
  </svg>
  <input
    type="search"
    {placeholder}
    {disabled}
    {value}
    aria-label={label}
    class="w-full rounded-ui border border-line bg-surface text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint focus:border-ink-soft disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden {sizes[
      size
    ] || sizes.md} max-sm:h-11"
    on:input={onInput}
    on:keydown={onKeydown}
    on:focus={(event) => dispatch('focus', event)}
    on:blur={(event) => dispatch('blur', event)}
    {...$$restProps}
  />
  {#if value}
    <button
      type="button"
      aria-label={clearLabel}
      class="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-ui text-ink-soft transition-colors duration-fast hover:text-ink"
      on:click={clear}
    >
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </button>
  {/if}
</div>
