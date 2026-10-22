<script>
  import { Sidebar, SidebarItem, SidebarSection, TagInput } from '../../src/index.js';

  let open = true;
  let tags = ['design', 'paper'];
  const suggestions = ['design', 'paper', 'release', 'writing', 'research'];
</script>

<section id="app-shell" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">App shell</h2>
  <p class="mt-1 text-xs text-ink-soft">
    A sidebar surface, a collapsible group, a navigation row with depth, and the controlled tag field. The product keeps
    its tree; these are the shapes around it.
  </p>
  <div class="mt-4 grid gap-4 md:grid-cols-[16rem_minmax(0,1fr)]">
    <div class="h-72 overflow-hidden rounded-ui border border-line">
      <Sidebar label="Demo sidebar" width="100%">
        <SidebarSection title="Workspace" count={3} collapsible bind:open>
          <SidebarItem active label="Notes" />
          <SidebarItem label="Favorites" />
          <SidebarItem label="Archive" depth={1} />
        </SidebarSection>
      </Sidebar>
    </div>
    <div class="min-w-0 rounded-ui border border-line p-4">
      <TagInput bind:tags {suggestions} label="Tags" hint="Enter or a comma adds a tag; Backspace removes the last." />
      <p class="mt-4 text-xs text-ink-faint">Selected: {tags.join(', ') || 'none'}</p>
    </div>
  </div>
</section>
