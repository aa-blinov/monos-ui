<script>
  import { tooltip } from '../tooltip.js';

  /** A wrapper for a hint on any element: `<Tooltip text="Delete">…</Tooltip>`. */
  export let text = '';
  export let placement = 'bottom';
  export let align = 'center';

  let className = '';
  export { className as class };
</script>

<span class="inline-flex {className}" use:tooltip={{ text, placement, align }}>
  <slot />
</span>
