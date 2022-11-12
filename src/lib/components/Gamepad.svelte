<script>
  import { gamepadState, sendGamepadStatePacket } from "../services/realTime"
  import ActionBtn from "./ActionBtn.svelte"
  import ControlBtn from "./ControlBtn.svelte"
  import Joystick from "./Joystick.svelte"

  const onBtnUpdate = prop => {
    return ({ detail: state }) => {
      if (gamepadState[prop] !== state) {
        gamepadState[prop] = state
        sendGamepadStatePacket()
      }
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
      <div class="control-label">Start</div>
      <ControlBtn on:update={onBtnUpdate('start')} />
    </div>
  </div>

  <div class="zone left">
    <Joystick on:update={onBtnUpdate('joystickDir')} />
  </div>
  
  <div class="zone right">
    <div class="action-btn action-a">
      <ActionBtn on:update={onBtnUpdate('actionA')} />
    </div>
    <div class="action-btn action-b">
      <ActionBtn on:update={onBtnUpdate('actionB')} />
    </div>
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

  .zone {
    position: relative;
    width: 50%;

    &.left {
      background-color: bisque;
    }

    &.right {
      background-color: burlywood;
    }
  }

  .action-btn {
    position: absolute;
  }

  .action-a {
    right: 50px;
    bottom: 50%;
  }

  .action-b {
    right: 150px;
    bottom: calc(50% - 50px);
  }

</style>
