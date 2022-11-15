<script>
  import {
    DIR_LEFT,
    DIR_LEFT_BOTTOM,
    DIR_LEFT_TOP,
    DIR_RIGHT,
    DIR_RIGHT_BOTTOM,
    DIR_RIGHT_TOP
  } from '../services/geometry'
  import { sendGamepadStatePacket } from "../services/realTime"
  import ControlBtn from "./ControlBtn.svelte"
  import Joystick from "./Joystick.svelte"

  const gamepadState = {
    leftJoystick  : null,
    rightJoystick : null,
    start         : false,
    select        : false,
  }

  let viewportHeight = window.innerHeight

  const onBtnUpdate = prop => {
    return ({ detail: state }) => {
      if (gamepadState[prop] !== state) {
        gamepadState[prop] = state
        sendGamepadStatePacket(gamepadState)
      }
    }
  }

  const mapRightJoystickToAction = (onBtnUpdateHandler) => {
    const leftDirections = new Set([DIR_LEFT, DIR_LEFT_BOTTOM, DIR_LEFT_TOP])
    const rightDirections = new Set([DIR_RIGHT, DIR_RIGHT_BOTTOM, DIR_RIGHT_TOP])
    return ({ detail }) => {
      if (leftDirections.has(detail)) {
        detail = DIR_LEFT
      } else if (rightDirections.has(detail)) {
        detail = DIR_RIGHT
      } else {
        detail = null
      }
      onBtnUpdateHandler({ detail })
    }
  }

</script>

<svelte:window bind:innerHeight={viewportHeight} />

<div
  style="--vh: {viewportHeight}px"
  class="gamepad"
  on:touchstart|preventDefault
  >

  <div class="control">
    <ControlBtn on:update={onBtnUpdate('select')}>Select</ControlBtn>
    <ControlBtn invert on:update={onBtnUpdate('start')}>Start</ControlBtn>
  </div>

  <div class="zone left">
    <Joystick
      on:update={onBtnUpdate('leftJoystick')}
      />
  </div>
  
  <div class="zone right">
    <div class="indicators">
      <div class="action action-b">B</div>
      <div class="action action-a">A</div>
    </div>
    <Joystick
      threshold={12}
      on:update={mapRightJoystickToAction(onBtnUpdate('rightJoystick'))}
      />
  </div>

</div>

<style lang="scss">

  .gamepad {
    position: relative;
    height: var(--vh, 100vh);
    display: flex;
  }

  .control {
    $width: 150px;
    position: absolute;
    z-index: 2;
    width: $width;
    top: 30px;
    left: calc(50% - #{$width * 0.5});
    display: flex;
    justify-content: space-between;
  }

  .zone {
    position: relative;
    width: 50%;
    display: flex;
    align-items: flex-end;

    &.left {
      background-color: rgb(214, 214, 214);
    }

    &.right {
      justify-content: flex-end;
      background-color: rgb(214, 214, 214);
      filter: invert(1);
    }
  }

  .indicators {
    --max-size: 280px;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: var(--max-size);
    max-height: var(--max-size);
  }

  .action {
    --size: 30px;
    position: absolute;
    background-color: #aaa;
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
    display: grid;
    place-content: center;
    top: calc(50% - var(--size) * 0.5);

    &.action-b {
      left: calc(50% - (var(--size) * 0.5) - 60px);
    }

    &.action-a {
      left: calc(50% - (var(--size) * 0.5) + 60px);
    }
  }

</style>
