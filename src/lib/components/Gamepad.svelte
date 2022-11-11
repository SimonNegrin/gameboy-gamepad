<script>
  import Joystick from "./Joystick.svelte"

  function onJoystickUpdate({ detail: { vector, enabled } }) {
    console.log({ vector, enabled })
  }

</script>

<div class="gamepad" on:touchstart|preventDefault>

  <div class="zone left">
    <Joystick on:update={onJoystickUpdate} />
  </div>
  
  <div class="zone right">

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

</style>
