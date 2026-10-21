<script>
  /**
   * The path back up the tree. The last item is the current page and is not a
   * link; the separators are decorative text, not a middle dot.
   */
  export let items = [];
  export let label = 'Breadcrumb';

  let className = '';
  export { className as class };
</script>

<nav aria-label={label} class={className}>
  <ol class="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
    {#each items as item, index}
      <li class="inline-flex min-w-0 items-center gap-1.5">
        {#if index > 0}
          <span class="text-ink-muted" aria-hidden="true">/</span>
        {/if}
        {#if item.href && index < items.length - 1}
          <a
            href={item.href}
            class="min-w-0 truncate rounded-ui px-0.5 transition-colors duration-fast hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >{item.label}</a
          >
        {:else}
          <span
            aria-current={index === items.length - 1 ? 'page' : undefined}
            class="min-w-0 truncate {index === items.length - 1 ? 'text-ink' : ''}">{item.label}</span
          >
        {/if}
      </li>
    {/each}
  </ol>
</nav>
