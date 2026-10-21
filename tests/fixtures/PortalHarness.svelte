<script>
  import Portal from '../../src/components/Portal.svelte';

  export let destination = null;
</script>

<div data-testid="portal-home">
  <Portal target={destination}>
    <span data-testid="portal-content">Portaled</span>
  </Portal>
</div>
