<template>
  <div
    class="mobile-trailer"
    v-if="trailer"
  >
    <no-ssr>
      <youtube
        :video-id="trailerID"
        ref="youtube"
        class="video"
        :fit-parent="true"
      />
    </no-ssr>
  </div>
</template>

<script>
  import { getIdFromUrl } from 'vue-youtube'

  export default {
    props: {
      trailer: {
        type: String,
        required: false,
        default: ''
      }
    },
    computed: {
      trailerID () {
        return getIdFromUrl(this.trailer)
      },
      player () {
        return this.$refs.youtube.player
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../styles/partials/variables';

  .mobile-trailer {
    height: 30vh;
    width: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
</style>
