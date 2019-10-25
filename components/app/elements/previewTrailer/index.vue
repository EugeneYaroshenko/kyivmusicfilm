<template>
  <div
    class="preview-image__overflow"
    v-if="!isMapShown && filmTrailer"
  >
    <div class="play-icon" @click="showTrailer">
      <icon
        view-box="0 0 34.93 44.33"
        size="120px"
      >
        <play-button />
      </icon>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import PlayButton from '~/assets/icons/vueIcons/playButton'
  import { mapState } from 'vuex'

  export default {
    components: {
      Icon,
      PlayButton
    },
    methods: {
      showTrailer () {
        return this.$store.dispatch('ui/showTrailer')
      }
    },
    computed: {
      ...mapState({
                    isMapShown: state => state.map.mapShown,
                    filmTrailer: state => state.film.description.trailer
                  })
    }
  }
</script>

<style lang="scss" scoped>
  .preview-image__overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .play-icon {
    background-color: rgba(#000, .8);
    padding: 42px 12px;
    cursor: pointer;
    transition: all 350ms ease-in-out;

    svg {
      stroke: #FFF;
    }

    &:hover {
      background-color: rgba(#000, 1);
    }
  }
</style>
