<script>
  /** A message inside the page: a dot, a title, a sentence, and an optional close. */
  import { createEventDispatcher } from 'svelte';

  export let tone = 'info';
  export let title = '';
  export let dismissible = false;
  export let dismissLabel = 'Dismiss';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const tones = {
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    neutral: 'bg-ink-muted',
  };
</script>

<div
  class="flex items-start gap-3 rounded-ui border border-line bg-surface p-3 text-sm text-ink {className}"
  role={tone === 'danger' ? 'alert' : 'status'}
>
  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full {tones[tone] || tones.info}" aria-hidden="true"></span>
  <div class="min-w-0 flex-1">
    {#if title}
      <p class="text-sm font-bold">{title}</p>
    {/if}
    <div class="text-xs leading-relaxed text-ink-soft {title ? 'mt-0.5' : ''}">
      <slot />
    </div>
  </div>
  {#if dismissible}
    <button
      type="button"
      aria-label={dismissLabel}
      class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-ui text-ink-soft transition-colors duration-fast hover:text-ink max-sm:h-11 max-sm:w-11"
      on:click={() => dispatch('dismiss')}
    >
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </button>
  {/if}
</div>
