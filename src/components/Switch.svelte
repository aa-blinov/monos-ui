<script>
  import { createEventDispatcher } from 'svelte';

  /** A switch: the whole row is the control, the label is its accessible name. */
  export let checked = false;
  export let disabled = false;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    dispatch('change', checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  {disabled}
  class="group inline-flex min-h-6 items-center gap-2.5 text-left max-sm:min-h-11 {disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer'} {className}"
  on:click={toggle}
  on:focus
  on:blur
  {...$$restProps}
>
  <span
    class="relative inline-flex h-5 w-9 shrink-0 items-center rounded-ui border border-line transition-colors duration-fast {checked
      ? 'border-ink bg-ink'
      : 'bg-surface-2'}"
  >
    <span
      class="inline-block h-4 w-4 rounded-ui bg-canvas shadow-rest transition-transform duration-fast {checked
        ? 'translate-x-4'
        : 'translate-x-0.5'}"
    ></span>
  </span>
  <span class="text-xs text-ink-soft transition-colors duration-fast group-hover:text-ink"><slot /></span>
</button>
