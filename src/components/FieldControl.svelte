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
  export let bare = false;

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

<!-- Three real elements rather than one `<svelte:element>`: a dynamic `input` is given a children block, and Svelte
     reports that on every field as a self-closing warning. -->
{#if as === 'select'}
  <select
    {id}
    {name}
    {disabled}
    {value}
    bind:this={inputEl}
    role="combobox"
    class={bare ? className : fieldControlClass({ variant, size, extraClass: className })}
    on:input={onInput}
    on:change={onChange}
    on:keydown
    on:focus
    on:blur
    {...$$restProps}
  >
    {#each options as option}
      <option value={option.value} selected={option.value === value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
{:else if as === 'textarea'}
  <!-- svelte-ignore a11y-no-redundant-roles -->
  <textarea
    {id}
    {name}
    {placeholder}
    {disabled}
    {rows}
    {value}
    bind:this={inputEl}
    role="textbox"
    class={bare ? className : fieldControlClass({ variant, size, extraClass: className })}
    on:input={onInput}
    on:change={onChange}
    on:keydown
    on:focus
    on:blur
    {...$$restProps}
  ></textarea>
{:else}
  <!-- svelte-ignore a11y-no-redundant-roles -->
  <input
    {id}
    {name}
    {placeholder}
    {disabled}
    {type}
    {value}
    bind:this={inputEl}
    role="textbox"
    class={bare ? className : fieldControlClass({ variant, size, extraClass: className })}
    on:input={onInput}
    on:change={onChange}
    on:keydown
    on:focus
    on:blur
    {...$$restProps}
  />
{/if}
