<script>

  export let dir = 'up'

</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  class="chevron {dir}"
  >
  <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/>
</svg>

<style>

  .chevron {
    width: 1em;
    height: 1em;
  }

  :global(.chevron.up) {
    rotate: -90deg;
  }

  :global(.chevron.left) {
    rotate: 180deg;
  }

  :global(.chevron.bottom) {
    rotate: 90deg;
  }

  path {
    fill: currentColor;
  }

</style>
