<script>
  import { Checkbox, RadioGroup, SearchField, SelectField, Switch, TextArea, TextField } from '../../src/index.js';

  let title = 'A note about the desk';
  let body = 'The palette is warm, the radius is one, and nothing glows without a reason.';
  let folder = 'work';
  let search = '';
  let checked = true;
  let switchOn = true;
  let radio = 'board';

  const radioOptions = [
    { value: 'board', label: 'Board', description: 'Cards with a tint and a date' },
    { value: 'list', label: 'List' },
    { value: 'table', label: 'Table' },
  ];
</script>

<section id="fields" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Fields</h2>
  <div class="mt-4 grid gap-6 md:grid-cols-2">
    <TextField label="Title" bind:value={title} hint="The name on the card and in the file" />
    <SelectField
      label="Folder"
      bind:value={folder}
      options={[
        { value: 'work', label: 'Work' },
        { value: 'home', label: 'Home' },
        { value: 'inbox', label: 'Inbox' },
      ]}
    />
    <TextField label="With an error" value="not an email" error="Use the form name@example.com" />
    <TextField label="Boxed" variant="boxed" placeholder="Boxed input" />
  </div>
  <div class="mt-6 grid gap-6 md:grid-cols-2">
    <TextArea label="Note" bind:value={body} rows={4} hint="Markdown is fine" />
    <div class="space-y-4">
      <SearchField bind:value={search} label="Search notes" placeholder="Search" />
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox bind:checked>Remember this</Checkbox>
        <Checkbox checked disabled>Locked</Checkbox>
        <Switch bind:checked={switchOn}>Sync automatically</Switch>
      </div>
    </div>
  </div>
  <div class="mt-6">
    <RadioGroup
      label="Default view"
      bind:value={radio}
      orientation="horizontal"
      class="max-sm:flex-col max-sm:gap-y-3"
      options={radioOptions}
    />
  </div>
</section>
