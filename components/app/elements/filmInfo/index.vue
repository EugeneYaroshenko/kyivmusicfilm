<template>
  <div class="film-information__container">
    <div class="preview-web">
      <preview-trailer />
    </div>

  </div>
</template>

<script>
  import PreviewTrailer from '~/components/app/elements/previewTrailer'
  import { mapState } from 'vuex'

  export default {
    components: {
      PreviewTrailer
    },
    computed: {
      ...mapState({
                    isMapShown: state => state.ui.mapShown,
                  })
    }
  }
</script>

<style lang="scss" scoped>
  .film-information__container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
