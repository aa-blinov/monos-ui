<script>
  import {
    Map,
    Star,
    Trash2,
    Plus,
    Settings,
    Heart,
    LayoutGrid,
    Paperclip,
    MoreHorizontal,
  } from 'lucide-svelte';
  import {
    Badge,
    Button,
    Card,
    Checkbox,
    Chip,
    EmptyState,
    IconButton,
    Kbd,
    Menu,
    Modal,
    Notice,
    SearchField,
    SegmentedControl,
    SelectField,
    Spinner,
    Switch,
    TextArea,
    TextField,
    Tooltip,
    themes,
    themeNames,
  } from '../src/index.js';

  let theme = 'gruvbox';
  let mode = 'light';
  let title = 'A note about the desk';
  let body = 'The palette is warm, the radius is one, and nothing glows without a reason.';
  let folder = 'work';
  let search = '';
  let checked = true;
  let switchOn = true;
  let segment = 'grid';
  let modalOpen = false;
  let noticeVisible = true;
  let picked = '';

  const menuItems = [
    { value: 'map', label: 'Map', icon: Map },
    { value: 'favorites', label: 'Favorites', icon: Star },
    { value: 'settings', label: 'Settings', icon: Settings },
    { separator: true },
    { value: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];

  $: palette = themes[theme][mode];
  $: applyTheme(theme, mode);

  function applyTheme(nextTheme, nextMode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    root.dataset.mode = nextMode;
  }
</script>

<div class="mx-auto max-w-5xl px-6 pb-24 pt-10">
  <header class="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">The desk, as a kit</h1>
      <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
        Warm paper, one radius, text buttons and a quiet focus ring. Pick a palette and a mode;
        everything below is drawn from the same tokens.
      </p>
    </div>
    <div class="flex flex-wrap items-end gap-3">
      <div class="w-40">
        <SelectField label="Theme" bind:value={theme} options={themeNames.map((id) => ({ value: id, label: themes[id].name }))} size="sm" />
      </div>
      <SegmentedControl label="Mode" bind:value={mode} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} size="sm" />
    </div>
  </header>

  <section class="mt-10">
    <h2 class="text-lg font-bold tracking-tight">Palette</h2>
    <p class="mt-1 text-xs text-ink-soft">Semantic roles, not colour names. The same roles exist in every theme.</p>
    <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {#each Object.entries(palette) as [name, value]}
        <div class="rounded-ui border border-line bg-surface p-2">
          <div class="h-10 rounded-ui border border-line" style="background: {value}"></div>
          <p class="mt-2 truncate text-whisper uppercase tracking-widest text-ink-soft">{name}</p>
          <p class="text-whisper text-ink-faint">{value}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Type</h2>
    <div class="mt-4 space-y-2">
      <p class="text-3xl font-bold tracking-tight">Display 30</p>
      <p class="text-2xl font-bold tracking-tight">Headline 24</p>
      <p class="text-xl font-bold tracking-tight">Title 20</p>
      <p class="text-sm leading-relaxed text-ink-soft">Body 14. A calm sentence in the interface face, with enough room to breathe.</p>
      <p class="text-whisper uppercase tracking-[0.16em] text-ink-faint">Metadata whisper 11</p>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Buttons</h2>
    <p class="mt-1 text-xs text-ink-soft">Text is the button. The only filled thing is a toggle's chosen state.</p>
    <div class="mt-4 flex flex-wrap items-center gap-3">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="text">Edit</Button>
      <Button variant="quiet">More options</Button>
      <Button variant="danger">Delete</Button>
      <Button loading>Working</Button>
      <Button disabled>Disabled</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
    <div class="mt-4 flex flex-wrap items-center gap-3">
      <IconButton label="Add" tooltipText="New note">
        <Plus class="h-4 w-4" strokeWidth="1.7" />
      </IconButton>
      <IconButton label="Favorites" variant="ghost">
        <Star class="h-4 w-4" strokeWidth="1.7" />
      </IconButton>
      <IconButton label="Delete" variant="ghost">
        <Trash2 class="h-4 w-4" strokeWidth="1.7" />
      </IconButton>
      <IconButton label="Drag" size="sm" variant="ghost">
        <MoreHorizontal class="h-3.5 w-3.5" strokeWidth="1.7" />
      </IconButton>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Fields</h2>
    <div class="mt-4 grid gap-6 md:grid-cols-2">
      <TextField label="Title" bind:value={title} hint="The name on the card and in the file" />
      <SelectField label="Folder" bind:value={folder} options={[{ value: 'work', label: 'Work' }, { value: 'home', label: 'Home' }, { value: 'inbox', label: 'Inbox' }]} />
      <TextField label="With an error" value="not an email" error="Use the form name@example.com" />
      <TextField label="Boxed" variant="boxed" placeholder="Boxed input" />
    </div>
    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <TextArea label="Note" bind:value={body} rows={4} hint="Markdown is fine" />
      <div class="space-y-4">
        <SearchField bind:value={search} label="Search notes" placeholder="Search" />
        <div class="flex flex-wrap items-center gap-6">
          <Checkbox bind:checked={checked}>Remember this</Checkbox>
          <Checkbox checked disabled>Locked</Checkbox>
          <Switch bind:checked={switchOn}>Sync automatically</Switch>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Chips and badges</h2>
    <div class="mt-4 flex flex-wrap items-center gap-3">
      <Chip>#design</Chip>
      <Chip>#paper</Chip>
      <Chip tone="accent">#accent</Chip>
      <Chip removable>#remove me</Chip>
      <Badge>Draft</Badge>
      <Badge tone="accent" dot>Agent</Badge>
      <Badge tone="danger">Conflict</Badge>
      <Badge tone="success">Synced</Badge>
      <Badge tone="warning">Pending</Badge>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Surfaces</h2>
    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <Card>
        <p class="text-sm font-bold">A quiet card</p>
        <p class="mt-1 text-xs leading-relaxed text-ink-soft">Flat at rest, one radius, a hairline border. The surface is a tonal step, not a shadow.</p>
      </Card>
      <Card interactive>
        <p class="text-sm font-bold">An interactive card</p>
        <p class="mt-1 text-xs leading-relaxed text-ink-soft">Hover lifts it by half a pixel and deepens the border. Under reduce motion it stays put.</p>
      </Card>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Menu and modal</h2>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <Menu items={menuItems} label="Actions" on:select={(event) => (picked = event.detail.label)}>
        <svelte:fragment slot="trigger" let:open let:toggle let:triggerProps>
          <Button variant="secondary" on:click={toggle} {...triggerProps}>
            <svelte:fragment slot="icon">
              <LayoutGrid class="h-4 w-4" strokeWidth="1.7" />
            </svelte:fragment>
            {open ? 'Close menu' : 'Open menu'}
          </Button>
        </svelte:fragment>
      </Menu>
      <Button variant="secondary" on:click={() => (modalOpen = true)}>Open a modal</Button>
      {#if picked}
        <span class="text-xs text-ink-faint">Picked: {picked}</span>
      {/if}
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-lg font-bold tracking-tight">Notices</h2>
    <div class="mt-4 space-y-3">
      {#if noticeVisible}
        <Notice title="Sync waits for review" dismissible on:dismiss={() => (noticeVisible = false)}>
          The agent changed two notes here. Keep or revert them before this device sends anything.
        </Notice>
      {/if}
      <Notice tone="danger" title="The connection failed">The token can read but not write. Check the repository permissions.</Notice>
      <Notice tone="success" title="Everything synced">The notes here and on GitHub are the same.</Notice>
    </div>
  </section>

  <section class="mt-12 grid gap-6 md:grid-cols-2">
    <div>
      <h2 class="text-lg font-bold tracking-tight">Empty state</h2>
      <Card padding="lg" class="mt-4">
        <EmptyState title="Nothing here yet" description="Write the first note, or bring the ones you already have.">
          <svelte:fragment slot="icon">
            <Paperclip class="h-8 w-8" strokeWidth="1.7" />
          </svelte:fragment>
          <svelte:fragment slot="actions">
            <Button size="sm">New note</Button>
            <Button size="sm" variant="secondary">Import</Button>
          </svelte:fragment>
        </EmptyState>
      </Card>
    </div>
    <div>
      <h2 class="text-lg font-bold tracking-tight">Keys and loading</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <span class="text-sm text-ink-soft">Open the palette with <Kbd>⌘</Kbd> <Kbd>K</Kbd></span>
        <Spinner size="lg" label="Loading" />
      </div>
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <IconButton label="Heart" variant="outline">
          <Heart class="h-4 w-4" strokeWidth="1.7" />
        </IconButton>
        <Tooltip text="This is a hint on any element">
          <span class="rounded-ui border border-dashed border-line px-3 py-2 text-xs text-ink-soft">Hover me</span>
        </Tooltip>
      </div>
    </div>
  </section>
</div>

<Modal bind:open={modalOpen} title="Delete this note?" description="This cannot be undone.">
  <p class="text-sm leading-relaxed text-ink-soft">
    The note and its pictures will leave this folder. The history in git keeps a copy until it is pruned.
  </p>
  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => (modalOpen = false)}>Cancel</Button>
    <Button variant="danger" on:click={() => (modalOpen = false)}>Delete</Button>
  </svelte:fragment>
</Modal>
