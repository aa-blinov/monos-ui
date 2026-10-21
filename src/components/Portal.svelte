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
    let destroyed = false;
    let latest = value;
    const move = () => {
      if (!destroyed) place(node, latest);
    };
    move();
    // The destination may come later in the same render tree.
    queueMicrotask(move);
    return {
      update(next) {
        latest = next;
        if (!destroyed) place(node, next);
      },
      destroy() {
        destroyed = true;
        node.remove();
      },
    };
  }
</script>

<div use:portal={target} class={className}>
  <slot />
</div>
