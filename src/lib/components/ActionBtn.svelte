<script>
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  function onTouchstart() {
    dispatch('update', true)
  }

  function onTouchend() {
    dispatch('update', false)
  }

</script>

<button
  type="button"
  on:touchstart={onTouchstart}
  on:touchend={onTouchend}
  ></button>

<style lang="scss">

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--control-idle-color);
    border: none;
    display: block;

    &:active {
      background-color: var(--control-enabled-color);
    }
  }

</style>
