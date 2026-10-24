<svelte:options accessors />

<script>
  /**
   * A text button. The system has no filled or outlined action button: the
   * word is the button, and the only frame is a toggle's chosen state.
   *
   * variant: primary | secondary | text | quiet | danger
   * size:    sm | md | lg
   */
  import Spinner from './Spinner.svelte';

  export let variant = 'primary';
  export let size = 'md';
  export let type = 'button';
  export let disabled = false;
  export let loading = false;
  export let full = false;

  // The DOM node, for a parent that has to give it focus (an alert dialog focuses Cancel).
  export let buttonEl = null;

  let className = '';
  export { className as class };

  const sizes = {
    sm: 'min-h-7 text-xs',
    md: 'min-h-9 text-sm',
    lg: 'min-h-11 text-sm',
  };
  const padding = { sm: 'px-3', md: 'px-4', lg: 'px-5' };

  const variants = {
    primary: 'font-bold text-ink hover:opacity-70 active:opacity-60',
    secondary: 'font-normal text-ink-soft hover:text-ink',
    text: 'font-bold text-ink hover:opacity-60 active:opacity-50',
    quiet: 'font-medium normal-case tracking-normal text-ink-soft hover:text-ink',
    danger: 'font-bold text-danger-text hover:opacity-70 active:opacity-60',
  };

  // Tailwind orders utilities by value, not by where they sit in the class
  // string, so a host's `px-0` or `justify-start` would lose to the kit's own
  // `px-3` or `justify-center`. The kit leaves those two out when the host
  // names them.
  $: ownPadding = /(^|\s)!?-?(p|px)-/.test(className);
  $: ownJustify = /(^|\s)!?justify-/.test(className);
  $: base = `inline-flex items-center ${ownJustify ? '' : 'justify-center'} gap-2 rounded-ui uppercase tracking-widest transition-colors duration-fast max-sm:min-h-11`;
  $: state = loading ? 'cursor-wait opacity-70' : 'disabled:cursor-not-allowed disabled:opacity-30';
</script>

<button
  bind:this={buttonEl}
  {type}
  disabled={disabled || loading}
  aria-busy={loading ? 'true' : undefined}
  class="{base} {sizes[size] || sizes.md} {ownPadding ? '' : padding[size] || padding.md} {variants[variant] ||
    variants.primary} {state} {full ? 'w-full' : ''} {className}"
  on:click
  on:focus
  on:blur
  on:keydown
  {...$$restProps}
>
  {#if loading}
    <Spinner size={size === 'sm' ? 'sm' : 'md'} />
  {:else}
    <slot name="icon" />
  {/if}
  <span class="inline-flex min-w-0 flex-1 items-center [justify-content:inherit] gap-2 truncate"><slot /></span>
  <slot name="trailing" />
</button>
