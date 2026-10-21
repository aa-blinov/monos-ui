<script>
  /**
   * A loading placeholder. It takes a width and a height so the page reserves
   * the space the content will need; the pulse is the only motion and it stops
   * under reduce motion.
   */
  export let width = '100%';
  export let height = '1rem';
  export let rounded = 'ui';

  let className = '';
  export { className as class };

  const radii = {
    ui: 'rounded-ui',
    full: 'rounded-full',
  };
</script>

<span
  class="block animate-pulse bg-surface-2 motion-reduce:animate-none {radii[rounded] || radii.ui} {className}"
  style="width: {width}; height: {height};"
  aria-hidden="true"
></span>
