<script>
  import { createEventDispatcher } from "svelte"
  import { calcDistance, getVectorDir } from "../services/geometry"
  import Chevron from './Chevron.svelte'

  export let threshold = 30

  const dispatch = createEventDispatcher()
  
  let joystickEl
  let controlEl
  let enabled = false

  const onTouchstartOrTouchmove = ({ targetTouches }) => {
    const { clientX, clientY } = targetTouches[0]
    const { left, top, width, height } = joystickEl.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    const vector = [x, y]
    controlEl.style.transform = `translate(${x}px, ${y}px)`
    enabled = calcDistance([0, 0], vector) > threshold

    if (!enabled) {
      dispatch('update', null)
      return
    }

    // @ts-ignore
    dispatch('update', getVectorDir(vector))
  }

  const onTouchend = () => {
    controlEl.style.transform = 'translate(0px, 0px)'
    enabled = false
    dispatch('update', null)
  }

</script>

<div
  bind:this={joystickEl}
  class="joystick"
  on:touchstart={onTouchstartOrTouchmove}
  on:touchmove={onTouchstartOrTouchmove}
  on:touchend={onTouchend}
  >
  <div class="frame">
    <div class="up">
      <Chevron dir="up" />
    </div>
    <div class="middle">
      <Chevron dir="left" />
      <Chevron dir="right" />
    </div>
    <div class="bottom">
      <Chevron dir="bottom" />
    </div>
  </div>
  <div
    class="control"
    class:enabled
    bind:this={controlEl}
    ></div>
</div>

<style lang="scss">

  .joystick {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .frame {
    --size: 90px;
    position: absolute;
    width: var(--size);
    height: var(--size);
    top: calc(50% - var(--size) * 0.5);
    left: calc(50% - var(--size) * 0.5);
    touch-action: none;
    background-color: rgba(0 0 0 / 0.2);
    border-radius: 50%;
    display: flex;
    flex-direction: column;

    .up,
    .middle,
    .bottom {
      flex: 1 1 0;
      display: flex;
    }

    .up,
    .bottom {
      justify-content: center;
    }

    .middle {
      justify-content: space-between;
      align-items: center;
    }

    .up {
      align-items: flex-start;
    }

    .bottom {
      align-items: flex-end;
    }
  }

  .control {
    --size: 50px;
    position: absolute;
    z-index: 2;
    width: var(--size);
    height: var(--size);
    top: calc(50% - var(--size) * 0.5);
    left: calc(50% - var(--size) * 0.5);
    background-color: var(--control-idle-color);
    border-radius: 50%;
    touch-action: none;

    &.enabled {
      background-color: var(--control-enabled-color);
    }
  }


</style>
