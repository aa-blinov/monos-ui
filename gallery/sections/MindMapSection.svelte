<script>
  import { MindMap, SegmentedControl } from '../../src/index.js';

  let direction = 'both';
  let selected = 'notes';
  let collapsed = [];

  const root = {
    id: 'monos',
    label: 'Monos',
    children: [
      {
        id: 'notes',
        label: 'Notes',
        children: [
          { id: 'markdown', label: 'Markdown files' },
          { id: 'links', label: 'Wiki links' },
          { id: 'tags', label: 'Tags and properties' },
        ],
      },
      {
        id: 'sync',
        label: 'Sync',
        children: [
          { id: 'git', label: 'Git' },
          { id: 'conflicts', label: 'Conflict copies' },
        ],
      },
      {
        id: 'desk',
        label: 'Desktop',
        children: [
          { id: 'terminal', label: 'Terminal' },
          { id: 'menu', label: 'Native menu' },
        ],
      },
      { id: 'kit', label: 'Interface kit', children: [{ id: 'themes', label: 'Six themes' }] },
    ],
  };
</script>

<section id="mindmap" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Mind map</h2>
  <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
    One idea in the middle, branches around it. Click a node to select it, press Enter or the sign beside it to fold a
    branch, drag the background to pan, and use Ctrl or Cmd with the wheel to zoom. Arrow keys move between nodes.
  </p>
  <div class="mt-4 flex flex-wrap items-end justify-between gap-3">
    <div>
      <SegmentedControl
        label="Layout"
        size="sm"
        bind:value={direction}
        options={[
          { value: 'both', label: 'Both sides' },
          { value: 'right', label: 'To the right' },
        ]}
      />
    </div>
    <p class="text-whisper uppercase tracking-widest text-ink-faint">Selected: {selected}</p>
  </div>
  <MindMap class="mt-3" {root} {direction} bind:value={selected} bind:collapsed label="Product map" />
</section>
