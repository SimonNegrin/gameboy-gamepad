<script>
  import ActionBtn from "./ActionBtn.svelte"
  import Joystick from "./Joystick.svelte"

  function onJoystickUpdate({ detail: { vector, enabled } }) {
    console.log({ vector, enabled })
  }

  function onActionADown() {

  }

  function onActionAUp() {
    
  }

  function onActionBDown() {

}

  function onActionBUp() {
    
  }

</script>

<div class="gamepad" on:touchstart|preventDefault>

  <div class="zone left">
    <Joystick on:update={onJoystickUpdate} />
  </div>
  
  <div class="zone right">
    <div class="action-btn action-a">
      <ActionBtn
        on:down={onActionADown}
        on:up={onActionAUp}
        />
    </div>
    <div class="action-btn action-b">
      <ActionBtn
        on:down={onActionBDown}
        on:up={onActionBUp}
        />
    </div>
  </div>

</div>

<style lang="scss">

  .gamepad {
    height: 100vh;
    display: flex;
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
