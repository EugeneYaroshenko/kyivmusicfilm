<template>
  <div
    class="preview-image__overflow"
    v-if="!isMapShown"
    @click="showTrailer"
  >
    <icon
      view-box="0 0 70.118 99.546"
      size="100px"
    >
      <play-button />
    </icon>
  </div>
</template>

<script>
  import Icon from '~/components/icon'
  import PlayButton from '~/assets/icons/vueIcons/playButton'
  import { mapState } from 'vuex'

  export default {
    components: {
      Icon,
      PlayButton
    },
    methods: {
      showTrailer () {
        return this.$store.dispatch('trailer/showTrailer')
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
