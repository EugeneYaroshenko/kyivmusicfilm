<template>
  <div>
    <div
      class="control left-control"
      :class="{'hidden-control': !mapShown }"
    >
      <div
        class="play-icon"
        @click="onAction"
      >
        <icon
          view-box="0 0 34.93 44.33"
          size="54"
          icon-name="play"
        >
          <play-button />
        </icon>
      </div>
    </div>
    <div
      class="control right-control"
      :class="{'hidden-control': mapShown}"
    >
      <div
        class="toggle-icon"
        @click="onAction"
      >
        <icon
          view-box="0 0 196.5 279.2"
          size="54"
          icon-name="map"
        >
          <map-icon />
        </icon>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import MapIcon from '~/assets/icons/vueIcons/map'
  import PlayButton from '~/assets/icons/vueIcons/playButton'

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
    },
    components: {
      Icon,
      MapIcon,
      PlayButton
    }
  }
</script>

<style lang="scss" scoped>
  .control {
    position: absolute;
    bottom: 0;
    max-height: 200px;
    cursor: pointer;
    display: none;
    overflow: hidden;
    transition: all 350ms ease-in-out;
    z-index: 200;
  }

  .hidden-control {
    max-height: 0;
  }

  .right-control {
    right: 0;
    background-color: rgba(#000000, 1);
    box-shadow: 0 3px 6px 0px rgba(#000, 1);
    border-radius: 0px 0 0px 0;

    .toggle-icon {
      fill: #ffffff;
      transition: all 350ms ease-in-out;
    }

    &:hover .toggle-icon {
      fill: #03B2FF;
    }
  }

  .left-control {
    left: 0;
    background-color: rgba(#000000, 1);
    border-radius: 0 0px 0px 0;
    box-shadow: 1px -3px 6px 0px rgba(#000000, .6);

    .play-icon {
      svg {
        stroke: #ffffff;
        transition: all 350ms ease-in-out;
      }
    }

    &:hover .play-icon svg {
      stroke: #03B2FF;
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
      display: block;
    }
  }

  @media screen and (min-width: 1500px) {
    .control {
      display: none;
    }
  }
</style>
