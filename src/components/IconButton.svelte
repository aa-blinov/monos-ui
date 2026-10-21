<script>
  /**
   * An icon-only button. The name is always in `label`; the tooltip repeats it
   * unless `tooltip` says otherwise. The icon comes through the default slot
   * and should be 16px with strokeWidth 1.7.
   *
   * variant: outline | ghost
   * size:    sm | md | lg
   */
  import { tooltip } from '../tooltip.js';

  export let label;
  export let tooltipText = undefined;

  $: tip = tooltipText === undefined ? label : tooltipText;
  export let variant = 'outline';
  export let size = 'md';
  export let type = 'button';
  export let disabled = false;
  export let pressed = undefined;

  let className = '';
  export { className as class };

  const sizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  const variants = {
    outline: 'border border-line text-ink-soft hover:border-line-strong hover:text-ink',
    ghost: 'text-ink-soft hover:bg-surface hover:text-ink',
  };

  $: base = 'inline-flex items-center justify-center rounded-ui transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-30 max-sm:h-11 max-sm:w-11';
  $: active = pressed ? 'bg-surface text-ink' : '';
</script>

<button
  {type}
  {disabled}
  aria-label={label}
  aria-pressed={pressed === undefined ? undefined : pressed}
  class="{base} {sizes[size] || sizes.md} {variants[variant] || variants.outline} {active} {className}"
  use:tooltip={tip}
  on:click
  on:focus
  on:blur
  on:keydown
  {...$$restProps}
>
  <slot />
</button>
