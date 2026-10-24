<script>
  /**
   * A row of choices where one is pressed. It is a group of buttons, not a
   * tablist: choosing changes a setting, not a page.
   */
  import { createEventDispatcher } from 'svelte';

  export let options = [];
  export let value = '';
  export let label = '';
  export let size = 'md';
  export let full = false;
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const sizes = {
    sm: 'px-2.5 text-whisper',
    md: 'px-3 text-xs',
    lg: 'px-3.5 text-xs',
  };
  const heights = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };

  function pick(option) {
    if (disabled || option.disabled || option.value === value) return;
    value = option.value;
    dispatch('change', { value: option.value, option });
  }
</script>

<div
  class="inline-flex rounded-ui border border-line bg-surface p-0.5 {heights[size] || heights.md} max-sm:h-11 {full
    ? 'w-full'
    : ''} {className}"
  role="group"
  aria-label={label || undefined}
>
  {#each options as option}
    <button
      type="button"
      aria-pressed={value === option.value}
      disabled={disabled || option.disabled}
      class="inline-flex h-full min-w-0 items-center justify-center rounded-ui whitespace-nowrap uppercase tracking-widest transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-30 {full
        ? 'flex-1'
        : ''} {sizes[size] || sizes.md} {value === option.value
        ? 'bg-canvas text-ink shadow-rest'
        : 'text-ink-soft hover:text-ink'}"
      on:click={() => pick(option)}
    >
      {option.label ?? option.value}
    </button>
  {/each}
</div>
