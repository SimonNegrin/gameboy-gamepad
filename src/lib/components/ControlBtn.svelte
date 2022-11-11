<script>
  import { tap } from "../services/tap"

</script>

<button type="button" use:tap on:tap></button>

<style lang="scss">

  button {
    width: 50px;
    height: 20px;
    border-radius: 9999px;
    background-color: yellow;
    border: none;
  }

</style>
