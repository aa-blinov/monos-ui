<script>
  import { Accordion, Tabs } from '../../src/index.js';

  let tab = 'write';
  let accordionOpen = ['what'];

  const tabItems = [
    { id: 'write', label: 'Write' },
    { id: 'read', label: 'Read' },
    { id: 'history', label: 'History' },
  ];

  const accordionItems = [
    {
      id: 'what',
      title: 'What is a token?',
      body: 'A named value: a colour, a radius, a size. A component reads the name, never the value.',
    },
    {
      id: 'why',
      title: 'Why one radius?',
      body: 'A card, a menu and a field are the same kind of rectangle. Density changes their size, not their corner.',
    },
    {
      id: 'how',
      title: 'How does a theme work?',
      body: 'A theme sets the semantic variables on an attribute. No JavaScript is needed to switch it.',
    },
  ];
</script>

<section id="structure" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Structure</h2>
  <div class="mt-4 grid gap-8 md:grid-cols-2">
    <div>
      <Tabs items={tabItems} bind:value={tab} label="Note view">
        <svelte:fragment slot="panel" let:active>
          {#if active === 'write'}
            <p class="text-sm leading-relaxed text-ink-soft">
              The desk is a calm place to write. The tabs hold the modes of one note, not three pages.
            </p>
          {:else if active === 'read'}
            <p class="text-sm leading-relaxed text-ink-soft">
              Reading hides the controls and keeps the text. The same tokens, a quieter surface.
            </p>
          {:else}
            <p class="text-sm leading-relaxed text-ink-soft">
              History lists the versions of the file: a timestamp, a diff, and a way back.
            </p>
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
