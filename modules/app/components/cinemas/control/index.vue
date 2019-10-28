<template>
  <div>
    <div
      class="control left-control"
      :class="{'hidden-control': !mapShown }"
      @click="onAction"
    >
      <div class="icon icon-play" />
    </div>
    <div
      class="control right-control"
      :class="{'hidden-control': mapShown}"
      @click="onAction"
    >
      <div class="icon icon-map" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      mapShown: {
        type: Boolean,
        required: true,
        default: false
      },
      onAction: {
        type: Function,
        required: true,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../../styles/partials/variables';

  .control {
    position: absolute;
    bottom: 0;
    height: 100px;
    transform: translateY(0);
    width: 80px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 320ms ease-out .35s, background-color 350ms ease-out;
    z-index: 200;
    background-color: rgba(#000000, 1);
    display: none;
    align-items: flex-end;
    justify-content: center;

    &:hover {
      background-color: $blue;
    }
  }

  .icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 70%;
    width: 70%;
    margin-bottom: 8px;
  }

  .hidden-control {
    transform: translateY(120%);
  }

  .right-control {
    right: 0;
    box-shadow: 0 3px 6px 0px rgba(#000, 1);
    border-radius: 24px 0 0 0;

    .icon-map {
      background-image: url('../../../../../assets/icons/mapIcon.svg');
    }
  }

  .left-control {
    left: 0;
    border-radius: 0 24px 0 0;
    box-shadow: 1px -3px 6px 0px rgba(#000000, .6);

    .icon-play {
      background-image: url('../../../../../assets/icons/playIcon.svg');
    }
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -6px;
    padding: 24px 8px 12px 12px;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 12px 18px 8px;
  }

  @media screen and (min-width: 960px) {
    .control {
      display: flex;
    }
  }

  @media screen and (min-width: 1500px) {
    .control {
      display: none;
    }
  }
</style>
