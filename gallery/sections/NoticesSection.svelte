<script>
  import { Notice } from '../../src/index.js';

  let noticeVisible = true;
</script>

<section id="notices" class="mt-12 scroll-mt-20">
  <h2 class="text-lg font-bold tracking-tight">Notices</h2>
  <div class="mt-4 space-y-3">
    {#if noticeVisible}
      <Notice title="Sync waits for review" dismissible on:dismiss={() => (noticeVisible = false)}>
        The agent changed two notes here. Keep or revert them before this device sends anything.
      </Notice>
    {/if}
    <Notice tone="danger" title="The connection failed"
      >The token can read but not write. Check the repository permissions.</Notice
    >
    <Notice tone="success" title="Everything synced">The notes here and on GitHub are the same.</Notice>
  </div>
</section>
