<script>
  /**
   * The tab bar at the foot of a phone screen: three to five destinations, one
   * of them current. `items` are data (`id`, `label`, optional `href`, `badge`
   * and `disabled`); the icon comes through the `icon` slot, which receives
   * `item` and `active`. An item with `href` is a link, the rest are buttons.
   * The bar pads itself with the bottom safe-area inset, so it clears the home
   * indicator.
   */
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let value = '';
  export let label = 'Main';
  export let fixed = true;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  function select(item) {
    if (item.disabled) return;
    if (item.id !== value) {
      value = item.id;
      dispatch('change', value);
    }
  }
</script>

<nav
  aria-label={label}
  class="{fixed ? 'fixed inset-x-0 bottom-0 z-menu' : ''} border-t border-line bg-canvas text-ink {className}"
  style="padding-bottom: var(--ui-safe-bottom); padding-left: var(--ui-safe-left); padding-right: var(--ui-safe-right);"
>
  <ul class="flex h-bar items-stretch">
    {#each items as item (item.id)}
      <li class="min-w-0 flex-1">
        <svelte:element
          this={item.href ? 'a' : 'button'}
          href={item.href && !item.disabled ? item.href : undefined}
          type={item.href ? undefined : 'button'}
          disabled={item.href ? undefined : item.disabled}
          aria-disabled={item.href && item.disabled ? 'true' : undefined}
          aria-current={value === item.id ? 'page' : undefined}
          role={item.href ? 'link' : 'button'}
          class="relative flex h-full w-full min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-whisper uppercase tracking-widest transition-colors duration-fast {value ===
          item.id
            ? 'font-bold text-ink'
            : 'text-ink-faint hover:text-ink'} {item.disabled ? 'cursor-not-allowed opacity-40' : ''}"
          on:click={() => select(item)}
        >
          <span class="relative inline-flex h-5 w-5 items-center justify-center">
            <slot name="icon" {item} active={value === item.id} />
            {#if item.badge}
              <span
                class="absolute -right-2 -top-1.5 min-w-4 rounded-full bg-accent px-1 text-center text-[0.625rem] font-bold leading-4 text-canvas"
                >{item.badge}</span
              >
            {/if}
          </span>
          <span class="max-w-full truncate">{item.label}</span>
        </svelte:element>
      </li>
    {/each}
  </ul>
</nav>
