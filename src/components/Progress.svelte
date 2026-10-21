<script>
  /** A determinate or indeterminate progress bar. The label is the accessible name. */
  export let value = 0;
  export let max = 100;
  export let label = '';
  export let tone = 'accent';
  export let size = 'md';
  export let indeterminate = false;

  let className = '';
  export { className as class };

  const tones = {
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  $: clamped = Math.min(max, Math.max(0, value));
  $: percent = max > 0 ? (clamped / max) * 100 : 0;
</script>

<div
  role="progressbar"
  aria-label={label || undefined}
  aria-valuemin="0"
  aria-valuemax={max}
  aria-valuenow={indeterminate ? undefined : clamped}
  class="relative w-full overflow-hidden rounded-ui bg-surface-2 {sizes[size] || sizes.md} {className}"
>
  {#if indeterminate}
    <span class="ui-progress-indeterminate {tones[tone] || tones.accent}"></span>
    <span class="ui-progress-indeterminate ui-progress-delay {tones[tone] || tones.accent}"></span>
  {:else}
    <span class="block h-full rounded-ui {tones[tone] || tones.accent} ui-progress-fill" style={`width: ${percent}%`}
    ></span>
  {/if}
</div>

<style>
  .ui-progress-fill {
    transition: width 200ms ease;
  }
  .ui-progress-indeterminate {
    position: absolute;
    inset-block: 0;
    left: 0;
    width: 35%;
    border-radius: var(--ui-radius);
    animation: ui-progress 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .ui-progress-delay {
    animation-delay: -0.8s;
  }
  @keyframes ui-progress {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateX(330%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-progress-fill {
      transition: none;
    }
    .ui-progress-indeterminate {
      width: 100%;
      animation: none;
      opacity: 0.35;
    }
    .ui-progress-delay {
      display: none;
    }
  }
</style>
