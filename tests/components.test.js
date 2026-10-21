import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import Accordion from '../src/components/Accordion.svelte';
import AlertDialog from '../src/components/AlertDialog.svelte';
import Avatar from '../src/components/Avatar.svelte';
import Button from '../src/components/Button.svelte';
import Card from '../src/components/Card.svelte';
import Checkbox from '../src/components/Checkbox.svelte';
import Combobox from '../src/components/Combobox.svelte';
import DatePicker from '../src/components/DatePicker.svelte';
import Fieldset from '../src/components/Fieldset.svelte';
import FileUpload from '../src/components/FileUpload.svelte';
import FormField from '../src/components/FormField.svelte';
import Chip from '../src/components/Chip.svelte';
import Menu from '../src/components/Menu.svelte';
import Modal from '../src/components/Modal.svelte';
import Notice from '../src/components/Notice.svelte';
import Popover from '../src/components/Popover.svelte';
import Progress from '../src/components/Progress.svelte';
import RadioGroup from '../src/components/RadioGroup.svelte';
import SearchField from '../src/components/SearchField.svelte';
import Skeleton from '../src/components/Skeleton.svelte';
import SegmentedControl from '../src/components/SegmentedControl.svelte';
import Select from '../src/components/Select.svelte';
import SelectField from '../src/components/SelectField.svelte';
import Switch from '../src/components/Switch.svelte';
import Table from '../src/components/Table.svelte';
import Tabs from '../src/components/Tabs.svelte';
import Toaster from '../src/components/Toaster.svelte';
import { clearToasts, toast } from '../src/toast.js';
import TextField from '../src/components/TextField.svelte';
import FieldHarness from './fixtures/FieldHarness.svelte';
import ModalHarness from './fixtures/ModalHarness.svelte';
import MultiSelect from '../src/components/MultiSelect.svelte';
import Slider from '../src/components/Slider.svelte';

afterEach(() => {
  cleanup();
  clearToasts();
  vi.useRealTimers();
});

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
    const field = render(SelectField, {
      label: 'Folder',
      value: 'work',
      options: [{ value: 'work', label: 'Work' }, { value: 'home', label: 'Home' }],
    });
    const changed = vi.fn();
    field.component.$on('change', changed);
    const select = screen.getByLabelText('Folder');
    await fireEvent.change(select, { target: { value: 'home' } });
    expect(select.value).toBe('home');
    expect(changed).toHaveBeenCalled();
  });
});

describe('Select', () => {
  test('opens a themed list, chooses and closes', async () => {
    const { component } = render(Select, {
      label: 'Theme',
      value: 'gruvbox',
      options: [{ value: 'gruvbox', label: 'Gruvbox' }, { value: 'nord', label: 'Nord' }],
    });
    const changed = vi.fn();
    component.$on('change', changed);
    await fireEvent.click(screen.getByRole('button', { name: 'Theme' }));
    expect(screen.getByRole('listbox')).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Gruvbox' }).getAttribute('aria-selected')).toBe('true');
    await fireEvent.click(screen.getByRole('option', { name: 'Nord' }));
    expect(screen.getByRole('button', { name: 'Theme' }).textContent).toContain('Nord');
    expect(changed).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.objectContaining({ value: 'nord' }) }));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  test('arrow keys move and Escape closes', async () => {
    render(Select, { label: 'Theme', value: 'gruvbox', options: [{ value: 'gruvbox', label: 'Gruvbox' }, { value: 'nord', label: 'Nord' }] });
    await fireEvent.click(screen.getByRole('button', { name: 'Theme' }));
    const [first, second] = screen.getAllByRole('option');
    expect(document.activeElement).toBe(first);
    await fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(second);
    await fireEvent.keyDown(second, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
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
    const checkbox = render(Checkbox);
    const changed = vi.fn();
    checkbox.component.$on('change', changed);
    const box = screen.getByRole('checkbox');
    await fireEvent.click(box);
    await tick();
    expect(box.checked).toBe(true);
    expect(changed).toHaveBeenCalled();

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
  test('Card is a button only when interactive', async () => {
    const card = render(Card, { interactive: true });
    const clicked = vi.fn();
    card.component.$on('click', clicked);
    expect(screen.getByRole('button')).toBeTruthy();
    await fireEvent.click(screen.getByRole('button'));
    expect(clicked).toHaveBeenCalled();
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

describe('Progress and Skeleton', () => {
  test('Progress reports its value and hides it when indeterminate', () => {
    render(Progress, { value: 25, label: 'Upload' });
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar.getAttribute('aria-valuenow')).toBe('25');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');

    cleanup();
    render(Progress, { indeterminate: true, label: 'Loading' });
    expect(screen.getByRole('progressbar', { name: 'Loading' }).getAttribute('aria-valuenow')).toBeNull();
  });

  test('Skeleton keeps its size and stays out of the accessibility tree', () => {
    const { container } = render(Skeleton, { width: '12rem', height: '2rem' });
    const block = container.querySelector('span');
    expect(block.getAttribute('aria-hidden')).toBe('true');
    expect(block.getAttribute('style')).toContain('width: 12rem');
    expect(block.getAttribute('style')).toContain('height: 2rem');
  });
});

describe('RadioGroup', () => {
  test('chooses one option and reports the change', async () => {
    const { component } = render(RadioGroup, {
      label: 'View',
      value: 'board',
      options: [{ value: 'board', label: 'Board' }, { value: 'list', label: 'List' }],
    });
    const changed = vi.fn();
    component.$on('change', changed);
    expect(screen.getByRole('radiogroup', { name: 'View' })).toBeTruthy();
    await fireEvent.click(screen.getByRole('radio', { name: 'List' }));
    expect(screen.getByRole('radio', { name: 'List' }).checked).toBe(true);
    expect(changed).toHaveBeenCalled();
  });
});

describe('Tabs', () => {
  const items = [{ id: 'write', label: 'Write' }, { id: 'read', label: 'Read' }, { id: 'history', label: 'History' }];

  test('selects a tab and moves with the arrow keys', async () => {
    const { component } = render(Tabs, { items, value: 'write', label: 'Note view' });
    const changed = vi.fn();
    component.$on('change', changed);
    expect(screen.getByRole('tablist', { name: 'Note view' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Write' }).getAttribute('aria-selected')).toBe('true');

    await fireEvent.keyDown(screen.getByRole('tab', { name: 'Write' }), { key: 'ArrowRight' });
    await tick();
    expect(screen.getByRole('tab', { name: 'Read' }).getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Read' }));
    expect(changed).toHaveBeenCalled();
  });
});

describe('Accordion', () => {
  const items = [
    { id: 'one', title: 'One', content: 'First body' },
    { id: 'two', title: 'Two', content: 'Second body' },
  ];

  test('opens one panel and closes it again', async () => {
    const { component } = render(Accordion, { items, open: ['one'] });
    const changed = vi.fn();
    component.$on('change', changed);
    const one = screen.getByRole('button', { name: 'One' });
    expect(one.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('First body').hidden).toBe(false);

    await fireEvent.click(one);
    const oneAfter = screen.getByRole('button', { name: 'One' });
    expect(oneAfter.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('First body').hidden).toBe(true);
    expect(changed).toHaveBeenCalledWith(expect.objectContaining({ detail: [] }));
  });
});

describe('Popover', () => {
  test('opens a dialog and closes on Escape', async () => {
    render(Popover, { label: 'Filters' });
    await fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeTruthy();
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('Toast', () => {
  test('shows a message, dismisses it on the button and clears the store', async () => {
    vi.useFakeTimers();
    render(Toaster);
    toast({ title: 'Saved', description: 'The file is on disk.' });
    await tick();
    expect(screen.getByText('Saved')).toBeTruthy();
    await fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Saved')).toBeNull();
    clearToasts();
    vi.useRealTimers();
  });

  test('dismisses itself after its duration', async () => {
    vi.useFakeTimers();
    render(Toaster);
    toast({ title: 'Brief', duration: 1000 });
    await tick();
    expect(screen.getByText('Brief')).toBeTruthy();
    vi.advanceTimersByTime(1000);
    await tick();
    expect(screen.queryByText('Brief')).toBeNull();
  });
});

describe('AlertDialog', () => {
  test('is an alert dialog and closes on confirm', async () => {
    const { component } = render(AlertDialog, { open: true, title: 'Delete this note?', confirmLabel: 'Delete' });
    await tick();
    expect(screen.getByRole('alertdialog', { name: 'Delete this note?' })).toBeTruthy();
    const confirmed = vi.fn();
    component.$on('confirm', confirmed);
    await fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(confirmed).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });
});

describe('Avatar', () => {
  test('shows initials and a status dot', () => {
    render(Avatar, { name: 'Ada Lovelace', status: 'online' });
    const mark = screen.getByRole('img', { name: 'Ada Lovelace' });
    expect(mark.textContent).toBe('AL');
  });
});

describe('Table', () => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'kind', label: 'Kind' },
    { key: 'size', label: 'Size', align: 'right', sortable: true },
  ];
  const rows = [
    { id: 'board', name: 'Board', kind: 'View', size: 12 },
    { id: 'today', name: 'Today', kind: 'View', size: 4 },
    { id: 'archive', name: 'Archive', kind: 'Folder', size: 128 },
  ];

  test('sorts by a header and emits the sort', async () => {
    const { component } = render(Table, { columns, rows, caption: 'Files' });
    const sorted = vi.fn();
    component.$on('sort', sorted);
    await fireEvent.click(screen.getByRole('button', { name: 'Size' }));
    expect(sorted).toHaveBeenCalledWith(expect.objectContaining({ detail: { key: 'size', direction: 'asc' } }));
    expect(screen.getByRole('columnheader', { name: /Size/ }).getAttribute('aria-sort')).toBe('ascending');
    expect(screen.getAllByRole('row')[1].textContent).toContain('Today');
  });

  test('selects every row from the header', async () => {
    const { component } = render(Table, { columns, rows, selectable: true });
    const selected = vi.fn();
    component.$on('select', selected);
    await fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(selected).toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'Select all rows' }).checked).toBe(true);
    expect(screen.getByRole('checkbox', { name: 'Select row 2' }).checked).toBe(true);
  });
});

describe('Fieldset and FormField', () => {
  test('Fieldset names the group', () => {
    render(Fieldset, { legend: 'Advanced', hint: 'Rarely changed' });
    expect(screen.getByRole('group', { name: 'Advanced' })).toBeTruthy();
    expect(screen.getByText('Rarely changed')).toBeTruthy();
  });

  test('FormField labels a control and shows its error', () => {
    render(FormField, { label: 'View', forId: 'view-control', error: 'Choose one' });
    expect(screen.getByText('View').getAttribute('for')).toBe('view-control');
    expect(screen.getByRole('alert').textContent).toContain('Choose one');
  });
});

describe('Slider', () => {
  test('reports its value and change', async () => {
    const { component } = render(Slider, { label: 'Zoom', value: 30 });
    const changed = vi.fn();
    component.$on('change', changed);
    const slider = screen.getByRole('slider', { name: 'Zoom' });
    expect(slider.value).toBe('30');
    await fireEvent.change(slider, { target: { value: '70' } });
    expect(changed).toHaveBeenCalled();
    expect(slider.value).toBe('70');
  });
});

describe('Combobox', () => {
  const options = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
  ];

  test('filters the list and chooses with the keyboard', async () => {
    const { component } = render(Combobox, { label: 'Folder', options });
    const changed = vi.fn();
    component.$on('change', changed);
    const input = screen.getByRole('combobox', { name: 'Folder' });
    await fireEvent.focus(input);
    await tick();
    expect(screen.getByRole('listbox')).toBeTruthy();
    await fireEvent.input(input, { target: { value: 'hom' } });
    await tick();
    expect(screen.getAllByRole('option')).toHaveLength(1);
    await fireEvent.keyDown(input, { key: 'Enter' });
    expect(changed).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.objectContaining({ value: 'home' }) }));
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});

describe('MultiSelect', () => {
  const options = [
    { value: 'design', label: 'Design' },
    { value: 'code', label: 'Code' },
  ];

  test('toggles options and removes a chip', async () => {
    const { component } = render(MultiSelect, { label: 'Tags', options, values: ['design'] });
    const changed = vi.fn();
    component.$on('change', changed);
    const input = screen.getByRole('combobox', { name: 'Tags' });
    await fireEvent.focus(input);
    await tick();
    await fireEvent.pointerDown(screen.getByRole('option', { name: 'Code' }));
    await tick();
    expect(changed).toHaveBeenCalled();
    expect(screen.getByRole('combobox', { name: 'Tags' })).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: 'Remove Design' }));
    await tick();
    expect(screen.queryByRole('button', { name: 'Remove Design' })).toBeNull();
  });
});

describe('DatePicker', () => {
  test('opens a calendar and chooses a day', async () => {
    const { component, container } = render(DatePicker, { label: 'Due date', value: '2024-03-15', locale: 'en-US' });
    const changed = vi.fn();
    component.$on('change', changed);
    await fireEvent.click(screen.getByRole('button', { name: 'Due date' }));
    await tick();
    expect(screen.getByRole('dialog', { name: 'Due date' })).toBeTruthy();
    const day15 = container.querySelector('[data-date="2024-03-15"]');
    await fireEvent.keyDown(day15, { key: 'ArrowRight' });
    await tick();
    expect(document.activeElement.getAttribute('data-date')).toBe('2024-03-16');
    const day = container.querySelector('[data-date="2024-03-20"]');
    expect(day).toBeTruthy();
    await fireEvent.click(day);
    expect(changed).toHaveBeenCalledWith(expect.objectContaining({ detail: '2024-03-20' }));
  });
});

describe('FileUpload', () => {
  test('adds and removes a picked file', async () => {
    const { component, container } = render(FileUpload, { label: 'Attachments' });
    const changed = vi.fn();
    component.$on('change', changed);
    const input = container.querySelector('input[type="file"]');
    const file = new File(['hello'], 'note.md', { type: 'text/markdown' });
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    await fireEvent.change(input);
    await tick();
    expect(screen.getByText('note.md')).toBeTruthy();
    expect(changed).toHaveBeenCalled();
    await fireEvent.click(screen.getByRole('button', { name: 'Remove note.md' }));
    expect(screen.queryByText('note.md')).toBeNull();
  });
});
