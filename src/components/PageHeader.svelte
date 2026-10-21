<script>
  /**
   * A page title, a sentence and the page's actions. The heading level is a
   * prop because a page header is not always the document's first heading.
   */
  export let title = '';
  export let description = '';
  export let level = 1;

  let className = '';
  export { className as class };

  $: heading = `h${Math.min(6, Math.max(1, Number(level) || 1))}`;
</script>

<header class="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4 {className}">
  <div class="min-w-0">
    <svelte:element this={heading} class="text-xl font-bold tracking-tight text-ink">{title}</svelte:element>
    {#if description}
      <p class="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">{description}</p>
    {/if}
  </div>
  {#if $$slots.actions}
    <div class="flex flex-wrap items-center gap-3">
      <slot name="actions" />
    </div>
  {/if}
</header>
