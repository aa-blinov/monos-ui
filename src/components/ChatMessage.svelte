<script>
  export let kind = 'assistant';
  export let label = '';
  export let time = '';
  export let datetime = '';

  let className = '';
  export { className as class };
</script>

<article class="entry {className}" data-kind={kind} aria-label={label || undefined} {...$$restProps}>
  {#if label || time}
    <header class="meta">
      {#if label}<span class="label">{label}</span>{/if}
      {#if time}<time datetime={datetime || undefined}>{time}</time>{/if}
    </header>
  {/if}
  <div class="content"><slot /></div>
  <footer class="actions"><slot name="actions" /></footer>
</article>

<style>
  .entry {
    display: block;
    min-width: 0;
    padding: var(--ui-space-snug) 0 var(--ui-space-base);
    border-bottom: 1px solid var(--ui-line);
    overflow-wrap: anywhere;
    color: var(--ui-ink);
    font-family: var(--ui-font);
  }

  .content {
    min-width: 0;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--ui-space-base);
    margin-bottom: var(--ui-space-snug);
    color: var(--ui-ink-faint);
    font-size: var(--ui-text-whisper);
  }

  .label {
    color: var(--ui-ink-soft);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .actions:empty {
    display: none;
  }
</style>
