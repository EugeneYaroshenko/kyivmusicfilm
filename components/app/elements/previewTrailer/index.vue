<template>
  <div
    class="preview-image__overflow"
    v-if="!isMapShown && filmTrailer"
  >
    <div class="play-icon" @click="showTrailer">
      <icon
        view-box="0 0 216 238.3"
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
    background-color: rgba(blue, .6);
    padding: 40px 24px;
    cursor: pointer;
    fill: #FFF;
    border-radius: 32px;
    transition: all 350ms ease-in-out;

    &:hover {
      background-color: rgba(blue, 1);
    }
  }
</style>
