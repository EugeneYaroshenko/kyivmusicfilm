<template>
  <div class="loader-container">
    <div class="loader" />
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    height: 150px;
    width: 120px;
    background-image: url('../../assets/icons/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
