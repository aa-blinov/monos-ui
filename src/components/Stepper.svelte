<script>
  /**
   * A sequence of steps. The current step is an id, not a number, so the same
   * component survives reordered steps. It is read-only unless `clickable`.
   */
  import { createEventDispatcher } from 'svelte';

  export let steps = [];
  export let value = '';
  export let orientation = 'horizontal';
  export let clickable = false;
  export let label = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  $: current = Math.max(
    0,
    steps.findIndex((step) => step.id === value),
  );

  function select(step) {
    if (!clickable || step.disabled) return;
    value = step.id;
    dispatch('change', value);
  }
</script>

<ol
  aria-label={label || undefined}
  class="flex {orientation === 'horizontal'
    ? 'flex-col gap-5 sm:flex-row sm:items-start sm:gap-0'
    : 'flex-col gap-5'} {className}"
>
  {#each steps as step, index}
    <li
      class="relative flex min-w-0 flex-1 gap-3 {orientation === 'horizontal'
        ? 'sm:flex-col sm:gap-2'
        : ''} {step.disabled ? 'opacity-40' : ''}"
    >
      <div class="flex items-center gap-2 {orientation === 'horizontal' ? 'sm:w-full' : ''}">
        <span
          class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold {index ===
          current
            ? 'border-ink bg-ink text-canvas'
            : index < current
              ? 'border-ink text-ink'
              : 'border-line text-ink-faint'}"
          aria-hidden="true"
        >
          {#if index < current}
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <polyline
                points="20 6 9 17 4 12"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {:else}
            {index + 1}
          {/if}
        </span>
        {#if orientation === 'horizontal' && index < steps.length - 1}
          <span class="hidden h-px flex-1 bg-line sm:block" aria-hidden="true"></span>
        {/if}
      </div>
      <div class="min-w-0 {orientation === 'horizontal' ? 'sm:pt-1' : ''}">
        {#if clickable}
          <button
            type="button"
            class="flex min-h-6 max-w-full items-center text-left text-sm font-bold transition-colors max-sm:min-h-11 duration-fast disabled:cursor-not-allowed {index ===
            current
              ? 'text-ink'
              : 'text-ink-soft hover:text-ink'}"
            aria-current={index === current ? 'step' : undefined}
            disabled={step.disabled}
            on:click={() => select(step)}
          >
            {step.label}
          </button>
        {:else}
          <p
            class="text-sm font-bold {index === current ? 'text-ink' : 'text-ink-soft'}"
            aria-current={index === current ? 'step' : undefined}
          >
            {step.label}
          </p>
        {/if}
        {#if step.description}
          <p class="mt-0.5 text-xs leading-relaxed text-ink-faint">{step.description}</p>
        {/if}
      </div>
    </li>
  {/each}
</ol>
