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
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const sizes = {
    sm: 'min-h-7 px-2.5 text-whisper',
    md: 'min-h-8 px-3 text-xs',
  };

  function pick(option) {
    if (disabled || option.disabled || option.value === value) return;
    value = option.value;
    dispatch('change', { value: option.value, option });
  }
</script>

<div class="inline-flex rounded-ui border border-line bg-surface p-0.5 {className}" role="group" aria-label={label || undefined}>
  {#each options as option}
    <button
      type="button"
      aria-pressed={value === option.value}
      disabled={disabled || option.disabled}
      class="inline-flex items-center justify-center rounded-ui uppercase tracking-widest transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-30 max-sm:min-h-11 {sizes[size] || sizes.md} {value === option.value ? 'bg-canvas text-ink shadow-rest' : 'text-ink-soft hover:text-ink'}"
      on:click={() => pick(option)}
    >
      {option.label ?? option.value}
    </button>
  {/each}
</div>
