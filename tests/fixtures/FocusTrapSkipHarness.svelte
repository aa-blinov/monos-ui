<script>
  import FocusTrap from '../../src/components/FocusTrap.svelte';
</script>

<FocusTrap>
  <button tabindex="-1">Skipped first</button>
  <button>One</button>
  <input aria-label="Two" />
  <button tabindex="-1">Skipped last</button>
  <input tabindex="-1" aria-label="Skipped field" />
</FocusTrap>
