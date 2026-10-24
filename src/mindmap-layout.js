/**
 * The pure layout of a mind map: a tree in, positioned boxes and curved links
 * out. `MindMap.svelte` draws what this returns; nothing here touches the DOM,
 * so the geometry can be tested.
 */

const CHAR = 7.4; // width of one character of the 12px monospace face
const PADDING = 28;

/** Estimated width of a label box. The kit face is monospace, so a count is exact enough. */
export function measureLabel(label) {
  return Math.max(56, String(label ?? '').length * CHAR + PADDING);
}

/**
 * @param {{ id: string, label: string, children?: object[] }} root
 * @param {object} [options]
 * @param {Iterable<string>} [options.collapsed] ids whose children are hidden
 * @param {'right' | 'both'} [options.direction] `both` splits the root's children onto two sides
 * @returns {{ nodes: object[], links: object[], bounds: { minX: number, minY: number, maxX: number, maxY: number } }}
 */
export function layoutMindMap(root, options = {}) {
  const {
    collapsed = [],
    direction = 'right',
    rowGap = 40,
    colGap = 56,
    nodeHeight = 32,
    measure = measureLabel,
  } = options;
  const hidden = new Set(collapsed);
  if (!root) return { nodes: [], links: [], bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0 } };

  const visibleChildren = (node) => (hidden.has(node.id) ? [] : node.children || []);
  const rootWidth = measure(root.label);
  const rootChildren = visibleChildren(root);
  const sides =
    direction === 'both' && rootChildren.length > 1
      ? [
          { sign: 1, items: rootChildren.filter((_, at) => at % 2 === 0) },
          { sign: -1, items: rootChildren.filter((_, at) => at % 2 === 1) },
        ]
      : [{ sign: 1, items: rootChildren }];

  const nodes = [
    {
      id: root.id,
      label: root.label,
      parentId: null,
      depth: 0,
      side: 0,
      x: -rootWidth / 2,
      y: 0,
      w: rootWidth,
      h: nodeHeight,
      hasChildren: Boolean((root.children || []).length),
      collapsed: hidden.has(root.id),
    },
  ];
  const links = [];
  const byId = new Map([[root.id, nodes[0]]]);

  for (const side of sides) {
    if (!side.items.length) continue;
    // Rows first: a leaf takes the next row, a parent sits at the middle of its children.
    let cursor = 0;
    const rows = new Map();
    const widths = [];
    const assign = (node, depth) => {
      widths[depth] = Math.max(widths[depth] || 0, measure(node.label));
      const kids = visibleChildren(node);
      if (!kids.length) {
        rows.set(node.id, cursor);
        cursor += 1;
        return;
      }
      kids.forEach((kid) => assign(kid, depth + 1));
      rows.set(node.id, (rows.get(kids[0].id) + rows.get(kids[kids.length - 1].id)) / 2);
    };
    side.items.forEach((item) => assign(item, 1));
    const first = rows.get(side.items[0].id);
    const last = rows.get(side.items[side.items.length - 1].id);
    const shift = (first + last) / 2;

    const columns = [];
    let edge = rootWidth / 2 + colGap;
    for (let depth = 1; depth < widths.length; depth += 1) {
      columns[depth] = edge;
      edge += widths[depth] + colGap;
    }

    const place = (node, depth, parent) => {
      const w = measure(node.label);
      const record = {
        id: node.id,
        label: node.label,
        parentId: parent.id,
        depth,
        side: side.sign,
        x: side.sign === 1 ? columns[depth] : -columns[depth] - w,
        y: (rows.get(node.id) - shift) * rowGap,
        w,
        h: nodeHeight,
        hasChildren: Boolean((node.children || []).length),
        collapsed: hidden.has(node.id),
      };
      nodes.push(record);
      byId.set(record.id, record);
      const fromX = side.sign === 1 ? parent.x + parent.w : parent.x;
      const toX = side.sign === 1 ? record.x : record.x + record.w;
      const mid = (fromX + toX) / 2;
      links.push({
        from: parent.id,
        to: record.id,
        d: `M ${fromX} ${parent.y} C ${mid} ${parent.y}, ${mid} ${record.y}, ${toX} ${record.y}`,
      });
      visibleChildren(node).forEach((kid) => place(kid, depth + 1, record));
    };
    side.items.forEach((item) => place(item, 1, byId.get(root.id)));
  }

  const bounds = nodes.reduce(
    (box, node) => ({
      minX: Math.min(box.minX, node.x),
      minY: Math.min(box.minY, node.y - node.h / 2),
      maxX: Math.max(box.maxX, node.x + node.w),
      maxY: Math.max(box.maxY, node.y + node.h / 2),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  );
  return { nodes, links, bounds };
}

/**
 * The node a key press should move to, or null. Arrows follow the picture:
 * right goes toward the children on the right side (and back toward the root on
 * the left), up and down walk the siblings.
 */
export function neighbour(nodes, id, key) {
  const here = nodes.find((node) => node.id === id);
  if (!here) return null;
  const siblings = nodes.filter((node) => node.parentId === here.parentId && node.side === here.side);
  const children = nodes.filter((node) => node.parentId === here.id);
  const parent = nodes.find((node) => node.id === here.parentId) || null;
  const inward = here.side === 0 ? 0 : here.side;
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const at = siblings.findIndex((node) => node.id === id);
    const next = siblings[at + (key === 'ArrowDown' ? 1 : -1)];
    return next ? next.id : null;
  }
  if (key === 'ArrowRight' || key === 'ArrowLeft') {
    const toward = key === 'ArrowRight' ? 1 : -1;
    if (here.side === 0) {
      const kid = children.find((node) => node.side === toward);
      return kid ? kid.id : null;
    }
    if (toward === inward) return children.length ? children[0].id : null;
    return parent ? parent.id : null;
  }
  return null;
}
