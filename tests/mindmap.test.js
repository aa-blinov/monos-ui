import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import MindMap from '../src/components/MindMap.svelte';
import { layoutMindMap, neighbour } from '../src/mindmap-layout.js';

afterEach(cleanup);

const tree = {
  id: 'root',
  label: 'Monos',
  children: [
    {
      id: 'a',
      label: 'Notes',
      children: [
        { id: 'a1', label: 'Markdown' },
        { id: 'a2', label: 'Links' },
      ],
    },
    { id: 'b', label: 'Sync' },
    { id: 'c', label: 'Terminal' },
  ],
};

describe('layoutMindMap', () => {
  test('puts every visible node on a column by depth, children right of the parent', () => {
    const { nodes, links } = layoutMindMap(tree);
    expect(nodes.map((n) => n.id).sort()).toEqual(['a', 'a1', 'a2', 'b', 'c', 'root']);
    expect(links).toHaveLength(5);
    const at = (id) => nodes.find((n) => n.id === id);
    expect(at('a').x).toBeGreaterThan(at('root').x + at('root').w);
    expect(at('a1').x).toBeGreaterThan(at('a').x + at('a').w);
    expect(at('a1').x).toBe(at('a2').x);
  });

  test('a parent sits at the middle of its children and the root at zero', () => {
    const { nodes } = layoutMindMap(tree);
    const at = (id) => nodes.find((n) => n.id === id);
    expect(at('a').y).toBe((at('a1').y + at('a2').y) / 2);
    expect(at('root').y).toBe(0);
    const top = at('a').y;
    const bottom = at('c').y;
    expect(top + bottom).toBeCloseTo(0);
  });

  test('a collapsed branch hides its children but keeps the node', () => {
    const { nodes } = layoutMindMap(tree, { collapsed: ['a'] });
    expect(nodes.some((n) => n.id === 'a1')).toBe(false);
    const a = nodes.find((n) => n.id === 'a');
    expect(a.collapsed).toBe(true);
    expect(a.hasChildren).toBe(true);
  });

  test('both splits the root children onto two sides', () => {
    const { nodes } = layoutMindMap(tree, { direction: 'both' });
    const sides = Object.fromEntries(nodes.filter((n) => n.depth === 1).map((n) => [n.id, n.side]));
    expect(sides).toEqual({ a: 1, b: -1, c: 1 });
    const b = nodes.find((n) => n.id === 'b');
    expect(b.x + b.w).toBeLessThan(0);
  });

  test('an empty tree is an empty layout', () => {
    expect(layoutMindMap(null).nodes).toEqual([]);
  });
});

describe('neighbour', () => {
  test('arrows walk siblings, children and the parent', () => {
    const { nodes } = layoutMindMap(tree);
    expect(neighbour(nodes, 'root', 'ArrowRight')).toBe('a');
    expect(neighbour(nodes, 'a', 'ArrowDown')).toBe('b');
    expect(neighbour(nodes, 'b', 'ArrowUp')).toBe('a');
    expect(neighbour(nodes, 'a', 'ArrowRight')).toBe('a1');
    expect(neighbour(nodes, 'a1', 'ArrowLeft')).toBe('a');
    expect(neighbour(nodes, 'a', 'ArrowUp')).toBeNull();
  });
});

describe('MindMap', () => {
  test('is a labelled tree of items with levels and fold state', () => {
    render(MindMap, { root: tree, label: 'Product map' });
    expect(screen.getByRole('tree', { name: 'Product map' })).toBeTruthy();
    const items = screen.getAllByRole('treeitem');
    expect(items).toHaveLength(6);
    const notes = items.find((el) => el.textContent.includes('Notes'));
    expect(notes.getAttribute('aria-expanded')).toBe('true');
    expect(notes.getAttribute('aria-level')).toBe('2');
  });

  test('a click selects, and Enter folds the branch', async () => {
    const { component } = render(MindMap, { root: tree });
    const select = vi.fn();
    const toggle = vi.fn();
    component.$on('select', select);
    component.$on('toggle', toggle);
    const notes = screen.getAllByRole('treeitem').find((el) => el.textContent.includes('Notes'));
    await fireEvent.click(notes);
    expect(select.mock.calls[0][0].detail).toBe('a');
    expect(notes.getAttribute('aria-selected')).toBe('true');
    await fireEvent.keyDown(notes, { key: 'Enter' });
    expect(toggle.mock.calls[0][0].detail).toEqual({ id: 'a', collapsed: true });
    expect(screen.getAllByRole('treeitem')).toHaveLength(4);
  });

  test('has zoom and fit buttons with names from props', () => {
    render(MindMap, { root: tree, zoomInLabel: 'Bigger', zoomOutLabel: 'Smaller', fitLabel: 'Centre' });
    for (const name of ['Bigger', 'Smaller', 'Centre']) expect(screen.getByRole('button', { name })).toBeTruthy();
  });
});
