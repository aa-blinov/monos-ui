<script>
  /**
   * A confirmation for something that cannot be undone. It is an alert dialog:
   * no close cross, no backdrop dismissal, and the focus starts on Cancel.
   *
   * `confirm` is dispatched; the product decides what happens. By default the
   * dialog closes on confirm, unless `closeOnConfirm` is false for an async
   * action (then set `loading` while it runs).
   */
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  export let open = false;
  export let title = '';
  export let description = '';
  export let confirmLabel = 'Confirm';
  export let cancelLabel = 'Cancel';
  export let tone = 'danger';
  export let loading = false;
  export let closeOnConfirm = true;
  export let closeOnEscape = true;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  let cancelButton;
  $: cancelFocus = cancelButton?.buttonEl ?? null;

  function cancel() {
    open = false;
    dispatch('cancel');
  }

  function confirm() {
    dispatch('confirm');
    if (closeOnConfirm && !loading) open = false;
  }

  function onClose() {
    dispatch('cancel');
  }
</script>

<Modal
  bind:open
  role="alertdialog"
  {title}
  {description}
  closeOnEscape={closeOnEscape && !loading}
  closeOnBackdrop={false}
  showClose={false}
  initialFocus={cancelFocus}
  on:close={onClose}
  class={className}
>
  <slot />
  <svelte:fragment slot="footer">
    <Button variant="secondary" bind:this={cancelButton} disabled={loading} on:click={cancel}>{cancelLabel}</Button>
    <Button variant={tone === 'danger' ? 'danger' : 'primary'} {loading} on:click={confirm}>{confirmLabel}</Button>
  </svelte:fragment>
</Modal>
