<script>
  import { createEventDispatcher } from 'svelte';

  /** A small label, not a filter. Tone changes the text only; the shape stays quiet. */
  export let tone = 'neutral';
  export let size = 'sm';
  export let removable = false;
  export let removeLabel = 'Remove';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const tones = {
    neutral: 'text-ink-soft',
    accent: 'text-accent-text',
    danger: 'text-danger-text',
    warning: 'text-warning-text',
    success: 'text-success-text',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-whisper',
    md: 'px-2.5 py-1 text-xs',
  };
</script>

<span
  class="inline-flex max-w-full items-center gap-1 rounded-ui border border-line bg-canvas {tones[tone] ||
    tones.neutral} {sizes[size] || sizes.sm} {className}"
>
  <span class="truncate"><slot /></span>
  {#if removable}
    <button
      type="button"
      aria-label={removeLabel}
      class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-ui text-current max-sm:h-6 max-sm:w-6 transition-opacity duration-fast hover:opacity-60"
      on:click={() => dispatch('remove')}
    >
      <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </button>
  {/if}
</span>
