<script>
  import TextField from '../../src/components/TextField.svelte';
  let value = '';
</script>

<TextField bind:value label="Title" />
<p data-testid="echo">{value}</p>
