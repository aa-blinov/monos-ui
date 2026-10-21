<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A stack of disclosures. `open` is the list of open ids and is bindable;
   * without `multiple` only one stays open. The content is a slot that receives
   * the item, so any markup fits.
   *
   *   <Accordion items={items} bind:open let:item>{item.body}</Accordion>
   */
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let open = [];
  export let multiple = false;
  export let label = '';
  export let headingLevel = 3;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const baseId = `ui-accordion-${++counter}`;
  $: heading = `h${Math.min(6, Math.max(2, Number(headingLevel) || 3))}`;

  function isOpen(id) {
    return open.includes(id);
  }

  function toggle(item) {
    if (item.disabled) return;
    const next = isOpen(item.id)
      ? open.filter((id) => id !== item.id)
      : multiple
        ? [...open, item.id]
        : [item.id];
    open = next;
    dispatch('change', next);
  }
</script>

<div
  class="border-y border-line {className}"
  role={label ? 'group' : undefined}
  aria-label={label || undefined}
>
  {#each items as item}
    <div class="border-b border-line last:border-b-0">
      <svelte:element this={heading}>
        <button
          type="button"
          id="{baseId}-head-{item.id}"
          aria-expanded={open.includes(item.id)}
          aria-controls="{baseId}-panel-{item.id}"
          disabled={item.disabled}
          class="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-bold text-ink transition-colors duration-fast hover:text-ink-soft disabled:cursor-not-allowed disabled:opacity-30"
          on:click={() => toggle(item)}
        >
          <span class="min-w-0">{item.title}</span>
          <svg
            class="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-fast {open.includes(item.id) ? 'rotate-180' : ''}"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </svelte:element>
      <div
        id="{baseId}-panel-{item.id}"
        role="region"
        aria-labelledby="{baseId}-head-{item.id}"
        hidden={!open.includes(item.id)}
        class="pb-4 pr-7 text-sm leading-relaxed text-ink-soft"
      >
        {#if $$slots.default}
          <slot {item} />
        {:else}
          {item.content}
        {/if}
      </div>
    </div>
  {/each}
</div>
