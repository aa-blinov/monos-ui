<script>
  import { Combobox, DatePicker, Fieldset, FileUpload, FormField, MultiSelect, Slider } from '../../src/index.js';

  let comboFolder = 'home';
  let tags = ['design'];
  let dueDate = '2024-03-15';
  let quietHours = 22;
  let uploads = [];

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
</script>

<section id="forms" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Form controls</h2>
  <p class="mt-1 text-xs text-ink-soft">
    Search, multiple values, a drawn calendar, a native slider and a drop zone. All controlled; no hidden state.
  </p>
  <div class="mt-4 grid gap-6 md:grid-cols-2">
    <Combobox label="Folder" options={folderOptions} bind:value={comboFolder} hint="Type to filter the list" />
    <MultiSelect label="Tags" options={tagOptions} bind:values={tags} hint="Backspace removes the last tag" />
    <DatePicker label="Due date" bind:value={dueDate} hint="The calendar is drawn by the kit" />
    <FormField label="Quiet hours" forId="quiet-hours">
      <Slider
        id="quiet-hours"
        label=""
        bind:value={quietHours}
        min={18}
        max={23}
        step={1}
        format={quietFormat}
        hint="No notifications after this time"
      />
    </FormField>
    <Fieldset legend="Attachments" hint="Files stay on this device until sync" class="md:col-span-2">
      <FileUpload
        label="Drop files here"
        chooseLabel="Choose files"
        bind:files={uploads}
        hint="Markdown and images are fine"
      />
    </Fieldset>
  </div>
</section>
