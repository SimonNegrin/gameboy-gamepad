<script>
  import { createEventDispatcher } from "svelte"
  import { calcDistance } from "../services/geometry"

  const threshold = 30
  const dispatch = createEventDispatcher()

  let joystickEl
  let controlEl
  let enabled = false

  const onTouchmove = event => {
    const { clientX, clientY } = event.touches[0]
    const { left, top, width, height } = joystickEl.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    const vector = [x, y]
    controlEl.style.transform = `translate(${x}px, ${y}px)`
    enabled = calcDistance([0, 0], vector) > threshold
    dispatch('update', { vector, enabled })
  }

  const onTouchend = () => {
    controlEl.style.transform = 'translate(0px, 0px)'
    enabled = false
    dispatch('update', { vector: [0, 0], enabled })
  }

</script>

<div
  bind:this={joystickEl}
  class="joystick"
  on:touchmove={onTouchmove}
  on:touchend={onTouchend}
  >
  <div
    class="control"
    class:enabled
    bind:this={controlEl}
    ></div>
</div>

<style lang="scss">

  .joystick {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }

  .control {
    width: 50px;
    height: 50px;
    background-color: var(--control-idle-color);
    border-radius: 50%;

    &.enabled {
      background-color: var(--control-enabled-color);
    }
  }


</style>
