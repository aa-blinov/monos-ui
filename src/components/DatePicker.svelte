<script context="module">
  let counter = 0;
</script>

<script>
  /**
   * A date field with a drawn calendar. `value` is an ISO `YYYY-MM-DD` string;
   * the visible date is formatted with `Intl` in `locale`. The calendar uses the
   * WAI-ARIA date picker pattern: arrows move by day or week, Home/End move to
   * the week's edges, PageUp/PageDown move by month.
   *
   * The kit owns no date engine: the value is a string, the month names come
   * from `Intl`, and min/max are compared as strings.
   */
  import { createEventDispatcher, tick } from 'svelte';
  import Button from './Button.svelte';
  import IconButton from './IconButton.svelte';
  import Popover from './Popover.svelte';

  export let value = '';
  export let label = '';
  export let placeholder = 'Select a date';
  export let hint = '';
  export let error = '';
  export let min = '';
  export let max = '';
  export let locale = 'en-US';
  export let firstDay = 1;
  export let clearable = true;
  export let clearLabel = 'Clear';
  export let previousLabel = 'Previous month';
  export let nextLabel = 'Next month';
  export let disabled = false;
  export let required = false;
  export let id = '';

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher();
  const fallbackId = `ui-date-${++counter}`;
  $: fieldId = id || fallbackId;
  $: hintId = `${fieldId}-hint`;
  $: errorId = `${fieldId}-error`;
  $: describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  const pad = (number) => String(number).padStart(2, '0');
  const toIso = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const parseIso = (iso) => {
    const [year, month, day] = String(iso).split('-').map(Number);
    if (!year || !month || !day) return null;
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  };
  const todayIso = () => toIso(new Date());

  let open = false;
  let wasOpen = false;
  let panel;
  let triggerEl;
  const current = new Date();
  let viewYear = current.getFullYear();
  let viewMonth = current.getMonth();
  let focusedIso = '';

  $: selected = value ? parseIso(value) : null;
  $: if (selected) {
    viewYear = selected.getFullYear();
    viewMonth = selected.getMonth();
  } else if (viewYear == null) {
    const now = new Date();
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();
  }

  $: monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(viewYear, viewMonth, 1),
  );

  $: weekdayLabels = (() => {
    const base = new Date(2024, 0, 7); // a Sunday
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(base);
      date.setDate(base.getDate() + ((firstDay + index) % 7));
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    });
  })();

  $: cells = (() => {
    const first = new Date(viewYear, viewMonth, 1);
    const offset = (first.getDay() - firstDay + 7) % 7;
    const days = new Date(viewYear, viewMonth + 1, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - offset + 1;
      if (day < 1 || day > days) return null;
      const date = new Date(viewYear, viewMonth, day);
      const iso = toIso(date);
      return {
        date,
        iso,
        day,
        label: new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(date),
      };
    });
  })();

  $: display = selected ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(selected) : '';

  $: if (open && !wasOpen) {
    wasOpen = true;
    const base = selected || new Date();
    viewYear = base.getFullYear();
    viewMonth = base.getMonth();
    focusedIso = selected ? toIso(selected) : todayIso();
    void tick().then(() => panel?.querySelector(`[data-date="${focusedIso}"]`)?.focus());
  }
  $: if (!open && wasOpen) wasOpen = false;

  function disabledDate(iso) {
    return Boolean((min && iso < min) || (max && iso > max));
  }

  function choose(iso) {
    if (disabledDate(iso)) return;
    value = iso;
    dispatch('change', value);
    open = false;
    void tick().then(() => triggerEl?.focus());
  }

  function clear() {
    value = '';
    dispatch('change', value);
    open = false;
    void tick().then(() => triggerEl?.focus());
  }

  function shiftMonth(delta) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    viewYear = next.getFullYear();
    viewMonth = next.getMonth();
    focusedIso = toIso(new Date(viewYear, viewMonth, 1));
  }

  function onDayKeydown(event, iso) {
    const current = parseIso(iso);
    if (!current) return;
    let next = null;
    if (event.key === 'ArrowLeft') next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
    else if (event.key === 'ArrowRight')
      next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
    else if (event.key === 'ArrowUp') next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
    else if (event.key === 'ArrowDown')
      next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
    else if (event.key === 'Home')
      next = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() - ((current.getDay() - firstDay + 7) % 7),
      );
    else if (event.key === 'End')
      next = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + 6 - ((current.getDay() - firstDay + 7) % 7),
      );
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const delta = event.key === 'PageUp' ? -1 : 1;
      const nextMonth = new Date(current.getFullYear(), current.getMonth() + delta, 1);
      const days = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
      next = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), Math.min(current.getDate(), days));
    } else {
      return;
    }
    event.preventDefault();
    const isoNext = toIso(next);
    if (disabledDate(isoNext)) return;
    viewYear = next.getFullYear();
    viewMonth = next.getMonth();
    focusedIso = isoNext;
    void tick().then(() => panel?.querySelector(`[data-date="${isoNext}"]`)?.focus());
  }
</script>

<div class={className}>
  {#if label}
    <label for={fieldId} class="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
      {label}{#if required}<span class="text-danger-text" aria-hidden="true"> *</span>{/if}
    </label>
  {/if}
  <Popover bind:open label={label || 'Date'} width="lg" align="start" class="block w-full">
    <svelte:fragment slot="trigger" let:toggle let:triggerProps>
      <button
        bind:this={triggerEl}
        id={fieldId}
        type="button"
        {...triggerProps}
        {disabled}
        aria-describedby={describedBy}
        class="flex h-9 w-full items-center justify-between gap-2 border-b bg-transparent px-1 text-left text-sm outline-none transition-colors duration-fast focus:border-ink-soft disabled:cursor-not-allowed disabled:opacity-50 max-sm:h-11 {error
          ? 'border-danger'
          : 'border-line'} {display ? 'text-ink' : 'text-ink-faint'}"
        on:click={toggle}
      >
        <span class="truncate">{display || placeholder}</span>
        <svg class="h-4 w-4 shrink-0 text-ink-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" stroke-width="1.7" />
          <path d="M8 3v4M16 3v4M4 9h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>
    </svelte:fragment>

    <div bind:this={panel}>
      <div class="flex items-center justify-between gap-2">
        <IconButton label={previousLabel} variant="ghost" size="sm" tooltipText="" on:click={() => shiftMonth(-1)}>
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m14 6-6 6 6 6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </IconButton>
        <p class="text-xs font-bold uppercase tracking-widest text-ink" aria-live="polite">{monthLabel}</p>
        <IconButton label={nextLabel} variant="ghost" size="sm" tooltipText="" on:click={() => shiftMonth(1)}>
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m10 6 6 6-6 6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </IconButton>
      </div>

      <div
        class="mt-4 grid grid-cols-7 gap-0.5 text-center justify-items-center max-[380px]:gap-0"
        role="group"
        aria-label={monthLabel}
      >
        {#each weekdayLabels as day}
          <span class="pb-1 text-whisper uppercase tracking-widest text-ink-faint" aria-hidden="true">{day}</span>
        {/each}
        {#each cells as cell}
          {#if cell}
            <button
              type="button"
              data-date={cell.iso}
              tabindex={focusedIso === cell.iso ? 0 : -1}
              disabled={disabledDate(cell.iso)}
              aria-label={cell.label}
              aria-pressed={value === cell.iso}
              aria-current={cell.iso === todayIso() ? 'date' : undefined}
              class="inline-flex h-8 w-8 items-center justify-center rounded-ui text-xs tabular-nums max-sm:h-11 max-sm:w-11 max-[380px]:h-9 max-[380px]:w-9 max-[340px]:h-8 max-[340px]:w-8 transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-25 {value ===
              cell.iso
                ? 'bg-ink font-bold text-canvas'
                : cell.iso === todayIso()
                  ? 'border border-line text-ink'
                  : 'text-ink-soft hover:bg-surface hover:text-ink'}"
              on:click={() => choose(cell.iso)}
              on:keydown={(event) => onDayKeydown(event, cell.iso)}
            >
              {cell.day}
            </button>
          {:else}
            <span aria-hidden="true"></span>
          {/if}
        {/each}
      </div>

      {#if clearable && value}
        <div class="mt-3 flex justify-end border-t border-line pt-2">
          <Button variant="quiet" size="sm" on:click={clear}>{clearLabel}</Button>
        </div>
      {/if}
    </div>
  </Popover>
  {#if error}
    <p id={errorId} class="mt-1.5 text-xs text-danger-text" role="alert">{error}</p>
  {:else if hint}
    <p id={hintId} class="mt-1.5 text-xs text-ink-faint">{hint}</p>
  {/if}
</div>
