<script>
  import Button from '../../src/components/Button.svelte';
  import Modal from '../../src/components/Modal.svelte';
  let open = false;
</script>

<Button on:click={() => (open = true)}>Open</Button>
<Modal bind:open title="Test modal">Body</Modal>
<p data-testid="state">{open ? 'open' : 'closed'}</p>
