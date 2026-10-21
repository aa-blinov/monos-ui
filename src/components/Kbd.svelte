<script>
  /** A key cap, for a shortcut written in text. */
  let className = '';
  export { className as class };
</script>

<kbd class="inline-flex min-h-6 items-center rounded-ui border border-line bg-surface px-1.5 font-ui text-whisper text-ink-soft {className}">
  <slot />
</kbd>
