<script>
  /**
   * The floating action of a phone screen: one pill, fixed above the bottom edge
   * and the home indicator. It carries a word, with an optional icon, because
   * the kit has no icon-only primary action. `lift` raises it clear of a
   * BottomNav (`true` adds the bar height). `fixed={false}` pins it to the
   * nearest positioned parent instead of the screen, for a framed preview.
   */
  export let label = '';
  export let position = 'right';
  export let lift = false;
  export let fixed = true;
  export let disabled = false;
  export let type = 'button';

  let className = '';
  export { className as class };
</script>

<button
  {type}
  {disabled}
  class="{fixed
    ? 'fixed'
    : 'absolute'} z-menu inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-canvas px-5 text-sm font-bold uppercase tracking-widest text-ink shadow-lift transition-opacity duration-fast hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 {position ===
  'left'
    ? 'left-4'
    : position === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'right-4'} {className}"
  style="bottom: calc(var(--ui-safe-bottom) + {lift ? 'var(--ui-bar-height) + ' : ''}1rem);"
  on:click
  {...$$restProps}
>
  <slot name="icon" />
  <slot>{label}</slot>
</button>
