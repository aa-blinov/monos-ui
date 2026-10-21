import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import Button from '../src/components/Button.svelte';
import Card from '../src/components/Card.svelte';
import Checkbox from '../src/components/Checkbox.svelte';
import Chip from '../src/components/Chip.svelte';
import Menu from '../src/components/Menu.svelte';
import Modal from '../src/components/Modal.svelte';
import Notice from '../src/components/Notice.svelte';
import SearchField from '../src/components/SearchField.svelte';
import SegmentedControl from '../src/components/SegmentedControl.svelte';
import SelectField from '../src/components/SelectField.svelte';
import Switch from '../src/components/Switch.svelte';
import TextField from '../src/components/TextField.svelte';
import FieldHarness from './fixtures/FieldHarness.svelte';
import ModalHarness from './fixtures/ModalHarness.svelte';

afterEach(cleanup);

describe('Button', () => {
  test('forwards a click and can be disabled or busy', async () => {
    const { component } = render(Button);
    const click = vi.fn();
    component.$on('click', click);
    await fireEvent.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledTimes(1);

    cleanup();
    render(Button, { disabled: true });
    expect(screen.getByRole('button').disabled).toBe(true);

    cleanup();
    render(Button, { loading: true });
    const busy = screen.getByRole('button');
    expect(busy.getAttribute('aria-busy')).toBe('true');
    expect(busy.disabled).toBe(true);
  });
});

describe('TextField', () => {
  test('names the input and reports its value', async () => {
    const { component } = render(TextField, { label: 'Title', hint: 'The card name' });
    const input = screen.getByLabelText('Title');
    const events = vi.fn();
    component.$on('input', events);
    await fireEvent.input(input, { target: { value: 'A note' } });
    expect(input.value).toBe('A note');
    expect(events).toHaveBeenCalled();
    expect(input.getAttribute('aria-describedby')).toContain('hint');
  });

  test('a parent binds to the value', async () => {
    render(FieldHarness);
    const input = screen.getByLabelText('Title');
    await fireEvent.input(input, { target: { value: 'A note' } });
    expect(screen.getByTestId('echo').textContent).toBe('A note');
  });

  test('shows an error and marks the field invalid', () => {
    render(TextField, { label: 'Email', error: 'Use a real address' });
    expect(screen.getByText('Use a real address')).toBeTruthy();
    expect(screen.getByLabelText('Email').getAttribute('aria-invalid')).toBe('true');
  });
});

describe('SelectField', () => {
  test('renders options and changes its value', async () => {
    render(SelectField, {
      label: 'Folder',
      value: 'work',
      options: [{ value: 'work', label: 'Work' }, { value: 'home', label: 'Home' }],
    });
    const select = screen.getByLabelText('Folder');
    await fireEvent.change(select, { target: { value: 'home' } });
    expect(select.value).toBe('home');
  });
});

describe('search and choices', () => {
  test('SearchField clears its value', async () => {
    const { component } = render(SearchField, { value: 'paper', label: 'Search notes' });
    const cleared = vi.fn();
    component.$on('clear', cleared);
    await fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByLabelText('Search notes').value).toBe('');
    expect(cleared).toHaveBeenCalledTimes(1);
  });

  test('Checkbox toggles and Switch reports its state', async () => {
    render(Checkbox);
    const box = screen.getByRole('checkbox');
    await fireEvent.click(box);
    await tick();
    expect(box.checked).toBe(true);

    cleanup();
    render(Switch);
    const control = screen.getByRole('switch');
    expect(control.getAttribute('aria-checked')).toBe('false');
    await fireEvent.click(control);
    await tick();
    expect(control.getAttribute('aria-checked')).toBe('true');
  });

  test('SegmentedControl presses one option', async () => {
    const { component } = render(SegmentedControl, {
      label: 'Mode',
      value: 'light',
      options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }],
    });
    const changed = vi.fn();
    component.$on('change', changed);
    await fireEvent.click(screen.getByRole('button', { name: 'Dark' }));
    expect(screen.getByRole('button', { name: 'Dark' }).getAttribute('aria-pressed')).toBe('true');
    expect(changed).toHaveBeenCalled();
  });
});

describe('Menu', () => {
  const items = [
    { value: 'map', label: 'Map' },
    { value: 'favorites', label: 'Favorites' },
    { separator: true },
    { value: 'delete', label: 'Delete', danger: true },
  ];

  test('opens, selects an item and closes', async () => {
    const { component } = render(Menu, { items, label: 'Actions' });
    const selected = vi.fn();
    component.$on('select', selected);

    await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent.trim())).toEqual(['Map', 'Favorites', 'Delete']);

    await fireEvent.click(screen.getByRole('menuitem', { name: 'Map' }));
    expect(selected).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.objectContaining({ value: 'map' }) }));
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('moves with the arrow keys and Escape closes it', async () => {
    render(Menu, { items, label: 'Actions' });
    await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    const [first, second] = screen.getAllByRole('menuitem');
    expect(document.activeElement).toBe(first);
    await fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(second);
    await fireEvent.keyDown(second, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
  });
});

describe('Modal', () => {
  test('names itself, takes focus, closes on Escape and returns focus', async () => {
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();

    const { component } = render(Modal, { open: true, title: 'Delete this note?', description: 'No undo' });
    const closed = vi.fn();
    component.$on('close', closed);
    await tick();

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
    expect(document.activeElement).toBe(dialog);

    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(closed).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });
});

describe('binding', () => {
  test('a parent binds to Modal open', async () => {
    render(ModalHarness);
    await fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByTestId('state').textContent).toBe('open');
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByTestId('state').textContent).toBe('closed');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('surfaces and marks', () => {
  test('Card is a button only when interactive', () => {
    render(Card, { interactive: true });
    expect(screen.getByRole('button')).toBeTruthy();
    cleanup();
    render(Card);
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('Chip can be removed and Notice dismissed', async () => {
    const chip = render(Chip, { removable: true });
    const removed = vi.fn();
    chip.component.$on('remove', removed);
    await fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(removed).toHaveBeenCalledTimes(1);

    cleanup();
    const notice = render(Notice, { title: 'Heads up', dismissible: true });
    const dismissed = vi.fn();
    notice.component.$on('dismiss', dismissed);
    await fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(dismissed).toHaveBeenCalledTimes(1);
  });
});
