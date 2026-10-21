<script>
  /**
   * Renders its content into another element. Use it to keep an overlay out of a
   * parent's overflow and stacking context. The target can be a selector or an
   * element; the body is the fallback.
   */
  export let target = null;

  let className = '';
  export { className as class };

  function place(node, value) {
    if (typeof document === 'undefined') return;
    const next = typeof value === 'string' ? document.querySelector(value) : value;
    const destination = next || document.body;
    if (destination && node.parentNode !== destination) destination.appendChild(node);
  }

  function portal(node, value) {
    place(node, value);
    // The destination may come later in the same render tree.
    queueMicrotask(() => place(node, value));
    return {
      update(next) {
        place(node, next);
      },
      destroy() {
        node.remove();
      },
    };
  }
</script>

<div use:portal={target} class={className}>
  <slot />
</div>
