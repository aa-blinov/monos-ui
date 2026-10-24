<script>
  /**
   * A mind map: one idea in the middle and its branches around it. `root` is a
   * tree of `{ id, label, children }`; the picture is drawn in SVG with the
   * kit's tokens and laid out by `layoutMindMap`, so there is no dependency.
   *
   * It is a WAI-ARIA tree: one node is in the tab order, arrows move between
   * nodes, Enter or Space folds a branch, Home returns to the root. Drag the
   * background to pan; Ctrl or Cmd with the wheel zooms, and the three buttons
   * zoom and fit. `value` is the selected id (bindable); `collapsed` is the
   * array of folded ids (bindable).
   *
   * direction: right | both
   */
  import { createEventDispatcher, tick } from 'svelte';
  import { layoutMindMap, neighbour } from '../mindmap-layout.js';
  import IconButton from './IconButton.svelte';

  export let root = null;
  export let value = '';
  export let collapsed = [];
  export let direction = 'right';
  export let label = 'Mind map';
  export let height = '28rem';
  export let zoomInLabel = 'Zoom in';
  export let zoomOutLabel = 'Zoom out';
  export let fitLabel = 'Fit to view';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  let box;
  let width = 0;
  let boxHeight = 0;
  let scale = 1;
  let panX = 0;
  let panY = 0;
  let fitted = false;
  let dragging = null;
  let focusId = '';

  $: layout = layoutMindMap(root, { collapsed, direction });
  $: nodes = layout.nodes;
  $: if (!focusId || !nodes.some((node) => node.id === focusId))
    focusId = value && nodes.some((node) => node.id === value) ? value : nodes[0]?.id || '';
  $: if (!fitted && width && boxHeight && nodes.length) {
    fitted = true;
    fit();
  }

  function fit() {
    if (!width || !boxHeight) return;
    const { minX, minY, maxX, maxY } = layout.bounds;
    const w = Math.max(1, maxX - minX);
    const h = Math.max(1, maxY - minY);
    scale = Math.min(1.25, Math.max(0.3, Math.min((width - 48) / w, (boxHeight - 48) / h)));
    panX = width / 2 - ((minX + maxX) / 2) * scale;
    panY = boxHeight / 2 - ((minY + maxY) / 2) * scale;
  }

  function zoom(factor) {
    const next = Math.min(2.5, Math.max(0.25, scale * factor));
    // Zoom around the centre of the view so the picture does not jump.
    const cx = width / 2;
    const cy = boxHeight / 2;
    panX = cx - ((cx - panX) / scale) * next;
    panY = cy - ((cy - panY) / scale) * next;
    scale = next;
  }

  function onWheel(event) {
    if (!(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    zoom(event.deltaY < 0 ? 1.1 : 1 / 1.1);
  }

  function onPointerDown(event) {
    if (event.button !== 0 || event.target.closest('[role="treeitem"]')) return;
    dragging = { x: event.clientX, y: event.clientY, panX, panY };
    box.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging) return;
    panX = dragging.panX + event.clientX - dragging.x;
    panY = dragging.panY + event.clientY - dragging.y;
  }

  function onPointerUp() {
    dragging = null;
  }

  function select(node) {
    focusId = node.id;
    value = node.id;
    dispatch('select', node.id);
  }

  function toggle(node) {
    if (!node.hasChildren) return;
    const next = node.collapsed ? collapsed.filter((id) => id !== node.id) : [...collapsed, node.id];
    collapsed = next;
    dispatch('toggle', { id: node.id, collapsed: !node.collapsed });
  }

  async function onKeydown(event, node) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(node);
      toggle(node);
      return;
    }
    let target = null;
    if (event.key === 'Home') target = nodes[0]?.id;
    else if (event.key.startsWith('Arrow')) {
      if (event.key === 'ArrowRight' && node.hasChildren && node.collapsed && node.side >= 0) {
        event.preventDefault();
        toggle(node);
        return;
      }
      if (event.key === 'ArrowLeft' && node.hasChildren && node.collapsed && node.side < 0) {
        event.preventDefault();
        toggle(node);
        return;
      }
      target = neighbour(nodes, node.id, event.key);
    } else return;
    event.preventDefault();
    if (!target) return;
    focusId = target;
    await tick();
    box?.querySelector(`[data-node="${CSS.escape(target)}"]`)?.focus();
  }
</script>

<div
  bind:this={box}
  bind:clientWidth={width}
  bind:clientHeight={boxHeight}
  class="relative overflow-hidden rounded-ui border border-line bg-canvas text-ink {dragging
    ? 'cursor-grabbing'
    : 'cursor-grab'} {className}"
  style="height: {height}; touch-action: none;"
  role="presentation"
  on:wheel={onWheel}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerUp}
>
  <svg class="h-full w-full" role="tree" aria-label={label}>
    <g transform="translate({panX} {panY}) scale({scale})">
      {#each layout.links as link (link.to)}
        <path d={link.d} fill="none" class="stroke-line-strong" stroke-width="1.4" />
      {/each}
      {#each nodes as node (node.id)}
        <g
          role="treeitem"
          tabindex={focusId === node.id ? 0 : -1}
          data-node={node.id}
          aria-selected={value === node.id}
          aria-expanded={node.hasChildren ? !node.collapsed : undefined}
          aria-level={node.depth + 1}
          class="cursor-pointer outline-none [&:focus-visible>rect]:stroke-ink"
          transform="translate({node.x} {node.y - node.h / 2})"
          on:click={() => select(node)}
          on:dblclick={() => toggle(node)}
          on:keydown={(event) => onKeydown(event, node)}
        >
          <rect
            width={node.w}
            height={node.h}
            rx="6"
            stroke-width={value === node.id ? 1.8 : 1}
            class="{node.depth === 0 ? 'fill-surface' : 'fill-canvas'} {value === node.id
              ? 'stroke-ink'
              : 'stroke-line-strong'}"
          />
          <text
            x={node.w / 2}
            y={node.h / 2}
            text-anchor="middle"
            dominant-baseline="central"
            class="select-none fill-ink text-xs {node.depth === 0 ? 'font-bold' : ''}">{node.label}</text
          >
          {#if node.hasChildren && node.depth > 0}
            <g
              transform="translate({node.side < 0 ? -6 : node.w + 6} {node.h / 2})"
              on:click|stopPropagation={() => toggle(node)}
              role="presentation"
            >
              <circle r="7" class="fill-canvas stroke-line-strong" stroke-width="1" />
              <path
                d={node.collapsed ? 'M -3 0 H 3 M 0 -3 V 3' : 'M -3 0 H 3'}
                class="stroke-ink-soft"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </g>
          {/if}
        </g>
      {/each}
    </g>
  </svg>

  <div class="absolute bottom-2 right-2 flex gap-1">
    <IconButton
      label={zoomOutLabel}
      variant="outline"
      size="sm"
      tooltipText=""
      class="bg-canvas"
      on:click={() => zoom(1 / 1.25)}
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </IconButton>
    <IconButton
      label={zoomInLabel}
      variant="outline"
      size="sm"
      tooltipText=""
      class="bg-canvas"
      on:click={() => zoom(1.25)}
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </IconButton>
    <IconButton label={fitLabel} variant="outline" size="sm" tooltipText="" class="bg-canvas" on:click={fit}>
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconButton>
  </div>
</div>
