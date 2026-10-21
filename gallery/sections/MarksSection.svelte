<script>
  import { Avatar, Badge, Chip } from '../../src/index.js';
</script>

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
