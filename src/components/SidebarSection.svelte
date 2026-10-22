<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A labelled group in the sidebar. A collapsible section keeps `open`
   * bindable and announces its state; `count` is the quiet number after the
   * title. A host puts its own `actions` at the far end.
   */
  import { createEventDispatcher } from 'svelte';

  export let title = '';
  export let count = null;
  export let collapsible = false;
  export let open = true;
  export let level = 2;
  export let toggleTestid = '';
  export let bodyTestid = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const bodyId = `ui-sidebar-section-${++counter}`;

  function toggle() {
    if (!collapsible) return;
    open = !open;
    dispatch('toggle', open);
  }
</script>

<section class="min-w-0 {className}">
  {#if title || count !== null || $$slots.actions}
    <div class="flex min-h-8 items-center gap-1.5 px-2">
      {#if collapsible}
        <button
          type="button"
          class="flex min-w-0 flex-1 items-center gap-1 rounded-ui text-left text-whisper font-bold uppercase tracking-widest text-ink-faint transition-colors duration-fast hover:text-ink"
          aria-expanded={open}
          aria-controls={bodyId}
          data-testid={toggleTestid || undefined}
          on:click={toggle}
        >
          <svg
            class="h-3 w-3 shrink-0 transition-transform {open ? 'rotate-90' : ''}"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="truncate">{title}</span>
        </button>
      {:else}
        <svelte:element
          this={`h${level}`}
          class="min-w-0 flex-1 truncate text-whisper font-bold uppercase tracking-widest text-ink-faint"
        >
          {title}
        </svelte:element>
      {/if}
      {#if count !== null}
        <span class="shrink-0 text-whisper text-ink-faint">{count}</span>
      {/if}
      <slot name="actions" />
    </div>
  {/if}
  <div id={bodyId} data-testid={bodyTestid || undefined} class="space-y-0.5">
    {#if !collapsible || open}
      <slot />
    {/if}
  </div>
</section>
