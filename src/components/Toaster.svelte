<script>
  /**
   * The region that shows `toast()` messages. Mount one near the app root.
   * It is non-blocking: the page keeps working underneath.
   */
  import { toasts, dismissToast } from '../toast.js';

  export let position = 'bottom-right';
  export let max = 4;
  export let dismissLabel = 'Dismiss';

  let className = '';
  export { className as class };

  const positions = {
    'bottom-right': 'bottom-0 right-0 items-end',
    'bottom-left': 'bottom-0 left-0 items-start',
    'top-right': 'top-0 right-0 items-end',
    'top-left': 'top-0 left-0 items-start',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
  };

  const tones = {
    neutral: 'bg-ink-muted',
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  $: visible = $toasts.slice(-max);
</script>

<div
  class="pointer-events-none fixed z-tooltip flex w-full max-w-sm flex-col gap-2 p-4 {positions[position] || positions['bottom-right']} {className}"
  aria-live="polite"
  aria-atomic="false"
>
  {#each visible as item (item.id)}
    <div
      class="ui-toast pointer-events-auto flex w-full items-start gap-3 rounded-ui border border-line bg-canvas p-3 text-ink shadow-overlay"
      role={item.tone === 'danger' ? 'alert' : 'status'}
    >
      <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full {tones[item.tone] || tones.neutral}" aria-hidden="true"></span>
      <div class="min-w-0 flex-1">
        {#if item.title}
          <p class="text-sm font-bold">{item.title}</p>
        {/if}
        {#if item.description}
          <p class="text-xs leading-relaxed text-ink-soft {item.title ? 'mt-0.5' : ''}">{item.description}</p>
        {/if}
        {#if item.action}
          <button
            type="button"
            class="mt-2 inline-flex items-center text-xs font-bold uppercase tracking-widest text-ink transition-opacity duration-fast hover:opacity-60 max-sm:min-h-11"
            on:click={() => { item.action.onClick?.(); dismissToast(item.id); }}
          >
            {item.action.label}
          </button>
        {/if}
      </div>
      <button
        type="button"
        aria-label={dismissLabel}
        class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-ui text-ink-soft transition-colors duration-fast hover:text-ink max-sm:h-11 max-sm:w-11"
        on:click={() => dismissToast(item.id)}
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  {/each}
</div>

<style>
  .ui-toast {
    animation: ui-toast-in 200ms ease-out;
  }
  @keyframes ui-toast-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-toast {
      animation: none;
    }
  }
</style>
