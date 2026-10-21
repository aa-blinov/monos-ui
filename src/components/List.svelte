<script>
  /**
   * A quiet data list. `items` carry the text; the `icon`, default and `meta`
   * slots carry any markup. A row with `href` is a link.
   */
  export let items = [];
  export let divided = true;
  export let compact = false;

  let className = '';
  export { className as class };
</script>

<ul class="{divided ? 'divide-y divide-line border-y border-line' : ''} {className}">
  {#each items as item, index (item.id ?? item.label ?? index)}
    <li>
      <svelte:element
        this={item.href ? 'a' : 'div'}
        href={item.href || undefined}
        class="flex min-h-9 items-start gap-3 px-3 max-sm:min-h-11 {compact ? 'py-1.5' : 'py-2.5'} {item.href
          ? 'transition-colors duration-fast hover:bg-surface'
          : ''}"
      >
        <slot name="icon" {item} />
        <span class="min-w-0 flex-1">
          {#if $$slots.default}
            <slot {item} />
          {:else}
            <span class="block text-sm text-ink">{item.label}</span>
          {/if}
          {#if item.description}
            <span class="mt-0.5 block text-xs leading-relaxed text-ink-faint">{item.description}</span>
          {/if}
        </span>
        {#if item.meta}
          <span class="shrink-0 text-xs text-ink-faint">{item.meta}</span>
        {/if}
        <slot name="meta" {item} />
      </svelte:element>
    </li>
  {/each}
</ul>
