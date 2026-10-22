<script>
  /**
   * A native field with the kit's field geometry. It is for a product that
   * already owns the label, hint and error, or for a control the labelled
   * `TextField`/`SelectField` cannot express.
   *
   * as: input | select | textarea
   */
  import { createEventDispatcher } from 'svelte';
  import { fieldControlClass } from '../field.js';

  export let as = 'input';
  export let value = '';
  export let type = 'text';
  export let options = [];
  export let id = '';
  export let name = '';
  export let placeholder = '';
  export let disabled = false;
  export let rows = 4;
  export let variant = 'underline';
  export let size = 'md';
  export let inputEl = null;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  function onInput(event) {
    value = event.currentTarget.value;
    dispatch('input', event);
  }

  function onChange(event) {
    value = event.currentTarget.value;
    dispatch('change', event);
  }
</script>

<svelte:element
  this={as}
  {id}
  {name}
  {placeholder}
  {disabled}
  {type}
  {rows}
  {value}
  bind:this={inputEl}
  role={as === 'select' ? 'combobox' : 'textbox'}
  class={fieldControlClass({ variant, size, extraClass: className })}
  on:input={onInput}
  on:change={onChange}
  on:keydown
  on:focus
  on:blur
  {...$$restProps}
>
  {#if as === 'select'}
    {#each options as option}
      <option value={option.value} selected={option.value === value} disabled={option.disabled}>{option.label}</option>
    {/each}
  {/if}
</svelte:element>
