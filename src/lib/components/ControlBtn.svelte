<script>
  import { createEventDispatcher } from "svelte"

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
  on:touchstart={onTouchstart}
  on:touchend={onTouchend}
  ></button>

<style lang="scss">

  button {
    width: 50px;
    height: 20px;
    border-radius: 9999px;
    background-color: var(--control-idle-color);
    border: none;
  }

</style>
