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
  class="w-full overflow-hidden rounded-ui bg-surface-2 {sizes[size] || sizes.md} {className}"
>
  <span
    class="block h-full rounded-ui {tones[tone] || tones.accent} {indeterminate ? 'ui-progress-indeterminate' : 'ui-progress-fill'}"
    style={indeterminate ? undefined : `width: ${percent}%`}
  ></span>
</div>

<style>
  .ui-progress-fill {
    transition: width 200ms ease;
  }
  .ui-progress-indeterminate {
    width: 35%;
    animation: ui-progress 1.4s ease-in-out infinite;
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
  }
</style>
