<template>
  <div :class="{'loader-container': true}">
    <div class="kmf-loader">
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
                    isLoaderShown: state => state.ui.loading
                  })
    }
  }
</script>

<style lang="scss" scoped>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 10000;
    background-color: #FF00BA;
  }

  .loader-container--hidden {
    opacity: 0;
    visibility: hidden;

    transition: all .2s linear;
    transition-delay: 2s;

    .loader-block {
      display: none;
    }

    .loader-stripes {
      animation: slideRight .8s cubic-bezier(.63,.5,1,.51) forwards;
    }
  }

  .loader-stripes {
    width: 100%;
    background-color: #ffffff;
    flex: 1;
    transition: all .3s ease-in;

    &:nth-child(2) {
      animation-delay: .2s;
    }
    &:nth-child(3) {
      animation-delay: .4s;
    }
    &:nth-child(4) {
      animation-delay: .6s;
    }
    &:nth-child(5) {
      animation-delay: .8s;
    }
  }

  .loader-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 200px;
  }

  .kmf-loader {
    height: 300px;
    width: 400px;
    margin: 0 auto 12px;
    background-image: url('../../../../assets/icons/kmf-loader.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    animation: opacity 2s ease-in-out infinite;
  }

  .loader-text {
    text-align: center;
    font-size: .8em;
  }

  @keyframes slideRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes opacity {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
</style>
