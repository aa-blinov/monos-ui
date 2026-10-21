<script>
  /**
   * A status word: uppercase, tracked, quiet. Used for things like "Agent" or
   * "Conflict", where colour is the state and the word is the label.
   */
  export let tone = 'neutral';
  export let dot = false;

  let className = '';
  export { className as class };

  const dots = {
    neutral: 'bg-ink-muted',
    accent: 'bg-accent',
    danger: 'bg-danger',
    warning: 'bg-warning',
    success: 'bg-success',
  };

  const tones = {
    neutral: 'text-ink-soft',
    accent: 'text-accent-text',
    danger: 'text-danger-text',
    warning: 'text-warning-text',
    success: 'text-success-text',
  };
</script>

<span
  class="inline-flex items-center gap-1.5 text-whisper font-bold uppercase tracking-widest {tones[tone] ||
    tones.neutral} {className}"
>
  {#if dot}
    <span class="h-2 w-2 shrink-0 rounded-full {dots[tone] || dots.neutral}" aria-hidden="true"></span>
  {/if}
  <slot />
</span>
