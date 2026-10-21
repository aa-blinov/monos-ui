<script>
  import FocusTrap from '../../src/components/FocusTrap.svelte';

  export let active = true;
</script>

<button>Before</button>
<FocusTrap {active}>
  <button>One</button>
  <button>Two</button>
</FocusTrap>
