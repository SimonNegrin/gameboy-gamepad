<script>
  import { createEventDispatcher } from "svelte"

  export let invert = false

  const dispatch = createEventDispatcher()

  const onTouchstart = () => {
    dispatch('update', true)
  }
  
  const onTouchend = () => {
    dispatch('update', false)
  }

</script>

<button
  type="button"
  class:invert
  on:touchstart={onTouchstart}
  on:touchend={onTouchend}
  >
  <div class="label">
    <slot />
  </div>
</button>

<style lang="scss">

  button {
    padding: 6px;
    background-color: transparent;
    border: none;

    &::after {
      content: '';
      display: block;
      width: 50px;
      height: 20px;
      border-radius: 9999px;
      background-color: var(--control-idle-color);
    }

    &.invert {
      filter: invert(1);
    }
  }

  .label {
    font-size: 0.9em;
    text-align: center;
  }

</style>
