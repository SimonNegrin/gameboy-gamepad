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
    <ControlBtn on:update={onBtnUpdate('select')} />
    <ControlBtn on:update={onBtnUpdate('start')} />
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
    bottom: 150px;
  }

  .action-b {
    right: 100px;
    bottom: 100px;
  }

</style>
