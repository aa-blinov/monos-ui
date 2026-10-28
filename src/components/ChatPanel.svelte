<script>
  export let label = '';
  export let busy = false;

  let className = '';
  export { className as class };
</script>

<section
  class="panel {className}"
  aria-label={label || undefined}
  aria-busy={busy ? 'true' : undefined}
  {...$$restProps}
>
  <slot name="header" />
  <div class="transcript">
    <slot name="messages" />
  </div>
  <footer class="composer">
    <slot name="composer" />
  </footer>
</section>

<style>
  .panel {
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    color: var(--ui-ink);
    font-family: var(--ui-font);
    flex-direction: column;
  }

  .transcript {
    display: flex;
    flex: 1 1 0;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .composer {
    flex: none;
    padding: var(--ui-space-snug) max(16px, var(--ui-safe-left)) max(var(--ui-space-snug), var(--ui-safe-bottom))
      max(16px, var(--ui-safe-right));
    border-top: 1px solid var(--ui-line);
    background: var(--ui-bg);
  }
</style>
