<script>
  export let label = '';
  export let busy = false;

  let className = '';
  export { className as class };
</script>

<div
  class="frame {className}"
  role="group"
  aria-label={label || undefined}
  aria-busy={busy ? 'true' : undefined}
  {...$$restProps}
>
  <slot name="before" />
  <div class="content"><slot /></div>
  <slot name="after" />
</div>

<style>
  .frame {
    display: block;
    min-width: 0;
    padding: var(--ui-space-snug);
    border: 1px solid var(--ui-line);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    box-shadow: var(--ui-shadow-rest);
    color: var(--ui-ink);
    font-family: var(--ui-font);
  }

  .content {
    min-width: 0;
  }

  .frame:focus-within {
    border-color: var(--ui-ink-soft);
    outline: 2px solid var(--ui-focus);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    .frame {
      padding: var(--ui-space-tight);
    }
  }
</style>
