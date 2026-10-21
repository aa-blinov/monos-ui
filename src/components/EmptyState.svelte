<script>
  /** A quiet placeholder: an icon, a title, one sentence, and whatever actions belong there. */
  export let title = '';
  export let description = '';

  let className = '';
  export { className as class };
</script>

<div class="flex flex-col items-center justify-center p-8 text-center {className}">
  {#if $$slots.icon}
    <div class="mb-3 text-ink-muted" aria-hidden="true">
      <slot name="icon" />
    </div>
  {/if}
  {#if title}
    <p class="text-sm font-bold text-ink">{title}</p>
  {/if}
  {#if description}
    <p class="mt-1 max-w-sm text-xs leading-relaxed text-ink-soft">{description}</p>
  {/if}
  {#if $$slots.actions}
    <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
      <slot name="actions" />
    </div>
  {/if}
</div>
