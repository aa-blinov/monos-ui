<script>
  import { MoreHorizontal, Plus, Star, Trash2 } from 'lucide-svelte';
  import { Button, IconButton } from '../../src/index.js';
</script>

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
