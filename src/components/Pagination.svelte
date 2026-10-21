<script>
  /**
   * Page numbers with first, last and the current neighbourhood. The page is
   * bindable; `change` carries the new number. A gap is a real ellipsis, not a
   * disabled button.
   */
  import { createEventDispatcher } from 'svelte';

  export let page = 1;
  export let pages = 1;
  export let label = 'Pagination';
  export let previousLabel = 'Previous page';
  export let nextLabel = 'Next page';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  $: total = Math.max(1, Number(pages) || 1);
  $: current = Math.min(total, Math.max(1, Number(page) || 1));
  $: numbers = (() => {
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
    const wanted = [...new Set([1, total, current - 1, current, current + 1])]
      .filter((number) => number >= 1 && number <= total)
      .sort((a, b) => a - b);
    const result = [];
    for (let index = 0; index < wanted.length; index += 1) {
      if (index > 0 && wanted[index] - wanted[index - 1] > 1) result.push('gap');
      result.push(wanted[index]);
    }
    return result;
  })();

  function go(next) {
    const value = Math.min(total, Math.max(1, next));
    if (value === page) return;
    page = value;
    dispatch('change', page);
  }
</script>

<nav aria-label={label} class="flex items-center gap-1 {className}">
  <button
    type="button"
    aria-label={previousLabel}
    disabled={current <= 1}
    class="inline-flex h-9 min-w-9 items-center justify-center rounded-ui text-ink-soft transition-colors duration-fast hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 max-sm:h-11 max-sm:min-w-11"
    on:click={() => go(current - 1)}
  >
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m14 6-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  <span class="hidden items-center gap-1 sm:flex">
    {#each numbers as number}
      {#if number === 'gap'}
        <span class="inline-flex h-9 min-w-9 items-center justify-center text-xs text-ink-muted" aria-hidden="true">…</span>
      {:else}
        <button
          type="button"
          aria-current={number === current ? 'page' : undefined}
          class="inline-flex h-9 min-w-9 items-center justify-center rounded-ui px-1 text-xs tabular-nums transition-colors duration-fast max-sm:h-11 max-sm:min-w-11 {number === current ? 'font-bold text-ink' : 'text-ink-soft hover:text-ink'}"
          on:click={() => go(number)}
        >
          {number}
        </button>
      {/if}
    {/each}
  </span>

  <span class="inline-flex min-h-9 items-center px-2 text-xs tabular-nums text-ink-soft sm:hidden">{current} / {total}</span>

  <button
    type="button"
    aria-label={nextLabel}
    disabled={current >= total}
    class="inline-flex h-9 min-w-9 items-center justify-center rounded-ui text-ink-soft transition-colors duration-fast hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 max-sm:h-11 max-sm:min-w-11"
    on:click={() => go(current + 1)}
  >
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m10 6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</nav>
