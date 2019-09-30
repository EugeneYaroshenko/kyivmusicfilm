<template>
  <div
    class="preview-image__overflow"
    v-if="!isMapShown"
    @click="showTrailer"
  >
    <div class="icon">
      <icon
        view-box="0 0 24 26.48"
        size="150px"
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
                    isMapShown: state => state.map.mapShown
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
    cursor: pointer;
    z-index: 100;
  }
</style>
