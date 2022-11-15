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

<div class="gamepad" on:touchstart|preventDefault>

  <div class="control">
    <div>
      <div class="control-label">Select</div>
      <ControlBtn on:update={onBtnUpdate('select')} />
    </div>
    <div>
      <div class="control-label control-start">Start</div>
      <ControlBtn on:update={onBtnUpdate('start')} />
    </div>
  </div>

  <div class="zone left">
    <Joystick
      on:update={onBtnUpdate('leftJoystick')}
      />
  </div>
  
  <div class="zone right">
    <div class="action action-b">B</div>
    <div class="action action-a">A</div>
    <Joystick
      threshold={12}
      on:update={mapRightJoystickToAction(onBtnUpdate('rightJoystick'))}
      />
  </div>

</div>

<style lang="scss">

  .gamepad {
    position: relative;
    height: 100vh;
    display: flex;
  }

  .control {
    $width: 150px;
    position: absolute;
    z-index: 2;
    width: $width;
    height: 20px;
    top: 30px;
    left: calc(50% - #{$width * 0.5});
    display: flex;
    justify-content: space-between;
  }

  .control-label {
    font-size: 0.9em;
    text-align: center;
  }

  .control-start {
    filter: invert(1);
  }

  .zone {
    position: relative;
    width: 50%;

    &.left {
      background-color: rgb(214, 214, 214);
    }

    &.right {
      background-color: rgb(214, 214, 214);
      filter: invert(1);
    }
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
