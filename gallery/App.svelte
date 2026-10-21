<script>
  import { onDestroy } from 'svelte';
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
    Accordion,
    AlertDialog,
    Avatar,
    Badge,
    Breadcrumbs,
    Button,
    Card,
    Checkbox,
    Combobox,
    Chip,
    Container,
    DatePicker,
    DescriptionList,
    Drawer,
    EmptyState,
    FocusTrap,
    Fieldset,
    FileUpload,
    FormField,
    Grid,
    IconButton,
    Kbd,
    List,
    Menu,
    Modal,
    MultiSelect,
    NavItem,
    Notice,
    PageHeader,
    Pagination,
    Portal,
    Prose,
    Popover,
    Progress,
    RadioGroup,
    SearchField,
    Section,
    SegmentedControl,
    Separator,
    Slider,
    Select,
    SelectField,
    Skeleton,
    Spinner,
    Stack,
    Stepper,
    Switch,
    Table,
    Tabs,
    TextArea,
    TextField,
    Toaster,
    Tooltip,
    toast,
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
  let tab = 'write';
  let accordionOpen = ['what'];
  let popoverOpen = false;
  let alertOpen = false;
  let radio = 'board';
  let comboFolder = 'home';
  let tags = ['design'];
  let dueDate = '2024-03-15';
  let quietHours = 22;
  let uploads = [];
  let page = 4;
  let drawerOpen = false;
  let step = 'details';
  let navItem = 'overview';
  let trapActive = false;
  let progress = 62;
  let tableSort = { key: 'name', direction: 'asc' };
  let tableSelected = [];
  let copied = false;
  let copyTimer = null;

  const INSTALL = 'npm install github:aa-blinov/monos-ui';

  async function copyInstall() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(INSTALL);
      ok = true;
    } catch {
      // A clipboard permission can be refused; a selected field still copies in older browsers.
      try {
        const area = document.createElement('textarea');
        area.value = INSTALL;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        ok = document.execCommand('copy');
        area.remove();
      } catch {
        ok = false;
      }
    }
    copied = ok;
    if (ok) {
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = false), 2000);
    }
  }

  onDestroy(() => clearTimeout(copyTimer));

  const tabItems = [
    { id: 'write', label: 'Write' },
    { id: 'read', label: 'Read' },
    { id: 'history', label: 'History' },
  ];

  const accordionItems = [
    { id: 'what', title: 'What is a token?', body: 'A named value: a colour, a radius, a size. A component reads the name, never the value.' },
    { id: 'why', title: 'Why one radius?', body: 'A card, a menu and a field are the same kind of rectangle. Density changes their size, not their corner.' },
    { id: 'how', title: 'How does a theme work?', body: 'A theme sets the semantic variables on an attribute. No JavaScript is needed to switch it.' },
  ];

  const folderOptions = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'archive', label: 'Archive' },
  ];

  const tagOptions = [
    { value: 'design', label: 'Design' },
    { value: 'paper', label: 'Paper' },
    { value: 'code', label: 'Code' },
    { value: 'reading', label: 'Reading' },
  ];

  const quietFormat = (value) => `${String(value).padStart(2, '0')}:00`;

  const radioOptions = [
    { value: 'board', label: 'Board', description: 'Cards with a tint and a date' },
    { value: 'list', label: 'List' },
    { value: 'table', label: 'Table' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'kind', label: 'Kind' },
    { key: 'size', label: 'Size', align: 'right', sortable: true },
  ];

  const tableRows = [
    { id: 'board', name: 'Board', kind: 'View', size: 12 },
    { id: 'today', name: 'Today', kind: 'View', size: 4 },
    { id: 'archive', name: 'Archive', kind: 'Folder', size: 128 },
  ];

  const stepItems = [
    { id: 'details', label: 'Details', description: 'Name and folder' },
    { id: 'content', label: 'Content', description: 'Write the note' },
    { id: 'review', label: 'Review', description: 'Check and save' },
  ];

  const listItems = [
    { id: 'overview', label: 'Overview', description: 'The whole desk', meta: '12' },
    { id: 'members', label: 'Members', meta: '3' },
    { id: 'archive', label: 'Archive', href: '#empty', meta: '24' },
  ];

  const descriptionItems = [
    { term: 'Owner', description: 'Ada Lovelace' },
    { term: 'Status', description: 'Active' },
    { term: 'Location', description: 'Work / Today' },
  ];

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

<nav class="sticky top-0 z-20 border-b border-line bg-canvas" aria-label="Monos UI">
  <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
    <a href="#top" class="text-sm font-bold tracking-tight">Monos UI</a>
    <div class="flex items-center gap-5 text-whisper uppercase tracking-widest text-ink-faint">
      <a href="https://github.com/aa-blinov/monos-ui" class="transition-colors duration-fast hover:text-ink">GitHub</a>
      <a href="https://github.com/aa-blinov/monos-ui/releases" class="transition-colors duration-fast hover:text-ink">Release</a>
      <a href="https://github.com/aa-blinov/monos-ui/tree/main/docs" class="transition-colors duration-fast hover:text-ink">Docs</a>
    </div>
  </div>
</nav>

<div id="top" class="mx-auto max-w-5xl px-6 pb-24 pt-10">
  <header class="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
    <div class="min-w-0">
      <h1 class="text-3xl font-bold tracking-tight">The desk, as a kit</h1>
      <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
        Warm paper, one radius, text buttons and a quiet focus ring. Pick a palette and a mode;
        everything below is drawn from the same tokens.
      </p>
      <div class="mt-5 flex min-w-0 max-w-full items-center gap-2">
        <code class="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-ui border border-line bg-surface px-3 py-2 font-mono text-xs text-ink-soft">{INSTALL}</code>
        <IconButton
          label={copied ? 'Copied' : 'Copy install command'}
          tooltipText={copied ? 'Copied' : 'Copy install command'}
          variant="outline"
          size="sm"
          on:click={copyInstall}
        >
          {#if copied}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          {:else}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.7" />
              <path d="M15 9V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          {/if}
        </IconButton>
      </div>
      <p class="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-whisper uppercase tracking-widest text-ink-faint">
        <span>53 components</span>
        <span>6 themes</span>
        <span>2 modes</span>
        <span>Svelte 4 and Tailwind 3</span>
      </p>
    </div>
    <div class="flex flex-wrap items-end gap-3">
      <div class="w-40">
        <Select label="Theme" bind:value={theme} options={themeNames.map((id) => ({ value: id, label: themes[id].name }))} size="sm" />
      </div>
      <SegmentedControl label="Mode" bind:value={mode} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} size="sm" />
    </div>
  </header>

  <nav class="mt-6" aria-label="Sections">
    <details class="sm:hidden">
      <summary class="flex cursor-pointer list-none items-center gap-2 text-whisper uppercase tracking-widest text-ink-faint">
        Jump to a section
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </summary>
      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-whisper uppercase tracking-widest text-ink-faint">
        {#each [['palette', 'Palette'], ['type', 'Type'], ['buttons', 'Buttons'], ['fields', 'Fields'], ['forms', 'Forms'], ['marks', 'Chips'], ['surfaces', 'Surfaces'], ['layout', 'Layout'], ['structure', 'Structure'], ['table', 'Table'], ['data', 'Data'], ['navigation', 'Navigation'], ['utilities', 'Utilities'], ['overlays', 'Overlays'], ['feedback', 'Feedback'], ['notices', 'Notices'], ['empty', 'Empty']] as [id, name]}
          <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
        {/each}
      </div>
    </details>
    <div class="hidden flex-wrap gap-x-4 gap-y-2 text-whisper uppercase tracking-widest text-ink-faint sm:flex">
      {#each [['palette', 'Palette'], ['type', 'Type'], ['buttons', 'Buttons'], ['fields', 'Fields'], ['forms', 'Forms'], ['marks', 'Chips'], ['surfaces', 'Surfaces'], ['layout', 'Layout'], ['structure', 'Structure'], ['table', 'Table'], ['data', 'Data'], ['navigation', 'Navigation'], ['utilities', 'Utilities'], ['overlays', 'Overlays'], ['feedback', 'Feedback'], ['notices', 'Notices'], ['empty', 'Empty']] as [id, name]}
        <a href="#{id}" class="transition-colors duration-fast hover:text-ink">{name}</a>
      {/each}
    </div>
  </nav>

  <section id="palette" class="mt-10 scroll-mt-20">
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

  <section id="type" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Type</h2>
    <div class="mt-4 space-y-2">
      <p class="text-3xl font-bold tracking-tight">Display 30</p>
      <p class="text-2xl font-bold tracking-tight">Headline 24</p>
      <p class="text-xl font-bold tracking-tight">Title 20</p>
      <p class="text-sm leading-relaxed text-ink-soft">Body 14. A calm sentence in the interface face, with enough room to breathe.</p>
      <p class="text-whisper uppercase tracking-[0.16em] text-ink-faint">Metadata whisper 11</p>
    </div>
  </section>

  <section id="buttons" class="mt-12 scroll-mt-20">
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

  <section id="fields" class="mt-12 scroll-mt-20">
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
    <div class="mt-6">
      <RadioGroup label="Default view" bind:value={radio} orientation="horizontal" class="max-sm:flex-col max-sm:gap-y-3" options={radioOptions} />
    </div>
  </section>

  <section id="forms" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Form controls</h2>
    <p class="mt-1 text-xs text-ink-soft">Search, multiple values, a drawn calendar, a native slider and a drop zone. All controlled; no hidden state.</p>
    <div class="mt-4 grid gap-6 md:grid-cols-2">
      <Combobox label="Folder" options={folderOptions} bind:value={comboFolder} hint="Type to filter the list" />
      <MultiSelect label="Tags" options={tagOptions} bind:values={tags} hint="Backspace removes the last tag" />
      <DatePicker label="Due date" bind:value={dueDate} hint="The calendar is drawn by the kit" />
      <FormField label="Quiet hours" forId="quiet-hours">
        <Slider id="quiet-hours" label="" bind:value={quietHours} min={18} max={23} step={1} format={quietFormat} hint="No notifications after this time" />
      </FormField>
      <Fieldset legend="Attachments" hint="Files stay on this device until sync" class="md:col-span-2">
        <FileUpload label="Drop files here" chooseLabel="Choose files" bind:files={uploads} hint="Markdown and images are fine" />
      </Fieldset>
    </div>
  </section>

  <section id="marks" class="mt-12 scroll-mt-20">
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
    <div class="mt-6 flex flex-wrap items-center gap-4">
      <Avatar name="Ada Lovelace" size="lg" status="online" />
      <Avatar name="Grace Hopper" size="md" />
      <Avatar name="Alan Turing" size="sm" status="away" />
      <Avatar name="Katherine Johnson" size="xl" />
    </div>
  </section>

  <section id="surfaces" class="mt-12 scroll-mt-20">
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

  <section id="layout" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Layout</h2>
    <p class="mt-1 text-xs text-ink-soft">A container, a stack, a grid, a section and a hairline. The page structure, without a second design language.</p>
    <div class="mt-4 space-y-6">
      <Container size="sm" padded={false}>
        <div class="rounded-ui border border-dashed border-line p-4 text-xs text-ink-faint">A narrow container (max-w-2xl), centred inside the page.</div>
      </Container>

      <div class="grid gap-4 md:grid-cols-2">
        <Stack gap="sm" class="rounded-ui border border-line p-3">
          <p class="text-whisper uppercase tracking-widest text-ink-faint">Stack, column</p>
          <Stack direction="row" gap="sm" wrap>
            <Chip>One</Chip>
            <Chip>Two</Chip>
            <Chip>Three</Chip>
          </Stack>
        </Stack>
        <Grid columns={3} gap="sm" class="rounded-ui border border-line p-3 max-sm:grid-cols-1">
          {#each [1, 2, 3] as number}
            <div class="rounded-ui bg-surface p-3 text-center text-xs text-ink-soft">{number}</div>
          {/each}
        </Grid>
      </div>

      <Section spacing="sm" class="rounded-ui border border-line px-3">
        <p class="text-xs text-ink-soft">Section with a small vertical rhythm.</p>
      </Section>

      <div class="space-y-2">
        <p class="text-xs text-ink-soft">Above</p>
        <Separator />
        <p class="text-xs text-ink-soft">Below</p>
      </div>

      <div class="flex items-center gap-4 text-xs text-ink-soft">
        <span>Left</span>
        <Separator orientation="vertical" class="h-6" />
        <span>Right</span>
      </div>
    </div>
  </section>

  <section id="structure" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Structure</h2>
    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <div>
        <Tabs items={tabItems} bind:value={tab} label="Note view">
          <svelte:fragment slot="panel" let:active>
            {#if active === 'write'}
              <p class="text-sm leading-relaxed text-ink-soft">The desk is a calm place to write. The tabs hold the modes of one note, not three pages.</p>
            {:else if active === 'read'}
              <p class="text-sm leading-relaxed text-ink-soft">Reading hides the controls and keeps the text. The same tokens, a quieter surface.</p>
            {:else}
              <p class="text-sm leading-relaxed text-ink-soft">History lists the versions of the file: a timestamp, a diff, and a way back.</p>
            {/if}
          </svelte:fragment>
        </Tabs>
      </div>
      <div>
        <Accordion items={accordionItems} bind:open={accordionOpen} let:item>
          <p>{item.body}</p>
        </Accordion>
      </div>
    </div>
  </section>

  <section id="table" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Table</h2>
    <p class="mt-1 text-xs text-ink-soft">Sortable headers, selection, a sticky header. Cell content comes through one slot.</p>
    <div class="mt-4">
      <Table columns={tableColumns} rows={tableRows} bind:sort={tableSort} bind:selected={tableSelected} selectable caption="Files in this folder">
        <svelte:fragment slot="cell" let:column let:value>
          {#if column.key === 'name'}
            <span class="font-bold text-ink">{value}</span>
          {:else if column.key === 'size'}
            {value} MB
          {:else}
            {value}
          {/if}
        </svelte:fragment>
      </Table>
    </div>
    <p class="mt-2 text-whisper uppercase tracking-widest text-ink-faint">
      {tableSelected.length} selected, sorted by {tableSort ? `${tableSort.key} ${tableSort.direction}` : 'nothing'}
    </p>
  </section>

  <section id="data" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Data</h2>
    <p class="mt-1 text-xs text-ink-soft">A list for rows and a definition list for facts. Both use the same hairline and the same measure.</p>
    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <div>
        <h3 class="text-sm font-bold">List</h3>
        <List items={listItems} class="mt-3" />
      </div>
      <div>
        <h3 class="text-sm font-bold">Description</h3>
        <DescriptionList items={descriptionItems} layout="inline" class="mt-3" />
      </div>
    </div>
  </section>

  <section id="navigation" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Navigation and content</h2>
    <div class="mt-4 space-y-8">
      <PageHeader title="A page header" description="It names the page, says what it is for and holds the actions." level={2}>
        <svelte:fragment slot="actions">
          <Button variant="secondary" size="sm">Share</Button>
        </svelte:fragment>
      </PageHeader>

      <div class="grid gap-8 md:grid-cols-2">
        <div class="min-w-0 space-y-8">
          <div>
            <Breadcrumbs items={[{ label: 'Notes', href: '#' }, { label: 'Work', href: '#' }, { label: 'Today' }]} />
          </div>
          <div>
            <Pagination bind:page pages={12} />
          </div>
          <div>
            <Button variant="secondary" on:click={() => (drawerOpen = true)}>Open a drawer</Button>
            <Drawer bind:open={drawerOpen} title="Filters" description="Narrow the board without leaving it.">
              <p class="text-sm leading-relaxed text-ink-soft">The drawer holds a longer filter form on a phone, or navigation when the sidebar is gone.</p>
              <svelte:fragment slot="footer">
                <Button variant="secondary" on:click={() => (drawerOpen = false)}>Cancel</Button>
                <Button on:click={() => (drawerOpen = false)}>Apply</Button>
              </svelte:fragment>
            </Drawer>
          </div>
        </div>

        <Prose class="min-w-0">
          <h3>Reading a note</h3>
          <p>A reading column is a measure, a rhythm and a quiet place for links. The prose wrapper owns the space between the elements; the product owns the words.</p>
          <ul>
            <li>Headings take the same face and weight as the rest of the kit.</li>
            <li>Code sits on one surface, with one radius.</li>
          </ul>
          <blockquote>One radius, one face, one accent at a time.</blockquote>
          <pre><code>npm install github:aa-blinov/monos-ui</code></pre>
        </Prose>
      </div>
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">Stepper</p>
          <Stepper steps={stepItems} bind:value={step} clickable label="Note setup" />
        </div>
        <div>
          <p class="mb-3 text-whisper uppercase tracking-widest text-ink-faint">Nav item</p>
          <div class="max-w-xs rounded-ui border border-line p-1">
            <NavItem active={navItem === 'overview'} label="Overview" on:click={() => (navItem = 'overview')} />
            <NavItem active={navItem === 'members'} label="Members" on:click={() => (navItem = 'members')} />
            <NavItem active={navItem === 'settings'} label="Settings" on:click={() => (navItem = 'settings')} />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="utilities" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Utilities</h2>
    <p class="mt-1 text-xs text-ink-soft">A portal that leaves the parent's overflow, and a focus trap for a custom overlay.</p>
    <div class="mt-4 grid gap-6 md:grid-cols-2">
      <div>
        <p class="text-whisper uppercase tracking-widest text-ink-faint">Portal</p>
        <div id="portal-destination" class="mt-2 min-h-16 rounded-ui border border-dashed border-line p-4"></div>
        <Portal target="#portal-destination">
          <span class="block text-xs leading-relaxed text-ink-soft">This sentence was portaled into the box above, outside this layout flow.</span>
        </Portal>
      </div>
      <div>
        <p class="text-whisper uppercase tracking-widest text-ink-faint">Focus trap</p>
        <Button variant="secondary" size="sm" class="mt-2" on:click={() => (trapActive = !trapActive)}>
          {trapActive ? 'Release focus' : 'Trap focus'}
        </Button>
        <FocusTrap active={trapActive} class="mt-3 rounded-ui border border-line p-3">
          <div class="flex flex-wrap gap-2">
            <Button size="sm">First</Button>
            <Button size="sm" variant="secondary">Second</Button>
          </div>
        </FocusTrap>
      </div>
    </div>
  </section>

  <section id="overlays" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Overlays</h2>
    <p class="mt-1 text-xs text-ink-soft">A menu, a modal, a popover and a destructive confirmation share the same surface and z-layers.</p>
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
      <Popover label="Filters" bind:open={popoverOpen}>
        <svelte:fragment slot="trigger" let:toggle let:triggerProps>
          <Button variant="secondary" on:click={toggle} {...triggerProps}>Filters</Button>
        </svelte:fragment>
        <p class="text-sm font-bold">Filter the board</p>
        <p class="mt-1 text-xs leading-relaxed text-ink-soft">Any content can live here: a small form, a date, a set of toggles.</p>
      </Popover>
      <Button variant="danger" on:click={() => (alertOpen = true)}>Delete a note</Button>
      {#if picked}
        <span class="text-xs text-ink-faint">Picked: {picked}</span>
      {/if}
    </div>
    <AlertDialog
      bind:open={alertOpen}
      title="Delete this note?"
      description="This cannot be undone."
      confirmLabel="Delete"
      on:confirm={() => toast({ title: 'Deleted', description: 'The note is in the trash.', tone: 'success' })}
    />
  </section>

  <section id="feedback" class="mt-12 scroll-mt-20">
    <h2 class="text-lg font-bold tracking-tight">Feedback and loading</h2>
    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <div class="space-y-5">
        <div>
          <p class="mb-1.5 text-xs text-ink-soft">Upload, {progress}%</p>
          <Progress value={progress} label="Upload progress" />
        </div>
        <div>
          <p class="mb-1.5 text-xs text-ink-soft">Loading</p>
          <Progress indeterminate label="Loading" />
        </div>
        <div class="flex flex-wrap gap-3">
          <Button size="sm" on:click={() => toast({ title: 'Note saved', description: 'The file is on disk.', tone: 'success' })}>Show a toast</Button>
          <Button
            size="sm"
            variant="secondary"
            on:click={() => toast({ title: 'Sync waits', description: 'Review the agent changes before this device sends.', tone: 'warning', duration: 0, action: { label: 'Review', onClick: () => {} } })}
          >Toast with an action</Button>
        </div>
      </div>
      <div class="space-y-2" aria-hidden="true">
        <Skeleton width="45%" height="1rem" />
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="92%" height="0.75rem" />
        <Skeleton width="70%" height="0.75rem" />
      </div>
    </div>
  </section>

  <section id="notices" class="mt-12 scroll-mt-20">
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

  <section id="empty" class="mt-12 scroll-mt-20 grid gap-6 md:grid-cols-2">
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

  <footer class="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint">
    <p>MIT, Svelte 4, Tailwind 3</p>
    <p>
      <a href="https://github.com/aa-blinov/monos-ui" class="transition-colors duration-fast hover:text-ink">GitHub</a>,
      <a href="https://github.com/aa-blinov/monos-ui/releases" class="transition-colors duration-fast hover:text-ink">Release</a>
    </p>
  </footer>
</div>

<Toaster />

<Modal bind:open={modalOpen} title="Delete this note?" description="This cannot be undone.">
  <p class="text-sm leading-relaxed text-ink-soft">
    The note and its pictures will leave this folder. The history in git keeps a copy until it is pruned.
  </p>
  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => (modalOpen = false)}>Cancel</Button>
    <Button variant="danger" on:click={() => (modalOpen = false)}>Delete</Button>
  </svelte:fragment>
</Modal>
